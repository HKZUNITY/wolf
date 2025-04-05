/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/DanMuModule/ActionTabItem.ui
 * TIME: 2025.04.05-16.17.26
 */
 
@UIBind('UI/module/DanMuModule/ActionTabItem.ui')
export default class ActionTabItem_Generate extends UIScript {
		private mClickButton_Internal: mw.Button
	public get mClickButton(): mw.Button {
		if(!this.mClickButton_Internal&&this.uiWidgetBase) {
			this.mClickButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClickButton') as mw.Button
		}
		return this.mClickButton_Internal
	}
	private mTabNameTextBlock_Internal: mw.TextBlock
	public get mTabNameTextBlock(): mw.TextBlock {
		if(!this.mTabNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mTabNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClickButton/mTabNameTextBlock') as mw.TextBlock
		}
		return this.mTabNameTextBlock_Internal
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
		
		this.mClickButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mClickButton");
		});
		this.mClickButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTabNameTextBlock)
		
	
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
 