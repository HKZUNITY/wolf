import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
﻿/*
 * @Author: tianran.shi
 * @Date: 2023-02-05 18:38:47
 * @LastEditors: xicun.kang
 * @LastEditTime: 2023-03-08 14:20:43
 * @FilePath: \murdermystery3\JavaScripts\Module\GameModule\GameModuleS.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { AiModuleS } from "../../AI/AiModule";
import { AiObject } from "../../AI/AiObject";
import FSMManager from "../../FSM/FSMManager";
import FSM_CalculateState from "../../FSM/FSM_CalculateState";
import { GameCache, PlayerGamingInfo } from "../../GameCache";
import { AiOrPlayer, Camp, GameGlobals, GamingState, Globals, KillType, PlayerGameState, PlayerWeaponState, SoundGlobals } from "../../Globals";
import { MGSHome } from "../../MGSHome";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { BagModuleData } from "../BagModule/BagData";
import { BagModuleS } from "../BagModule/BagModuleS";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { SceneModuleS } from "../ProcModule/SceneModule";
import { WatchModuleS } from "../ProcModule/WatchModule";
import { GameModuleData } from "./GameData";
import { GameModuleC } from "./GameModuleC";
import { PropObj, PropState } from "./PropObj";
import SoundManager = mw.SoundService;
import { AutoAimModuleS } from "../Weapon/Aim/AutoAimModuleS";
import { IWeaponElement } from "../../Tables/Weapon";
import BedTrigger, { HospitalBed } from "../../Prefabs/床01/Script/BedTrigger";
import FSM_GamingFinish from "../../FSM/FSM_GamingFinish";
import { AiState } from "../../AI/AiStateMachine";
import { SkillModuleS } from "../SkillModule/SkillModuleS";
import { GuideConfig } from "../../Tables/Guide";
import AttributeManager, { Attribute, AttributeType } from "../SVipModule/AttributeManager";
export class GameModuleS extends ModuleS<GameModuleC, GameModuleData>{
    private propObjMap: Map<number, PropObj> = new Map<number, PropObj>();
    private protectCoverMap: Map<mw.Player, number> = new Map<mw.Player, number>();
    private deathModelMap: Map<mw.Player, mw.Character> = new Map<mw.Player, mw.Character>();
    private deathAnimArray: Array<mw.Animation> = new Array<mw.Animation>();
    /** 死亡模型, 特效 */
    private girlDieEffectId= "157253";
    private boyDieEffectId= "157254";
    private killedSoundId: number = 10025;
    /**玩家死亡并且留在场上的时间 */
    private dieTime = 6;
    /**清除外形的轮询 */
    private clearTimer;
    /**保护罩缩放 */
    private protectScale: mw.Vector
    /**保护罩位置 */
    private protectPos: mw.Vector
    /**保护罩旋转 */
    private protectRot: mw.Vector
    /**保护罩插槽 */
    private protectSocket: number
    /**玩家伪装病床map */
    private playerToBedMap: Map<number, string> = new Map<number, string>()
    onStart(): void {
        this.protectScale = new mw.Vector(0.5, 0.5, 1.2)
        this.protectPos = new mw.Vector(0, 0, 0)
        this.protectRot = new mw.Vector(0, 0, 0)
        this.protectSocket = 23
        this.clonePropTigger(GameConfig.PropsGenerate.getElement(9998).Num);
        Event.addLocalListener(BedTrigger.subBedEnterServerEvent, this.onPlayerEnterAction.bind(this))
        Event.addLocalListener(BedTrigger.subBedLeaveServerEvent, this.onPlayerLeaveAction.bind(this))
    }
    removeCoverEffect(player: mw.Player) {
        let effectId = this.protectCoverMap.get(player);
        if (effectId == undefined) return;
        EffectService.stop(effectId);
        this.protectCoverMap.delete(player);
    }
    clonePropTigger(total: number) {
        GameObject.asyncFindGameObjectById("21018C61").then(go => {
            if (!!go) {
                for (let i = 0; i < total; i++) {
                    let obj = go.clone() as mw.Trigger;
                    obj.onEnter.add(this.onPropIn.bind(this, i));
                    let propObj = new PropObj(i, obj);
                    this.propObjMap.set(i, propObj);
                }
            }
        })
    }

    public getPlayerCamp(player: number|mw.Player){
        return this.getPlayerData(player).getPlayerCamp();
    }

    public getPlayerWeaponState(player: number|mw.Player){
        return this.getPlayerData(player).getWeaponState();
    }

    onPropIn(index: number, char: mw.GameObject) {
        if (PlayerManagerExtesion.isNpc(char)) {
            let aiModel = char as mw.Character;
            if (Tools.isAiPlayer(aiModel)) {
                let ai = Tools.getAiObj(aiModel);
                let camp = ai.camp;
                if (camp != Camp.Civilian) return;
                let res = ai.changeProp(1);
                if (res.isChange) {
                    this.propObjMap.get(index).propGet();
                    if (res.total == GameConfig.PropsGenerate.getElement(9997).Num) {
                        ModuleService.getModule(AiModuleS).aiStateChange(ai, PlayerGameState.Protect, null);
                    }
                }
            }

        }
        else if (PlayerManagerExtesion.isCharacter(char)) {
            oTrace("有玩家进入了道具触发器" + index);
            if (this.propObjMap.get(index).propState != PropState.Active) return;
            let player = (char as mw.Character).player;
            let camp = this.getPlayerData(player).getPlayerCamp();
            if (camp != Camp.Civilian) return;
            let res = this.getPlayerData(player).changePropNum(1);
            if (res.isChange) {
                mw.SoundService.play3DSound(GameConfig.Assets.getElement(10012).Guid, char.worldTransform.position, 1);
                //  通知该客户端更新道具数量，并提示获得了一个道具，
                this.getClient(player).net_UpdatePropNum(res.total, this.propObjMap.get(index).propTableIndex);
                //  并通知其他所有平民客户端销毁该特效
                this.propObjMap.get(index).propGet();
                if (res.total == GameConfig.PropsGenerate.getElement(9997).Num) {
                    this.playerStateChange(player, PlayerGameState.Protect, null);
                }
                ModuleService.getModule(WatchModuleS).rpcToWatch(2);
            }
            else {
                //通知本局道具数量已经满了
                this.getClient(player).net_ShowTip(10004);
            }
        }
    }
    createPropEffect(tableId: number) {
        if (tableId == 0) return;
        GameGlobals.readyPlayers.forEach((player) => {
            let camp = this.getPlayerData(player).getPlayerCamp();
            let state = this.getPlayerData(player).getState();
            if (camp == Camp.Civilian || state == PlayerGameState.Back) {
                this.getClient(player).net_CreatePropEffect(tableId);
            }
        })
    }
    removePropEffect(tableId: number) {
        GameGlobals.readyPlayers.forEach((player) => {
            this.getClient(player).net_RemovePropEffect(tableId);
        })
    }
    removeAllProp() {
        this.propObjMap.forEach((obj) => {
            obj.setPropState(PropState.NotActive);
        })
    }
    initProp() {
        this.propObjMap.forEach((obj) => {
            obj.setPropState(PropState.Active);
        })
    }
    public initGameData() {
        GameGlobals.readyPlayers.forEach((player) => {
            let camp = Camp.Civilian;
            if (player == GameGlobals.spyPlayer) {
                camp = Camp.Spy;
            } else if (player == GameGlobals.policePlayer) {
                camp = Camp.Police;
            }
            this.getPlayerData(player).initPlayerGameData(camp, player.playerId);
            DataCenterS.getData(player, PlayerModuleData).addNoSpyNum(camp);
            DataCenterS.getData(player, PlayerModuleData).save(true);
            oTrace("ChooseReal" + camp + player.playerId);
        })
        GameCache.initAll();
        GameGlobals.aiPlayer.forEach((aiobj) => {
            let camp = Camp.Civilian;
            if (aiobj == GameGlobals.spyAi) {
                camp = Camp.Spy;
            } else if (aiobj == GameGlobals.policeAi) {
                camp = Camp.Police;
            }
            aiobj.camp = camp;
            oTrace("ChooseAi" + camp + aiobj.aiName);
        })
        ModuleService.getModule(AutoAimModuleS).onInitData()
    }
    gameReady() {
        GameGlobals.readyPlayers.forEach((player) => {
            let isfirstround = DataCenterS.getData(player, PlayerModuleData).addGameRound(0);
            if (isfirstround == 0) {
                MGSHome.coreStart(player);
            }
            let camp = this.getPlayerData(player).getPlayerCamp();
            let coolTime = 0
            if (camp == Camp.Spy) {
                coolTime = GameConfig.Rule.getElement(40009).Time;
            }
            else {
                coolTime = GameConfig.Rule.getElement(40007).Time;
            }
            let maxCoin = this.getPlayerData(player).getMaxCoin();
            this.getClient(player).net_ShowGameUI(camp, GameGlobals.startMax - 1, coolTime, maxCoin);
        })
    }

    showRoleNum() {
        let hasGun: boolean = false;
        GameGlobals.readyPlayers.forEach((player) => {
            if (!Player.getAllPlayers().includes(player)) return;
            let state = this.getPlayerData(player).getState()
            let camp = this.getPlayerData(player).getPlayerCamp();
            if (state == PlayerGameState.Ready || state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
                if (camp == Camp.Police || camp == Camp.Hero) { hasGun = true; }
            }
        })
        GameGlobals.aiPlayer.forEach((aiobj) => {
            if (aiobj.aiGameState == PlayerGameState.Ready || aiobj.aiGameState == PlayerGameState.Normal || aiobj.aiGameState == PlayerGameState.Protect) {
                if (aiobj.camp == Camp.Police || aiobj.camp == Camp.Hero) { hasGun = true; }
            }
        })
        let spyState: PlayerGameState
        let spyNum: number = 0;
        let curNum: number = 0;
        if (GameGlobals.isSpyReal) {
            if (!Player.getAllPlayers().includes(GameGlobals.spyPlayer)) {
                spyState = PlayerGameState.Leave;
            } else {
                spyState = this.getPlayerData(GameGlobals.spyPlayer).getState();
            }
        } else {
            spyState = GameGlobals.spyAi.aiGameState
        }
        if (spyState == PlayerGameState.Normal) {
            spyNum = 1;
        }
        if (GameGlobals.curGameState == GamingState.GameReadyState) {
            curNum = GameGlobals.startMax - 1;
        } else {
            curNum = GameGlobals.liveAi.length + GameGlobals.livePlayers.length - spyNum;
        }
        let allNum = GameGlobals.startMax - 1;
        this.getAllClient().net_ShowLiveNum(curNum, allNum, hasGun);
    }

    /**获取各阵营存活人数 */
    getCivilianNum(camp: Camp) {

        let num: number = 0;
        GameGlobals.aiPlayer.forEach((aiobj) => {
            let aiState = aiobj.aiGameState
            if (aiState == PlayerGameState.Ready || aiState == PlayerGameState.Normal || aiState == PlayerGameState.Protect) {
                if (camp == aiobj.camp) {
                    num++;
                }
            }
        })
        GameGlobals.allGamePlayers.forEach((player) => {
            if (!Player.getAllPlayers().includes(player)) return;
            let pCamp = this.getPlayerData(player).getPlayerCamp();
            let state = this.getPlayerData(player).getState()
            if (state == PlayerGameState.Ready || state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
                if (camp == pCamp) {
                    num++;
                }

            }
        })
        return num;
    }

    gameForceEnd(){
        GameGlobals.readyPlayers.forEach((player) => {
            this.getClient(player).net_HideTitle();
        })
    }

    gameBegin() {
        GameGlobals.readyPlayers.forEach((player) => {
            this.playerStateChange(player, PlayerGameState.Normal, null);
            this.getClient(player).net_ChangeTitle(11002);
            this.getClient(player).net_getCoin(0);
        })
        GameCache.gamePlayersInfo.forEach((info, player) => {
            if (info.state == PlayerGameState.Leave) {
                this.playerLeaveBeforeStart(player, info);
            }
        })
        GameGlobals.aiPlayer.forEach((aiobj) => {
            ModuleService.getModule(AiModuleS).aiStateChange(aiobj, PlayerGameState.Normal, null);
        })
    }
    /**根据击中方式在尸体位置播放特效 */
    public playDeadEffect(character: mw.Character|mw.Character, attackStaus: KillType, isFinal: boolean) {
        let pos = character.worldTransform.position;
        let isMale = this.getPlayerSex(character);
        if (!isFinal) {
            if (attackStaus == KillType.Shoot) {
                let config = GameConfig.Rule.getElement(60003);
                GeneralManager.rpcPlayEffectAtLocation(config.Guid, pos.clone().add(config.Pos), 1, Rotation.zero, config.Scale);
            }
            else if(attackStaus == KillType.Knife){
                let config = GameConfig.Rule.getElement(60002);
                GeneralManager.rpcPlayEffectAtLocation(config.Guid, pos.clone().add(config.Pos), 1, Rotation.zero, config.Scale);
            }
            else{
                let config = GameConfig.Rule.getElement(60015);
                GeneralManager.rpcPlayEffectAtLocation(config.Guid, pos.clone().add(config.Pos), 1, Rotation.zero, config.Scale);
            }
            
            setTimeout(() => {
                if (!character.worldTransform) {
                    return;
                }
                let afterPos = character.worldTransform.position;
                if (afterPos) {
                    pos = afterPos.clone();
                }
                
                let dataInfo = GameConfig.Rule.getElement(60004);    
                if (isMale) {
                    GeneralManager.rpcPlayEffectAtLocation(this.boyDieEffectId, pos.clone().add(dataInfo.Pos), -dataInfo.Time, Rotation.zero, dataInfo.Scale);
                }
                else {
                    GeneralManager.rpcPlayEffectAtLocation(this.girlDieEffectId, pos.clone().add(dataInfo.Pos), -dataInfo.Time, Rotation.zero, dataInfo.Scale);
                }
            }, (this.dieTime- 1)* 1000);
        }
        else{
            let config = GameConfig.Rule.getElement(60014);
            GeneralManager.rpcPlayEffectAtLocation(config.Guid, pos.clone().add(config.Pos), 1, Rotation.zero, config.Scale);
        }

    }

    private getPlayerSex(character: mw.Character){
        let somaType = character.description.advance.base.characterSetting.somatotype;
        let isMale = somaType == mw.SomatotypeV2.AnimeMale || somaType == mw.SomatotypeV2.CartoonyMale || somaType == mw.SomatotypeV2.LowpolyAdultMale || somaType == mw.SomatotypeV2.RealisticAdultMale;
        return isMale;
    }
    /**攻击方展示消灭飘字 */
    public showAttackTip(character: mw.Character| mw.Character, attackStaus: Camp){
        let police = GameGlobals.policePlayer || GameGlobals.heroPlayer;
        let pos = character.worldTransform.position.clone()
        if (attackStaus == Camp.Spy && GameGlobals.spyPlayer) {
            this.getClient(GameGlobals.spyPlayer).net_showAttackTip(pos);
        }
        else if(attackStaus == Camp.Police && police){
            this.getClient(police).net_showAttackTip(pos);
        }
    }
    /**整体通报除了死亡的玩家有其他玩家死亡了，死亡的玩家需要特殊显示自己的死因 */
    someoneDieTip(diePlayerId: number, attackStaus: Camp) {
        GameGlobals.readyPlayers.forEach((player) => {
            let state = this.getPlayerData(player).getState();
            if (state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
                this.getClient(player).net_ShowTip(10009);
            }
        })
        if (diePlayerId) {
            let dieCamp = this.getPlayerData(diePlayerId).getPlayerCamp();
            let haveGun = dieCamp == Camp.Police || dieCamp == Camp.Hero;
            if (attackStaus == Camp.Spy) {
                this.getClient(diePlayerId).net_ShowTip(20009);
            }
            else if (attackStaus == Camp.Police && haveGun) {
                this.getClient(diePlayerId).net_ShowTip(20010);
            }
            else if(attackStaus == Camp.Police && !haveGun){
                this.getClient(diePlayerId).net_ShowTip(20011);
            }
        }
        Tools.playSound(this.killedSoundId);
    }
    finalTip(timeIsOut: boolean) {
        GameGlobals.readyPlayers.forEach((player) => {
            let camp = this.getPlayerData(player).getPlayerCamp();
            let state = this.getPlayerData(player).getState();
            if (state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
                if (camp == Camp.Civilian) {
                    this.getClient(player).net_FinalEffect(true);
                    ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 1);
                }
                else if (camp == Camp.Spy) {
                    if (timeIsOut) {
                        this.getClient(player).net_FinalEffect(false);
                        ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 2);
                    }
                    else {
                        this.getClient(player).net_FinalEffect(true);
                        ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 1);
                    }
                }
                else {
                    if (timeIsOut) {
                        this.getClient(player).net_FinalEffect(false);
                        ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 2);
                    }
                    else {
                        this.getClient(player).net_FinalEffect(true);
                        ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 1);
                    }
                }
            }
        })
    }
    removeAllDeathModel() {
        let index = 0;
        this.recoverDeathModelAppearance();
        this.deathModelMap.forEach((model, key) => {
            model.worldTransform.position = new mw.Vector(index * 200 - 580, -3670, -2855);
            this.deathModelMap.delete(key);
            index++;
        })
        // this.deathAim.forEach((aim, playerId) => {
        //     aim.stop();
        // })
        this.deathAnimArray.forEach((value)=>{
            value.stop();
        })
        this.deathAnimArray.length = 0;
    }
    createDeathModel(player: mw.Player) {
        if (!this.deathModelMap.has(player)) {
            return;
        }
        let deathModel = this.deathModelMap.get(player);
        let deathGuid = GameConfig.Assets.getElement(14003).Guid;
        let aim = PlayerManagerExtesion.loadAnimationExtesion(deathModel, deathGuid);
        aim.loop = 0;
        aim.play();
        this.deathAnimArray.push(aim);
        deathModel.collisionWithOtherCharacterEnabled = false;
        ModuleService.getModule(AutoAimModuleS).onCreateDeathModel(deathModel.gameObjectId);
    }

    public changeDeathModelAppearance(){
        this.deathModelMap.clear();
        console.error("模型数量", GameGlobals.deathModelList.length);
        console.error("玩家数量", GameGlobals.enterGameNormalPlayers.length);
        GameGlobals.enterGameNormalPlayers.forEach((player)=>{
            let deathModel = GameGlobals.deathModelList[0];
            GameGlobals.deathModelList.splice(0, 1);
            if (!deathModel) {
                return;
            }
            this.getClient(player).net_changModelAppearance(deathModel.gameObjectId);
            this.deathModelMap.set(player, deathModel);
        })
    }

    public recoverDeathModelAppearance(){
        let guidArr: Array<string> = new Array<string>();
        this.deathModelMap.forEach((value)=>{
            guidArr.push(value.gameObjectId);
        })
        let index = 0;
        this.getClient(Player.getAllPlayers()[index]).net_recoverDeathModelAppear(guidArr);
        index++;
        this.clearTimer = TimeUtil.setInterval(()=>{
            if (index >= Player.getAllPlayers().length) {
                console.error("所有玩家都挂起了先停止吧");
                if (this.clearTimer) {
                    TimeUtil.clearInterval(this.clearTimer);
                    this.clearTimer = null;
                    return;
                }
            }
            this.getClient(Player.getAllPlayers()[index]).net_recoverDeathModelAppear(guidArr);
            index++;
        }, 2);
    }

    public net_isRecover(){
        if (this.clearTimer) {
            TimeUtil.clearInterval(this.clearTimer);
            this.clearTimer = null;
        }
    }

    playerLeaveBeforeStart(player: mw.Player, info: PlayerGamingInfo) {
        if (info.isFirstLeave == false) return;
        info.isFirstLeave = false;
        oTrace("有玩家游戏前离开");
        ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 0);
        GameGlobals.livePlayers = GameGlobals.livePlayers.filter(item => item != player);
        ModuleService.getModule(WatchModuleS).rpcToWatch(2);
        if (info.camp == Camp.Hero || info.camp == Camp.Police) {
            //留下枪械
            oTrace("警察留下枪械");
            ModuleService.getModule(SceneModuleS).changeBoxLocationToDeath(new mw.Vector(-80, 2265, 800));
        }
        setTimeout(() => {
            ModuleService.getModule(WatchModuleS).someoneDieOnWatch(player.character);
        }, this.dieTime* 1000);
        if (GameGlobals.curGameState == GamingState.GamingState) {
            this.gamePlayerCheck();
        }
    }
    playerLeave(player: mw.Player) {
        oTrace("有玩家离开");
        let info = GameCache.gamePlayersInfo.get(player);
        let playerId = player.playerId;
        if (info == undefined) {
            oTrace("找不到玩家信息playerleave")
            return;
        }
        if (info.isFirstLeave == false) {
            oTrace("玩家不是第一次离开当局游戏")
            return;
        }
        info.isFirstLeave = false;
        let state = this.getPlayerData(player).getState();
        if (state == PlayerGameState.Back || state == PlayerGameState.Die) {
            this.playerGameOverDelay(player, false)
            oTrace("玩家已经死亡过了")
            return;
        }

        let loc = player.character.worldTransform.position;
        ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 0);
        GameGlobals.livePlayers = GameGlobals.livePlayers.filter(item => item != player);
        ModuleService.getModule(WatchModuleS).rpcToWatch(2);
        if (state == PlayerGameState.Ready || state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
            /**玩家中途离开，如果玩家没有死亡的话就走正常死亡逻辑，不包含受击特效 */
            this.createDeathModel(player);
            this.playerGameOverDelay(player, false);
            let pos = player.character.worldTransform.position;
            let isMale = this.getPlayerSex(player.character);
            let dataInfo = GameConfig.Rule.getElement(60004);    
            if (isMale) {
                GeneralManager.rpcPlayEffectAtLocation(this.boyDieEffectId, pos.clone().add(dataInfo.Pos), -dataInfo.Time, Rotation.zero, dataInfo.Scale);
            }
            else {
                GeneralManager.rpcPlayEffectAtLocation(this.girlDieEffectId, pos.clone().add(dataInfo.Pos), -dataInfo.Time, Rotation.zero, dataInfo.Scale);
            }
        }
        if (state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
            /**断线的不给他发信息了 */
            this.someoneDieTip(null, null);
        }
        let camp = this.getPlayerData(player).getPlayerCamp();
        if (camp == Camp.Hero || camp == Camp.Police) {
            //留下枪械
            oTrace("警察或英雄死亡，留下枪械" + loc);
            ModuleService.getModule(SceneModuleS).changeBoxLocationToDeath(loc);
        }
        ModuleService.getModule(WatchModuleS).someoneDieOnWatch(player.character);

        if (GameGlobals.curGameState == GamingState.GamingState) {
            this.gamePlayerCheck();
        }
    }

    playerGameOver(player: mw.Player, weaponId: number, attackCamp: Camp, killType: KillType) {
        // oTraceError(`Death :: 玩家 本体模型 ==== 玩家死亡 playerID:${player.playerId} weaponId:${weaponId}`);
        ModuleService.getModule(BagModuleS).hideAutoModule(player);
        PlayerManagerExtesion.changeStanceExtesion(player.character,``);

        setTimeout(() => {
            Tools.deathAim(true, player.playerId);
        }, 60);
        let loc = player.character.worldTransform.position;

        oTraceError(`DeathModel  4::: ${player.character.worldTransform.position}`);

        let config = GameConfig.Weapon.getElement(weaponId);
        if (config.Type == 0) {
            if (GameConfig.Sound.getElement(10007).Guid) {
                let area = { radius: GameConfig.Sound.getElement(10007).InnerRadius, falloffDistance: GameConfig.Sound.getElement(10007).FalloffDistance };
                mw.SoundService.play3DSound(GameConfig.Sound.getElement(10007).Guid, player.character.worldTransform.position, 1, GameConfig.Sound.getElement(10007).Rate, area)
            }
        }
        this.clearPlayerActionInfo(player.playerId);
        // player.character.movementEnabled = false;
        // PlayerManagerExtesion.rpcPlayAnimation(player.character, GameConfig.Assets.getElement(15005).Guid, this.dieTime);

        //播放死亡UI和死亡声音
        this.getClient(player).net_DieEffect();

        ModuleService.getModule(WatchModuleS).rpcEffect(player.character, 0);
        GameGlobals.livePlayers = GameGlobals.livePlayers.filter(item => item != player);
        ModuleService.getModule(WatchModuleS).rpcToWatch(2);
        ModuleService.getModule(AutoAimModuleS).onPlayerDead(player)
        ModuleService.getModule(SkillModuleS).deleteOnPlayerSkill(player.playerId);
        this.getClient(player).net_playerGameOver();
        //局内广播死亡信息
        this.someoneDieTip(player.playerId, attackCamp);
        this.showAttackTip(player.character, attackCamp);
        let camp = this.getPlayerData(player).getPlayerCamp();
        if (camp == Camp.Hero || camp == Camp.Police) {
            //留下枪械
            oTrace("警察或英雄死亡，留下枪械" + loc);
            ModuleService.getModule(SceneModuleS).changeBoxLocationToDeath(loc);
            this.tipOnWeaponLeave();
            //
        }
        this.createDeathModel(player);
        setTimeout(() => {
            let allGamePlayers = Player.getAllPlayers()
            let res = allGamePlayers.includes(player)
            if (res == false) {
                return
            }
            this.playerGameOverDelay(player, true);
        }, (this.dieTime) * 1000);
        let time = GameConfig.Rule.getElement(10039).Time;
        if (time) {
            setTimeout(() => {
                let allGamePlayers = Player.getAllPlayers()
                let res = allGamePlayers.includes(player)
                if (res == false) {
                    return
                }
                Tools.deathAim(false, player.playerId);
            }, time * 1000);
        }
        /**暂时只有黑手党有技能 */
        if (attackCamp == Camp.Spy && GameGlobals.spyPlayer) {
            ModuleService.getModule(SkillModuleS).killOtherAndSkillUpdate(GameGlobals.spyPlayer.playerId);
        }
        //判断游戏是否结束
        if (GameGlobals.curGameState == GamingState.GamingState) {
            let res = this.gamePlayerCheck();
            this.playDeadEffect(player.character, killType, res);
        }
    }
    // private deathAim: Map<number, mw.Animation> = new Map();
    playerGameOverDelay(player: mw.Player, normal: boolean) {
        let loc = player.character.worldTransform.position.clone();
        let roc = player.character.worldTransform.rotation.clone();
        if (!FSM_GamingFinish.runFinsh) {
            ModuleService.getModule(WatchModuleS).someoneDieOnWatch(player.character);
        }
        // //游戏中添加尸体模型
        if (this.deathModelMap.has(player)) {
            let loc1 = new mw.Vector(loc.x, loc.y, loc.z - 75);
            let loc2 = loc.add(new mw.Vector(0, 0, 60));
            this.deathModelMap.get(player).worldTransform.position = loc2;
            this.deathModelMap.get(player).worldTransform.rotation = roc;
            oTraceError(`DeathModel  51::: ${loc1}`);
            oTraceError(`DeathModel  6::: ${this.deathModelMap.get(player).worldTransform.position}`);
        }

        //回到大厅:位置，UI的显示,局内游戏数据的设置
        if (normal == false) {
            return
        }
        ModuleService.getModule(PlayerModuleS).playerBackToHall(player, GamingState.GamingState);

    }
    /**提醒平民捡枪 */
    tipOnWeaponLeave() {
        GameGlobals.livePlayers.forEach((player) => {
            let camp = this.getPlayerData(player).getPlayerCamp();
            let state = this.getPlayerData(player).getState();
            if (camp == Camp.Civilian) {
                if (state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
                    this.getClient(player).net_ShowTip2(10010, 1);
                }
            }
        })
    }
    /**返回结果为对局是否结束 */
    gamePlayerCheck() {
        let dieNum = 0;
        let spyExist: boolean = true;
        GameGlobals.allGamePlayers.forEach((player) => {
            let state;
            let camp;
            let info = GameCache.gamePlayersInfo.get(player);
            if (info == undefined) {
                oTrace("gameplayerCheck:找不到info" + player.playerId);
                state = 3//this.getPlayerData(player).getState();
                camp = 2//this.getPlayerData(player).getPlayerCamp();
            } else {
                state = info.state;
                camp = info.camp;
            }
            if (camp != Camp.Spy && (state == PlayerGameState.Back || state == PlayerGameState.Leave || state == PlayerGameState.Die)) {
                dieNum++;
            }
            if (camp == Camp.Spy && (state == PlayerGameState.Back || state == PlayerGameState.Leave || state == PlayerGameState.Die)) {
                spyExist = false;
            }
        })
        GameGlobals.aiPlayer.forEach((aiobj) => {
            let state = aiobj.aiGameState;
            let camp = aiobj.camp;
            if (camp != Camp.Spy && (state == PlayerGameState.Back || state == PlayerGameState.Leave || state == PlayerGameState.Die)) {
                dieNum++;
            }
            if (camp == Camp.Spy && (state == PlayerGameState.Back || state == PlayerGameState.Leave || state == PlayerGameState.Die)) {
                spyExist = false;
            }
        })
        GameGlobals.dieNum = dieNum;
        if (GameGlobals.isSpyReal) {
            if (GameCache.gamePlayersInfo.get(GameGlobals.spyPlayer).state != PlayerGameState.Leave) {
                this.getClient(GameGlobals.spyPlayer).net_UpdateKillNum(dieNum, GameGlobals.startMax - 1);
            }
        }
        this.showRoleNum();
        oTrace("当前死亡总人数" + dieNum);
        oTrace(`Death ::当前死亡人数 ${dieNum} 黑手党是否存活 ${spyExist}`);
        if (dieNum == GameGlobals.startMax - 1 || !spyExist) {
            // FSM_CalculateState.timeIsOut = false;
            this.getAllClient().net_stopExp();
            FSMManager.Instance.ChangeState(FSM_GamingFinish);
            return true;
        }
        return false;
    }
    /**切换玩家到死亡状态的时候需要给后两个参数 */
    public playerStateChange(player: mw.Player, state: PlayerGameState, weapoid: number, attackCamp?: Camp, killType?: KillType) {
        if (GameCache.gamePlayersInfo.get(player) == undefined) return;
        GameCache.gamePlayersInfo.get(player).state = state;
        let beforeState = this.getPlayerData(player).getState();
        this.getPlayerData(player).changeState(state);
        let camp = this.getPlayerData(player).getPlayerCamp();
        if (beforeState == PlayerGameState.Ready && state == PlayerGameState.Normal) {
        }
        if (beforeState == PlayerGameState.Normal && state == PlayerGameState.Protect) {
            //保护罩出现，提示获得了保护壳
            oTrace("生成保护壳")
            let effectId = GeneralManager.rpcPlayEffectOnPlayer(GameConfig.Assets.getElement(12001).Guid, player, this.protectSocket, -50, this.protectPos, this.protectRot.toRotation(), this.protectScale);
            this.protectCoverMap.set(player, effectId);
            this.getClient(player).net_ShowTip(10005);
        }
        if (beforeState == PlayerGameState.Protect && state == PlayerGameState.Normal) {
            this.removeCoverEffect(player);
            let effectInfo = GameConfig.Rule.getElement(70003);
            GeneralManager.rpcPlayEffectOnPlayer(effectInfo.Guid, player, this.protectSocket, 1, effectInfo.Pos, Rotation.zero, effectInfo.Scale);
            if (camp == Camp.Civilian) {
                this.getClient(player).net_ShowTip(10006);
            }
            if (camp == Camp.Hero) {
                this.getClient(player).net_ShowTip(10007);
            }
        }
        if (state == PlayerGameState.Die) {
            //进行一些列死亡表现后
            this.playerGameOver(player, weapoid, attackCamp, killType);
        }
        if (state == PlayerGameState.Back) {
            this.getClient(player).net_RemoveAllPropEffect();
            this.removeCoverEffect(player);
        }
        this.showRoleNum();
    }
    public net_ChangeCoin(playerID: number, num: number) {
        let player = Player.getPlayer(playerID);
        let result = this.getPlayerData(player).setGold(num);
        if (result == -1) {//超了
            return false;
        }
        else {//未满与满
            if (result == this.getPlayerData(player).getMaxCoin()) {
                //提示金币袋已满
                this.getClient(player).net_ShowTip2(10008, 0);
            }
            this.getPlayerData(player).save(true);
            this.getClient(player).net_getCoin(result);
            return true;
        }
    }
    public serverChangeHp(configId: number, isReal: AiOrPlayer, attackCamp: Camp, killType: KillType, player?: mw.Player, ai?: AiObject) {
        let config = GameConfig.Weapon.getElement(configId);
        if (isReal == AiOrPlayer.RealPlayer) {
            oTrace("玩家受到伤害" + player.playerId);
            let state = this.getPlayerData(player).getState();
            if (state != PlayerGameState.Normal && state != PlayerGameState.Protect) return -1;
            if (state == PlayerGameState.Protect) {
                this.playerStateChange(player, PlayerGameState.Normal, null);
                return 100;
            }
            let hp = this.getPlayerData(player).changeHp(config.Damage);
            if (hp <= 0) {
                GameGlobals.dieNum++;
                this.playerStateChange(player, PlayerGameState.Die, config.ID, attackCamp, killType);
            }
            return hp;
        }
        else {
            oTrace("人机受到伤害" + ai.aiName);
            let state = ai.aiGameState;
            if (state != PlayerGameState.Normal && state != PlayerGameState.Protect) return -1;
            if (state == PlayerGameState.Protect) {
                ModuleService.getModule(AiModuleS).aiStateChange(ai, PlayerGameState.Normal, null)
                return 100;
            }
            ai.aiHp -= config.Damage;
            if (ai.aiHp <= 0) {
                GameGlobals.dieNum++;
                ModuleService.getModule(AiModuleS).aiStateChange(ai, PlayerGameState.Die, config.ID, attackCamp, killType);
            }
            return ai.aiHp;
        }

    }

    public getPlayerGameState(playerId: number){
        return this.getPlayerData(playerId).getState();
    }

    public net_ChangeWeapon(weaState: PlayerWeaponState) {
        this.changePlayerWeaponState(this.currentPlayer, weaState)
    }

    public changeWeaponState(player: mw.Player| number, state: PlayerWeaponState){
        let data = this.getPlayerData(player);
        if (!data) {
            return;
        }
        data.setWeaponState(state);
    }

    public changePlayerWeaponState(curPlayer: mw.Player, weaState: PlayerWeaponState) {
        this.getPlayerData(curPlayer).addSwitchNum(1);
        this.getPlayerData(curPlayer).setWeaponState(weaState);
        switch (weaState) {
            case PlayerWeaponState.Gun:
                ModuleService.getModule(BagModuleS).useHotWeapon(curPlayer);
                curPlayer.character.maxWalkSpeed = GameConfig.Rule.getElement(10016).Num;
                break;
            case PlayerWeaponState.Knife:
                ModuleService.getModule(BagModuleS).useColdWeapon(curPlayer);
                ModuleService.getModule(SkillModuleS).updateBuffActive(curPlayer.playerId);
                break;
            case PlayerWeaponState.UnEquip:
                ModuleService.getModule(BagModuleS).notUseBothWeapon(curPlayer);
                ModuleService.getModule(SkillModuleS).updateBuffActive(curPlayer.playerId);
                break;
            case PlayerWeaponState.ThrowKnife:
                ModuleService.getModule(BagModuleS).throwColdWeapon(curPlayer);
                ModuleService.getModule(SkillModuleS).updateBuffActive(curPlayer.playerId);
                break;
        }
    }
    /**玩家进入交互物 */
    public onPlayerEnterAction(playerId: number, scriptId: string) {
        let player = Player.getPlayer(playerId);
        this.changePlayerWeaponState(player, PlayerWeaponState.UnEquip)
        console.error("玩家进入交互物体");
        
        this.playerToBedMap.set(player.playerId, scriptId)
    }
    /**玩家离开交互物 */
    public onPlayerLeaveAction(playerId: number) {
        let player = Player.getPlayer(playerId);
        if (this.playerToBedMap.has(player.playerId)) {
            this.playerToBedMap.delete(player.playerId)
        }
    }
    public civilian2Hero(playerId: number) {
        let player = Player.getPlayer(playerId);
        this.getPlayerData(player).civilToHero();
        GameCache.gamePlayersInfo.get(player).camp = Camp.Hero;
        GameGlobals.heroPlayer = player;
        GameGlobals.isHeroReal = true;
        let hotWeaponId = DataCenterS.getData(player, BagModuleData).getCurHotWeapon();
        let cd = GameConfig.Weapon.getElement(hotWeaponId).CD;
        this.getClient(player).net_ShowHeroUI(cd);
        this.playerStateChange(player, PlayerGameState.Normal, null);
        this.getClient(player).net_RemoveAllPropEffect();
        ModuleService.getModule(WatchModuleS).rpcToWatch(2);
    }

    /**记录本局生存经验,剩余时间 */
    net_setExp(exp: number, time: number) {
        let data = this.getPlayerData(this.currentPlayerId);
        let times = Globals.gameTime - time;
        data.setExpNum(exp);
        data.setLiveTimeNum(times);
    }
    /**获取玩家当前状态 */
    getPlayerState(playerId: number) {
        return this.getPlayerData(playerId).getState()
    }
    /**清空与玩家相关交互物的信息 */
    clearPlayerActionInfo(playerId: number) {
        /**让玩家退出交互物 */
        if (this.playerToBedMap.has(playerId)) {
            let script = mw.ScriptManager.findScript(this.playerToBedMap.get(playerId)) as BedTrigger
            script.setBedState(HospitalBed.Idle, playerId)
            this.playerToBedMap.delete(playerId)
        }
    };
    private curEff: number = null;
    /**展示效果 */
    curStateCheck(bo: boolean): void {

        if (bo) {
            this.confirmTerminator();
            //所有玩家判断
            GameGlobals.currentAllPlayers.forEach((player) => {
                if (GameGlobals.isTerminatorReal == true) {
                    if (player.playerId != GameGlobals.terminatorPlayer.playerId) {
                        this.getClient(player).net_setEndState(GameGlobals.terminatorPlayer.character.gameObjectId, true, GameGlobals.terminatorPlayer.character.displayName);
                    }
                } else if (GameGlobals.isTerminatorReal == false) {
                    this.getClient(player).net_setEndState(GameGlobals.terminatorAI.aiModel.gameObjectId, true, GameGlobals.terminatorAI.aiModel.displayName);
                }
            });
            if (GameGlobals.isTerminatorReal == true) {
                // this.getClient(GameGlobals.terminatorPlayer).net_MaskUI(true);
                
                //动作
                ModuleService.getModule(BagModuleS).hideAutoModule(GameGlobals.terminatorPlayer);
                //特效
                let roc = new Rotation(GameConfig.Rule.getElement(50006).Vector3.x, GameConfig.Rule.getElement(50006).Vector3.y, GameConfig.Rule.getElement(50006).Vector3.z);
                this.curEff = GeneralManager.rpcPlayEffectOnPlayer(GameConfig.Rule.getElement(50003).Num.toString(),
                    GameGlobals.terminatorPlayer, mw.HumanoidSlotType.Head, -50,
                    GameConfig.Rule.getElement(50005).Vector3, roc, GameConfig.Rule.getElement(50004).Vector3)
            } else if (GameGlobals.isTerminatorReal == false) {
                //TODO AI移动不能停止
                GameGlobals.terminatorAI.stopMove();
                // Navigation.stopNavigateTo(GameGlobals.terminatorAI.aiModel);
                //特效
                let roc = new Rotation(GameConfig.Rule.getElement(50006).Vector3.x, GameConfig.Rule.getElement(50006).Vector3.y, GameConfig.Rule.getElement(50006).Vector3.z);
                this.curEff = GeneralManager.rpcPlayEffectOnPlayer(GameConfig.Rule.getElement(50003).Num.toString(),
                    GameGlobals.terminatorAI.aiModel as any, mw.HumanoidSlotType.Head, -50,
                    GameConfig.Rule.getElement(50005).Vector3, roc, GameConfig.Rule.getElement(50004).Vector3)
            }
            let BGM = SoundGlobals.BGM3[0];
            if (BGM) {
                mw.SoundService.playBGM(BGM.Guid, BGM.Rate);
            }
        } else {
            //离线判断
            let isLeave = false;
            if (GameGlobals.isTerminatorReal == true) {
                if (!GameGlobals.terminatorPlayer) {
                    isLeave = true;
                }
            } else if (GameGlobals.isTerminatorReal == false) {
                if (!GameGlobals.terminatorAI) {
                    isLeave = true;
                }
            } else {
                isLeave = true;
            }

            if (!isLeave) {
                //所有玩家判断
                GameGlobals.currentAllPlayers.forEach((player) => {
                    if (GameGlobals.isTerminatorReal) {
                        if (player.playerId == GameGlobals.terminatorPlayer.playerId) return;
                        this.getClient(player).net_setEndState(GameGlobals.terminatorPlayer.character.gameObjectId, false);
                    } else {
                        this.getClient(player).net_setEndState(GameGlobals.terminatorAI.aiModel.gameObjectId, false);
                    }
                    oTrace(`关闭玩家 =====${player.playerId}`);
                });
                if (GameGlobals.isTerminatorReal) {
                    // this.getClient(GameGlobals.terminatorPlayer).net_MaskUI(false);
                    PlayerManagerExtesion.changeStanceExtesion(GameGlobals.terminatorPlayer.character,``);
                } else {
                }
                oTrace(`BGM ==== stopGame start Hall`);
            }

            //特效
            if (this.curEff) {
                EffectService.stop(this.curEff);
            }

            let bgm = SoundGlobals.BGM2[0];
            mw.SoundService.stopBGM();
            mw.SoundService.playBGM(bgm.Guid, bgm.Rate);
        }
    }
    /**确认终结者 */
    private confirmTerminator(): void {

        let curTarget: mw.Character | AiObject = null;
        //警察判断
        try {
            if (GameGlobals.isPoliceReal == true) {
                let state = GameCache.gamePlayersInfo.get(GameGlobals.policePlayer).state;
                if (state && state != PlayerGameState.Leave && this.livePlayerInclude(GameGlobals.policePlayer)) {
                    curTarget = GameGlobals.policePlayer.character;
                };
            } else if (GameGlobals.isPoliceReal == false) {
                if (GameGlobals.policeAi && GameGlobals.policeAi.curAIState != AiState.NotActive) {
                    curTarget = GameGlobals.policeAi;
                    oTrace(`confirmTerminator: 警探 AI   ====== ${GameGlobals.policeAi.aiModel.gameObjectId}`);
                }
            }
        } catch (error) {
            oTraceError(`confirmTerminator: 警探 ==== 报错`);
        }
        //黑手党判断
        try {
            if (GameGlobals.isSpyReal == true) {
                let state = GameCache.gamePlayersInfo.get(GameGlobals.spyPlayer).state
                if (state && state != PlayerGameState.Leave && this.livePlayerInclude(GameGlobals.spyPlayer)) {
                    oTrace(`confirmTerminator: 黑手党 真人 ====== ${GameGlobals.spyPlayer.playerId}`);
                    curTarget = GameGlobals.spyPlayer.character;
                }
            } else if (GameGlobals.isSpyReal == false) {
                if (GameGlobals.spyAi && GameGlobals.spyAi.curAIState != AiState.NotActive) {
                    curTarget = GameGlobals.spyAi;
                    oTrace(`confirmTerminator: 黑手党 AI   ====== ${GameGlobals.spyAi.aiModel.gameObjectId}`);
                }
            }
        } catch (error) {
            oTraceError(`confirmTerminator: 黑手党 ==== 报错`);
        }
        try {
            //英雄判断
            if (GameGlobals.isHeroReal == true) {
                let state = GameCache.gamePlayersInfo.get(GameGlobals.heroPlayer).state
                if (state && state != PlayerGameState.Leave && this.livePlayerInclude(GameGlobals.heroPlayer)) {
                    oTrace(`confirmTerminator: 英雄 真人 ====== ${GameGlobals.heroPlayer.playerId}`);
                    curTarget = GameGlobals.heroPlayer.character;
                }
            } else if (GameGlobals.isHeroReal == false) {
                if (GameGlobals.heroAi && GameGlobals.heroAi.curAIState != AiState.NotActive) {
                    oTrace(`confirmTerminator: 英雄 AI   ====== ${GameGlobals.heroAi.aiModel.gameObjectId}`);
                    curTarget = GameGlobals.heroAi;
                }
            }
        } catch (error) {
            oTraceError(`confirmTerminator: 英雄 ==== 报错`);
        }

        if (curTarget) {
            if (PlayerManagerExtesion.isCharacter(curTarget)) {
                GameGlobals.isTerminatorReal = true;
                GameGlobals.terminatorPlayer = (curTarget as mw.Character).player;
            } else if (curTarget) {
                GameGlobals.isTerminatorReal = false;
                GameGlobals.terminatorAI = (curTarget as AiObject);
            }
        } else {
            //没有终结者 直接结束比赛
            FSM_CalculateState.timeIsOut = true;
            FSMManager.Instance.ChangeState(FSM_CalculateState);
            oTraceError(`confirmTerminator: 终结者 ==== 没有`)
        }
    }

    /** 存活玩家是否包含 */
    livePlayerInclude(curPlayer: mw.Player): boolean {
        let bo: boolean = false;
        if (curPlayer) {
            GameGlobals.livePlayers.forEach((player) => {
                if (curPlayer.playerId == player.playerId) {
                    bo = true;
                };
            })
        }
        return bo;
    }

    /**
     * 终结状态玩家离线检查
     * @param player 
     */
    playerLeaveCampCheck(player: mw.Player): void {
        if (GameGlobals.terminatorPlayer && GameGlobals.terminatorPlayer.playerId == player.playerId) {
            oTraceError(`leave :: 离线玩家 ==== 终结者`);
            this.curStateCheck(false);
            GameGlobals.isTerminatorReal = null;
            GameGlobals.terminatorPlayer = null;
            FSM_CalculateState.timeIsOut = true;
            FSM_GamingFinish.runFinsh = false;
            FSMManager.Instance.ChangeState(FSM_CalculateState);
            this.playerLeave(player);
        } else {
            oTraceError(`leave :: 离线玩家 ==== 不是终结者`);
            this.playerLeave(player);
        }
    }
}





