/*
* @Author: your name
* @Date: 2022-03-10 10:56:23
 * @LastEditTime: 2022-03-18 15:03:51
 * @LastEditors: Please set LastEditors
* @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
* @FilePath: \JavaScripts\FSM\FSM_InitState.ts
*/
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { FSMModuleS } from "../Module/FSMModule";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import { IFSMState } from "./IFSMState";
/**
 * 即将开始游戏，倒计时提示
 */
export default class FSM_ReadyState implements IFSMState {
    Enter(): void {
        oTraceError("fsm 2:EnterReadyState");
        GameGlobals.curGameState = GamingState.ReadyState;
        GameGlobals.readyPlayers.splice(0, GameGlobals.readyPlayers.length);
        GameGlobals.currentAllPlayers.forEach((player) => {
            GameGlobals.readyPlayers.push(player);
        })
        ModuleService.getModule(FSMModuleS).beginReadyTime(Globals.readyTime);
        ModuleService.getModule(PlayerModuleS).updateHallTip(GamingState.ReadyState);
    }
    Exit(): void {

    }
}