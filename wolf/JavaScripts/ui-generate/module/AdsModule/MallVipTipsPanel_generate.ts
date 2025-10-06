/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/AdsModule/MallVipTipsPanel.ui
 * TIME: 2025.10.06-11.39.13
 */
 
@UIBind('UI/module/AdsModule/MallVipTipsPanel.ui')
export default class MallVipTipsPanel_Generate extends UIScript {
		private mMainImage_Internal: mw.Image
	public get mMainImage(): mw.Image {
		if(!this.mMainImage_Internal&&this.uiWidgetBase) {
			this.mMainImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage') as mw.Image
		}
		return this.mMainImage_Internal
	}
	private mTipsTextBlock_Internal: mw.TextBlock
	public get mTipsTextBlock(): mw.TextBlock {
		if(!this.mTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mTipsTextBlock') as mw.TextBlock
		}
		return this.mTipsTextBlock_Internal
	}
	private mContentTextBlock_Internal: mw.TextBlock
	public get mContentTextBlock(): mw.TextBlock {
		if(!this.mContentTextBlock_Internal&&this.uiWidgetBase) {
			this.mContentTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mContentTextBlock') as mw.TextBlock
		}
		return this.mContentTextBlock_Internal
	}
	private mCoinButton_Internal: mw.Button
	public get mCoinButton(): mw.Button {
		if(!this.mCoinButton_Internal&&this.uiWidgetBase) {
			this.mCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mCoinButton') as mw.Button
		}
		return this.mCoinButton_Internal
	}
	private mCoinTextBlock_Internal: mw.TextBlock
	public get mCoinTextBlock(): mw.TextBlock {
		if(!this.mCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mCoinButton/mCoinTextBlock') as mw.TextBlock
		}
		return this.mCoinTextBlock_Internal
	}
	private mArkButton_Internal: mw.Button
	public get mArkButton(): mw.Button {
		if(!this.mArkButton_Internal&&this.uiWidgetBase) {
			this.mArkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mArkButton') as mw.Button
		}
		return this.mArkButton_Internal
	}
	private mArkTextBlock_Internal: mw.TextBlock
	public get mArkTextBlock(): mw.TextBlock {
		if(!this.mArkTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mArkButton/mArkTextBlock') as mw.TextBlock
		}
		return this.mArkTextBlock_Internal
	}
	private mAdsButton_Internal: mw.AdsButton
	public get mAdsButton(): mw.AdsButton {
		if(!this.mAdsButton_Internal&&this.uiWidgetBase) {
			this.mAdsButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mAdsButton') as mw.AdsButton
		}
		return this.mAdsButton_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mCloseImage_Internal: mw.Image
	public get mCloseImage(): mw.Image {
		if(!this.mCloseImage_Internal&&this.uiWidgetBase) {
			this.mCloseImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainImage/mCloseButton/mCloseImage') as mw.Image
		}
		return this.mCloseImage_Internal
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
		
		this.mCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCoinButton");
		});
		this.mCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mArkButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mArkButton");
		});
		this.mArkButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTipsTextBlock)
		
	
		this.initLanguage(this.mContentTextBlock)
		
	
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mArkTextBlock)
		
	
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
 