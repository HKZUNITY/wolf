/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ProcModule/ClearingPanel.ui
 * TIME: 2025.01.20-22.23.10
 */
 
@UIBind('UI/module/ProcModule/ClearingPanel.ui')
export default class ClearingPanel_Generate extends UIScript {
		private mCanvas_Info_EndPos_Internal: mw.Canvas
	public get mCanvas_Info_EndPos(): mw.Canvas {
		if(!this.mCanvas_Info_EndPos_Internal&&this.uiWidgetBase) {
			this.mCanvas_Info_EndPos_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info_EndPos') as mw.Canvas
		}
		return this.mCanvas_Info_EndPos_Internal
	}
	private mCanvas_Info_Internal: mw.Canvas
	public get mCanvas_Info(): mw.Canvas {
		if(!this.mCanvas_Info_Internal&&this.uiWidgetBase) {
			this.mCanvas_Info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info') as mw.Canvas
		}
		return this.mCanvas_Info_Internal
	}
	private mCanvas_Step1_Internal: mw.Canvas
	public get mCanvas_Step1(): mw.Canvas {
		if(!this.mCanvas_Step1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Step1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1') as mw.Canvas
		}
		return this.mCanvas_Step1_Internal
	}
	private mText_Detective_Internal: mw.TextBlock
	public get mText_Detective(): mw.TextBlock {
		if(!this.mText_Detective_Internal&&this.uiWidgetBase) {
			this.mText_Detective_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mText_Detective') as mw.TextBlock
		}
		return this.mText_Detective_Internal
	}
	private mImg_PlayerIcon_Detective_Internal: mw.Image
	public get mImg_PlayerIcon_Detective(): mw.Image {
		if(!this.mImg_PlayerIcon_Detective_Internal&&this.uiWidgetBase) {
			this.mImg_PlayerIcon_Detective_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mImg_PlayerIcon_Detective') as mw.Image
		}
		return this.mImg_PlayerIcon_Detective_Internal
	}
	private mImg_WeaponIcon_Detective_Internal: mw.Image
	public get mImg_WeaponIcon_Detective(): mw.Image {
		if(!this.mImg_WeaponIcon_Detective_Internal&&this.uiWidgetBase) {
			this.mImg_WeaponIcon_Detective_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mImg_WeaponIcon_Detective') as mw.Image
		}
		return this.mImg_WeaponIcon_Detective_Internal
	}
	private mText_WeaponName_Detective_Internal: mw.TextBlock
	public get mText_WeaponName_Detective(): mw.TextBlock {
		if(!this.mText_WeaponName_Detective_Internal&&this.uiWidgetBase) {
			this.mText_WeaponName_Detective_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mText_WeaponName_Detective') as mw.TextBlock
		}
		return this.mText_WeaponName_Detective_Internal
	}
	private mText_PlayerName_Detective_Internal: mw.TextBlock
	public get mText_PlayerName_Detective(): mw.TextBlock {
		if(!this.mText_PlayerName_Detective_Internal&&this.uiWidgetBase) {
			this.mText_PlayerName_Detective_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mText_PlayerName_Detective') as mw.TextBlock
		}
		return this.mText_PlayerName_Detective_Internal
	}
	private mText_Maffia_Internal: mw.TextBlock
	public get mText_Maffia(): mw.TextBlock {
		if(!this.mText_Maffia_Internal&&this.uiWidgetBase) {
			this.mText_Maffia_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mText_Maffia') as mw.TextBlock
		}
		return this.mText_Maffia_Internal
	}
	private mImg_PlayerIcon_Maffia_Internal: mw.Image
	public get mImg_PlayerIcon_Maffia(): mw.Image {
		if(!this.mImg_PlayerIcon_Maffia_Internal&&this.uiWidgetBase) {
			this.mImg_PlayerIcon_Maffia_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mImg_PlayerIcon_Maffia') as mw.Image
		}
		return this.mImg_PlayerIcon_Maffia_Internal
	}
	private mImg_WeaponIcon_Maffia_Internal: mw.Image
	public get mImg_WeaponIcon_Maffia(): mw.Image {
		if(!this.mImg_WeaponIcon_Maffia_Internal&&this.uiWidgetBase) {
			this.mImg_WeaponIcon_Maffia_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mImg_WeaponIcon_Maffia') as mw.Image
		}
		return this.mImg_WeaponIcon_Maffia_Internal
	}
	private mText_WeaponName_Maffia_Internal: mw.TextBlock
	public get mText_WeaponName_Maffia(): mw.TextBlock {
		if(!this.mText_WeaponName_Maffia_Internal&&this.uiWidgetBase) {
			this.mText_WeaponName_Maffia_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mText_WeaponName_Maffia') as mw.TextBlock
		}
		return this.mText_WeaponName_Maffia_Internal
	}
	private mText_PlayerName_Maffia_Internal: mw.TextBlock
	public get mText_PlayerName_Maffia(): mw.TextBlock {
		if(!this.mText_PlayerName_Maffia_Internal&&this.uiWidgetBase) {
			this.mText_PlayerName_Maffia_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mText_PlayerName_Maffia') as mw.TextBlock
		}
		return this.mText_PlayerName_Maffia_Internal
	}
	private mCanvas_Step2_Internal: mw.Canvas
	public get mCanvas_Step2(): mw.Canvas {
		if(!this.mCanvas_Step2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Step2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step2') as mw.Canvas
		}
		return this.mCanvas_Step2_Internal
	}
	private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step2/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mImg_Lose_Maffia_Internal: mw.Image
	public get mImg_Lose_Maffia(): mw.Image {
		if(!this.mImg_Lose_Maffia_Internal&&this.uiWidgetBase) {
			this.mImg_Lose_Maffia_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step2/mImg_Lose_Maffia') as mw.Image
		}
		return this.mImg_Lose_Maffia_Internal
	}
	private mImg_Lose_Detective_Internal: mw.Image
	public get mImg_Lose_Detective(): mw.Image {
		if(!this.mImg_Lose_Detective_Internal&&this.uiWidgetBase) {
			this.mImg_Lose_Detective_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/mCanvas_Step2/mImg_Lose_Detective') as mw.Image
		}
		return this.mImg_Lose_Detective_Internal
	}
	private mCanvas_reward_Internal: mw.Canvas
	public get mCanvas_reward(): mw.Canvas {
		if(!this.mCanvas_reward_Internal&&this.uiWidgetBase) {
			this.mCanvas_reward_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward') as mw.Canvas
		}
		return this.mCanvas_reward_Internal
	}
	private mCanvas_Step3_Internal: mw.Canvas
	public get mCanvas_Step3(): mw.Canvas {
		if(!this.mCanvas_Step3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Step3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step3') as mw.Canvas
		}
		return this.mCanvas_Step3_Internal
	}
	private mImg_Reward_BG_Internal: mw.Image
	public get mImg_Reward_BG(): mw.Image {
		if(!this.mImg_Reward_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Reward_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step3/mImg_Reward_BG') as mw.Image
		}
		return this.mImg_Reward_BG_Internal
	}
	private mImg_Reward_Title_Internal: mw.Image
	public get mImg_Reward_Title(): mw.Image {
		if(!this.mImg_Reward_Title_Internal&&this.uiWidgetBase) {
			this.mImg_Reward_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step3/mImg_Reward_Title') as mw.Image
		}
		return this.mImg_Reward_Title_Internal
	}
	private mText_Reward_Title_Internal: mw.TextBlock
	public get mText_Reward_Title(): mw.TextBlock {
		if(!this.mText_Reward_Title_Internal&&this.uiWidgetBase) {
			this.mText_Reward_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step3/mText_Reward_Title') as mw.TextBlock
		}
		return this.mText_Reward_Title_Internal
	}
	private mImg_IdentityIcon_Internal: mw.Image
	public get mImg_IdentityIcon(): mw.Image {
		if(!this.mImg_IdentityIcon_Internal&&this.uiWidgetBase) {
			this.mImg_IdentityIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step3/mImg_IdentityIcon') as mw.Image
		}
		return this.mImg_IdentityIcon_Internal
	}
	private mText_IdentityText_Internal: mw.TextBlock
	public get mText_IdentityText(): mw.TextBlock {
		if(!this.mText_IdentityText_Internal&&this.uiWidgetBase) {
			this.mText_IdentityText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step3/mText_IdentityText') as mw.TextBlock
		}
		return this.mText_IdentityText_Internal
	}
	private mText_Identity_Internal: mw.TextBlock
	public get mText_Identity(): mw.TextBlock {
		if(!this.mText_Identity_Internal&&this.uiWidgetBase) {
			this.mText_Identity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step3/mText_Identity') as mw.TextBlock
		}
		return this.mText_Identity_Internal
	}
	private mCanvas_Step4_Internal: mw.Canvas
	public get mCanvas_Step4(): mw.Canvas {
		if(!this.mCanvas_Step4_Internal&&this.uiWidgetBase) {
			this.mCanvas_Step4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4') as mw.Canvas
		}
		return this.mCanvas_Step4_Internal
	}
	private mText_RewardGold_Internal: mw.TextBlock
	public get mText_RewardGold(): mw.TextBlock {
		if(!this.mText_RewardGold_Internal&&this.uiWidgetBase) {
			this.mText_RewardGold_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/mText_RewardGold') as mw.TextBlock
		}
		return this.mText_RewardGold_Internal
	}
	private mImg_AwardIcon_Identity_Internal: mw.Image
	public get mImg_AwardIcon_Identity(): mw.Image {
		if(!this.mImg_AwardIcon_Identity_Internal&&this.uiWidgetBase) {
			this.mImg_AwardIcon_Identity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_Identity/mImg_AwardIcon_Identity') as mw.Image
		}
		return this.mImg_AwardIcon_Identity_Internal
	}
	private mText_AwardNumber_Identity_Internal: mw.TextBlock
	public get mText_AwardNumber_Identity(): mw.TextBlock {
		if(!this.mText_AwardNumber_Identity_Internal&&this.uiWidgetBase) {
			this.mText_AwardNumber_Identity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_Identity/mText_AwardNumber_Identity') as mw.TextBlock
		}
		return this.mText_AwardNumber_Identity_Internal
	}
	private mText_ChangeText_Internal: mw.TextBlock
	public get mText_ChangeText(): mw.TextBlock {
		if(!this.mText_ChangeText_Internal&&this.uiWidgetBase) {
			this.mText_ChangeText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/mText_ChangeText') as mw.TextBlock
		}
		return this.mText_ChangeText_Internal
	}
	private mImg_Award_EXP_Internal: mw.Image
	public get mImg_Award_EXP(): mw.Image {
		if(!this.mImg_Award_EXP_Internal&&this.uiWidgetBase) {
			this.mImg_Award_EXP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mImg_Award_EXP') as mw.Image
		}
		return this.mImg_Award_EXP_Internal
	}
	private mText_Award_EXP_Internal: mw.TextBlock
	public get mText_Award_EXP(): mw.TextBlock {
		if(!this.mText_Award_EXP_Internal&&this.uiWidgetBase) {
			this.mText_Award_EXP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mText_Award_EXP') as mw.TextBlock
		}
		return this.mText_Award_EXP_Internal
	}
	private mText_VictoryAward1_Internal: mw.TextBlock
	public get mText_VictoryAward1(): mw.TextBlock {
		if(!this.mText_VictoryAward1_Internal&&this.uiWidgetBase) {
			this.mText_VictoryAward1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mText_VictoryAward1') as mw.TextBlock
		}
		return this.mText_VictoryAward1_Internal
	}
	private mText_VictoryAward2_Internal: mw.TextBlock
	public get mText_VictoryAward2(): mw.TextBlock {
		if(!this.mText_VictoryAward2_Internal&&this.uiWidgetBase) {
			this.mText_VictoryAward2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mText_VictoryAward2') as mw.TextBlock
		}
		return this.mText_VictoryAward2_Internal
	}
	private mBtn_Close_Internal: mw.StaleButton
	public get mBtn_Close(): mw.StaleButton {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/mBtn_Close') as mw.StaleButton
		}
		return this.mBtn_Close_Internal
	}
	private mText_Member_Internal: mw.TextBlock
	public get mText_Member(): mw.TextBlock {
		if(!this.mText_Member_Internal&&this.uiWidgetBase) {
			this.mText_Member_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_Step4/mText_Member') as mw.TextBlock
		}
		return this.mText_Member_Internal
	}
	private mCanvas_AD_Internal: mw.Canvas
	public get mCanvas_AD(): mw.Canvas {
		if(!this.mCanvas_AD_Internal&&this.uiWidgetBase) {
			this.mCanvas_AD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_AD') as mw.Canvas
		}
		return this.mCanvas_AD_Internal
	}
	private mText_WatchAD_Internal: mw.TextBlock
	public get mText_WatchAD(): mw.TextBlock {
		if(!this.mText_WatchAD_Internal&&this.uiWidgetBase) {
			this.mText_WatchAD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_AD/mText_WatchAD') as mw.TextBlock
		}
		return this.mText_WatchAD_Internal
	}
	private mAdsButton_Internal: mw.AdsButton
	public get mAdsButton(): mw.AdsButton {
		if(!this.mAdsButton_Internal&&this.uiWidgetBase) {
			this.mAdsButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_reward/mCanvas_AD/mAdsButton') as mw.AdsButton
		}
		return this.mAdsButton_Internal
	}
	private mCanvas_Dark_Internal: mw.Canvas
	public get mCanvas_Dark(): mw.Canvas {
		if(!this.mCanvas_Dark_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark') as mw.Canvas
		}
		return this.mCanvas_Dark_Internal
	}
	private mCanvas_Dark_Clearing_Internal: mw.Canvas
	public get mCanvas_Dark_Clearing(): mw.Canvas {
		if(!this.mCanvas_Dark_Clearing_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Clearing_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing') as mw.Canvas
		}
		return this.mCanvas_Dark_Clearing_Internal
	}
	private mImg_Dark_Clearing_Light_Internal: mw.Image
	public get mImg_Dark_Clearing_Light(): mw.Image {
		if(!this.mImg_Dark_Clearing_Light_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Clearing_Light_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mImg_Dark_Clearing_Light') as mw.Image
		}
		return this.mImg_Dark_Clearing_Light_Internal
	}
	private mCanvas_Dark_Clearing_Explaine_Internal: mw.Canvas
	public get mCanvas_Dark_Clearing_Explaine(): mw.Canvas {
		if(!this.mCanvas_Dark_Clearing_Explaine_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Clearing_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mCanvas_Dark_Clearing_Explaine') as mw.Canvas
		}
		return this.mCanvas_Dark_Clearing_Explaine_Internal
	}
	private mImg_Dark_Clearing_BG_Internal: mw.Image
	public get mImg_Dark_Clearing_BG(): mw.Image {
		if(!this.mImg_Dark_Clearing_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Clearing_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mCanvas_Dark_Clearing_Explaine/mImg_Dark_Clearing_BG') as mw.Image
		}
		return this.mImg_Dark_Clearing_BG_Internal
	}
	private mText_Dark_Clearing_Explaine_Internal: mw.TextBlock
	public get mText_Dark_Clearing_Explaine(): mw.TextBlock {
		if(!this.mText_Dark_Clearing_Explaine_Internal&&this.uiWidgetBase) {
			this.mText_Dark_Clearing_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mCanvas_Dark_Clearing_Explaine/mText_Dark_Clearing_Explaine') as mw.TextBlock
		}
		return this.mText_Dark_Clearing_Explaine_Internal
	}
	private mCanvas_Dark_Title_Internal: mw.Canvas
	public get mCanvas_Dark_Title(): mw.Canvas {
		if(!this.mCanvas_Dark_Title_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title') as mw.Canvas
		}
		return this.mCanvas_Dark_Title_Internal
	}
	private mImg_Dark_Title_Light_Internal: mw.Image
	public get mImg_Dark_Title_Light(): mw.Image {
		if(!this.mImg_Dark_Title_Light_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Title_Light_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mImg_Dark_Title_Light') as mw.Image
		}
		return this.mImg_Dark_Title_Light_Internal
	}
	private mCanvas_Dark_Title_Explaine_Internal: mw.Canvas
	public get mCanvas_Dark_Title_Explaine(): mw.Canvas {
		if(!this.mCanvas_Dark_Title_Explaine_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Title_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mCanvas_Dark_Title_Explaine') as mw.Canvas
		}
		return this.mCanvas_Dark_Title_Explaine_Internal
	}
	private mImg_Dark_Title_BG_Internal: mw.Image
	public get mImg_Dark_Title_BG(): mw.Image {
		if(!this.mImg_Dark_Title_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Title_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mCanvas_Dark_Title_Explaine/mImg_Dark_Title_BG') as mw.Image
		}
		return this.mImg_Dark_Title_BG_Internal
	}
	private mText_Dark_Title_Explaine_Internal: mw.TextBlock
	public get mText_Dark_Title_Explaine(): mw.TextBlock {
		if(!this.mText_Dark_Title_Explaine_Internal&&this.uiWidgetBase) {
			this.mText_Dark_Title_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mCanvas_Dark_Title_Explaine/mText_Dark_Title_Explaine') as mw.TextBlock
		}
		return this.mText_Dark_Title_Explaine_Internal
	}
	private mCanvas_Dark_Key_Internal: mw.Canvas
	public get mCanvas_Dark_Key(): mw.Canvas {
		if(!this.mCanvas_Dark_Key_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Key_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key') as mw.Canvas
		}
		return this.mCanvas_Dark_Key_Internal
	}
	private mImg_Dark_Key_Light_Internal: mw.Image
	public get mImg_Dark_Key_Light(): mw.Image {
		if(!this.mImg_Dark_Key_Light_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Key_Light_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mImg_Dark_Key_Light') as mw.Image
		}
		return this.mImg_Dark_Key_Light_Internal
	}
	private mCanvas_Dark_Key_Explaine_Internal: mw.Canvas
	public get mCanvas_Dark_Key_Explaine(): mw.Canvas {
		if(!this.mCanvas_Dark_Key_Explaine_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Key_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mCanvas_Dark_Key_Explaine') as mw.Canvas
		}
		return this.mCanvas_Dark_Key_Explaine_Internal
	}
	private mImg_Dark_Key_BG_Internal: mw.Image
	public get mImg_Dark_Key_BG(): mw.Image {
		if(!this.mImg_Dark_Key_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Key_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mCanvas_Dark_Key_Explaine/mImg_Dark_Key_BG') as mw.Image
		}
		return this.mImg_Dark_Key_BG_Internal
	}
	private mText_Dark_Key_Explaine_Internal: mw.TextBlock
	public get mText_Dark_Key_Explaine(): mw.TextBlock {
		if(!this.mText_Dark_Key_Explaine_Internal&&this.uiWidgetBase) {
			this.mText_Dark_Key_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mCanvas_Dark_Key_Explaine/mText_Dark_Key_Explaine') as mw.TextBlock
		}
		return this.mText_Dark_Key_Explaine_Internal
	}
	private mCanvas_Dark_Earning_Internal: mw.Canvas
	public get mCanvas_Dark_Earning(): mw.Canvas {
		if(!this.mCanvas_Dark_Earning_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Earning_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning') as mw.Canvas
		}
		return this.mCanvas_Dark_Earning_Internal
	}
	private mImg_Dark_Earning_Light_Internal: mw.Image
	public get mImg_Dark_Earning_Light(): mw.Image {
		if(!this.mImg_Dark_Earning_Light_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Earning_Light_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mImg_Dark_Earning_Light') as mw.Image
		}
		return this.mImg_Dark_Earning_Light_Internal
	}
	private mCanvas_Dark_Earning_Explaine_Internal: mw.Canvas
	public get mCanvas_Dark_Earning_Explaine(): mw.Canvas {
		if(!this.mCanvas_Dark_Earning_Explaine_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dark_Earning_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mCanvas_Dark_Earning_Explaine') as mw.Canvas
		}
		return this.mCanvas_Dark_Earning_Explaine_Internal
	}
	private mImg_Dark_Earning_BG_Internal: mw.Image
	public get mImg_Dark_Earning_BG(): mw.Image {
		if(!this.mImg_Dark_Earning_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Dark_Earning_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mCanvas_Dark_Earning_Explaine/mImg_Dark_Earning_BG') as mw.Image
		}
		return this.mImg_Dark_Earning_BG_Internal
	}
	private mText_Dark_Earning_Explaine_Internal: mw.TextBlock
	public get mText_Dark_Earning_Explaine(): mw.TextBlock {
		if(!this.mText_Dark_Earning_Explaine_Internal&&this.uiWidgetBase) {
			this.mText_Dark_Earning_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mCanvas_Dark_Earning_Explaine/mText_Dark_Earning_Explaine') as mw.TextBlock
		}
		return this.mText_Dark_Earning_Explaine_Internal
	}
	private mBtn_Click_Internal: mw.StaleButton
	public get mBtn_Click(): mw.StaleButton {
		if(!this.mBtn_Click_Internal&&this.uiWidgetBase) {
			this.mBtn_Click_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Click') as mw.StaleButton
		}
		return this.mBtn_Click_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		});
		this.initLanguage(this.mBtn_Close);
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Click.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Click");
		});
		this.initLanguage(this.mBtn_Click);
		this.mBtn_Click.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Detective)
		
	
		this.initLanguage(this.mText_WeaponName_Detective)
		
	
		this.initLanguage(this.mText_PlayerName_Detective)
		
	
		this.initLanguage(this.mText_Maffia)
		
	
		this.initLanguage(this.mText_WeaponName_Maffia)
		
	
		this.initLanguage(this.mText_PlayerName_Maffia)
		
	
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Reward_Title)
		
	
		this.initLanguage(this.mText_IdentityText)
		
	
		this.initLanguage(this.mText_Identity)
		
	
		this.initLanguage(this.mText_RewardGold)
		
	
		this.initLanguage(this.mText_AwardNumber_Identity)
		
	
		this.initLanguage(this.mText_ChangeText)
		
	
		this.initLanguage(this.mText_Award_EXP)
		
	
		this.initLanguage(this.mText_VictoryAward1)
		
	
		this.initLanguage(this.mText_VictoryAward2)
		
	
		this.initLanguage(this.mText_Member)
		
	
		this.initLanguage(this.mText_WatchAD)
		
	
		this.initLanguage(this.mText_Dark_Clearing_Explaine)
		
	
		this.initLanguage(this.mText_Dark_Title_Explaine)
		
	
		this.initLanguage(this.mText_Dark_Key_Explaine)
		
	
		this.initLanguage(this.mText_Dark_Earning_Explaine)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Info/mCanvas_Step1/Text_VS") as any);
		
	
	}
	
	/*初始化多语言*/
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

	/*显示panel*/
    public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	/*隐藏panel*/
    public hide(): void {
		mw.UIService.hideUI(this);
	}
 }
 