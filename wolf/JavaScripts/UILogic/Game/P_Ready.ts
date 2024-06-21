/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-19 23:22:13
 * @FilePath     : \murdermystery3\JavaScripts\UILogic\Game\P_Ready.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: STR
 * TIME: 2023.02.07-13.06.06
 */

import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import Ready_Generate from "../../ui-generate/uiTemplate/Inside/Ready_generate";

export default class P_Ready extends Ready_Generate {
	private static _instance: P_Ready;
	private countTween
	private startPosX: number;
	private startPosY: number;
	private isFirst: boolean = true;
	public static get instance(): P_Ready {
		if (this._instance == null) {
			this._instance = mw.UIService.create(P_Ready);
		}
		return this._instance;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
	}

	/**准备倒计时 */
	public static setGameTime(time: number) {
		P_Ready.instance.mText_Time.text = (Tools.changeSecond2Minus(time));
	}

	show() {
		mw.UIService.showUI(this);
		this.beginShow();
	}

	hide() {
		mw.UIService.hideUI(this);
		this.countTween.stop();
		this.countTween = null;
		this.canUpdate = false;
	}

	private beginShow() {
		this.canUpdate = true;
		if (this.isFirst) {
			this.startPosX = this.mCanvas_Ready.position.x;
			this.startPosY = this.mCanvas_Ready.position.y;
			this.isFirst = false;
		}
		let startX = this.startPosX;
		let startY = this.startPosY;
		let endX = this.mCanvas_EndPos.position.x;
		let endY = this.mCanvas_EndPos.position.y;
		this.mCanvas_Ready.position = new Vector2(startX, startY);
		this.countTween = new mw.Tween({ x: startX, y: startY })
			.delay(GameConfig.Rule.getElement(10029).Time * 1000)
			.to({ x: endX, y: endY }, 1000)
			.onUpdate((v) => {
				this.mCanvas_Ready.position = (new mw.Vector2(v.x, v.y));
			}).onComplete(() => {
			}).start();
	}
}
