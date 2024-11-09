import { GameConfig } from "../../../Tables/GameConfig";
import LotteryPanel_Generate from "../../../ui-generate/module/LotteryModule/LotteryPanel_generate";
import { LotteryModuleC } from "../LotteryModuleC";
import LotteryItem from "./LotteryItem";

export default class LotteryPanel extends LotteryPanel_Generate {
	private lotteryModuleC: LotteryModuleC = null;
	private get getLotteryModuleC(): LotteryModuleC {
		if (this.lotteryModuleC == null) {
			this.lotteryModuleC = ModuleService.getModule(LotteryModuleC);
		}
		return this.lotteryModuleC;
	}
	private lotteryArr: Array<LotteryItem> = [];
	private rowSpacing: number = 0;//行距
	private columnSpacing: number = 0;//列距
	private rowLotteryesNum: number = 3;//一行放几个
	private lotterySize: mw.Vector2 = new mw.Vector2(320, 300);
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
		this.setStyle(0, 0, 3);
	}

	public init(): void {
		//初始化基础元素 绑定按钮事件
		this.bindButton();
	}

	private bindButton(): void {
		this.mBtn_Close_1.onClicked.clear();
		this.mBtn_Close_1.onClicked.add(this.addCloseButton.bind(this));
	}

	private addCloseButton(): void {
		this.getLotteryModuleC.lotteryOpen(false);
	}

	public refreshLotteryPage(): void {
		let totalNum = GameConfig.Lottery.getAllElement().length;
		//设置商品列表
		for (let i = 1; i <= totalNum; i++) {
			let lottery: LotteryItem = null;
			if (i <= this.lotteryArr.length) {
				lottery = this.lotteryArr[i - 1];
			} else {
				lottery = mw.UIService.create(LotteryItem);
				lottery.mCanvas_LotteryItem.size = this.lotterySize;
				this.lotteryArr.push(lottery);
				//消费类型
				let cfg = GameConfig.Lottery.getElement(i);
				lottery.mImage_Items.imageGuid = cfg.GUID.toString();
				lottery.mText_Items.text = cfg.Name;
				lottery.onClickButtonAction.add((id) => {
					ModuleService.getModule(LotteryModuleC).lotteryInsideOpen(true, id);
				});
				this.mCanvas.addChild(lottery.uiObject);
			}
			lottery.setShopItem(i);
		}
		//this.mScrollBox.scrollToStart();
	}

	private setStyle(rowSpacing: number, columnSpacing: number, rowLotteryesNum: number) {
		this.rowSpacing = rowSpacing;
		this.columnSpacing = columnSpacing;
		this.rowLotteryesNum = rowLotteryesNum;
	}
	public getStyle() {
		return [this.rowSpacing, this.columnSpacing];
	}
	public getLotterySize() {
		return this.lotterySize;
	}
}
