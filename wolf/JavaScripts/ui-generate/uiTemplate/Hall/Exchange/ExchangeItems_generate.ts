
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/Exchange/ExchangeItems.ui
 * TIME: 2023.07.28-14.40.30
 */

 

 @UIBind('UI/uiTemplate/Hall/Exchange/ExchangeItems.ui')
 export default class ExchangeItems_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem')
    public mCanvas_ExchangeItem: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon')
    public mCanvas_Icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon/mImg_Icon')
    public mImg_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon/mText_Name')
    public mText_Name: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon/mText_Num')
    public mText_Num: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange')
    public mCanvas_Exchange: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mBtn_Exchange')
    public mBtn_Exchange: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips')
    public mCanvas_Tips: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips/mText_Tip_1')
    public mText_Tip_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips/mImg_AdCoupon')
    public mImg_AdCoupon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips/mText_Tip_2')
    public mText_Tip_2: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Exchange.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Exchange");
		})
		this.initLanguage(this.mBtn_Exchange);
		this.mBtn_Exchange.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Num)
		
	
		this.initLanguage(this.mText_Tip_1)
		
	
		this.initLanguage(this.mText_Tip_2)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 