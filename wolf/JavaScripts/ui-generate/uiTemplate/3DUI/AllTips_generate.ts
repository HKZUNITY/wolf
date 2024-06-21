
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 就要按
 * UI: UI/uiTemplate/3DUI/AllTips.ui
 * TIME: 2023.07.27-15.47.30
 */

 

 @UIBind('UI/uiTemplate/3DUI/AllTips.ui')
 export default class AllTips_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mText_Content')
    public mText_Content: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Content)
		
	
		this.initLanguage(this.mText_Title)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 