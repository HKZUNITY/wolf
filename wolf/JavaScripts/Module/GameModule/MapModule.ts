/*
 * @Author: ZiweiShen
 * @Date: 2022-08-07 16:07:15
 * @LastEditors: xicun.kang
 * @LastEditTime: 2022-10-27 17:12:18
 * @FilePath: \townmystery\JavaScripts\Module\GameModule\MapModule.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameGlobals } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { UiManager } from '../../UI/UiManager';
import P_Hall from "../../UILogic/Hall/P_Hall";
import P_Map from "../../UILogic/Hall/P_Map";
import { ShopModuleC } from "../ShopModule/ShopCityModule";
import { LotteryModuleC } from "../LotteryModule/LotteryModuleC";
import { SkillModuleC } from "../SkillModule/SkillModuleC";
import ExchangeModuleC from "../ExchangeModule/ExchangeModuleC";
import { MGSHome } from "../../MGSHome";
import { ArkPanel } from "../ArkModule/ArkModule";
import { SetPanel } from "../SetModule/SetModule";
import AdsPanel from "../../AdsPanel";

export class MapModuleC extends ModuleC<MapModuleS, null> {
	private nowSelect: number = -1;
	chooseMap(index: number, isFirst: boolean, preSelect: number) {
		this.nowSelect = index;
		this.server.net_Choose(index, isFirst, preSelect);
	}
	net_ShowChooseMap(idList: Array<number>) {
		this.nowSelect = -1;
		ModuleService.getModule(LotteryModuleC).lotteryOpen(false)
		P_Map.instance.showMapChooseUI(idList);
		ModuleService.getModule(ShopModuleC).ShopOpen(false);
		ModuleService.getModule(SkillModuleC).isOpenSkillShopPanel(false);
		ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(false);
		if (mw.UIService.getUI(ArkPanel, false)?.visible) mw.UIService.getUI(ArkPanel).hide();
		if (mw.UIService.getUI(SetPanel, false)?.visible) mw.UIService.getUI(SetPanel).hide();
		if (mw.UIService.getUI(AdsPanel, false)?.visible) mw.UIService.getUI(AdsPanel).hide();
		if (UiManager.instance.getUIRewardPopup()) {
			UiManager.instance.getUIRewardPopup().hide();
		}
	}
	net_UpdateChoose(infoList: Array<number>) {
		P_Map.instance.updateChoose(infoList);
	}
	net_ShowFinal(id: number, curMapID: number) {
		P_Map.instance.showFinal(id);
		let res = 0
		if (this.nowSelect >= 0) {
			res = GameConfig.Level.getAllElement()[this.nowSelect + 1].ID;
		}
		MGSHome.chooseMap(res);
	}
}
export class MapModuleS extends ModuleS<MapModuleC, null> {
	private voteInfoMap: Map<number, number> = new Map();
	private voteNumInfo: Map<number, number> = new Map();
	/**分配地图 */
	chooseMap() {
		this.voteInfoMap.clear();
		this.voteNumInfo.clear();
		let ranMap = this.randomMap();
		let idList: Array<number> = new Array();
		for (let i = 0; i < ranMap.length; i++) {
			this.voteInfoMap.set(i, ranMap[i]);
			this.voteNumInfo.set(i, 0);
			idList.push(ranMap[i]);
		}
		GameGlobals.readyPlayers.forEach((player) => {
			this.getClient(player).net_ShowChooseMap(idList);
		})
	}
	randomMap() {
		let idMap: Array<number> = new Array();
		let levelData = GameConfig.Level.getAllElement();
		for (let i = 1; i < levelData.length; i++) {
			idMap.push(levelData[i].ID);
		}
		return idMap;
		// let total = GameConfig.Level.getAllElement().length - 1;
		// let idMap: Array<number> = new Array();
		// for (let i = 0; i < total; i++) {
		// 	idMap.push(i + 10001);
		// }
		// if (idMap.length <= 2) {
		// 	return idMap;
		// }
		// else {
		// 	let newIdMap: Array<number> = new Array();
		// 	for (let i = 0; i < 2; i++) {
		// 		let ran = Tools.getRandomInt(0, idMap.length - 1);
		// 		newIdMap.push(idMap[ran]);
		// 		idMap.splice(ran, 1);
		// 	}
		// 	return newIdMap;
		// }
	}
	net_Choose(index: number, isFirst: boolean, preSelect: number) {
		let num = this.voteNumInfo.get(index);
		this.voteNumInfo.set(index, num + 1);
		if (!isFirst) {
			let num2 = this.voteNumInfo.get(preSelect);
			this.voteNumInfo.set(preSelect, num2 - 1);
		}
		let infoList: Array<number> = new Array();
		this.voteNumInfo.forEach(v => {
			infoList.push(v);
		})
		GameGlobals.readyPlayers.forEach((player) => {
			this.getClient(player).net_UpdateChoose(infoList);
		})
	}
	getFinalMap() {
		let max = 0;
		let maxIndex = 0;
		this.voteNumInfo.forEach((v, index) => {
			if (v > max) {
				max = v;
				maxIndex = index;
			}
		})
		GameGlobals.curMapID = this.voteInfoMap.get(maxIndex);
		GameGlobals.readyPlayers.forEach((player) => {
			this.getClient(player).net_ShowFinal(maxIndex, GameGlobals.curMapID);
		})
	}
}