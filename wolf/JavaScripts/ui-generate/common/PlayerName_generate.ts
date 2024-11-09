/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/common/PlayerName.ui
 * TIME: 2024.11.10-00.23.20
 */
 
@UIBind('UI/common/PlayerName.ui')
export default class PlayerName_Generate extends UIScript {
		private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private mText_name_Internal: mw.TextBlock
	public get mText_name(): mw.TextBlock {
		if(!this.mText_name_Internal&&this.uiWidgetBase) {
			this.mText_name_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mText_name') as mw.TextBlock
		}
		return this.mText_name_Internal
	}
	private mCanvas_Rank_1_Internal: mw.Canvas
	public get mCanvas_Rank_1(): mw.Canvas {
		if(!this.mCanvas_Rank_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Rank_1') as mw.Canvas
		}
		return this.mCanvas_Rank_1_Internal
	}
	private mImg_BG_1_Internal: mw.Image
	public get mImg_BG_1(): mw.Image {
		if(!this.mImg_BG_1_Internal&&this.uiWidgetBase) {
			this.mImg_BG_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Rank_1/mImg_BG_1') as mw.Image
		}
		return this.mImg_BG_1_Internal
	}
	private mText_Rank_1_Internal: mw.TextBlock
	public get mText_Rank_1(): mw.TextBlock {
		if(!this.mText_Rank_1_Internal&&this.uiWidgetBase) {
			this.mText_Rank_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mCanvas_Rank_1/mText_Rank_1') as mw.TextBlock
		}
		return this.mText_Rank_1_Internal
	}
	private mText_Countdown_Internal: mw.TextBlock
	public get mText_Countdown(): mw.TextBlock {
		if(!this.mText_Countdown_Internal&&this.uiWidgetBase) {
			this.mText_Countdown_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mText_Countdown') as mw.TextBlock
		}
		return this.mText_Countdown_Internal
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
		
		this.initLanguage(this.mText_name)
		
	
		this.initLanguage(this.mText_Rank_1)
		
	
		this.initLanguage(this.mText_Countdown)
		
	
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
 