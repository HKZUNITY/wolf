/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/FSMModule/BlackMaskPanel.ui
 * TIME: 2025.01.20-21.54.29
 */
 
@UIBind('UI/module/FSMModule/BlackMaskPanel.ui')
export default class BlackMaskPanel_Generate extends UIScript {
		private mImg_BG_Internal: mw.Image
	public get mImg_BG(): mw.Image {
		if(!this.mImg_BG_Internal&&this.uiWidgetBase) {
			this.mImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_BG') as mw.Image
		}
		return this.mImg_BG_Internal
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
 