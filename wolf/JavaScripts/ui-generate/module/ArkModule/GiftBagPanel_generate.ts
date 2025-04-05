/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ArkModule/GiftBagPanel.ui
 * TIME: 2025.04.05-16.17.26
 */
 
@UIBind('UI/module/ArkModule/GiftBagPanel.ui')
export default class GiftBagPanel_Generate extends UIScript {
		private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/TitleBgImage/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mInputBox_Internal: mw.InputBox
	public get mInputBox(): mw.InputBox {
		if(!this.mInputBox_Internal&&this.uiWidgetBase) {
			this.mInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mInputBox') as mw.InputBox
		}
		return this.mInputBox_Internal
	}
	private mInputTipsTextBlock_Internal: mw.TextBlock
	public get mInputTipsTextBlock(): mw.TextBlock {
		if(!this.mInputTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mInputTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mInputBox/mInputTipsTextBlock') as mw.TextBlock
		}
		return this.mInputTipsTextBlock_Internal
	}
	private mGetButton_Internal: mw.Button
	public get mGetButton(): mw.Button {
		if(!this.mGetButton_Internal&&this.uiWidgetBase) {
			this.mGetButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mGetButton') as mw.Button
		}
		return this.mGetButton_Internal
	}
	private mGetTextBlock_Internal: mw.TextBlock
	public get mGetTextBlock(): mw.TextBlock {
		if(!this.mGetTextBlock_Internal&&this.uiWidgetBase) {
			this.mGetTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mGetButton/mGetTextBlock') as mw.TextBlock
		}
		return this.mGetTextBlock_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
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
		
		this.mGetButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mGetButton");
		});
		this.mGetButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitleTextBlock)
		
	
		this.initLanguage(this.mInputTipsTextBlock)
		
	
		this.initLanguage(this.mGetTextBlock)
		
	
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
 