
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Inside/Congratulation.ui
 * TIME: 2023.08.01-15.33.53
 */

 

 @UIBind('UI/uiTemplate/Inside/Congratulation.ui')
 export default class Congratulation_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Win/mImg_Win')
    public mImg_Win: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Win/mText_Win')
    public mText_Win: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Win')
    public mCanvas_Win: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Lose/mImg_Lose')
    public mImg_Lose: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Lose/mText_Lose')
    public mText_Lose: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Lose')
    public mCanvas_Lose: mw.Canvas=undefined;
    

 
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
		
		this.initLanguage(this.mText_Win)
		
	
		this.initLanguage(this.mText_Lose)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 