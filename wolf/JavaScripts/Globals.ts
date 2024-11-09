import { AiObject } from "./AI/AiObject";
import { GameConfig } from "./Tables/GameConfig";
import { ISoundElement } from "./Tables/Sound";

export class Globals {
    public static languageId: number = -1;
    public static isDebug: boolean = false;
    public static isShowLineTrace: boolean = false;
    public static pieIsVip: boolean = false;
    public static pieGoldKey: number = 2;
    ///////////////////////////////////////////物体guid////////////////////////////////////////////////////////////
    /**大厅出生点父物体guid */
    public static hallBornGuid: string = "2C4F453B";
    /**断线重连出生点 */
    public static reBornGuid: string = "5E181623";
    ///////////////////////////////////////////游戏时间配置/////////////////////////////////////////////////////////
    /**准备时间 */
    public static readyTime: number = Globals.isDebug ? 3 : GameConfig.Rule.getElement(10001).Time;
    // public static readyTime: number = 3;
    /**选择地图时间 */
    public static chooseMapTime: number = 10;
    /**动态加载地图时间 */
    public static spawnSceneTime: number = GameConfig.Rule.getElement(10040).Time;;
    /**随机身份时间 */
    public static randomTime: number = Globals.isDebug ? 2 : GameConfig.Rule.getElement(10003).Time;
    /**显示身份时间 */
    public static campKeepTime: number = Globals.isDebug ? 1 : GameConfig.Rule.getElement(10005).Time;
    /**游戏内准备时间 */
    public static gameReadyTime: number = Globals.isDebug ? 3 : GameConfig.Rule.getElement(10019).Time;
    /**游戏时间 */
    public static gameTime: number = Globals.isDebug ? 20 : GameConfig.Rule.getElement(10002).Time;
    /**黑幕时间 */
    public static blackTime: number = Globals.isDebug ? 1 : GameConfig.Rule.getElement(50001).Time;
    /**游戏终结展示时间 */
    public static gameEndTime: number = Globals.isDebug ? 5 : GameConfig.Rule.getElement(50002).Time;;
    /////////////////////////////////////////////游戏人数配置///////////////////////////////////////////////////////
    /**开始游戏的最少人数 */
    public static startMin: number = 1;
    /**开始游戏的最大人数 */
    public static startMax: number = 12;
    ////////////////////////////////////////////
    /**播放拿武器动作的时间ms */
    public static getWeaponTime: number = 0;
    /**人机最大人数 */
    public static aiMax: number = 4;
    /**多少人就不加人机了 */
    public static lowLimit: number = 5;//TODO:WFZ
    /**金钥匙的id */
    public static goldenKeyIcon: string = GameConfig.Rule.getElement(10045).Num.toString();
    /**平台是否支持vip */
    public static isSuppertSvip: boolean = null;

    public static pieNickName: string[] = [`Fat little guy who loves to play games`, `爱玩游戏的小胖子`];
}
export class GameGlobals {
    /**当前地图 */
    public static curMapID: number = 10001;
    /**当前游戏总人数包括人机 */
    public static startMax: number;
    /**当局人机数量 */
    public static aiNum: number;
    /**当前游戏状态 */
    public static curGameState: GamingState;
    /**点击开始按钮的所有玩家 */
    public static currentAllPlayers: Array<mw.Player> = new Array<mw.Player>();
    /**进入游戏的所有玩家 */
    public static readyPlayers: Array<mw.Player> = new Array<mw.Player>();
    /**该局参与的所有玩家，包括退出的 */
    public static allGamePlayers: Array<mw.Player> = new Array<mw.Player>();
    /**对局玩家，不包含退出的 */
    public static enterGameNormalPlayers: Array<mw.Player> = new Array<mw.Player>();
    /**活着的所有玩家 */
    public static livePlayers: Array<mw.Player> = new Array<mw.Player>();
    /**在大厅的玩家 */
    public static hallPlayer: Array<mw.Player> = new Array<mw.Player>()
    /**大厅出生点数组 */
    public static hallBornList: Array<mw.GameObject> = new Array<mw.GameObject>();
    /**断线重连临时出生点 */
    public static reConnectBornList: Array<mw.GameObject> = new Array<mw.GameObject>();
    /**游戏出生点数组 */
    public static gameBornList: Array<mw.GameObject> = new Array<mw.GameObject>();

    /**死亡人物AI模型数组 */
    public static deathModelList: Array<mw.Character> = new Array<mw.Character>();

    /**警探 */
    public static policePlayer: mw.Player;
    /**警探是否是真人 */
    public static isPoliceReal: boolean;
    /**警探人机 */
    public static policeAi: AiObject;

    /**黑手党 */
    public static spyPlayer: mw.Player;
    /**黑手党是否是真人 */
    public static isSpyReal: boolean;
    /**黑手党人机 */
    public static spyAi: AiObject;

    /**平民 */
    public static odinaryPlayer: Array<mw.Player> = new Array<mw.Player>();
    /**平民人机 */
    public static odinaryAi: Array<AiObject> = new Array<AiObject>();

    /**英雄 */
    public static heroPlayer: mw.Player = null;
    /**英雄是否是真人 */
    public static isHeroReal: boolean;
    /**英雄人机 */
    public static heroAi: AiObject;

    /** 终结玩家 */
    public static terminatorPlayer: mw.Player;
    /** 终结玩家是否真人  */
    public static isTerminatorReal: boolean;
    /** 终结AI */
    public static terminatorAI: AiObject;

    /**该局正在使用的aiObj */
    public static aiPlayer: Array<AiObject> = new Array<AiObject>();
    /**活着的所有人机 */
    public static liveAi: Array<AiObject> = new Array<AiObject>();

    /**枪遗落的位置 */
    public static gunLeaveLoc: mw.Vector = new mw.Vector(0, 0, 0);

    /**当前死亡人数 */
    public static dieNum: number = 0;
    /**投掷飞刀的配置表id */
    public static throwKnifeDataId: number = 30000;
}
export class leaveInfo {
    name: string;
    camp: Camp;
    state: PlayerGameState;
    roleId: number;
    hotId: number;
    coldId: number;
}
export enum GamingState {
    /**0初始化游戏，此时还没有玩家进入 */
    InitState,
    /**1等待玩家加入 */
    WaitingState,
    /**2准备阶段，即将开始游戏 */
    ReadyState,
    /**2.1选择地图阶段 */
    MapState,
    /**2.2加载场景阶段 */
    LoadingSceneState,
    /**3初始化游戏场景阶段 */
    InitGameState,
    /**4选择阵营阶段 */
    ChooseState,
    /**5游戏准备阶段 */
    GameReadyState,
    /**6游戏阶段 */
    GamingState,
    /**7游戏终结展示阶段 */
    GamingFinish,
    /**8结算阶段 */
    CalculateState
}

/** 全局音效 */
export class SoundGlobals {
    /**进入 */
    static BGM1: Array<ISoundElement> = GameConfig.Sound.findElements(`Type`, `3`)
    /**大厅 */
    static BGM2: Array<ISoundElement> = GameConfig.Sound.findElements(`Type`, `4`)
    /**地图1 */
    static mapOneBGM: Array<ISoundElement> = GameConfig.Sound.findElements(`Type`, `5`);
    /**地图2 */
    static mapTwoBGM: Array<ISoundElement> = GameConfig.Sound.findElements(`Type`, `6`);
    /**地图3 */
    static mapThrBGM: Array<ISoundElement> = GameConfig.Sound.findElements(`Type`, `7`);
    /**胜利 */
    static BGM3: Array<ISoundElement> = GameConfig.Sound.findElements(`Type`, `0`);
}

/**游戏阵营 */
export enum Camp {
    /**警察 */
    Police,
    /**黑手党 */
    Spy,
    /**平民 */
    Civilian,
    /**英雄 */
    Hero
}
/**击杀方式 */
export enum KillType {
    /**远程 */
    Shoot,
    /**近战 */
    Knife,
    /**自杀 */
    Suicide,
}
/**游戏中玩家的状态 */
export enum PlayerGameState {
    /**准备状态 */
    Ready,
    /**正常 */
    Normal,
    /**保护罩 */
    Protect,
    /**死亡 */
    Die,
    /**死亡并回到大厅 */
    Back,
    /**离开 */
    Leave
}
/**玩家当前武器状态 */
export enum PlayerWeaponState {
    /**没装备 */
    UnEquip,
    /**枪:警探或者英雄 */
    Gun,
    /**刀：黑手党 */
    Knife,
    /**飞刀：黑手党 */
    ThrowKnife
}
export enum CalculateState {
    /**黑手党赢，无英雄 */
    SpyWinNoHero,
    /**黑手党赢，有英雄 */
    SpyWinHero,
    /**黑手党失败，无英雄 */
    SpyLoseNoHero,
    /**黑手党失败，有英雄 */
    SpyLoseHero,
    /**时间到，黑手党失败， */
    TimeNoHero,
    /**时间到，黑手党失败，英雄失败 */
    TimeHero
}
export enum AiOrPlayer {
    RealPlayer,
    AiPlayer
}
export enum ColdWeaponAttackMode {
    Normal,
    FlyKnife
}

