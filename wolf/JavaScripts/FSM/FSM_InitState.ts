import { GameGlobals, GamingState } from "../Globals";
import { IFSMState } from "./IFSMState";
/**
 * 还没有玩家进来的状态
 */
export default class FSM_InitState implements IFSMState {
    Enter(): void {
        console.warn("fsm 0:EnterInitState");
        GameGlobals.curGameState = GamingState.InitState;
    }
    Exit(): void {

    }
}