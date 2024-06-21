/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-13 14:14:36
 * @FilePath     : \murdermystery3\JavaScripts\FSM\FSM_InitGameState.ts
 * @Description  : 修改描述
 */
/*
* @Author: your name
* @Date: 2022-03-10 10:56:23
 * @LastEditTime: 2023-02-08 09:47:40
 * @LastEditors: xicun.kang
* @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \murdermystery3\JavaScripts\FSM\FSM_InitGameState.ts
*/
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { AiModuleS } from "../AI/AiModule";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { MGSDataInfo } from "../MGSHome";
import { SceneModuleS } from "../Module/ProcModule/SceneModule";
import { WatchModuleS } from "../Module/ProcModule/WatchModule";
import FSMManager from "./FSMManager";
import FSM_ChooseState from "./FSM_ChooseState";
import { IFSMState } from "./IFSMState";
import LoadMapModuleS from "../Module/loadMapModule/LoadMapModuleS";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
/**
 * 初始化游戏道具场景等
 */
export default class FSM_InitGameState implements IFSMState {
    Enter(): void {
        oTraceError("fsm 3:EnterInitGameState");
        GameGlobals.dieNum = 0;
        GameGlobals.curGameState = GamingState.InitGameState;
        MGSDataInfo.initMGSDataInfo();
        //初始化场景东西:金币，道具
        ModuleService.getModule(SceneModuleS).initGameScene();
        console.warn("kang log 初始化场景readyPlayers=" + GameGlobals.readyPlayers.length + "lowLimit" + Globals.lowLimit);
        if (GameGlobals.readyPlayers.length >= Globals.lowLimit) {
            GameGlobals.aiNum = 0;
            GameGlobals.startMax = GameGlobals.readyPlayers.length;
        } else {
            GameGlobals.aiNum = (GameGlobals.readyPlayers.length + Globals.aiMax) > Globals.startMax ? Globals.startMax - GameGlobals.readyPlayers.length : Globals.aiMax;
            GameGlobals.startMax = GameGlobals.aiNum + GameGlobals.readyPlayers.length;
        }
        console.warn("kang log 初始化场景aiNum=" + GameGlobals.aiNum);
        //TODO：初始化AI
        ModuleService.getModule(AiModuleS).addGameAi(GameGlobals.aiNum);
        setTimeout(() => {
            ModuleService.getModule(SceneModuleS).destroyCoin();
            ModuleService.getModule(SceneModuleS).activeCoin();
        }, 500);
        FSMManager.Instance.ChangeState(FSM_ChooseState);
        
        // setTimeout(() => {
        //     if (GameGlobals.curGameState != GamingState.InitGameState) return;

        // }, Globals.loadSceneTime * 1000);
    }

    Exit(): void {

    }
} 
