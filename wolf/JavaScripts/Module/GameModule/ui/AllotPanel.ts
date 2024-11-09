import { Camp } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import AllotPanel_Generate from "../../../ui-generate/module/GameModule/AllotPanel_generate";

export default class AllotPanel extends AllotPanel_Generate {
	private changeIntervel: number = GameConfig.Rule.getElement(10004).Time;
	private s_time: number;
	private randomSoundGuid: string = GameConfig.Assets.getElement(10002).Guid;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.text();
	}

	public showAllotUI(showNum: number, isSvip: boolean) {
		let showString = (showNum * 100).toFixed(0);
		this.mText_ProbNumber.text = ("" + showString + "%");
		this.changeVisible(0);
		this.show();
		this.beginChange();
		this.mText_Member.visibility = isSvip ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
	}
	public showCamp(camp: number) {
		TimeUtil.clearInterval(this.s_time);
		let readySound = GameConfig.Sound.getElement("10006").Guid
		if (camp == Camp.Police) {
			readySound = GameConfig.Sound.getElement("10005").Guid
		}
		else if (camp == Camp.Spy) {
			readySound = GameConfig.Sound.getElement("10004").Guid
		}
		SoundService.playSound(readySound);
		this.changeVisible(camp);
	}
	public closeAllotUI() {
		this.hide();
		TimeUtil.clearInterval(this.s_time);
	}
	private text = () => {
		this.mText_Explain.text = (GameConfig.Text.getElement(11005).Content);
		this.mText_Prob.text = (GameConfig.Text.getElement(11004).Content);
		this.mText_Title.text = (GameConfig.Text.getElement(11003).Content);
		this.mText_Civilian.text = (GameConfig.Identity.getElement(10003).IdentityName);
		this.mText_Detective.text = (GameConfig.Identity.getElement(10001).IdentityName);
		this.mText_Maffia.text = (GameConfig.Identity.getElement(10002).IdentityName);
	}
	private beginChange() {
		let num = 0;
		this.s_time = TimeUtil.setInterval(() => {
			num++;
			this.changeVisible(num % 3);
		}, this.changeIntervel)
		setTimeout(() => {
			TimeUtil.clearInterval(this.s_time);
		}, 5000);
	}
	private changeVisible(num: number) {
		SoundService.playSound(this.randomSoundGuid);
		switch (num) {
			case 2://平民
				this.mText_Civilian.visibility = (mw.SlateVisibility.Visible);
				this.mText_Maffia.visibility = (mw.SlateVisibility.Hidden);
				this.mText_Detective.visibility = (mw.SlateVisibility.Hidden);
				break;
			case 0://警察
				this.mText_Civilian.visibility = (mw.SlateVisibility.Hidden);
				this.mText_Maffia.visibility = (mw.SlateVisibility.Hidden);
				this.mText_Detective.visibility = (mw.SlateVisibility.Visible);
				break;
			case 1://黑手党
				this.mText_Civilian.visibility = (mw.SlateVisibility.Hidden);
				this.mText_Maffia.visibility = (mw.SlateVisibility.Visible);
				this.mText_Detective.visibility = (mw.SlateVisibility.Hidden);
				break;
		}
	}
}
