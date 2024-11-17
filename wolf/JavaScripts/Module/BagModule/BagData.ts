import { Tools } from "../../Tools";
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
    public async initBagData(player: mw.Player) {
        await this.checkIsGetOldData(player);
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

    @Decorator.persistence()
    public isGetOldData: boolean = false;
    public setIsGetOldData(): void {
        this.isGetOldData = true;
        this.save(false);
    }

    private async checkIsGetOldData(player: mw.Player): Promise<void> {
        let bagData = DataCenterS.getData(player, BagModuleData);
        if (bagData.isGetOldData) return;
        bagData.setIsGetOldData();
        let data = await Tools.asyncGetOtherGameData(`${player.userId}_SubData_BagDataInfo`);
        if (!data) return;
        if (data?.code != 200) return;
        let bagInfo = data?.data as BagModuleData;
        if (!bagInfo) return;
        if (bagInfo?.curColdWeapon > 0) {
            bagData.curColdWeapon = bagInfo.curColdWeapon;
        }
        if (bagInfo?.curHotWeapon > 0) {
            bagData.curHotWeapon = bagInfo.curHotWeapon;
        }
        if (bagInfo?.weaponArr && bagInfo?.weaponArr.length > 0) {
            bagData.weaponArr = bagInfo.weaponArr;
        }
        bagData.save(true);
    }
}