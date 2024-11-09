import { GameConfig } from "../../Tables/GameConfig";
import DetectiveTeaching_Generate from "../../ui-generate/common/worldUI/DetectiveTeaching_generate";

export default class P_DetectiveTeaching extends DetectiveTeaching_Generate {

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
		let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
		if (!(!!language.match("en"))) return;
		this.mText_Title.text = GameConfig.Language.Text_Content_20040.Value;
		this.mText_Content.text = GameConfig.Language.Text_World2.Value;
		this.mText_1.text = GameConfig.Language.Text_Content_20045.Value;
		this.mText_2.text = GameConfig.Language.Text_Content_20046.Value;
		this.mText_3.text = GameConfig.Language.Text_Content_20047.Value;
	}

}
