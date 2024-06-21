import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { Camp, PlayerGameState, PlayerWeaponState } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import AttributeManager, { AttributeType } from "../SVipModule/AttributeManager";

// export class GameDataInfo extends Subdata {
//     /**玩家阵营 */
//     playerCamp: Camp = Camp.Civilian;
//     /**玩家生命值 */
//     playerHp: number = 0;
//     /**玩家速度 */
//     playerSpeed: number = 0;
//     /**玩家跳跃高度 */
//     playerJumpHeight: number = 0;
//     /**玩家最大的金币收集数量 */
//     maxCoinNum: number = 0;
//     /**本局收集的金币 */
//     gameGold: number = 0;
//     /**玩家状态 */
//     curState: PlayerGameState = PlayerGameState.Ready;
//     /**玩家武器状态 */
//     curWeaponState: PlayerWeaponState = PlayerWeaponState.UnEquip;
//     /**当前收集的道具数量 */
//     curPropNum: number = 0;
//     /**攻击按钮的次数 */
//     attackNum: number = 0;
//     /**切换按钮的次数 */
//     switchNum: number = 0;
//     /**当局经验 */
//     expNum: number = 0;
//     /**本局存活时间 */
//     liveNum: number = 0;
// }
export class GameModuleData extends Subdata {

    /**玩家阵营 */
    @Decorator.persistence()
    playerCamp: Camp = Camp.Civilian;
    /**玩家生命值 */
    @Decorator.persistence()
    playerHp: number = 0;
    /**玩家速度 */
    @Decorator.persistence()
    playerSpeed: number = 0;
    /**玩家跳跃高度 */
    @Decorator.persistence()
    playerJumpHeight: number = 0;
    /**玩家最大的金币收集数量 */
    @Decorator.persistence()
    maxCoinNum: number = 0;
    /**本局收集的金币 */
    @Decorator.persistence()
    gameGold: number = 0;
    /**玩家状态 */
    @Decorator.persistence()
    curState: PlayerGameState = PlayerGameState.Ready;
    /**玩家武器状态 */
    @Decorator.persistence()
    curWeaponState: PlayerWeaponState = PlayerWeaponState.UnEquip;
    /**当前收集的道具数量 */
    @Decorator.persistence()
    curPropNum: number = 0;
    /**攻击按钮的次数 */
    @Decorator.persistence()
    attackNum: number = 0;
    /**切换按钮的次数 */
    @Decorator.persistence()
    switchNum: number = 0;
    /**当局经验 */
    @Decorator.persistence()
    expNum: number = 0;
    @Decorator.persistence()
    /**本局存活时间 */
    liveNum: number = 0;

    public static maxPropNum = GameConfig.PropsGenerate.getElement(9997).Num;
    // public constructor() {
    //     super(GameDataInfo);
    // }
    public get dataName(): string {
        return "GameDataInfo";
    }
    public initPlayerGameData(camp: Camp, playerId: number) {
        this.playerCamp = camp;
        this.playerHp = GameConfig.Rule.getElement(10015).Num;
        this.maxCoinNum = GameConfig.Rule.getElement(10014).Num + AttributeManager.instance.getAttributeValue(playerId, AttributeType.GoldContainer);
        this.gameGold = 0;
        this.curState = PlayerGameState.Ready;
        this.curWeaponState = PlayerWeaponState.UnEquip;
        this.curPropNum = 0;
        this.attackNum = 0;
        this.switchNum = 0;
        this.expNum = 0;
        this.liveNum = 0;
    }
    public addSwitchNum(num: number) {
        this.switchNum += num;
        return this.switchNum;
    }
    public addAttackNum(num: number) {
        this.attackNum += num;
        return this.attackNum;
    }
    public initEnterData(): void {
        this.playerCamp = Camp.Civilian;
        this.playerHp = 0;
        this.maxCoinNum = 0;
        this.gameGold = 0;
        this.curState = PlayerGameState.Ready;
        this.curWeaponState = PlayerWeaponState.UnEquip;
        this.curPropNum = 0;
    }
    public getPropNum() {
        return this.curPropNum;
    }
    public changePropNum(num: number) {
        if (this.curPropNum + num > GameModuleData.maxPropNum) {
            return { isChange: false, total: this.curPropNum };
        }
        else {
            this.curPropNum += num;
            return { isChange: true, total: this.curPropNum };
        }
    }
    public changeHp(damage: number) {
        if (this.playerHp - damage < 0) {
            this.playerHp = 0;
        }
        else {
            this.playerHp -= damage;
        }
        return this.playerHp;
    }
    public getWeaponState() {
        return this.curWeaponState;
    }
    public setWeaponState(state: PlayerWeaponState) {
        this.curWeaponState = state;
        return this.curWeaponState;
    }
    public getPlayerCamp() {
        return this.playerCamp;
    }
    public civilToHero() {
        this.playerCamp = Camp.Hero;
    }
    public changeState(state: PlayerGameState) {
        this.curState = state;
    }
    public getState() {
        return this.curState;
    }
    public getMaxCoin() {
        return this.maxCoinNum;
    }
    public setGold(change: number) {
        if ((this.gameGold + change) > this.maxCoinNum) {
            oTrace("金币已达上限");
            this.gameGold = this.maxCoinNum;
            return -1;
        }
        else {
            this.gameGold += change;
            return this.gameGold;
        }
    }
    public getGold() {
        return this.gameGold;
    }

    public setExpNum(change: number) {
        this.expNum += change;
    }
    public getExpNum() {
        return this.expNum;
    }

    public setLiveTimeNum(change: number) {
        this.liveNum = change;
    }
    public getLiveTimeNum() {
        return this.liveNum;
    }

}