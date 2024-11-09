import FSM_CalculateState from "../../FSM/FSM_CalculateState";
import FSM_GamingState from "../../FSM/FSM_GamingState";
import FSM_InitState from "../../FSM/FSM_InitState";
import FSM_LoadingGameState from "../../FSM/FSM_LoadingState";
import { FSM_MapState } from "../../FSM/FSM_MapState";
import FSM_ReadyState from "../../FSM/FSM_ReadyState";
import FSM_WaitState from "../../FSM/FSM_WaitState";
import FSMManager from "../../FSM/FSMManager";
import { GameCache } from "../../GameCache";
import { GameGlobals, GamingState, Globals, PlayerGameState } from "../../Globals";
import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { BagModuleS } from "../BagModule/BagModuleS";
import { GameModuleS } from "../GameModule/GameModuleS";
import { MapModuleS } from "../GameModule/MapModule";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { WatchModuleS } from "../ProcModule/WatchModule";
import ShelterModuleS from "../shelterModule/ShelterModuleS";
import ShopModuleS from "../ShopModule/ShopModuleS";
import { SkillModuleS } from "../SkillModule/SkillModuleS";
import AttributeManager from "../SVipModule/AttributeManager";
import { AutoAimModuleS } from "../Weapon/Aim/AutoAimModuleS";
import { ColdWeaponModuleS } from "../Weapon/ColdWeapon/ColdWeaponModuleS";
import FSMModuleC from "./FSMModuleC";

export default class FSMModuleS extends ModuleS<FSMModuleC, null> {
    private _STimer: number;
    onStart(): void {
        FSMManager.Instance.ChangeState(FSM_InitState);
        DataCenterS.onPlayerJoin.add((player) => {
            //调用player模块，进行数据初始化
            ModuleService.getModule(PlayerModuleS).initPlayerData(player);
        }, this);
        DataCenterS.onPlayerLeave.add((player) => {
            try {
                this.playerLeaveCheck(player);
            }
            catch (e) {
                throw new console.error(e);
            }
        }, this);
    }

    /**游戏进程控制部分逻辑 */
    public beginReadyTime(time: number) {
        TimeUtil.clearInterval(this._STimer);
        this._STimer = TimeUtil.setInterval(() => {
            if (GameGlobals.curGameState != GamingState.ReadyState) {
                TimeUtil.clearInterval(this._STimer);
                return;
            }
            if (time == 0) {
                FSMManager.Instance.ChangeState(FSM_MapState);
            }
            else if (time > 0) {
                time--;
                this.updateReadyTime(time);
            }
        }, 1)
    }
    public beginChooseTime(time: number) {
        TimeUtil.clearInterval(this._STimer);
        this._STimer = TimeUtil.setInterval(() => {
            if (GameGlobals.curGameState != GamingState.MapState) {
                TimeUtil.clearInterval(this._STimer);
                return;
            }
            if (time == 0) {
                if (GameGlobals.curGameState == GamingState.MapState) {
                    FSMManager.Instance.ChangeState(FSM_LoadingGameState);
                }
            }
            else if (time > 0) {
                time--;
                if (time >= 2) {
                    this.updateMapTime(time - 2);
                }
                this.updateReadyTime(time);
            }
        }, 1)
    }
    updateMapTime(time: number) {
        GameGlobals.readyPlayers.forEach((player) => {
            this.getClient(player).net_UpdateMapTime(time);
        })
        if (time == 0) {
            //临时注掉
            ModuleService.getModule(MapModuleS).getFinalMap();
        }
    }
    updateGameTime(curtime: number) {
        if (GameGlobals.curGameState == GamingState.GamingState) {
            GameGlobals.currentAllPlayers.forEach((player) => {
                this.getClient(player).net_UpdateGameTime(curtime, GameGlobals.curGameState);
            })
        } else {
            GameGlobals.readyPlayers.forEach((player) => {
                this.getClient(player).net_UpdateGameTime(curtime, GameGlobals.curGameState);
            })
        }
    }
    updateReadyTime(curtime: number) {
        GameGlobals.currentAllPlayers.forEach((player) => {
            this.getClient(player).net_UpdateHallTime(curtime);
        })
    }
    public beginGameReadyTime(time: number) {
        TimeUtil.clearInterval(this._STimer);
        this._STimer = TimeUtil.setInterval(() => {
            if (GameGlobals.curGameState != GamingState.GameReadyState) {
                TimeUtil.clearInterval(this._STimer);
                return;
            }
            if (time == 0) {
                FSMManager.Instance.ChangeState(FSM_GamingState);
            }
            else if (time > 0) {
                time--;
                this.updateGameTime(time);
            }
        }, 1)
    }

    // private checkSpecialRoleEnterGame(){
    //     let enterMap = ModuleService.getModule(LoadMapModuleS).getLoadingFinishPlayerMap();
    //     let spyEnterGame = GameGlobals.spyPlayer? enterMap.has(GameGlobals.spyPlayer.playerId): true;
    //     let policeEnterGame = GameGlobals.policePlayer? enterMap.has(GameGlobals.policePlayer.playerId): true;
    //     if(spyEnterGame && policeEnterGame){
    //         return true;
    //     }
    //     return false;
    // }

    public beginGameTime(time: number) {
        TimeUtil.clearInterval(this._STimer);
        this._STimer = TimeUtil.setInterval(() => {
            if (GameGlobals.curGameState != GamingState.GamingState) {
                TimeUtil.clearInterval(this._STimer);
                return;
            }
            if (time == 0) {
                FSM_CalculateState.timeIsOut = true;
                FSMManager.Instance.ChangeState(FSM_CalculateState);
                // FSMManager.Instance.ChangeState(FSM_GamingFinish);
            }
            else if (time > 0) {
                time--;
                this.updateGameTime(time);
            }
        }, 1)
    }

    public beginGameEnd(time: number) {
        TimeUtil.clearInterval(this._STimer);
        GameGlobals.currentAllPlayers.forEach((player) => {
            if (GameGlobals.terminatorPlayer) {
                if (GameGlobals.terminatorPlayer.playerId == player.playerId) return;
            }
            this.getClient(player).net_showBlack(Globals.blackTime);
        });
        this._STimer = TimeUtil.setInterval(() => {
            if (GameGlobals.curGameState != GamingState.GamingFinish) {
                TimeUtil.clearInterval(this._STimer);
                return;
            }
            if (time == 0) {
                // FSM_CalculateState.timeIsOut = true;
                FSMManager.Instance.ChangeState(FSM_CalculateState);
                GameGlobals.currentAllPlayers.forEach((player) => {
                    if (GameGlobals.terminatorPlayer) {
                        if (GameGlobals.terminatorPlayer.playerId == player.playerId) return;
                    }
                    this.getClient(player).net_showBlack(Globals.blackTime);
                });
            }
            else if (time > 0) {
                time--;
            }
        }, 1)
    }

    public waitEnterCheck() {
        if (GameGlobals.curGameState != GamingState.WaitingState) {
            return;
        }
        // if (GameGlobals.currentAllPlayers.length >= Globals.startMin && GameGlobals.currentAllPlayers.length <= Globals.startMax) {
        //     FSMManager.Instance.ChangeState(FSM_ReadyState);
        // } else {
        //     //更新大厅人数
        //     ModuleService.getModule(PlayerModuleS).updateHallWaitNum();
        // }

        if (GameGlobals.currentAllPlayers.length >= Globals.startMin) {
            FSMManager.Instance.ChangeState(FSM_ReadyState);
        }
        //清除终结者数据
        GameGlobals.isTerminatorReal = null;
        GameGlobals.terminatorPlayer = null;
        GameGlobals.terminatorAI = null;
    }

    /**玩家离开部分的逻辑 */
    public playerLeaveCheck(player: mw.Player) {
        GameGlobals.currentAllPlayers = GameGlobals.currentAllPlayers.filter(item => item.playerId != player.playerId);
        GameGlobals.readyPlayers = GameGlobals.readyPlayers.filter(item => item.playerId != player.playerId);
        GameGlobals.hallPlayer = GameGlobals.hallPlayer.filter(item => item.playerId != player.playerId);
        GameGlobals.enterGameNormalPlayers = GameGlobals.enterGameNormalPlayers.filter(item => item.playerId != player.playerId);
        ModuleService.getModule(ColdWeaponModuleS).playerLeaveOnWeapon(player);
        AttributeManager.instance.deleteAttribute(player.playerId);
        ModuleService.getModule(BagModuleS).playerLeaveOnWeapon(player);
        ModuleService.getModule(GameModuleS).removeCoverEffect(player);
        ModuleService.getModule(WatchModuleS).deleteLeavePlayer(player);
        ModuleService.getModule(ShopModuleS).clearShopItem(player.playerId);
        ModuleService.getModule(PlayerModuleS).playerLeave(player.playerId)
        ModuleService.getModule(AutoAimModuleS).playerLeaveGame(player)
        ModuleService.getModule(GameModuleS).clearPlayerActionInfo(player.playerId);
        ModuleService.getModule(SkillModuleS).deleteOnPlayerSkill(player.playerId);
        if (GameGlobals.curGameState == GamingState.InitState) {
            this.initPlayerCheck();
        } else if (GameGlobals.curGameState == GamingState.WaitingState) {
            this.waitingPlayerCheck();
        } else if (GameGlobals.curGameState == GamingState.ReadyState) {
            this.readyPlayerCheck();
        } else if (GameGlobals.curGameState == GamingState.InitGameState) {
            this.initGamePlayerCheck();
        } else if (GameGlobals.curGameState == GamingState.ChooseState) {
            this.choosePlayerCheck(player);
        } else if (GameGlobals.curGameState == GamingState.GameReadyState) {
            this.gameReadyPlayerCheck(player);
        } else if (GameGlobals.curGameState == GamingState.GamingState) {
            this.gamingPlayerCheck(player);
        } else if (GameGlobals.curGameState == GamingState.CalculateState) {
            this.calculatePlayerCheck(player);
        } else if (GameGlobals.curGameState == GamingState.GamingFinish) {
            this.gameEndPlayerCheck(player);
        }
    }
    public net_CheckIsReConnect() {
        GameGlobals.currentAllPlayers.forEach((player) => {
            if (player.playerId == this.currentPlayer.playerId) {
                PlayerManagerExtesion.stopStanceExtesion(this.currentPlayer.character,);
                // this.currentPlayer.character.displayName = "";
                this.playerLeaveCheck(player);
                ModuleService.getModule(PlayerModuleS).initReconnectPos(this.currentPlayer);
                this.currentPlayer.character.jump();
            }
        })
        ModuleService.getModule(PlayerModuleS).enterHall(this.currentPlayer);
    }
    private initPlayerCheck() {

    }
    private waitingPlayerCheck() {
        ModuleService.getModule(PlayerModuleS).updateHallWaitNum();
    }
    private readyPlayerCheck() {
        if (GameGlobals.currentAllPlayers.length >= Globals.startMin) {
            return;
        }
        //FSMManager.Instance.ChangeState(FSM_WaitState);
    }
    private initGamePlayerCheck() {
        if (GameGlobals.currentAllPlayers.length >= Globals.startMin) {
            return;
        }
        FSMManager.Instance.ChangeState(FSM_WaitState);
        GameGlobals.readyPlayers.forEach((player) => {
            ModuleService.getModule(PlayerModuleS).playerBackToHall(player, GamingState.WaitingState);
        })
        ModuleService.getModule(ShelterModuleS).setActive(false);
    }
    private choosePlayerCheck(player: mw.Player) {
        this.setPlayerLeave(player);
    }
    private gameReadyPlayerCheck(player: mw.Player) {
        this.setPlayerLeave(player);
    }
    private gamingPlayerCheck(player: mw.Player) {
        console.warn("FSM游戏中有玩家离开" + player.playerId);
        this.setPlayerLeave(player);
        ModuleService.getModule(GameModuleS).playerLeave(player);
    }
    private setPlayerLeave(player: mw.Player) {
        console.warn("暂时存储玩家数据1")
        //将玩家游戏数据置为离开
        GameCache.gamePlayersInfo.forEach((info) => {
            if (info.playerId == player.playerId) {
                info.state = PlayerGameState.Leave;
                console.warn("暂时存储玩家数据2")
            }
        })
    }
    private calculatePlayerCheck(player: mw.Player) {
        this.setPlayerLeave(player);
    }

    private gameEndPlayerCheck(player: mw.Player): void {
        console.warn("FSM游戏结束中有玩家离开" + player.playerId);
        this.setPlayerLeave(player);
        ModuleService.getModule(GameModuleS).playerLeave(player);
        ModuleService.getModule(GameModuleS).playerLeaveCampCheck(player);
    }
}