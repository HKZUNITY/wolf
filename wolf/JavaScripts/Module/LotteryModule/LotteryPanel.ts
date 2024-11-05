import AdsPanel from "../../AdsPanel";
import { BaseUI, Class } from "../../BaseUI";
import P_Tips from "../../CommonUI/P_Tips";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import P_CoinGet from "../../UILogic/Game/P_CoinGet";
import Lottery from "../../uiTemplate/Hall/Lottery";
import LotteryInside from "../../uiTemplate/Hall/LotteryInside";
import LotteryItem_1 from "../../uiTemplate/Hall/LotteryItem_1";
import LotteryItem_3 from "../../uiTemplate/Hall/LotteryItem_3";
import LotteryItem_5 from "../../uiTemplate/Hall/LotteryItem_5";
import LotterySlot_4 from "../../uiTemplate/Hall/LotterySlot_4";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { ShopModuleData } from "../ShopModule/ShopData";
import { LotteryModuleC } from "./LotteryModuleC";


export interface ILotteryBaseItemView extends mw.UIScript {
    mCanvas_LotteryItem: mw.Canvas;
    mImage_Items: mw.Image;
    mBtn_Items: mw.StaleButton;
}
export interface IInsideItemBaseItemView extends mw.UIScript {
    mImage_BG: mw.Image;
    mImage_Items: mw.Image;
    mText_Items: mw.TextBlock;
    mText_Items_1: mw.TextBlock;
}
export interface IScrollItemBaseItemView extends mw.UIScript {
    mImage_BG: mw.Image;
    mImage_Items: mw.Image;
    mText_Items: mw.TextBlock;
}
export interface ILotteryBasePanelView extends mw.UIScript {
    mBtn_Close_1: mw.StaleButton;
    mScrollBox: mw.ScrollBox;
    mCanvas: mw.Canvas
}
export interface ILotteryInsideBasePanelView extends mw.UIScript {
    mBtn_Close_1: mw.StaleButton;
    mScrollBox: mw.ScrollBox;
    mImage_box: mw.Image;
    mTextBlock_CoinNum: mw.TextBlock;
    mButton_lottery: mw.StaleButton;
    mText_Price: mw.TextBlock;
    mTextBlock_Time: mw.TextBlock;
    mMaskButton_AD: mw.MaskButton;
    mText_lotteryTimes: mw.TextBlock;
    mCanvas_Gain: mw.Canvas;
    mImage_weapon: mw.Image;
    mCanvas_first: mw.Canvas;
    mText_weaponName: mw.TextBlock;
    mCanvas_repeat: mw.Canvas;
    mText_CoinNum: mw.TextBlock;
    mCanvas: mw.Canvas
}
export interface ILotteryScrollBasePanelView extends mw.UIScript {
    mCanvas_slot: mw.Canvas;
    mScrollBox_weapon: mw.ScrollBox;
    mImage_yellowLine: mw.Image;
    mCanvas: mw.Canvas;
    mBtn_Close: mw.StaleButton;
}
/**武器箱item */
export class LotteryBaseItem<T extends ILotteryBaseItemView> extends BaseUI<T> {
    public itemId: number;
    public readonly onClick: mw.Action1<number> = new Action1();
    constructor(ViewClass: Class<T>) {
        super(ViewClass);
    }
    protected onStart(): void {
        //TODO 箱子点击事件
        this.view.mBtn_Items.onClicked.add(() => {
            this.onClick.call(this.itemId);
        });
    }

    public setShopItem(itemId: number) {
        this.itemId = itemId;
        let info = GameConfig.Lottery.getElement(itemId);
        //TODO 设置箱子展示信息
        this.view.mImage_Items.imageGuid = (info.GUID.toString());
    }
}
/**武器箱内部item */
export class insideItemBaseItem<T extends IInsideItemBaseItemView> extends BaseUI<T> {
    public itemId: number;
    constructor(ViewClass: Class<T>) {
        super(ViewClass);
    }

    public setShopItem(itemId: number, rate: number) {
        this.itemId = itemId;
        let info = GameConfig.Shop.getElement(itemId);
        //TODO 设置箱子展示信息
        let caseColor = GameConfig.Color.getElement(10001 + info.Rarity).Case
        let casewordsColor = GameConfig.Color.getElement(10001 + info.Rarity).Casewords
        this.view.mImage_BG.imageColor = new mw.LinearColor(caseColor.x / 255, caseColor.y / 255, caseColor.z / 255)
        this.view.mText_Items.fontColor = new mw.LinearColor(casewordsColor.x / 255, casewordsColor.y / 255, casewordsColor.z / 255)
        this.view.mText_Items_1.fontColor = new mw.LinearColor(casewordsColor.x / 255, casewordsColor.y / 255, casewordsColor.z / 255)
        // this.view.mImage_Items.imageGuid = (info.IconGuid.toString());
        if (info.IconGuid && info.IconGuid[0] == `m`) {
            Tools.setImageByAssetIconData(this.view.mImage_Items, info.IconGuid.split(`_`)[1]);
        } else {
            this.view.mImage_Items.imageGuid = (info.IconGuid.toString());
        }
        this.view.mText_Items.text = (info.Name);
        this.view.mText_Items_1.text = (rate * 100 + "%");
    }
}
/**滚动数组item */
export class ScrollItemBaseItem<T extends IScrollItemBaseItemView> extends BaseUI<T> {
    public itemId: number;
    constructor(ViewClass: Class<T>) {
        super(ViewClass);
    }

    public setShopItem(itemId: number) {
        this.itemId = itemId;
        let info = GameConfig.Shop.getElement(itemId);
        //TODO 设置箱子展示信息
        let slotColor = GameConfig.Color.getElement(10001 + info.Rarity).Slot
        let slotwordsColor = GameConfig.Color.getElement(10001 + info.Rarity).Slotwords
        this.view.mImage_BG.imageColor = new mw.LinearColor(slotColor.x / 255, slotColor.y / 255, slotColor.z / 255)
        this.view.mText_Items.fontColor = new mw.LinearColor(slotwordsColor.x / 255, slotwordsColor.y / 255, slotwordsColor.z / 255)
        // this.view.mImage_Items.imageGuid = (info.IconGuid.toString());
        if (info.IconGuid && info.IconGuid[0] == `m`) {
            Tools.setImageByAssetIconData(this.view.mImage_Items, info.IconGuid.split(`_`)[1]);
        } else {
            this.view.mImage_Items.imageGuid = (info.IconGuid.toString());
        }
        this.view.mText_Items.text = info.Name;
    }
}
// type ShopItem = ShopBaseItem<Items>;//商品的UI类型
export class LotteryBasePanel<T extends ILotteryBasePanelView> extends BaseUI<T> {
    //变量
    private lotteryArr: Array<LotteryPanelItem> = [];
    private rowSpacing: number = 0;//行距
    private columnSpacing: number = 0;//列距
    private rowLotteryesNum: number = 3;//一行放几个
    private lotterySize: mw.Vector2 = new mw.Vector2(320, 300);


    public init() {

        //初始化基础元素 绑定按钮事件
        this.view.mBtn_Close_1.onClicked.clear();
        this.view.mBtn_Close_1.onClicked.add(() => {
            ModuleService.getModule(LotteryModuleC).lotteryOpen(false);
        });
    }
    //TODO 刷新箱子展示页
    public refreshLotteryPage() {
        let totalNum = GameConfig.Lottery.getAllElement().length;
        //设置商品列表
        for (let i = 1; i <= totalNum; i++) {
            let lottery: LotteryPanelItem = null;
            if (i <= this.lotteryArr.length) {
                lottery = this.lotteryArr[i - 1];
            } else {
                lottery = mw.UIService.create(LotteryPanelItem);
                lottery.getView().mCanvas_LotteryItem.size = this.lotterySize;
                this.lotteryArr.push(lottery);
                //消费类型
                let cfg = GameConfig.Lottery.getElement(i);
                lottery.getView().mImage_Items.imageGuid = cfg.GUID.toString();
                lottery.getView().mText_Items.text = cfg.Name;
                lottery.onClick.add((id) => {
                    //TODO 点击购买按钮操作
                    ModuleService.getModule(LotteryModuleC).lotteryInsideOpen(true, id);
                });
                this.view.mCanvas.addChild(lottery.uiObject);
            }
            lottery.setShopItem(i);
        }
        //this.view.mScrollBox.scrollToStart();
    }

    protected setStyle(rowSpacing: number, columnSpacing: number, rowLotteryesNum: number) {
        this.rowSpacing = rowSpacing;
        this.columnSpacing = columnSpacing;
        this.rowLotteryesNum = rowLotteryesNum;

        // BaseUI.getCanvasChildren(this.view.mCanvas_ItemTypes, mw.Button);
        // 初始化
        this.setLan();
    }
    public getStyle() {
        return [this.rowSpacing, this.columnSpacing];
    }
    public getLotterySize() {
        return this.lotterySize;
    }
    private setLan() {
        //TODO 文本展示
        //this.view.mUIText20012_btn.text = (GameConfig.Text.getElement(20012).Content);

    }
}
export class LotteryInsideBasePanel<T extends ILotteryInsideBasePanelView> extends BaseUI<T> {
    //变量
    private rowSpacing: number = 0;//行距
    private columnSpacing: number = 0;//列距
    private rowLotteryesNum: number = 1;//一行放几个
    private insideItemSize: mw.Vector2 = new mw.Vector2(256, 240);
    private curLotteryIndex: number = 0;
    private countDownInterval: number = null;


    public init(curLotteryIndex: number) {
        this.curLotteryIndex = curLotteryIndex;
        let cfg = GameConfig.Lottery.getElement(this.curLotteryIndex);
        this.view.mImage_box.imageGuid = cfg.GUID.toString();
        this.view.mTextBlock_CoinNum.text = DataCenterC.getData(PlayerModuleData).getGold().toString();
        this.view.mText_Price.text = cfg.Price.toString();
        this.view.mText_lotteryTimes.text = DataCenterC.getData(PlayerModuleData).getLotterySaleTimes(this.curLotteryIndex) + "/" + cfg.Times.toString();
        this.view.mMaskButton_AD.fanShapedValue = 1
        //初始化基础元素 绑定按钮事件
        this.view.mBtn_Close_1.onClicked.clear();
        this.view.mBtn_Close_1.onClicked.add(() => {
            ModuleService.getModule(LotteryModuleC).lotteryInsideOpen(false, curLotteryIndex);
        });
        this.view.mButton_lottery.onClicked.clear();
        this.view.mButton_lottery.onClicked.add(() => {
            let data = DataCenterC.getData(PlayerModuleData);
            let price = GameConfig.Lottery.getElement(this.curLotteryIndex).Price;
            let res = data.getGold() >= price;
            if (res) {
                //TODO 购买成功
                this.saleLottery(-price);
            }
            else {
                P_Tips.show(GameConfig.Tips.getElement(20002).Content);
            }
        })
        this.view.mMaskButton_AD.pressedDelegate.clear();
        this.view.mMaskButton_AD.pressedDelegate.add(() => {
            // let data = DataCenterC.getData(PlayerModuleData)
            // if (data.getLotteryWatchAdCountDown(curLotteryIndex) > 0) {
            //     P_Tips.show("广告冷却中！");
            // }
            // else {
            UIService.getUI(AdsPanel).showRewardAd(() => {
                ModuleService.getModule(PlayerModuleC).addAdvToken(1);
                ModuleService.getModule(LotteryModuleC).setLotteryWatchAdTime(curLotteryIndex);
                if (this.countDownInterval == null) {
                    this.setLotteryAd(true);
                }
                this.saleLottery(0);
            }, "免费抽奖~\n再送一张广告券", "取消", "领取");
            // }
        })
        this.refreshItemPage();
    }
    //TODO 刷新箱子物品展示页
    public refreshItemPage() {
        this.view.mCanvas.removeAllChildren();
        let itemArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Item;
        let rateArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Rate;
        let totalNum = itemArr.length;
        //设置商品列表
        for (let i = 0; i < totalNum; i++) {
            let item: LotteryInsidePanelItem = null;
            item = mw.UIService.create(LotteryInsidePanelItem);
            item.uiObject.size = this.insideItemSize;
            this.view.mCanvas.addChild(item.uiObject);
            item.setShopItem(itemArr[i], rateArr[i]);
        }

        this.view.mScrollBox.scrollToStart();
    }
    //TODO 展示结算页面
    public showResPanel(curWeaponId: number) {
        if (!this.view.visible) {

        }
        this.view.mCanvas_Gain.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        let index = (curWeaponId - curWeaponId % 10000) / 10000;
        let itemInfo = DataCenterC.getData(ShopModuleData).getShopDataByMap(index);
        let cfg = GameConfig.Shop.getElement(curWeaponId);
        // this.view.mImage_weapon.imageGuid = cfg.IconGuid;
        if (cfg.IconGuid && cfg.IconGuid[0] == `m`) {
            Tools.setImageByAssetIconData(this.view.mImage_weapon, cfg.IconGuid.split(`_`)[1]);
        } else {
            this.view.mImage_weapon.imageGuid = (cfg.IconGuid.toString());
        }
        if (itemInfo.state[itemInfo.listId.indexOf(curWeaponId)] != 1) {
            this.view.mCanvas_first.visibility = mw.SlateVisibility.Collapsed;
            this.view.mCanvas_repeat.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.view.mText_CoinNum.text = cfg.Reclaim.toString();
            P_CoinGet.show();
        }
        else {
            this.view.mCanvas_first.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.view.mCanvas_repeat.visibility = mw.SlateVisibility.Collapsed;
            this.view.mText_weaponName.text = cfg.Name;
        }
    }
    public closeResPanel() {
        this.view.mCanvas_Gain.visibility = mw.SlateVisibility.Collapsed;
    }
    setLotteryAd(reset: boolean) {
        let coundDown = 300
        if (!reset) {
            let data = DataCenterC.getData(PlayerModuleData);
            coundDown = data.getLotteryWatchAdCountDown(this.curLotteryIndex);
            this.view.mMaskButton_AD.fanShapedValue = 1 - coundDown / 300
        }
        this.view.mTextBlock_Time.text = (Tools.formatTime_1(coundDown));
        //TODO:是否有倒计时，有的话继续倒计时
        if (coundDown > 0) {
            this.setCountDown();
        }
    }

    //倒计时
    private setCountDown() {
        this.countDownInterval = TimeUtil.setInterval(() => {
            let data = DataCenterC.getData(PlayerModuleData);
            let coundDown = data.getLotteryWatchAdCountDown(this.curLotteryIndex);
            this.view.mTextBlock_Time.text = (Tools.formatTime_1(coundDown));
            this.view.mMaskButton_AD.fanShapedValue = 1 - coundDown / 300
            if (coundDown <= 0) {
                this.stopCountDown();
            }
        }, 1);
    }
    stopCountDown() {
        if (this.countDownInterval != null) {
            TimeUtil.clearInterval(this.countDownInterval);
            this.countDownInterval = null;
        }
    }
    public saleLottery(cost: number) {
        if (ModuleService.getModule(LotteryModuleC).getIsScrolling()) return;
        let module = ModuleService.getModule(LotteryModuleC);
        module.lotteryScrollOpen(true);
        module.startLottery(this.curLotteryIndex, cost != 0);
        let data = DataCenterC.getData(PlayerModuleData);
        let oldGold = data.getGold();
        let oldTiems = data.getLotterySaleTimes(this.curLotteryIndex);
        module.changeGold(cost);

        this.view.mTextBlock_CoinNum.text = (oldGold + cost).toString();
        //判断是否为最后一抽
        let cfg = GameConfig.Lottery.getElement(this.curLotteryIndex);
        if (oldTiems >= cfg.Times) {
            this.view.mText_lotteryTimes.text = 0 + "/" + cfg.Times.toString();
            module.setLotterySaleTimes(this.curLotteryIndex, true);
            module.scroll(this.curLotteryIndex, true);
        }
        else {
            this.view.mText_lotteryTimes.text = (oldTiems + 1).toString() + "/" + cfg.Times.toString();
            module.setLotterySaleTimes(this.curLotteryIndex, false);
            module.scroll(this.curLotteryIndex, false);
        }
    }

    protected setStyle(rowSpacing: number, columnSpacing: number, rowLotteryesNum: number) {
        this.rowSpacing = rowSpacing;
        this.columnSpacing = columnSpacing;
        this.rowLotteryesNum = rowLotteryesNum;

        // BaseUI.getCanvasChildren(this.view.mCanvas_ItemTypes, mw.Button);
        // 初始化
        this.setLan();
    }
    public getStyle() {
        return [this.rowSpacing, this.columnSpacing];
    }
    private setLan() {
        //TODO 文本展示
        //this.view.mUIText20012_btn.text = (GameConfig.Text.getElement(20012).Content);

    }
}

export class LotteryScrollBasePanel<T extends ILotteryScrollBasePanelView> extends BaseUI<T> {
    //变量
    private rowSpacing: number = 0;//行距
    private columnSpacing: number = 0;//列距
    private rowLotteryesNum: number = 1;//一行放几个
    private scrollItemSize: mw.Vector2 = new mw.Vector2(220, 250);
    private curLotteryIndex: number = 0;
    private moveCount: number = 0;

    public init(curLotteryIndex: number) {
        this.curLotteryIndex = curLotteryIndex;
        this.moveCount = 0;

        //初始化基础元素 绑定按钮事件
        this.view.mBtn_Close.onClicked.clear();
        this.view.mBtn_Close.onClicked.add(() => {
            ModuleService.getModule(LotteryModuleC).calcScrollResult(this.curLotteryIndex);
        });
        this.refreshScrollPage();
    }
    //TODO 刷新滚动列表物品展示页
    public refreshScrollPage() {
        this.view.mCanvas_slot.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.view.mCanvas.removeAllChildren();
        let itemArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Item;
        let totalNum = itemArr.length;
        let oneLength = (totalNum - 1) * (this.getStyle()[0] + this.getItemSize().x) + this.getItemSize().x;
        let length = this.view.mScrollBox_weapon.size.x + this.getStyle()[0] * 2 + this.getItemSize().x;
        let copyCount = Math.ceil(length / oneLength);

        //设置商品列表
        for (let j = 0; j < copyCount; j++) {
            for (let i = 0; i < totalNum; i++) {
                let item: LotteryScrollPanelItem = null;
                item = mw.UIService.create(LotteryScrollPanelItem);
                item.uiObject.size = this.scrollItemSize;
                this.view.mCanvas.addChild(item.uiObject);
                item.uiObject.position = new mw.Vector2((j * totalNum + i) * (item.uiObject.size.x + this.columnSpacing), 0);
                item.setShopItem(this.getRandomItemCfg());
            }
        }
        this.view.mCanvas.size = new mw.Vector2(this.view.mCanvas.getChildrenCount() * (this.getItemSize().x + this.getStyle()[0]), this.getItemSize().y);
        this.view.mCanvas.position = new mw.Vector2(0, 0);
        this.view.mScrollBox_weapon.scrollToStart();
    }
    public getRandomItemCfg() {
        let itemArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Item;
        let rateArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Rate;
        let randomValue = mw.MathUtil.randomFloat(0, 1);
        let total = 0;
        for (let index = 0; index < rateArr.length; index++) {
            total += rateArr[index];
            if (total >= randomValue) {
                return itemArr[index];
            }
        }
    }
    public updateScrollItemPos(randomValue: number, index: number) {
        let count = this.view.mCanvas.getChildrenCount();
        for (let i = 0; i < count; i++) {
            if (this.view.mCanvas.getChildAt(i).position.x + this.view.mCanvas.position.x <= -(this.getItemSize().x + this.getStyle()[0])) {
                this.view.mCanvas.removeChildAt(i);
                let item: LotteryScrollPanelItem = null;
                item = mw.UIService.create(LotteryScrollPanelItem);
                item.uiObject.size = this.scrollItemSize;
                this.view.mCanvas.addChild(item.uiObject);
                item.uiObject.position = new mw.Vector2((count + this.moveCount) * (this.getItemSize().x), 0);
                if (count + this.moveCount == randomValue) {
                    item.setShopItem(GameConfig.Lottery.getElement(this.curLotteryIndex).Item[index]);
                }
                else {
                    item.setShopItem(this.getRandomItemCfg());
                }
                this.view.mCanvas.size = new mw.Vector2((count + this.moveCount) * (this.getItemSize().x + this.getStyle()[0]), this.getItemSize().y);
                this.moveCount++
                return;
            }
        }
        if (this.view.mCanvas.position.x <= randomValue * -this.getItemSize().x + this.getOffest()) {
            ModuleService.getModule(LotteryModuleC).calcScrollResult(this.curLotteryIndex);
        }
    }

    protected setStyle(rowSpacing: number, columnSpacing: number, rowLotteryesNum: number) {
        this.rowSpacing = rowSpacing;
        this.columnSpacing = columnSpacing;
        this.rowLotteryesNum = rowLotteryesNum;

        // BaseUI.getCanvasChildren(this.view.mCanvas_ItemTypes, mw.Button);
        // 初始化
        this.setLan();
    }
    public getStyle() {
        return [this.rowSpacing, this.columnSpacing];
    }
    public getItemSize() {
        return this.scrollItemSize;
    }
    public getOffest() {
        return this.view.mImage_yellowLine.position.x - mw.MathUtil.randomFloat(this.getItemSize().x / 3, this.getItemSize().x / 3 * 2);
    }
    private setLan() {
        //TODO 文本展示
        //this.view.mUIText20012_btn.text = (GameConfig.Text.getElement(20012).Content);

    }
}
export class LotteryPanelItem extends LotteryBaseItem<LotteryItem_1> {
    constructor() {
        super(LotteryItem_1);
    }
    getView() {
        return this.view;
    }
}
export class LotteryInsidePanelItem extends insideItemBaseItem<LotteryItem_3> {
    constructor() {
        super(LotteryItem_3);
    }
    getView() {
        return this.view;
    }
}
export class LotteryScrollPanelItem extends ScrollItemBaseItem<LotteryItem_5> {
    constructor() {
        super(LotteryItem_5);
    }
    getView() {
        return this.view;
    }
}
export class LotteryPanel extends LotteryBasePanel<Lottery> {
    constructor() {
        super(Lottery);
    }
    onStart() {
        //设置显示方式
        this.setStyle(0, 0, 3);
    }
    getView() {
        return this.view;
    }
}
export class LotteryInsidePanel extends LotteryInsideBasePanel<LotteryInside> {
    constructor() {
        super(LotteryInside);
    }
    onStart() {
        //设置显示方式
        this.setStyle(0, 0, 0);
    }
    getView() {
        return this.view;
    }
}
export class LotteryScrollPanel extends LotteryScrollBasePanel<LotterySlot_4> {
    constructor() {
        super(LotterySlot_4);
    }
    onStart() {
        //设置显示方式
        this.setStyle(0, 0, 0);
    }
    getView() {
        return this.view;
    }
}