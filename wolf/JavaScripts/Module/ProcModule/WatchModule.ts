import { AiObject } from "../../AI/AiObject";
import P_Tips from "../../CommonUI/P_Tips";
import { Camp, GameGlobals, GamingState } from "../../Globals";
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import P_Die from "../../UILogic/Game/P_Die";
import P_Game from "../../UILogic/Game/P_Game";
import P_GameFinal from "../../UILogic/Game/P_GameFinal";
import P_Hall from "../../UILogic/Hall/P_Hall";
import P_Default from "../../UILogic/P_Default";
import Game_HUD_Chat_Generate from "../../ui-generate/uiTemplate/bubbleModule/Game_HUD_Chat_generate";
import { GameModuleData } from "../GameModule/GameData";
import { GameModuleS } from "../GameModule/GameModuleS";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";

export class WatchModuleC extends ModuleC<WatchModuleS, null> {
    private curPlayer: mw.Player;
    private ui: P_Default;
    private initialCameraInfo: mw.Transform;
    private watchObj: mw.GameObject;
    private myCamera: Camera;
    private cameraTransform: mw.Transform;
    onEnterScene(sceneType: number): void {
        this.curPlayer = Player.localPlayer;
        this.ui = mw.UIService.getUI(P_Default);
        this.initialCameraInfo = Camera.currentCamera.localTransform.clone().clone();
        this.myCamera = Camera.currentCamera;
        this.cameraTransform = new mw.Transform(Vector.zero, Rotation.zero, Vector.one);
    }

    protected onUpdate(dt: number): void {
        if (this.watchObj && this.watchObj.worldTransform.position && this.myCamera) {
            let targetLoc = this.watchObj.worldTransform.position;
            this.cameraTransform.position = targetLoc;
            this.myCamera.springArm.worldTransform = this.cameraTransform;
        }
    }

    public changeWatchTarget(target: mw.GameObject) {
        this.watchObj = target;
    }

    watchOther() {//点击观战
        this.server.net_BeginWatch(0, this.curPlayer.playerId);

    }
    net_EndWatch() {
        this.changeWatchTarget(this.localPlayer.character);
        P_GameFinal.closeGameFinal();
        P_Game.closeGameUI();
        P_Hall.showHallUI();
        P_Die.closeDieEffecUI();
        ModuleService.getModule(PlayerModuleC).exitWatch()
        mw.UIService.show(Game_HUD_Chat_Generate);
        this.server.net_EndWatch();
        this.joyOpen(true);
    }

    net_EndWatchByServer() {
        this.changeWatchTarget(this.curPlayer.character);
        P_GameFinal.closeGameFinal();
        P_Game.closeGameUI();
        P_Hall.showHallUI();
        ModuleService.getModule(PlayerModuleC).exitWatch()
        P_Die.closeDieEffecUI();
        this.joyOpen(true);
    }
    /**-1:left,1:right */
    changeWatch(dir: number) {
        this.server.net_BeginWatch(dir, this.curPlayer.playerId);
    }
    net_WatchOther(id: string, camp: number, showNum: number, total: number, name: string) {
        ModuleService.getModule(PlayerModuleC).enterWatch()
        mw.UIService.hide(Game_HUD_Chat_Generate);
        console.warn("客户端：开始观战");
        GameObject.asyncFindGameObjectById(id).then(go => {
            if (go) {
                this.changeWatchTarget(go);
                P_Hall.closeHallUI();
                P_Game.showWatch(camp, showNum, total, name);
                this.joyOpen(false);
            }
        })
    }

    joyOpen(bool: boolean) {
        if (bool) {
            this.ui.mMWVirtualJoystickPanelDesigner.visibility = mw.SlateVisibility.Visible;
            this.ui.mMWVirtualJoystickPanelDesigner.resetJoyStick();
        } else {
            this.ui.mMWVirtualJoystickPanelDesigner.visibility = mw.SlateVisibility.Collapsed;
        }

    }

    net_RpcDieEffect() {
        P_Die.showDieEffectUI();
    }
    net_RpcFinalEffect(isWin: boolean) {
        P_GameFinal.showGameFinal(isWin);
    }
    net_ShowTips(id: number) {
        let str = GameConfig.Tips.getElement(id).Content;
        P_Tips.show(str);
    }
}
export class WatchModuleS extends ModuleS<WatchModuleC, null> {
    private watchMap: Map<number, mw.Player> = new Map<number, mw.Player>();
    private watchAiMap: Map<number, AiObject> = new Map<number, AiObject>();
    cleanMap() {
        this.watchMap.forEach((watch, own) => {
            this.watchMap.delete(own);
            this.getClient(Player.getPlayer(own)).net_EndWatchByServer();
        })
        this.watchAiMap.forEach((watch, own) => {
            this.watchAiMap.delete(own);
            this.getClient(Player.getPlayer(own)).net_EndWatchByServer();
        })
    }
    rpcToWatch(kind: number) {
        this.watchMap.forEach((watch, own) => {
            console.warn("rpcToWatch:" + own);
            this.net_BeginWatch(kind, own);
        })
        this.watchAiMap.forEach((watch, own) => {
            this.net_BeginWatch(kind, own);
        })
    }
    /**0：死亡，1：胜利，2：失败 */
    rpcEffect(watcherObj: mw.GameObject, kind: number) {
        if (PlayerManagerExtesion.isNpc(watcherObj)) {
            let watcher = Tools.getAiObject(watcherObj as mw.Character);
            this.watchAiMap.forEach((watch, own) => {
                if (watch == watcher) {
                    switch (kind) {
                        case 0:
                            this.getClient(Player.getPlayer(own)).net_RpcDieEffect();
                            break;
                        case 1:
                            this.getClient(Player.getPlayer(own)).net_RpcFinalEffect(true);
                            break;
                        case 2:
                            this.getClient(Player.getPlayer(own)).net_RpcFinalEffect(false);
                            break;
                    }

                }
            })
        }
        else {
            let watcher = (watcherObj as mw.Character).player;
            this.watchMap.forEach((watch, own) => {
                if (watch == watcher) {
                    switch (kind) {
                        case 0:
                            this.getClient(Player.getPlayer(own)).net_RpcDieEffect();
                            break;
                        case 1:
                            this.getClient(Player.getPlayer(own)).net_RpcFinalEffect(true);
                            break;
                        case 2:
                            this.getClient(Player.getPlayer(own)).net_RpcFinalEffect(false);
                            break;
                    }

                }
            })
        }

    }
    someoneDieOnWatch(dieObj: mw.GameObject) {
        if (PlayerManagerExtesion.isNpc(dieObj)) {
            let die = Tools.getAiObject(dieObj as mw.Character);;
            this.watchAiMap.forEach((watch, own) => {
                if (watch == die) {
                    this.net_BeginWatch(0, own);
                }
            })
        }
        else {
            let die = (dieObj as mw.Character).player;
            this.watchMap.forEach((watch, own) => {
                if (watch == die) {
                    this.net_BeginWatch(0, own);
                }
            })
        }

    }
    net_BeginWatch(dir: number, player: number) {
        if (GameGlobals.curGameState != GamingState.GamingState || GameGlobals.dieNum == GameGlobals.startMax - 1) {
            //提示当前不可观战
            this.getClient(Player.getPlayer(player)).net_ShowTips(20001);
            return;
        }
        if ((GameGlobals.livePlayers.length + GameGlobals.liveAi.length) <= 1) {
            //this.cleanMap();
            return;
        }
        let watchePlayer: mw.GameObject;
        let isReal: boolean = true;
        if (dir == 0) {
            if (GameGlobals.livePlayers.length >= 1) {
                watchePlayer = GameGlobals.livePlayers[0].character;
                this.watchMap.set(player, (watchePlayer as mw.Character).player);
                this.watchAiMap.delete(player);
            }
            else {
                watchePlayer = GameGlobals.liveAi[0].aiModel;
                isReal = false;
                this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                this.watchMap.delete(player);
            }
        }
        else if (dir == 2) {
            if (this.watchMap.get(player) != undefined) {
                watchePlayer = this.watchMap.get(player).character;
                this.watchMap.set(player, (watchePlayer as mw.Character).player);
                this.watchAiMap.delete(player);
            }
            else {
                watchePlayer = this.watchAiMap.get(player).aiModel;
                isReal = false;
                this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                this.watchMap.delete(player);
            }
        }
        else {
            if (this.watchMap.get(player) != undefined) {
                let curwatch = this.watchMap.get(player);
                let index = 0;
                for (let p of GameGlobals.livePlayers) {
                    if (p == curwatch) break;
                    index++;
                }
                if (dir == -1 && index - 1 < 0) {
                    if (GameGlobals.liveAi.length == 0) {
                        index = GameGlobals.livePlayers.length - 1;
                        watchePlayer = GameGlobals.livePlayers[index].character;
                        this.watchMap.set(player, (watchePlayer as mw.Character).player);
                        this.watchAiMap.delete(player);
                    }
                    else {
                        index = GameGlobals.liveAi.length - 1;
                        watchePlayer = GameGlobals.liveAi[index].aiModel;
                        isReal = false;
                        this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                        this.watchMap.delete(player);
                    }
                } else if (dir == -1) {
                    index--;
                    watchePlayer = GameGlobals.livePlayers[index].character;
                    this.watchMap.set(player, (watchePlayer as mw.Character).player);
                    this.watchAiMap.delete(player);
                }
                if (dir == 1 && index + 1 > GameGlobals.livePlayers.length - 1) {
                    if (GameGlobals.liveAi.length == 0) {
                        index = 0;
                        watchePlayer = GameGlobals.livePlayers[index].character;
                        this.watchMap.set(player, (watchePlayer as mw.Character).player);
                        this.watchAiMap.delete(player);
                    }
                    else {
                        index = 0;
                        watchePlayer = GameGlobals.liveAi[index].aiModel;
                        isReal = false;
                        this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                        this.watchMap.delete(player);
                    }
                }
                else if (dir == 1) {
                    index++;
                    watchePlayer = GameGlobals.livePlayers[index].character;
                    this.watchMap.set(player, (watchePlayer as mw.Character).player);
                    this.watchAiMap.delete(player);
                }

            }
            else if (this.watchAiMap.get(player) != undefined) {
                let curwatch = this.watchAiMap.get(player);
                let index = 0;
                for (let p of GameGlobals.liveAi) {
                    if (p == curwatch) break;
                    index++;
                }
                if (dir == -1 && index - 1 < 0) {
                    if (GameGlobals.livePlayers.length == 0) {
                        index = GameGlobals.liveAi.length - 1;
                        watchePlayer = GameGlobals.liveAi[index].aiModel;
                        isReal = false;
                        this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                        this.watchMap.delete(player);
                    }
                    else {
                        index = GameGlobals.livePlayers.length - 1;
                        watchePlayer = GameGlobals.livePlayers[index].character;
                        this.watchMap.set(player, (watchePlayer as mw.Character).player);
                        this.watchAiMap.delete(player);
                    }
                } else if (dir == -1) {
                    index--;
                    watchePlayer = GameGlobals.liveAi[index].aiModel;
                    isReal = false;
                    this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                    this.watchMap.delete(player);
                }
                if (dir == 1 && index + 1 > GameGlobals.liveAi.length - 1) {
                    if (GameGlobals.livePlayers.length == 0) {
                        index = 0;
                        watchePlayer = GameGlobals.liveAi[index].aiModel;
                        isReal = false;
                        this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                        this.watchMap.delete(player);
                    }
                    else {
                        index = 0;
                        watchePlayer = GameGlobals.livePlayers[index].character;
                        this.watchMap.set(player, (watchePlayer as mw.Character).player);
                        this.watchAiMap.delete(player);
                    }
                }
                else if (dir == 1) {
                    index++;
                    watchePlayer = GameGlobals.liveAi[index].aiModel;
                    isReal = false;
                    this.watchAiMap.set(player, Tools.getAiObject(watchePlayer as mw.Character));
                    this.watchMap.delete(player);
                }

            }

        }
        let camp;
        let showNum;
        if (!watchePlayer) {
            return;
        }
        if (isReal) {
            camp = DataCenterS.getData((watchePlayer as mw.Character).player, GameModuleData).getPlayerCamp();
            showNum = DataCenterS.getData((watchePlayer as mw.Character).player, GameModuleData).getPropNum();
        }
        else {
            camp = Tools.getAiObject(watchePlayer as mw.Character).camp;
            showNum = Tools.getAiObject(watchePlayer as mw.Character).aiPropNum;
        }
        switch (camp) {
            case Camp.Civilian:
                showNum = showNum;
                break;
            case Camp.Hero:
                showNum = 0;
                break;
            case Camp.Police:
                showNum = 0;
                break;
            case Camp.Spy:
                showNum = GameGlobals.dieNum;
                break;
        }
        let name: string;
        if (PlayerManagerExtesion.isCharacter(watchePlayer)) {
            name = watchePlayer.displayName;
        } else if (PlayerManagerExtesion.isNpc(watchePlayer)) {
            let npc = watchePlayer as mw.Character;
            name = Tools.getAiObject(npc).aiName;
        }
        ModuleService.getModule(GameModuleS).showRoleNum();
        this.getClient(Player.getPlayer(player)).net_WatchOther(watchePlayer.gameObjectId, camp, showNum, GameGlobals.startMax - 1, name);
    }
    net_EndWatch() {
        this.watchMap.delete(this.currentPlayer.playerId);
        this.watchAiMap.delete(this.currentPlayer.playerId);
        console.warn("玩家主动停止观战")
    }
    deleteLeavePlayer(player: mw.Player) {
        if (this.watchMap.get(player.playerId) != undefined) {
            console.warn("将该玩家移除观战")
        }
        this.watchMap.delete(player.playerId);
        this.watchAiMap.delete(player.playerId);
    }
}