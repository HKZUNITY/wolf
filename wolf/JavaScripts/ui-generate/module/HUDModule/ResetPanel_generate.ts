/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/HUDModule/ResetPanel.ui
 * TIME: 2024.11.21-00.11.24
 */
 
@UIBind('UI/module/HUDModule/ResetPanel.ui')
export default class ResetPanel_Generate extends UIScript {
		private mBtn_Reset_Internal: mw.Button
	public get mBtn_Reset(): mw.Button {
		if(!this.mBtn_Reset_Internal&&this.uiWidgetBase) {
			this.mBtn_Reset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Reset') as mw.Button
		}
		return this.mBtn_Reset_Internal
	}
	private mText_Reset_Internal: mw.TextBlock
	public get mText_Reset(): mw.TextBlock {
		if(!this.mText_Reset_Internal&&this.uiWidgetBase) {
			this.mText_Reset_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_Reset') as mw.TextBlock
		}
		return this.mText_Reset_Internal
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
		
		this.mBtn_Reset.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Reset");
		});
		this.mBtn_Reset.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Reset)
		
	
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
 