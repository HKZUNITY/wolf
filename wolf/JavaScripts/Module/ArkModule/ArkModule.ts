import { Notice } from "../../CommonUI/notice/Notice";
import { Globals } from "../../Globals";
import { MapEx } from "../../MapEx";
import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import ArkItem_Generate from "../../ui-generate/module/ArkModule/ArkItem_generate";
import ArkPanel_Generate from "../../ui-generate/module/ArkModule/ArkPanel_generate";
import ChatPanel from "../DanMuModule/ui/ChatPanel";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import HUDPanel from "../PlayerModule/ui/HUDPanel";

const rewardDiamond: Map<string, { isLimit: boolean, icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }> = new Map<string, { isLimit: boolean, icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }>();
rewardDiamond.set("5a3O4Lzar7a0001fo", { isLimit: false, icon: "159364", rewardCount: 100, price: 100, itemPos: new mw.Vector2(178, 150) });
rewardDiamond.set("7aKTbQLSUvz0001fq", { isLimit: false, icon: "321690", rewardCount: 1000, price: 1000, itemPos: new mw.Vector2(502, 150) });
rewardDiamond.set("1gPo2aimq5A0001fp", { isLimit: true, icon: "321691", rewardCount: 1000, price: 600, itemPos: new mw.Vector2(826, 150) });
const arkIcon: string = "312541";
const advIcon: string = "181394";

export class ArkItem extends ArkItem_Generate {
    private arkModuleC: ArkModuleC = null;
    private get getArkModuleC(): ArkModuleC {
        if (!this.arkModuleC) {
            this.arkModuleC = ModuleService.getModule(ArkModuleC);
        }
        return this.arkModuleC;
    }

    protected onStart(): void {
        this.initTextBlock();
        this.bindButton();
    }

    private initTextBlock(): void {
        if (Globals.languageId == 0) {
            this.mRewardTextBlock.fontSize = 20;
            this.mDayTextBlock.fontSize = 15;
        } else {
            this.mRewardTextBlock.fontSize = 28;
            this.mDayTextBlock.fontSize = 25;
        }
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.addClickButton.bind(this));
    }

    private addClickButton(): void {
        this.getArkModuleC.placeOrder(this.commodityId, () => {
            if (rewardDiamond.get(this.commodityId).isLimit) {
                this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mHasTextBlock.text = GameConfig.Language.Text_Soldouttoday.Value;
            }
        });
    }

    private commodityId: string = "";
    public initArkItem(commodityId: string): void {
        this.commodityId = commodityId;
        this.updateUI();
    }

    private updateUI(): void {
        if (rewardDiamond.get(this.commodityId).isLimit) {
            this.mDayTextBlock.text = GameConfig.Language.Text_Limitedtoonepurchaseperday.Value;
            if (!this.getArkModuleC.isBuy(this.commodityId)) {
                this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
            } else {
                this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mHasTextBlock.text = GameConfig.Language.Text_Soldouttoday.Value;
            }
        } else {
            this.mDayTextBlock.text = GameConfig.Language.Text_Nopurchaserestrictions.Value;
            this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
        }
        let data = rewardDiamond.get(this.commodityId);
        this.mIconImage.imageGuid = data.icon;
        this.mRewardTextBlock.text = `${GameConfig.Language.Text_AdvertisingCoupon.Value} + ${data.rewardCount} `;
        this.mTipsIconImage.imageGuid = arkIcon;
        this.mTipsTextBlock.text = `${data.price} `;
    }
}

export class ArkPanel extends ArkPanel_Generate {
    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }

    private chatPanel: ChatPanel = null;
    private get getChatPanel(): ChatPanel {
        if (!this.chatPanel) {
            this.chatPanel = UIService.getUI(ChatPanel);
        }
        return this.chatPanel;
    }

    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mIconArkImage.imageGuid = arkIcon;
        this.mIconCoinImage.imageGuid = advIcon;
        this.mTitleTextBlock.text = GameConfig.Language.Text_Rechargediamonds.Value;
        this.initArkItem();
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
    }

    private addCloseButton(): void {
        this.hide();
        this.getHUDPanel.hideShop();
        this.getChatPanel.show();
    }

    private arkItems: ArkItem[] = [];
    private initArkItem(): void {
        rewardDiamond.forEach((value: {
            icon: string;
            rewardCount: number;
            price: number;
            itemPos: mw.Vector2;
        }, key: string) => {
            let arkItem = mw.UIService.create(ArkItem);
            arkItem.initArkItem(key);
            this.mCanvas.addChild(arkItem.uiObject);
            arkItem.uiObject.position = value.itemPos;
            this.arkItems.push(arkItem);
        });
    }

    public updateArkTextBlock(arkCount: number): void {
        this.mArkCountTextBlock.text = `${arkCount} `;
    }

    public updateAdvTextBlock(advCount: number): void {
        this.mCoinCountTextBlock.text = `${advCount} `;
    }

    public updateUserIdTextBlock(str: string): void {
        this.mUserIdTextBlock.text = `${str ? str : `UserId`}:${Player.localPlayer.userId} `;
    }
}

export class ArkData extends Subdata {
    @Decorator.persistence()
    public isLimitStrs: MapEx.MapExClass<string> = {};

    public setLimitStr(key: string, day: string): void {
        MapEx.set(this.isLimitStrs, key, day);
        this.save(true);
    }
}

export class ArkModuleC extends ModuleC<ArkModuleS, ArkData> {
    private arkPanel: ArkPanel = null;
    private get getArkPanel(): ArkPanel {
        if (!this.arkPanel) {
            this.arkPanel = UIService.getUI(ArkPanel);
        }
        return this.arkPanel;
    }

    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }

    private chatPanel: ChatPanel = null;
    private get getChatPanel(): ChatPanel {
        if (!this.chatPanel) {
            this.chatPanel = UIService.getUI(ChatPanel);
        }
        return this.chatPanel;
    }

    protected onStart(): void {
        this.bindAction();
    }

    private bindAction(): void {
        mw.PurchaseService.onArkBalanceUpdated.add(this.addArkUpdate.bind(this));
        Event.addLocalListener(`UpdateAdv`, (advCount: number) => {
            this.getArkPanel.updateAdvTextBlock(advCount);
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.isLimitStrs = this.data.isLimitStrs;
    }

    private addArkUpdate(amount: number): void {
        //刷新逻辑，amount为当前代币数量
        console.error(`ArkModuleC addArkUpdate amount: ${amount} `);
        this.getArkPanel.updateArkTextBlock(amount);
    }

    public addOpenArkPanel(): void {
        this.getArkPanel.show();
        this.getHUDPanel.showShop();
        this.getChatPanel.hide();
        mw.PurchaseService.getArkBalance(); // 触发代币余额刷新。接收更新的值要用mw.PurchaseService.onArkBalanceUpdated
    }

    private isCanContinueClick: boolean = true;
    public placeOrder(commodityId: string, buySuccessCallback: () => void): void {
        if (rewardDiamond.get(commodityId).isLimit && this.isBuy(commodityId)) {
            Notice.showDownNotice(GameConfig.Language.Text_SoldouttodayPleaseReplaceWithOtherProductsToPurchase.Value);
            return;
        }
        if (!this.isCanContinueClick) {
            Notice.showDownNotice(GameConfig.Language.Text_TipsTooFast.Value);
            return;
        }
        this.isCanContinueClick = false;
        TimeUtil.delaySecond(3).then(() => {
            this.isCanContinueClick = true;
        });
        if (mw.SystemUtil.isPIE) {
            if (rewardDiamond.get(commodityId).isLimit) this.setLimitStr(commodityId);
            if (buySuccessCallback) buySuccessCallback();
            let rewardCount = rewardDiamond.get(commodityId).rewardCount;
            Notice.showDownNotice(`${GameConfig.Language.Text_AdvertisingCoupon.Value} + ${rewardCount} `);
            ModuleService.getModule(PlayerModuleC).addAdvToken(rewardCount);
        } else {
            mw.PurchaseService.placeOrder(commodityId, 1, (status, msg) => {
                mw.PurchaseService.getArkBalance();//刷新代币数量
                if (status != 200) return;
                if (rewardDiamond.get(commodityId).isLimit) this.setLimitStr(commodityId);
                if (buySuccessCallback) buySuccessCallback();
            });
        }
    }

    public net_deliverGoods(commodityId: string, amount: number): void {
        //根据commodityId和amount来处理收货逻辑
        console.error(`ArkModuleC net_deliverGoods commodityId: ${commodityId}, amount: ${amount} `);
        let rewardCount = rewardDiamond.get(commodityId).rewardCount;
        Notice.showDownNotice(`${GameConfig.Language.Text_AdvertisingCoupon.Value} + ${rewardCount} `);
        ModuleService.getModule(PlayerModuleC).addAdvToken(rewardCount);
    }

    public isBuy(key: string): boolean {
        if (MapEx.has(this.isLimitStrs, key)) {
            return MapEx.get(this.isLimitStrs, key) == Tools.getDay();
        }
        return false;
    }

    private isLimitStrs: MapEx.MapExClass<string> = {};
    public setLimitStr(key: string): void {
        let lastDayStr = Tools.getDay();
        MapEx.set(this.isLimitStrs, key, lastDayStr);
        this.server.net_setLimitStr(key, lastDayStr);
    }

    public net_syncArkStr(str: string): void {
        this.getArkPanel.updateUserIdTextBlock(str);
    }
}

export class ArkModuleS extends ModuleS<ArkModuleC, ArkData> {
    protected onStart(): void {
        this.bindAction();
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.syncArkStr(player);
    }

    private bindAction(): void {
        mw.PurchaseService.onOrderDelivered.add(this.addShipOrder.bind(this));
    }

    private addShipOrder(playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean) => void): void {
        //根据playerId和commodityId来处理购买逻辑
        this.getClient(playerId).net_deliverGoods(commodityId, amount);
        confirmOrder(true);//调用这个方法表示确认收货成功
    }

    @Decorator.noReply()
    public net_setLimitStr(key: string, day: string): void {
        this.currentData.setLimitStr(key, day);
    }

    private async syncArkStr(player: mw.Player): Promise<void> {
        let str: string = await this.getCustomdata("WorldArkStr");
        this.getClient(player).net_syncArkStr(str);
    }

    public async getCustomdata(key: string): Promise<any> {
        let data = null;
        data = await GeneralManager.asyncRpcGetData(key);
        return data;
    }
}