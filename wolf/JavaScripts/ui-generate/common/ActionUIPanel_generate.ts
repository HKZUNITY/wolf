/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/common/ActionUIPanel.ui
 * TIME: 2025.02.27-19.44.53
 */
 
@UIBind('UI/common/ActionUIPanel.ui')
export default class ActionUIPanel_Generate extends UIScript {
		private mStaleButton_Internal: mw.StaleButton
	public get mStaleButton(): mw.StaleButton {
		if(!this.mStaleButton_Internal&&this.uiWidgetBase) {
			this.mStaleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mStaleButton') as mw.StaleButton
		}
		return this.mStaleButton_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mStaleButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mStaleButton");
		});
		this.initLanguage(this.mStaleButton);
		this.mStaleButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 