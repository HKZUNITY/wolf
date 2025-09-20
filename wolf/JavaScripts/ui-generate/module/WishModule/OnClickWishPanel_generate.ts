/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/WishModule/OnClickWishPanel.ui
 * TIME: 2025.09.20-11.56.19
 */
 
@UIBind('UI/module/WishModule/OnClickWishPanel.ui')
export default class OnClickWishPanel_Generate extends UIScript {
		private mBgImage_Internal: mw.Image
	public get mBgImage(): mw.Image {
		if(!this.mBgImage_Internal&&this.uiWidgetBase) {
			this.mBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage') as mw.Image
		}
		return this.mBgImage_Internal
	}
	private mClickBtn_Internal: mw.Button
	public get mClickBtn(): mw.Button {
		if(!this.mClickBtn_Internal&&this.uiWidgetBase) {
			this.mClickBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClickBtn') as mw.Button
		}
		return this.mClickBtn_Internal
	}
	private mClickTextBlock_Internal: mw.TextBlock
	public get mClickTextBlock(): mw.TextBlock {
		if(!this.mClickTextBlock_Internal&&this.uiWidgetBase) {
			this.mClickTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClickTextBlock') as mw.TextBlock
		}
		return this.mClickTextBlock_Internal
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
		
		this.mClickBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mClickBtn");
		});
		this.mClickBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mClickTextBlock)
		
	
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
 