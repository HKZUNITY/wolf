/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/WishModule/GetWishPanel.ui
 * TIME: 2025.10.06-11.39.15
 */
 
@UIBind('UI/module/WishModule/GetWishPanel.ui')
export default class GetWishPanel_Generate extends UIScript {
		private mTipsTextBlock_Internal: mw.TextBlock
	public get mTipsTextBlock(): mw.TextBlock {
		if(!this.mTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/mTipsTextBlock') as mw.TextBlock
		}
		return this.mTipsTextBlock_Internal
	}
	private mItemBgImage_Internal: mw.Image
	public get mItemBgImage(): mw.Image {
		if(!this.mItemBgImage_Internal&&this.uiWidgetBase) {
			this.mItemBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/mItemBgImage') as mw.Image
		}
		return this.mItemBgImage_Internal
	}
	private mItemIconImage_Internal: mw.Image
	public get mItemIconImage(): mw.Image {
		if(!this.mItemIconImage_Internal&&this.uiWidgetBase) {
			this.mItemIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/mItemBgImage/mItemIconImage') as mw.Image
		}
		return this.mItemIconImage_Internal
	}
	private mOpenAvatarButton_Internal: mw.Button
	public get mOpenAvatarButton(): mw.Button {
		if(!this.mOpenAvatarButton_Internal&&this.uiWidgetBase) {
			this.mOpenAvatarButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/mOpenAvatarButton') as mw.Button
		}
		return this.mOpenAvatarButton_Internal
	}
	private mAvatarTextBlock_Internal: mw.TextBlock
	public get mAvatarTextBlock(): mw.TextBlock {
		if(!this.mAvatarTextBlock_Internal&&this.uiWidgetBase) {
			this.mAvatarTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/mOpenAvatarButton/mAvatarTextBlock') as mw.TextBlock
		}
		return this.mAvatarTextBlock_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mCloseTextBlock_Internal: mw.TextBlock
	public get mCloseTextBlock(): mw.TextBlock {
		if(!this.mCloseTextBlock_Internal&&this.uiWidgetBase) {
			this.mCloseTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/mCloseButton/mCloseTextBlock') as mw.TextBlock
		}
		return this.mCloseTextBlock_Internal
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
		
		this.mOpenAvatarButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpenAvatarButton");
		});
		this.mOpenAvatarButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTipsTextBlock)
		
	
		this.initLanguage(this.mAvatarTextBlock)
		
	
		this.initLanguage(this.mCloseTextBlock)
		
	
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
 