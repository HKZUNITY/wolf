/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShareModule/SharePanel.ui
 * TIME: 2025.01.20-21.54.30
 */
 
@UIBind('UI/module/ShareModule/SharePanel.ui')
export default class SharePanel_Generate extends UIScript {
		private mMainImage_Internal: mw.Image
	public get mMainImage(): mw.Image {
		if(!this.mMainImage_Internal&&this.uiWidgetBase) {
			this.mMainImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage') as mw.Image
		}
		return this.mMainImage_Internal
	}
	private mMyselfTipsTextBlock_Internal: mw.TextBlock
	public get mMyselfTipsTextBlock(): mw.TextBlock {
		if(!this.mMyselfTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mMyselfTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mMyselfTipsTextBlock') as mw.TextBlock
		}
		return this.mMyselfTipsTextBlock_Internal
	}
	private mMyselfTextBlock_Internal: mw.TextBlock
	public get mMyselfTextBlock(): mw.TextBlock {
		if(!this.mMyselfTextBlock_Internal&&this.uiWidgetBase) {
			this.mMyselfTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mMyselfTextBlock') as mw.TextBlock
		}
		return this.mMyselfTextBlock_Internal
	}
	private mCopyButton_Internal: mw.Button
	public get mCopyButton(): mw.Button {
		if(!this.mCopyButton_Internal&&this.uiWidgetBase) {
			this.mCopyButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mMyselfTextBlock/mCopyButton') as mw.Button
		}
		return this.mCopyButton_Internal
	}
	private mOtherTipsTextBlock_Internal: mw.TextBlock
	public get mOtherTipsTextBlock(): mw.TextBlock {
		if(!this.mOtherTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mOtherTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mOtherTipsTextBlock') as mw.TextBlock
		}
		return this.mOtherTipsTextBlock_Internal
	}
	private mInputBgImage_Internal: mw.Image
	public get mInputBgImage(): mw.Image {
		if(!this.mInputBgImage_Internal&&this.uiWidgetBase) {
			this.mInputBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mInputBgImage') as mw.Image
		}
		return this.mInputBgImage_Internal
	}
	private mInputBox_Internal: mw.InputBox
	public get mInputBox(): mw.InputBox {
		if(!this.mInputBox_Internal&&this.uiWidgetBase) {
			this.mInputBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mInputBgImage/mInputBox') as mw.InputBox
		}
		return this.mInputBox_Internal
	}
	private mCancelButton_Internal: mw.Button
	public get mCancelButton(): mw.Button {
		if(!this.mCancelButton_Internal&&this.uiWidgetBase) {
			this.mCancelButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mCancelButton') as mw.Button
		}
		return this.mCancelButton_Internal
	}
	private mCancelTextBlock_Internal: mw.TextBlock
	public get mCancelTextBlock(): mw.TextBlock {
		if(!this.mCancelTextBlock_Internal&&this.uiWidgetBase) {
			this.mCancelTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mCancelButton/mCancelTextBlock') as mw.TextBlock
		}
		return this.mCancelTextBlock_Internal
	}
	private mUseButton_Internal: mw.Button
	public get mUseButton(): mw.Button {
		if(!this.mUseButton_Internal&&this.uiWidgetBase) {
			this.mUseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mUseButton') as mw.Button
		}
		return this.mUseButton_Internal
	}
	private mUseTextBlock_Internal: mw.TextBlock
	public get mUseTextBlock(): mw.TextBlock {
		if(!this.mUseTextBlock_Internal&&this.uiWidgetBase) {
			this.mUseTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mUseButton/mUseTextBlock') as mw.TextBlock
		}
		return this.mUseTextBlock_Internal
	}
	private mAdsButton_Internal: mw.AdsButton
	public get mAdsButton(): mw.AdsButton {
		if(!this.mAdsButton_Internal&&this.uiWidgetBase) {
			this.mAdsButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mAdsButton') as mw.AdsButton
		}
		return this.mAdsButton_Internal
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
		
		this.mCopyButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCopyButton");
		});
		this.mCopyButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCancelButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCancelButton");
		});
		this.mCancelButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUseButton");
		});
		this.mUseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mMyselfTipsTextBlock)
		
	
		this.initLanguage(this.mMyselfTextBlock)
		
	
		this.initLanguage(this.mOtherTipsTextBlock)
		
	
		this.initLanguage(this.mCancelTextBlock)
		
	
		this.initLanguage(this.mUseTextBlock)
		
	
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
 