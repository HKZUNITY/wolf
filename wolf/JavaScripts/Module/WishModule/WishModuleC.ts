import { Notice } from "../../CommonUI/notice/Notice";
import PortalData, { ResultData, WishResponseData_S, Commodity } from "../../PortalData";
import ExecutorManager from "../../WaitingQueue";
import DanMuModuleC, { DanmuSyncServer } from "../DanMuModule/DanMuModuleC";
import MallModuleC from "../MallModule/MallModuleC";
import WishPanel from "./ui/WishPanel";
import { WishData, WishDataV0 } from "./WishData";
import WishModuleS from "./WishModuleS";
import WishTools from "./WishTools";

export default class WishModuleC extends ModuleC<WishModuleS, WishData> {
    private hudModuleC: DanMuModuleC = null;
    private get getHudModuleC(): DanMuModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(DanMuModuleC);
        }
        return this.hudModuleC;
    }

    private mallModuleC: MallModuleC = null;
    private get getMallModuleC(): MallModuleC {
        if (!this.mallModuleC) {
            this.mallModuleC = ModuleService.getModule(MallModuleC);
        }
        return this.mallModuleC;
    }

    private wishPanel: WishPanel;
    private get getWishPanel(): WishPanel {
        if (!this.wishPanel) {
            this.wishPanel = UIService.getUI(WishPanel);
        }
        return this.wishPanel;
    }

    public onSelectItemAction: Action1<WishDataV0> = new Action1<WishDataV0>();
    public onRequestBuyAction: Action1<WishDataV0> = new Action1<WishDataV0>();
    public onBuyAction: Action1<WishDataV0> = new Action1<WishDataV0>();
    public onOpenWishAction: Action = new Action();

    protected onStart(): void {
        this.bindAction();
    }

    private bindAction() {
        this.onOpenWishAction.add(this.addOpenWishAction.bind(this));
        this.onRequestBuyAction.add(this.addRequestBuyAction.bind(this));
        this.onBuyAction.add(this.addBuyAction.bind(this));
    }

    private addOpenWishAction() {
        ExecutorManager.instance.pushAsyncExecutor(async () => {
            let wishDataV0s = await WishTools.getWishDataV0s(this.localPlayer.userId);
            if (!wishDataV0s || wishDataV0s.length == 0) {
                Notice.showDownNotice(`你还没有添加心愿单`);
                Notice.showDownNotice(`请在商城添加心愿单`);
                this.getHudModuleC.onOpenShareAction.call(1);
                return;
            }

            this.getWishPanel.refreshPanel(wishDataV0s);
        });
    }

    private addRequestBuyAction(wishDataV0: WishDataV0): void {
        console.error(JSON.stringify(wishDataV0));
        ExecutorManager.instance.pushAsyncExecutor(async () => {
            await this.getMallModuleC.updateNickWish(wishDataV0, false);
            this.getWishPanel.hide();
        });
    }

    private addBuyAction(wishDataV0: WishDataV0): void {
        console.error(JSON.stringify(wishDataV0));

        ExecutorManager.instance.pushAsyncExecutor(async () => {
            await this.giveOtherBuyWish(wishDataV0);
        })
    }

    private async giveOtherBuyWish(wishDataV0: WishDataV0): Promise<void> {
        let itemId = wishDataV0.itemId;
        let userId = wishDataV0.userId;
        let applySendWishItemResponse: ResultData<WishResponseData_S.ApplySendWishItemResponse> = await PortalData.applySendWishItemRequest(itemId, userId);
        // 1道具不合法，2用户不存在，3非好友关系，4对方拥有，5未知错误，6超过最大次数，7不是对方的心愿物品，8不能给自己赠送物品，9功能未开启，10物品正在被赠送
        let status = applySendWishItemResponse.data.status;
        switch (status) {
            case 0:
                await this.placeOrder(wishDataV0, applySendWishItemResponse.data.token);
                break;
            case 1:
                Notice.showDownNotice(`道具不合法,联系作者解决`);
                break;
            case 2:
                Notice.showDownNotice(`用户不存在`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 3:
                Notice.showDownNotice(`非好友关系`);
                RoomService.showUserProfile(() => {
                    RoomService.showUserProfile(() => {
                        Notice.showDownNotice(`非好友关系`);
                    }, userId);
                }, userId);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 4:
                Notice.showDownNotice(`对方拥有`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 5:
                Notice.showDownNotice(`联系作者解决`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 6:
                Notice.showDownNotice(`超过最大次数`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 7:
                Notice.showDownNotice(`不是对方的心愿物品`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 8:
                Notice.showDownNotice(`不能给自己赠送物品`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 9:
                Notice.showDownNotice(`功能未开启`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            case 10:
                Notice.showDownNotice(`物品正在被其他玩家赠送,请稍后再试`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
            default:
                Notice.showDownNotice(`联系作者解决`);
                await PortalData.cancelSendWishItemRequest([itemId], userId);
                break;
        }
    }

    private async placeOrder(wishDataV0: WishDataV0, token: string): Promise<void> {
        let itemId = wishDataV0.itemId;
        let userId = wishDataV0.userId;
        let commodityId = wishDataV0.commodityId;
        let price = wishDataV0.price;
        let iconGuid = wishDataV0.iconGuid;
        let itemType = wishDataV0.itemType;
        let nickName = WishTools.getNickName();
        let prefabGuid = wishDataV0.prefabGuid;
        let cInfo: Commodity = {
            commodityId: commodityId,
            number: 1,
            expand: {
                shippedParams: {
                    shippedType: "1",
                    shippedArg: token
                }
            }
        };

        let timeoutId = setTimeout(async () => {
            await PortalData.cancelSendWishItemRequest([itemId], userId);
            Notice.showDownNotice(`网络超时 取消赠送`);
        }, 60 * 1000);

        await this.syncPlaceOrder(cInfo, async (status: number) => {
            clearTimeout(timeoutId);
            let tmpWishDataV0 = new WishDataV0();
            tmpWishDataV0.userId = userId;
            tmpWishDataV0.price = price;
            tmpWishDataV0.iconGuid = iconGuid;
            tmpWishDataV0.itemType = itemType;
            tmpWishDataV0.nickName = nickName;
            tmpWishDataV0.prefabGuid = prefabGuid;
            WishTools.danmuSyncServer(WishTools.getNickName(), wishDataV0.nickName, price);
            await this.getMallModuleC.updateNickWish(tmpWishDataV0, true);
            await PortalData.cancelSendWishItemRequest([itemId], userId);
        }, async (status: number) => {
            clearTimeout(timeoutId);
            await PortalData.cancelSendWishItemRequest([itemId], userId);
        });
    }

    private syncPlaceOrder(cInfo: Commodity, successCallback: (status: number) => void, failCallback: (status: number) => void): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            mw.AvatarEditorService.placeOrder([cInfo], (stateNum, msg, orderID) => {
                switch (stateNum) {
                    case 200:
                        Notice.showDownNotice(`赠送成功`);
                        if (successCallback) successCallback(stateNum);
                        break;
                    case 408:
                        Notice.showDownNotice(`请求超时`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 409:
                        Notice.showDownNotice(`赠送失败`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 410:
                        Notice.showDownNotice(`赠送失败`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 501:
                        Notice.showDownNotice(`余额不足`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 502:
                        Notice.showDownNotice(`暂未开放购买`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 503:
                        Notice.showDownNotice(`赠送失败`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 504:
                        Notice.showDownNotice(`用户取消`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 505:
                        Notice.showDownNotice(`赠送失败`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 506:
                        Notice.showDownNotice(`该版本不支持`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    case 507:
                        Notice.showDownNotice(`赠送失败`);
                        if (failCallback) failCallback(stateNum);
                        break;
                    default:
                        Notice.showDownNotice(`赠送失败`);
                        if (failCallback) failCallback(stateNum);
                        break;
                }
                return resolve();
            });
        });
    }
}