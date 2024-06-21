/*
 * @Author: ziwei.shen
 * @Date: 2022-09-08 10:18:28
 * @LastEditors: ziwei.shen
 * @LastEditTime: 2022-09-08 10:23:38
 * @FilePath: \townmystery\JavaScripts\FSM\FSM_MapState.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { FSMModuleS } from "../Module/FSMModule";
import { MapModuleS } from "../Module/GameModule/MapModule";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import { IFSMState } from "./IFSMState";

export class FSM_MapState implements IFSMState {
	Enter(): void {
		GameGlobals.curGameState = GamingState.MapState;
		oTraceError("fsm 3:EnterChooseMapState");
		ModuleService.getModule(FSMModuleS).beginChooseTime(Globals.chooseMapTime);
		ModuleService.getModule(PlayerModuleS).updateHallTip(GamingState.MapState);
		//临时注掉
		ModuleService.getModule(MapModuleS).chooseMap();
	}
	Exit(): void {

	}
}
