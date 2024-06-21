
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Clearing/Clearing.ui
 * TIME: 2023.07.26-16.32.30
 */

 

 @UIBind('UI/uiTemplate/Clearing/Clearing.ui')
 export default class Clearing_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Info_EndPos')
    public mCanvas_Info_EndPos: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info')
    public mCanvas_Info: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1')
    public mCanvas_Step1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mText_Detective')
    public mText_Detective: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mImg_PlayerIcon_Detective')
    public mImg_PlayerIcon_Detective: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mImg_WeaponIcon_Detective')
    public mImg_WeaponIcon_Detective: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mText_WeaponName_Detective')
    public mText_WeaponName_Detective: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Detective/mText_PlayerName_Detective')
    public mText_PlayerName_Detective: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mText_Maffia')
    public mText_Maffia: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mImg_PlayerIcon_Maffia')
    public mImg_PlayerIcon_Maffia: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mImg_WeaponIcon_Maffia')
    public mImg_WeaponIcon_Maffia: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mText_WeaponName_Maffia')
    public mText_WeaponName_Maffia: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step1/Canvas_Maffia/mText_PlayerName_Maffia')
    public mText_PlayerName_Maffia: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step2')
    public mCanvas_Step2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step2/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step2/mImg_Lose_Maffia')
    public mImg_Lose_Maffia: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Info/mCanvas_Step2/mImg_Lose_Detective')
    public mImg_Lose_Detective: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward')
    public mCanvas_reward: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step3')
    public mCanvas_Step3: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step3/mImg_Reward_BG')
    public mImg_Reward_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step3/mImg_Reward_Title')
    public mImg_Reward_Title: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step3/mText_Reward_Title')
    public mText_Reward_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step3/mImg_IdentityIcon')
    public mImg_IdentityIcon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step3/mText_IdentityText')
    public mText_IdentityText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step3/mText_Identity')
    public mText_Identity: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4')
    public mCanvas_Step4: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/mText_RewardGold')
    public mText_RewardGold: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_Identity/mImg_AwardIcon_Identity')
    public mImg_AwardIcon_Identity: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_Identity/mText_AwardNumber_Identity')
    public mText_AwardNumber_Identity: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/mText_ChangeText')
    public mText_ChangeText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mImg_Award_EXP')
    public mImg_Award_EXP: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mText_Award_EXP')
    public mText_Award_EXP: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mText_VictoryAward1')
    public mText_VictoryAward1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/Canvas_Award_EXP/mText_VictoryAward2')
    public mText_VictoryAward2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/mBtn_Close')
    public mBtn_Close: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_Step4/mText_Member')
    public mText_Member: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_AD')
    public mCanvas_AD: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_AD/mText_WatchAD')
    public mText_WatchAD: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_reward/mCanvas_AD/mButton_WatchAD')
    public mButton_WatchAD: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark')
    public mCanvas_Dark: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing')
    public mCanvas_Dark_Clearing: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mImg_Dark_Clearing_Light')
    public mImg_Dark_Clearing_Light: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mCanvas_Dark_Clearing_Explaine')
    public mCanvas_Dark_Clearing_Explaine: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mCanvas_Dark_Clearing_Explaine/mImg_Dark_Clearing_BG')
    public mImg_Dark_Clearing_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Clearing/mCanvas_Dark_Clearing_Explaine/mText_Dark_Clearing_Explaine')
    public mText_Dark_Clearing_Explaine: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title')
    public mCanvas_Dark_Title: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mImg_Dark_Title_Light')
    public mImg_Dark_Title_Light: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mCanvas_Dark_Title_Explaine')
    public mCanvas_Dark_Title_Explaine: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mCanvas_Dark_Title_Explaine/mImg_Dark_Title_BG')
    public mImg_Dark_Title_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Title/mCanvas_Dark_Title_Explaine/mText_Dark_Title_Explaine')
    public mText_Dark_Title_Explaine: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key')
    public mCanvas_Dark_Key: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mImg_Dark_Key_Light')
    public mImg_Dark_Key_Light: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mCanvas_Dark_Key_Explaine')
    public mCanvas_Dark_Key_Explaine: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mCanvas_Dark_Key_Explaine/mImg_Dark_Key_BG')
    public mImg_Dark_Key_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Key/mCanvas_Dark_Key_Explaine/mText_Dark_Key_Explaine')
    public mText_Dark_Key_Explaine: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning')
    public mCanvas_Dark_Earning: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mImg_Dark_Earning_Light')
    public mImg_Dark_Earning_Light: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mCanvas_Dark_Earning_Explaine')
    public mCanvas_Dark_Earning_Explaine: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mCanvas_Dark_Earning_Explaine/mImg_Dark_Earning_BG')
    public mImg_Dark_Earning_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Dark/mCanvas_Dark_Earning/mCanvas_Dark_Earning_Explaine/mText_Dark_Earning_Explaine')
    public mText_Dark_Earning_Explaine: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Click')
    public mBtn_Click: mw.StaleButton=undefined;
    

 
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
		})
		this.initLanguage(this.mBtn_Close);
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_WatchAD.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_WatchAD");
		})
		this.initLanguage(this.mButton_WatchAD);
		this.mButton_WatchAD.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Click.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Click");
		})
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
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 