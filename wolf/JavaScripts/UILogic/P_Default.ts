
/** 
 * AUTHOR: STR
 * TIME: 2023.02.20-13.16.02
 */

import DefaultUI_Generate from "../ui-generate/uiTemplate/DefaultUI_generate";

export default class P_Default extends DefaultUI_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
	}


}
