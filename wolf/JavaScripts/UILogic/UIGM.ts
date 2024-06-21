/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-20 10:24:47
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-09 14:58:44
 * @LastEditTime : 2023-07-28 17:07:04
 * @FilePath     : \murdermystery3\JavaScripts\UILogic\UIGM.ts
 * @Description  : 修改描述
 */
/*
 * @Author: zhaolei
 * @Date: 2022-05-29 09:17:30
 * @LastEditors: zhangqing.fang
 * @Description: file content
 */

import { AddGMCommand, GMBasePanel, IGMItem } from "module_gm";
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import GMHUD from "../uiTemplate/gmModule/GMHUD";
import GMItem from "../uiTemplate/gmModule/GMItem";
import P_Loading from "./Hall/P_Loading";
import { ShopModuleS } from "../Module/ShopModule/ShopCityModule";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { LotteryModuleS } from "../Module/LotteryModule/LotteryModuleS";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { FSMModuleS } from "../Module/FSMModule";
import { GameConfig } from "../Tables/GameConfig";
import { SkillModuleS } from "../Module/SkillModule/SkillModuleS";
import { BagModuleS } from "../Module/BagModule/BagModuleS";
import { Tools } from "../Tools";
import { IRoleElement } from "../Tables/Role";



//主面板
export class GMBasePanelUI extends GMBasePanel<GMHUD, GMItem> {
	constructor() {
		super(GMHUD, GMItem);
	}
}

AddGMCommand("增加金币",
	(player, value) => {
	},
	(player, value) => {
		ModuleService.getModule(PlayerModuleS).changeGold(player, Number(value));
	}
)
AddGMCommand("增加钻石",
	(player, value) => {
	},
	(player, value) => {
		ModuleService.getModule(PlayerModuleS).changeDiamond(player, Number(value));
	}
)
AddGMCommand("增加游戏内的金币10",
	(player, value) => {
	},
	(player, value) => {
		ModuleService.getModule(GameModuleS).net_ChangeCoin(player.playerId, 10);
	}
)
AddGMCommand("下次抽奖保底",
	(player, value) => {
	},
	(player, value) => {
		ModuleService.getModule(LotteryModuleS).gmLotterySaleTimes(player.playerId);
	}
)
AddGMCommand("增加广告券",
	(player, value) => {
	},
	(player, value) => {
		ModuleService.getModule(PlayerModuleS).changeAdvToken(player, Number(value));
	}
)
AddGMCommand("修改大厅时间",
	(player, value) => {
	},
	(player, value) => {
		if (GameGlobals.curGameState == GamingState.ReadyState) {
			Globals.readyTime = Number(value);
			Globals.readyTime = Math.max(5, Globals.readyTime);
			ModuleService.getModule(FSMModuleS).beginReadyTime(Globals.readyTime);
			ModuleService.getModule(PlayerModuleS).updateHallTip(GamingState.ReadyState);
		}
	}
)

AddGMCommand("技能体验券+10",
	(player, value) => {
	},
	(player, value) => {
		let id = Number(value);
		let dataInfo = GameConfig.SkillShop.getElement(value);
		if (dataInfo == null || dataInfo.Max <= 0) {
			return;
		}
		ModuleService.getModule(SkillModuleS).addTimeSkill(player, id, 10);
	}
)
AddGMCommand("切换热武器，对局内使用",
	(player, value) => {
	},
	(player, value) => {
		ModuleService.getModule(BagModuleS).equipHotWeapon(player, Number(value));
	}
)

AddGMCommand("Role",
	(player, value) => {
		let roleElements = GameConfig.Role.getAllElement();
		Tools.changeClothByRole(roleElements[Tools.getRandomInt(0, roleElements.length - 1)], player.character);
	},
	(player, value) => {
		// ModuleService.getModule(PlayerModuleS).changeGold(player, Number(value));
	}
)
