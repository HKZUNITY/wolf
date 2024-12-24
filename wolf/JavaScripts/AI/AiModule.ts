import { AiOrPlayer, Camp, GameGlobals, GamingState, KillType, PlayerGameState } from "../Globals";
import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { GameModuleS } from "../Module/GameModule/GameModuleS";
import { PlayerModuleC } from "../Module/PlayerModule/PlayerModuleC";
import { SceneModuleS } from "../Module/ProcModule/SceneModule";
import { WatchModuleS } from "../Module/ProcModule/WatchModule";
import { AutoAimModuleS } from "../Module/Weapon/Aim/AutoAimModuleS";
import LoadMapModuleS from "../Module/loadMapModule/LoadMapModuleS";
import { WalkModuleS } from "../Module/walkModule/WalkModuleS";
import { GameConfig } from "../Tables/GameConfig";
import { Tools } from "../Tools";
import { AiObject } from "./AiObject";
import { AiManager, AiState } from "./AiStateMachine";
export class AiModuleC extends ModuleC<AiModuleS, null> {
    net_changeCloth(roleID: number, modelGuid: string) {
        // console.warn(`changeCloth ==== AI roleID: ${roleID} modelGuid: ${modelGuid}`)
        ModuleService.getModule(PlayerModuleC).net_changeModel(roleID, modelGuid);
    }
    async net_changeNpcName(guid: string) {
        let npc = await GameObject.asyncFindGameObjectById(guid);
        if (npc && PlayerManagerExtesion.isNpc(npc)) {
            let npc01 = npc as mw.Character;
            let ui = npc01.overheadUI;
            ui.setUIbyID('049AD6A946CA75E232D4DCA874511D5B');
            ui.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
            ui.drawSize = new mw.Vector2(400, 100);
            ui.selfOcclusion = false;
            ui.occlusionEnable = true;
            let nameUI = ui.getTargetUIWidget()
            let nametext = nameUI.findChildByPath('mRootCanvas/mText_name') as mw.TextBlock;
            nametext.text = "";
        }
    }
}
export class AiModuleS extends ModuleS<AiModuleC, null> {
    private aiModelGuid = "38DD145E"
    public static aiObjList: Array<AiObject> = new Array<AiObject>();
    /**全部对局人物AI模型数组 */
    public static aiModelList: Array<mw.Character> = new Array<mw.Character>();

    private protectCoverMap: Map<mw.Character, number> = new Map<mw.Character, number>();
    /** AI 死亡模型 */
    private deathModelMap: Map<mw.Character, mw.Character> = new Map<mw.Character, mw.Character>();
    private dieTime = GameConfig.Rule.getElement(10023).Time;
    /**保护罩缩放 */
    private protectScale: mw.Vector
    /**保护罩位置 */
    private protectPos: mw.Vector
    /**保护罩旋转 */
    private protectRot: mw.Vector
    /**保护罩插槽 */
    private protectSocket: number
    onStart() {
        GameObject.asyncFindGameObjectById(this.aiModelGuid).then(async (go: mw.GameObject) => {
            if (!go) return;
            await go.asyncReady();
            let i = 0;
            go.getChildren().forEach(async (obj) => {
                let aiNpc = obj as mw.Character;
                await aiNpc.asyncReady();
                let aiobj = new AiObject(aiNpc);
                AiModuleS.aiObjList.push(aiobj);
                AiModuleS.aiModelList.push(aiNpc);
                aiobj.curAIManager = new AiManager(aiobj);
                aiobj.setAiName("");
                i++;
            })
        });
        this.protectScale = new mw.Vector(0.5, 0.5, 1.2);
        this.protectPos = new mw.Vector(0, 0, 0);
        this.protectRot = new mw.Vector(0, 0, 0);
        this.protectSocket = 23
    }
    resetAi() {
        AiModuleS.aiObjList.forEach((obj) => {
            obj.changeAiState(AiState.NotActive);
            let index = AiModuleS.aiObjList.indexOf(obj);
            obj.changeAiLocation(new mw.Vector(index * 200 - 540, -2740, -2865));
            obj.aiNotUseColdWeapon();
            obj.aiNotUseHotWeappon();
            obj.aiModel.jump()
            ModuleService.getModule(WalkModuleS).gameEnd(obj.aiModel.gameObjectId);//解除绑定脚步

        })
    }
    /**
     * 游戏场景中加入人机模式，并初始化在游戏中的位置
     * @param num 游戏中人机的数量
     */
    addGameAi(num: number) {
        GameGlobals.aiPlayer.splice(0, GameGlobals.aiPlayer.length);
        for (let i = 0; i < num; i++) {
            GameGlobals.aiPlayer.push(AiModuleS.aiObjList[i]);
            ModuleService.getModule(LoadMapModuleS).initPlayerGamePos(AiOrPlayer.AiPlayer, null, AiModuleS.aiObjList[i].aiModel);
            AiModuleS.aiObjList[i].changeAiState(AiState.Ready);
            ModuleService.getModule(WalkModuleS).creatWalk(AiModuleS.aiObjList[i].aiModel.gameObjectId, true, AiModuleS.aiObjList[i].coldWeaponObj.gameObjectId);//绑定脚步
            PlayerManagerExtesion.stopStanceExtesion(AiModuleS.aiObjList[i].aiModel, true);
            this.getAllClient().net_changeNpcName(AiModuleS.aiObjList[i].aiModel.gameObjectId);
        }

    }
    aiStartGame() {
        GameGlobals.aiPlayer.forEach((aiobj) => {
            aiobj.changeAiState(AiState.Move);
        })
    }
    removeCoverEffect(player: mw.Character) {
        let effectId = this.protectCoverMap.get(player);
        if (effectId == undefined) return;
        EffectService.stop(effectId);
        this.protectCoverMap.delete(player);
    }
    removeAllEffect() {
        this.protectCoverMap.forEach((value) => {
            EffectService.stop(value);
        })
        this.protectCoverMap.clear();
    }
    removeAllDeathModel() {
        let index = 0;
        this.deathModelMap.forEach((model, key) => {
            model.worldTransform.position = new mw.Vector(index * 200 - 580, -3470, -2855);

            this.deathModelMap.delete(key);
            index++;
        })

        this.deathaim.forEach((aim, model) => {
            aim.stop();
        })
    }
    changeCloth(roleID: number, roleGuid: string) {
        this.getAllClient().net_changeCloth(roleID, roleGuid);
    }
    createDeathModel(obj: mw.Character, weaponId: number) {
        let player = Tools.getAiObject(obj);
        let roleId = player.roleId;
        let deathModel: mw.Character;
        deathModel = GameGlobals.deathModelList[0];
        GameGlobals.deathModelList.splice(0, 1);
        if (deathModel == undefined || deathModel == null) {
            return;
        }
        this.deathModelMap.set(obj, deathModel);
        this.getAllClient().net_changeCloth(roleId, deathModel.gameObjectId);
        deathModel.worldTransform.rotation = new mw.Rotation(new mw.Vector(0, -5, 0));
        // deathModel.animationStance = '20310';
        deathModel.collisionWithOtherCharacterEnabled = false;
        ModuleService.getModule(AutoAimModuleS).onCreateDeathModel(deathModel.gameObjectId)
    }
    public aiStateChange(ai: AiObject, state: PlayerGameState, weaponId: number, attackStaus?: Camp, killType?: KillType) {
        let beforeState = ai.aiGameState;
        ai.aiGameState = state;
        let camp = ai.camp;
        if (beforeState == PlayerGameState.Normal && state == PlayerGameState.Protect) {
            let effectId = GeneralManager.rpcPlayEffectOnPlayer(GameConfig.Assets.getElement(12001).Guid, ai.aiModel as any, this.protectSocket, -50, this.protectPos, this.protectRot.toRotation(), this.protectScale);
            this.protectCoverMap.set(ai.aiModel, effectId);
        }
        if (beforeState == PlayerGameState.Protect && state == PlayerGameState.Normal) {
            this.removeCoverEffect(ai.aiModel);
            GeneralManager.rpcPlayEffectOnPlayer(GameConfig.Assets.getElement(12004).Guid, ai.aiModel as any, this.protectSocket, 1, this.protectPos, this.protectRot.toRotation(), this.protectScale)
        }
        if (state == PlayerGameState.Die) {
            this.aiGameOver(ai, weaponId, attackStaus, killType);
        }
        ModuleService.getModule(GameModuleS).showRoleNum();
    }

    private deathaim: Map<mw.Character, mw.Animation> = new Map();

    aiGameOver(ai: AiObject, weaponId: number, attackStaus: Camp, killType: KillType) {
        ModuleService.getModule(AutoAimModuleS).onAiGameOver(ai.aiModel.gameObjectId)
        let loc = ai.aiModel.worldTransform.clone().position;
        let Roc = ai.aiModel.worldTransform.clone().rotation;
        this.createDeathModel(ai.aiModel, weaponId);
        ai.changeAiState(AiState.NotActive);
        ai.stopMove();
        Tools.playAIDeathAnimation(true, ai.aiModel);

        if (GameConfig.Sound.getElement(10007).Guid) {
            let area = { radius: GameConfig.Sound.getElement(10007).InnerRadius, falloffDistance: GameConfig.Sound.getElement(10007).FalloffDistance };
            mw.SoundService.play3DSound(GameConfig.Sound.getElement(10007).Guid, ai.aiModel.worldTransform.clone().position, 1, GameConfig.Sound.getElement(10007).Rate, area)
        }
        //观战部分
        ModuleService.getModule(WatchModuleS).rpcEffect(ai.aiModel, 0);
        GameGlobals.liveAi = GameGlobals.liveAi.filter(item => item != ai);
        ModuleService.getModule(WatchModuleS).rpcToWatch(2);
        ModuleService.getModule(GameModuleS).someoneDieTip(null, null);
        let camp = ai.camp;
        if (camp == Camp.Hero || camp == Camp.Police) {
            ModuleService.getModule(SceneModuleS).changeBoxLocationToDeath(loc);
            ModuleService.getModule(GameModuleS).tipOnWeaponLeave();
        }
        setTimeout(() => {
            ModuleService.getModule(WatchModuleS).someoneDieOnWatch(ai.aiModel);
            loc = ai.aiModel.worldTransform.clone().position;
            loc.z -= Tools.getCharacterHeight(ai.aiModel);

            if (this.deathModelMap.has(ai.aiModel)) {
                let loc1 = loc.add(new mw.Vector(0, 0, 30));
                this.deathModelMap.get(ai.aiModel).worldTransform.position = loc1;
                this.deathModelMap.get(ai.aiModel).worldTransform.rotation = Roc;
                let deathGuid = GameConfig.Assets.getElement(14003).Guid;
                let aim = PlayerManagerExtesion.rpcPlayAnimation(this.deathModelMap.get(ai.aiModel), deathGuid, 0);
                this.deathaim.set(ai.aiModel, aim);
                console.warn(`Death :: AI ${ai.aiModel.gameObjectId} 死亡模型 ==== 播放动作 Deathmodel: ${this.deathModelMap.get(ai.aiModel).gameObjectId} ain: ${deathGuid}`)
            }
            setTimeout(() => {
                let index = AiModuleS.aiObjList.indexOf(ai);
                ai.changeAiLocation(new mw.Vector(index * 200, 0, -1500));
                Tools.playAIDeathAnimation(false, ai.aiModel);
            }, 100);
        }, 6000);
        if (GameGlobals.curGameState == GamingState.GamingState) {
            let res = ModuleService.getModule(GameModuleS).gamePlayerCheck();
            ModuleService.getModule(GameModuleS).playDeadEffect(ai.aiModel, killType, res);
        }
        ModuleService.getModule(GameModuleS).showAttackTip(ai.aiModel, attackStaus);
    }



    public civilianAi2Hero(ai: AiObject) {
        ai.camp = Camp.Hero;
        GameGlobals.heroAi = ai;
        GameGlobals.isHeroReal = false;
        this.aiStateChange(ai, PlayerGameState.Normal, null);
        ModuleService.getModule(WatchModuleS).rpcToWatch(2);
    }
}

