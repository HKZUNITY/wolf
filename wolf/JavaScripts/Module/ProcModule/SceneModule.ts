import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { AiModuleS } from "../../AI/AiModule";
import { AiOrPlayer, Camp, GameGlobals, GamingState, Globals, PlayerGameState, SoundGlobals } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import P_Hall from "../../UILogic/Hall/P_Hall";
import P_Loading from "../../UILogic/Hall/P_Loading";
import P_Map from "../../UILogic/Hall/P_Map";
import { GameModuleData } from "../GameModule/GameData";
import { GameModuleS } from "../GameModule/GameModuleS";
import { CoinObj } from "./CoinObj";
import Gold from "../../Prefabs/CoinPoint/Script/GoldRotate";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { DoorModuleS } from "../door/DoorModuleS";
import LoadMapModuleC from "../loadMapModule/LoadMapModuleC";
import { GameCache } from "../../GameCache";
import { GeneralManager } from '../../Modified027Editor/ModifiedStaticAPI';
export class SceneModuleC extends ModuleC<SceneModuleS, null>{
    // deathModelList: Array<mw.Character> = new Array<mw.Character>()
    onStart(): void {

    }
    onEnterScene(sceneType: number): void {
        // this.initDeathModelList()
    }
    // initDeathModelList() {
    //     GameObject.asyncFindGameObjectById("6560875C").then((obj: mw.GameObject) => {
    //         obj.getChildren().forEach((obj) => {
    //             this.deathModelList.push(obj as mw.Character);
    //         })
    //     });
    // }
    /**判断是否为死去模型 */
    // isDeathModel(guid: string) {
    //     this.deathModelList.forEach((value, index) => {
    //         if (value.guid == guid) {
    //             return true
    //         }
    //     })
    //     return false
    // }
    net_changeBGM(mapId: number): void {
        oTrace(`BGM ==== Map :${mapId}`);
        mw.SoundService.stopBGM();
        switch (mapId) {
            case 10001:
                let BGM1ram = MathUtil.randomInt(0, SoundGlobals.mapOneBGM.length);
                let BGM1 = null
                if (BGM1ram == 0) {
                    BGM1 = SoundGlobals.mapOneBGM[0];
                } else {
                    BGM1 = SoundGlobals.mapOneBGM[BGM1ram - 1];
                }
                if (BGM1) {
                    mw.SoundService.playBGM(BGM1.Guid, BGM1.Rate);
                }
                break;
            case 10002:
                let BGM2ram = MathUtil.randomInt(0, SoundGlobals.mapTwoBGM.length);
                let BGM2 = null;
                if (BGM2ram == 0) {
                    BGM2 = SoundGlobals.mapTwoBGM[0];
                } else {
                    BGM2 = SoundGlobals.mapTwoBGM[BGM2ram - 1];
                }
                if (BGM2) {
                    mw.SoundService.playBGM(BGM2.Guid, BGM2.Rate);
                }
                break;
            case 10003:
                let BGM3ram = MathUtil.randomInt(0, SoundGlobals.mapThrBGM.length);
                let BGM3 = null;
                if (BGM3ram == 0) {
                    BGM3 = SoundGlobals.mapThrBGM[0];
                } else {
                    BGM3 = SoundGlobals.mapThrBGM[BGM3ram - 1];
                }
                if (BGM3) {
                    mw.SoundService.playBGM(BGM3.Guid, BGM3.Rate);
                }
                break;
        }
    }
}
export class SceneModuleS extends ModuleS<SceneModuleC, null>{
    private weaponBox: mw.Trigger;
    private gunObj: mw.GameObject;
    private leaveEffectId: number = -1;
    private moveTime: number = 0;
    private isMove: boolean = false;
    private R: number = 20;
    private rotateSpeed: number = 100;
    private upSpeed: number = 100;
    private coinObjArr: Array<CoinObj> = new Array<CoinObj>();
    onStart(): void {
        this.findLeftWeapon();
        this.initCoin();
    }
    initCoin() {
        for (let i = 0; i < 80; i++) {
            SpawnManager.wornAsyncSpawn("F66F10CF472AA427DCFE389292D57EEE").then(go => {
                let trigger = go.getChildren()[0] as mw.Trigger
                let model = trigger.getChildren()[0];
                let script = trigger.getScriptByName("GoldRotate") as Gold
                let coinobj = new CoinObj(0, model, trigger, script);
                this.coinObjArr.push(coinobj);
            })
        }

    }
    activeCoin() {
        oTrace("激活金币")
        let headIndex = (GameGlobals.curMapID % 10000) * 10000;
        let tableIdNum = GameConfig.CoinsGenerate.getElement(headIndex).Quantity;
        let coinIndex = 0;
        for (let i = headIndex + 1; i <= headIndex + tableIdNum; i++) {
            for (let j = 1; j <= GameConfig.CoinsGenerate.getElement(i).Quantity; j++) {
                this.coinObjArr[coinIndex].active(i);
                coinIndex++;
                if (coinIndex >= 80) return;
            }
        }
    }
    destroyCoin() {
        oTrace("销毁金币")
        this.coinObjArr.forEach((obj) => {
            obj.destroy();
        })
    }
    private deathModelanim: string = GameConfig.Assets.getElement(14003).Guid;
    initDeathModelList() {
        GameGlobals.deathModelList.length = 0;

        GameObject.asyncFindGameObjectById("03FC873F").then((obj) => {
            let modelP = obj as mw.GameObject;
            modelP.getChildren().forEach((obj) => {
                GameGlobals.deathModelList.push(obj as mw.Character);
                let p = obj as mw.Character;
                p.displayName = "";
            })
            ModuleService.getModule(GameModuleS).changeDeathModelAppearance();
        });

    }
    onUpdate(dt: number): void {
        if (!this.isMove) return;
        this.moveTime += dt;
        let staticZ = this.weaponBox.worldTransform.position.z;
        let loc = this.gunObj.worldTransform.position;
        loc.z = staticZ + this.R * Math.sin(this.moveTime * this.upSpeed * Math.PI / 180);
        this.gunObj.worldTransform.position = loc;
        let rot = this.gunObj.worldTransform.rotation;
        rot = rot.add(new mw.Rotation(new mw.Vector(0, 0, dt * this.rotateSpeed)));
        this.gunObj.worldTransform.rotation = rot;
    }
    findLeftWeapon() {
        this.weaponBox = GameObject.findGameObjectById("989CD40E") as mw.Trigger;
        this.gunObj = GameObject.findGameObjectById("06C18A8B");
        this.weaponBox.onEnter.add((this.onWeaponIn.bind(this)));
    }
    onWeaponIn(char: mw.GameObject) {
        if (!this.isMove) return;
        if (GameGlobals.curGameState != GamingState.GamingState) return;
        if (PlayerManagerExtesion.isNpc(char)) {
            let aiModel = char as mw.Character;
            if (Tools.isAiPlayer(aiModel)) {
                let ai = Tools.getAiObj(aiModel);
                let camp = ai.camp;
                if (camp == Camp.Spy || camp == Camp.Police || camp == Camp.Hero) return;
                let state = ai.aiGameState;
                if (state == PlayerGameState.Die) return;
                //
                ModuleService.getModule(AiModuleS).civilianAi2Hero(ai);
                this.resetBoxLocation(new mw.Vector(-200, -200, -400));
            }
        }
        else if (PlayerManagerExtesion.isCharacter(char)) {
            let player = (char as mw.Character).player;
            if (DataCenterS.getReadyPlayerIds().indexOf(player.playerId) == -1) {
                oTrace("SZW得不到玩家数据");
                return;
            }
            if (GameCache.gamePlayersInfo.get(player) == undefined){
                oTraceError("不是对局中的玩家");
                return;
            } 
            let camp = DataCenterS.getData(player, GameModuleData).getPlayerCamp();
            if (camp == Camp.Spy || camp == Camp.Police || camp == Camp.Hero) return;
            let state = DataCenterS.getData(player, GameModuleData).getState();
            if (state == PlayerGameState.Die) return;
            //平民变英雄
            ModuleService.getModule(GameModuleS).civilian2Hero(player.playerId);
            this.resetBoxLocation(new mw.Vector(-200, -200, -400));
        }

    }
    resetBoxLocation(loc: mw.Vector) {
        GameGlobals.gunLeaveLoc = new mw.Vector(0, 0, 0);
        this.weaponBox.worldTransform.position = loc;
        oTrace("遗留枪的位置发生改变" + loc);
        if (this.leaveEffectId == -1) return;
        EffectService.stop(this.leaveEffectId);
        this.leaveEffectId = -1;
        this.isMove = false;
    }
    changeBoxLocationToDeath(loc: mw.Vector) {
        GameGlobals.gunLeaveLoc = loc;
        this.weaponBox.worldTransform.position = loc;
        if (this.leaveEffectId != -1) {
            EffectService.stop(this.leaveEffectId);
        }
        this.leaveEffectId = GeneralManager.rpcPlayEffectAtLocation(GameConfig.Assets.getElement(12002).Guid, loc, 0, mw.Rotation.zero, new mw.Vector(1, 1, 1));
        this.moveTime = 0;
        this.isMove = true;
    }

    initGameScene() {
        this.initDeathModelList();
        GameGlobals.readyPlayers.forEach((player) => {
            //初始化玩家在游戏中的位置
            oTrace(`BGM ==== 地图选择`)
            this.getClient(player).net_changeBGM(GameGlobals.curMapID);
            GameGlobals.hallPlayer = GameGlobals.hallPlayer.filter(item => item.playerId != player.playerId)
        })
        /**玩家进入游戏 */
        ModuleService.getModule(PlayerModuleS).playerEnterGame()
        //场景加载
        ModuleService.getModule(DoorModuleS).initGame();

    }

}