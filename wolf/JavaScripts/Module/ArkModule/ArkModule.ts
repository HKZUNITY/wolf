// import { Notice } from "../../CommonUI/notice/Notice";
// import { MapEx } from "../../MapEx";
// import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
// import { Tools } from "../../Tools";
// import ArkItem_Generate from "../../ui-generate/module/ArkModule/ArkItem_generate";
// import ArkPanel_Generate from "../../ui-generate/module/ArkModule/ArkPanel_generate";
// import GiftBagPanel_Generate from "../../ui-generate/module/ArkModule/GiftBagPanel_generate";
// import ChatPanel from "../DanMuModule/ui/ChatPanel";
// import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
// import HUDPanel from "../PlayerModule/ui/HUDPanel";

// const rewardDiamond: Map<string, { isLimit: boolean, icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }> = new Map<string, { isLimit: boolean, icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }>();
// rewardDiamond.set("5pAdmFoKWQK0001Ps", { isLimit: false, icon: "159364", rewardCount: 100, price: 100, itemPos: new mw.Vector2(178, 0) });
// rewardDiamond.set("1oBD91jW2qJ0001Pt", { isLimit: false, icon: "321689", rewardCount: 600, price: 600, itemPos: new mw.Vector2(422, 0) });
// rewardDiamond.set("6MLWVbKluBJ0001Pu", { isLimit: false, icon: "321690", rewardCount: 1000, price: 1000, itemPos: new mw.Vector2(750, 0) });
// rewardDiamond.set("3xe0XnpwA5f0001Pv", { isLimit: true, icon: "321691", rewardCount: 1000, price: 600, itemPos: new mw.Vector2(178, 320) });
// rewardDiamond.set("6hUSZGPoepS0001Pw", { isLimit: true, icon: "321692", rewardCount: 3000, price: 1800, itemPos: new mw.Vector2(422, 320) });
// rewardDiamond.set("7PZDNDQHJmg0001Px", { isLimit: true, icon: "321693", rewardCount: 10800, price: 6800, itemPos: new mw.Vector2(750, 320) });
// const arkIcon: string = "312541";
// const advIcon: string = "181394";

// export class ArkItem extends ArkItem_Generate {
//     private arkModuleC: ArkModuleC = null;
//     private get getArkModuleC(): ArkModuleC {
//         if (!this.arkModuleC) {
//             this.arkModuleC = ModuleService.getModule(ArkModuleC);
//         }
//         return this.arkModuleC;
//     }

//     protected onStart(): void {
//         this.bindButton();
//     }

//     private bindButton(): void {
//         this.mClickButton.onClicked.add(this.addClickButton.bind(this));
//     }

//     private addClickButton(): void {
//         this.getArkModuleC.placeOrder(this.commodityId, () => {
//             if (rewardDiamond.get(this.commodityId).isLimit) {
//                 this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//                 this.mHasTextBlock.text = `今日已售空`;
//             }
//         });
//     }

//     private commodityId: string = "";
//     public initArkItem(commodityId: string): void {
//         this.commodityId = commodityId;
//         this.updateUI();
//     }

//     private updateUI(): void {
//         if (rewardDiamond.get(this.commodityId).isLimit) {
//             this.mDayTextBlock.text = `每天限购一次`;
//             if (!this.getArkModuleC.isBuy(this.commodityId)) {
//                 this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
//             } else {
//                 this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//                 this.mHasTextBlock.text = `今日已售空`;
//             }
//         } else {
//             this.mDayTextBlock.text = `不限购`;
//             this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
//         }
//         let data = rewardDiamond.get(this.commodityId);
//         this.mIconImage.imageGuid = data.icon;
//         this.mRewardTextBlock.text = `广告券 +${data.rewardCount}`;
//         this.mTipsIconImage.imageGuid = arkIcon;
//         this.mTipsTextBlock.text = `${data.price}`;
//     }
// }

// export class ArkPanel extends ArkPanel_Generate {
//     private hudPanel: HUDPanel = null;
//     private get getHUDPanel(): HUDPanel {
//         if (!this.hudPanel) {
//             this.hudPanel = UIService.getUI(HUDPanel);
//         }
//         return this.hudPanel;
//     }

//     private chatPanel: ChatPanel = null;
//     private get getChatPanel(): ChatPanel {
//         if (!this.chatPanel) {
//             this.chatPanel = UIService.getUI(ChatPanel);
//         }
//         return this.chatPanel;
//     }

//     protected onStart(): void {
//         this.initUI();
//         this.bindButton();
//     }

//     private initUI(): void {
//         this.mIconArkImage.imageGuid = arkIcon;
//         this.mIconCoinImage.imageGuid = advIcon;
//         this.mTitleTextBlock.text = `充值广告券`;
//         this.initArkItem();
//     }

//     private bindButton(): void {
//         this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
//     }

//     private addCloseButton(): void {
//         this.hide();
//         this.getHUDPanel.hideShop();
//         this.getChatPanel.show();
//     }

//     private arkItems: ArkItem[] = [];
//     private initArkItem(): void {
//         rewardDiamond.forEach((value: {
//             icon: string;
//             rewardCount: number;
//             price: number;
//             itemPos: mw.Vector2;
//         }, key: string) => {
//             let arkItem = mw.UIService.create(ArkItem);
//             arkItem.initArkItem(key);
//             this.mCanvas.addChild(arkItem.uiObject);
//             arkItem.uiObject.position = value.itemPos;
//             this.arkItems.push(arkItem);
//         });
//     }

//     public updateArkTextBlock(arkCount: number): void {
//         this.mArkCountTextBlock.text = `${arkCount}`;
//     }

//     public updateAdvTextBlock(advCount: number): void {
//         this.mCoinCountTextBlock.text = `${advCount}`;
//     }

//     public updateUserIdTextBlock(str: string): void {
//         this.mUserIdTextBlock.text = `${str ? str : `UserId`}:${Player.localPlayer.userId}`;
//     }
// }

// export class ArkData extends Subdata {
//     @Decorator.persistence()
//     public lastDayStr: string = "";

//     @Decorator.persistence()
//     public secondDayStr: string = "";

//     @Decorator.persistence()
//     public isLimitStrs: MapEx.MapExClass<string> = {};

//     @Decorator.persistence()
//     public isGetGiftBags: MapEx.MapExClass<boolean> = {};

//     public setLimitStr(key: string, day: string): void {
//         MapEx.set(this.isLimitStrs, key, day);
//         this.save(true);
//     }

//     public setGetGiftBag(key: string, isGet: boolean): void {
//         MapEx.set(this.isGetGiftBags, key, isGet);
//         this.save(true);
//     }

//     public isGetGiftBag(key: string): boolean {
//         if (!this.isGetGiftBags || MapEx.count(this.isGetGiftBags) == 0) return false;
//         return MapEx.has(this.isGetGiftBags, key);
//     }
// }

// export class ArkModuleC extends ModuleC<ArkModuleS, ArkData> {
//     private arkPanel: ArkPanel = null;
//     private get getArkPanel(): ArkPanel {
//         if (!this.arkPanel) {
//             this.arkPanel = UIService.getUI(ArkPanel);
//         }
//         return this.arkPanel;
//     }

//     private hudPanel: HUDPanel = null;
//     private get getHUDPanel(): HUDPanel {
//         if (!this.hudPanel) {
//             this.hudPanel = UIService.getUI(HUDPanel);
//         }
//         return this.hudPanel;
//     }

//     private chatPanel: ChatPanel = null;
//     private get getChatPanel(): ChatPanel {
//         if (!this.chatPanel) {
//             this.chatPanel = UIService.getUI(ChatPanel);
//         }
//         return this.chatPanel;
//     }

//     protected onStart(): void {
//         this.bindAction();
//     }

//     private bindAction(): void {
//         mw.PurchaseService.onArkBalanceUpdated.add(this.addArkUpdate.bind(this));
//         Event.addLocalListener(`UpdateAdv`, (advCount: number) => {
//             this.getArkPanel.updateAdvTextBlock(advCount);
//         });
//     }

//     protected onEnterScene(sceneType: number): void {
//         this.isLimitStrs = this.data.isLimitStrs;
//     }

//     private addArkUpdate(amount: number): void {
//         //刷新逻辑，amount为当前代币数量
//         console.error(`ArkModuleC addArkUpdate amount: ${amount}`);
//         this.getArkPanel.updateArkTextBlock(amount);
//     }

//     public addOpenArkPanel(): void {
//         this.getArkPanel.show();
//         this.getHUDPanel.showShop();
//         this.getChatPanel.hide();
//         mw.PurchaseService.getArkBalance(); // 触发代币余额刷新。接收更新的值要用mw.PurchaseService.onArkBalanceUpdated
//     }

//     private isCanContinueClick: boolean = true;
//     public placeOrder(commodityId: string, buySuccessCallback: () => void): void {
//         if (rewardDiamond.get(commodityId).isLimit && this.isBuy(commodityId)) {
//             Notice.showDownNotice(`今日已售空,请更换其他商品购买`);
//             return;
//         }
//         if (!this.isCanContinueClick) {
//             Notice.showDownNotice(`3秒冷却`);
//             return;
//         }
//         this.isCanContinueClick = false;
//         TimeUtil.delaySecond(3).then(() => {
//             this.isCanContinueClick = true;
//         });
//         if (mw.SystemUtil.isPIE) {
//             if (rewardDiamond.get(commodityId).isLimit) this.setLimitStr(commodityId);
//             if (buySuccessCallback) buySuccessCallback();
//             let rewardCount = rewardDiamond.get(commodityId).rewardCount;
//             Notice.showDownNotice(`广告券+${rewardCount}`);
//             ModuleService.getModule(PlayerModuleC).addAdvToken(rewardCount);
//         } else {
//             mw.PurchaseService.placeOrder(commodityId, 1, (status, msg) => {
//                 mw.PurchaseService.getArkBalance();//刷新代币数量
//                 if (status != 200) return;
//                 if (rewardDiamond.get(commodityId).isLimit) this.setLimitStr(commodityId);
//                 if (buySuccessCallback) buySuccessCallback();
//             });
//         }
//     }

//     public net_deliverGoods(commodityId: string, amount: number): void {
//         //根据commodityId和amount来处理收货逻辑
//         console.error(`ArkModuleC net_deliverGoods commodityId: ${commodityId}, amount: ${amount}`);
//         let rewardCount = rewardDiamond.get(commodityId).rewardCount;
//         Notice.showDownNotice(`广告券+${rewardCount}`);
//         ModuleService.getModule(PlayerModuleC).addAdvToken(rewardCount);
//     }

//     public isBuy(key: string): boolean {
//         if (MapEx.has(this.isLimitStrs, key)) {
//             return MapEx.get(this.isLimitStrs, key) == Tools.getDay();
//         }
//         return false;
//     }

//     private isLimitStrs: MapEx.MapExClass<string> = {};
//     public setLimitStr(key: string): void {
//         let lastDayStr = Tools.getDay();
//         MapEx.set(this.isLimitStrs, key, lastDayStr);
//         this.server.net_setLimitStr(key, lastDayStr);
//     }

//     private isCanGetGiftBag: boolean = true;
//     public getGiftBag(coodStr: string): void {
//         if (!this.isCanGetGiftBag) {
//             Notice.showDownNotice(`冷却3秒`);
//             return;
//         }
//         this.isCanGetGiftBag = false;
//         TimeUtil.delaySecond(3).then(() => { this.isCanGetGiftBag = true; });
//         this.server.net_getGiftBag(coodStr);
//     }

//     public net_getGiftBag(giftBagCood: GiftBagCood, messageJson: string): void {
//         if (giftBagCood == GiftBagCood.Success) {
//             Notice.showDownNotice(`兑换成功`);
//             let message = JSON.parse(messageJson);
//             let giftBagData = message as GiftBagData;

//             if (giftBagData?.diamond && giftBagData?.diamond > 0) {
//                 Notice.showDownNotice(`广告券+${giftBagData.diamond}`);
//                 ModuleService.getModule(PlayerModuleC).addAdvToken(giftBagData.diamond);
//             }

//             if (giftBagData?.lv && giftBagData?.lv > 0) {
//                 Notice.showDownNotice(`金币+${giftBagData.lv}`);
//                 ModuleService.getModule(PlayerModuleC).addCoin(giftBagData.lv);
//             }
//         } else if (giftBagCood == GiftBagCood.Fail) {
//             Notice.showDownNotice(`礼包兑换码错误`);
//             Notice.showDownNotice(`领取失败`);
//         } else if (giftBagCood == GiftBagCood.Exchanged) {
//             Notice.showDownNotice(`已兑换，无需重复兑换`);
//         }
//     }

//     public net_syncArkStr(str: string): void {
//         this.getArkPanel.updateUserIdTextBlock(str);
//     }
// }

// export class ArkModuleS extends ModuleS<ArkModuleC, ArkData> {
//     protected onStart(): void {
//         this.bindAction();
//     }

//     protected onPlayerEnterGame(player: mw.Player): void {
//         this.syncArkStr(player);
//     }

//     private bindAction(): void {
//         mw.PurchaseService.onOrderDelivered.add(this.addShipOrder.bind(this));
//     }

//     private addShipOrder(playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean) => void): void {
//         //根据playerId和commodityId来处理购买逻辑
//         this.getClient(playerId).net_deliverGoods(commodityId, amount);
//         confirmOrder(true);//调用这个方法表示确认收货成功
//     }

//     @Decorator.noReply()
//     public net_setLimitStr(key: string, day: string): void {
//         this.currentData.setLimitStr(key, day);
//     }

//     @Decorator.noReply()
//     public net_getGiftBag(coodStr: string): void {
//         // console.error(`ArkModuleS net_getGiftBag coodStr: ${coodStr}`);
//         let player = this.currentPlayer;
//         if (coodStr.length == 6) {
//             let isGetGiftBag = DataCenterS.getData(player, ArkData).isGetGiftBag(coodStr);
//             if (isGetGiftBag) {
//                 this.getClient(player).net_getGiftBag(GiftBagCood.Exchanged, null);
//             } else {
//                 this.getCustomdata("WorldGiftBag").then((value: any) => {
//                     if (!value) {
//                         this.getClient(player).net_getGiftBag(GiftBagCood.Fail, null);
//                         return;
//                     }
//                     let giftBagDatas: GiftBagData[] = value as GiftBagData[];
//                     // console.error(`giftBagDatas:${JSON.stringify(giftBagDatas)}`);
//                     let giftBagData: GiftBagData = null;
//                     for (let i = 0; i < giftBagDatas.length; ++i) {
//                         if (giftBagDatas[i].coodStr == coodStr) {
//                             giftBagData = giftBagDatas[i];
//                             break;
//                         }
//                     }
//                     if (giftBagData) {
//                         DataCenterS.getData(player, ArkData).setGetGiftBag(coodStr, true);
//                         this.getClient(player).net_getGiftBag(GiftBagCood.Success, JSON.stringify(giftBagData));
//                     } else {
//                         this.getClient(player).net_getGiftBag(GiftBagCood.Fail, null);
//                     }
//                 });
//             }
//         } else {
//             PurchaseService.redeemGiftCode(player, coodStr, (result) => {
//                 this.getClient(player).net_getGiftBag(((result.status == 200 || result.status == 1) ? GiftBagCood.Success : GiftBagCood.Fail), result.message);
//             });
//         }
//     }

//     private async syncArkStr(player: mw.Player): Promise<void> {
//         let str: string = await this.getCustomdata("WorldArkStr");
//         this.getClient(player).net_syncArkStr(str);
//     }

//     public async getCustomdata(key: string): Promise<any> {
//         let data = null;
//         data = await GeneralManager.asyncRpcGetData(key);
//         return data;
//     }
// }

// export class GiftBagPanel extends GiftBagPanel_Generate {
//     private arkModuleC: ArkModuleC = null;
//     private get getArkModuleC(): ArkModuleC {
//         if (!this.arkModuleC) {
//             this.arkModuleC = ModuleService.getModule(ArkModuleC);
//         }
//         return this.arkModuleC;
//     }
//     protected onStart(): void {
//         this.initUI();
//         this.bindButton();
//     }

//     private initUI(): void {
//         this.mTitleTextBlock.text = `礼包兑换`;
//         this.mInputTipsTextBlock.text = `请输入作者提供的兑换码\n即可兑换奖励`;
//     }

//     private bindButton(): void {
//         this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
//         this.mGetButton.onClicked.add(this.addGetButton.bind(this));
//     }

//     private addCloseButton(): void {
//         this.hide();
//     }

//     private addGetButton(): void {
//         let coodStr = this.mInputBox.text;
//         if (!coodStr || coodStr == "") {
//             Notice.showDownNotice(`请输入兑换码`);
//             console.error(`请输入兑换码`);
//             return;
//         }
//         this.getArkModuleC.getGiftBag(coodStr);
//     }
// }

// export class GiftBagData {
//     public coodStr: string;
//     public diamond: number;
//     public lv: number;
// }

// export enum GiftBagCood {
//     Success = 200,
//     Fail = 0,
//     Exchanged = 1000
// }