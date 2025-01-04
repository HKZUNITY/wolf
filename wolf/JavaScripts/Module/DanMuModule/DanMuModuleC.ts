import { Notice } from "../../CommonUI/notice/Notice";
import { Globals } from "../../Globals";
import { IActionConfigElement } from "../../Tables/ActionConfig";
import { IChatElement } from "../../Tables/Chat";
import { IExpressionElement } from "../../Tables/Expression";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import BubbleItem_Generate from "../../ui-generate/module/DanMuModule/BubbleItem_generate";
import AdsPanel from "../AdsModule/ui/AdsPanel";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import { Bubble } from "./Bubble";
import { ChatData, ActionData } from "./DanMuData";
import DanMuModuleS from "./DanMuModuleS";
import ChatPanel, { SharePanel } from "./ui/ChatPanel";
import DanMuPanel from "./ui/DanMuPanel";

export const DanmuSyncServer = "DanmuSyncServer";
export const DanmuSyncClient = "DanmuSyncClient";
export const StopAction = "StopAction";
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

    private sharePanel: SharePanel = null;
    private get getSharePanel(): SharePanel {
        if (!this.sharePanel) {
            this.sharePanel = UIService.getUI(SharePanel);
        }
        return this.sharePanel;
    }

    private adPanel: AdsPanel = null;
    private get getAdPanel(): AdsPanel {
        if (!this.adPanel) {
            this.adPanel = UIService.getUI(AdsPanel);
        }
        return this.adPanel;
    }

    public onOpenChatAction: Action = new Action();
    public onClickChatItem1Action: Action1<number> = new Action1<number>();
    public onClickChatItem2Action: Action2<number, number> = new Action2<number, number>();
    public onOpenExpressionAction: Action = new Action();
    public onClickExpressionItemAction: Action1<number> = new Action1<number>();
    public onOpenActionAction: Action = new Action();
    public onClickActionTabAction: Action1<number> = new Action1<number>();
    public onClickActionItemAction: Action1<number> = new Action1<number>();
    public onCloseActionAction: Action = new Action();
    public onOpenBagAction: Action = new Action();
    public onClickBagTabAction: Action1<number> = new Action1<number>();
    public onClickBagItemAction: Action1<number> = new Action1<number>();
    public onClickUnloadBagItemAction: Action = new Action();
    public onOpenShareAction: Action = new Action();
    public onUseShareAction: Action1<string> = new Action1<string>();

    protected onStart(): void {
        this.bindEvent();

        InputUtil.onKeyDown(mw.Keys.P, () => {
            Event.dispatchToLocal(DanmuSyncClient, "测试弹幕");
        })
        InputUtil.onKeyDown(mw.Keys.O, () => {
            Event.dispatchToLocal(DanmuSyncServer, "测试弹幕");
        })
        InputUtil.onKeyDown(mw.Keys.NumPadEight, () => {
            this.getChatPanel.hide();
            UIService.getUI(HUDPanel).hide();
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.showPanels();
        this.initDance();
        // 设置“去装扮”按钮隐藏
        AvatarEditorService.setAvatarEditorButtonVisible(true);
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
        this.onOpenExpressionAction.add(this.addOpenExpressionAction.bind(this));
        this.onClickExpressionItemAction.add(this.addClickExpressionItemAction.bind(this));
        this.onOpenActionAction.add(this.addOpenActionAction.bind(this));
        this.onClickActionTabAction.add(this.addClickActionTabAction.bind(this));
        this.onClickActionItemAction.add(this.addClickActionItemAction.bind(this));
        this.onCloseActionAction.add(this.addStopAction.bind(this));
        Event.addLocalListener(StopAction, this.addStopAction.bind(this));
        this.onOpenBagAction.add(this.addOpenBagAction.bind(this));
        this.onClickBagTabAction.add(this.addClickBagTabAction.bind(this));
        this.onClickBagItemAction.add(this.addClickBagItemAction.bind(this));
        this.onClickUnloadBagItemAction.add(this.addClickUnloadBagItemAction.bind(this));
        this.onOpenShareAction.add(this.onOpenShareActionHandler.bind(this));
        this.onUseShareAction.add(this.onUseShareActionHandler.bind(this));
    }

    private async onOpenShareActionHandler(): Promise<void> {
        this.getSharePanel.show();
        let sharedId = await Tools.createSharedId(this.localPlayer.character);
        this.getSharePanel.showPanel(sharedId);
    }

    private onUseShareActionHandler(shareId: string): void {
        if (Globals.isOpenIAA) {
            this.getAdPanel.showRewardAd(() => {
                this.useShareId(shareId);
            }, GameConfig.Language.Text_TryItOnForFree.Value
                , GameConfig.Language.Text_Cancel.Value
                , GameConfig.Language.Text_FreeTryOn.Value);
        } else {
            this.useShareId(shareId);
        }
    }

    private async useShareId(shareId: string): Promise<void> {
        let isSuccess = await Tools.applySharedId(this.localPlayer.character, shareId);
        if (isSuccess) {
            Notice.showDownNotice(GameConfig.Language.Text_TryItOnSuccessfully.Value);
        } else {
            Notice.showDownNotice(GameConfig.Language.Text_InvalidID.Value);
        }
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
            Event.dispatchToLocal(DanmuSyncServer, chatData.chats[Globals.languageId]);
            this.showBubbleText(chatData.chats[Globals.languageId]);
            this.getChatPanel.closeChatList2(false);
        }
    }

    private addClickChatItem2Action(index: number, childIndex: number): void {
        if (this.chatDatas.length <= index) return;
        let chatData = this.chatDatas[index];
        if (!chatData) return;
        if (chatData.chatChilds && chatData.chatChilds.length > childIndex) {
            let text = chatData.chatChilds[childIndex][Globals.languageId];
            text = StringUtil.format(chatData.chats[Globals.languageId], text);
            Event.dispatchToLocal(DanmuSyncServer, text);
            this.showBubbleText(text);
            // this.getChatPanel.closeChatList1List2();
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

    //#region 表情
    private expressionAssets: string[] = [];
    public net_initExpressionDatas(expressionAssets: string[]): void {
        this.expressionAssets = expressionAssets;
        console.error(JSON.stringify(expressionAssets));
    }

    private isAlreadyInitExpressionDatas: boolean = false;
    private addOpenExpressionAction(): void {
        if (!this.isAlreadyInitExpressionDatas) {
            if (!this.expressionAssets || this.expressionAssets.length == 0) {
                this.expressionAssets = [];
                GameConfig.Expression.getAllElement().forEach((value: IExpressionElement) => {
                    this.expressionAssets.push(value.AssetId);
                });
            }
            this.getChatPanel.showExpressionList(this.expressionAssets, this.isAlreadyInitExpressionDatas);
            this.isAlreadyInitExpressionDatas = true;
        } else {
            this.getChatPanel.showExpressionList(this.expressionAssets, this.isAlreadyInitExpressionDatas);
        }
    }

    private addClickExpressionItemAction(index: number): void {
        if (this.expressionAssets.length <= index) return;
        let assetId = this.expressionAssets[index];
        if (!assetId || assetId == "") return;
        // this.getChatPanel.closeExpressionList();
        this.server.net_playExpression(assetId);
    }

    private expressionMap: Map<number, { playId: number, timeoutId: any }> = new Map<number, { playId: number, timeoutId: any }>();
    public net_playExpression(playerId: number, assetId: string): void {
        let player = Player.getPlayer(playerId);
        if (!player) return;
        Tools.asyncDownloadAsset(assetId).then(() => {
            if (this.expressionMap.has(playerId)) {
                let expression = this.expressionMap.get(playerId);
                if (expression.playId) {
                    EffectService.stop(expression.playId);
                    expression.playId = null;
                }
                if (expression.timeoutId) {
                    clearTimeout(expression.timeoutId);
                    expression.timeoutId = null;
                }
            }
            let playId = EffectService.playOnGameObject(assetId, player.character, { slotType: mw.HumanoidSlotType.Root, loopCount: 0, position: new mw.Vector(0, 0, 200) });
            let timeoutId = setTimeout(() => {
                if (this.expressionMap.has(playerId)) {
                    let expression = this.expressionMap.get(playerId);
                    if (expression.playId) {
                        EffectService.stop(expression.playId);
                        expression.playId = null;
                    }
                    if (expression.timeoutId) {
                        clearTimeout(expression.timeoutId);
                        expression.timeoutId = null;
                    }
                }
            }, 5 * 1000);
            this.expressionMap.set(playerId, { playId: playId, timeoutId: timeoutId });
        });
    }
    //#endregion

    //#region 动作
    private actionDatas: ActionData[] = [];
    private actionDataMap: Map<number, ActionData[]> = new Map<number, ActionData[]>();
    public net_initActionDatas(actionDatas: ActionData[]): void {
        this.actionDatas = actionDatas;
        console.error(JSON.stringify(actionDatas));
        this.actionDataMap.clear();
        actionDatas.forEach((value: ActionData) => {
            if (this.actionDataMap.has(value.tab)) {
                let actionDatas = this.actionDataMap.get(value.tab);
                actionDatas.push(value);
            } else {
                this.actionDataMap.set(value.tab, [value]);
            }
        });
    }

    private isAlreadyInitActionDatas: boolean = false;
    private addOpenActionAction(): void {
        if (!this.isAlreadyInitActionDatas) {
            if (!this.actionDataMap || this.actionDataMap.size == 0) {
                this.actionDataMap = new Map<number, ActionData[]>();
                this.actionDataMap.clear();
                GameConfig.ActionConfig.getAllElement().forEach((value: IActionConfigElement) => {
                    let actionData = new ActionData();
                    actionData.tab = value.Tab;
                    actionData.icon = value.Icon;
                    actionData.assetId = value.ActionId;
                    actionData.names = value.Names;
                    actionData.loop = value.Loop;
                    actionData.pos = value.Pos;
                    actionData.rot = new mw.Rotation(value.Rot);
                    actionData.type = value.Type;
                    if (this.actionDataMap.has(actionData.tab)) {
                        let actionDatas = this.actionDataMap.get(actionData.tab);
                        actionDatas.push(actionData);
                    } else {
                        this.actionDataMap.set(actionData.tab, [actionData]);
                    }
                });
            }
            this.getChatPanel.showActionList(this.actionDataMap, this.isAlreadyInitActionDatas);
            this.isAlreadyInitActionDatas = true;
        } else {
            this.getChatPanel.showActionList(this.actionDataMap, this.isAlreadyInitActionDatas);
        }
    }

    private actionTabIndex: number = 0;
    private addClickActionTabAction(index: number): void {
        if (this.actionTabIndex == index) return;
        this.actionTabIndex = index;
        this.getChatPanel.showActionItemList(this.actionTabIndex);
    }

    private isPlaying: boolean = false;
    private isCanInteract: boolean = true;
    private addClickActionItemAction(index: number): void {
        if (!this.actionDataMap.has(this.actionTabIndex)) return;
        let actionDatas = this.actionDataMap.get(this.actionTabIndex);
        if (!actionDatas || actionDatas.length == 0 || index >= actionDatas.length) return;
        let actionData = actionDatas[index];
        if (!actionData) return;

        if (!this.isCanInteract) {
            console.error("交互还未准备完成");
            return;
        }
        this.isCanInteract = false;
        this.server.net_EnterInteract(actionData).then(() => {
            this.isPlaying = true;
            this.isCanInteract = true;
        });
    }

    private addStopAction(): void {
        if (!this.localPlayer.character.movementEnabled) this.localPlayer.character.movementEnabled = true;
        if (!this.isPlaying) return;
        this.server.net_LeaveInteract().then(() => {
            this.isPlaying = false;
        });
    }
    //#endregion

    //#region 背包
    private addOpenBagAction(): void {
        if (this.currentBagId == 0) {
            this.getChatPanel.showBagCanvas();
        } else {
            let nextBagId = GameConfig.ActionProp.getElement(this.currentBagId).NextId;
            this.addClickBagItemAction(nextBagId);
        }
    }

    private bagTabIndex: number = 0;
    private addClickBagTabAction(index: number): void {
        if (this.bagTabIndex == index) return;
        this.bagTabIndex = index;
        this.getChatPanel.showBagItemList(this.bagTabIndex);
    }

    private currentBagId: number = 0;
    private addClickBagItemAction(bagId: number): void {
        console.error(`bagId:${bagId}`);
        if (this.currentBagId == bagId) return;
        this.getChatPanel.updateBagIcon(bagId);
        this.server.net_useBag(bagId).then(() => {
            this.currentBagId = bagId;
        });
    }

    private addClickUnloadBagItemAction(): void {
        if (this.currentBagId == 0) return;
        this.server.net_unloadBag(this.currentBagId).then(() => {
            this.currentBagId = 0;
            this.getChatPanel.updateBagIcon(this.currentBagId);
        });
    }
    //#endregion

    //#region 跳舞交互
    private initDance(): void {
        return;
        danceInteracts.forEach(async (value: DanceInteract) => {
            let npcs: mw.Character[] = [];
            for (let i = 0; i < value.npcIds.length; ++i) {
                let npc = await mw.GameObject.asyncFindGameObjectById(value.npcIds[i]) as mw.Character;
                npc.collisionWithOtherCharacterEnabled = false;
                await Tools.asyncDownloadAsset(value.danceIds[i]);
                await npc.asyncReady();
                npcs.push(npc);
            }
            for (let i = 0; i < npcs.length; ++i) {
                npcs[i].loadSubStance(value.danceIds[i]).play();
            }
            // npcs[1].localTransform.position = npcs[0].localTransform.position;
        });
    }
    //#endregion
}

const danceInteracts: DanceInteract[] = [
    { npcIds: ["1D6BC608", "2D1D62C0"], danceIds: ["122807", "122806"] },
    { npcIds: ["33292DC4", "286BB055"], danceIds: ["124192", "124194"] },
    { npcIds: ["29450FE5", "29BED52B"], danceIds: ["122811", "122809"] },
    { npcIds: ["04B28DAB", "0CC451CF"], danceIds: ["122808", "122810"] },
]

class DanceInteract {
    public npcIds: string[];
    public danceIds: string[];
}