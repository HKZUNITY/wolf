import { GameGlobals, GamingState } from "../Globals";
import { ChooseModuleS } from "../Module/ProcModule/ChooseModule";
import { IFSMState } from "./IFSMState";
/**
 * 选择人物的状态
 */
export default class FSM_ChooseState implements IFSMState {
    private count: number = 0;
    Enter(): void {
        console.warn("fsm 4:EnterChooseState");
        GameGlobals.curGameState = GamingState.ChooseState;
        ModuleService.getModule(ChooseModuleS).allotProcess();
    }
    Exit(): void {

    }
} 