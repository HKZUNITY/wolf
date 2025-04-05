
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.10-00.23.36
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../Tables/GameConfig";
import ReturnImage_Generate from "../../ui-generate/common/worldUI/ReturnImage_generate";

export default class ReturnImage_1 extends ReturnImage_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.addListenser();
	}

	private addListenser() {
		let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
		if (!(!!language.match("en"))) return;
		this.mTextBlock.text = GameConfig.Language.Text_OpenClothTextBlock.Value;
	}
}
