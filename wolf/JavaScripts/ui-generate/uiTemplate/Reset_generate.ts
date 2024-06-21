
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Reset.ui
 * TIME: 2023.08.01-15.33.49
 */

 

 @UIBind('UI/uiTemplate/Reset.ui')
 export default class Reset_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/Canvas/mBtn_Reset')
    public mBtn_Reset: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/Canvas/mText_Reset')
    public mText_Reset: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_Reset.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Reset");
		})
		this.mBtn_Reset.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Reset)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 