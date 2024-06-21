/*
* @Author: your name
* @Date: 2022-03-10 10:56:23
 * @LastEditTime: 2022-03-17 11:04:31
 * @LastEditors: Please set LastEditors
* @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
* @FilePath: \JavaScripts\FSM\FSM_InitState.ts
*/
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals, GamingState } from "../Globals";
import { ChooseModuleS } from "../Module/ProcModule/ChooseModule";
import { IFSMState } from "./IFSMState";
/**
 * 选择人物的状态
 */
export default class FSM_ChooseState implements IFSMState {
    private count: number = 0;
    Enter(): void {
        oTraceError("fsm 4:EnterChooseState");
        GameGlobals.curGameState = GamingState.ChooseState;
        ModuleService.getModule(ChooseModuleS).allotProcess();
    }
    Exit(): void {

    }
} 