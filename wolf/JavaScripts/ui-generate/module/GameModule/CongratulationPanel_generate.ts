/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/CongratulationPanel.ui
 * TIME: 2025.01.04-16.15.05
 */
 
@UIBind('UI/module/GameModule/CongratulationPanel.ui')
export default class CongratulationPanel_Generate extends UIScript {
		private mImg_Win_Internal: mw.Image
	public get mImg_Win(): mw.Image {
		if(!this.mImg_Win_Internal&&this.uiWidgetBase) {
			this.mImg_Win_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Win/mImg_Win') as mw.Image
		}
		return this.mImg_Win_Internal
	}
	private mText_Win_Internal: mw.TextBlock
	public get mText_Win(): mw.TextBlock {
		if(!this.mText_Win_Internal&&this.uiWidgetBase) {
			this.mText_Win_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Win/mText_Win') as mw.TextBlock
		}
		return this.mText_Win_Internal
	}
	private mCanvas_Win_Internal: mw.Canvas
	public get mCanvas_Win(): mw.Canvas {
		if(!this.mCanvas_Win_Internal&&this.uiWidgetBase) {
			this.mCanvas_Win_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Win') as mw.Canvas
		}
		return this.mCanvas_Win_Internal
	}
	private mImg_Lose_Internal: mw.Image
	public get mImg_Lose(): mw.Image {
		if(!this.mImg_Lose_Internal&&this.uiWidgetBase) {
			this.mImg_Lose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Lose/mImg_Lose') as mw.Image
		}
		return this.mImg_Lose_Internal
	}
	private mText_Lose_Internal: mw.TextBlock
	public get mText_Lose(): mw.TextBlock {
		if(!this.mText_Lose_Internal&&this.uiWidgetBase) {
			this.mText_Lose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Lose/mText_Lose') as mw.TextBlock
		}
		return this.mText_Lose_Internal
	}
	private mCanvas_Lose_Internal: mw.Canvas
	public get mCanvas_Lose(): mw.Canvas {
		if(!this.mCanvas_Lose_Internal&&this.uiWidgetBase) {
			this.mCanvas_Lose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Lose') as mw.Canvas
		}
		return this.mCanvas_Lose_Internal
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
		
		this.initLanguage(this.mText_Win)
		
	
		this.initLanguage(this.mText_Lose)
		
	
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
 