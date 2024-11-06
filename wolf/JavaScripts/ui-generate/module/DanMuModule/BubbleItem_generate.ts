/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/DanMuModule/BubbleItem.ui
 * TIME: 2024.11.06-21.03.37
 */
 
@UIBind('UI/module/DanMuModule/BubbleItem.ui')
export default class BubbleItem_Generate extends UIScript {
		private mDialogBg1_Internal: mw.Image
	public get mDialogBg1(): mw.Image {
		if(!this.mDialogBg1_Internal&&this.uiWidgetBase) {
			this.mDialogBg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDialogBg1') as mw.Image
		}
		return this.mDialogBg1_Internal
	}
	private mDialogBg2_Internal: mw.Image
	public get mDialogBg2(): mw.Image {
		if(!this.mDialogBg2_Internal&&this.uiWidgetBase) {
			this.mDialogBg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDialogBg2') as mw.Image
		}
		return this.mDialogBg2_Internal
	}
	private mDialogTextBlock_Internal: mw.TextBlock
	public get mDialogTextBlock(): mw.TextBlock {
		if(!this.mDialogTextBlock_Internal&&this.uiWidgetBase) {
			this.mDialogTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDialogTextBlock') as mw.TextBlock
		}
		return this.mDialogTextBlock_Internal
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
		
		this.initLanguage(this.mDialogTextBlock)
		
	
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
 