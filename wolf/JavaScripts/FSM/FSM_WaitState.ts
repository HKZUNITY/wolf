import { GameGlobals, GamingState } from "../Globals";
import FSMModuleS from "../Module/FSMModule/FSMModuleS";
import { IFSMState } from "./IFSMState";
/**
 * 第一个玩家进来，且房间人数还没到开局的最小人数
 */
export default class FSM_WaitState implements IFSMState {
    Enter(): void {
        console.warn("fsm 1:EnterWaitState");
        GameGlobals.curGameState = GamingState.WaitingState;
        ModuleService.getModule(FSMModuleS).waitEnterCheck();
    }
    Exit(): void {

    }
} 