/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LoadingModule/LoadingPanel.ui
 * TIME: 2025.01.20-22.23.09
 */
 
@UIBind('UI/module/LoadingModule/LoadingPanel.ui')
export default class LoadingPanel_Generate extends UIScript {
		private mText_Loading_Internal: mw.TextBlock
	public get mText_Loading(): mw.TextBlock {
		if(!this.mText_Loading_Internal&&this.uiWidgetBase) {
			this.mText_Loading_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Loading') as mw.TextBlock
		}
		return this.mText_Loading_Internal
	}
	private mPro_Loading_Internal: mw.ProgressBar
	public get mPro_Loading(): mw.ProgressBar {
		if(!this.mPro_Loading_Internal&&this.uiWidgetBase) {
			this.mPro_Loading_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPro_Loading') as mw.ProgressBar
		}
		return this.mPro_Loading_Internal
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
		
		this.initLanguage(this.mText_Loading)
		
	
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
 