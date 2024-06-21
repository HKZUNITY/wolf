
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/bubbleModule/BubbleUI.ui
 * TIME: 2023.08.01-15.33.50
 */

 

 @UIBind('UI/uiTemplate/bubbleModule/BubbleUI.ui')
 export default class BubbleUI_Generate extends mw.UIScript {
	 @UIWidgetBind('MWCanvas_2147482460/array')
    public array: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/border')
    public border: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/bg')
    public bg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/text')
    public text: mw.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.text)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 