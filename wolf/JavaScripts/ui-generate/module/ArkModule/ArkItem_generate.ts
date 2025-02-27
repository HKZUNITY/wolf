/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ArkModule/ArkItem.ui
 * TIME: 2025.02.27-19.44.53
 */
 
@UIBind('UI/module/ArkModule/ArkItem.ui')
export default class ArkItem_Generate extends UIScript {
		private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mDayTextBlock_Internal: mw.TextBlock
	public get mDayTextBlock(): mw.TextBlock {
		if(!this.mDayTextBlock_Internal&&this.uiWidgetBase) {
			this.mDayTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mIconImage/mDayTextBlock') as mw.TextBlock
		}
		return this.mDayTextBlock_Internal
	}
	private mRewardCanvas_Internal: mw.Canvas
	public get mRewardCanvas(): mw.Canvas {
		if(!this.mRewardCanvas_Internal&&this.uiWidgetBase) {
			this.mRewardCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mRewardCanvas') as mw.Canvas
		}
		return this.mRewardCanvas_Internal
	}
	private mRewardTextBlock_Internal: mw.TextBlock
	public get mRewardTextBlock(): mw.TextBlock {
		if(!this.mRewardTextBlock_Internal&&this.uiWidgetBase) {
			this.mRewardTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mRewardCanvas/RewardBgImage/mRewardTextBlock') as mw.TextBlock
		}
		return this.mRewardTextBlock_Internal
	}
	private mTipsCanvas_Internal: mw.Canvas
	public get mTipsCanvas(): mw.Canvas {
		if(!this.mTipsCanvas_Internal&&this.uiWidgetBase) {
			this.mTipsCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mTipsCanvas') as mw.Canvas
		}
		return this.mTipsCanvas_Internal
	}
	private mTipsIconImage_Internal: mw.Image
	public get mTipsIconImage(): mw.Image {
		if(!this.mTipsIconImage_Internal&&this.uiWidgetBase) {
			this.mTipsIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mTipsCanvas/mTipsIconImage') as mw.Image
		}
		return this.mTipsIconImage_Internal
	}
	private mTipsTextBlock_Internal: mw.TextBlock
	public get mTipsTextBlock(): mw.TextBlock {
		if(!this.mTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mTipsCanvas/mTipsTextBlock') as mw.TextBlock
		}
		return this.mTipsTextBlock_Internal
	}
	private mHasCanvas_Internal: mw.Canvas
	public get mHasCanvas(): mw.Canvas {
		if(!this.mHasCanvas_Internal&&this.uiWidgetBase) {
			this.mHasCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas') as mw.Canvas
		}
		return this.mHasCanvas_Internal
	}
	private mMaskImage_Internal: mw.Image
	public get mMaskImage(): mw.Image {
		if(!this.mMaskImage_Internal&&this.uiWidgetBase) {
			this.mMaskImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas/mMaskImage') as mw.Image
		}
		return this.mMaskImage_Internal
	}
	private mMaskBgImage_Internal: mw.Image
	public get mMaskBgImage(): mw.Image {
		if(!this.mMaskBgImage_Internal&&this.uiWidgetBase) {
			this.mMaskBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas/mMaskBgImage') as mw.Image
		}
		return this.mMaskBgImage_Internal
	}
	private mHasTextBlock_Internal: mw.TextBlock
	public get mHasTextBlock(): mw.TextBlock {
		if(!this.mHasTextBlock_Internal&&this.uiWidgetBase) {
			this.mHasTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas/mMaskBgImage/mHasTextBlock') as mw.TextBlock
		}
		return this.mHasTextBlock_Internal
	}
	private mClickButton_Internal: mw.Button
	public get mClickButton(): mw.Button {
		if(!this.mClickButton_Internal&&this.uiWidgetBase) {
			this.mClickButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mClickButton') as mw.Button
		}
		return this.mClickButton_Internal
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
		
		this.initLanguage(this.mDayTextBlock)
		
	
		this.initLanguage(this.mRewardTextBlock)
		
	
		this.initLanguage(this.mTipsTextBlock)
		
	
		this.initLanguage(this.mHasTextBlock)
		
	
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
 