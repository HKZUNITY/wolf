import { AiModuleS } from "../AI/AiModule";
import { GameGlobals, GamingState } from "../Globals";
import { BagModuleS } from "../Module/BagModule/BagModuleS";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { CalculateModuleS } from "../Module/ProcModule/CalculateModule";
import { SceneModuleS } from "../Module/ProcModule/SceneModule";
import { WatchModuleS } from "../Module/ProcModule/WatchModule";
import FSMManager from "./FSMManager";
import FSM_GamingFinish from "./FSM_GamingFinish";
import FSM_WaitState from "./FSM_WaitState";
import { IFSMState } from "./IFSMState";
/**
 * 游戏状态
 */
export default class FSM_CalculateState implements IFSMState {
    public static timeIsOut: boolean = false;
    Enter(): void {
        console.warn("fsm 9:EnterCalculateState");
        if (FSM_GamingFinish.runFinsh == true) {
            ModuleService.getModule(GameModuleS).curStateCheck(false);
        }

        GameGlobals.curGameState = GamingState.CalculateState;
        ModuleService.getModule(GameModuleS).removeAllProp();
        ModuleService.getModule(SceneModuleS).resetBoxLocation(new mw.Vector(-200, -200, -400));
        ModuleService.getModule(GameModuleS).finalTip(FSM_CalculateState.timeIsOut);
        ModuleService.getModule(BagModuleS).clearAuto();

        setTimeout(() => {
            ModuleService.getModule(SceneModuleS).resetBoxLocation(new mw.Vector(-200, -200, -400));
            ModuleService.getModule(CalculateModuleS).gameCalculate(FSM_CalculateState.timeIsOut);
            ModuleService.getModule(WatchModuleS).cleanMap();
            ModuleService.getModule(GameModuleS).removeAllDeathModel();
            ModuleService.getModule(AiModuleS).removeAllDeathModel();
            ModuleService.getModule(AiModuleS).resetAi();
        }, 6000);
        setTimeout(() => {
            FSMManager.Instance.ChangeState(FSM_WaitState);
        }, 6200);
        FSM_GamingFinish.runFinsh = false;
    }
    Exit(): void {

    }
}  
