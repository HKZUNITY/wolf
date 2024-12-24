/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LotteryModule/LotteryPanel.ui
 * TIME: 2024.12.24-22.05.34
 */
 
@UIBind('UI/module/LotteryModule/LotteryPanel.ui')
export default class LotteryPanel_Generate extends UIScript {
		private mCanvas_lottery0_Internal: mw.Canvas
	public get mCanvas_lottery0(): mw.Canvas {
		if(!this.mCanvas_lottery0_Internal&&this.uiWidgetBase) {
			this.mCanvas_lottery0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0') as mw.Canvas
		}
		return this.mCanvas_lottery0_Internal
	}
	private mImage_ShowBG_Internal: mw.Image
	public get mImage_ShowBG(): mw.Image {
		if(!this.mImage_ShowBG_Internal&&this.uiWidgetBase) {
			this.mImage_ShowBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mImage_ShowBG') as mw.Image
		}
		return this.mImage_ShowBG_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mBtn_Close_1_Internal: mw.StaleButton
	public get mBtn_Close_1(): mw.StaleButton {
		if(!this.mBtn_Close_1_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mBtn_Close_1') as mw.StaleButton
		}
		return this.mBtn_Close_1_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mScrollBox/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Close_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close_1");
		});
		this.initLanguage(this.mBtn_Close_1);
		this.mBtn_Close_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock)
		
	
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
 