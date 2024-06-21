
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Common/Tips.ui
 * TIME: 2023.08.01-15.33.53
 */

 

 @UIBind('UI/uiTemplate/Common/Tips.ui')
 export default class Tips_Generate extends mw.UIScript {
	 @UIWidgetBind('Canvas/mCell1')
    public mCell1: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/mCell2')
    public mCell2: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/mCell3')
    public mCell3: mw.Canvas=undefined;
    

 
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
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell1/Content_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell2/Content_txt") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell3/Content_txt") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 