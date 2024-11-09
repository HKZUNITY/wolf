import { GameConfig } from "../../Tables/GameConfig";
import MurderTeaching_Generate from "../../ui-generate/common/worldUI/MurderTeaching_generate";

export default class P_MurderTeaching extends MurderTeaching_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.addListenser();

	}

	private addListenser() {
		TimeUtil.delaySecond(5).then(() => {
			let c = GameConfig.Language.Text_World3.Value;
			if (c[0] == `W`) {
				this.mText_Content.fontSize = 65;
			}
			this.mText_Title.text = GameConfig.Language.Text_Content_20039.Value;
			this.mText_Content.text = c;
			this.mText_1.text = GameConfig.Language.Text_Content_20048.Value;
			this.mText_2.text = GameConfig.Language.Text_Content_20049.Value;
			this.mText_3.text = GameConfig.Language.Text_Content_20039.Value;
			this.mText_4.text = GameConfig.Language.Text_Content_20050.Value;
		});
	}
}
