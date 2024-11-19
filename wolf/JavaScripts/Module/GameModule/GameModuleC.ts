import { Notice } from "../../CommonUI/notice/Notice";
import P_TipsInGame, { UITipsInGameType } from "../../CommonUI/UITipsInGame";
import { Camp, ColdWeaponAttackMode, Globals, PlayerWeaponState } from "../../Globals";
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GeneralManager } from '../../Modified027Editor/ModifiedStaticAPI';
import BedTrigger from "../../Prefabs/床01/Script/BedTrigger";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import ChatPanel from "../DanMuModule/ui/ChatPanel";
import LoadMapModuleC from "../loadMapModule/LoadMapModuleC";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import { WatchModuleC } from "../ProcModule/WatchModule";
import { SkillModuleC } from "../SkillModule/SkillModuleC";
import { AutoAimModuleC } from "../Weapon/Aim/AutoAimModuleC";
import { ColdWeaponModuleC } from "../Weapon/ColdWeapon/ColdWeaponModuleC";
import { HotWeaponModuleC } from "../Weapon/HotWeapon/HotWeaponModuleC";
import { GameModuleData } from "./GameData";
import { GameModuleS } from "./GameModuleS";
import AllotPanel from "./ui/AllotPanel";
import CongratulationPanel from "./ui/CongratulationPanel";
import DeadPanel from "./ui/DeadPanel";
import GameBattlePanel from "./ui/GameBattlePanel";
import GetCoinPanel from "./ui/GetCoinPanel";
import KillPanel from "./ui/KillPanel";
import ReadyPanel from "./ui/ReadyPanel";
import WinWatchPanel from "./ui/WinWatchPanel";
import SoundManager = mw.SoundService;

export class GameModuleC extends ModuleC<GameModuleS, GameModuleData> {
    private curCamp: Camp;
    private curWeaponState: PlayerWeaponState;
    private propEffectMap: Map<number, number> = new Map<number, number>();
    private openEffect: mw.Effect;
    private static readonly UP_SPEED = 100;//上升速度
    private static readonly ROTATE_SPEED = 600;//旋转速度
    private static readonly TO_SPEED = 30;
    private static readonly R_SPEED = 150;
    private centerX: number = 0;
    private centerY: number = 0;
    private r: number = 0;
    private curAngel: number = 0;
    private isBegin: boolean = false;
    private curPlayer: mw.Player;
    private oldState: PlayerWeaponState = PlayerWeaponState.UnEquip;

    private killPanel: KillPanel = null;
    private get getKillPanel(): KillPanel {
        if (!this.killPanel) {
            this.killPanel = mw.UIService.getUI(KillPanel);
        }
        return this.killPanel;
    }

    private allotPanel: AllotPanel = null;
    private get getAllotPanel(): AllotPanel {
        if (!this.allotPanel) {
            this.allotPanel = mw.UIService.getUI(AllotPanel);
        }
        return this.allotPanel;
    }

    private getCoinPanel: GetCoinPanel = null;
    private get getGetCoinPanel(): GetCoinPanel {
        if (!this.getCoinPanel) {
            this.getCoinPanel = mw.UIService.getUI(GetCoinPanel);
        }
        return this.getCoinPanel;
    }

    private congratulationPanel: CongratulationPanel = null;
    private get getCongratulationPanel(): CongratulationPanel {
        if (!this.congratulationPanel) {
            this.congratulationPanel = mw.UIService.getUI(CongratulationPanel);
        }
        return this.congratulationPanel;
    }

    private deadPanel: DeadPanel = null;
    private get getDeadPanel(): DeadPanel {
        if (!this.deadPanel) {
            this.deadPanel = mw.UIService.getUI(DeadPanel);
        }
        return this.deadPanel;
    }

    private gameBattlePanel: GameBattlePanel = null;
    private get getGameBattlePanel(): GameBattlePanel {
        if (!this.gameBattlePanel) {
            this.gameBattlePanel = UIService.getUI(GameBattlePanel);
        }
        return this.gameBattlePanel;
    }

    private readyPanel: ReadyPanel = null;
    private get getReadyPanel(): ReadyPanel {
        if (!this.readyPanel) {
            this.readyPanel = UIService.getUI(ReadyPanel);
        }
        return this.readyPanel;
    }

    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }

    private winWatchPanel: WinWatchPanel = null;
    private get getWinWatchPanel(): WinWatchPanel {
        if (!this.winWatchPanel) {
            this.winWatchPanel = UIService.getUI(WinWatchPanel);
        }
        return this.winWatchPanel;
    }

    onStart(): void {
        this.openEffect = GameObject.findGameObjectById("B3F7925A") as mw.Effect;
    }
    onEnterScene(sceneType: number): void {
        this.curPlayer = Player.localPlayer;
        this.addEvent()
    }
    private addEvent() {
        Event.addLocalListener(BedTrigger.subBedEnterClientEvent, this.onPlayerEnterHandler.bind(this))
        Event.addLocalListener(BedTrigger.subBedLeaveClientEvent, this.onPlayerLeaveHandler.bind(this))
    }
    net_recoverDeathModelAppear(guidArr: Array<string>) {
        this.server.net_isRecover();
        guidArr.forEach(async (value) => {
            let npc = await GameObject.asyncFindGameObjectById(value) as mw.Character;
            if (npc) {
                npc.description.advance.base.characterSetting.somatotype = mw.SomatotypeV2.AnimeFemale;
                if (npc.isDescriptionReady) {
                    AccountService.uploadData(npc);
                } else {
                    let fuc = () => {
                        npc.onDescriptionComplete.remove(fuc);
                        AccountService.uploadData(npc);
                    };
                    npc.onDescriptionComplete.add(fuc);
                }
            }
        })

    }
    net_getCoin(num: number) {
        this.getGameBattlePanel.setCoin(num);
        if (num > 0) this.getGetCoinPanel.show();
    }
    net_ShowGameUI(camp: number, num: number, cd: number, maxCoin: number) {
        this.getAllotPanel.closeAllotUI();
        this.getGameBattlePanel.disableBtn();
        this.curCamp = camp;
        ModuleService.getModule(SkillModuleC).updateInGameSkill();
        if (camp == Camp.Civilian) {
            this.getGameBattlePanel.showCivilianUI(cd, maxCoin);
        } else if (camp == Camp.Police) {
            this.getGameBattlePanel.showPoliceUI(cd, maxCoin);
            ModuleService.getModule(HotWeaponModuleC).initAutoAimMoudule()
        } else if (camp == Camp.Spy) {
            this.getGameBattlePanel.showSpyUI(num, cd, maxCoin);
            ModuleService.getModule(ColdWeaponModuleC).initAutoAimMoudule()
        }
        this.getGameBattlePanel.iSountDownUI(false);
        this.getReadyPanel.show()
        this.curWeaponState = PlayerWeaponState.UnEquip;
        this.setCampTarget(camp);
    }
    /**局内人数 */
    net_ShowLiveNum(num: number, allNum: number, bool: boolean) {
        this.getGameBattlePanel.updateLiveNum(num, allNum, bool);
    }
    /**分配阵营时更新目标ui */
    private setCampTarget(camp: Camp) {
        this.getGameBattlePanel.setCampTarget(camp);
    }
    /**玩家进入交互物事件 */
    private onPlayerEnterHandler() {
        this.oldState = this.curWeaponState
        this.getGameBattlePanel.hideRightPartUI()
        if (this.curWeaponState == PlayerWeaponState.UnEquip) {
            return
        }
        this.curWeaponState = PlayerWeaponState.UnEquip
        this.clearAutoAnim(false);
    }
    /**玩家离开交互物事件 */
    private onPlayerLeaveHandler() {
        this.getGameBattlePanel.showRightPartUI()
        if (this.oldState == PlayerWeaponState.UnEquip) {
            return
        }
        if (this.oldState == PlayerWeaponState.ThrowKnife) {
            this.clickThrowKnifeBtn()
        }
        else {
            this.clickWeaponBtn()
        }

    }
    /**更改尸体外形 */
    async net_changModelAppearance(modelGuid: string) {
        let model = await GameObject.asyncFindGameObjectById(modelGuid);
        if (model && PlayerManagerExtesion.isNpc(model)) {
            let npc = model as mw.Character;
            ModuleService.getModule(PlayerModuleC).changePlayerAppear(npc);
        }
    }

    net_ShowHeroUI(cd: number) {
        this.curCamp = Camp.Hero;
        this.curWeaponState = PlayerWeaponState.UnEquip;
        this.getGameBattlePanel.showHeroUI(cd);
        ModuleService.getModule(HotWeaponModuleC).initAutoAimMoudule()
        Notice.showDownNotice(GameConfig.Tips.getElement(10002).Content);
        this.setCampTarget(Camp.Hero);
    }
    net_ChangeTitle(id: number) {
        this.getGameBattlePanel.setTitle(id);
        if (id == 11002) {
            this.getGameBattlePanel.enableBtn();
            this.getGameBattlePanel.iSountDownUI(true);
            this.getReadyPanel.hide();
            P_TipsInGame.show("GO", UITipsInGameType.MirrorTips);
        }
    }
    /**如果关键人物没有进入的时候需要把ui关了,还需要加一个提示 */
    net_HideTitle() {
        this.getReadyPanel.hide();
        Notice.showDownNotice(GameConfig.Language.Text_1.Value);
    }
    /**隐藏自动瞄准 */
    public clearAutoAnim(backToHall: boolean) {
        this.curWeaponState = PlayerWeaponState.UnEquip
        if (this.curCamp == Camp.Spy) {
            ModuleService.getModule(ColdWeaponModuleC).unequipWeapon()
        }
        else if (this.curCamp == Camp.Police || this.curCamp == Camp.Hero) {
            ModuleService.getModule(HotWeaponModuleC).unequipWeapon()
        }
        if (backToHall) {
            ModuleService.getModule(AutoAimModuleC).endLineTrace();
            ModuleService.getModule(AutoAimModuleC).endAutoAnimTrigger();
        }
    }
    /**卸载返回大厅卸载玩家装备 */
    backToHall() {
        this.clearAutoAnim(true);
        /**如果异常退出需要额外关闭加载界面 */
        ModuleService.getModule(LoadMapModuleC).closeLoadingPanel();
    }
    /**玩家去世 */
    net_playerGameOver() {
        this.clearAutoAnim(true);
    }
    /**展示消灭敌人的ui */
    net_showAttackTip(pos: Vector) {
        this.getKillPanel.addKillUI(pos);
    }

    clickWeaponBtn() {
        if (this.curCamp == Camp.Police || this.curCamp == Camp.Hero) {
            if (this.curWeaponState == PlayerWeaponState.UnEquip) {
                this.server.net_ChangeWeapon(PlayerWeaponState.Gun);
                setTimeout(() => {
                    this.curWeaponState = PlayerWeaponState.Gun;
                    ModuleService.getModule(HotWeaponModuleC).equipWeapon()
                }, Globals.getWeaponTime);
            }
            else {
                this.curWeaponState = PlayerWeaponState.UnEquip;
                this.server.net_ChangeWeapon(this.curWeaponState);
                ModuleService.getModule(HotWeaponModuleC).unequipWeapon()
            }
        }
        else if (this.curCamp == Camp.Spy) {
            if (this.curWeaponState == PlayerWeaponState.UnEquip || this.curWeaponState == PlayerWeaponState.ThrowKnife) {
                this.getGameBattlePanel.isEnableChangeWeaponBtn(false)
                this.server.net_ChangeWeapon(PlayerWeaponState.Knife);
                setTimeout(() => {
                    this.curWeaponState = PlayerWeaponState.Knife;
                    ModuleService.getModule(ColdWeaponModuleC).equipWeapon()
                }, Globals.getWeaponTime);
            }
            else {
                this.curWeaponState = PlayerWeaponState.UnEquip;
                this.server.net_ChangeWeapon(this.curWeaponState);
                ModuleService.getModule(ColdWeaponModuleC).unequipWeapon()
            }
        }
    }
    clickThrowKnifeBtn() {
        if (this.curCamp != Camp.Spy) {
            return
        }
        if (this.curWeaponState == PlayerWeaponState.UnEquip || this.curWeaponState == PlayerWeaponState.Knife) {
            this.curWeaponState = PlayerWeaponState.ThrowKnife
        }
        else if (this.curWeaponState == PlayerWeaponState.ThrowKnife) {
            this.curWeaponState = PlayerWeaponState.UnEquip
        }
        this.server.net_ChangeWeapon(this.curWeaponState)
        ModuleService.getModule(ColdWeaponModuleC).onChangeColdWeaponAttackMode(this.curWeaponState)
    }

    knifeAttack() {
        // console.warn(`distance ==== auto 彻底开启自动攻击`)
        if (this.curWeaponState != PlayerWeaponState.Knife) {
            //提示刀拿在手上才可以攻击
            // Notice.showDownNotice(GameConfig.Tips.getElement(10001).Content);
            return;
        }
        let isKnife = false;
        if (ModuleService.getModule(ColdWeaponModuleC)[`weaponMode`] == ColdWeaponAttackMode.Normal && ModuleService.getModule(ColdWeaponModuleC)[`canShoot`]) {
            isKnife = true;
        }
        // console.error(`distance ==== 是否在使用飞刀 ${isKnife}`);
        if (!isKnife) {
            return;
        }

        ModuleService.getModule(ColdWeaponModuleC).beginKnifeAttack();

    }
    getCurWeaponState() {
        return this.curWeaponState
    }
    getPlayerCamp() {
        return this.curCamp
    }
    net_UpdateKillNum(num: number, total: number) {
        this.getGameBattlePanel.updateKillNum(num, total);
    }
    net_UpdatePropNum(num: number, tableId: number) {
        Notice.showDownNotice(GameConfig.Tips.getElement(10003).Content);
        this.getGameBattlePanel.updatePropNum(num);
        //播放得到道具的特效
        let boxloc = GameConfig.PropsGenerate.getElement(tableId).GeneratePoint;
        this.centerX = boxloc.x;
        this.centerY = boxloc.y;
        this.curAngel = 0;
        this.r = 0;
        let loc = this.openEffect.worldTransform.clone().position;
        loc.x = boxloc.x;
        loc.y = boxloc.y;
        loc.z = boxloc.z;
        this.openEffect.worldTransform.position = loc;
        this.isBegin = true;
        this.openEffect.play();
    }
    onUpdate(dt: number): void {
        if (!this.isBegin) return;
        if (this.curAngel <= 720) {
            if (this.curAngel < 360) {
                this.r += dt * GameModuleC.R_SPEED;
            }
            else {
                this.r -= dt * GameModuleC.R_SPEED;
            }
            this.curAngel += dt * GameModuleC.ROTATE_SPEED;
            let loc = this.openEffect.worldTransform.clone().position;
            loc.x = this.centerX + this.r * Math.cos(this.curAngel * Math.PI / 180);
            loc.y = this.centerY + this.r * Math.sin(this.curAngel * Math.PI / 180);
            loc.z += GameModuleC.UP_SPEED * dt;
            this.openEffect.worldTransform.position = loc;
        }
        else {
            if (mw.Vector.distance(this.curPlayer.character.worldTransform.clone().position, this.openEffect.worldTransform.clone().position) <= 50) {
                this.isBegin = false;
                this.openEffect.stop();
            }
            else {
                let loc = mw.Vector.lerp(this.openEffect.worldTransform.clone().position, this.curPlayer.character.worldTransform.clone().position, GameModuleC.TO_SPEED * dt);
                if (loc == null)
                    loc = this.curPlayer.character.worldTransform.clone().position;
                this.openEffect.worldTransform.position = loc;
            }
        }
    }
    net_CreatePropEffect(id: number) {
        let loc = GameConfig.PropsGenerate.getElement(id).GeneratePoint;
        let propEffectId = GameConfig.Assets.getElement(12003).Guid;
        Tools.asyncDownloadAsset(propEffectId).then(() => {
            let effectId = EffectService.playAtPosition(propEffectId, loc, { loopCount: 0 });
            this.propEffectMap.set(id, effectId);
        });
    }
    net_RemovePropEffect(id: number) {
        let effectId = this.propEffectMap.get(id);
        if (effectId == undefined) {
            return;
        }
        EffectService.stop(effectId);
        this.propEffectMap.delete(id);
    }
    net_RemoveAllPropEffect() {
        this.propEffectMap.forEach((effectId, id) => {
            EffectService.stop(effectId);
            this.propEffectMap.delete(id);
        })
    }
    net_ShowTip(id: number, addstr?: string) {
        if (id != 0) {
            let str = GameConfig.Tips.getElement(id).Content;
            Notice.showDownNotice(str);
        }
        else {
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_PlayerIsDead.Value, addstr));
        }
    }
    //To do
    net_ShowTip2(id: number, kind: number) {
        let str = GameConfig.Tips.getElement(id).Content;
        if (kind == 0) {
            P_TipsInGame.show(str, UITipsInGameType.GuideTips);
        }
        else {
            P_TipsInGame.show(str, UITipsInGameType.StageTips);
        }
        if (id == 10008) {
            mw.SoundService.playSound(GameConfig.Assets.getElement(10011).Guid, 1);
        }
    }
    net_DieEffect() {
        this.getDeadPanel.showDieEffectUI();
        let id = mw.SoundService.playSound(GameConfig.Assets.getElement(10010).Guid, 0, 6);
        Tools.cameraShake(false);
        setTimeout(() => {
            mw.SoundService.stopSound(id);
        }, GameConfig.Rule.getElement(10010).Time * 1000);
        this.endExp()
    }
    net_FinalEffect(isWin: boolean) {
        this.getCongratulationPanel.showGameFinal(isWin);
        this.endExp()
    }
    //特殊展示时停止
    net_stopExp() {
        this.endExp()
    }

    endExp() {
        let bool = this.getGameBattlePanel.stopAddEXP();
        if (bool) {
            this.server.net_setExp(this.getGameBattlePanel.expNum, this.getGameBattlePanel.timeNum);
        }
    }

    private chatPanel: ChatPanel = null;
    private get getChatPanel(): ChatPanel {
        if (!this.chatPanel) {
            this.chatPanel = mw.UIService.getUI(ChatPanel);
        }
        return this.chatPanel;
    }
    net_setEndState(modelGuid: string, bo: boolean, name: string = ``): void {
        if (bo) {
            GameObject.asyncFindGameObjectById(modelGuid).then((obj) => {
                this.getDeadPanel.hide();
                this.getHUDPanel.closeHallUI();
                this.getGameBattlePanel.closeGameUI();
                if (mw.UIService.getUI(ChatPanel, false)?.visible) this.getChatPanel.hide();
                this.getWinWatchPanel.show();
                this.getWinWatchPanel.mText_WinWatch_1.text = GameConfig.Text.getElement(20034).Content;
                this.getWinWatchPanel.mText_WinWatch_2.text = name;
                ModuleService.getModule(WatchModuleC).changeWatchTarget(obj);
                console.warn(`Camera :: ===== 相机设置1`);
                this.curPlayer.character.movementEnabled = false;
            })
        } else {
            console.warn(`Camera :: ===== 相机设置2`);
            this.getHUDPanel.showHallUI();
            this.getChatPanel.show();
            // this.getGameBattlePanel.showGameUI();
            this.getWinWatchPanel.hide();
            ModuleService.getModule(WatchModuleC).changeWatchTarget(this.localPlayer.character);
            this.curPlayer.character.movementEnabled = true;
        }
    }
}