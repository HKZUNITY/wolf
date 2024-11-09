
/** 
 * AUTHOR: 携一壶浊酒
 * TIME: 2024.11.08-18.33.30
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../../Tables/GameConfig";
import ForesightPanel_Generate from "../../../ui-generate/module/WeaponModule/ForesightPanel_generate";

export default class ForesightPanel extends ForesightPanel_Generate {
	private idleArray: Array<mw.Button> = new Array<mw.Button>()
	private shootSize: mw.Vector2
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		let temp = GameConfig.Rule.getElement(40002).AimingSize
		this.shootSize = new mw.Vector2(temp[0], temp[1])
		this.initButtonArray()
		this.initShootSize(this.shootSize)
	}

	private initButtonArray() {
		let count = this.mRootCanvas.getChildrenCount()
		for (let i = 0; i < count; i++) {
			let child = this.mRootCanvas.getChildAt(i)
			if (child instanceof mw.Button) {
				this.idleArray.push(child)
			}
		}
	}

	getIdleButton() {
		if (this.idleArray.length <= 0) {
			console.warn("按钮列表为空")
			return
		}
		return this.idleArray.shift()
	}

	addIdleButton(button: mw.Button) {
		this.idleArray.push(button)
	}
	/**初始化射击ui大小 */
	initShootSize(size: mw.Vector2) {
		this.idleArray.forEach((value, index) => {
			value.size = size
		})
	}
	/**更新射击ui大小 */
	setShootScale(button: mw.Button, rate: number) {
		let newSize = mw.Vector2.multiply(this.shootSize, rate)
		button.size = newSize
	}
}
