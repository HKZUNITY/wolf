/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ExchangeModule/ExchangePanel.ui
 * TIME: 2025.03.10-20.08.36
 */
 
@UIBind('UI/module/ExchangeModule/ExchangePanel.ui')
export default class ExchangePanel_Generate extends UIScript {
		private mCanvas_Exchange_Internal: mw.Canvas
	public get mCanvas_Exchange(): mw.Canvas {
		if(!this.mCanvas_Exchange_Internal&&this.uiWidgetBase) {
			this.mCanvas_Exchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange') as mw.Canvas
		}
		return this.mCanvas_Exchange_Internal
	}
	private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_Content_Internal: mw.Canvas
	public get mCanvas_Content(): mw.Canvas {
		if(!this.mCanvas_Content_Internal&&this.uiWidgetBase) {
			this.mCanvas_Content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mScrollBox/mCanvas_Content') as mw.Canvas
		}
		return this.mCanvas_Content_Internal
	}
	private cCanvas_AdCoupon_Internal: mw.Canvas
	public get cCanvas_AdCoupon(): mw.Canvas {
		if(!this.cCanvas_AdCoupon_Internal&&this.uiWidgetBase) {
			this.cCanvas_AdCoupon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon') as mw.Canvas
		}
		return this.cCanvas_AdCoupon_Internal
	}
	private mImage_AdCouponBG_Internal: mw.Image
	public get mImage_AdCouponBG(): mw.Image {
		if(!this.mImage_AdCouponBG_Internal&&this.uiWidgetBase) {
			this.mImage_AdCouponBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mImage_AdCouponBG') as mw.Image
		}
		return this.mImage_AdCouponBG_Internal
	}
	private mImage_AdCouponFrame_Internal: mw.Image
	public get mImage_AdCouponFrame(): mw.Image {
		if(!this.mImage_AdCouponFrame_Internal&&this.uiWidgetBase) {
			this.mImage_AdCouponFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mImage_AdCouponFrame') as mw.Image
		}
		return this.mImage_AdCouponFrame_Internal
	}
	private mImage_AdCouponIcon_Internal: mw.Image
	public get mImage_AdCouponIcon(): mw.Image {
		if(!this.mImage_AdCouponIcon_Internal&&this.uiWidgetBase) {
			this.mImage_AdCouponIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mImage_AdCouponIcon') as mw.Image
		}
		return this.mImage_AdCouponIcon_Internal
	}
	private mText_AdCouponNumber_Internal: mw.TextBlock
	public get mText_AdCouponNumber(): mw.TextBlock {
		if(!this.mText_AdCouponNumber_Internal&&this.uiWidgetBase) {
			this.mText_AdCouponNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/cCanvas_AdCoupon/mText_AdCouponNumber') as mw.TextBlock
		}
		return this.mText_AdCouponNumber_Internal
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
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		});
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_AdCouponNumber)
		
	
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
 