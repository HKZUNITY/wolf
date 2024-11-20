/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GMModule/GMHUD.ui
 * TIME: 2024.11.21-00.11.24
 */
 
@UIBind('UI/module/GMModule/GMHUD.ui')
export default class GMHUD_Generate extends UIScript {
		private oKbutton_Internal: mw.StaleButton
	public get oKbutton(): mw.StaleButton {
		if(!this.oKbutton_Internal&&this.uiWidgetBase) {
			this.oKbutton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/oKbutton') as mw.StaleButton
		}
		return this.oKbutton_Internal
	}
	private dropList_Internal: mw.ScrollBox
	public get dropList(): mw.ScrollBox {
		if(!this.dropList_Internal&&this.uiWidgetBase) {
			this.dropList_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList') as mw.ScrollBox
		}
		return this.dropList_Internal
	}
	private argText_Internal: mw.InputBox
	public get argText(): mw.InputBox {
		if(!this.argText_Internal&&this.uiWidgetBase) {
			this.argText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/argText') as mw.InputBox
		}
		return this.argText_Internal
	}
	private cmdButton_Internal: mw.StaleButton
	public get cmdButton(): mw.StaleButton {
		if(!this.cmdButton_Internal&&this.uiWidgetBase) {
			this.cmdButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cmdButton') as mw.StaleButton
		}
		return this.cmdButton_Internal
	}
	private pingText_Internal: mw.TextBlock
	public get pingText(): mw.TextBlock {
		if(!this.pingText_Internal&&this.uiWidgetBase) {
			this.pingText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/pingText') as mw.TextBlock
		}
		return this.pingText_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.oKbutton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "oKbutton");
		});
		this.initLanguage(this.oKbutton);
		this.oKbutton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.cmdButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "cmdButton");
		});
		this.initLanguage(this.cmdButton);
		this.cmdButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.pingText)
		
	
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
 