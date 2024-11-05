import { AiModuleS } from "../AI/AiModule";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { SceneModuleS } from "../Module/ProcModule/SceneModule";
import FSMManager from "./FSMManager";
import FSM_ChooseState from "./FSM_ChooseState";
import { IFSMState } from "./IFSMState";
/**
 * 初始化游戏道具场景等
 */
export default class FSM_InitGameState implements IFSMState {
    Enter(): void {
        console.warn("fsm 3:EnterInitGameState");
        GameGlobals.dieNum = 0;
        GameGlobals.curGameState = GamingState.InitGameState;
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
    }

    Exit(): void {

    }
} 
