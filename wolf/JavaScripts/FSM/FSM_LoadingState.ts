import { oTrace, oTraceError } from "odin";
import { IFSMState } from "./IFSMState";
import { GameGlobals, GamingState, Globals } from "../Globals";
import LoadMapModuleS from "../Module/loadMapModule/LoadMapModuleS";
import FSMManager from "./FSMManager";
import FSM_InitGameState from "./FSM_InitGameState";
import { GameModuleS } from "../Module/GameModule/GameModuleS";

export default class FSM_LoadingGameState implements IFSMState {
    private timer;
    Enter(): void {
        oTraceError("fsm 3：LoadingGameState");
        GameGlobals.curGameState = GamingState.LoadingSceneState;
        GameGlobals.allGamePlayers.splice(0, GameGlobals.allGamePlayers.length);
        GameGlobals.enterGameNormalPlayers.length = 0;
        GameGlobals.readyPlayers.forEach((player) => {
            GameGlobals.allGamePlayers.push(player);
            GameGlobals.enterGameNormalPlayers.push(player);
        })
        ModuleService.getModule(LoadMapModuleS).readyPlayerShowLoadingUI();
        this.timer = setTimeout(() => {
            FSMManager.Instance.ChangeState(FSM_InitGameState);
        }, Globals.spawnSceneTime * 1000);
    }

    Exit(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        ModuleService.getModule(LoadMapModuleS).setPlayerEnterScene();
    }

}