/*
 * @Author: your name
 * @Date: 2022-03-10 10:56:23
 * @LastEditTime: 2022-03-10 13:18:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\FSM_InitState.ts
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals, GamingState } from "../Globals";
import { IFSMState } from "./IFSMState";
/**
 * 还没有玩家进来的状态
 */
export default class FSM_InitState implements IFSMState {
    Enter(): void {
        oTraceError("fsm 0:EnterInitState");
        GameGlobals.curGameState = GamingState.InitState;
    }
    Exit(): void {

    }
}