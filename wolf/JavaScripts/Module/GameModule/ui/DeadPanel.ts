import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import DeadPanel_Generate from "../../../ui-generate/module/GameModule/DeadPanel_generate";

export default class DeadPanel extends DeadPanel_Generate {
	private dieTween: mw.Tween<{ x: number, y: number }>;
	private imgTween: mw.Tween<{ x: number, y: number }>;
	private s_Time: number;
	private spantime: number = 0.5;
	private count: number = 0;
	private maxcount: number = Math.round(GameConfig.Rule.getElement(10010).Time / this.spantime);
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.setText();
		if (Tools.isRewardActive()) {
			this.mBtn_DeadAD.visibility = (mw.SlateVisibility.Visible);
		}
		else {
			this.mBtn_DeadAD.visibility = (mw.SlateVisibility.Collapsed);
		}
	}

	setText() {
		this.mText_Explaine.text = (GameConfig.Guide.getElement(60001).GuideContent);
	}
	public showDieEffectUI() {
		this.mCanvas_Explaine.visibility = (mw.SlateVisibility.Collapsed);
		this.dieEffect();
	}
	public closeDieEffecUI() {
		this.hide();
		if (this.imgTween != null) {
			this.imgTween.stop();
			this.imgTween = null;
		}
		if (this.dieTween != null) {
			this.dieTween.stop();
			this.dieTween = null;
		}

	}
	private imgTweenBegin() {
		this.imgTween = new mw.Tween({ x: 0, y: 0 });
		this.imgTween.to({ x: 1, y: 1 }, 500)
			.onUpdate((v) => {
				if (v.x <= 0.1) {
					this.mImg_Die.visibility = (mw.SlateVisibility.Visible);
					this.mImg_Die_1.visibility = (mw.SlateVisibility.Hidden);
				} else if (v.x >= 0.9) {
					this.mImg_Die.visibility = (mw.SlateVisibility.Hidden);
					this.mImg_Die_1.visibility = (mw.SlateVisibility.Visible);
				}
			})
			.repeat(Infinity)
			.yoyo(true)
			.start();

	}
	private dieEffect() {
		let staticX = this.mText_Die.position.x;
		this.count = 0;
		this.mImg_Die.visibility = (mw.SlateVisibility.Hidden);
		this.mImg_Die_1.visibility = (mw.SlateVisibility.Hidden);
		this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
		this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Hidden);
		this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Visible);
		UIService.showUI(this);

		this.dieTween = new mw.Tween({ x: staticX, y: -240 }).to({ x: staticX, y: 300 }, 2000).onUpdate((v) => {
			this.mText_Die.position = (new mw.Vector2(v.x, v.y));

		}).onComplete(() => {
			if (this.dieTween != null) {
				this.dieTween.stop();
				this.dieTween = null;
			}
			this.mImg_Die.visibility = (mw.SlateVisibility.Visible);
			this.imgTweenBegin();
		}).start();

		this.s_Time = TimeUtil.setInterval(() => {
			if (this.count >= this.maxcount) {
				TimeUtil.clearInterval(this.s_Time);
				UIService.hideUI(this);
				if (this.imgTween != null) {
					this.imgTween.stop();
					this.imgTween = null;
				}
			}
			this.hudEffect(this.count % 4);
			this.count++;
		}, this.spantime)
	}
	hudEffect(num: number) {
		switch (num) {
			case 0:
				this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
				this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Hidden);
				this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Visible);
				break;
			case 1:
				this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
				this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Visible);
				this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Hidden);
				break;
			case 2:
				this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Visible);
				this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Visible);
				this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Hidden);
				break;
			case 3:
				this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
				this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Visible);
				this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Hidden);
				break;
		}
	}

	public showDieExplain() {
		this.mCanvas_Explaine.visibility = (mw.SlateVisibility.Visible);
		setTimeout(() => {
			this.mCanvas_Explaine.visibility = (mw.SlateVisibility.Collapsed);
		}, GameConfig.Guide.getElement(60001).GuideTime * 1000);
	}

}
