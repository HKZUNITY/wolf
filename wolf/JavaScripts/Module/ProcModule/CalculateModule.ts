import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameCache } from "../../GameCache";
import { CalculateState, Camp, GameGlobals, GamingState, Globals, PlayerGameState } from "../../Globals";
import { MGSDataInfo, MGSHome } from "../../MGSHome";
import { GameConfig } from '../../Tables/GameConfig';
import { Tools } from "../../Tools";
import { UiManager } from '../../UI/UiManager';
import P_Account from "../../UILogic/Game/P_Account";
import { GameModuleData } from "../GameModule/GameData";
import { GameModuleS } from "../GameModule/GameModuleS";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { IexpRuleElement } from "../../Tables/expRule";
import { IAAUtils } from "../../IAAUtils";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import P_Hall from "../../UILogic/Hall/P_Hall";
import AttributeManager, { Attribute, AttributeType } from "../SVipModule/AttributeManager";
import { AiModuleS } from "../../AI/AiModule";
import AdsPanel from '../../AdsPanel';

export class CalculateModuleC extends ModuleC<CalculateModuleS, null> {
    private _gold = 0;
    // private canWtachAD: boolean = false
    /**进入游戏的玩家数量 */
    private enterGamePlayerCount: number = -1
    onStart(): void {
        // P_Account.instance.mBtn_ClearingAD.onClicked.add(() => {
        //     oTrace("kang log 奖励金币=" + this._gold);
        //     MGSHome.mgsWorldId(1);
        //     if (this._gold == 0)
        //         return;
        //     //TODO:广告 结算激励广告
        //     mw.AdsService.isReady(mw.AdsType.Reward, (isReady: boolean) => {
        //         console.warn("kang log isready 结算激励广告", isReady)
        //         // if (isReady) {
        //         //     MGSHome.mgsSceneId(1);
        //         // }
        //         //广告准备好
        //         GeneralManager.modifyShowAd(mw.AdsType.Reward, (state: mw.AdsState) => {
        //             console.warn("kang log state", state)
        //             if (state == mw.AdsState.Success) {
        //                 MGSHome.mgsSceneId(1);
        //                 console.warn("kang log 结算激励广告播放成功")
        //             }
        //             else if (state == mw.AdsState.Reward) {
        //                 MGSHome.mgsResource3(1);
        //                 console.warn("kang log 结算激励广告播放完成给奖励");
        //                 //弹出奖励界面
        //                 let rewardPopup = UiManager.instance.getUIRewardPopup();
        //                 rewardPopup.show();
        //                 let num = GameConfig.Rule.getElement(30003).Num;
        //                 //(参与对局奖励+拾取金币奖励）*奖励倍数
        //                 rewardPopup.refreshText((this._gold) * num);
        //                 this._gold = 0;
        //             } else if (state == mw.AdsState.Fail) {
        //                 //广告加载或者播放失败，在此处理
        //                 console.warn("kang log 结算激励广告播放失败");
        //             }
        //         });
        //     });
        // })
    }
    onEnterScene(sceneType: number): void {

    }
    /**关闭结算界面发送埋点 */
    closeCalculateUIMgs() {
        /**看过广告就不发送了 */
        // if (!this.canWtachAD) {
        //     return
        // }
        MGSHome.msgCalculate(this.enterGamePlayerCount, false);
    }

    net_ShowCalAccount(camp, calState, spyName, rightName, spyWeapon, rightWeapon,
        spyRole, rightRole, gold, baseExp, isWin, dieNum, liveTime, civilianNum, enterPlayerNum: number, isSvip: boolean
    ) {
        let newobj: calculateData = {
            camp: camp, calState: calState, spyName: spyName, otherName: rightName,
            spyWeaponId: spyWeapon, otherWeaponId: rightWeapon, spyRoleId: spyRole,
            otherRoleId: rightRole, gold: gold, baseExp: baseExp, isWin: isWin,
            killNum: dieNum, liveTime: liveTime, livenum: civilianNum
        }
        this.enterGamePlayerCount = enterPlayerNum
        let dataStr = JSON.stringify(newobj);
        let calcRewardEvent = () => {
            // if (!this.canWtachAD) return
            UIService.getUI(AdsPanel).showRewardAd(() => {
                ModuleService.getModule(PlayerModuleC).addAdvToken(1);
                ModuleService.getModule(PlayerModuleC).net_RewardGold(gold)
                // this.canWtachAD = false
                MGSHome.msgCalculate(this.enterGamePlayerCount, true);
                P_Account.closeAccountUI();
            }, "免费领取双倍金币\n再送一张广告券", "取消", "领取");
        }
        P_Account.instance.setMButtonWatchADEvent(calcRewardEvent.bind(this))
        P_Account.showAccountUI(dataStr, isSvip);
        // P_Hall.instance.showLotteryADTip(true);
        // let time = Globals.calTime * 1000;
        // setTimeout(() => {
        //     P_Account.closeAccountUI();
        // }, time);
        //全屏广告是否激活
        // const isInterstitialActive = mw.AdsService.isActive(mw.AdsType.Interstitial);
        // if (isInterstitialActive) {
        //     //TODO:广告 结算插屏广告
        //     let time1 = GameConfig.Rule.getElement(30008).Num;
        //     oTrace("kang log 结算插屏，当天进行的场数：" + todayGameRound + "，配置的场数：" + time1);
        //     if (todayGameRound >= time1) {
        //         mw.AdsService.isReady(mw.AdsType.Interstitial, (isReady: boolean) => {
        //             console.warn("kang log isready 结算插屏广告", isReady)
        //             //广告准备好
        //             GeneralManager.modifyShowAd(mw.AdsType.Interstitial, (state: mw.AdsState) => {
        //                 console.warn("kang log state", state)
        //                 //重置比赛场数 插屏只要播出来就算成功，即使播放成功，isSucess有时候也会返回false
        //                 this.server.net_resetTodayGameRound();
        //                 if (state == mw.AdsState.Success) {
        //                     MGSHome.mgsResource3(3);
        //                     console.warn("kang log 结算插屏广告播放成功")
        //                 } else if (state == mw.AdsState.Fail) {
        //                     console.warn("kang log 结算插屏广告播放失败")
        //                 }
        //             });
        //         });
        //     }
        // }
    }
}
export class CalculateModuleS extends ModuleS<CalculateModuleC, null> {
    gameCalculate(timeIsOver: boolean) {
        let heroExist: boolean = false;
        let spyExist: boolean = true;
        //先判断有无英雄的存在，
        if (GameGlobals.heroPlayer != null) {
            heroExist = true;
        }
        if (GameGlobals.heroAi != null) {
            heroExist = true;
        }
        //再判断黑手党是否还活着
        let spyState: PlayerGameState;
        let spyName: string;
        let spyWeapon: number;
        let spyRole: number;
        if (GameGlobals.isSpyReal) {
            let info = GameCache.gamePlayersInfo.get(GameGlobals.spyPlayer);
            spyState = info.state;
            spyName = info.name;
            spyRole = info.roleId;
            spyWeapon = info.coldId;
        } else {
            spyState = GameGlobals.spyAi.aiGameState;
            spyName = GameGlobals.spyAi.aiName;
            spyRole = GameGlobals.spyAi.roleId;
            spyWeapon = GameGlobals.spyAi.aiColdWeapon;
        }

        if (spyState != PlayerGameState.Normal) {
            spyExist = false;
        }
        let rightName: string;
        let rightWeapon: number;
        let rightRole: number;
        if (heroExist) {
            if (GameGlobals.isHeroReal) {
                let infor = GameCache.gamePlayersInfo.get(GameGlobals.heroPlayer);
                rightName = infor.name;
                rightRole = infor.roleId;
                rightWeapon = infor.hotId;
            }
            else {
                rightName = GameGlobals.heroAi.aiName;
                rightRole = GameGlobals.heroAi.roleId;
                rightWeapon = GameGlobals.heroAi.aiHotWeapon;
            }
        }
        else {
            if (GameGlobals.isPoliceReal) {
                let infor = GameCache.gamePlayersInfo.get(GameGlobals.policePlayer);
                rightName = infor.name;
                rightRole = infor.roleId;
                rightWeapon = infor.hotId;
            }
            else {
                rightName = GameGlobals.policeAi.aiName;
                rightRole = GameGlobals.policeAi.roleId;
                rightWeapon = GameGlobals.policeAi.aiHotWeapon;
            }

        }
        let calState: CalculateState;
        if (timeIsOver) {
            if (heroExist) {        /**时间到，黑手党失败，英雄失败 */
                calState = CalculateState.TimeHero;
            }
            else {        /**时间到，黑手党失败， */
                calState = CalculateState.TimeNoHero;
            }
        }
        else {
            if (spyExist) {
                if (heroExist) {        /**黑手党赢，有英雄 */
                    calState = CalculateState.SpyWinHero;
                }
                else {        /**黑手党赢，无英雄 */
                    calState = CalculateState.SpyWinNoHero;
                }
            }
            else {
                if (heroExist) {        /**黑手党失败，有英雄 */
                    calState = CalculateState.SpyLoseHero;
                }
                else {        /**黑手党失败，无英雄 */
                    calState = CalculateState.SpyLoseNoHero;
                }
            }
        }
        MGSDataInfo.game_mode = calState;
        this.removePlayer();

        let civilianNum = ModuleService.getModule(GameModuleS).getCivilianNum(Camp.Civilian);
        ModuleService.getModule(AiModuleS).removeAllEffect();
        GameGlobals.readyPlayers.forEach((player) => {
            let gameData = DataCenterS.getData(player, GameModuleData);
            if (gameData.getState() != PlayerGameState.Back) {
                ModuleService.getModule(PlayerModuleS).playerBackToHall(player, GamingState.WaitingState);
            }
            //弹出结算界面
            let camp = gameData.getPlayerCamp();
            let isWin = this.isWin(camp, calState);
            let cofig: IexpRuleElement = null;
            let baseExp: number = 0;
            let exp: number = 0;
            switch (camp) {
                case Camp.Civilian:
                    if (isWin) {
                        cofig = GameConfig.expRule.getElement(10005)
                        baseExp = gameData.getExpNum();
                        exp = baseExp * cofig.winMultiple;
                    } else {
                        cofig = GameConfig.expRule.getElement(10006)
                        baseExp = gameData.getExpNum();
                        exp = baseExp;
                    }
                    break;
                case Camp.Hero:
                    if (isWin) {
                        cofig = GameConfig.expRule.getElement(10007)
                        baseExp = gameData.getExpNum() + civilianNum * cofig.baseMultiple;
                        exp = baseExp + cofig.winNum;
                    } else {
                        cofig = GameConfig.expRule.getElement(10008)
                        baseExp = gameData.getExpNum();
                        exp = baseExp;
                    }
                    break;
                case Camp.Police:
                    if (isWin) {
                        cofig = GameConfig.expRule.getElement(10001)
                        baseExp = civilianNum * cofig.baseMultiple;
                        exp = baseExp + cofig.winNum;
                    } else {
                        cofig = GameConfig.expRule.getElement(10002)
                        baseExp = cofig.baseNum;
                        exp = baseExp;
                    }
                    break;
                case Camp.Spy:
                    if (isWin) {
                        cofig = GameConfig.expRule.getElement(10003)
                        baseExp = GameGlobals.dieNum * GameConfig.expRule.getElement(10004).baseMultiple;
                        exp = GameGlobals.dieNum * cofig.baseMultiple * cofig.winMultiple;
                    } else {
                        cofig = GameConfig.expRule.getElement(10004)
                        baseExp = GameGlobals.dieNum * cofig.baseMultiple;
                        exp = baseExp;
                    }
                    break;
            }

            //参与对局奖励
            let rewardnum = GameConfig.Rule.getElement(10025).Num;
            let gold = DataCenterS.getData(player, GameModuleData).setGold(0) + rewardnum;
            let subRate = AttributeManager.instance.getAttributeValue(player.playerId, AttributeType.CalculateGoldAdd);
            gold = Math.ceil(gold * (1 + subRate));
            exp = Math.ceil(exp * (1 + subRate));
            ModuleService.getModule(PlayerModuleS).changeGold(player, gold);
            let round = DataCenterS.getData(player, PlayerModuleData).addGameRound(1);
            let data = DataCenterS.getData(player, PlayerModuleData);
            let todayGameRound = data.addTodayGameRound(1);
            data.setExp(exp, player.playerId);
            if (round == 1) {
                MGSHome.coreEnd(player);
                let num = -1;
                let camp = DataCenterS.getData(player, GameModuleData).getPlayerCamp();
                if (camp == Camp.Civilian) {
                    let propnum = DataCenterS.getData(player, GameModuleData).getPropNum();
                    if (propnum != 0) {
                        num = 2;
                    }
                }
                if (camp == Camp.Spy) {
                    let attacknum = DataCenterS.getData(player, GameModuleData).addAttackNum(0);
                    if (attacknum != 0) {
                        num = 0;
                    }
                }
                if (camp == Camp.Police) {
                    let attacknum = DataCenterS.getData(player, GameModuleData).addAttackNum(0);
                    if (attacknum != 0) {
                        num = 1;
                    }
                }
                if (camp == Camp.Hero) {
                    let attacknum = DataCenterS.getData(player, GameModuleData).addAttackNum(0);
                    if (attacknum != 0) {
                        num = 3;
                    }
                }
                if (num >= 0) {
                    MGSHome.coreStep(player, num);
                }
            }
            // let newobj: calculateData = {
            //     camp: camp, calState: calState, spyName: spyName, otherName: rightName,
            //     spyWeaponId: spyWeapon, otherWeaponId: rightWeapon, spyRoleId: spyRole,
            //     otherRoleId: rightRole, gold: gold, baseExp: baseExp, isWin: isWin,
            //     killNum: GameGlobals.dieNum, liveTime: gameData.getLiveTimeNum(), livenum: civilianNum
            // }

            this.getClient(player).net_ShowCalAccount(camp, calState, spyName, rightName, spyWeapon, rightWeapon,
                spyRole, rightRole, gold, baseExp, isWin, GameGlobals.dieNum, gameData.getLiveTimeNum(), civilianNum, GameGlobals.readyPlayers.length, subRate > 0
            );
            MGSHome.mgsResult(player);
        })
        MGSHome.mgsOver(GameGlobals.readyPlayers[0]);
    }
    removePlayer() {
        for (let i = 0; i < GameGlobals.readyPlayers.length; i++) {
            try {
                DataCenterS.getData(GameGlobals.readyPlayers[i], GameModuleData);
            } catch (err) {
                GameGlobals.readyPlayers.splice(i, 1);
                i--;
                let index = GameGlobals.currentAllPlayers.indexOf(GameGlobals.readyPlayers[i]);
                if (index != -1) {
                    GameGlobals.currentAllPlayers.splice(index, 1);
                }
            }
        }
    }
    //重置当天进行的场数
    public net_resetTodayGameRound() {
        DataCenterS.getData(this.currentPlayer, PlayerModuleData).clearTodayGameRoundAndTime();
        oTrace("kang log 重置当天进行的场数");
    }

    /**判断是否胜利 */
    isWin(camp: Camp, calState: CalculateState) {
        let bool: boolean;
        switch (calState) {
            case CalculateState.SpyWinNoHero:
            case CalculateState.SpyWinHero:
                if (camp == Camp.Spy) {
                    bool = true;
                } else {
                    bool = false;
                }
                break;
            case CalculateState.SpyLoseNoHero:
                if (camp == Camp.Police || camp == Camp.Civilian) {
                    bool = true;
                } else {
                    bool = false;
                }
                break;
            case CalculateState.SpyLoseHero:
                if (camp == Camp.Hero || camp == Camp.Civilian) {
                    bool = true;
                } else {
                    bool = false;
                }
                break;
            case CalculateState.TimeNoHero:
            case CalculateState.TimeHero:
                if (camp == Camp.Civilian) {
                    bool = true;
                } else {
                    bool = false;
                }
                break;
        }
        return bool;
    }




}

export type calculateData = {
    camp: Camp, calState: CalculateState, spyName: string, otherName: string,
    spyWeaponId: number, otherWeaponId: number, spyRoleId: number,
    otherRoleId: number, gold: number, baseExp: number, isWin: boolean,
    killNum: number, liveTime: number, livenum: number
}