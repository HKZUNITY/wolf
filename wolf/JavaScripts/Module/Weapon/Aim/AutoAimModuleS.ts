import { GameGlobals } from "../../../Globals";
import { Tools } from "../../../Tools";
import { AutoAimModuleC } from "./AutoAimModuleC";

export class AutoAimModuleS extends ModuleS<AutoAimModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart(): void {

    }
    /**玩家死亡 */
    onPlayerDead(player: mw.Player) {
        Player.getAllPlayers().forEach((value) => {
            this.getClient(value).net_playerDead(player.character.gameObjectId)
        });
    }
    /**ai死亡 */
    onAiGameOver(guid: string) {
        Player.getAllPlayers().forEach((value) => {
            this.getClient(value).net_aiGameOver(guid)
        });
    }
    /**增加尸体模型 */
    onCreateDeathModel(guid: string) {
        Player.getAllPlayers().forEach((value) => {
            this.getClient(value).net_createDeathModel(guid)
        });
    }
    /**玩家离开 */
    playerLeaveGame(player: mw.Player) {
        Player.getAllPlayers().forEach((value) => {
            this.getClient(value).net_playerLeft(player.character.gameObjectId)
        });
    }
    /**初始化数据 */
    onInitData() {
        let readyPlayer: Map<string, boolean> = new Map<string, boolean>()
        let readAi: Map<string, boolean> = new Map<string, boolean>()
        GameGlobals.readyPlayers.forEach((value) => {
            readyPlayer.set(value.character.gameObjectId, true)
        })
        GameGlobals.aiPlayer.forEach((value) => {
            readAi.set(value.aiModel.gameObjectId, true)
        })

        let readycharacter = Tools.fromMapToArr(readyPlayer);
        let readyai = Tools.fromMapToArr(readAi);
        Player.getAllPlayers().forEach((value) => {
            this.getClient(value).net_initGameData(readycharacter.key, readycharacter.value,
                readyai.key, readyai.value);
        });
    }
}