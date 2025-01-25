/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/HUDModule/HUDPanel.ui
 * TIME: 2025.01.25-11.13.50
 */
 
@UIBind('UI/module/HUDModule/HUDPanel.ui')
export default class HUDPanel_Generate extends UIScript {
		private mCanvas_PlayerInf_Internal: mw.Canvas
	public get mCanvas_PlayerInf(): mw.Canvas {
		if(!this.mCanvas_PlayerInf_Internal&&this.uiWidgetBase) {
			this.mCanvas_PlayerInf_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf') as mw.Canvas
		}
		return this.mCanvas_PlayerInf_Internal
	}
	private mImg_HeadIcon_Internal: mw.Image
	public get mImg_HeadIcon(): mw.Image {
		if(!this.mImg_HeadIcon_Internal&&this.uiWidgetBase) {
			this.mImg_HeadIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/mImg_HeadIcon') as mw.Image
		}
		return this.mImg_HeadIcon_Internal
	}
	private mText_PlayerName_Internal: mw.TextBlock
	public get mText_PlayerName(): mw.TextBlock {
		if(!this.mText_PlayerName_Internal&&this.uiWidgetBase) {
			this.mText_PlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/mText_PlayerName') as mw.TextBlock
		}
		return this.mText_PlayerName_Internal
	}
	private mImg_CoinIcon_Internal: mw.Image
	public get mImg_CoinIcon(): mw.Image {
		if(!this.mImg_CoinIcon_Internal&&this.uiWidgetBase) {
			this.mImg_CoinIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/AddCoinCanvas/mImg_CoinIcon') as mw.Image
		}
		return this.mImg_CoinIcon_Internal
	}
	private mText_CoinsNumber_Internal: mw.TextBlock
	public get mText_CoinsNumber(): mw.TextBlock {
		if(!this.mText_CoinsNumber_Internal&&this.uiWidgetBase) {
			this.mText_CoinsNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/AddCoinCanvas/mText_CoinsNumber') as mw.TextBlock
		}
		return this.mText_CoinsNumber_Internal
	}
	private mAddCoinButton_Internal: mw.Button
	public get mAddCoinButton(): mw.Button {
		if(!this.mAddCoinButton_Internal&&this.uiWidgetBase) {
			this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/AddCoinCanvas/mAddCoinButton') as mw.Button
		}
		return this.mAddCoinButton_Internal
	}
	private mImg_DiamondNumber_Internal: mw.Image
	public get mImg_DiamondNumber(): mw.Image {
		if(!this.mImg_DiamondNumber_Internal&&this.uiWidgetBase) {
			this.mImg_DiamondNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/AddAdsCanvas/mImg_DiamondNumber') as mw.Image
		}
		return this.mImg_DiamondNumber_Internal
	}
	private mText_DiamondNumber_Internal: mw.TextBlock
	public get mText_DiamondNumber(): mw.TextBlock {
		if(!this.mText_DiamondNumber_Internal&&this.uiWidgetBase) {
			this.mText_DiamondNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/AddAdsCanvas/mText_DiamondNumber') as mw.TextBlock
		}
		return this.mText_DiamondNumber_Internal
	}
	private mAddAdsButton_Internal: mw.Button
	public get mAddAdsButton(): mw.Button {
		if(!this.mAddAdsButton_Internal&&this.uiWidgetBase) {
			this.mAddAdsButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerInf/AddAdsCanvas/mAddAdsButton') as mw.Button
		}
		return this.mAddAdsButton_Internal
	}
	private mTaskCanvas_Internal: mw.Canvas
	public get mTaskCanvas(): mw.Canvas {
		if(!this.mTaskCanvas_Internal&&this.uiWidgetBase) {
			this.mTaskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas') as mw.Canvas
		}
		return this.mTaskCanvas_Internal
	}
	private mTask1Canvas_Internal: mw.Canvas
	public get mTask1Canvas(): mw.Canvas {
		if(!this.mTask1Canvas_Internal&&this.uiWidgetBase) {
			this.mTask1Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask1Canvas') as mw.Canvas
		}
		return this.mTask1Canvas_Internal
	}
	private mTask1IconImage_Internal: mw.Image
	public get mTask1IconImage(): mw.Image {
		if(!this.mTask1IconImage_Internal&&this.uiWidgetBase) {
			this.mTask1IconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask1Canvas/mTask1IconImage') as mw.Image
		}
		return this.mTask1IconImage_Internal
	}
	private mTask1NameTextBlock_Internal: mw.TextBlock
	public get mTask1NameTextBlock(): mw.TextBlock {
		if(!this.mTask1NameTextBlock_Internal&&this.uiWidgetBase) {
			this.mTask1NameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask1Canvas/mTask1NameTextBlock') as mw.TextBlock
		}
		return this.mTask1NameTextBlock_Internal
	}
	private mAward1NameTextBlock_Internal: mw.TextBlock
	public get mAward1NameTextBlock(): mw.TextBlock {
		if(!this.mAward1NameTextBlock_Internal&&this.uiWidgetBase) {
			this.mAward1NameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask1Canvas/mAward1NameTextBlock') as mw.TextBlock
		}
		return this.mAward1NameTextBlock_Internal
	}
	private mGetButton_Internal: mw.Button
	public get mGetButton(): mw.Button {
		if(!this.mGetButton_Internal&&this.uiWidgetBase) {
			this.mGetButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask1Canvas/mGetButton') as mw.Button
		}
		return this.mGetButton_Internal
	}
	private mGetTextBlock_Internal: mw.TextBlock
	public get mGetTextBlock(): mw.TextBlock {
		if(!this.mGetTextBlock_Internal&&this.uiWidgetBase) {
			this.mGetTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask1Canvas/mGetButton/mGetTextBlock') as mw.TextBlock
		}
		return this.mGetTextBlock_Internal
	}
	private mTask2Canvas_Internal: mw.Canvas
	public get mTask2Canvas(): mw.Canvas {
		if(!this.mTask2Canvas_Internal&&this.uiWidgetBase) {
			this.mTask2Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask2Canvas') as mw.Canvas
		}
		return this.mTask2Canvas_Internal
	}
	private mTask2IconImage_Internal: mw.Image
	public get mTask2IconImage(): mw.Image {
		if(!this.mTask2IconImage_Internal&&this.uiWidgetBase) {
			this.mTask2IconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask2Canvas/mTask2IconImage') as mw.Image
		}
		return this.mTask2IconImage_Internal
	}
	private mAward2NameTextBlock_Internal: mw.TextBlock
	public get mAward2NameTextBlock(): mw.TextBlock {
		if(!this.mAward2NameTextBlock_Internal&&this.uiWidgetBase) {
			this.mAward2NameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTaskCanvas/mTask2Canvas/mAward2NameTextBlock') as mw.TextBlock
		}
		return this.mAward2NameTextBlock_Internal
	}
	private mImg_Jump_BG_Internal: mw.Image
	public get mImg_Jump_BG(): mw.Image {
		if(!this.mImg_Jump_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Jump_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Jump_BG') as mw.Image
		}
		return this.mImg_Jump_BG_Internal
	}
	private mBtn_Jump_Internal: mw.StaleButton
	public get mBtn_Jump(): mw.StaleButton {
		if(!this.mBtn_Jump_Internal&&this.uiWidgetBase) {
			this.mBtn_Jump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Jump') as mw.StaleButton
		}
		return this.mBtn_Jump_Internal
	}
	private mCanvas_AD_Internal: mw.Canvas
	public get mCanvas_AD(): mw.Canvas {
		if(!this.mCanvas_AD_Internal&&this.uiWidgetBase) {
			this.mCanvas_AD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_AD') as mw.Canvas
		}
		return this.mCanvas_AD_Internal
	}
	private mImage_RedPoint_Internal: mw.Image
	public get mImage_RedPoint(): mw.Image {
		if(!this.mImage_RedPoint_Internal&&this.uiWidgetBase) {
			this.mImage_RedPoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_AD/mImage_RedPoint') as mw.Image
		}
		return this.mImage_RedPoint_Internal
	}
	private mBtn_AD_Internal: mw.StaleButton
	public get mBtn_AD(): mw.StaleButton {
		if(!this.mBtn_AD_Internal&&this.uiWidgetBase) {
			this.mBtn_AD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_AD/mBtn_AD') as mw.StaleButton
		}
		return this.mBtn_AD_Internal
	}
	private mUIText20030_txt_Internal: mw.TextBlock
	public get mUIText20030_txt(): mw.TextBlock {
		if(!this.mUIText20030_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20030_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_AD/mUIText20030_txt') as mw.TextBlock
		}
		return this.mUIText20030_txt_Internal
	}
	private mCanvas_Member_Internal: mw.Canvas
	public get mCanvas_Member(): mw.Canvas {
		if(!this.mCanvas_Member_Internal&&this.uiWidgetBase) {
			this.mCanvas_Member_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Member') as mw.Canvas
		}
		return this.mCanvas_Member_Internal
	}
	private mBtn_Member_Internal: mw.StaleButton
	public get mBtn_Member(): mw.StaleButton {
		if(!this.mBtn_Member_Internal&&this.uiWidgetBase) {
			this.mBtn_Member_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Member/mBtn_Member') as mw.StaleButton
		}
		return this.mBtn_Member_Internal
	}
	private mText_Member_Internal: mw.TextBlock
	public get mText_Member(): mw.TextBlock {
		if(!this.mText_Member_Internal&&this.uiWidgetBase) {
			this.mText_Member_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Member/mText_Member') as mw.TextBlock
		}
		return this.mText_Member_Internal
	}
	private mCanvas_Set_Internal: mw.Canvas
	public get mCanvas_Set(): mw.Canvas {
		if(!this.mCanvas_Set_Internal&&this.uiWidgetBase) {
			this.mCanvas_Set_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Set') as mw.Canvas
		}
		return this.mCanvas_Set_Internal
	}
	private mBtn_Set_Internal: mw.StaleButton
	public get mBtn_Set(): mw.StaleButton {
		if(!this.mBtn_Set_Internal&&this.uiWidgetBase) {
			this.mBtn_Set_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Set/mBtn_Set') as mw.StaleButton
		}
		return this.mBtn_Set_Internal
	}
	private mText_Set_Internal: mw.TextBlock
	public get mText_Set(): mw.TextBlock {
		if(!this.mText_Set_Internal&&this.uiWidgetBase) {
			this.mText_Set_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Set/mText_Set') as mw.TextBlock
		}
		return this.mText_Set_Internal
	}
	private mCanvas_Ark_Internal: mw.Canvas
	public get mCanvas_Ark(): mw.Canvas {
		if(!this.mCanvas_Ark_Internal&&this.uiWidgetBase) {
			this.mCanvas_Ark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Ark') as mw.Canvas
		}
		return this.mCanvas_Ark_Internal
	}
	private mBtn_Ark_Internal: mw.StaleButton
	public get mBtn_Ark(): mw.StaleButton {
		if(!this.mBtn_Ark_Internal&&this.uiWidgetBase) {
			this.mBtn_Ark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Ark/mBtn_Ark') as mw.StaleButton
		}
		return this.mBtn_Ark_Internal
	}
	private mText_Ark_Internal: mw.TextBlock
	public get mText_Ark(): mw.TextBlock {
		if(!this.mText_Ark_Internal&&this.uiWidgetBase) {
			this.mText_Ark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Ark/mText_Ark') as mw.TextBlock
		}
		return this.mText_Ark_Internal
	}
	private mCanvas_Avatar_Internal: mw.Canvas
	public get mCanvas_Avatar(): mw.Canvas {
		if(!this.mCanvas_Avatar_Internal&&this.uiWidgetBase) {
			this.mCanvas_Avatar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Avatar') as mw.Canvas
		}
		return this.mCanvas_Avatar_Internal
	}
	private mBtn_Avatar_Internal: mw.StaleButton
	public get mBtn_Avatar(): mw.StaleButton {
		if(!this.mBtn_Avatar_Internal&&this.uiWidgetBase) {
			this.mBtn_Avatar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Avatar/mBtn_Avatar') as mw.StaleButton
		}
		return this.mBtn_Avatar_Internal
	}
	private mText_Avatar_Internal: mw.TextBlock
	public get mText_Avatar(): mw.TextBlock {
		if(!this.mText_Avatar_Internal&&this.uiWidgetBase) {
			this.mText_Avatar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Avatar/mText_Avatar') as mw.TextBlock
		}
		return this.mText_Avatar_Internal
	}
	private mCanvas_Exchange_Internal: mw.Canvas
	public get mCanvas_Exchange(): mw.Canvas {
		if(!this.mCanvas_Exchange_Internal&&this.uiWidgetBase) {
			this.mCanvas_Exchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange') as mw.Canvas
		}
		return this.mCanvas_Exchange_Internal
	}
	private mBtn_Exchange_Internal: mw.StaleButton
	public get mBtn_Exchange(): mw.StaleButton {
		if(!this.mBtn_Exchange_Internal&&this.uiWidgetBase) {
			this.mBtn_Exchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mBtn_Exchange') as mw.StaleButton
		}
		return this.mBtn_Exchange_Internal
	}
	private mText_Exchange_Internal: mw.TextBlock
	public get mText_Exchange(): mw.TextBlock {
		if(!this.mText_Exchange_Internal&&this.uiWidgetBase) {
			this.mText_Exchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mText_Exchange') as mw.TextBlock
		}
		return this.mText_Exchange_Internal
	}
	private mCanvas_Shop_Internal: mw.Canvas
	public get mCanvas_Shop(): mw.Canvas {
		if(!this.mCanvas_Shop_Internal&&this.uiWidgetBase) {
			this.mCanvas_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop') as mw.Canvas
		}
		return this.mCanvas_Shop_Internal
	}
	private mBtn_Shop_Internal: mw.StaleButton
	public get mBtn_Shop(): mw.StaleButton {
		if(!this.mBtn_Shop_Internal&&this.uiWidgetBase) {
			this.mBtn_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mBtn_Shop') as mw.StaleButton
		}
		return this.mBtn_Shop_Internal
	}
	private mUIText20009_txt_Internal: mw.TextBlock
	public get mUIText20009_txt(): mw.TextBlock {
		if(!this.mUIText20009_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20009_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mUIText20009_txt') as mw.TextBlock
		}
		return this.mUIText20009_txt_Internal
	}
	private mCanvas_lottery_Internal: mw.Canvas
	public get mCanvas_lottery(): mw.Canvas {
		if(!this.mCanvas_lottery_Internal&&this.uiWidgetBase) {
			this.mCanvas_lottery_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery') as mw.Canvas
		}
		return this.mCanvas_lottery_Internal
	}
	private mBtn_lottery_Internal: mw.Button
	public get mBtn_lottery(): mw.Button {
		if(!this.mBtn_lottery_Internal&&this.uiWidgetBase) {
			this.mBtn_lottery_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery/mBtn_lottery') as mw.Button
		}
		return this.mBtn_lottery_Internal
	}
	private mUIText_Internal: mw.TextBlock
	public get mUIText(): mw.TextBlock {
		if(!this.mUIText_Internal&&this.uiWidgetBase) {
			this.mUIText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery/mUIText') as mw.TextBlock
		}
		return this.mUIText_Internal
	}
	private mCanvas_Skill_Internal: mw.Canvas
	public get mCanvas_Skill(): mw.Canvas {
		if(!this.mCanvas_Skill_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill') as mw.Canvas
		}
		return this.mCanvas_Skill_Internal
	}
	private mBtn_Skill_Internal: mw.StaleButton
	public get mBtn_Skill(): mw.StaleButton {
		if(!this.mBtn_Skill_Internal&&this.uiWidgetBase) {
			this.mBtn_Skill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mBtn_Skill') as mw.StaleButton
		}
		return this.mBtn_Skill_Internal
	}
	private mText_Skill_Internal: mw.TextBlock
	public get mText_Skill(): mw.TextBlock {
		if(!this.mText_Skill_Internal&&this.uiWidgetBase) {
			this.mText_Skill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mText_Skill') as mw.TextBlock
		}
		return this.mText_Skill_Internal
	}
	private mCanvas_Watch_Internal: mw.Canvas
	public get mCanvas_Watch(): mw.Canvas {
		if(!this.mCanvas_Watch_Internal&&this.uiWidgetBase) {
			this.mCanvas_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch') as mw.Canvas
		}
		return this.mCanvas_Watch_Internal
	}
	private mBtn_Watch_Internal: mw.StaleButton
	public get mBtn_Watch(): mw.StaleButton {
		if(!this.mBtn_Watch_Internal&&this.uiWidgetBase) {
			this.mBtn_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mBtn_Watch') as mw.StaleButton
		}
		return this.mBtn_Watch_Internal
	}
	private mText_Watch_Internal: mw.TextBlock
	public get mText_Watch(): mw.TextBlock {
		if(!this.mText_Watch_Internal&&this.uiWidgetBase) {
			this.mText_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mText_Watch') as mw.TextBlock
		}
		return this.mText_Watch_Internal
	}
	private mCanvas_CountDown_Internal: mw.Canvas
	public get mCanvas_CountDown(): mw.Canvas {
		if(!this.mCanvas_CountDown_Internal&&this.uiWidgetBase) {
			this.mCanvas_CountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown') as mw.Canvas
		}
		return this.mCanvas_CountDown_Internal
	}
	private mImg_CountBG_Internal: mw.Image
	public get mImg_CountBG(): mw.Image {
		if(!this.mImg_CountBG_Internal&&this.uiWidgetBase) {
			this.mImg_CountBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown/mImg_CountBG') as mw.Image
		}
		return this.mImg_CountBG_Internal
	}
	private mText_CountExplain_Internal: mw.TextBlock
	public get mText_CountExplain(): mw.TextBlock {
		if(!this.mText_CountExplain_Internal&&this.uiWidgetBase) {
			this.mText_CountExplain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown/mText_CountExplain') as mw.TextBlock
		}
		return this.mText_CountExplain_Internal
	}
	private mText_CountDown_Internal: mw.TextBlock
	public get mText_CountDown(): mw.TextBlock {
		if(!this.mText_CountDown_Internal&&this.uiWidgetBase) {
			this.mText_CountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown/mText_CountDown') as mw.TextBlock
		}
		return this.mText_CountDown_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Jump.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Jump");
		});
		this.initLanguage(this.mBtn_Jump);
		this.mBtn_Jump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_AD.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_AD");
		});
		this.initLanguage(this.mBtn_AD);
		this.mBtn_AD.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Member.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Member");
		});
		this.initLanguage(this.mBtn_Member);
		this.mBtn_Member.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Set.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Set");
		});
		this.initLanguage(this.mBtn_Set);
		this.mBtn_Set.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Ark.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Ark");
		});
		this.initLanguage(this.mBtn_Ark);
		this.mBtn_Ark.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Avatar.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Avatar");
		});
		this.initLanguage(this.mBtn_Avatar);
		this.mBtn_Avatar.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Exchange.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Exchange");
		});
		this.initLanguage(this.mBtn_Exchange);
		this.mBtn_Exchange.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Shop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Shop");
		});
		this.initLanguage(this.mBtn_Shop);
		this.mBtn_Shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Skill.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Skill");
		});
		this.initLanguage(this.mBtn_Skill);
		this.mBtn_Skill.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Watch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Watch");
		});
		this.initLanguage(this.mBtn_Watch);
		this.mBtn_Watch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mAddCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
		});
		this.mAddCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddAdsButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddAdsButton");
		});
		this.mAddAdsButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mGetButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mGetButton");
		});
		this.mGetButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_lottery.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_lottery");
		});
		this.mBtn_lottery.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_PlayerName)
		
	
		this.initLanguage(this.mText_CoinsNumber)
		
	
		this.initLanguage(this.mText_DiamondNumber)
		
	
		this.initLanguage(this.mTask1NameTextBlock)
		
	
		this.initLanguage(this.mAward1NameTextBlock)
		
	
		this.initLanguage(this.mGetTextBlock)
		
	
		this.initLanguage(this.mAward2NameTextBlock)
		
	
		this.initLanguage(this.mUIText20030_txt)
		
	
		this.initLanguage(this.mText_Member)
		
	
		this.initLanguage(this.mText_Set)
		
	
		this.initLanguage(this.mText_Ark)
		
	
		this.initLanguage(this.mText_Avatar)
		
	
		this.initLanguage(this.mText_Exchange)
		
	
		this.initLanguage(this.mUIText20009_txt)
		
	
		this.initLanguage(this.mUIText)
		
	
		this.initLanguage(this.mText_Skill)
		
	
		this.initLanguage(this.mText_Watch)
		
	
		this.initLanguage(this.mText_CountExplain)
		
	
		this.initLanguage(this.mText_CountDown)
		
	
		//文本多语言
		
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
 