/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/DanMuModule/ChatPanel.ui
 * TIME: 2025.01.04-16.15.05
 */
 
@UIBind('UI/module/DanMuModule/ChatPanel.ui')
export default class ChatPanel_Generate extends UIScript {
		private mOpenBagCanvas_Internal: mw.Canvas
	public get mOpenBagCanvas(): mw.Canvas {
		if(!this.mOpenBagCanvas_Internal&&this.uiWidgetBase) {
			this.mOpenBagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenBagCanvas') as mw.Canvas
		}
		return this.mOpenBagCanvas_Internal
	}
	private mOpenBagBgImage_Internal: mw.Image
	public get mOpenBagBgImage(): mw.Image {
		if(!this.mOpenBagBgImage_Internal&&this.uiWidgetBase) {
			this.mOpenBagBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenBagCanvas/mOpenBagBgImage') as mw.Image
		}
		return this.mOpenBagBgImage_Internal
	}
	private mOpenBagButton_Internal: mw.StaleButton
	public get mOpenBagButton(): mw.StaleButton {
		if(!this.mOpenBagButton_Internal&&this.uiWidgetBase) {
			this.mOpenBagButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenBagCanvas/mOpenBagButton') as mw.StaleButton
		}
		return this.mOpenBagButton_Internal
	}
	private mUnloadButton_Internal: mw.Button
	public get mUnloadButton(): mw.Button {
		if(!this.mUnloadButton_Internal&&this.uiWidgetBase) {
			this.mUnloadButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenBagCanvas/mUnloadButton') as mw.Button
		}
		return this.mUnloadButton_Internal
	}
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
	private mOpenExpressionCanvas_Internal: mw.Canvas
	public get mOpenExpressionCanvas(): mw.Canvas {
		if(!this.mOpenExpressionCanvas_Internal&&this.uiWidgetBase) {
			this.mOpenExpressionCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenExpressionCanvas') as mw.Canvas
		}
		return this.mOpenExpressionCanvas_Internal
	}
	private mOpenExpressionBgImage_Internal: mw.Image
	public get mOpenExpressionBgImage(): mw.Image {
		if(!this.mOpenExpressionBgImage_Internal&&this.uiWidgetBase) {
			this.mOpenExpressionBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenExpressionCanvas/mOpenExpressionBgImage') as mw.Image
		}
		return this.mOpenExpressionBgImage_Internal
	}
	private mOpenExpressionButton_Internal: mw.StaleButton
	public get mOpenExpressionButton(): mw.StaleButton {
		if(!this.mOpenExpressionButton_Internal&&this.uiWidgetBase) {
			this.mOpenExpressionButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenExpressionCanvas/mOpenExpressionButton') as mw.StaleButton
		}
		return this.mOpenExpressionButton_Internal
	}
	private mExpressionListCanvas_Internal: mw.Canvas
	public get mExpressionListCanvas(): mw.Canvas {
		if(!this.mExpressionListCanvas_Internal&&this.uiWidgetBase) {
			this.mExpressionListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpressionListCanvas') as mw.Canvas
		}
		return this.mExpressionListCanvas_Internal
	}
	private mExpressionBgImage_Internal: mw.Image
	public get mExpressionBgImage(): mw.Image {
		if(!this.mExpressionBgImage_Internal&&this.uiWidgetBase) {
			this.mExpressionBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpressionListCanvas/ExpressionListCanvas/mExpressionBgImage') as mw.Image
		}
		return this.mExpressionBgImage_Internal
	}
	private mExpressionScrollBox_Internal: mw.ScrollBox
	public get mExpressionScrollBox(): mw.ScrollBox {
		if(!this.mExpressionScrollBox_Internal&&this.uiWidgetBase) {
			this.mExpressionScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpressionListCanvas/ExpressionListCanvas/mExpressionScrollBox') as mw.ScrollBox
		}
		return this.mExpressionScrollBox_Internal
	}
	private mExpressionListContentCanvas_Internal: mw.Canvas
	public get mExpressionListContentCanvas(): mw.Canvas {
		if(!this.mExpressionListContentCanvas_Internal&&this.uiWidgetBase) {
			this.mExpressionListContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpressionListCanvas/ExpressionListCanvas/mExpressionScrollBox/mExpressionListContentCanvas') as mw.Canvas
		}
		return this.mExpressionListContentCanvas_Internal
	}
	private mCloseExpressionListButton_Internal: mw.Button
	public get mCloseExpressionListButton(): mw.Button {
		if(!this.mCloseExpressionListButton_Internal&&this.uiWidgetBase) {
			this.mCloseExpressionListButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpressionListCanvas/ExpressionListCanvas/mCloseExpressionListButton') as mw.Button
		}
		return this.mCloseExpressionListButton_Internal
	}
	private mOpenActionCanvas_Internal: mw.Canvas
	public get mOpenActionCanvas(): mw.Canvas {
		if(!this.mOpenActionCanvas_Internal&&this.uiWidgetBase) {
			this.mOpenActionCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenActionCanvas') as mw.Canvas
		}
		return this.mOpenActionCanvas_Internal
	}
	private mOpenActionBgImage_Internal: mw.Image
	public get mOpenActionBgImage(): mw.Image {
		if(!this.mOpenActionBgImage_Internal&&this.uiWidgetBase) {
			this.mOpenActionBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenActionCanvas/mOpenActionBgImage') as mw.Image
		}
		return this.mOpenActionBgImage_Internal
	}
	private mOpenActionButton_Internal: mw.StaleButton
	public get mOpenActionButton(): mw.StaleButton {
		if(!this.mOpenActionButton_Internal&&this.uiWidgetBase) {
			this.mOpenActionButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenActionCanvas/mOpenActionButton') as mw.StaleButton
		}
		return this.mOpenActionButton_Internal
	}
	private mCloseActionButton_Internal: mw.Button
	public get mCloseActionButton(): mw.Button {
		if(!this.mCloseActionButton_Internal&&this.uiWidgetBase) {
			this.mCloseActionButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenActionCanvas/mCloseActionButton') as mw.Button
		}
		return this.mCloseActionButton_Internal
	}
	private mActionListCanvas_Internal: mw.Canvas
	public get mActionListCanvas(): mw.Canvas {
		if(!this.mActionListCanvas_Internal&&this.uiWidgetBase) {
			this.mActionListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mActionListCanvas') as mw.Canvas
		}
		return this.mActionListCanvas_Internal
	}
	private mActionBgImage_Internal: mw.Image
	public get mActionBgImage(): mw.Image {
		if(!this.mActionBgImage_Internal&&this.uiWidgetBase) {
			this.mActionBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mActionListCanvas/ActionListCanvas/mActionBgImage') as mw.Image
		}
		return this.mActionBgImage_Internal
	}
	private mActionTabListCanvas_Internal: mw.Canvas
	public get mActionTabListCanvas(): mw.Canvas {
		if(!this.mActionTabListCanvas_Internal&&this.uiWidgetBase) {
			this.mActionTabListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mActionListCanvas/ActionListCanvas/mActionTabListCanvas') as mw.Canvas
		}
		return this.mActionTabListCanvas_Internal
	}
	private mActionScrollBox_Internal: mw.ScrollBox
	public get mActionScrollBox(): mw.ScrollBox {
		if(!this.mActionScrollBox_Internal&&this.uiWidgetBase) {
			this.mActionScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mActionListCanvas/ActionListCanvas/mActionScrollBox') as mw.ScrollBox
		}
		return this.mActionScrollBox_Internal
	}
	private mActionListContentCanvas_Internal: mw.Canvas
	public get mActionListContentCanvas(): mw.Canvas {
		if(!this.mActionListContentCanvas_Internal&&this.uiWidgetBase) {
			this.mActionListContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mActionListCanvas/ActionListCanvas/mActionScrollBox/mActionListContentCanvas') as mw.Canvas
		}
		return this.mActionListContentCanvas_Internal
	}
	private mCloseActionListButton_Internal: mw.Button
	public get mCloseActionListButton(): mw.Button {
		if(!this.mCloseActionListButton_Internal&&this.uiWidgetBase) {
			this.mCloseActionListButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mActionListCanvas/ActionListCanvas/mCloseActionListButton') as mw.Button
		}
		return this.mCloseActionListButton_Internal
	}
	private mBagCanvas_Internal: mw.Canvas
	public get mBagCanvas(): mw.Canvas {
		if(!this.mBagCanvas_Internal&&this.uiWidgetBase) {
			this.mBagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCanvas') as mw.Canvas
		}
		return this.mBagCanvas_Internal
	}
	private mCloseBagButton_Internal: mw.StaleButton
	public get mCloseBagButton(): mw.StaleButton {
		if(!this.mCloseBagButton_Internal&&this.uiWidgetBase) {
			this.mCloseBagButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCanvas/mCloseBagButton') as mw.StaleButton
		}
		return this.mCloseBagButton_Internal
	}
	private mBagTabCanvas_Internal: mw.Canvas
	public get mBagTabCanvas(): mw.Canvas {
		if(!this.mBagTabCanvas_Internal&&this.uiWidgetBase) {
			this.mBagTabCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCanvas/mBagTabCanvas') as mw.Canvas
		}
		return this.mBagTabCanvas_Internal
	}
	private mBagScrollBox_Internal: mw.ScrollBox
	public get mBagScrollBox(): mw.ScrollBox {
		if(!this.mBagScrollBox_Internal&&this.uiWidgetBase) {
			this.mBagScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCanvas/mBagScrollBox') as mw.ScrollBox
		}
		return this.mBagScrollBox_Internal
	}
	private mBagContentCanvas_Internal: mw.Canvas
	public get mBagContentCanvas(): mw.Canvas {
		if(!this.mBagContentCanvas_Internal&&this.uiWidgetBase) {
			this.mBagContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCanvas/mBagScrollBox/mBagContentCanvas') as mw.Canvas
		}
		return this.mBagContentCanvas_Internal
	}
	private mBackBagButton_Internal: mw.StaleButton
	public get mBackBagButton(): mw.StaleButton {
		if(!this.mBackBagButton_Internal&&this.uiWidgetBase) {
			this.mBackBagButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBagCanvas/mBackBagButton') as mw.StaleButton
		}
		return this.mBackBagButton_Internal
	}
	private mOpenShareImage_Internal: mw.Image
	public get mOpenShareImage(): mw.Image {
		if(!this.mOpenShareImage_Internal&&this.uiWidgetBase) {
			this.mOpenShareImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenShareImage') as mw.Image
		}
		return this.mOpenShareImage_Internal
	}
	private mOpenShareButton_Internal: mw.StaleButton
	public get mOpenShareButton(): mw.StaleButton {
		if(!this.mOpenShareButton_Internal&&this.uiWidgetBase) {
			this.mOpenShareButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mOpenShareImage/mOpenShareButton') as mw.StaleButton
		}
		return this.mOpenShareButton_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mOpenBagButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpenBagButton");
		});
		this.initLanguage(this.mOpenBagButton);
		this.mOpenBagButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOpenChatButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpenChatButton");
		});
		this.initLanguage(this.mOpenChatButton);
		this.mOpenChatButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOpenExpressionButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpenExpressionButton");
		});
		this.initLanguage(this.mOpenExpressionButton);
		this.mOpenExpressionButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOpenActionButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpenActionButton");
		});
		this.initLanguage(this.mOpenActionButton);
		this.mOpenActionButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseBagButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseBagButton");
		});
		this.initLanguage(this.mCloseBagButton);
		this.mCloseBagButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBackBagButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBackBagButton");
		});
		this.initLanguage(this.mBackBagButton);
		this.mBackBagButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOpenShareButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOpenShareButton");
		});
		this.initLanguage(this.mOpenShareButton);
		this.mOpenShareButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mUnloadButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUnloadButton");
		});
		this.mUnloadButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseChatList1Button.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseChatList1Button");
		});
		this.mCloseChatList1Button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseChatList2Button.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseChatList2Button");
		});
		this.mCloseChatList2Button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseExpressionListButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseExpressionListButton");
		});
		this.mCloseExpressionListButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseActionButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseActionButton");
		});
		this.mCloseActionButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseActionListButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseActionListButton");
		});
		this.mCloseActionListButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
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
 