import { GameConfig } from "../../../Tables/GameConfig";
import LotteryInPanel_Generate from "../../../ui-generate/module/LotteryModule/LotteryInPanel_generate";
import { LotteryModuleC } from "../LotteryModuleC";
import LotteryInItem from "./LotteryInItem";

export default class LotteryInPanel extends LotteryInPanel_Generate {

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

	private rowSpacing: number = 0;//行距
	private columnSpacing: number = 0;//列距
	private rowLotteryesNum: number = 1;//一行放几个
	private scrollItemSize: mw.Vector2 = new mw.Vector2(220, 250);
	private curLotteryIndex: number = 0;
	private moveCount: number = 0;

	public init(curLotteryIndex: number) {
		this.curLotteryIndex = curLotteryIndex;
		this.moveCount = 0;
		this.bindButton();
		this.refreshScrollPage();
	}

	private bindButton(): void {
		this.mBtn_Close.onClicked.clear();
		this.mBtn_Close.onClicked.add(this.addCloseButton.bind(this));
	}

	private addCloseButton(): void {
		ModuleService.getModule(LotteryModuleC).calcScrollResult(this.curLotteryIndex);
	}

	//TODO 刷新滚动列表物品展示页
	public refreshScrollPage() {
		this.mCanvas_slot.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.mCanvas.removeAllChildren();
		let itemArr = GameConfig.Lottery.getElement(this.curLotteryIndex).Item;
		let totalNum = itemArr.length;
		let oneLength = (totalNum - 1) * (this.getStyle()[0] + this.getItemSize().x) + this.getItemSize().x;
		let length = this.mScrollBox_weapon.size.x + this.getStyle()[0] * 2 + this.getItemSize().x;
		let copyCount = Math.ceil(length / oneLength);

		//设置商品列表
		for (let j = 0; j < copyCount; j++) {
			for (let i = 0; i < totalNum; i++) {
				let item: LotteryInItem = null;
				item = mw.UIService.create(LotteryInItem);
				item.uiObject.size = this.scrollItemSize;
				this.mCanvas.addChild(item.uiObject);
				item.uiObject.position = new mw.Vector2((j * totalNum + i) * (item.uiObject.size.x + this.columnSpacing), 0);
				item.setShopItem(this.getRandomItemCfg());
			}
		}
		this.mCanvas.size = new mw.Vector2(this.mCanvas.getChildrenCount() * (this.getItemSize().x + this.getStyle()[0]), this.getItemSize().y);
		this.mCanvas.position = new mw.Vector2(0, 0);
		this.mScrollBox_weapon.scrollToStart();
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
		let count = this.mCanvas.getChildrenCount();
		for (let i = 0; i < count; i++) {
			if (this.mCanvas.getChildAt(i).position.x + this.mCanvas.position.x <= -(this.getItemSize().x + this.getStyle()[0])) {
				this.mCanvas.removeChildAt(i);
				let item: LotteryInItem = null;
				item = mw.UIService.create(LotteryInItem);
				item.uiObject.size = this.scrollItemSize;
				this.mCanvas.addChild(item.uiObject);
				item.uiObject.position = new mw.Vector2((count + this.moveCount) * (this.getItemSize().x), 0);
				if (count + this.moveCount == randomValue) {
					item.setShopItem(GameConfig.Lottery.getElement(this.curLotteryIndex).Item[index]);
				}
				else {
					item.setShopItem(this.getRandomItemCfg());
				}
				this.mCanvas.size = new mw.Vector2((count + this.moveCount) * (this.getItemSize().x + this.getStyle()[0]), this.getItemSize().y);
				this.moveCount++
				return;
			}
		}
		if (this.mCanvas.position.x <= randomValue * -this.getItemSize().x + this.getOffest()) {
			ModuleService.getModule(LotteryModuleC).calcScrollResult(this.curLotteryIndex);
		}
	}

	private setStyle(rowSpacing: number, columnSpacing: number, rowLotteryesNum: number) {
		this.rowSpacing = rowSpacing;
		this.columnSpacing = columnSpacing;
		this.rowLotteryesNum = rowLotteryesNum;
	}
	public getStyle() {
		return [this.rowSpacing, this.columnSpacing];
	}
	public getItemSize() {
		return this.scrollItemSize;
	}
	public getOffest() {
		return this.mImage_yellowLine.position.x - mw.MathUtil.randomFloat(this.getItemSize().x / 3, this.getItemSize().x / 3 * 2);
	}
}
