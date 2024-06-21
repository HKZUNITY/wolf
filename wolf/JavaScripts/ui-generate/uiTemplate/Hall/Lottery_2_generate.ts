
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/Lottery_2.ui
 * TIME: 2023.08.01-15.33.51
 */

 

 @UIBind('UI/uiTemplate/Hall/Lottery_2.ui')
 export default class Lottery_2_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_lottery0')
    public mCanvas_lottery0: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mBtn_Close_1')
    public mBtn_Close_1: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mScrollBox/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mImage_box')
    public mImage_box: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_Coin')
    public mCanvas_Coin: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_Coin/mTextBlock_CoinNum')
    public mTextBlock_CoinNum: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_lottery')
    public mCanvas_lottery: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_lottery/mButton_lottery')
    public mButton_lottery: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_lottery/mText_Price')
    public mText_Price: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_AD')
    public mCanvas_AD: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_AD/mMaskButton_AD')
    public mMaskButton_AD: mw.MaskButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_AD/mTextBlock_Time')
    public mTextBlock_Time: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_lotteryTimes')
    public mCanvas_lotteryTimes: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mCanvas_lotteryTimes/mText_lotteryTimes')
    public mText_lotteryTimes: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Gain')
    public mCanvas_Gain: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Gain/mImage_weapon')
    public mImage_weapon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Gain/mCanvas_first')
    public mCanvas_first: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Gain/mCanvas_first/mText_weaponName')
    public mText_weaponName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Gain/mCanvas_repeat')
    public mCanvas_repeat: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Gain/mCanvas_repeat/mText_CoinNum')
    public mText_CoinNum: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Close_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close_1");
		})
		this.initLanguage(this.mBtn_Close_1);
		this.mBtn_Close_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_lottery.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_lottery");
		})
		this.initLanguage(this.mButton_lottery);
		this.mButton_lottery.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_CoinNum)
		
	
		this.initLanguage(this.mText_Price)
		
	
		this.initLanguage(this.mTextBlock_Time)
		
	
		this.initLanguage(this.mText_lotteryTimes)
		
	
		this.initLanguage(this.mText_weaponName)
		
	
		this.initLanguage(this.mText_CoinNum)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_lottery0/mCanvas_AD/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_lottery0/mCanvas_AD/TextBlock_1_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_lottery0/mCanvas_lotteryTimes/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_lottery0/mCanvas_lotteryTimes/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Gain/mCanvas_first/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Gain/mCanvas_repeat/TextBlock_1") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 