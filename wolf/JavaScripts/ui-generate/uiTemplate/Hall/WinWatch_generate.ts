
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/WinWatch.ui
 * TIME: 2023.08.14-15.11.07
 */

 

 @UIBind('UI/uiTemplate/Hall/WinWatch.ui')
 export default class WinWatch_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_WinWatch')
    public mCanvas_WinWatch: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_WinWatch/mText_WinWatch_1')
    public mText_WinWatch_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_WinWatch/mText_WinWatch_2')
    public mText_WinWatch_2: mw.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.mText_WinWatch_1)
		
	
		this.initLanguage(this.mText_WinWatch_2)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 