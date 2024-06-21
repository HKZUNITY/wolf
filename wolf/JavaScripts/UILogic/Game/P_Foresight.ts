/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-02 18:08:54
 * @LastEditors  : songyang.xie
 * @LastEditTime : 2023-02-17 14:49:56
 * @FilePath     : \murdermystery3\JavaScripts\UILogic\Game\P_Foresight.ts
 * @Description  : 修改描述
 */

import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import Foresight_Generate from "../../ui-generate/uiTemplate/fight/Foresight_generate";
import { UiManager } from "../../UI/UiManager";
import { GameConfig } from "../../Tables/GameConfig";

/** 
 * AUTHOR: 可可果嘟
 * TIME: 2023.02.02-18.09.00
 */

export default class P_Foresight extends Foresight_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	private idleArray: Array<mw.Button> = new Array<mw.Button>()
	private shootSize: mw.Vector2
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		let temp = GameConfig.Rule.getElement(40002).AimingSize
		this.shootSize = new mw.Vector2(temp[0], temp[1]) 
		this.initButtonArray()
		this.initShootSize(this.shootSize)
	}

	private initButtonArray(){
		let count = this.mRootCanvas.getChildrenCount()
		for (let i = 0; i < count; i++) {
			let child = this.mRootCanvas.getChildAt(i)
			if (child instanceof mw.Button) {
				this.idleArray.push(child)
			}
		}
	}
	
    show() {
        mw.UIService.showUI(this);

    }
    hide() {
        mw.UIService.hideUI(this);
    }

	getIdleButton(){
		if (this.idleArray.length <= 0) {
			oTraceError("按钮列表为空")
			return
		}
		return this.idleArray.shift()
	}
	
	addIdleButton(button: mw.Button){
		this.idleArray.push(button)
	}
	/**初始化射击ui大小 */
	initShootSize(size: mw.Vector2){
		this.idleArray.forEach((value, index)=>{
			value.size = size
		})
	}
	/**更新射击ui大小 */
	setShootScale(button: mw.Button, rate: number){
		let newSize = mw.Vector2.multiply(this.shootSize, rate)
		button.size = newSize
	}
}
