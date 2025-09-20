/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/WishModule/WishPanel.ui
 * TIME: 2025.09.20-11.56.19
 */
 
@UIBind('UI/module/WishModule/WishPanel.ui')
export default class WishPanel_Generate extends UIScript {
		private mLeftCanvas_Internal: mw.Canvas
	public get mLeftCanvas(): mw.Canvas {
		if(!this.mLeftCanvas_Internal&&this.uiWidgetBase) {
			this.mLeftCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLeftCanvas') as mw.Canvas
		}
		return this.mLeftCanvas_Internal
	}
	private mItemBgImage_Internal: mw.Image
	public get mItemBgImage(): mw.Image {
		if(!this.mItemBgImage_Internal&&this.uiWidgetBase) {
			this.mItemBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLeftCanvas/mItemBgImage') as mw.Image
		}
		return this.mItemBgImage_Internal
	}
	private mItemIconImage_Internal: mw.Image
	public get mItemIconImage(): mw.Image {
		if(!this.mItemIconImage_Internal&&this.uiWidgetBase) {
			this.mItemIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLeftCanvas/mItemBgImage/mItemIconImage') as mw.Image
		}
		return this.mItemIconImage_Internal
	}
	private mSaveButton_Internal: mw.Button
	public get mSaveButton(): mw.Button {
		if(!this.mSaveButton_Internal&&this.uiWidgetBase) {
			this.mSaveButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLeftCanvas/mSaveButton') as mw.Button
		}
		return this.mSaveButton_Internal
	}
	private mSaveTextBlock_Internal: mw.TextBlock
	public get mSaveTextBlock(): mw.TextBlock {
		if(!this.mSaveTextBlock_Internal&&this.uiWidgetBase) {
			this.mSaveTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLeftCanvas/mSaveButton/mSaveTextBlock') as mw.TextBlock
		}
		return this.mSaveTextBlock_Internal
	}
	private mListBgImage_Internal: mw.Image
	public get mListBgImage(): mw.Image {
		if(!this.mListBgImage_Internal&&this.uiWidgetBase) {
			this.mListBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListBgImage') as mw.Image
		}
		return this.mListBgImage_Internal
	}
	private mListCanvas_Internal: mw.Canvas
	public get mListCanvas(): mw.Canvas {
		if(!this.mListCanvas_Internal&&this.uiWidgetBase) {
			this.mListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListCanvas') as mw.Canvas
		}
		return this.mListCanvas_Internal
	}
	private mTab1Canvas_Internal: mw.Canvas
	public get mTab1Canvas(): mw.Canvas {
		if(!this.mTab1Canvas_Internal&&this.uiWidgetBase) {
			this.mTab1Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListCanvas/mTab1Canvas') as mw.Canvas
		}
		return this.mTab1Canvas_Internal
	}
	private mTab1ScrollBox_Internal: mw.ScrollBox
	public get mTab1ScrollBox(): mw.ScrollBox {
		if(!this.mTab1ScrollBox_Internal&&this.uiWidgetBase) {
			this.mTab1ScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListCanvas/mTab1Canvas/mTab1ScrollBox') as mw.ScrollBox
		}
		return this.mTab1ScrollBox_Internal
	}
	private mTab1ContentCanvas_Internal: mw.Canvas
	public get mTab1ContentCanvas(): mw.Canvas {
		if(!this.mTab1ContentCanvas_Internal&&this.uiWidgetBase) {
			this.mTab1ContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListCanvas/mTab1Canvas/mTab1ScrollBox/mTab1ContentCanvas') as mw.Canvas
		}
		return this.mTab1ContentCanvas_Internal
	}
	private mWishTipsTextBlock_Internal: mw.TextBlock
	public get mWishTipsTextBlock(): mw.TextBlock {
		if(!this.mWishTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mWishTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListCanvas/mTab1Canvas/mTab1ScrollBox/mTab1ContentCanvas/mWishTipsTextBlock') as mw.TextBlock
		}
		return this.mWishTipsTextBlock_Internal
	}
	private mItemScrollBox_Internal: mw.ScrollBox
	public get mItemScrollBox(): mw.ScrollBox {
		if(!this.mItemScrollBox_Internal&&this.uiWidgetBase) {
			this.mItemScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListCanvas/mItemScrollBox') as mw.ScrollBox
		}
		return this.mItemScrollBox_Internal
	}
	private mItemContentCanvas_Internal: mw.Canvas
	public get mItemContentCanvas(): mw.Canvas {
		if(!this.mItemContentCanvas_Internal&&this.uiWidgetBase) {
			this.mItemContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mListCanvas/mItemScrollBox/mItemContentCanvas') as mw.Canvas
		}
		return this.mItemContentCanvas_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mCloseImage_Internal: mw.Image
	public get mCloseImage(): mw.Image {
		if(!this.mCloseImage_Internal&&this.uiWidgetBase) {
			this.mCloseImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ListCanvas/mCloseButton/mCloseImage') as mw.Image
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
		
		this.mSaveButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSaveButton");
		});
		this.mSaveButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mSaveTextBlock)
		
	
		this.initLanguage(this.mWishTipsTextBlock)
		
	
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
 