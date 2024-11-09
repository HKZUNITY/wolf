
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.06.21-20.30.52
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { Notice } from "../../../CommonUI/notice/Notice";
import { GameConfig } from "../../../Tables/GameConfig";
import AdPanel_Generate from "../../../ui-generate/module/AdsModule/AdPanel_generate";

export default class AdsPanel extends AdPanel_Generate {
	protected onStart(): void {
		this.canUpdate = false;
		this.layer = mw.UILayerDialog;
		this.mTitleTxt.text = GameConfig.Language.Text_Ads_1.Value;
		this.bindButtons();
	}

	private bindButtons(): void {
		this.mYesBtn.onClose.add(this.onClickYesButton.bind(this));
		this.mNoBtn.onClicked.add(this.onClickNoButton.bind(this));
	}

	private onClickYesButton(isSuccess: boolean): void {
		if (!isSuccess) {
			Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_2.Value, this.mYesBtn.text));
			return;
		}
		this.hide();
		if (this.callback) this.callback();
	}

	private onClickNoButton(): void {
		this.hide();
	}

	private callback: () => void = null;
	public showRewardAd(callback: () => void, contentText: string, noText: string, yesText: string): void {
		this.callback = callback;
		this.mContentTxt.text = contentText;
		this.mNoBtn.text = noText;
		this.mYesBtn.text = yesText;
		this.showAdPanel();
	}

	public showAdPanel(): void {
		if (this.visible) return;
		this.show();
	}
}