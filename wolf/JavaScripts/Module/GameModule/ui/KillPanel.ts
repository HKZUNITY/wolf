import { GameConfig } from "../../../Tables/GameConfig";
import KillPanel_Generate from "../../../ui-generate/module/GameModule/KillPanel_generate";
import KillItem from "./KillItem";

export default class KillPanel extends KillPanel_Generate {
	private idlePool: Array<mw.UserWidget> = new Array<mw.UserWidget>();
	private offsetX: number = GameConfig.Rule.getElement(60012).Num;
	private offsetY: number = GameConfig.Rule.getElement(60013).Num;
	private upDistance: number = -200;
	private tweenTime: number = GameConfig.Rule.getElement(60010).Time;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

	public addKillUI(pos: Vector) {
		let idleUI = this.getIdleObj();
		let text = idleUI.findChildByPath("RootCanvas/mText_1") as mw.TextBlock;
		this.updateKillUI(text, pos);
		idleUI.visibility = mw.SlateVisibility.HitTestInvisible;
		let tween = new mw.Tween({ y: 0 }).to({ y: this.upDistance }, this.tweenTime * 1000)
			.onUpdate((data) => {
				this.updateKillUI(text, pos);
				text.position = text.position.clone().add(new Vector2(0, data.y));
			})
			.onComplete(() => {
				this.addIdleObj(idleUI);
			})
			.start();
	}

	private updateKillUI(text: mw.TextBlock, pos: Vector) {
		let screenResult = InputUtil.projectWorldPositionToWidgetPosition(pos);
		let originPos = screenResult.screenPosition.clone()
		if (originPos.x == 0 && originPos.y == 0) {
			originPos = new mw.Vector2(-10000, -10000)
		}
		else {
			originPos.add(new Vector2(this.offsetX, this.offsetY));
		}
		text.position = originPos;

	}

	private getIdleObj() {
		let res: mw.UserWidget = null;
		if (this.idlePool.length <= 0) {
			res = mw.UIService.create(KillItem).uiWidgetBase;
			res.visibility = mw.SlateVisibility.Collapsed;
			this.rootCanvas.addChild(res);
		}
		else {
			res = this.idlePool.pop();
		}
		return res;
	}

	private addIdleObj(obj: mw.UserWidget) {
		obj.visibility = mw.SlateVisibility.Collapsed;
		this.idlePool.push(obj);
	}
}
