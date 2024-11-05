import { GameConfig } from "../../Tables/GameConfig";
import { ChatData } from "./DanMuData";
import DanMuModuleC from "./DanMuModuleC";

const WorldChatDatas: string = "WorldChatDatas";
export default class DanMuModuleS extends ModuleS<DanMuModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // this.setChat_Test();
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.initChatDatas(player);
    }

    private initChatDatas(player: mw.Player): void {
        this.getCustomdata(WorldChatDatas).then((chatDatas: ChatData[]) => {
            if (!chatDatas || chatDatas.length == 0) return;
            this.getClient(player).net_initChatDatas(chatDatas);
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
}