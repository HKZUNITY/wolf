import PortalData from "../../PortalData";
import { DanmuSyncServer } from "../DanMuModule/DanMuModuleC";
import { WishDataV0 } from "./WishData";

export default class WishTools {

    public static async getWishDataV0s(userId: string): Promise<WishDataV0[]> {
        let wishDataV0s: WishDataV0[] = [];

        let wishListQueueResopnse = await PortalData.wishListQueueRequest(userId, 1, 100);
        if (!wishListQueueResopnse || !wishListQueueResopnse.data || !wishListQueueResopnse.data.rows) {
            console.error(`wfz - 获取心愿单失败`);
            return wishDataV0s;
        }

        let itemIds: number[] = [];
        let rows = wishListQueueResopnse.data.rows;
        for (let i = 0; i < rows.length; ++i) {
            let itemId = rows[i].itemId;
            if (!itemId || itemId.length == 0) continue;
            itemIds.push(Number(itemId));
        }
        if (itemIds.length == 0) {
            console.error(`wfz - 心愿单为空`);
            return wishDataV0s;
        }

        let commodityListObj: mw.CommodityListObj = await AvatarEditorService.asyncGetCommodityListByItemIds(itemIds);
        if (!commodityListObj || !commodityListObj.data) {
            console.error(`wfz - 获取心愿单商品信息失败`);
            return wishDataV0s;
        }

        let data = commodityListObj.data;
        for (let i = 0; i < itemIds.length; ++i) {
            let jsonData = data[itemIds[i]];
            if (!jsonData || !jsonData?.commodityId) continue;
            let wishDataV0 = new WishDataV0();
            wishDataV0.commodityId = jsonData?.commodityId;
            wishDataV0.iconGuid = jsonData?.iconGuid;
            wishDataV0.itemId = jsonData?.itemId;
            wishDataV0.itemName = jsonData?.itemName;
            wishDataV0.prefabGuid = jsonData?.prefabGuid;
            wishDataV0.price = jsonData?.price;
            wishDataV0.itemType = jsonData?.itemType;
            wishDataV0.userId = userId;
            wishDataV0.nickName = this.getNickName();
            wishDataV0s.push(wishDataV0);
        }

        if (wishDataV0s.length == 0) {
            console.error(`wfz - 心愿单数据转化失败`);
        }

        return wishDataV0s;
    }

    public static pendantItemTypes: number[] = [
        28,
        29,
        30,
        31,
        32,
        39,
        40,
        42,
        49,
        7,
        18, 47, 51, 52, 8, 5, 6, 27, 48, 43, 53,
    ];

    private static nickName: string = null;
    public static getNickName(): string {
        if (!this.nickName) this.nickName = AccountService.getNickName();
        return this.nickName ? this.nickName : `账号异常`;
    }

    public static danmuSyncServer(name1: string, name2: string, price: number): void {
        Event.dispatchToLocal(DanmuSyncServer, `玩家《${name1}》赠送给玩家《${name2}》价值${price}派对币的心愿单`);
        for (let i = 0; i < 5; ++i) {
            TimeUtil.delaySecond(i).then(() => {
                Event.dispatchToLocal(DanmuSyncServer, `玩家《${name1}》赠送给玩家《${name2}》价值${price}派对币的心愿单`);
            });
        }
    }
}