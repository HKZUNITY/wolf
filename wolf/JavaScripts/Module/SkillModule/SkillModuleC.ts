import P_Tips from "../../CommonUI/P_Tips";
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { GameConfig } from "../../Tables/GameConfig";
import P_Game from "../../UILogic/Game/P_Game";
import P_Hall from "../../UILogic/Hall/P_Hall";
import Ghost_Generate from "../../ui-generate/uiTemplate/Inside/Ghost_generate";
import { GameModuleC } from "../GameModule/GameModuleC";
import { AutoAimModuleC } from "../Weapon/Aim/AutoAimModuleC";
import P_SkillShop, { SkillShopData } from "./P_SkillShop";
import P_SkillShopItemDesc from "./P_SkillShopItemDesc";
import { SkillData } from "./SkillData";

import { GoldType, SkillModuleS } from "./SkillModuleS";

export class SkillModuleC extends ModuleC<SkillModuleS, SkillData> {
    private skillShopData: Array<SkillShopData>;
    private skillShopMainUI: P_SkillShop;
    private timer;
    private boomDelayMap: Map<string, BoomInfo> = new Map<string, BoomInfo>();
    /**一个人就一个技能特效挂在身上 */
    private skillEffect: number
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    public isOpenSkillShopPanel(isShow: boolean) {
        if (!this.skillShopData) {
            this.initSkillShopData();
            this.skillShopMainUI = mw.UIService.create(P_SkillShop);
        }
        if (isShow) {
            this.skillShopMainUI.refreshSkillShop(this.skillShopData);
            mw.UIService.showUI(this.skillShopMainUI);
            P_Hall.instance.showShop();

        }
        else {

            if (this.skillShopMainUI) {
                mw.UIService.hideUI(this.skillShopMainUI);
            }
            mw.UIService.hideUI(P_SkillShopItemDesc.instance);
            P_Hall.instance.hideShop();
        }
    }

    public initSkillShopData() {
        this.skillShopData = new Array<SkillShopData>();
        let haveSkill = this.data.getHaveSkillArr();
        let skillMap = new Map<number, boolean>();
        let timeSkillMap = new Map<number, number>();
        let equipSkill = this.data.getEquipSkill();
        let timeSkill = this.data.getTimeSkill();
        haveSkill.forEach((value, index) => {
            skillMap.set(value, true);
        })

        timeSkill.forEach((value, index) => {
            timeSkillMap.set(value.skillId, value.time);
        })

        GameConfig.SkillShop.getAllElement().forEach((value, index) => {
            let isHave = false;
            let isUse = false;
            if (skillMap.has(value.ID)) {
                isHave = true;
            }
            if (value.ID == equipSkill) {
                isUse = true
            }
            let remainTime = -1;
            if (timeSkillMap.has(value.ID)) {
                remainTime = timeSkillMap.get(value.ID);
            }
            let skillData = new SkillShopData(value.ID, isHave, isUse, remainTime);
            this.skillShopData.push(skillData);
        })
        this.skillShopData.sort((a, b) => {
            return this.sortFunc(a, b);
        })
        this.data.onHaveSkillChange.add((skillId: number) => {
            this.haveSkillChangeCallBack(skillId);
        })
        this.data.onEquipSkillChange.add((skillId: number) => {
            this.equipSkillChangeCallBack(skillId);
        })
        this.data.onUnequipSkillChange.add((skillId: number) => {
            this.unequipSkillChangeCallBack(skillId);
        })
        this.data.onSkillTimeReduce.add((skillId: number) => {
            this.skillTimeReduceCallBack(skillId);
        })

    }

    private haveSkillChangeCallBack(skillId: number) {
        let changeSkill: SkillShopData;
        this.skillShopData.forEach((value) => {
            if (value.skillId == skillId) {
                value.isBuy = true;
                changeSkill = value;
                let ramainTime = this.data.getSkillRemainTime(skillId);
                value.remainTime = ramainTime;
            }
        })
        //更新界面
        this.skillShopData.sort((a, b) => {
            return this.sortFunc(a, b);
        })
        if (this.skillShopMainUI) {
            this.skillShopMainUI.refreshSkillShop(this.skillShopData);
        }

        if (P_SkillShopItemDesc.instance.visible && changeSkill) {
            P_SkillShopItemDesc.instance.showSkillDesc(changeSkill);
        }
    }

    private equipSkillChangeCallBack(skillId: number) {
        let changeSkill: SkillShopData;
        this.skillShopData.forEach((value) => {
            value.isUse = value.skillId == skillId;
            if (value.skillId == skillId) {
                changeSkill = value;
            }
        })
        //更新界面
        this.skillShopData.sort((a, b) => {
            let res = this.sortFunc(a, b)
            return res;
        })
        this.skillShopMainUI.refreshSkillShop(this.skillShopData);
        if (P_SkillShopItemDesc.instance.visible && changeSkill) {
            P_SkillShopItemDesc.instance.showSkillDesc(changeSkill);
        }
    }

    private unequipSkillChangeCallBack(skillId: number) {
        let changeSkill: SkillShopData;
        this.skillShopData.forEach((value) => {
            value.isUse = false;
            if (value.skillId == skillId) {
                changeSkill = value;
            }
        })
        this.skillShopData.sort((a, b) => {
            let res = this.sortFunc(a, b)
            return res;
        })
        this.skillShopMainUI.refreshSkillShop(this.skillShopData);
        if (P_SkillShopItemDesc.instance.visible && changeSkill) {
            P_SkillShopItemDesc.instance.showSkillDesc(changeSkill);
        }
    }

    private skillTimeReduceCallBack(skillId: number) {
        let changeSkill: SkillShopData;
        let useEquip = this.data.getEquipSkill();
        let haveSkill = this.data.getHaveSkillArr();

        this.skillShopData.forEach((value) => {
            value.isUse = useEquip == value.skillId;
            if (value.skillId == skillId) {
                changeSkill = value;
                value.isBuy = haveSkill.includes(skillId);
                value.remainTime = this.data.getSkillRemainTime(skillId);
            }
        })

        //更新界面
        this.skillShopData.sort((a, b) => {
            let res = this.sortFunc(a, b)
            return res;
        })
        this.skillShopMainUI.refreshSkillShop(this.skillShopData);
        if (P_SkillShopItemDesc.instance.visible && changeSkill) {
            P_SkillShopItemDesc.instance.showSkillDesc(changeSkill);
        }
    }

    private sortFunc(a: SkillShopData, b: SkillShopData) {
        if (a.isUse != b.isUse) {
            if (a.isUse) {
                return -1;
            }
            return 1;
        }
        if (a.isBuy != b.isBuy) {
            if (a.isBuy) {
                return -1;
            }
            return 1;
        }
        return a.showIndex - b.showIndex;
    }

    public updateInGameSkill() {
        let camp = ModuleService.getModule(GameModuleC).getPlayerCamp();
        let skillId = this.data.getEquipSkill();
        P_Game.instance.updateInGameSkill(camp, skillId);
    }

    public net_updateSkillIsAvtive(res: boolean) {
        P_Game.instance.updateSkillIsActive(res);
    }

    public async buySkill(skillId: number, costType: GoldType) {
        let dataInfo = GameConfig.SkillShop.getElement(skillId);
        let remain = this.data.getSkillRemainTime(skillId);
        if (dataInfo.Max > 0 && remain >= dataInfo.Max) {
            P_Tips.show(GameConfig.Tips.getElement(20018).Content);
            return;
        }
        let res = await this.server.net_buySkill(skillId, costType);
        if (res) {
            P_Tips.show(GameConfig.Tips.getElement(10011).Content);
        }
        else {
            P_Tips.show(GameConfig.Tips.getElement(10012).Content);
        }
    }

    public equipSkill(skillId: number) {
        this.server.net_equipSkill(skillId);
    }

    public unequipSkill(skillId: number) {
        this.server.net_unequipSkill(skillId);
    }

    public net_createBoomDelayUI(playerId: number, delayTime: number) {
        let player = Player.getPlayer(playerId);
        if (player) {
            this.addBoomDelayUI(player.character, delayTime);
        }

    }

    public net_createBoomDelayUI_Npc(guid: string, delayTime: number) {
        let npc = GameObject.findGameObjectById(guid);
        if (PlayerManagerExtesion.isNpc(npc)) {
            let temp = npc as mw.Character;
            this.addBoomDelayUI(temp, delayTime);
        }
    }

    private addBoomDelayUI(char: mw.Character, delayTime: number) {
        let headUI = char.overheadUI;
        let nameUI = headUI.getTargetUIWidget();
        let boomText = nameUI.findChildByPath('mRootCanvas/mText_Countdown') as mw.TextBlock;
        if (!boomText) {
            return;
        }
        boomText.text = delayTime.toString();
        let guid = char.gameObjectId;
        let timer = TimeUtil.setInterval(() => {
            delayTime--;
            if (char && char.overheadUI) {
                if (delayTime <= 0) {
                    boomText.text = ""
                    if (this.boomDelayMap.has(guid)) {
                        let info = this.boomDelayMap.get(guid);
                        TimeUtil.clearInterval(info.time);
                        this.boomDelayMap.delete(guid);
                    }
                }
                else {
                    boomText.text = delayTime.toString();
                }
            }
            else {
                if (this.boomDelayMap.has(guid)) {
                    let info = this.boomDelayMap.get(guid);
                    TimeUtil.clearInterval(info.time);
                    this.boomDelayMap.delete(guid);
                }
            }
        }, 1);
        this.boomDelayMap.set(guid, new BoomInfo(boomText, timer))
    }

    public net_deleteBoomDelayUI() {
        this.boomDelayMap.forEach((value) => {
            TimeUtil.clearInterval(value.time);
            value.delayText.text = "";
        })
        this.boomDelayMap.clear();
    }

    public activeSkill() {
        this.server.net_activeSkill();
    }

    /**隐身激活 */
    public async net_stealthActive(playerId: number, skillId: number) {
        if (this.localPlayerId == playerId) {
            let dataInfo = GameConfig.Skill.getElement(skillId);
            if (this.skillEffect) {
                EffectService.stop(this.skillEffect);
                this.skillEffect = null;
            }
            GeneralManager.rpcPlayEffectAtLocation(dataInfo.CastEffect, this.localPlayer.character.worldTransform.position.clone().add(dataInfo.CastEffectPos), 1, Rotation.zero, dataInfo.CastEffectScale);
            this.skillEffect = GeneralManager.rpcPlayEffectOnPlayer(dataInfo.HitEffect, this.localPlayer, mw.HumanoidSlotType.Root, 0, dataInfo.HitEffectPosition, Rotation.zero, dataInfo.HitEffectScale);
            mw.UIService.show(Ghost_Generate);
            P_Game.instance.useSkill(skillId);

        }
        else {
            let otherPlayer = mw.Player.getPlayer(playerId);
            if (otherPlayer) {
                ModuleService.getModule(AutoAimModuleC).addStealthPlayer(otherPlayer);
            }
        }
    }
    /**隐身关闭 */
    public async net_stealthClose(playerId: number, skillId: number, isLeave: boolean) {
        if (this.localPlayerId == playerId) {
            if (this.skillEffect) {
                EffectService.stop(this.skillEffect);
                this.skillEffect = null;
                mw.UIService.hide(Ghost_Generate);
                P_Game.instance.skillInCool(skillId);
            }
        }
        else {
            let otherPlayer = mw.Player.getPlayer(playerId);
            if (otherPlayer && isLeave == false) {
                ModuleService.getModule(AutoAimModuleC).deleteStealthPlayer(otherPlayer);
            }
        }
    }

}

class BoomInfo {
    public delayText: mw.TextBlock;
    public time;
    constructor(delayText: mw.TextBlock, time) {
        this.delayText = delayText;
        this.time = time;
    }
}