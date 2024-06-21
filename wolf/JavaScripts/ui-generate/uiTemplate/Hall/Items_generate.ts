
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/Items.ui
 * TIME: 2023.08.02-17.56.17
 */

 

 @UIBind('UI/uiTemplate/Hall/Items.ui')
 export default class Items_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Items')
    public mCanvas_Items: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Items/mBtn_Items')
    public mBtn_Items: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Items/mImage_BG')
    public mImage_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Items/mImage_Items')
    public mImage_Items: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Items/mText_Items')
    public mText_Items: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Items/mText_ItemsPrice')
    public mText_ItemsPrice: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Items/mImage_Lock')
    public mImage_Lock: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Items/mImage_Using')
    public mImage_Using: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_Coin')
    public mCanvas_Price_Coin: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_Coin/mImage_Price_Coin')
    public mImage_Price_Coin: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_Diamond')
    public mCanvas_Price_Diamond: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_Diamond/mImage_Price_Diamond')
    public mImage_Price_Diamond: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_AdCoupon')
    public mCanvas_Price_AdCoupon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_AdCoupon/mImage_Price_AdCoupon')
    public mImage_Price_AdCoupon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_L')
    public mCanvas_Price_L: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price_L/mTextBlock')
    public mTextBlock: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Items.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Items");
		})
		this.initLanguage(this.mBtn_Items);
		this.mBtn_Items.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Items)
		
	
		this.initLanguage(this.mText_ItemsPrice)
		
	
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 