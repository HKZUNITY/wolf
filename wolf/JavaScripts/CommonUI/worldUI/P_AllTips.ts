import { GameConfig } from "../../Tables/GameConfig";
import AllTips_Generate from "../../ui-generate/common/worldUI/AllTips_generate";

export default class P_AllTips extends AllTips_Generate {

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
		this.mText_Title.text = GameConfig.Language.Text_Content_20041.Value;
		this.mText_Content.text = GameConfig.Language.Text_World1.Value;
	}

}
