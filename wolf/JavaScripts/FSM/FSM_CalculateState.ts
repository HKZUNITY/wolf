/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-31 13:08:41
 * @FilePath     : \murdermystery3\JavaScripts\FSM\FSM_CalculateState.ts
 * @Description  : 修改描述
 */
/*
* @Author: your name
* @Date: 2022-03-10 10:56:23
 * @LastEditTime: 2022-09-22 15:11:34
 * @LastEditors: ziwei.shen
* @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \townmystery\JavaScripts\FSM\FSM_CalculateState.ts
*/
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { AiModuleS } from "../AI/AiModule";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { BagModuleS } from "../Module/BagModule/BagModuleS";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { CalculateModuleS } from "../Module/ProcModule/CalculateModule";
import { SceneModuleS } from "../Module/ProcModule/SceneModule";
import { WatchModuleS } from "../Module/ProcModule/WatchModule";
import FSMManager from "./FSMManager";
import FSM_GamingFinish from "./FSM_GamingFinish";
import FSM_WaitState from "./FSM_WaitState";
import { IFSMState } from "./IFSMState";
import LoadMapModuleS from "../Module/loadMapModule/LoadMapModuleS";
/**
 * 游戏状态
 */
export default class FSM_CalculateState implements IFSMState {
    public static timeIsOut: boolean = false;
    Enter(): void {
        oTraceError("fsm 9:EnterCalculateState");
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
