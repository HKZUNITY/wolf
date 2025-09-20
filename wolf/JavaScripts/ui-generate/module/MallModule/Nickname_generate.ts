/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/MallModule/Nickname.ui
 * TIME: 2025.09.20-11.56.19
 */
 
@UIBind('UI/module/MallModule/Nickname.ui')
export default class Nickname_Generate extends UIScript {
		private mWishBgImage_Internal: mw.Image
	public get mWishBgImage(): mw.Image {
		if(!this.mWishBgImage_Internal&&this.uiWidgetBase) {
			this.mWishBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/NicknameCanvas/mWishBgImage') as mw.Image
		}
		return this.mWishBgImage_Internal
	}
	private mWishIconImage_Internal: mw.Image
	public get mWishIconImage(): mw.Image {
		if(!this.mWishIconImage_Internal&&this.uiWidgetBase) {
			this.mWishIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/NicknameCanvas/mWishBgImage/mWishIconImage') as mw.Image
		}
		return this.mWishIconImage_Internal
	}
	private mWishFlipBook_Internal: mw.FlipBook
	public get mWishFlipBook(): mw.FlipBook {
		if(!this.mWishFlipBook_Internal&&this.uiWidgetBase) {
			this.mWishFlipBook_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/NicknameCanvas/mWishBgImage/mWishFlipBook') as mw.FlipBook
		}
		return this.mWishFlipBook_Internal
	}
	private mWishTipsTextBlock_Internal: mw.TextBlock
	public get mWishTipsTextBlock(): mw.TextBlock {
		if(!this.mWishTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mWishTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/NicknameCanvas/mWishBgImage/mWishTipsTextBlock') as mw.TextBlock
		}
		return this.mWishTipsTextBlock_Internal
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
		
		//按钮多语言
		
		//文本多语言
		
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
 