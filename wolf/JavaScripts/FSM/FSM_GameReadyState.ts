/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-10 14:08:36
 * @FilePath     : \murdermystery3\JavaScripts\FSM\FSM_GameReadyState.ts
 * @Description  : 修改描
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { FSMModuleS } from "../Module/FSMModule";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { IFSMState } from "./IFSMState";
import { SkillModuleS } from "../Module/SkillModule/SkillModuleS";
/**
 * 游戏状态
 */
export default class FSM_GameReadyState implements IFSMState {
    Enter(): void {
        oTraceError("fsm 5:EnterGameReadyState");
        GameGlobals.curGameState = GamingState.GameReadyState;
        ModuleService.getModule(GameModuleS).showRoleNum();
        ModuleService.getModule(SkillModuleS).createSkill();
        ModuleService.getModule(FSMModuleS).beginGameReadyTime(Globals.gameReadyTime);
        ModuleService.getModule(GameModuleS).gameReady();
    }
    Exit(): void {

    }
}  