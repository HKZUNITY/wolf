/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShopModule/ShopItem.ui
 * TIME: 2025.02.27-19.44.55
 */
 
@UIBind('UI/module/ShopModule/ShopItem.ui')
export default class ShopItem_Generate extends UIScript {
		private mCanvas_Items_Internal: mw.Canvas
	public get mCanvas_Items(): mw.Canvas {
		if(!this.mCanvas_Items_Internal&&this.uiWidgetBase) {
			this.mCanvas_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items') as mw.Canvas
		}
		return this.mCanvas_Items_Internal
	}
	private mBtn_Items_Internal: mw.StaleButton
	public get mBtn_Items(): mw.StaleButton {
		if(!this.mBtn_Items_Internal&&this.uiWidgetBase) {
			this.mBtn_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items/mBtn_Items') as mw.StaleButton
		}
		return this.mBtn_Items_Internal
	}
	private mImage_BG_Internal: mw.Image
	public get mImage_BG(): mw.Image {
		if(!this.mImage_BG_Internal&&this.uiWidgetBase) {
			this.mImage_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items/mImage_BG') as mw.Image
		}
		return this.mImage_BG_Internal
	}
	private mImage_Items_Internal: mw.Image
	public get mImage_Items(): mw.Image {
		if(!this.mImage_Items_Internal&&this.uiWidgetBase) {
			this.mImage_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items/mImage_Items') as mw.Image
		}
		return this.mImage_Items_Internal
	}
	private mText_Items_Internal: mw.TextBlock
	public get mText_Items(): mw.TextBlock {
		if(!this.mText_Items_Internal&&this.uiWidgetBase) {
			this.mText_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items/mText_Items') as mw.TextBlock
		}
		return this.mText_Items_Internal
	}
	private mText_ItemsPrice_Internal: mw.TextBlock
	public get mText_ItemsPrice(): mw.TextBlock {
		if(!this.mText_ItemsPrice_Internal&&this.uiWidgetBase) {
			this.mText_ItemsPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items/mText_ItemsPrice') as mw.TextBlock
		}
		return this.mText_ItemsPrice_Internal
	}
	private mImage_Lock_Internal: mw.Image
	public get mImage_Lock(): mw.Image {
		if(!this.mImage_Lock_Internal&&this.uiWidgetBase) {
			this.mImage_Lock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items/mImage_Lock') as mw.Image
		}
		return this.mImage_Lock_Internal
	}
	private mImage_Using_Internal: mw.Image
	public get mImage_Using(): mw.Image {
		if(!this.mImage_Using_Internal&&this.uiWidgetBase) {
			this.mImage_Using_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Items/mImage_Using') as mw.Image
		}
		return this.mImage_Using_Internal
	}
	private mCanvas_Price_Coin_Internal: mw.Canvas
	public get mCanvas_Price_Coin(): mw.Canvas {
		if(!this.mCanvas_Price_Coin_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_Coin') as mw.Canvas
		}
		return this.mCanvas_Price_Coin_Internal
	}
	private mImage_Price_Coin_Internal: mw.Image
	public get mImage_Price_Coin(): mw.Image {
		if(!this.mImage_Price_Coin_Internal&&this.uiWidgetBase) {
			this.mImage_Price_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_Coin/mImage_Price_Coin') as mw.Image
		}
		return this.mImage_Price_Coin_Internal
	}
	private mCanvas_Price_Diamond_Internal: mw.Canvas
	public get mCanvas_Price_Diamond(): mw.Canvas {
		if(!this.mCanvas_Price_Diamond_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_Diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_Diamond') as mw.Canvas
		}
		return this.mCanvas_Price_Diamond_Internal
	}
	private mImage_Price_Diamond_Internal: mw.Image
	public get mImage_Price_Diamond(): mw.Image {
		if(!this.mImage_Price_Diamond_Internal&&this.uiWidgetBase) {
			this.mImage_Price_Diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_Diamond/mImage_Price_Diamond') as mw.Image
		}
		return this.mImage_Price_Diamond_Internal
	}
	private mCanvas_Price_AdCoupon_Internal: mw.Canvas
	public get mCanvas_Price_AdCoupon(): mw.Canvas {
		if(!this.mCanvas_Price_AdCoupon_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_AdCoupon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_AdCoupon') as mw.Canvas
		}
		return this.mCanvas_Price_AdCoupon_Internal
	}
	private mImage_Price_AdCoupon_Internal: mw.Image
	public get mImage_Price_AdCoupon(): mw.Image {
		if(!this.mImage_Price_AdCoupon_Internal&&this.uiWidgetBase) {
			this.mImage_Price_AdCoupon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_AdCoupon/mImage_Price_AdCoupon') as mw.Image
		}
		return this.mImage_Price_AdCoupon_Internal
	}
	private mCanvas_Price_L_Internal: mw.Canvas
	public get mCanvas_Price_L(): mw.Canvas {
		if(!this.mCanvas_Price_L_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_L_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_L') as mw.Canvas
		}
		return this.mCanvas_Price_L_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price_L/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Items.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Items");
		});
		this.initLanguage(this.mBtn_Items);
		this.mBtn_Items.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Items)
		
	
		this.initLanguage(this.mText_ItemsPrice)
		
	
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
 