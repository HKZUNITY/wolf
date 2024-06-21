/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-02 15:56:34
 * @LastEditors  : songyang.xie
 * @LastEditTime : 2023-02-15 15:27:30
 * @FilePath     : \murdermystery3\JavaScripts\Module\BagModule\BagData.ts
 * @Description  : 修改描述
 */
/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-14 17:10:24
 * @LastEditors: xicun.kang
 * @LastEditTime: 2023-03-13 18:00:34
 * @FilePath: \murdermystery3\JavaScripts\Module\BagModule\BagData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameConfig } from "../../Tables/GameConfig";
import Action = mw.Action;
export class BagModuleData extends Subdata {

    /**当前使用的冷武器 */
    @Decorator.persistence()
    curColdWeapon: number = 10001;
    /**当前使用的热武器 */
    @Decorator.persistence()
    curHotWeapon: number = 20001;
    /**当前拥有的所有武器 */
    @Decorator.persistence()
    weaponArr: Array<number> = [10001, 20001];
    /**玩家拥有的所有角色 */

    public readonly onColdWeaponChange: Action = new Action();
    public readonly onHotWeaponChange: Action = new Action();
    public get dataName(): string {
        return "BagDataInfo";
    }
    public initBagData() {
        this.curColdWeapon = this.curColdWeapon;
        this.curHotWeapon = this.curHotWeapon;
        this.weaponArr = this.weaponArr;
    }
    public getCurColdWeapon() {
        return this.curColdWeapon;
    }
    public setCurColdWeapon(id: number) {
        this.curColdWeapon = id;
        this.save(true)
    }
    public getCurHotWeapon() {
        return this.curHotWeapon;
    }
    public setCurHotWeapon(id: number) {
        this.curHotWeapon = id;
        this.save(true)
    }
}