
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/MainMenu.ui
 * TIME: 2023.08.14-15.11.06
 */

 

 @UIBind('UI/uiTemplate/Hall/MainMenu.ui')
 export default class MainMenu_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_PlayerInf')
    public mCanvas_PlayerInf: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerInf/mImg_HeadIcon')
    public mImg_HeadIcon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerInf/mText_PlayerName')
    public mText_PlayerName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerInf/mText_CoinsNumber')
    public mText_CoinsNumber: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerInf/mImg_CoinIcon')
    public mImg_CoinIcon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerInf/mImg_DiamondNumber')
    public mImg_DiamondNumber: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerInf/mText_DiamondNumber')
    public mText_DiamondNumber: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mImg_Jump_BG')
    public mImg_Jump_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Jump')
    public mBtn_Jump: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown')
    public mCanvas_CountDown: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown/mImg_CountBG')
    public mImg_CountBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown/mText_CountExplain')
    public mText_CountExplain: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown/mText_CountDown')
    public mText_CountDown: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_AD')
    public mCanvas_AD: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_AD/mBtn_AD')
    public mBtn_AD: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_AD/mUIText20030_txt')
    public mUIText20030_txt: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_AD/mImage_RedPoint')
    public mImage_RedPoint: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_AD/mText_ADTime')
    public mText_ADTime: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch')
    public mCanvas_Watch: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch/mText_Watch')
    public mText_Watch: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch/mBtn_Watch')
    public mBtn_Watch: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop')
    public mCanvas_Shop: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mBtn_Shop')
    public mBtn_Shop: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mUIText20009_txt')
    public mUIText20009_txt: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery')
    public mCanvas_lottery: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery/mBtn_lottery')
    public mBtn_lottery: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery/mUIText')
    public mUIText: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill')
    public mCanvas_Skill: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mText_Skill')
    public mText_Skill: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mBtn_Skill')
    public mBtn_Skill: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Member')
    public mCanvas_Member: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Member/mText_Member')
    public mText_Member: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Member/mBtn_Member')
    public mBtn_Member: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange')
    public mCanvas_Exchange: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mText_Exchange')
    public mText_Exchange: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mBtn_Exchange')
    public mBtn_Exchange: mw.StaleButton=undefined;
    

 
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
		})
		this.initLanguage(this.mBtn_Jump);
		this.mBtn_Jump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_AD.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_AD");
		})
		this.initLanguage(this.mBtn_AD);
		this.mBtn_AD.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Watch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Watch");
		})
		this.initLanguage(this.mBtn_Watch);
		this.mBtn_Watch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Shop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Shop");
		})
		this.initLanguage(this.mBtn_Shop);
		this.mBtn_Shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_lottery.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_lottery");
		})
		this.initLanguage(this.mBtn_lottery);
		this.mBtn_lottery.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Skill.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Skill");
		})
		this.initLanguage(this.mBtn_Skill);
		this.mBtn_Skill.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Member.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Member");
		})
		this.initLanguage(this.mBtn_Member);
		this.mBtn_Member.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Exchange.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Exchange");
		})
		this.initLanguage(this.mBtn_Exchange);
		this.mBtn_Exchange.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_PlayerName)
		
	
		this.initLanguage(this.mText_CoinsNumber)
		
	
		this.initLanguage(this.mText_DiamondNumber)
		
	
		this.initLanguage(this.mText_CountExplain)
		
	
		this.initLanguage(this.mText_CountDown)
		
	
		this.initLanguage(this.mUIText20030_txt)
		
	
		this.initLanguage(this.mText_ADTime)
		
	
		this.initLanguage(this.mText_Watch)
		
	
		this.initLanguage(this.mUIText20009_txt)
		
	
		this.initLanguage(this.mUIText)
		
	
		this.initLanguage(this.mText_Skill)
		
	
		this.initLanguage(this.mText_Member)
		
	
		this.initLanguage(this.mText_Exchange)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 