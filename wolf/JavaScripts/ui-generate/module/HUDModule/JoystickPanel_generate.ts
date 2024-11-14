/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/HUDModule/JoystickPanel.ui
 * TIME: 2024.11.13-22.47.32
 */
 
@UIBind('UI/module/HUDModule/JoystickPanel.ui')
export default class JoystickPanel_Generate extends UIScript {
		private mMWVirtualJoystickPanelDesigner_Internal: mw.VirtualJoystickPanel
	public get mMWVirtualJoystickPanelDesigner(): mw.VirtualJoystickPanel {
		if(!this.mMWVirtualJoystickPanelDesigner_Internal&&this.uiWidgetBase) {
			this.mMWVirtualJoystickPanelDesigner_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMWVirtualJoystickPanelDesigner') as mw.VirtualJoystickPanel
		}
		return this.mMWVirtualJoystickPanelDesigner_Internal
	}
	private mMWTouchPadDesigner_Internal: mw.TouchPad
	public get mMWTouchPadDesigner(): mw.TouchPad {
		if(!this.mMWTouchPadDesigner_Internal&&this.uiWidgetBase) {
			this.mMWTouchPadDesigner_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMWTouchPadDesigner') as mw.TouchPad
		}
		return this.mMWTouchPadDesigner_Internal
	}


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
	
	/*初始化多语言*/
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

	/*显示panel*/
    public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	/*隐藏panel*/
    public hide(): void {
		mw.UIService.hideUI(this);
	}
 }
 