/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-18 10:27:45
 * @FilePath     : \murdermystery3\JavaScripts\FSM\FSM_GamingFinish.ts
 * @Description  : 修改描述
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { BagModuleS } from "../Module/BagModule/BagModuleS";
import { FSMModuleS } from "../Module/FSMModule";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { WatchModuleS } from "../Module/ProcModule/WatchModule";
import FSM_CalculateState from "./FSM_CalculateState";
import { IFSMState } from "./IFSMState";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import { SkillModuleS } from "../Module/SkillModule/SkillModuleS";

export default class FSM_GamingFinish implements IFSMState {
    /**是否展示中 默认false 启动true */
    public static runFinsh: boolean = false;
    Enter(): void {
        oTraceError("fsm 8:GamingFinish === Enter");
        GameGlobals.curGameState = GamingState.GamingFinish;
        FSM_GamingFinish.runFinsh = true;
        FSM_CalculateState.timeIsOut = false;
        ModuleService.getModule(WatchModuleS).cleanMap();
        ModuleService.getModule(BagModuleS).clearAuto();
        ModuleService.getModule(GameModuleS).curStateCheck(true);
        ModuleService.getModule(FSMModuleS).beginGameEnd(Globals.gameEndTime);
        //隐藏等级ui
        ModuleService.getModule(PlayerModuleS).enterFinishWatch()
        //取消技能
        ModuleService.getModule(SkillModuleS).deleteSkill();
        ModuleService.getModule(SkillModuleS).deleteAllBoomUI();
    }
    Exit(): void {
        //显示等级ui
        ModuleService.getModule(PlayerModuleS).exitFinishWatch()
    }

}