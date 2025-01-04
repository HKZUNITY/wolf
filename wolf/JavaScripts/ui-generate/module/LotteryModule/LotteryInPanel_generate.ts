/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LotteryModule/LotteryInPanel.ui
 * TIME: 2025.01.04-16.15.05
 */
 
@UIBind('UI/module/LotteryModule/LotteryInPanel.ui')
export default class LotteryInPanel_Generate extends UIScript {
		private mImage_ShowBG_Internal: mw.Image
	public get mImage_ShowBG(): mw.Image {
		if(!this.mImage_ShowBG_Internal&&this.uiWidgetBase) {
			this.mImage_ShowBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_slot/mImage_ShowBG') as mw.Image
		}
		return this.mImage_ShowBG_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_slot/mScrollBox_weapon/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mScrollBox_weapon_Internal: mw.ScrollBox
	public get mScrollBox_weapon(): mw.ScrollBox {
		if(!this.mScrollBox_weapon_Internal&&this.uiWidgetBase) {
			this.mScrollBox_weapon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_slot/mScrollBox_weapon') as mw.ScrollBox
		}
		return this.mScrollBox_weapon_Internal
	}
	private mImage_yellowLine_Internal: mw.Image
	public get mImage_yellowLine(): mw.Image {
		if(!this.mImage_yellowLine_Internal&&this.uiWidgetBase) {
			this.mImage_yellowLine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_slot/mImage_yellowLine') as mw.Image
		}
		return this.mImage_yellowLine_Internal
	}
	private mBtn_Close_Internal: mw.StaleButton
	public get mBtn_Close(): mw.StaleButton {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_slot/mBtn_Close') as mw.StaleButton
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_slot_Internal: mw.Canvas
	public get mCanvas_slot(): mw.Canvas {
		if(!this.mCanvas_slot_Internal&&this.uiWidgetBase) {
			this.mCanvas_slot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_slot') as mw.Canvas
		}
		return this.mCanvas_slot_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		});
		this.initLanguage(this.mBtn_Close);
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_slot/TextBlock_doing") as any);
		
	
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
 