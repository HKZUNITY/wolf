import { GameGlobals, GamingState, Globals } from "../Globals";
import { BagModuleS } from "../Module/BagModule/BagModuleS";
import FSMModuleS from "../Module/FSMModule/FSMModuleS";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import { WatchModuleS } from "../Module/ProcModule/WatchModule";
import { SkillModuleS } from "../Module/SkillModule/SkillModuleS";
import FSM_CalculateState from "./FSM_CalculateState";
import { IFSMState } from "./IFSMState";

export default class FSM_GamingFinish implements IFSMState {
    /**是否展示中 默认false 启动true */
    public static runFinsh: boolean = false;
    Enter(): void {
        console.warn("fsm 8:GamingFinish === Enter");
        GameGlobals.curGameState = GamingState.GamingFinish;
        FSM_GamingFinish.runFinsh = true;
        FSM_CalculateState.timeIsOut = false;
        ModuleService.getModule(WatchModuleS).cleanMap();
        ModuleService.getModule(BagModuleS).clearAuto();
        ModuleService.getModule(GameModuleS).curStateCheck(true);
        ModuleService.getModule(FSMModuleS).beginGameEnd(Globals.gameEndTime);
        //隐藏等级ui
        ModuleService.getModule(PlayerModuleS).enterFinishWatch()
        //取消技能
        ModuleService.getModule(SkillModuleS).deleteSkill();
        ModuleService.getModule(SkillModuleS).deleteAllBoomUI();
    }
    Exit(): void {
        //显示等级ui
        ModuleService.getModule(PlayerModuleS).exitFinishWatch()
    }

}