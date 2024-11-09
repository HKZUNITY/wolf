/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/AllotPanel.ui
 * TIME: 2024.11.09-14.30.16
 */
 
@UIBind('UI/module/GameModule/AllotPanel.ui')
export default class AllotPanel_Generate extends UIScript {
		private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mText_Explain_Internal: mw.TextBlock
	public get mText_Explain(): mw.TextBlock {
		if(!this.mText_Explain_Internal&&this.uiWidgetBase) {
			this.mText_Explain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Explain') as mw.TextBlock
		}
		return this.mText_Explain_Internal
	}
	private mText_Member_Internal: mw.TextBlock
	public get mText_Member(): mw.TextBlock {
		if(!this.mText_Member_Internal&&this.uiWidgetBase) {
			this.mText_Member_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Member') as mw.TextBlock
		}
		return this.mText_Member_Internal
	}
	private mText_Detective_Internal: mw.TextBlock
	public get mText_Detective(): mw.TextBlock {
		if(!this.mText_Detective_Internal&&this.uiWidgetBase) {
			this.mText_Detective_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Identity/mText_Detective') as mw.TextBlock
		}
		return this.mText_Detective_Internal
	}
	private mText_Maffia_Internal: mw.TextBlock
	public get mText_Maffia(): mw.TextBlock {
		if(!this.mText_Maffia_Internal&&this.uiWidgetBase) {
			this.mText_Maffia_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Identity/mText_Maffia') as mw.TextBlock
		}
		return this.mText_Maffia_Internal
	}
	private mText_Civilian_Internal: mw.TextBlock
	public get mText_Civilian(): mw.TextBlock {
		if(!this.mText_Civilian_Internal&&this.uiWidgetBase) {
			this.mText_Civilian_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Identity/mText_Civilian') as mw.TextBlock
		}
		return this.mText_Civilian_Internal
	}
	private mText_ProbNumber_Internal: mw.TextBlock
	public get mText_ProbNumber(): mw.TextBlock {
		if(!this.mText_ProbNumber_Internal&&this.uiWidgetBase) {
			this.mText_ProbNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Prob/mText_ProbNumber') as mw.TextBlock
		}
		return this.mText_ProbNumber_Internal
	}
	private mText_Prob_Internal: mw.TextBlock
	public get mText_Prob(): mw.TextBlock {
		if(!this.mText_Prob_Internal&&this.uiWidgetBase) {
			this.mText_Prob_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Prob/mText_Prob') as mw.TextBlock
		}
		return this.mText_Prob_Internal
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
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Explain)
		
	
		this.initLanguage(this.mText_Member)
		
	
		this.initLanguage(this.mText_Detective)
		
	
		this.initLanguage(this.mText_Maffia)
		
	
		this.initLanguage(this.mText_Civilian)
		
	
		this.initLanguage(this.mText_ProbNumber)
		
	
		this.initLanguage(this.mText_Prob)
		
	
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
 