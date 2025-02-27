/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LotteryModule/LotteryTypePanel.ui
 * TIME: 2025.02.27-19.44.53
 */
 
@UIBind('UI/module/LotteryModule/LotteryTypePanel.ui')
export default class LotteryTypePanel_Generate extends UIScript {
		private mCanvas_lottery0_Internal: mw.Canvas
	public get mCanvas_lottery0(): mw.Canvas {
		if(!this.mCanvas_lottery0_Internal&&this.uiWidgetBase) {
			this.mCanvas_lottery0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0') as mw.Canvas
		}
		return this.mCanvas_lottery0_Internal
	}
	private mBtn_Close_1_Internal: mw.StaleButton
	public get mBtn_Close_1(): mw.StaleButton {
		if(!this.mBtn_Close_1_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mBtn_Close_1') as mw.StaleButton
		}
		return this.mBtn_Close_1_Internal
	}
	private mImage_box_Internal: mw.Image
	public get mImage_box(): mw.Image {
		if(!this.mImage_box_Internal&&this.uiWidgetBase) {
			this.mImage_box_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mImage_box') as mw.Image
		}
		return this.mImage_box_Internal
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
	private mCanvas_Coin_Internal: mw.Canvas
	public get mCanvas_Coin(): mw.Canvas {
		if(!this.mCanvas_Coin_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mCanvas_Coin') as mw.Canvas
		}
		return this.mCanvas_Coin_Internal
	}
	private mTextBlock_CoinNum_Internal: mw.TextBlock
	public get mTextBlock_CoinNum(): mw.TextBlock {
		if(!this.mTextBlock_CoinNum_Internal&&this.uiWidgetBase) {
			this.mTextBlock_CoinNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mCanvas_Coin/mTextBlock_CoinNum') as mw.TextBlock
		}
		return this.mTextBlock_CoinNum_Internal
	}
	private mCanvas_lottery_Internal: mw.Canvas
	public get mCanvas_lottery(): mw.Canvas {
		if(!this.mCanvas_lottery_Internal&&this.uiWidgetBase) {
			this.mCanvas_lottery_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mCanvas_lottery') as mw.Canvas
		}
		return this.mCanvas_lottery_Internal
	}
	private mButton_lottery_Internal: mw.StaleButton
	public get mButton_lottery(): mw.StaleButton {
		if(!this.mButton_lottery_Internal&&this.uiWidgetBase) {
			this.mButton_lottery_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mCanvas_lottery/mButton_lottery') as mw.StaleButton
		}
		return this.mButton_lottery_Internal
	}
	private mText_Price_Internal: mw.TextBlock
	public get mText_Price(): mw.TextBlock {
		if(!this.mText_Price_Internal&&this.uiWidgetBase) {
			this.mText_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mCanvas_lottery/mText_Price') as mw.TextBlock
		}
		return this.mText_Price_Internal
	}
	private mAdsButton_Internal: mw.AdsButton
	public get mAdsButton(): mw.AdsButton {
		if(!this.mAdsButton_Internal&&this.uiWidgetBase) {
			this.mAdsButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_lottery0/mAdsButton') as mw.AdsButton
		}
		return this.mAdsButton_Internal
	}
	private mCanvas_Gain_Internal: mw.Canvas
	public get mCanvas_Gain(): mw.Canvas {
		if(!this.mCanvas_Gain_Internal&&this.uiWidgetBase) {
			this.mCanvas_Gain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gain') as mw.Canvas
		}
		return this.mCanvas_Gain_Internal
	}
	private mImage_weapon_Internal: mw.Image
	public get mImage_weapon(): mw.Image {
		if(!this.mImage_weapon_Internal&&this.uiWidgetBase) {
			this.mImage_weapon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gain/mImage_weapon') as mw.Image
		}
		return this.mImage_weapon_Internal
	}
	private mCanvas_first_Internal: mw.Canvas
	public get mCanvas_first(): mw.Canvas {
		if(!this.mCanvas_first_Internal&&this.uiWidgetBase) {
			this.mCanvas_first_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gain/mCanvas_first') as mw.Canvas
		}
		return this.mCanvas_first_Internal
	}
	private mText_weaponName_Internal: mw.TextBlock
	public get mText_weaponName(): mw.TextBlock {
		if(!this.mText_weaponName_Internal&&this.uiWidgetBase) {
			this.mText_weaponName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gain/mCanvas_first/mText_weaponName') as mw.TextBlock
		}
		return this.mText_weaponName_Internal
	}
	private mCanvas_repeat_Internal: mw.Canvas
	public get mCanvas_repeat(): mw.Canvas {
		if(!this.mCanvas_repeat_Internal&&this.uiWidgetBase) {
			this.mCanvas_repeat_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gain/mCanvas_repeat') as mw.Canvas
		}
		return this.mCanvas_repeat_Internal
	}
	private mText_CoinNum_Internal: mw.TextBlock
	public get mText_CoinNum(): mw.TextBlock {
		if(!this.mText_CoinNum_Internal&&this.uiWidgetBase) {
			this.mText_CoinNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gain/mCanvas_repeat/mText_CoinNum') as mw.TextBlock
		}
		return this.mText_CoinNum_Internal
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
		
	
		this.mButton_lottery.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_lottery");
		});
		this.initLanguage(this.mButton_lottery);
		this.mButton_lottery.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_CoinNum)
		
	
		this.initLanguage(this.mText_Price)
		
	
		this.initLanguage(this.mText_weaponName)
		
	
		this.initLanguage(this.mText_CoinNum)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Gain/mCanvas_first/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Gain/mCanvas_repeat/TextBlock_1") as any);
		
	
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
 