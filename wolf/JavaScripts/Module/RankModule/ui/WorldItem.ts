import WorldItem_Generate from "../../../ui-generate/module/RankModule/WorldItem_generate";
import { WorldData } from "../RankData";

export default class WorldItem extends WorldItem_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

	public setData(ranking: number, roomData: WorldData, isSelf: boolean): void {
		this.mRankTextBlock.text = ranking.toString();
		this.mNameTextBlock.text = roomData.playerName;
		this.mTimeTextBlock.text = roomData.time.toString();

		let fontColor = isSelf ? mw.LinearColor.green : mw.LinearColor.white;
		this.mRankTextBlock.fontColor = fontColor;
		this.mNameTextBlock.fontColor = fontColor;
		this.mTimeTextBlock.fontColor = fontColor;
	}
}
