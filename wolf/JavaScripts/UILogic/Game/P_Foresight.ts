import { GameConfig } from "../../Tables/GameConfig";
import Foresight_Generate from "../../ui-generate/uiTemplate/fight/Foresight_generate";

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

	private initButtonArray() {
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
