/*
 * @Author: your name
 * @Date: 2022-03-10 10:56:23
 * @LastEditTime: 2022-03-17 11:06:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\FSM_InitState.ts
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals, GamingState } from "../Globals";
import { FSMModuleS } from "../Module/FSMModule";
import { IFSMState } from "./IFSMState";
/**
 * 第一个玩家进来，且房间人数还没到开局的最小人数
 */
export default class FSM_WaitState implements IFSMState {
    Enter(): void {
        oTraceError("fsm 1:EnterWaitState");
        GameGlobals.curGameState = GamingState.WaitingState;
        ModuleService.getModule(FSMModuleS).waitEnterCheck();
    }
    Exit(): void {

    }
} 