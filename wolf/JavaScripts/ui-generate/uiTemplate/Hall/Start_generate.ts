
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/Start.ui
 * TIME: 2023.08.01-15.33.52
 */

 

 @UIBind('UI/uiTemplate/Hall/Start.ui')
 export default class Start_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mBtn_Start')
    public mBtn_Start: mw.StaleButton=undefined;
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
		
		this.mBtn_Start.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Start");
		})
		this.initLanguage(this.mBtn_Start);
		this.mBtn_Start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
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
 