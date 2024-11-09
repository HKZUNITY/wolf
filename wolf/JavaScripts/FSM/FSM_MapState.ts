import { GameGlobals, GamingState, Globals } from "../Globals";
import FSMModuleS from "../Module/FSMModule/FSMModuleS";
import { MapModuleS } from "../Module/GameModule/MapModule";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import { IFSMState } from "./IFSMState";

export class FSM_MapState implements IFSMState {
	Enter(): void {
		GameGlobals.curGameState = GamingState.MapState;
		console.warn("fsm 3:EnterChooseMapState");
		ModuleService.getModule(FSMModuleS).beginChooseTime(Globals.chooseMapTime);
		ModuleService.getModule(PlayerModuleS).updateHallTip(GamingState.MapState);
		//临时注掉
		ModuleService.getModule(MapModuleS).chooseMap();
	}
	Exit(): void {

	}
}
