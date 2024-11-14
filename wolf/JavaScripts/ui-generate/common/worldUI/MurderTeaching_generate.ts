/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/common/worldUI/MurderTeaching.ui
 * TIME: 2024.11.13-22.47.31
 */
 
@UIBind('UI/common/worldUI/MurderTeaching.ui')
export default class MurderTeaching_Generate extends UIScript {
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
	private mCanvas_Pic_Internal: mw.Canvas
	public get mCanvas_Pic(): mw.Canvas {
		if(!this.mCanvas_Pic_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pic') as mw.Canvas
		}
		return this.mCanvas_Pic_Internal
	}
	private mText_1_Internal: mw.TextBlock
	public get mText_1(): mw.TextBlock {
		if(!this.mText_1_Internal&&this.uiWidgetBase) {
			this.mText_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pic/Canvas_1/mText_1') as mw.TextBlock
		}
		return this.mText_1_Internal
	}
	private mText_2_Internal: mw.TextBlock
	public get mText_2(): mw.TextBlock {
		if(!this.mText_2_Internal&&this.uiWidgetBase) {
			this.mText_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pic/Canvas_2/mText_2') as mw.TextBlock
		}
		return this.mText_2_Internal
	}
	private mText_3_Internal: mw.TextBlock
	public get mText_3(): mw.TextBlock {
		if(!this.mText_3_Internal&&this.uiWidgetBase) {
			this.mText_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pic/Canvas_3/mText_3') as mw.TextBlock
		}
		return this.mText_3_Internal
	}
	private mText_4_Internal: mw.TextBlock
	public get mText_4(): mw.TextBlock {
		if(!this.mText_4_Internal&&this.uiWidgetBase) {
			this.mText_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pic/Canvas_4/mText_4') as mw.TextBlock
		}
		return this.mText_4_Internal
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
		
	
		this.initLanguage(this.mText_1)
		
	
		this.initLanguage(this.mText_2)
		
	
		this.initLanguage(this.mText_3)
		
	
		this.initLanguage(this.mText_4)
		
	
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
 