import { GameConfig } from "../../../Tables/GameConfig";
import CongratulationPanel_Generate from "../../../ui-generate/module/GameModule/CongratulationPanel_generate";

export default class CongratulationPanel extends CongratulationPanel_Generate {
	private finalTween: mw.Tween<{ x: number, y: number }>;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.setText();
	}

	setText() {
		this.mText_Lose.text = (GameConfig.Text.getElement(11013).Content)
		this.mText_Win.text = (GameConfig.Text.getElement(11008).Content);
	}
	public closeGameFinal() {
		this.hide();
	}
	public showGameFinal(isWin: boolean) {
		if (isWin) {
			this.mCanvas_Lose.visibility = (mw.SlateVisibility.Hidden);
			this.mCanvas_Win.visibility = (mw.SlateVisibility.Visible);
		}
		else {
			this.mCanvas_Lose.visibility = (mw.SlateVisibility.Visible);
			this.mCanvas_Win.visibility = (mw.SlateVisibility.Hidden);
		}
		this.beginShow();
	}
	private beginShow() {
		let staticX = this.mCanvas_Win.position.x;
		UIService.showUI(this);
		this.finalTween = new mw.Tween({ x: staticX, y: -160 }).to({ x: staticX, y: 400 }, 1000).onUpdate((v) => {
			this.mCanvas_Win.position = (new mw.Vector2(v.x, v.y));
			this.mCanvas_Lose.position = (new mw.Vector2(v.x, v.y));
		}).onComplete(() => {
			this.finalTween.stop();
			this.finalTween = null;

		}).start();
	}
}
