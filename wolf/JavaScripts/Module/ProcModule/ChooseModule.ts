import { AiObject } from "../../AI/AiObject";
import FSM_GameReadyState from "../../FSM/FSM_GameReadyState";
import FSMManager from "../../FSM/FSMManager";
import { Camp, GameGlobals, Globals } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { GameModuleData } from "../GameModule/GameData";
import { GameModuleS } from "../GameModule/GameModuleS";
import AllotPanel from "../GameModule/ui/AllotPanel";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { SkillModuleS } from "../SkillModule/SkillModuleS";
import AttributeManager, { AttributeType } from "../SVipModule/AttributeManager";

export class ChooseModuleC extends ModuleC<ChooseModuleS, null> {
    private allotPanel: AllotPanel = null;
    private get getAllotPanel(): AllotPanel {
        if (!this.allotPanel) {
            this.allotPanel = mw.UIService.getUI(AllotPanel);
        }
        return this.allotPanel;
    }

    onStart(): void {

    }
    onEnterScene(sceneType: number): void {

    }
    net_ShowRandomUI(showNum: number, isSvip: boolean) {
        this.getAllotPanel.showAllotUI(showNum, isSvip);

    }
    net_KeepShowCamp(camp: number) {
        this.getAllotPanel.showCamp(camp);
    }
    net_CloseCampUI() {

    }

}
export class ChooseModuleS extends ModuleS<ChooseModuleC, null> {
    /**初始权重 2*/
    private initialProb: number = GameConfig.Rule.getElement(10006).Weight;
    /**增加权重 2*/
    private addRate: number = GameConfig.Rule.getElement(10007).Weight;
    /**分配阵营过程 */
    public allotProcess() {
        let time1 = Globals.randomTime * 1000;
        let time2 = Globals.campKeepTime * 1000 + time1;
        let loadingFinishPlayer = new Array<number>();
        GameGlobals.enterGameNormalPlayers.forEach((player) => {
            loadingFinishPlayer.push(player.playerId);
        })
        let weightInfo = this.getWeightMap(loadingFinishPlayer);
        let allWeight = weightInfo.totalWeight;
        GameGlobals.readyPlayers.forEach((player) => {
            let playerId = player.playerId;
            let myWeight = weightInfo.weightMap.get(playerId);
            let subRate = AttributeManager.instance.getAttributeValue(playerId, AttributeType.SpyRate);
            let percent = (myWeight.Max - myWeight.Min) / allWeight;
            let res = Number(percent.toFixed(2));
            this.getClient(player).net_ShowRandomUI(res, subRate > 0);
        })
        /**随机规则：随机规则：1.当前只有一个玩家，必定是杀手或警探；
         * 2.当前有两个玩家，必定一个是杀手，一个是警探；
         * 3.如果当前有三个玩家，三个身份平分。 2023.02.03*/
        this.randomCamp();
        ModuleService.getModule(GameModuleS).initGameData();
        //显示随机阵营的过程
        setTimeout(() => {
            //停止随机，显示玩家身份
            GameGlobals.readyPlayers.forEach((player) => {
                let camp = DataCenterS.getData(player, GameModuleData).getPlayerCamp();
                this.getClient(player).net_KeepShowCamp(camp);
            })
        }, time1);
        setTimeout(() => {
            //进入准备游戏状态
            FSMManager.Instance.ChangeState(FSM_GameReadyState);
        }, time2);

    }
    /**计算显示的黑手党概率 */
    private calShowProbability(player: mw.Player) {
        let curRound = DataCenterS.getData(player, PlayerModuleData).getNoSpyNum();
        let initialNum = GameConfig.Rule.getElement(10008).Prob;
        let rate = GameConfig.Rule.getElement(10009).Prob;
        let showNum = initialNum + rate * curRound;
        return showNum;
    }
    private randomCamp() {
        /////////////清空上一局数据//////////
        /**警探 */
        GameGlobals.policePlayer = null;
        /**黑手党 */
        GameGlobals.spyPlayer = null;
        /**警探AI */
        GameGlobals.policeAi = null;
        /**黑手党AI */
        GameGlobals.spyAi = null;
        /**平民 */
        GameGlobals.odinaryPlayer.length = 0;
        /**平民AI */
        GameGlobals.odinaryAi.length = 0;
        /**英雄玩家 */
        GameGlobals.heroPlayer = null;
        /**英雄ai */
        GameGlobals.heroAi = null;
        //////////////权重计算/////////////
        let tempArr = GameGlobals.enterGameNormalPlayers;
        let loadingFinishPlayer = new Array<number>();
        tempArr.forEach((player) => {
            loadingFinishPlayer.push(player.playerId);
        })

        for (let i = 0; i < 2; i++) {
            let temp = this.getWeightMap(loadingFinishPlayer);
            let weightMap = temp.weightMap;
            let totalWeight = temp.totalWeight;
            if (loadingFinishPlayer.length > 0 && this.getIdentity() != Camp.Civilian) {
                let playerId = this.randomPlayerCamp(weightMap, totalWeight);
                loadingFinishPlayer = loadingFinishPlayer.filter((value, index) => {
                    return value != playerId;
                })
            }
        }

        loadingFinishPlayer.forEach((value, key) => {
            let player = Player.getPlayer(value);
            if (player) {
                GameGlobals.odinaryPlayer.push(player);
            }
        })
        //目前下面的逻辑组那是用不到，因为地图关键物件已经放到地图里面了
        // /**其次给加载中的玩家随机身份 */
        // let loadingArray = this.getLoadingPlayer();
        // if (this.getIdentity() == Camp.Civilian) {
        //     loadingArray.forEach((value, index)=>{
        //         let player = Player.getPlayer(value);
        //         if (player) {
        //             GameGlobals.odinaryPlayer.push(player);
        //         }
        //     })
        // }
        // else {
        //     for (let i = 0; i < 2; i++) {
        //         let temp = this.getWeightMap(loadingArray);
        //         let weightMap = temp.weightMap;
        //         let totalWeight = temp.totalWeight;
        //         if (loadingArray.length > 0 && this.getIdentity() != Camp.Civilian) {
        //             let playerId = this.randomPlayerCamp(weightMap, totalWeight);
        //             loadingArray = loadingArray.filter((value, index)=>{
        //                 return value != playerId;
        //             })
        //         } 
        //     }
        //     loadingArray.forEach((value) => {
        //         let player = Player.getPlayer(value);
        //         if (player) {
        //             GameGlobals.odinaryPlayer.push(player);
        //         }
        //     })
        // }
        /**最后给人机随机身份 */
        let identity = this.getIdentity();
        if (identity == Camp.Spy) {
            GameGlobals.spyAi = GameGlobals.aiPlayer[0];
            GameGlobals.isSpyReal = false;
        }
        else if (identity == Camp.Police) {
            GameGlobals.policeAi = GameGlobals.aiPlayer[0];
            GameGlobals.isPoliceReal = false;
        }
        GameGlobals.aiPlayer.forEach((ai: AiObject, index: number) => {
            if (index != 0 || identity == Camp.Civilian) {
                GameGlobals.odinaryAi.push(ai);
            }
        })
        if (GameGlobals.spyPlayer) {
            let skillId = ModuleService.getModule(SkillModuleS).getSkillId(GameGlobals.spyPlayer.playerId);
            if (skillId == -1) {
                skillId = 0;
            }
        }

        console.error("黑手党", GameGlobals.spyPlayer, GameGlobals.spyAi);
        console.error("警探", GameGlobals.policePlayer, GameGlobals.policeAi);
        console.error("平民数量", GameGlobals.odinaryAi.length, GameGlobals.odinaryPlayer.length);
    }
    //随机玩家阵营，ai不用随机
    private randomPlayerCamp(weightMap: Map<number, Range>, totalWeight: number) {
        let randomNum = Tools.randomInt(0, totalWeight - 1);
        let res = 0;
        weightMap.forEach((range, playerId) => {
            if (randomNum >= range.Min && randomNum < range.Max) {
                let player = Player.getPlayer(playerId);
                let identity = this.getIdentity();
                if (identity == Camp.Spy) {
                    GameGlobals.spyPlayer = player;
                    GameGlobals.isSpyReal = true;
                }
                else if (identity == Camp.Police) {
                    GameGlobals.policePlayer = player;
                    GameGlobals.isPoliceReal = true;
                }
                res = playerId;
            }
        })
        return res;
    }

    private getIdentity() {
        let haveSpy = GameGlobals.spyPlayer || GameGlobals.spyAi;
        let havePolice = GameGlobals.policePlayer || GameGlobals.policeAi;
        if (haveSpy && havePolice) {
            return Camp.Civilian;
        }
        else if (haveSpy) {
            return Camp.Police;
        }
        else if (havePolice) {
            return Camp.Spy;
        }
        else {
            return Camp.Spy;
        }
    }

    private getWeightMap(playerArr: number[]) {
        let totalWeight = 0;
        let weightMap: Map<number, Range> = new Map<number, Range>();
        playerArr.forEach((playerId) => {
            let addCount = ModuleService.getModule(PlayerModuleS).getNoSpyNum(playerId);
            let subRate = 1 + AttributeManager.instance.getAttributeValue(playerId, AttributeType.SpyRate);
            let weight = (this.initialProb + this.addRate * addCount) * subRate;
            weight *= 100;
            let range = new Range(totalWeight, totalWeight + weight);
            totalWeight += weight;
            weightMap.set(playerId, range);
        })
        return { weightMap: weightMap, totalWeight: totalWeight };
    }
}
export class Range {
    Min: number;
    Max: number;
    constructor(min: number, max: number) {
        this.Min = min;
        this.Max = max;
    }
}
