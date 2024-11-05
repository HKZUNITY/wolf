/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/DanMuModule/ChatPanel.ui
 * TIME: 2024.11.05-20.13.04
 */
 
@UIBind('UI/module/DanMuModule/ChatPanel.ui')
export default class ChatPanel_Generate extends UIScript {
		private mOpenChatCanvas_Internal: mw.Canvas
	public get mOpenChatCanvas(): mw.Canvas {
		if(!this.mOpenChatCanvas_Internal&&this.uiWidgetBase) {
			this.mOpenChatCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenChatCanvas') as mw.Canvas
		}
		return this.mOpenChatCanvas_Internal
	}
	private mOpenChatBgImage_Internal: mw.Image
	public get mOpenChatBgImage(): mw.Image {
		if(!this.mOpenChatBgImage_Internal&&this.uiWidgetBase) {
			this.mOpenChatBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenChatCanvas/mOpenChatBgImage') as mw.Image
		}
		return this.mOpenChatBgImage_Internal
	}
	private mOpenChatButton_Internal: mw.StaleButton
	public get mOpenChatButton(): mw.StaleButton {
		if(!this.mOpenChatButton_Internal&&this.uiWidgetBase) {
			this.mOpenChatButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenChatCanvas/mOpenChatButton') as mw.StaleButton
		}
		return this.mOpenChatButton_Internal
	}
	private mChatList1Canvas_Internal: mw.Canvas
	public get mChatList1Canvas(): mw.Canvas {
		if(!this.mChatList1Canvas_Internal&&this.uiWidgetBase) {
			this.mChatList1Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList1Canvas') as mw.Canvas
		}
		return this.mChatList1Canvas_Internal
	}
	private mChatListBg1Image_Internal: mw.Image
	public get mChatListBg1Image(): mw.Image {
		if(!this.mChatListBg1Image_Internal&&this.uiWidgetBase) {
			this.mChatListBg1Image_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList1Canvas/ChatList1Canvas/mChatListBg1Image') as mw.Image
		}
		return this.mChatListBg1Image_Internal
	}
	private mChatList1ScrollBox_Internal: mw.ScrollBox
	public get mChatList1ScrollBox(): mw.ScrollBox {
		if(!this.mChatList1ScrollBox_Internal&&this.uiWidgetBase) {
			this.mChatList1ScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList1Canvas/ChatList1Canvas/mChatList1ScrollBox') as mw.ScrollBox
		}
		return this.mChatList1ScrollBox_Internal
	}
	private mChatList1ContentCanvas_Internal: mw.Canvas
	public get mChatList1ContentCanvas(): mw.Canvas {
		if(!this.mChatList1ContentCanvas_Internal&&this.uiWidgetBase) {
			this.mChatList1ContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList1Canvas/ChatList1Canvas/mChatList1ScrollBox/mChatList1ContentCanvas') as mw.Canvas
		}
		return this.mChatList1ContentCanvas_Internal
	}
	private mCloseChatList1Button_Internal: mw.Button
	public get mCloseChatList1Button(): mw.Button {
		if(!this.mCloseChatList1Button_Internal&&this.uiWidgetBase) {
			this.mCloseChatList1Button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList1Canvas/ChatList1Canvas/mCloseChatList1Button') as mw.Button
		}
		return this.mCloseChatList1Button_Internal
	}
	private mChatList2Canvas_Internal: mw.Canvas
	public get mChatList2Canvas(): mw.Canvas {
		if(!this.mChatList2Canvas_Internal&&this.uiWidgetBase) {
			this.mChatList2Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList2Canvas') as mw.Canvas
		}
		return this.mChatList2Canvas_Internal
	}
	private mChatListBg2Image_Internal: mw.Image
	public get mChatListBg2Image(): mw.Image {
		if(!this.mChatListBg2Image_Internal&&this.uiWidgetBase) {
			this.mChatListBg2Image_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList2Canvas/ChatList2Canvas/mChatListBg2Image') as mw.Image
		}
		return this.mChatListBg2Image_Internal
	}
	private mChatList2ScrollBox_Internal: mw.ScrollBox
	public get mChatList2ScrollBox(): mw.ScrollBox {
		if(!this.mChatList2ScrollBox_Internal&&this.uiWidgetBase) {
			this.mChatList2ScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList2Canvas/ChatList2Canvas/mChatList2ScrollBox') as mw.ScrollBox
		}
		return this.mChatList2ScrollBox_Internal
	}
	private mChatList2ContentCanvas_Internal: mw.Canvas
	public get mChatList2ContentCanvas(): mw.Canvas {
		if(!this.mChatList2ContentCanvas_Internal&&this.uiWidgetBase) {
			this.mChatList2ContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList2Canvas/ChatList2Canvas/mChatList2ScrollBox/mChatList2ContentCanvas') as mw.Canvas
		}
		return this.mChatList2ContentCanvas_Internal
	}
	private mCloseChatList2Button_Internal: mw.Button
	public get mCloseChatList2Button(): mw.Button {
		if(!this.mCloseChatList2Button_Internal&&this.uiWidgetBase) {
			this.mCloseChatList2Button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mChatList2Canvas/ChatList2Canvas/mCloseChatList2Button') as mw.Button
		}
		return this.mCloseChatList2Button_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mOpenChatButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpenChatButton");
		});
		this.initLanguage(this.mOpenChatButton);
		this.mOpenChatButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mCloseChatList1Button.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseChatList1Button");
		});
		this.mCloseChatList1Button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseChatList2Button.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseChatList2Button");
		});
		this.mCloseChatList2Button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 