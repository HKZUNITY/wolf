import { IChatElement } from "../../Tables/Chat";
import { GameConfig } from "../../Tables/GameConfig";
import BubbleItem_Generate from "../../ui-generate/module/DanMuModule/BubbleItem_generate";
import { Bubble } from "./Bubble";
import { ChatData } from "./DanMuData";
import DanMuModuleS from "./DanMuModuleS";
import ChatPanel from "./ui/ChatPanel";
import DanMuPanel from "./ui/DanMuPanel";

export const DanmuSyncServer = "DanmuSyncServer";
export const DanmuSyncClient = "DanmuSyncClient";
export default class DanMuModuleC extends ModuleC<DanMuModuleS, null> {
    private danMuPanel: DanMuPanel = null;
    private get getDanMuPanel(): DanMuPanel {
        if (!this.danMuPanel) {
            this.danMuPanel = mw.UIService.getUI(DanMuPanel);
        }
        return this.danMuPanel;
    }

    private chatPanel: ChatPanel = null;
    private get getChatPanel(): ChatPanel {
        if (!this.chatPanel) {
            this.chatPanel = mw.UIService.getUI(ChatPanel);
        }
        return this.chatPanel;
    }

    public onOpenChatAction: Action = new Action();
    public onClickChatItem1Action: Action1<number> = new Action1<number>();
    public onClickChatItem2Action: Action2<number, number> = new Action2<number, number>();

    protected onStart(): void {
        this.bindEvent();

        InputUtil.onKeyDown(mw.Keys.P, () => {
            Event.dispatchToLocal(DanmuSyncClient, "测试弹幕");
        })
        InputUtil.onKeyDown(mw.Keys.O, () => {
            Event.dispatchToLocal(DanmuSyncServer, "测试弹幕");
        })
    }

    protected onEnterScene(sceneType: number): void {
        this.showPanels();
    }

    protected onUpdate(dt: number): void {
        this.updateBubble(dt);
    }

    private showPanels(): void {
        this.getDanMuPanel.show();
        this.initBubble();
    }

    private bindEvent(): void {
        Event.addLocalListener(DanmuSyncServer, this.sendDanMuSyncServer.bind(this));
        Event.addLocalListener(DanmuSyncClient, this.sendDanMuSyncClient.bind(this));
        RoomService.registerMGSChatMessageEvent((jsonData: string) => {
            Event.dispatchToLocal(DanmuSyncServer, jsonData);
            this.showBubbleText(jsonData);
        });
        this.onOpenChatAction.add(this.addOpenChatAction.bind(this));
        this.onClickChatItem1Action.add(this.addClickChatItem1Action.bind(this));
        this.onClickChatItem2Action.add(this.addClickChatItem2Action.bind(this));
    }

    //#region  弹幕
    private sendDanMuSyncServer(msg: string, isActive: boolean): void {
        this.server.net_sendDanMu(msg, isActive);
    }

    private sendDanMuSyncClient(msg: string, isActive: boolean): void {
        this.getDanMuPanel.createDanMuItem(msg, isActive, true);
    }

    public net_sendDanMu(userId: string, msg: string, isActive: boolean): void {
        this.getDanMuPanel.createDanMuItem(msg, isActive, userId == this.localPlayer.userId);
    }
    //#endregion

    //#region 聊天
    private isInitShowChatPanel: boolean = false;
    public initShowChatPanel() {
        if (this.isInitShowChatPanel) return;
        this.getChatPanel.show();
        this.isInitShowChatPanel = true;
    }

    public refreshBubble(): void {
        if (mw.UIService.getUI(ChatPanel, false)?.visible) {
            this.getChatPanel.hide();
        }
        TimeUtil.delaySecond(0.5).then(() => {
            this.getChatPanel.show();
        });
    }

    private chatDatas: ChatData[] = [];
    public net_initChatDatas(chatDatas: ChatData[]): void {
        this.chatDatas = chatDatas;
        console.error(JSON.stringify(chatDatas));
    }

    private isAlreadyInitChatDatas: boolean = false;
    private addOpenChatAction(): void {
        if (!this.isAlreadyInitChatDatas) {
            if (!this.chatDatas || this.chatDatas.length == 0) {
                this.chatDatas = [];
                GameConfig.Chat.getAllElement().forEach((value: IChatElement) => {
                    this.chatDatas.push({ chats: value.Chats, chatChilds: value.ChatChilds });
                });
            }
            this.getChatPanel.showChatList1(this.chatDatas, this.isAlreadyInitChatDatas);
            this.isAlreadyInitChatDatas = true;
        } else {
            this.getChatPanel.showChatList1(this.chatDatas, this.isAlreadyInitChatDatas);
        }
    }

    private addClickChatItem1Action(index: number): void {
        if (this.chatDatas.length <= index) return;
        let chatData = this.chatDatas[index];
        if (!chatData) return;
        if (chatData.chatChilds && chatData.chatChilds.length > 0) {
            this.getChatPanel.showChatList2(index, chatData.chatChilds);
        } else {
            Event.dispatchToLocal(DanmuSyncServer, chatData.chats[1]);
            this.showBubbleText(chatData.chats[1]);
            this.getChatPanel.closeChatList1();
        }
    }

    private addClickChatItem2Action(index: number, childIndex: number): void {
        if (this.chatDatas.length <= index) return;
        let chatData = this.chatDatas[index];
        if (!chatData) return;
        if (chatData.chatChilds && chatData.chatChilds.length > childIndex) {
            let text = chatData.chatChilds[childIndex][1];//TODO:LanguageId
            text = StringUtil.format(chatData.chats[1], text);//TODO:LanguageId
            Event.dispatchToLocal(DanmuSyncServer, text);
            this.showBubbleText(text);
            this.getChatPanel.closeChatList1();
        }
    }
    //#endregion

    //#region 气泡
    /**气泡对象 */
    private _bubbles: Bubble[] = [];
    /**气泡UI对象池 */
    private _uiPool: ObjPool<BubbleItem_Generate>;
    private initBubble(): void {
        this._uiPool = new ObjPool(
            () => {
                const ui = UIService.create(BubbleItem_Generate);
                return ui;
            },
            (ui: BubbleItem_Generate) => {
                ui.rootCanvas.visibility = mw.SlateVisibility.HitTestInvisible;
                ui.rootCanvas.renderScale = Vector2.zero;
                ui.mDialogTextBlock.autoSizeEnable = true;
                ui.mDialogTextBlock.textHorizontalLayout = mw.UITextHorizontalLayout.NoClipping;
                ui.mDialogTextBlock.text = "";
                ui.mDialogTextBlock.invalidateLayoutAndVolatility();
            },
            (ui: BubbleItem_Generate) => { ui.destroy(); }, () => { }, 3);
    }

    /**
     * 显示UI
     * @param text
     */
    private showBubbleText(text: string): void {
        this.server.net_showBubbleText(this.localPlayer.character.gameObjectId, text);
    }

    public net_showBubbleText(gameObjectId: string, text: string): void {
        mw.GameObject.asyncFindGameObjectById(gameObjectId).then((value: mw.GameObject) => {
            value.onDestroyDelegate.add(() => {
                this.clear(value);
            });
            this.showDialog(value, text);
        });
    }

    /**
     * 显示聊天气泡
     * @param object 所属的物体
     * @param text 展示的文字
     */
    showDialog(object: mw.GameObject, text: string) {
        const playerBubbles = this._bubbles.filter(i => i.object == object);
        if (playerBubbles.length > 4) {
            // 删除多余文本，每个人只能说4条
            const index = this._bubbles.findIndex(i => i.object == object);
            this._bubbles[index].destory();
            this._bubbles.splice(index, 1);
        }
        this._bubbles.push(new Bubble(object, this._uiPool, text, this.sortAllBubbles));
    }

    /**
     * 排序这个玩家的所有气泡，超过最大数量则删除上面的
     * @param owner 拥有者
     */
    sortAllBubbles = (owner: mw.GameObject) => {
        const playerBubbles = this._bubbles.filter(i => i.object == owner);
        let offset = 0;
        for (let i = playerBubbles.length - 1; i >= 0; i--) {
            offset += playerBubbles[i].height;
            playerBubbles[i].offset(offset);
            offset += 5;
        }
    };

    /**
     * 清除这个玩家的所有消息
     * @param playerId
     */
    clear(object: mw.GameObject) {
        for (let i = 0; i < this._bubbles.length; i++) {
            if (this._bubbles[i].object == object) {
                this._bubbles[i].destory();
                this._bubbles.splice(i, 1);
                i--;
            }
        }
    }

    private updateBubble(dt: number) {
        for (let i = 0; i < this._bubbles.length; i++) {
            if (this._bubbles[i].onUpdate(dt)) {
                this._bubbles[i].destory();
                this._bubbles.splice(i, 1);
                i--;
            }
        }
    }
    //#endregion
}