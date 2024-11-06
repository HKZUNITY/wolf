import { IActionConfigElement } from "../../Tables/ActionConfig";
import { IExpressionElement } from "../../Tables/Expression";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { ActionData, ChatData } from "./DanMuData";
import DanMuModuleC from "./DanMuModuleC";

const WorldChatDatas: string = "WorldChatDatas";
const WorldExpressionDatas: string = "WorldExpressionDatas";
const WorldActionDatas: string = "WorldActionDatas";
export default class DanMuModuleS extends ModuleS<DanMuModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // this.setChat_Test();
        // this.setExpression_Test();
        // this.setAction_Test();
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.initChatDatas(player);
        this.initExpressionDatas(player);
        // this.initActionDatas(player);
    }

    private initChatDatas(player: mw.Player): void {
        this.getCustomdata(WorldChatDatas).then((chatDatas: ChatData[]) => {
            if (!chatDatas || chatDatas.length == 0) return;
            this.getClient(player).net_initChatDatas(chatDatas);
        });
    }

    private initExpressionDatas(player: mw.Player): void {
        this.getCustomdata(WorldExpressionDatas).then((expressionAssets: string[]) => {
            if (!expressionAssets || expressionAssets.length == 0) return;
            this.getClient(player).net_initExpressionDatas(expressionAssets);
        });
    }

    private initActionDatas(player: mw.Player): void {
        this.getCustomdata(WorldActionDatas).then((actionDatas: ActionData[]) => {
            if (!actionDatas || actionDatas.length == 0) return;
            this.getClient(player).net_initActionDatas(actionDatas);
        });
    }

    private setChat_Test(): void {
        let chatDatas: ChatData[] = [];
        for (let i = 1; i <= 10; ++i) {
            let ch = GameConfig.Chat.getElement(i);
            let chats: string[] = ch.Chats;
            let chatChilds: string[][] = ch.ChatChilds;
            chatDatas.push({ chats: chats, chatChilds: chatChilds });
        }
        this.setCustomData(WorldChatDatas, chatDatas);
    }

    private setExpression_Test(): void {
        let expressionAssets: string[] = [];
        GameConfig.Expression.getAllElement().forEach((value: IExpressionElement) => {
            expressionAssets.push(value.AssetId);
        });
        this.setCustomData(WorldExpressionDatas, expressionAssets);
    }

    private setAction_Test(): void {
        let actionDatas: ActionData[] = [];
        GameConfig.ActionConfig.getAllElement().forEach((value: IActionConfigElement) => {
            actionDatas.push({
                tab: value.Tab,
                icon: value.Icon,
                assetId: value.ActionId,
                names: value.Names,
                loop: value.Loop
            });
        });
        this.setCustomData(WorldActionDatas, actionDatas);
    }

    @Decorator.noReply()
    public net_sendDanMu(msg: string, isActive: boolean): void {
        this.getAllClient().net_sendDanMu(this.currentPlayer.userId, msg, isActive);
    }

    public async getCustomdata(key: string): Promise<any> {
        return (await DataStorage.asyncGetData(key)).data;
    }

    public async setCustomData(saveKey: string, dataInfo: any): Promise<boolean> {
        let code: mw.DataStorageResultCode = null;
        code = await DataStorage.asyncSetData(saveKey, dataInfo);
        return code == mw.DataStorageResultCode.Success;
    }

    private maxShowDistance: number = 2000;
    public net_showBubbleText(gameObjectId: string, text: string): void {
        let currentPlayer = this.currentPlayer;
        if (this.maxShowDistance == -1) {
            Player.getAllPlayers().forEach((player: mw.Player) => {
                this.getClient(player).net_showBubbleText(gameObjectId, text);
            });
        } else {
            const players = Player.getAllPlayers();
            for (const player of players) {
                if (player === currentPlayer) {
                    this.getClient(player).net_showBubbleText(gameObjectId, text);
                } else {
                    const len = Vector.distance(player.character.worldTransform.position, currentPlayer.character.worldTransform.position);
                    if (len <= this.maxShowDistance) {
                        this.getClient(player).net_showBubbleText(gameObjectId, text);
                    }
                }
            }
        }
    }

    public net_playExpression(assetId: string): void {
        this.getAllClient().net_playExpression(this.currentPlayerId, assetId);
    }

    private playerAnimationMap: Map<number, mw.Animation> = new Map<number, mw.Animation>();
    public net_playAction(isPlay: boolean, actionData: ActionData): void {
        let player = this.currentPlayer;
        let playerId = this.currentPlayerId;
        if (isPlay) {
            Tools.asyncDownloadAsset(actionData.assetId).then(() => {
                let animation = player.character.loadAnimation(actionData.assetId);
                animation.loop = actionData.loop == 0 ? 1 : 0;
                animation.play();
                this.playerAnimationMap.set(playerId, animation);
            });
        } else {
            if (this.playerAnimationMap.has(playerId)) {
                this.playerAnimationMap.get(playerId).stop();
                this.playerAnimationMap.delete(playerId);
            }
        }
    }
}