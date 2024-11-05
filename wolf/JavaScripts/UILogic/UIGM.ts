import { AddGMCommand, GMBasePanel } from "module_gm";
import { GameGlobals, GamingState, Globals } from "../Globals";
import { BagModuleS } from "../Module/BagModule/BagModuleS";
import { FSMModuleS } from "../Module/FSMModule";
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { LotteryModuleS } from "../Module/LotteryModule/LotteryModuleS";
import { PlayerModuleS } from "../Module/PlayerModule/PlayerModuleS";
import { SkillModuleS } from "../Module/SkillModule/SkillModuleS";
import { GameConfig } from "../Tables/GameConfig";
import { Tools } from "../Tools";
import GMHUD from "../uiTemplate/gmModule/GMHUD";
import GMItem from "../uiTemplate/gmModule/GMItem";



//主面板
export class GMBasePanelUI extends GMBasePanel<GMHUD, GMItem> {
	constructor() {
		super(GMHUD, GMItem);
	}
}
AddGMCommand("改变背景音效",
	(player, value) => {
		SoundService.BGMVolumeScale = Number(value);
	},
	(player, value) => {
	}
)

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
		Tools.changeClothByRole(roleElements[Tools.randomInt(0, roleElements.length - 1)], player.character);
	},
	(player, value) => {
		// ModuleService.getModule(PlayerModuleS).changeGold(player, Number(value));
	}
)
