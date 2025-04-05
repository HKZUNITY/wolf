/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/common/NoticePanel.ui
 * TIME: 2025.04.05-16.17.25
 */
 
@UIBind('UI/common/NoticePanel.ui')
export default class NoticePanel_Generate extends UIScript {
		private mText_Content_Internal: mw.TextBlock
	public get mText_Content(): mw.TextBlock {
		if(!this.mText_Content_Internal&&this.uiWidgetBase) {
			this.mText_Content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Content') as mw.TextBlock
		}
		return this.mText_Content_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mBtn_JumpTo_Internal: mw.StaleButton
	public get mBtn_JumpTo(): mw.StaleButton {
		if(!this.mBtn_JumpTo_Internal&&this.uiWidgetBase) {
			this.mBtn_JumpTo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_JumpTo') as mw.StaleButton
		}
		return this.mBtn_JumpTo_Internal
	}
	private mCanvas_Icon_Internal: mw.Canvas
	public get mCanvas_Icon(): mw.Canvas {
		if(!this.mCanvas_Icon_Internal&&this.uiWidgetBase) {
			this.mCanvas_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Icon') as mw.Canvas
		}
		return this.mCanvas_Icon_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_JumpTo.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_JumpTo");
		});
		this.initLanguage(this.mBtn_JumpTo);
		this.mBtn_JumpTo.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		});
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Content)
		
	
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
 