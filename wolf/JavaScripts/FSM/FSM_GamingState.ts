import { AiModuleS } from "../AI/AiModule";
import { GameGlobals, GamingState, Globals } from "../Globals";
import FSMModuleS from "../Module/FSMModule/FSMModuleS";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import FSM_CalculateState from "./FSM_CalculateState";
import { IFSMState } from "./IFSMState";
/**
 * 游戏状态
 */
export default class FSM_GamingState implements IFSMState {
    Enter(): void {
        console.warn("fsm 6:EnterGamingState");
        GameGlobals.curGameState = GamingState.GamingState;
        GameGlobals.livePlayers.splice(0, GameGlobals.livePlayers.length);
        GameGlobals.readyPlayers.forEach((player) => {
            GameGlobals.livePlayers.push(player);
        })
        GameGlobals.liveAi.splice(0, GameGlobals.liveAi.length);
        GameGlobals.aiPlayer.forEach((obj) => {
            GameGlobals.liveAi.push(obj);
        })
        FSM_CalculateState.timeIsOut = false;
        ModuleService.getModule(FSMModuleS).beginGameTime(Globals.gameTime);
        ModuleService.getModule(GameModuleS).gameBegin();
        ModuleService.getModule(GameModuleS).initProp();
        ModuleService.getModule(AiModuleS).aiStartGame();
    }
    Exit(): void {

    }
}  