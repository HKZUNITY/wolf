
import { GameConfig } from "../../../Tables/GameConfig";
import BlackMaskPanel_Generate from "../../../ui-generate/module/FSMModule/BlackMaskPanel_generate";

export default class BlackMaskPanel extends BlackMaskPanel_Generate {
	private curSpeed: number = 0;
	private curA: number = 255;
	private waitTime: number = 0;
	private runTime: number = 0;
	private curColor: mw.LinearColor = null;
	private callBack: () => void;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.curColor = this.mImg_BG.imageColor;
	}

	onUpdate(dt: number) {
		if (this.curA <= 0) {
			this.curA = 255;
			if (this.callBack) {
				this.callBack();
			}
			this.callBack = null;
			this.canUpdate = false;
			this.hide();
			console.error(`开始展示 ========= 关闭黑幕`);
		} else {
			this.curA -= this.curSpeed * dt;
			this.mImg_BG.setImageColorDecimal(this.curColor.r, this.curColor.g, this.curColor.b, this.curA)
		}
	}

	showMask(time: number, callBack: () => void): void {
		let ratio = GameConfig.Rule.getElement(50008).Time;
		let curTime = time * ratio;
		this.runTime = curTime;
		this.waitTime = time - curTime;
		this.curSpeed = this.curA / this.runTime;
		this.callBack = callBack;
		console.error(`准备开始 ========= 开启黑幕 curTime: ${this.runTime}  waitTime:${this.waitTime}`);
		this.show();
		setTimeout(() => {
			console.error(`开始展示 ========= 开启黑幕`);
			this.canUpdate = true;
		}, this.waitTime);
	}
}
