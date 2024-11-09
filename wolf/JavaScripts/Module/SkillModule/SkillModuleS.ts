import { GameCache } from "../../GameCache";
import { GameGlobals, PlayerGameState } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import ShopModuleS from "../ShopModule/ShopModuleS";
import InGameSkill, { SkillState } from "./InGameSkill";
import { SkillData } from "./SkillData";
import { SkillModuleC } from "./SkillModuleC";

export class SkillModuleS extends ModuleS<SkillModuleC, SkillData> {
    private skillMap: Map<number, InGameSkill> = new Map<number, InGameSkill>();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }
    /**游戏开始实例化玩家技能 */
    public createSkill() {
        GameGlobals.enterGameNormalPlayers.forEach((value) => {
            let playerId = value.playerId;
            let skillId = this.getPlayerData(value).getEquipSkill();
            let dataInfo = GameConfig.SkillShop.getElement(skillId);
            if (skillId != -1 && dataInfo) {
                let skill = new InGameSkill(playerId, skillId);
                this.skillMap.set(playerId, skill);
            }
        })
        this.skillMap.forEach((value, index) => {
            value.updateBuff();
        })
    }

    /**获取玩家技能id */
    public getSkillId(playerId: number) {
        if (!playerId) {
            return;
        }
        return this.getPlayerData(playerId).getEquipSkill();
    }
    /**击杀玩家玩家一些技能需要做特殊处理 */
    public killOtherAndSkillUpdate(killId: number) {
        let skill = this.skillMap.get(killId);
        if (!skill) {
            return;
        }
        skill.setSkillState(SkillState.CD);

    }
    /**游戏结束销毁玩家技能 */
    public deleteSkill() {
        /**为了防止玩家中途退出，这里额外加一个判断 */
        let state = PlayerGameState.Leave;
        if (GameGlobals.spyPlayer && GameCache.gamePlayersInfo.get(GameGlobals.spyPlayer)) {
            state = GameCache.gamePlayersInfo.get(GameGlobals.spyPlayer).state;
        }
        if (GameGlobals.spyPlayer && state && state != PlayerGameState.Leave) {
            let skill = this.getPlayerData(GameGlobals.spyPlayer).getEquipSkill();
            this.getPlayerData(GameGlobals.spyPlayer).decTimeSkill(skill);
        }
        this.skillMap.forEach((value) => {
            value.skillDestroy();
        })
        this.skillMap.clear();
    }
    /**玩家死亡销毁玩家技能 */
    public deleteOnPlayerSkill(playerId: number) {
        if (this.skillMap.has(playerId)) {
            let skill = this.skillMap.get(playerId);
            skill.skillDestroy();
            this.skillMap.delete(playerId);
        }
    }
    /**更新buff生效 */
    public updateBuffActive(playerId: number) {
        if (this.skillMap.has(playerId)) {
            let skill = this.skillMap.get(playerId);
            skill.updateBuff();
        }

    }

    /**设置技能状态 */
    public setSkillState(playerID: number, state: SkillState) {
        let skill = this.skillMap.get(playerID);
        if (!skill) {
            return;
        }
        skill.setSkillState(state);
    }

    /**更新客户端玩家技能是否生效 */
    public updateClientSkillActive(playerId: number, res: boolean) {
        this.getClient(playerId).net_updateSkillIsAvtive(res);
    }
    /**获取玩家的子弹类型技能 */
    public getBulletSkill(playerId: number): InGameSkill {
        if (this.skillMap.has(playerId)) {
            let skill = this.skillMap.get(playerId);
            let skillType = GameConfig.Skill.getElement(skill.skillId).SkillType;
            if (skillType != null && skillType >= 1 && skillType < 100) {
                return skill;
            }
        }
    }

    /**爆炸到计时ui */
    public createBoomDelayUI(playerId: number, delayTime: number) {
        Player.getAllPlayers().forEach((value) => {
            this.getClient(value).net_createBoomDelayUI(playerId, delayTime);
        })
    }

    public createBoomDelayUI_NPC(guid: string, delayTime: number) {
        Player.getAllPlayers().forEach((value) => {
            this.getAllClient().net_createBoomDelayUI_Npc(guid, delayTime);
        })

    }

    public deleteAllBoomUI() {
        Player.getAllPlayers().forEach((value) => {
            this.getAllClient().net_deleteBoomDelayUI();
        })
    }
    /**非网络,同端调用 */
    public buySkill(player: mw.Player, skillId: number, costType: GoldType) {
        let isHave = this.getPlayerData(player).getHaveSkillArr().includes(skillId);
        let dataInfo = GameConfig.SkillShop.getElement(skillId);
        if (isHave && dataInfo.Max <= 0) {
            return false;
        }
        let costIndex = -1;
        dataInfo.PriceType.forEach((value, index) => {
            if (value == costType) {
                costIndex = index;
            }
        })
        if (costIndex == -1) {
            return false;
        }
        let res = false;
        let cost = dataInfo.PriceNum[costIndex];
        if (costType == GoldType.Gold) {
            res = ModuleService.getModule(PlayerModuleS).changeGold(player, -cost);
        }
        else if (costType == GoldType.Diamond) {
            res = ModuleService.getModule(PlayerModuleS).changeDiamond(player, -cost);
        }
        else if (costType == GoldType.Adv) {
            res = ModuleService.getModule(PlayerModuleS).changeAdvToken(player, -cost);
        }
        if (res) {
            this.currentData.buySkill(skillId, 1);
        }
        return res;
    }

    /**添加带次数的技能,给gm使用的 */
    public addTimeSkill(player: mw.Player, skillId: number, num: number) {
        this.getPlayerData(player).buySkill(skillId, num);
    }

    public stealthActive(playerId: number, skillId: number) {
        let havePlayer = GameGlobals.enterGameNormalPlayers.find((value) => { return value.playerId == playerId });
        if (havePlayer) {
            havePlayer.character.setVisibility(mw.PropertyStatus.Off, true);
            ModuleService.getModule(ShopModuleS).stealHideEquipItem(havePlayer, false);
        }

        GameGlobals.enterGameNormalPlayers.forEach((value) => {
            this.getClient(value).net_stealthActive(playerId, skillId);
        })
    }

    public stealthKillUpdate(playerId: number, skillId: number) {
        let skill = this.skillMap.get(playerId);
        if (!skill) {
            return;
        }
        skill.setSkillState(SkillState.CD);
    }

    public stealthUnActive(playerId: number, skillId: number) {
        let havePlayer = GameGlobals.enterGameNormalPlayers.find((value) => { return value.playerId == playerId });
        if (havePlayer) {
            havePlayer.character.setVisibility(mw.PropertyStatus.On, true);
            ModuleService.getModule(ShopModuleS).stealHideEquipItem(havePlayer, true);
        }
        GameGlobals.enterGameNormalPlayers.forEach((value) => {
            this.getClient(value).net_stealthClose(playerId, skillId, havePlayer == null);
        })
    }


    public net_buySkill(skillId: number, costType: GoldType) {
        return this.buySkill(this.currentPlayer, skillId, costType);
    }
    public net_activeSkill() {
        let skill = this.skillMap.get(this.currentPlayerId);
        if (!skill) {
            return;
        }
        skill.activeSkill();
    }

    public net_equipSkill(skillId: number) {
        this.currentData.equipSkill(skillId);
    }

    public net_unequipSkill(skillId: number) {
        this.currentData.unequipSkill(skillId);
    }
}

export enum GoldType {
    Gold,
    Diamond,
    Adv,
}