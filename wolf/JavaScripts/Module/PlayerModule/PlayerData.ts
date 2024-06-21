/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-04-25 16:14:32
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-02 18:02:02
 * @FilePath     : \murdermystery3\JavaScripts\Module\PlayerModule\PlayerData.ts
 * @Description  : 修改描述
 */
/*
 * @Author: zhangqing.fang
 * @Date: 2022-09-09 11:02:07
 * @LastEditors: tianran.shi
 * @LastEditTime: 2023-02-08 13:57:40
 * @FilePath: \murdermystery3\JavaScripts\Module\PlayerModule\PlayerData.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { Camp } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { PlayerModuleS } from "./PlayerModuleS";
export class PlayerModuleData extends Subdata {
    /**玩家名字 */
    @Decorator.persistence()
    public playerName: string = "";
    /**玩家初始角色 */
    @Decorator.persistence()
    public playerOriginRoleID: number = 0;
    /**玩家当前使用的角色id */
    @Decorator.persistence()
    public playerUsedRoleId: number = 0;
    /**玩家当前使用的特效id */
    @Decorator.persistence()
    public playerUsedEffectId: number = 0;
    /**玩家所拥有的金币 */
    @Decorator.persistence()
    public gold: number = 0;
    /**玩家所拥有的钻石 */
    @Decorator.persistence()
    public diamond: number = 0;
    /**玩家所拥有的的广告券 */
    @Decorator.persistence()
    public advToken: number = 0;
    /**玩家所拥有的经验 */
    @Decorator.persistence()
    public exp: number = 0;
    /**玩家当前等级 */
    @Decorator.persistence()
    public level: number = 0
    /**没有成为黑手党的第几局 */
    @Decorator.persistence()
    public noBeSpy: number = 0;
    /**玩家参与的场数 */
    @Decorator.persistence()
    public gameRound: number = 0;
    /**玩家当前通行证 */
    /**玩家当前通行证经验值 */
    /**玩家今日参加场数 */
    @Decorator.persistence()
    public todayGameRound: number = 0;
    /**刷新今日参加场数的时间戳*/
    @Decorator.persistence()
    public todayGameRoundTime: number = 0;
    /**大厅今日免费领取奖励 */
    @Decorator.persistence()
    public todayFreeReward: number = 0;
    /**大厅观看广告数量 */
    @Decorator.persistence()
    public hallWatchAdNum: number = 0;
    /**大厅观看广告倒计时 */
    @Decorator.persistence()
    public hallWatchAdCountDown: number = 0;
    /**大厅观看广告时间戳 */
    @Decorator.persistence()
    public hallWatchAdTime: number = 0;
    /**武器箱广告时间戳 */
    @Decorator.persistence()
    public lotteryWatachAdTimeArr: Array<number>;
    /**武器箱购买次数 */
    @Decorator.persistence()
    public lotterySaleTimesArr: Array<number>;
    @Decorator.persistence()
    public levelNeedExp: Array<number> = new Array<number>();
    /**玩家游玩时间 */
    @Decorator.persistence()
    public playTime: number = 0;
    /**玩家是否进行过抽奖 */
    @Decorator.persistence()
    private useDraw: boolean = false;
    /**本次上线时间（不需要存储） */
    public nowLaunchTime: number;
    // public get mDataInfo() {
    //     return this;
    // }
    public initPlayerData(playerId: number) {
        this.playerName = this.playerName || "";
        this.playerUsedRoleId = this.playerUsedRoleId || 0;
        this.playerUsedEffectId = this.playerUsedEffectId || 0;
        this.gold = this.gold || 0;
        this.diamond = this.diamond || 0;
        this.exp = this.exp || 0;
        this.noBeSpy = 0;
        this.gameRound = this.gameRound || 0;
        this.todayGameRound = this.todayGameRound || 0;
        this.todayGameRoundTime = this.todayGameRoundTime || 0;
        this.hallWatchAdNum = this.hallWatchAdNum || 0;
        this.todayFreeReward = this.todayFreeReward || 0;
        this.hallWatchAdTime = this.hallWatchAdTime || 0;
        this.hallWatchAdCountDown = this.hallWatchAdCountDown || 0;
        this.level = this.level || 0
        this.lotteryWatachAdTimeArr = this.lotteryWatachAdTimeArr || new Array();
        this.lotterySaleTimesArr = this.lotterySaleTimesArr || new Array();
        this.advToken = this.advToken || 0;
        this.nowLaunchTime = 0;
        this.initLotteryWatachAdTimeArr()
        this.initLotterySaleTimesArr()
        if (this.levelNeedExp.length > 0) {
            this.levelNeedExp = new Array<number>();
            this.save(false)
        }
        this.updateLevel(playerId)
    }

    public get dataName(): string {
        return "PlayerHallDataInfo";
    }
    public addGameRound(num: number) {
        this.gameRound += num;
        return this.gameRound;
    }
    public addTodayGameRound(num: number) {
        this.todayGameRound += num;
        return this.todayGameRound;
    }
    public clearTodayGameRoundAndTime() {
        this.todayGameRound = 0;
        this.todayGameRoundTime = Date.now();
    }
    public clearHallWatchAdTime() {
        this.hallWatchAdTime = Date.now();
    }
    public addHallWatchAdNum(num: number) {
        this.hallWatchAdNum += num;
        return this.hallWatchAdNum;
    }
    public clearAddHallWatchAdNum() {
        this.hallWatchAdNum = 0;
    }
    public addTodayFreeReward(num: number) {
        this.todayFreeReward += num;
        return this.todayFreeReward;
    }
    public clearTodayFreeReward() {
        this.todayFreeReward = 0;
    }

    /**更新玩家游玩时间 */
    public updatePlayTime(nowTime: number) {
        if (!this.nowLaunchTime) {
            return;
        }
        this.playTime += nowTime - this.nowLaunchTime;
        this.nowLaunchTime = nowTime;
        this.save(false);
    }

    /**设置玩家首次购买 */
    public setUseDraw(isFirst: boolean) {
        this.useDraw = isFirst;
        this.save(false);
    }

    public getUseDraw() {
        return this.useDraw;
    }

    /**设置玩家上线时间 */
    public setLaunchTime(launchTime: number) {
        this.nowLaunchTime = launchTime
    }
    public addWatchAdCountDown(num: number) {
        if (num > 0)
            this.hallWatchAdCountDown = num;
        if (num == 1)
            this.hallWatchAdCountDown = 0;
        return this.hallWatchAdCountDown;
    }
    public clearWatchAdCountDown() {
        this.hallWatchAdCountDown = 0;
    }
    public setDiamond(change: number) {
        if ((this.diamond + change) < 0) {
            oTrace("钻石数量不足");
            return -1;
        }
        else {
            this.diamond += change;
            this.save(true)
            return this.diamond;
        }
    }
    public setGold(change: number) {
        if ((this.gold + change) < 0) {
            oTrace("金币数量不足");
            return -1;
        }
        else {
            this.gold += change;
            this.save(true)
            return this.gold;
        }
    }
    public getGold() {
        return this.gold;
    }

    public setAdvToken(change: number) {
        if ((this.advToken + change) < 0) {
            oTrace("广告券数量不足");
            return -1;
        }
        else {
            this.advToken += change;
            this.save(true)
            return this.advToken;
        }
    }

    public getAdvToken() {
        return this.advToken;
    }

    public setExp(change: number, playerId: number) {
        this.exp += change;
        this.updateLevel(playerId)
    }
    private updateLevel(playerId: number) {
        let exp = this.exp
        let dataInfo = GameConfig.Rank.getAllElement()
        for (let i = dataInfo.length - 1; i >= 0; i--) {
            let value = dataInfo[i].Exp
            if (exp >= value) {
                this.level = dataInfo[i].Level
                break
            }
        }
        this.save(false)
        ModuleService.getModule(PlayerModuleS).updatePlayerLevel(playerId, this.level)
    }
    public getLevel() {
        return this.level
    }
    public getExp() {
        return this.exp;
    }
    public getDiamond() {
        return this.diamond;
    }
    public getPlayerOrginRole(): number {
        return this.playerOriginRoleID;
    }
    public setPlayerOriginRole(roleID: number) {
        this.playerOriginRoleID = roleID;
    }
    public getPlayerRoleId(): number {
        return this.playerUsedRoleId;
    }
    public setPlayerRoleId(roleId: number): number {
        this.playerUsedRoleId = roleId;
        return this.playerUsedRoleId;
    }
    public getPlayerEffId(): number {
        return this.playerUsedEffectId;
    }
    public getPlayerName(): string {
        return this.playerName;
    }
    public setPlayerName(name: string): string {
        this.playerName = name;
        return this.playerName;
    }
    public addNoSpyNum(camp: Camp) {
        if (camp == Camp.Spy) {
            this.noBeSpy = 0;
        }
        else {
            this.noBeSpy++;
        }
    }
    public getNoSpyNum() {
        return this.noBeSpy;
    }
    public setPlayerEffId(id: number) {
        this.playerUsedEffectId = id;
    }
    // 武器箱相关
    public initLotteryWatachAdTimeArr() {
        let index = 0
        GameConfig.Lottery.getAllElement().forEach((value, key) => {
            if (index >= this.lotteryWatachAdTimeArr.length) {
                this.lotteryWatachAdTimeArr.push(TimeUtil.time())
            }
            index++
        })
    }
    public initLotterySaleTimesArr() {
        let index = 0
        GameConfig.Lottery.getAllElement().forEach((value, key) => {
            if (index >= this.lotterySaleTimesArr.length) {
                this.lotterySaleTimesArr.push(0)
            }
            index++
        })
    }
    public getLotteryWatchAdTime(index: number): number {
        return this.lotteryWatachAdTimeArr[index - 1]
    }
    public setLotteryWatchAdTime(index: number) {
        this.lotteryWatachAdTimeArr[index - 1] = TimeUtil.time()
    }
    public getLotteryWatchAdCountDown(index: number) {
        let timeOld = this.getLotteryWatchAdTime(index)
        let timeNew = TimeUtil.time()
        let coundDown = 300 - (timeNew - timeOld)
        return coundDown < 0 ? 0 : coundDown
    }

    /**得到单一武器箱购买次数 */
    public getLotterySaleTimes(index: number): number {

        return this.lotterySaleTimesArr[index - 1]
    }
    /**设置单一武器箱购买次数 */
    public setLotterySaleTimes(index: number, reset: boolean) {
        if (reset) {
            this.lotterySaleTimesArr[index - 1] = 0
        }
        else {
            this.lotterySaleTimesArr[index - 1]++
        }
    }
    // 武器箱相关
}