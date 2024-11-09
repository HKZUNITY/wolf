
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.09-14.24.49
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import WinWatchPanel_Generate from "../../../ui-generate/module/GameModule/WinWatchPanel_generate";

export default class WinWatchPanel extends WinWatchPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

}
