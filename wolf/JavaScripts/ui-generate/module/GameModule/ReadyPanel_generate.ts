/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/ReadyPanel.ui
 * TIME: 2025.01.20-21.54.30
 */
 
@UIBind('UI/module/GameModule/ReadyPanel.ui')
export default class ReadyPanel_Generate extends UIScript {
		private mCanvas_EndPos_Internal: mw.Canvas
	public get mCanvas_EndPos(): mw.Canvas {
		if(!this.mCanvas_EndPos_Internal&&this.uiWidgetBase) {
			this.mCanvas_EndPos_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_EndPos') as mw.Canvas
		}
		return this.mCanvas_EndPos_Internal
	}
	private mText_Ready_Internal: mw.TextBlock
	public get mText_Ready(): mw.TextBlock {
		if(!this.mText_Ready_Internal&&this.uiWidgetBase) {
			this.mText_Ready_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Ready/mText_Ready') as mw.TextBlock
		}
		return this.mText_Ready_Internal
	}
	private mText_Time_Internal: mw.TextBlock
	public get mText_Time(): mw.TextBlock {
		if(!this.mText_Time_Internal&&this.uiWidgetBase) {
			this.mText_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Ready/mText_Time') as mw.TextBlock
		}
		return this.mText_Time_Internal
	}
	private mCanvas_Ready_Internal: mw.Canvas
	public get mCanvas_Ready(): mw.Canvas {
		if(!this.mCanvas_Ready_Internal&&this.uiWidgetBase) {
			this.mCanvas_Ready_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Ready') as mw.Canvas
		}
		return this.mCanvas_Ready_Internal
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
		
		this.initLanguage(this.mText_Ready)
		
	
		this.initLanguage(this.mText_Time)
		
	
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
 