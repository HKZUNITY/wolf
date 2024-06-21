
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Inside/Ready.ui
 * TIME: 2023.08.01-15.33.53
 */

 

 @UIBind('UI/uiTemplate/Inside/Ready.ui')
 export default class Ready_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_EndPos')
    public mCanvas_EndPos: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Ready/mText_Ready')
    public mText_Ready: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Ready/mText_Time')
    public mText_Time: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Ready')
    public mCanvas_Ready: mw.Canvas=undefined;
    

 
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
		
		this.initLanguage(this.mText_Ready)
		
	
		this.initLanguage(this.mText_Time)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 