
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Common/MessageBox.ui
 * TIME: 2023.08.01-15.33.50
 */

 

 @UIBind('UI/uiTemplate/Common/MessageBox.ui')
 export default class MessageBox_Generate extends mw.UIScript {
	 @UIWidgetBind('Canvas/BodyCanvas/mTitle_txt')
    public mTitle_txt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/BodyCanvas/mContent_txt')
    public mContent_txt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/BodyCanvas/mYes_btn')
    public mYes_btn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/BodyCanvas/mNo_btn')
    public mNo_btn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/BodyCanvas/mOK_btn')
    public mOK_btn: mw.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mYes_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mYes_btn");
		})
		this.initLanguage(this.mYes_btn);
		this.mYes_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mNo_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mNo_btn");
		})
		this.initLanguage(this.mNo_btn);
		this.mNo_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOK_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOK_btn");
		})
		this.initLanguage(this.mOK_btn);
		this.mOK_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitle_txt)
		
	
		this.initLanguage(this.mContent_txt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 