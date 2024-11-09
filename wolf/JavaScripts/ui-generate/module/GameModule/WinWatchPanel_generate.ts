/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/WinWatchPanel.ui
 * TIME: 2024.11.10-00.23.21
 */
 
@UIBind('UI/module/GameModule/WinWatchPanel.ui')
export default class WinWatchPanel_Generate extends UIScript {
		private mCanvas_WinWatch_Internal: mw.Canvas
	public get mCanvas_WinWatch(): mw.Canvas {
		if(!this.mCanvas_WinWatch_Internal&&this.uiWidgetBase) {
			this.mCanvas_WinWatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_WinWatch') as mw.Canvas
		}
		return this.mCanvas_WinWatch_Internal
	}
	private mText_WinWatch_1_Internal: mw.TextBlock
	public get mText_WinWatch_1(): mw.TextBlock {
		if(!this.mText_WinWatch_1_Internal&&this.uiWidgetBase) {
			this.mText_WinWatch_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_WinWatch/mText_WinWatch_1') as mw.TextBlock
		}
		return this.mText_WinWatch_1_Internal
	}
	private mText_WinWatch_2_Internal: mw.TextBlock
	public get mText_WinWatch_2(): mw.TextBlock {
		if(!this.mText_WinWatch_2_Internal&&this.uiWidgetBase) {
			this.mText_WinWatch_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_WinWatch/mText_WinWatch_2') as mw.TextBlock
		}
		return this.mText_WinWatch_2_Internal
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
		
		this.initLanguage(this.mText_WinWatch_1)
		
	
		this.initLanguage(this.mText_WinWatch_2)
		
	
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
 