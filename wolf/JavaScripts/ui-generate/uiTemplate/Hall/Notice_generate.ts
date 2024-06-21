
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/Notice.ui
 * TIME: 2023.08.01-15.33.52
 */

 

 @UIBind('UI/uiTemplate/Hall/Notice.ui')
 export default class Notice_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mText_Content')
    public mText_Content: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Close')
    public mBtn_Close: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mBtn_JumpTo')
    public mBtn_JumpTo: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon')
    public mCanvas_Icon: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_JumpTo.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_JumpTo");
		})
		this.initLanguage(this.mBtn_JumpTo);
		this.mBtn_JumpTo.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Content)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 