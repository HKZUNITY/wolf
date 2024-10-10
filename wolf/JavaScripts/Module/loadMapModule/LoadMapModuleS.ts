/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-20 14:58:00
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-14 16:09:51
 * @FilePath     : \murdermystery3\JavaScripts\Module\loadMapModule\LoadMapModuleS.ts
 * @Description  : 修改描述
 */
import { AiOrPlayer, GameGlobals, GamingState } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import LoadMapModuleC from "./LoadMapModuleC";

export default class LoadMapModuleS extends ModuleS<LoadMapModuleC, null> {
    // public loadingFinishPlayer = new Array<number>();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    private defaultObj: mw.GameObject;
    protected onStart(): void {

    }

    public setPlayerEnterScene() {
        this.loadGameBornPlace();
        console.error("玩家数量", GameGlobals.enterGameNormalPlayers.length);
        console.error("出书点数量", GameGlobals.gameBornList.length);
        GameGlobals.enterGameNormalPlayers.forEach((player) => {
            this.initPlayerGamePos(AiOrPlayer.RealPlayer, player);
        })
    }

    private loadGameBornPlace() {
        GameGlobals.gameBornList.splice(0, GameGlobals.gameBornList.length);
        let gameobj = GameObject.findGameObjectById(GameConfig.Level.getElement(GameGlobals.curMapID).BirthPoint) as mw.GameObject;
        gameobj.getChildren().forEach((obj) => {
            GameGlobals.gameBornList.push(obj);
        })
        this.defaultObj = GameGlobals.gameBornList[0];
    }

    public readyPlayerShowLoadingUI() {
        GameGlobals.readyPlayers.forEach((player) => {
            this.getClient(player).net_ShowLoadingUI();
        })
    }

    // public net_addLoaingFinishPlayer(){
    //     /**不是进入游戏的玩家准备好的不算 */
    //     let index = GameGlobals.enterGameNormalPlayers.findIndex((player)=>{return player.playerId == this.currentPlayerId});
    //     if (index < 0){
    //         return;
    //     }
    //     this.loadingFinishPlayer.push(this.currentPlayerId);
    //     if (GameGlobals.curGameState == GamingState.InitGameState || GameGlobals.curGameState == GamingState.ChooseState || GameGlobals.curGameState == GamingState.GameReadyState || GameGlobals.curGameState == GamingState.GamingState) {
    //         this.initPlayerGamePos(AiOrPlayer.RealPlayer, this.currentPlayer);
    //     }
    // }

    // public getLoadingFinishPlayerArr(){
    //     return this.loadingFinishPlayer;
    // }

    public initPlayerGamePos(isRealPlayer: AiOrPlayer, curplayer?: mw.Player, ai?: mw.Character) {
        let bornobj = this.defaultObj;
        if (GameGlobals.gameBornList.length > 0) {
            let index = Tools.getRandomInt(1, GameGlobals.gameBornList.length) - 1;
            bornobj = GameGlobals.gameBornList[index];
            GameGlobals.gameBornList.splice(index, 1);
        }
        let loc = new mw.Vector(bornobj.worldTransform.position.x, bornobj.worldTransform.position.y, bornobj.worldTransform.position.z + 80);
        if (isRealPlayer == AiOrPlayer.RealPlayer) {
            curplayer.character.worldTransform.position = loc;
            curplayer.character.driftControl = 1;
            curplayer.character.gravityScale = 3;
            curplayer.character.movementEnabled = true;
            curplayer.character.collisionWithOtherCharacterEnabled = true;
            if (curplayer.character.getCurrentState() != mw.CharacterStateType.Running) curplayer.character.changeState(mw.CharacterStateType.Running);
        }
        else {
            ai.worldTransform.position = loc;
        }
        //GameGlobals.gameBornList.splice(index, 1);
    }

    // public getLoadingFinishPlayerMap(){
    //     let res = new Map<number, boolean>();
    //     this.loadingFinishPlayer.forEach((value)=>{
    //         res.set(value, true);
    //     })
    //     return res;
    // }
    /**对局结束之后清空加载列表 */
    // public clearLoadingFinishPlayerArr(){
    //     this.loadingFinishPlayer.length = 0;
    // }
    /**玩家断线的时候用 */
    // public playerLeaveCheck(player: mw.Player){
    //     console.error("玩家断线前数组", this.loadingFinishPlayer.length);
    //     let playerId = player.playerId;
    //     this.loadingFinishPlayer = this.loadingFinishPlayer.filter((value)=>{
    //         return value != playerId;
    //     })
    //     console.error("玩家断线后数组", this.loadingFinishPlayer.length);

    // }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}