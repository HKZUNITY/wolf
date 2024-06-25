import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import FSMManager from "../../FSM/FSMManager";
import FSM_WaitState from "../../FSM/FSM_WaitState";
import { Camp, GameGlobals, GamingState, Globals, PlayerGameState } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { ecodeType, Tools } from "../../Tools";
import { BagModuleData } from "../BagModule/BagData";
import { BagModuleS } from "../BagModule/BagModuleS";
import { FSMModuleS } from "../FSMModule";
import { GameModuleData } from "../GameModule/GameData";
import { GameModuleS } from "../GameModule/GameModuleS";
import { ShopModuleS } from "../ShopModule/ShopCityModule";
import { ShopModuleData } from "../ShopModule/ShopData";
import { PlayerModuleData } from "./PlayerData";
import { PlayerModuleC } from "./PlayerModuleC";
import { AiModuleS } from "../../AI/AiModule";
import { WalkModuleS } from "../walkModule/WalkModuleS";
import FSM_GamingFinish from "../../FSM/FSM_GamingFinish";
import { MGSHome } from "../../MGSHome";
import ShelterModuleS from "../shelterModule/ShelterModuleS";
import SVIPModuleS from "../SVipModule/SVIPModuleS";
import AttributeManager, { AttributeType } from "../SVipModule/AttributeManager";

export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData> {
    onStart(): void {
        //TODO 动态生成
        // this.initDeathMode();
        this.init_gameRoundTime();
    }
    private playerNameMap: Map<number, string> = new Map<number, string>()
    private deathModelanim: string = GameConfig.Assets.getElement(14003).Guid;
    // public initDeathMode(): void {
    //     for (let i = 0; i < 16; i++) {
    //         SpawnManager.wornAsyncSpawn(`NPC`).then((obj) => {
    //             let model = obj as mw.Character;
    //             model.collisionWithOtherCharacterEnabled = false;
    //             model.worldTransform.position = new mw.Vector(600 + i * 20, -2800, -2745);
    //             PlayerManagerExtesion.rpcPlayAnimation(model, this.deathModelanim, 0);
    //             model.setVisibility(mw.PropertyStatus.Off, true);
    //             GameGlobals.deathCorpseList.push(model);
    //         })
    //     }
    // }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.getPlayerData(player).setLaunchTime(TimeUtil.time());
    }

    public getNoSpyNum(playerId: number) {
        return this.getPlayerData(playerId).getNoSpyNum();
    }

    /**更新游玩时间 */
    public updatePlayTime(playerId: number) {
        let player = Player.getPlayer(playerId);
        if (!player) {
            return;
        }
        let data = this.getPlayerData(playerId)
        data.updatePlayTime(TimeUtil.time());
    }

    /**玩家金币抽奖开始埋点 */
    public playerUseMoneyDraw(playerId: number, boxId: number) {
        let data = this.getPlayerData(playerId);
        let useDraw = data.getUseDraw();
        data.setUseDraw(true);
        this.updatePlayTime(playerId);
        let playTime = data.playTime;
        MGSHome.msgDraw(!useDraw, boxId, true, playTime);
    }

    /**玩家看广告抽奖 */
    public playerWatchAdDraw(playerId: number, boxId: number) {
        let data = this.getPlayerData(playerId);
        this.updatePlayTime(playerId);
        let playTime = data.playTime;
        MGSHome.msgDraw(false, boxId, false, playTime);
    }

    public initPlayerData(player: mw.Player) {
        this.getPlayerData(player).initPlayerData(player.playerId);
        DataCenterS.getData(player, BagModuleData).initBagData();
        DataCenterS.getData(player, GameModuleData).initEnterData();
        DataCenterS.getData(player, ShopModuleData).initShopData();
        //#region 刷新时间
        let t_curData = this.getPlayerData(player);
        if (t_curData == null) {
            return;
        }
        let t_startDay = new Date(new Date().toLocaleDateString());
        let t_startStamp = t_startDay.getTime();    // 今天凌晨的时间戳
        if (t_startStamp >= t_curData.todayGameRoundTime) {
            t_curData.clearTodayGameRoundAndTime();
        }
        if (t_startStamp >= t_curData.hallWatchAdTime) {
            t_curData.clearAddHallWatchAdNum();
            t_curData.clearTodayFreeReward();
            t_curData.clearWatchAdCountDown();
            t_curData.clearHallWatchAdTime();
        }
        //#endregion
    }

    public net_SetPlayerName(str: string) {
        let name = str;
        DataCenterS.getData(this.currentPlayer, PlayerModuleData).setPlayerName(name);
        DataCenterS.getData(this.currentPlayer, PlayerModuleData).save(true);
        this.currentPlayer.character.displayName = name;
        let clientPlayer = this.currentPlayer;
        let clientPlayerId = clientPlayer.playerId;
        this.playerNameMap.set(clientPlayerId, name);
        let keyArray = new Array<number>();
        let valueArray = new Array<string>();
        let vipArray = new Array<number>();
        this.playerNameMap.forEach((value, index) => {
            keyArray.push(index);
            valueArray.push(value);
            vipArray.push(AttributeManager.instance.getAttributeValue(index, AttributeType.ShowSpecialName));
        })

        let allPlayer = new Array<number>();
        Player.getAllPlayers().forEach((player) => {
            allPlayer.push(player.playerId);
        })

        this.getClient(clientPlayer).net_changeName(name);
        Player.getAllPlayers().forEach((player) => {
            this.getClient(player).net_showPlayerName(clientPlayerId, keyArray, valueArray, vipArray);
            //顺手也把人物外形轮廓加一下
            if (clientPlayerId == player.playerId) {
                this.getClient(player).net_initAllPlayerStroke(allPlayer);
            }
            else {
                this.getClient(player).net_initOtherPlayerStroke(clientPlayerId);
            }
        })

    }
    /**更改玩家名称 */
    public changePlayerNameColor(playerId: number, colorId: number) {
        Player.getAllPlayers().forEach((player) => {
            this.getClient(player).net_changePlayerNameColor(playerId, colorId);
        })
    }

    public net_GetPlayerRoleId() {
        return this.currentData.getPlayerRoleId();
    }
    public net_GetPlayerEffectId() {
        return this.currentData.getPlayerEffId();
    }
    public net_InitPlayer(roleId: number) {
        ModuleService.getModule(ShopModuleS).initRole(this.currentPlayerId, roleId);
        //装备武器
        this.currentData.setPlayerOriginRole(roleId);
        this.currentData.save(true);
        //特效
        ModuleService.getModule(ShopModuleS).initShopItem(this.currentPlayer);
        ModuleService.getModule(SVIPModuleS).initPlayerSVIPRight(this.currentPlayer);
    }
    // public net_EquipInitialWeapon(playerId: number) {
    //     let player = Player.getPlayer(playerId);
    //     let cold = DataCenterS.getData(player, BagModuleData).getCurColdWeapon();
    //     let hot = DataCenterS.getData(player, BagModuleData).getCurHotWeapon();
    //     ModuleService.getModule(BagModuleS).equipColdWeapon(player, cold);
    //     ModuleService.getModule(BagModuleS).equipHotWeapon(player, hot);
    // }
    public changeModel(player: mw.Player, character: mw.Character | mw.Character, roleID: number) {
        // return;//TODO:wfz:暂时不用
        this.getClient(player).net_changeModel(roleID, character.gameObjectId);
    }
    public net_SetPlayerModel(playerId: number, roleId: number, isSave: boolean) {
        let player = Player.getPlayer(playerId);
        if (roleId == 0) return;
        if (isSave == true && roleId != 40000) {
            let curRole = this.getPlayerData(player).setPlayerRoleId(roleId);
            if (curRole != 0) {
                this.getPlayerData(player).save(true);
                this.getClient(this.currentPlayer).net_changeRole(curRole);
            }
        }
        this.changeModel(player, player.character, roleId);
        //May To do
        player.character.jumpMaxCount = GameConfig.Rule.getElement(10018).Num;
        player.character.maxJumpHeight = GameConfig.Rule.getElement(10017).Num;
        player.character.maxWalkSpeed = GameConfig.Rule.getElement(10016).Num;

        player.character.collisionWithOtherCharacterEnabled = true;
    }
    public enterHall(player: mw.Player) {
        this.pushCurrentPlayer(player);
        this.initPlayerHallPos(player, true);
        if (GameGlobals.curGameState == GamingState.InitState) {
            this.getClient(player).net_FirstInitHallUI(GamingState.InitState);
            FSMManager.Instance.ChangeState(FSM_WaitState);
        } else if (GameGlobals.curGameState == GamingState.WaitingState) {
            this.getClient(player).net_FirstInitHallUI(GamingState.WaitingState);
            ModuleService.getModule(FSMModuleS).waitEnterCheck();
        } else if (GameGlobals.curGameState == GamingState.ReadyState) {
            let findPlayer = GameGlobals.readyPlayers.find(obj => obj.character == player.character);
            if (!findPlayer) {
                GameGlobals.readyPlayers.push(player);
                this.getClient(player).net_FirstInitHallUI(GamingState.ReadyState);
            }
        } else {
            this.getClient(player).net_FirstInitHallUI(GamingState.GamingState);
        }
        this.updateHallInitInfo(player);

        //=================同步头顶名字UI状态===========
        AiModuleS.aiModelList.forEach(char => {
            char.displayName = "";
        })
        // this.getClient(this.currentPlayerId).net_showNPCName(aiGuid.concat())
        let ai1 = GameObject.findGameObjectById(GameConfig.Rule.getElement(10037).Color) as mw.Character;
        let ai2 = GameObject.findGameObjectById(GameConfig.Rule.getElement(10038).Color) as mw.Character;
        if (ai1 && ai2) {
            ai1.displayName = '';
            ai2.displayName = '';
        }
    }
    private updateHallInitInfo(player: mw.Player) {
        this.net_ChangeDiamond(player.playerId, 0);
        this.changeGold(player, 0);
        this.changeAdvToken(player, 0);
    }
    /**把当前在大厅的玩家以及自身数据传给客户端 */
    public net_initLevelData() {
        let levelArray = new Array<number>();
        let hallPlayerArray = new Array<number>();
        let findPlayer = GameGlobals.hallPlayer.find(obj => obj.playerId == this.currentPlayerId);
        if (!findPlayer) {
            GameGlobals.hallPlayer.push(this.currentPlayer);
        }
        GameGlobals.hallPlayer.forEach((value, index) => {
            let level = this.getPlayerData(value).getLevel();
            hallPlayerArray.push(value.playerId);
            levelArray.push(level);
        })

        Player.getAllPlayers().forEach((player) => {
            this.getClient(player).net_initLevelData(hallPlayerArray, levelArray, this.currentPlayerId)
        })
    }
    /**获取玩家广告券 */
    public getAdvToken(player: mw.Player) {
        let res = this.getPlayerData(player).getAdvToken();
        return res;
    }
    /**更改玩家广告券数量 */
    public changeAdvToken(player: mw.Player, num: number): boolean {
        let result = this.getPlayerData(player).setAdvToken(num);
        if (result == -1) {
            return false;
        }
        else {
            this.getClient(player).net_changeAdvToken(result);
            return true;
        }
    }
    /**
     * 
     * @param player 
     * @param num 加金币传入正数字，减金币传入复数
     * @returns 是否成功，false代表金币不足
     */
    public changeGold(player: mw.Player, num: number): boolean {
        let result = this.getPlayerData(player).setGold(num);
        if (result == -1) {
            return false;
        }
        else {

            this.getPlayerData(player).save(true);
            this.getClient(player).net_changeGold(result);
            return true;
        }
    }

    public tryDesGold(player: mw.Player, num: number) {
        let data = this.getPlayerData(player);
        let haveGold = data.getGold();
        if (haveGold >= num) {
            let res = data.setGold(-num);
            this.getClient(player).net_changeGold(res);
            return true;
        }
        else {
            return false;
        }
    }

    public tryDesDiamond(player: mw.Player, num: number) {
        let data = this.getPlayerData(player);
        let haveGold = data.getDiamond();
        if (haveGold >= num) {
            let res = data.setDiamond(-num);
            this.getClient(player).net_changeDiamond(res);
            return true;
        }
        else {
            return false;
        }
    }

    net_ChangeGold(num: number) {
        this.changeGold(this.currentPlayer, num)
    }

    public changeDiamond(player: mw.Player, num: number): boolean {
        let result = this.getPlayerData(player).setDiamond(num);
        if (result == -1) {
            return false;
        }
        else {
            this.getClient(player).net_changeDiamond(result);
            return true;
        }
    }
    /**改变玩家钻石 */
    public net_ChangeDiamond(playerId: number, num: number): boolean {
        console.error(`kang log net_ChangeDiamond playerId=${playerId} num=${num}`);
        let player = Player.getPlayer(playerId);
        console.error(`kang log net_ChangeDiamond player=${player?.playerId}`);
        let result = this.getPlayerData(player).setDiamond(num);
        if (result == -1) {
            return false;
        }
        else {
            this.getClient(player).net_changeDiamond(result);
            return true;
        }
    }

    /**改变玩家广告券 */
    public net_changeAdvToken(num: number) {
        this.changeAdvToken(this.currentPlayer, num);
    }

    public initReconnectPos(curplayer: mw.Player) {
        this.loadReconnectPlace();
        let index = Tools.getRandomInt(1, GameGlobals.reConnectBornList.length) - 1;
        let bornobj = GameGlobals.reConnectBornList[index];
        let loc = new mw.Vector(bornobj.worldTransform.position.x, bornobj.worldTransform.position.y, bornobj.worldTransform.position.z);
        curplayer.character.worldTransform.position = loc;
        GameGlobals.reConnectBornList.splice(index, 1);
    }
    public initPlayerHallPos(curplayer: mw.Player, isFirst: boolean = false) {
        this.loadHallBornPlace();
        let index = Tools.getRandomInt(1, GameGlobals.hallBornList.length) - 1;
        let bornobj = GameGlobals.hallBornList[index];
        let loc = new mw.Vector(bornobj.worldTransform.position.x, bornobj.worldTransform.position.y, bornobj.worldTransform.position.z + 80);
        oTrace(`BGM ==== 大厅`);
        this.getClient(curplayer).net_playerHallBGM();
        curplayer.character.worldTransform.position = loc;
        GameGlobals.hallBornList.splice(index, 1);
    }
    private pushCurrentPlayer(curplayer: mw.Player) {
        let isExist: boolean = false;

        GameGlobals.currentAllPlayers.forEach((player) => {
            if (player == curplayer) {
                isExist = true;
            }
        })
        if (!isExist) {
            GameGlobals.currentAllPlayers.push(curplayer);
        }
        oTrace("ssssssss当前currentPlayer人数" + GameGlobals.currentAllPlayers.length);
    }
    private loadHallBornPlace() {
        if (GameGlobals.hallBornList.length != 0) return;
        let hallobj = GameObject.findGameObjectById(Globals.hallBornGuid) as mw.GameObject;
        hallobj.getChildren().forEach((obj) => {
            GameGlobals.hallBornList.push(obj);
        })
    }
    private loadReconnectPlace() {
        if (GameGlobals.reConnectBornList.length != 0) return;
        let hallobj = GameObject.findGameObjectById(Globals.reBornGuid) as mw.GameObject;
        hallobj.getChildren().forEach((obj) => {
            GameGlobals.reConnectBornList.push(obj);
        })
    }
    public updateHallWaitNum() {
        GameGlobals.currentAllPlayers.forEach((player) => {
            this.getClient(player).net_SetHallWaitNum(GameGlobals.currentAllPlayers.length);
        })
    }
    public updateHallTip(state: GamingState) {
        GameGlobals.readyPlayers.forEach((player) => {
            this.getClient(player).net_SetHallTip(state);
        })
    }
    public playerBackToHall(player: mw.Player, state: GamingState) {
        if (!Player.getAllPlayers().includes(player)) return;
        ModuleService.getModule(GameModuleS).clearPlayerActionInfo(player.playerId);
        ModuleService.getModule(BagModuleS).hideAutoModule(player);
        this.initPlayerHallPos(player);
        ModuleService.getModule(GameModuleS).playerStateChange(player, PlayerGameState.Back, null);
        ModuleService.getModule(ShopModuleS).unequipWaitItem(player);
        ModuleService.getModule(SVIPModuleS).unequipWaitItem(player);
        this.getClient(player).net_BackToHall(state, FSM_GamingFinish.runFinsh);
        if (GameGlobals.curGameState != GamingState.GamingFinish) {
            player.character.movementEnabled = true;
        }
        let level = this.getPlayerData(player).getLevel()
        GameGlobals.hallPlayer.push(player)
        Player.getAllPlayers().forEach((tempPlayer) => {
            this.getClient(tempPlayer).net_playerBackToHall(player.playerId, level)
        })
    }
    /**更新玩家等级 */
    public updatePlayerLevel(playerId: number, level: number) {
        Player.getAllPlayers().forEach((player) => {
            this.getClient(player).net_updatePlayerLevel(playerId, level)
        })
    }
    /**玩家退出取消等级显示,以及更新玩家在线时间 */
    public playerLeave(playerId: number) {
        Player.getAllPlayers().forEach((player) => {
            this.getClient(player).net_playerLeave(playerId)
        })
        if (this.playerNameMap.has(playerId)) {
            this.playerNameMap.delete(playerId)
        }
        this.updatePlayTime(playerId);
    }
    /**玩家进入游戏，取消等级名牌显示*/
    public playerEnterGame() {
        let playerIdArr: Array<number> = new Array<number>()
        GameGlobals.readyPlayers.forEach((value, index) => {
            playerIdArr.push(value.playerId)
        })
        Player.getAllPlayers().forEach((player) => {
            this.getClient(player).net_playerEnterGame(playerIdArr)
        })
        ModuleService.getModule(ShelterModuleS).setActive(true);
    }
    /**玩家进入终结者观战，取消显示等级 */
    public enterFinishWatch() {
        Player.getAllPlayers().forEach((player: mw.Player) => {
            this.getClient(player).net_enterFinishWatch()
        })
    }
    /**玩家退出终结者观战，显示等级 */
    public exitFinishWatch() {
        Player.getAllPlayers().forEach((player: mw.Player) => {
            this.getClient(player).net_exitFinishWatch()
        })
    }
    //#region 判断时间是否清空数据
    private mInitKey: any = null;
    private clear_initKey(): void {
        if (this.mInitKey) {
            clearTimeout(this.mInitKey);
        }
        this.mInitKey = null;
    }
    /**初始化今日参加场数时间 */
    private init_gameRoundTime(): void {
        let t_startTime = new Date();
        let t_startHours = t_startTime.getHours();
        let t_startMinu = t_startTime.getMinutes();
        let t_startTimeStamp = t_startTime.getSeconds();
        let t_startAll = t_startHours * 60 * 60 + t_startMinu * 60 + t_startTimeStamp;
        let t_overTime = (24 * 60 * 60) - t_startAll;
        // oTrace("kang log 初始化今日参加场数时间=" + t_overTime + " 24点=" + (24 * 60 * 60) + " t_startAll=" + t_startAll);
        this.mInitKey = setTimeout(() => {
            oTrace("kang log 倒计时到第二天了，刷新今日参加场数！！！！！！！！");
            this.clear_initKey();
            this.clear_gameRoundAll();
            this.init_gameRoundTime();
        }, t_overTime * 1000);
    }
    /**清理所有玩家的数据 凌晨 */
    private clear_gameRoundAll(): void {
        let t_players = Player.getAllPlayers();
        for (let index = 0; index < t_players.length; index++) {
            const t_player = t_players[index];
            this.getPlayerData(t_player).clearTodayGameRoundAndTime();
            this.getPlayerData(t_player).clearAddHallWatchAdNum();
            this.getPlayerData(t_player).clearTodayFreeReward();
            this.getPlayerData(t_player).clearWatchAdCountDown();
            this.getPlayerData(t_player).clearHallWatchAdTime();
        }
    }
    //#endregion
    /**获取玩家观看大厅广告次数 */
    public net_getHallAdNum(num: number) {
        let num1 = this.currentData.addHallWatchAdNum(num);
        return num1;
    }

    /**大厅今日免费领取奖励次数 */
    public net_getTodayFreeReward(num: number) {
        let num1 = this.currentData.addTodayFreeReward(num);
        return num1;
    }
    public net_WatchAdCountDown(num: number) {
        let num1 = this.currentData.addWatchAdCountDown(num);
        return num1;
    }
}