/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/common/worldUI/AllTips.ui
 * TIME: 2025.04.05-16.17.26
 */
 
@UIBind('UI/common/worldUI/AllTips.ui')
export default class AllTips_Generate extends UIScript {
		private mText_Content_Internal: mw.TextBlock
	public get mText_Content(): mw.TextBlock {
		if(!this.mText_Content_Internal&&this.uiWidgetBase) {
			this.mText_Content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Content') as mw.TextBlock
		}
		return this.mText_Content_Internal
	}
	private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
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
		
		this.initLanguage(this.mText_Content)
		
	
		this.initLanguage(this.mText_Title)
		
	
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
 