/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/GetCoinPanel.ui
 * TIME: 2024.11.13-22.47.31
 */
 
@UIBind('UI/module/GameModule/GetCoinPanel.ui')
export default class GetCoinPanel_Generate extends UIScript {
		private mImage_Coin1_Internal: mw.Image
	public get mImage_Coin1(): mw.Image {
		if(!this.mImage_Coin1_Internal&&this.uiWidgetBase) {
			this.mImage_Coin1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCell_1/mImage_Coin1') as mw.Image
		}
		return this.mImage_Coin1_Internal
	}
	private mCell_1_Internal: mw.Canvas
	public get mCell_1(): mw.Canvas {
		if(!this.mCell_1_Internal&&this.uiWidgetBase) {
			this.mCell_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCell_1') as mw.Canvas
		}
		return this.mCell_1_Internal
	}
	private mImage_Coin2_Internal: mw.Image
	public get mImage_Coin2(): mw.Image {
		if(!this.mImage_Coin2_Internal&&this.uiWidgetBase) {
			this.mImage_Coin2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCell_2/mImage_Coin2') as mw.Image
		}
		return this.mImage_Coin2_Internal
	}
	private mCell_2_Internal: mw.Canvas
	public get mCell_2(): mw.Canvas {
		if(!this.mCell_2_Internal&&this.uiWidgetBase) {
			this.mCell_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCell_2') as mw.Canvas
		}
		return this.mCell_2_Internal
	}
	private mImage_Coin3_Internal: mw.Image
	public get mImage_Coin3(): mw.Image {
		if(!this.mImage_Coin3_Internal&&this.uiWidgetBase) {
			this.mImage_Coin3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCell_3/mImage_Coin3') as mw.Image
		}
		return this.mImage_Coin3_Internal
	}
	private mCell_3_Internal: mw.Canvas
	public get mCell_3(): mw.Canvas {
		if(!this.mCell_3_Internal&&this.uiWidgetBase) {
			this.mCell_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCell_3') as mw.Canvas
		}
		return this.mCell_3_Internal
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
 