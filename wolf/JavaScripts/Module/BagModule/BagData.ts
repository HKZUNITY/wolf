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