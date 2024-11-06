/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/DanMuModule/ActionItem.ui
 * TIME: 2024.11.06-21.03.37
 */
 
@UIBind('UI/module/DanMuModule/ActionItem.ui')
export default class ActionItem_Generate extends UIScript {
		private mBgImage_Internal: mw.Image
	public get mBgImage(): mw.Image {
		if(!this.mBgImage_Internal&&this.uiWidgetBase) {
			this.mBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage') as mw.Image
		}
		return this.mBgImage_Internal
	}
	private mClickButton_Internal: mw.Button
	public get mClickButton(): mw.Button {
		if(!this.mClickButton_Internal&&this.uiWidgetBase) {
			this.mClickButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClickButton') as mw.Button
		}
		return this.mClickButton_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private nNameTextBlock_Internal: mw.TextBlock
	public get nNameTextBlock(): mw.TextBlock {
		if(!this.nNameTextBlock_Internal&&this.uiWidgetBase) {
			this.nNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/nNameTextBlock') as mw.TextBlock
		}
		return this.nNameTextBlock_Internal
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
		
		this.initLanguage(this.nNameTextBlock)
		
	
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
 