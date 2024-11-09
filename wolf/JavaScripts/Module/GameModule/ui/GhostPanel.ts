
/** 
 * AUTHOR: 携一壶浊酒
 * TIME: 2024.11.08-18.08.46
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import GhostPanel_Generate from "../../../ui-generate/module/GameModule/GhostPanel_generate";

export default class GhostPanel extends GhostPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

}
