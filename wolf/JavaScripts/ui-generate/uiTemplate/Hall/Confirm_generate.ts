
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/Confirm.ui
 * TIME: 2023.07.26-16.32.33
 */

 

 @UIBind('UI/uiTemplate/Hall/Confirm.ui')
 export default class Confirm_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Confirm')
    public mCanvas_Confirm: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Tip')
    public mCanvas_Tip: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Tip/mText_Tip_1')
    public mText_Tip_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Tip/mText_Tip_2')
    public mText_Tip_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Tip/mText_Tip_3')
    public mText_Tip_3: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mBtn_Cancel')
    public mBtn_Cancel: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mBtn_Buy')
    public mBtn_Buy: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Content')
    public mCanvas_Content: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Content/mImg_Icon')
    public mImg_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Content/mText_Name')
    public mText_Name: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Content/mCanvas_Price')
    public mCanvas_Price: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Content/mCanvas_Price/mText_Price')
    public mText_Price: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Confirm/mCanvas_Content/mCanvas_Price/mImg_Price')
    public mImg_Price: mw.Image=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Cancel.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Cancel");
		})
		this.initLanguage(this.mBtn_Cancel);
		this.mBtn_Cancel.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		})
		this.initLanguage(this.mBtn_Buy);
		this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Tip_1)
		
	
		this.initLanguage(this.mText_Tip_2)
		
	
		this.initLanguage(this.mText_Tip_3)
		
	
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Price)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 