/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ExchangeModule/ExchangeItem.ui
 * TIME: 2025.03.10-20.08.36
 */
 
@UIBind('UI/module/ExchangeModule/ExchangeItem.ui')
export default class ExchangeItem_Generate extends UIScript {
		private mCanvas_ExchangeItem_Internal: mw.Canvas
	public get mCanvas_ExchangeItem(): mw.Canvas {
		if(!this.mCanvas_ExchangeItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_ExchangeItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem') as mw.Canvas
		}
		return this.mCanvas_ExchangeItem_Internal
	}
	private mCanvas_Icon_Internal: mw.Canvas
	public get mCanvas_Icon(): mw.Canvas {
		if(!this.mCanvas_Icon_Internal&&this.uiWidgetBase) {
			this.mCanvas_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon') as mw.Canvas
		}
		return this.mCanvas_Icon_Internal
	}
	private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Num_Internal: mw.TextBlock
	public get mText_Num(): mw.TextBlock {
		if(!this.mText_Num_Internal&&this.uiWidgetBase) {
			this.mText_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Icon/mText_Num') as mw.TextBlock
		}
		return this.mText_Num_Internal
	}
	private mCanvas_Exchange_Internal: mw.Canvas
	public get mCanvas_Exchange(): mw.Canvas {
		if(!this.mCanvas_Exchange_Internal&&this.uiWidgetBase) {
			this.mCanvas_Exchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange') as mw.Canvas
		}
		return this.mCanvas_Exchange_Internal
	}
	private mBtn_Exchange_Internal: mw.StaleButton
	public get mBtn_Exchange(): mw.StaleButton {
		if(!this.mBtn_Exchange_Internal&&this.uiWidgetBase) {
			this.mBtn_Exchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mBtn_Exchange') as mw.StaleButton
		}
		return this.mBtn_Exchange_Internal
	}
	private mCanvas_Tips_Internal: mw.Canvas
	public get mCanvas_Tips(): mw.Canvas {
		if(!this.mCanvas_Tips_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips') as mw.Canvas
		}
		return this.mCanvas_Tips_Internal
	}
	private mText_Tip_1_Internal: mw.TextBlock
	public get mText_Tip_1(): mw.TextBlock {
		if(!this.mText_Tip_1_Internal&&this.uiWidgetBase) {
			this.mText_Tip_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips/mText_Tip_1') as mw.TextBlock
		}
		return this.mText_Tip_1_Internal
	}
	private mImg_AdCoupon_Internal: mw.Image
	public get mImg_AdCoupon(): mw.Image {
		if(!this.mImg_AdCoupon_Internal&&this.uiWidgetBase) {
			this.mImg_AdCoupon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips/mImg_AdCoupon') as mw.Image
		}
		return this.mImg_AdCoupon_Internal
	}
	private mText_Tip_2_Internal: mw.TextBlock
	public get mText_Tip_2(): mw.TextBlock {
		if(!this.mText_Tip_2_Internal&&this.uiWidgetBase) {
			this.mText_Tip_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_ExchangeItem/mCanvas_Exchange/mCanvas_Tips/mText_Tip_2') as mw.TextBlock
		}
		return this.mText_Tip_2_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Exchange.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Exchange");
		});
		this.initLanguage(this.mBtn_Exchange);
		this.mBtn_Exchange.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Num)
		
	
		this.initLanguage(this.mText_Tip_1)
		
	
		this.initLanguage(this.mText_Tip_2)
		
	
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
 