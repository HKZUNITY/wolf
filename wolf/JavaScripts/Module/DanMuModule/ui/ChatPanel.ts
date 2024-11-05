import ChatPanel_Generate from "../../../ui-generate/module/DanMuModule/ChatPanel_generate";
import { ChatData } from "../DanMuData";
import DanMuModuleC from "../DanMuModuleC";
import ChatItem1 from "./ChatItem1";
import ChatItem2 from "./ChatItem2";

export default class ChatPanel extends ChatPanel_Generate {
	private danMuModuleC: DanMuModuleC = null;
	private get getDanMuModuleC(): DanMuModuleC {
		if (!this.danMuModuleC) {
			this.danMuModuleC = ModuleService.getModule(DanMuModuleC);
		}
		return this.danMuModuleC;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initUI();
		this.bindButton();
	}

	protected onShow(...params: any[]): void {

	}

	protected onHide(): void {
		this.initUI();
	}

	private initUI(): void {
		this.mChatList1Canvas.visibility = mw.SlateVisibility.Collapsed;
		this.mChatList2Canvas.visibility = mw.SlateVisibility.Collapsed;
	}

	private bindButton(): void {
		this.mOpenChatButton.onClicked.add(this.addOpenChatButton.bind(this));
		this.mCloseChatList1Button.onClicked.add(this.addCloseChatList1Button.bind(this));
		this.mCloseChatList2Button.onClicked.add(this.addCloseChatList2Button.bind(this));
	}

	private addOpenChatButton(): void {
		if (!this.mChatList1Canvas.visible) {
			this.getDanMuModuleC.onOpenChatAction.call();
		} else {
			this.mChatList1Canvas.visibility = mw.SlateVisibility.Collapsed;
			this.mChatList2Canvas.visibility = mw.SlateVisibility.Collapsed;
		}
	}

	private addCloseChatList1Button(): void {
		this.mChatList1Canvas.visibility = mw.SlateVisibility.Collapsed;
		this.mChatList2Canvas.visibility = mw.SlateVisibility.Collapsed;
	}

	private addCloseChatList2Button(): void {
		this.mChatList2Canvas.visibility = mw.SlateVisibility.Collapsed;
	}

	private chatDatas: ChatData[] = [];//聊天列表
	public showChatList1(chatDatas: ChatData[], isAlreadyInitChatDatas: boolean): void {
		this.mChatList1Canvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		if (isAlreadyInitChatDatas) return;
		if (!chatDatas || chatDatas.length == 0) {
			this.mChatList1Canvas.visibility = mw.SlateVisibility.Collapsed;
			return;
		}
		this.chatDatas = chatDatas;
		for (let i = 0; i < chatDatas.length; ++i) {
			let chatData = chatDatas[i];
			let chatItem1 = mw.UIService.create(ChatItem1);

			let text: string = chatData.chats[1];//TODO:LanguageId
			if (chatData.chatChilds && chatData.chatChilds.length > 0) {
				let reg = /\{[\d]\}/;
				text = text.replace(reg, "...");
			}

			chatItem1.setData(i, text);
			this.mChatList1ContentCanvas.addChild(chatItem1.uiObject);
		}
	}

	public closeChatList1(): void {
		this.mChatList1Canvas.visibility = mw.SlateVisibility.Collapsed;
		this.mChatList2Canvas.visibility = mw.SlateVisibility.Collapsed;
	}

	private chatItems2: ChatItem2[] = [];//聊天列表
	public showChatList2(index: number, chatChilds: string[][]): void {
		this.mChatList2Canvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		if (!chatChilds || chatChilds.length == 0) {
			this.mChatList2Canvas.visibility = mw.SlateVisibility.Collapsed;
			return;
		}
		if (chatChilds.length > this.chatItems2.length) {
			for (let i = 0; i < this.chatItems2.length; ++i) {
				this.chatItems2[i].setData(index, i, chatChilds[i][1]);//TODO:LanguageId
				this.chatItems2[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			}
			for (let i = this.chatItems2.length; i < chatChilds.length; ++i) {
				let chatItem2 = mw.UIService.create(ChatItem2);
				chatItem2.setData(index, i, chatChilds[i][1]);//TODO:LanguageId
				this.mChatList2ContentCanvas.addChild(chatItem2.uiObject);
				this.chatItems2.push(chatItem2);
			}
		} else {
			for (let i = 0; i < chatChilds.length; ++i) {
				this.chatItems2[i].setData(index, i, chatChilds[i][1]);//TODO:LanguageId
				this.chatItems2[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			}
			for (let i = chatChilds.length; i < this.chatItems2.length; ++i) {
				this.chatItems2[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
			}
		}
	}
}