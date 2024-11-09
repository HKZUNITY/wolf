import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import ReadyPanel_Generate from "../../../ui-generate/module/GameModule/ReadyPanel_generate";

export default class ReadyPanel extends ReadyPanel_Generate {
	private countTween
	private startPosX: number;
	private startPosY: number;
	private isFirst: boolean = true;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}
	/**准备倒计时 */
	public setGameTime(time: number) {
		this.mText_Time.text = (Tools.formatTime_1(time));
	}

	protected onShow(...params: any[]): void {
		this.beginShow();
	}

	protected onHide(): void {
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
