import { Notice } from "../../../CommonUI/notice/Notice";
import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import LotteryTypePanel_Generate from "../../../ui-generate/module/LotteryModule/LotteryTypePanel_generate";
import GetCoinPanel from "../../GameModule/ui/GetCoinPanel";
import { PlayerModuleData } from "../../PlayerModule/PlayerData";
import ShopModuleData from "../../ShopModule/ShopModuleData";
import { LotteryModuleC } from "../LotteryModuleC";
import LotteryTypeItem from "./LotteryTypeItem";

export default class LotteryTypePanel extends LotteryTypePanel_Generate {
	private rowSpacing: number = 0;//行距
	private columnSpacing: number = 0;//列距
	private rowLotteryesNum: number = 1;//一行放几个
	private insideItemSize: mw.Vector2 = new mw.Vector2(256, 240);
	private curLotteryIndex: number = 0;
	private countDownInterval: number = null;

	private getCoinPanel: GetCoinPanel = null;
	private get getGetCoinPanel(): GetCoinPanel {
		if (!this.getCoinPanel) {
			this.getCoinPanel = mw.UIService.getUI(GetCoinPanel);
		}
		return this.getCoinPanel;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initUI();
	}

	private initUI(): void {
		this.setStyle(0, 0, 0);
	}

	public init(curLotteryIndex: number): void {
		this.curLotteryIndex = curLotteryIndex;
		let cfg = GameConfig.Lottery.getElement(this.curLotteryIndex);
		this.mImage_box.imageGuid = cfg.GUID.toString();
		this.mTextBlock_CoinNum.text = DataCenterC.getData(PlayerModuleData).getGold().toString();
		this.mText_Price.text = cfg.Price.toString();
		//初始化基础元素 绑定按钮事件
		this.mBtn_Close_1.onClicked.clear();
		this.mBtn_Close_1.onClicked.add(() => {
			ModuleService.getModule(LotteryModuleC).lotteryInsideOpen(false, curLotteryIndex);
		});
		this.mButton_lottery.onClicked.clear();
		this.mButton_lottery.onClicked.add(() => {
			let data = DataCenterC.getData(PlayerModuleData);
			let price = GameConfig.Lottery.getElement(this.curLotteryIndex).Price;
			let res = data.getGold() >= price;
			if (res) {
				this.saleLottery(-price);
			} else {
				Notice.showDownNotice(GameConfig.Tips.getElement(20002).Content);
			}
		})
		this.mAdsButton.text = GameConfig.Language.Text_FreeDraw.Value;
		this.mAdsButton.onClose.add((isSuccess: boolean) => {
			if (!isSuccess) {
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_2.Value, this.mAdsButton.text));
				return;
			}
			this.saleLottery(0);
		});
		this.refreshItemPage();
	}
	public refreshItemPage() {
		this.mCanvas.removeAllChildren();
		let itemArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Item;
		let rateArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Rate;
		let totalNum = itemArr.length;
		//设置商品列表
		for (let i = 0; i < totalNum; i++) {
			let item: LotteryTypeItem = null;
			item = mw.UIService.create(LotteryTypeItem);
			item.uiObject.size = this.insideItemSize;
			this.mCanvas.addChild(item.uiObject);
			item.setShopItem(itemArr[i], rateArr[i]);
		}
		this.mScrollBox.scrollToStart();
	}
	//TODO 展示结算页面
	public showResPanel(curWeaponId: number) {
		if (!this.visible) {

		}
		this.mCanvas_Gain.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		let index = (curWeaponId - curWeaponId % 10000) / 10000;
		let itemInfo = DataCenterC.getData(ShopModuleData).getShopDataByMap(index);
		let cfg = GameConfig.Shop.getElement(curWeaponId);
		if (cfg.IconGuid && cfg.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.mImage_weapon, cfg.IconGuid.split(`_`)[1]);
		} else {
			this.mImage_weapon.imageGuid = (cfg.IconGuid.toString());
		}
		if (itemInfo.state[itemInfo.listId.indexOf(curWeaponId)] != 1) {
			this.mCanvas_first.visibility = mw.SlateVisibility.Collapsed;
			this.mCanvas_repeat.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mText_CoinNum.text = cfg.Reclaim.toString();
			this.getGetCoinPanel.show();
		}
		else {
			this.mCanvas_first.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mCanvas_repeat.visibility = mw.SlateVisibility.Collapsed;
			this.mText_weaponName.text = cfg.Name;
		}
	}
	public closeResPanel() {
		this.mCanvas_Gain.visibility = mw.SlateVisibility.Collapsed;
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

		this.mTextBlock_CoinNum.text = (oldGold + cost).toString();
		//判断是否为最后一抽
		let cfg = GameConfig.Lottery.getElement(this.curLotteryIndex);
		if (oldTiems >= cfg.Times) {
			module.setLotterySaleTimes(this.curLotteryIndex, true);
			module.scroll(this.curLotteryIndex, true);
		}
		else {
			module.setLotterySaleTimes(this.curLotteryIndex, false);
			module.scroll(this.curLotteryIndex, false);
		}
	}

	private setStyle(rowSpacing: number, columnSpacing: number, rowLotteryesNum: number) {
		this.rowSpacing = rowSpacing;
		this.columnSpacing = columnSpacing;
		this.rowLotteryesNum = rowLotteryesNum;

		// BaseUI.getCanvasChildren(this.mCanvas_ItemTypes, mw.Button);
		// 初始化
		this.setLan();
	}
	public getStyle() {
		return [this.rowSpacing, this.columnSpacing];
	}
	private setLan() {
		//TODO 文本展示
		//this.mUIText20012_btn.text = (GameConfig.Text.getElement(20012).Content);

	}
}
