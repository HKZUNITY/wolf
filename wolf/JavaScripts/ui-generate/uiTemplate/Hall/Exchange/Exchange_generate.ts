
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/Exchange/Exchange.ui
 * TIME: 2023.08.02-17.06.53
 */

 

 @UIBind('UI/uiTemplate/Hall/Exchange/Exchange.ui')
 export default class Exchange_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Exchange')
    public mCanvas_Exchange: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mBtn_Close')
    public mBtn_Close: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mScrollBox/mCanvas_Content')
    public mCanvas_Content: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon')
    public cCanvas_AdCoupon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mImage_AdCouponBG')
    public mImage_AdCouponBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mImage_AdCouponFrame')
    public mImage_AdCouponFrame: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mImage_AdCouponIcon')
    public mImage_AdCouponIcon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mText_AdCouponNumber')
    public mText_AdCouponNumber: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_AdCouponNumber)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 