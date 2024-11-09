
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.09-13.02.53
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { Globals } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import LoadingPanel_Generate from "../../../ui-generate/module/LoadingModule/LoadingPanel_generate";

export default class LoadingPanel extends LoadingPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerTop;
		this.setText();
	}

	setText() {
		this.mText_Loading.text = (GameConfig.Text.getElement(20008).Content);
	}

	public showLoadingUI() {
		this.beginLoading(Globals.spawnSceneTime);
	}

	public closeLoadingUI() {
		this.hide();
		TimeUtil.clearInterval(this.s_Time);
	}

	private s_Time: number;
	private beginLoading(loadTime: number) {
		let barnum = 0;
		this.mPro_Loading.percent = 0;
		this.show();
		this.s_Time = TimeUtil.setInterval(() => {
			if (barnum < 100) {
				barnum++;
				this.mPro_Loading.percent = barnum / 100;
			}
			else {
				TimeUtil.clearInterval(this.s_Time);
			}

		}, loadTime / 100);
	}
}
