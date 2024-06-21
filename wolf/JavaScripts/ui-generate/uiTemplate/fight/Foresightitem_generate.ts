
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/fight/Foresightitem.ui
 * TIME: 2023.08.01-15.33.50
 */

 

 @UIBind('UI/uiTemplate/fight/Foresightitem.ui')
 export default class Foresightitem_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mStaleButton_1')
    public mStaleButton_1: mw.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mStaleButton_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mStaleButton_1");
		})
		this.initLanguage(this.mStaleButton_1);
		this.mStaleButton_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 