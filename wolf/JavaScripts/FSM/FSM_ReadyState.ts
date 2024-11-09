import { GameGlobals, GamingState, Globals } from "../Globals";
import FSMModuleS from "../Module/FSMModule/FSMModuleS";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import { IFSMState } from "./IFSMState";
/**
 * 即将开始游戏，倒计时提示
 */
export default class FSM_ReadyState implements IFSMState {
    Enter(): void {
        console.warn("fsm 2:EnterReadyState");
        GameGlobals.curGameState = GamingState.ReadyState;
        GameGlobals.readyPlayers.splice(0, GameGlobals.readyPlayers.length);
        GameGlobals.currentAllPlayers.forEach((player) => {
            GameGlobals.readyPlayers.push(player);
        })
        ModuleService.getModule(FSMModuleS).beginReadyTime(Globals.readyTime);
        ModuleService.getModule(PlayerModuleS).updateHallTip(GamingState.ReadyState);
    }
    Exit(): void {

    }
}