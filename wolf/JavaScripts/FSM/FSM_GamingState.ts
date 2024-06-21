/*
* @Author: your name
* @Date: 2022-03-10 10:56:23
 * @LastEditTime: 2023-01-31 18:24:24
 * @LastEditors: tianran.shi
* @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \townmystery\JavaScripts\FSM\FSM_GamingState.ts
*/
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { AiModuleS } from "../AI/AiModule";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { MGSHome } from "../MGSHome";
import { FSMModuleS } from "../Module/FSMModule";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import FSM_CalculateState from "./FSM_CalculateState";
import { IFSMState } from "./IFSMState";
/**
 * 游戏状态
 */
export default class FSM_GamingState implements IFSMState {
    Enter(): void {
        oTraceError("fsm 6:EnterGamingState");
        GameGlobals.curGameState = GamingState.GamingState;
        GameGlobals.livePlayers.splice(0, GameGlobals.livePlayers.length);
        GameGlobals.readyPlayers.forEach((player) => {
            GameGlobals.livePlayers.push(player);
        })
        GameGlobals.liveAi.splice(0, GameGlobals.liveAi.length);
        GameGlobals.aiPlayer.forEach((obj) => {
            GameGlobals.liveAi.push(obj);
        })
        FSM_CalculateState.timeIsOut = false;
        ModuleService.getModule(FSMModuleS).beginGameTime(Globals.gameTime);
        ModuleService.getModule(GameModuleS).gameBegin();
        ModuleService.getModule(GameModuleS).initProp();
        MGSHome.mgsStart(GameGlobals.readyPlayers[0]);
        ModuleService.getModule(AiModuleS).aiStartGame();
    }
    Exit(): void {

    }
}  