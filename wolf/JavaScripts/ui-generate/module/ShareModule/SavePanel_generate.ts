/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShareModule/SavePanel.ui
 * TIME: 2025.01.20-21.54.30
 */
 
@UIBind('UI/module/ShareModule/SavePanel.ui')
export default class SavePanel_Generate extends UIScript {
		private mSaveButton_Internal: mw.Button
	public get mSaveButton(): mw.Button {
		if(!this.mSaveButton_Internal&&this.uiWidgetBase) {
			this.mSaveButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSaveButton') as mw.Button
		}
		return this.mSaveButton_Internal
	}
	private mSaveTipsTextBlock_Internal: mw.TextBlock
	public get mSaveTipsTextBlock(): mw.TextBlock {
		if(!this.mSaveTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mSaveTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSaveButton/mSaveTipsTextBlock') as mw.TextBlock
		}
		return this.mSaveTipsTextBlock_Internal
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
		
		this.mSaveButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSaveButton");
		});
		this.mSaveButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mSaveTipsTextBlock)
		
	
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
 