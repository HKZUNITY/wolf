import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import LotteryInItem_Generate from "../../../ui-generate/module/LotteryModule/LotteryInItem_generate";

export default class LotteryInItem extends LotteryInItem_Generate {
	public itemId: number;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

	public setShopItem(itemId: number): void {
		this.itemId = itemId;
		let info = GameConfig.Shop.getElement(itemId);
		let slotColor = GameConfig.Color.getElement(10001 + info.Rarity).Slot
		let slotwordsColor = GameConfig.Color.getElement(10001 + info.Rarity).Slotwords
		this.mImage_BG.imageColor = new mw.LinearColor(slotColor.x / 255, slotColor.y / 255, slotColor.z / 255)
		this.mText_Items.fontColor = new mw.LinearColor(slotwordsColor.x / 255, slotwordsColor.y / 255, slotwordsColor.z / 255)
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.mImage_Items, info.IconGuid.split(`_`)[1]);
		} else {
			this.mImage_Items.imageGuid = info.IconGuid;
		}
		this.mText_Items.text = info.Name;
	}
}
