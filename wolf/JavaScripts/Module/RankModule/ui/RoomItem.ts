import RoomItem_Generate from "../../../ui-generate/module/RankModule/RoomItem_generate";
import { RoomData } from "../RankData";

export default class RoomItem extends RoomItem_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

	public setData(ranking: number, roomData: RoomData, isSelf: boolean): void {
		this.mRankTextBlock.text = ranking.toString();
		this.mNameTextBlock.text = roomData.playerName;
		this.mKillCountTextBlock.text = roomData.score.toString();

		let fontColor = isSelf ? mw.LinearColor.green : mw.LinearColor.white;
		this.mRankTextBlock.fontColor = fontColor;
		this.mNameTextBlock.fontColor = fontColor;
		this.mKillCountTextBlock.fontColor = fontColor;
	}
}
