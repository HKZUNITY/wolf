import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { ColdWeaponModuleS } from "./ColdWeaponModuleS";
import { ColdWeaponAttackMode, GameGlobals, KillType, PlayerWeaponState } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import { AutoAimModuleC } from "../Aim/AutoAimModuleC";
import P_Game from "../../../UILogic/Game/P_Game";
import { BagModuleC } from "../../BagModule/BagModuleC";
import { GameModuleC } from "../../GameModule/GameModuleC";
import { Tools } from "../../../Tools";

export class ColdWeaponModuleC extends ModuleC<ColdWeaponModuleS, null>{
    public weaponMode: ColdWeaponAttackMode = ColdWeaponAttackMode.Normal
    /**飞刀冷却时间 */
    private coolTime: number
    /**是否能够投掷飞刀 */
    private canShoot: boolean = true
    /**是否正在投掷飞刀 */
    private isShooting: boolean = false
    private findEnemyScale: number
    private curPlayer: mw.Player
    /**攻击前摇 */
    private preAttackTime: number
    /**攻击计时器*/
    private timer: number
    /**准备飞刀动作 */
    private holdKnifeAction: string
    /**投掷飞刀动作*/
    private throwKnifeAction: string
    /**投掷飞刀动作播放速率 */
    private throwKnifeActionRate: number
    onStart(): void {
        this.findEnemyScale = GameConfig.Rule.getElement(40001).Num
        this.initWeaponData()
    }

    async onEnterScene(sceneType: number) {
    }

    initWeaponData() {
        let dataInfo = GameConfig.Weapon.getElement(GameGlobals.throwKnifeDataId)
        this.preAttackTime = dataInfo.AttackLatency
        this.coolTime = GameConfig.Rule.getElement(40009).Time;
        this.holdKnifeAction = dataInfo.HoldPosture.toString()
        this.throwKnifeAction = dataInfo.AttackActionGUID.toString()
        this.throwKnifeActionRate = dataInfo.AttackRate
    }

    async initAutoAimMoudule() {
        await ModuleService.getModule(AutoAimModuleC).startLineTrace((endPos:mw.Vector)=>{this.onAutoShootBtnHandler(endPos)})
        ModuleService.getModule(AutoAimModuleC).initAutoModule(this.findEnemyScale, true)
    }

    beginKnifeAttack() {
        this.server.net_KnifeAttack();
    }
    /**切换武器攻击模式 */
    onChangeColdWeaponAttackMode(state: PlayerWeaponState) {
        if (state == PlayerWeaponState.ThrowKnife) {
            this.weaponMode = ColdWeaponAttackMode.FlyKnife
            P_Game.instance.changeColdWeaponState(PlayerWeaponState.ThrowKnife)
            if (this.canShoot == true) {
                this.showColdWeaponAimBtn()
            }
        }
        else if (state == PlayerWeaponState.UnEquip) {
            this.weaponMode = ColdWeaponAttackMode.Normal
            P_Game.instance.changeColdWeaponState(PlayerWeaponState.UnEquip)
            this.hideColdWeaponAimBtn()
            this.cancelThrowKnife()
        }

    }
    /**点击回调方法 */
    onAutoShootBtnHandler(endPos: Vector) {
        PlayerManagerExtesion.rpcPlayAnimation(this.localPlayer.character, this.throwKnifeAction, this.throwKnifeActionRate);
        this.cancelThrowKnife()
        this.isShooting = true
        this.timer = setTimeout(() => {
            this.shoot(endPos)
        }, this.preAttackTime * 1000);
    }
    /**获取是否能够射击 */
    getIsCanShoot(){
        return this.canShoot && this.weaponMode == ColdWeaponAttackMode.FlyKnife;
    }
    

    /**判断当前是否能够射击 */
    shoot(endPos: Vector) {
        this.isShooting = false
        if (this.canShoot == true) {
            this.canShoot = false
            console.error(`1 ======== ${this.canShoot}`);
            this.hideColdWeaponAimBtn()
            setTimeout(() => {
                this.canShoot = true
                console.error(`2 ======== ${this.canShoot}`);
                if (this.weaponMode == ColdWeaponAttackMode.FlyKnife) {
                    this.showColdWeaponAimBtn()
                }
            }, this.coolTime * 1000);
        }
        
        this.server.net_throwColdWeapon(endPos.normalized);
        Tools.playShakeEffect(this.localPlayer, true);
        ModuleService.getModule(BagModuleC).showPlayerColdWeapon()
        P_Game.instance.showShootCd()
        this.timer = null
    }
    /**取消装备武器 */
    unequipWeapon() {
        this.hideColdWeaponAimBtn()
        this.weaponMode = ColdWeaponAttackMode.Normal
        P_Game.instance.changeColdWeaponState(PlayerWeaponState.UnEquip)
        this.cancelThrowKnife()
    }
    /**装备武器 */
    equipWeapon() {
        this.weaponMode = ColdWeaponAttackMode.Normal
        P_Game.instance.isEnableChangeWeaponBtn(true)
        P_Game.instance.changeColdWeaponState(PlayerWeaponState.Knife)
        this.cancelThrowKnife()
        this.hideColdWeaponAimBtn()
    }
    /**显示投掷自动瞄准*/
    private showColdWeaponAimBtn() {
        ModuleService.getModule(AutoAimModuleC).startForesight()
    }
    /**隐藏投掷自动瞄准 */
    private hideColdWeaponAimBtn() {
        ModuleService.getModule(AutoAimModuleC).endForesight()
    }
    /**取消飞刀攻击*/
    private cancelThrowKnife() {
        this.isShooting = false
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
    net_hideWeapon(guid: string) {
        GameObject.asyncFindGameObjectById(guid).then((obj: mw.GameObject) => {
            obj.setVisibility(mw.PropertyStatus.Off)
        })
    }
    net_showWeapon(guid: string) {
        GameObject.asyncFindGameObjectById(guid).then((obj: mw.GameObject) => {
            obj.setVisibility(mw.PropertyStatus.On)
        })
    }
    net_playHitPlayerEffect(){
        Tools.playShakeEffect(this.localPlayer, true);
    }
}
