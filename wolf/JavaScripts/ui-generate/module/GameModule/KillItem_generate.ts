/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/KillItem.ui
 * TIME: 2024.12.24-22.05.34
 */
 
@UIBind('UI/module/GameModule/KillItem.ui')
export default class KillItem_Generate extends UIScript {
		private mText_1_Internal: mw.TextBlock
	public get mText_1(): mw.TextBlock {
		if(!this.mText_1_Internal&&this.uiWidgetBase) {
			this.mText_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_1') as mw.TextBlock
		}
		return this.mText_1_Internal
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
		
		this.initLanguage(this.mText_1)
		
	
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
 