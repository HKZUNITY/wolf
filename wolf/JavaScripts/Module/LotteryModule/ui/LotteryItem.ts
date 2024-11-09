import { GameConfig } from "../../../Tables/GameConfig";
import LotteryItem_Generate from "../../../ui-generate/module/LotteryModule/LotteryItem_generate";

export default class LotteryItem extends LotteryItem_Generate {
	public itemId: number;
	public readonly onClickButtonAction: mw.Action1<number> = new Action1<number>();

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.bindButton();
	}

	private bindButton(): void {
		this.mBtn_Items.onClicked.add(this.addClickButton.bind(this));
	}

	private addClickButton(): void {
		this.onClickButtonAction.call(this.itemId);
	}

	public setShopItem(itemId: number): void {
		this.itemId = itemId;
		let info = GameConfig.Lottery.getElement(itemId);
		this.mImage_Items.imageGuid = `${info.GUID}`;
	}
}
