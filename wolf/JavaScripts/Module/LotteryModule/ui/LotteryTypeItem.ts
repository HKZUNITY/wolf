import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import LotteryTypeItem_Generate from "../../../ui-generate/module/LotteryModule/LotteryTypeItem_generate";

export default class LotteryTypeItem extends LotteryTypeItem_Generate {
	public itemId: number;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

	public setShopItem(itemId: number, rate: number): void {
		this.itemId = itemId;
		let info = GameConfig.Shop.getElement(itemId);
		let caseColor = GameConfig.Color.getElement(10001 + info.Rarity).Case
		let casewordsColor = GameConfig.Color.getElement(10001 + info.Rarity).Casewords
		this.mImage_BG.imageColor = new mw.LinearColor(caseColor.x / 255, caseColor.y / 255, caseColor.z / 255)
		this.mText_Items.fontColor = new mw.LinearColor(casewordsColor.x / 255, casewordsColor.y / 255, casewordsColor.z / 255)
		this.mText_Items_1.fontColor = new mw.LinearColor(casewordsColor.x / 255, casewordsColor.y / 255, casewordsColor.z / 255)
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.mImage_Items, info.IconGuid.split(`_`)[1]);
		} else {
			this.mImage_Items.imageGuid = info.IconGuid;
		}
		this.mText_Items.text = (info.Name);
		this.mText_Items_1.text = (rate * 100 + "%");
	}
}
