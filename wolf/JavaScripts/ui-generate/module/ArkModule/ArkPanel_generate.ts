/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ArkModule/ArkPanel.ui
 * TIME: 2024.12.24-22.05.33
 */
 
@UIBind('UI/module/ArkModule/ArkPanel.ui')
export default class ArkPanel_Generate extends UIScript {
		private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/TitleBgImage/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mUserIdTextBlock_Internal: mw.TextBlock
	public get mUserIdTextBlock(): mw.TextBlock {
		if(!this.mUserIdTextBlock_Internal&&this.uiWidgetBase) {
			this.mUserIdTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mUserIdTextBlock') as mw.TextBlock
		}
		return this.mUserIdTextBlock_Internal
	}
	private mMoneyCanvas_Internal: mw.Canvas
	public get mMoneyCanvas(): mw.Canvas {
		if(!this.mMoneyCanvas_Internal&&this.uiWidgetBase) {
			this.mMoneyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas') as mw.Canvas
		}
		return this.mMoneyCanvas_Internal
	}
	private mIconCoinImage_Internal: mw.Image
	public get mIconCoinImage(): mw.Image {
		if(!this.mIconCoinImage_Internal&&this.uiWidgetBase) {
			this.mIconCoinImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/CoinCanvas/mIconCoinImage') as mw.Image
		}
		return this.mIconCoinImage_Internal
	}
	private mCoinCountTextBlock_Internal: mw.TextBlock
	public get mCoinCountTextBlock(): mw.TextBlock {
		if(!this.mCoinCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/CoinCanvas/mCoinCountTextBlock') as mw.TextBlock
		}
		return this.mCoinCountTextBlock_Internal
	}
	private mIconArkImage_Internal: mw.Image
	public get mIconArkImage(): mw.Image {
		if(!this.mIconArkImage_Internal&&this.uiWidgetBase) {
			this.mIconArkImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mIconArkImage') as mw.Image
		}
		return this.mIconArkImage_Internal
	}
	private mArkCountTextBlock_Internal: mw.TextBlock
	public get mArkCountTextBlock(): mw.TextBlock {
		if(!this.mArkCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mArkCountTextBlock') as mw.TextBlock
		}
		return this.mArkCountTextBlock_Internal
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
		
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitleTextBlock)
		
	
		this.initLanguage(this.mUserIdTextBlock)
		
	
		this.initLanguage(this.mCoinCountTextBlock)
		
	
		this.initLanguage(this.mArkCountTextBlock)
		
	
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
 