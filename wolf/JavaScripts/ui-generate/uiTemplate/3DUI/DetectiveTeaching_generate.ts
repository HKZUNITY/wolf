
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 就要按
 * UI: UI/uiTemplate/3DUI/DetectiveTeaching.ui
 * TIME: 2023.07.27-15.47.30
 */

 

 @UIBind('UI/uiTemplate/3DUI/DetectiveTeaching.ui')
 export default class DetectiveTeaching_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mText_Content')
    public mText_Content: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Pic')
    public mCanvas_Pic: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Pic/Canvas_1/mText_1')
    public mText_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Pic/Canvas_2/mText_2')
    public mText_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Pic/Canvas_3/mText_3')
    public mText_3: mw.TextBlock=undefined;
    

 
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
		
	
		this.initLanguage(this.mText_1)
		
	
		this.initLanguage(this.mText_2)
		
	
		this.initLanguage(this.mText_3)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 