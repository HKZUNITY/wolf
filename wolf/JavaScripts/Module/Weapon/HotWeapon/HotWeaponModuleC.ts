import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿
/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-02 15:56:34
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-14 14:51:04
 * @FilePath     : \murdermystery3\JavaScripts\Module\Weapon\HotWeapon\HotWeaponModuleC.ts
 * @Description  : 修改描述
 */
/*
 * @Author: zhangqing.fang
 * @Date: 2022-11-02 09:55:51
 * @LastEditors: zhangqing.fang
 * @LastEditTime: 2022-11-10 13:07:36
 * @FilePath: \townmysteryAPI\JavaScripts\Module\Weapon\HotWeapon\HotWeaponModuleC.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameModuleData } from "../../GameModule/GameData";
import { HotWeaponModuleS } from "./HotWeaponModuleS";
import { UiManager } from "../../../UI/UiManager";
import P_Foresight from "../../../UILogic/Game/P_Foresight";
import P_Game from "../../../UILogic/Game/P_Game";
import { AiModuleC } from "../../../AI/AiModule";
import { SceneModuleC } from "../../ProcModule/SceneModule";
import { GuideConfig } from "../../../Tables/Guide";
import { GameConfig } from "../../../Tables/GameConfig";
import { AutoAimModuleC } from "../Aim/AutoAimModuleC";
import { GameModuleS } from "../../GameModule/GameModuleS";
import { GameModuleC } from "../../GameModule/GameModuleC";
import { KillType, PlayerWeaponState } from "../../../Globals";
import { BagModuleC } from "../../BagModule/BagModuleC";
import { Tools } from "../../../Tools";

export class HotWeaponModuleC extends ModuleC<HotWeaponModuleS, null>{
    private curPlayer: mw.Player;
    /**索敌范围 */
    private findEnemyScale: number
    /**攻击冷却时间 */
    private _coolTime: number
    private canShoot: boolean = true
    /**攻击前摇时间是否点击过 */
    private isClick: boolean = false
    /**攻击预备射击动画 */
    private timer: number
    /**弹道特效id */
    private effectId: string = "57203";
    /**特效缩放 */
    private effectScale: number = GameConfig.Rule.getElement("60021").Weight;
    /**特效持续时间 */
    private effectDuration: number = GameConfig.Rule.getElement("60022").Time;
    onStart(): void {
        this.findEnemyScale = GameConfig.Rule.getElement(40001).Num;
        this._coolTime = GameConfig.Rule.getElement(40007).Time;
    }

    async onEnterScene(sceneType: number) {
        
    }
    /**创建弹道特效 */
    public net_createBulletEffect(startPos: Vector, endPos: Vector){
        let director = endPos.clone().subtract(startPos).normalized;
        let distance = Vector.distance(startPos, endPos);
        let temp = director.toRotation();
        let effectId = GeneralManager.rpcPlayEffectAtLocation("57203", startPos, 10, temp.add(new Rotation(new Vector(0,-90,0))), new Vector(this.effectScale, this.effectScale,distance/1500));
        setTimeout(() => {
            EffectService.stop(effectId);
        }, this.effectDuration* 1000);
    }
    /**初始化热武器自动瞄准模块 */
    async initAutoAimMoudule() {
        await ModuleService.getModule(AutoAimModuleC).startLineTrace((endPos:mw.Vector)=>{this.onAutoShootBtnHandler(endPos)});
        ModuleService.getModule(AutoAimModuleC).initAutoModule(this.findEnemyScale, false)
    }

    equipWeapon() {
        if (this.canShoot) {
            ModuleService.getModule(AutoAimModuleC).startForesight()
        }
        P_Game.instance.changeHotWeaponState(PlayerWeaponState.Gun)
    }

    unequipWeapon() {
        ModuleService.getModule(AutoAimModuleC).endForesight()
        this.cancelAutoShoot()
        P_Game.instance.changeHotWeaponState(PlayerWeaponState.UnEquip)

    }

    /**点击事件 */
    onAutoShootBtnHandler(endPos: Vector) {
        if (!Tools.getPlayerCanShoot(this.localPlayer)) {
            return
        }
        this.isClick = true
        let weaponId = ModuleService.getModule(BagModuleC).getHotWeaponId()
        let dataInfo = GameConfig.Weapon.getElement(weaponId)
        let animObj = PlayerManagerExtesion.loadAnimationExtesion(this.localPlayer.character, dataInfo.AttackActionGUID.toString())
        animObj.speed = dataInfo.AttackRate;
        animObj.loop = 1;
        this.timer = setTimeout(() => {
            this.cancelAutoShoot();
            this.shoot(endPos);
        }, dataInfo.AttackLatency * 1000);
        animObj.play();
    }

    public getIsCanShoot(){
        return this.canShoot && ModuleService.getModule(GameModuleC).getCurWeaponState() == PlayerWeaponState.Gun;
    }

    /**判断当前是否能够射击 */
    shoot(endPos: Vector) {
        if (this.canShoot == true) {
            this.canShoot = false
            ModuleService.getModule(AutoAimModuleC).endForesight()
            this.cancelAutoShoot()
            setTimeout(() => {
                this.canShoot = true
                if (ModuleService.getModule(GameModuleC).getCurWeaponState() == PlayerWeaponState.Gun) {
                    if (this.canShoot) {
                        ModuleService.getModule(AutoAimModuleC).startForesight()
                    }
                }
            }, this._coolTime * 1000);
            P_Game.instance.showShootCd();
            let startPos = ModuleService.getModule(BagModuleC).getFirePos();
            this.server.net_autoShoot(startPos, endPos);
            this.net_createBulletEffect(startPos, endPos);
            Tools.playShakeEffect(this.localPlayer, true);
            return true
        }
        return false
    }
    /**取消自动射击 */
    cancelAutoShoot(){
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
        this.isClick = false
    }
}