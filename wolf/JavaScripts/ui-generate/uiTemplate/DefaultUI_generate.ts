﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/DefaultUI.ui
 * TIME: 2023.08.01-15.33.49
 */

 

 @UIBind('UI/uiTemplate/DefaultUI.ui')
 export default class DefaultUI_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mMWVirtualJoystickPanelDesigner')
    public mMWVirtualJoystickPanelDesigner: mw.VirtualJoystickPanel=undefined;
    @UIWidgetBind('RootCanvas/mMWTouchPadDesigner')
    public mMWTouchPadDesigner: mw.TouchPad=undefined;
    

 
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
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 