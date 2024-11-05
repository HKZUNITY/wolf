import { GameGlobals, GamingState, Globals } from "../Globals";
import { FSMModuleS } from "../Module/FSMModule";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { SkillModuleS } from "../Module/SkillModule/SkillModuleS";
import { IFSMState } from "./IFSMState";
/**
 * 游戏状态
 */
export default class FSM_GameReadyState implements IFSMState {
    Enter(): void {
        console.warn("fsm 5:EnterGameReadyState");
        GameGlobals.curGameState = GamingState.GameReadyState;
        ModuleService.getModule(GameModuleS).showRoleNum();
        ModuleService.getModule(SkillModuleS).createSkill();
        ModuleService.getModule(FSMModuleS).beginGameReadyTime(Globals.gameReadyTime);
        ModuleService.getModule(GameModuleS).gameReady();
    }
    Exit(): void {

    }
}  