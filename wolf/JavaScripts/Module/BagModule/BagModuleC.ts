/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-02 15:56:34
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-14 13:41:18
 * @FilePath     : \murdermystery3\JavaScripts\Module\BagModule\BagModuleC.ts
 * @Description  : 修改描述
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { BagModuleData } from "./BagData";
import { BagModuleS } from "./BagModuleS";
import { HotWeaponModuleC } from "../Weapon/HotWeapon/HotWeaponModuleC";
import { ColdWeaponModuleC } from "../Weapon/ColdWeapon/ColdWeaponModuleC";
import P_Game from "../../UILogic/Game/P_Game";
import { GameModuleC } from "../GameModule/GameModuleC";
import { Tools } from "../../Tools";

export class BagModuleC extends ModuleC<BagModuleS, BagModuleData>{

    private frame: number = 0;
    private refreshCd: number = null;
    private control: boolean = false;
    private hotWeapon: mw.GameObject;
    onStart(): void {

    }
    onEnterScene(sceneType: number): void {

    }
    onUpdate(dt: number): void {
        if (this.control) {
            this.frame += dt;
            if (this.frame > this.refreshCd) {
                this.frame = 0;
                P_Game.instance.autoCold(true);
            }
        }
    }

    net_contorlCold(bo: boolean, time: number = 0.2): void {
        this.refreshCd = time;
        this.frame = this.refreshCd;
        this.control = bo;
    };

    net_hideAutoModule(){
        ModuleService.getModule(GameModuleC).clearAutoAnim(false);
    }

    showPlayerColdWeapon() {
        this.server.net_showPlayerColdWeapon()
    }
    /**获取热武器id */
    getHotWeaponId(){
        return this.data.getCurHotWeapon()
    }
    /**获取冷兵器id */
    getColdWeaponId(){
        return this.data.getCurColdWeapon()
    }
    async net_setHotWeaponObj(guid: string){
        this.hotWeapon = await GameObject.asyncFindGameObjectById(guid);
    }
    
    getFirePos(){
        if (this.hotWeapon) {
            return Tools.getFirePos(this.hotWeapon);
        }
        return this.localPlayer.character.worldTransform.position.clone();
    }
}