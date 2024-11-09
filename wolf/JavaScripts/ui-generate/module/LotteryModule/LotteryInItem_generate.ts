/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LotteryModule/LotteryInItem.ui
 * TIME: 2024.11.09-14.30.14
 */
 
@UIBind('UI/module/LotteryModule/LotteryInItem.ui')
export default class LotteryInItem_Generate extends UIScript {
		private mCanvas_LotteryItem_Internal: mw.Canvas
	public get mCanvas_LotteryItem(): mw.Canvas {
		if(!this.mCanvas_LotteryItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_LotteryItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LotteryItem') as mw.Canvas
		}
		return this.mCanvas_LotteryItem_Internal
	}
	private mImage_BG_0_Internal: mw.Image
	public get mImage_BG_0(): mw.Image {
		if(!this.mImage_BG_0_Internal&&this.uiWidgetBase) {
			this.mImage_BG_0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LotteryItem/mImage_BG_0') as mw.Image
		}
		return this.mImage_BG_0_Internal
	}
	private mImage_BG_Internal: mw.Image
	public get mImage_BG(): mw.Image {
		if(!this.mImage_BG_Internal&&this.uiWidgetBase) {
			this.mImage_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LotteryItem/mImage_BG') as mw.Image
		}
		return this.mImage_BG_Internal
	}
	private mImage_Items_Internal: mw.Image
	public get mImage_Items(): mw.Image {
		if(!this.mImage_Items_Internal&&this.uiWidgetBase) {
			this.mImage_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LotteryItem/mImage_Items') as mw.Image
		}
		return this.mImage_Items_Internal
	}
	private mText_Items_Internal: mw.TextBlock
	public get mText_Items(): mw.TextBlock {
		if(!this.mText_Items_Internal&&this.uiWidgetBase) {
			this.mText_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_LotteryItem/mText_Items') as mw.TextBlock
		}
		return this.mText_Items_Internal
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
		
		this.initLanguage(this.mText_Items)
		
	
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
 