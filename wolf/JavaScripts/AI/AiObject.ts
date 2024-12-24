import { AiOrPlayer, Camp, GameGlobals, Globals, PlayerGameState, PlayerWeaponState } from "../Globals";
import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { GameModuleData } from "../Module/GameModule/GameData";
import { ColdWeaponModuleS } from "../Module/Weapon/ColdWeapon/ColdWeaponModuleS";
import { Projectile } from "../Module/Weapon/HotWeapon/Bullet";
import { GameConfig } from "../Tables/GameConfig";
import { Tools } from "../Tools";
import { AiModuleS } from "./AiModule";
import { AiManager, AiState, FSM_AiFollow, FSM_AiGunAttack, FSM_AiKnifeAttack, FSM_AiMove, FSM_AiNotActive, FSM_AiReady, FSM_AiStill } from "./AiStateMachine";

export class AiObject {
    /**AI当前的状态 */
    public curAIState: AiState;
    public curAIManager: AiManager;
    public moveAni: mw.Animation = null;

    /**AI模型 */
    public aiModel: mw.Character;
    /**AI名字 */
    public aiName: string;
    /**AI的阵营 */
    public camp: Camp;
    /**AI角色id */
    public roleId: number;

    /**AI的没有成为黑手党的第几局 */
    public aiNoBeSpy: number = 1;
    /**AI热武器 */
    public aiHotWeapon: number = 20001;
    /**AI冷武器 */
    public aiColdWeapon: number = 10001;
    /**热武器模型 */
    public hotWeaponObj: mw.GameObject;
    /**冷武器模型 */
    public coldWeaponObj: mw.GameObject;
    /** 热武器特效 */
    public hotWeaponEff: number = null;
    /** 冷兵器特效 */
    public coldWeaponEff: number = null;
    /**AI速度 */
    public aiSpeed: number;
    /**AI跳跃高度 */
    public aiJumpMaxHeight: number;

    /**AI的游戏状态 */
    public aiGameState: PlayerGameState;

    /**AI生命值 */
    public aiHp: number;
    /**当前道具数量 */
    public aiPropNum: number;
    /**当前金币数量 */
    public aiGold: number;
    /**AI武器状态 */
    public aiWeaponState: PlayerWeaponState;

    /**AI目标点 */
    public location: mw.Vector;
    /**AI跟随玩家 */
    public target: mw.GameObject;
    public nowStance: mw.SubStance;
    public s_Machine: number;
    public beginMoveTime: number;
    public isAttackCivilian: boolean;
    public isCd: boolean;

    private headIndex: number = 10000;
    private total: number = 14;
    public constructor(model: mw.Character) {
        this.aiModel = model;
        // this.aiModel.worldTransform.scale = new mw.Vector(0.8, 0.8, 0.8);
        this.curAIState = AiState.NotActive;
        this.aiModel.asyncReady().then(async (v) => {
            this.aiModel.displayName = this.aiName//"";
            this.hotWeaponObj = await this.aiEquipWeapon(this.aiHotWeapon);
            this.coldWeaponObj = await this.aiEquipWeapon(this.aiColdWeapon);
            let objInfoHot = GameConfig.Weapon.getElement(this.aiHotWeapon);
            let objInfoCold = GameConfig.Weapon.getElement(this.aiColdWeapon);
            if (objInfoHot.WeaponEffects) {
                let roc = new mw.Rotation(objInfoHot.EffectsRotation.x, objInfoHot.EffectsRotation.y, objInfoHot.EffectsRotation.z);
                this.hotWeaponEff = GeneralManager.rpcPlayEffectOnGameObject(objInfoHot.WeaponEffects.toString(),
                    this.hotWeaponObj, 0, objInfoHot.EffectsOffset, roc, objInfoHot.EffectsScale);
            }
            if (objInfoCold.WeaponEffects) {
                let roc = new mw.Rotation(objInfoCold.EffectsRotation.x, objInfoCold.EffectsRotation.y, objInfoCold.EffectsRotation.z);
                this.coldWeaponEff = GeneralManager.rpcPlayEffectOnGameObject(objInfoCold.WeaponEffects.toString(),
                    this.coldWeaponObj, 0, objInfoCold.EffectsOffset, roc, objInfoCold.EffectsScale);
            }
        })
    }
    public wearClothes() {
        this.aiModel.asyncReady().then((v) => {
            // let ran = Tools.getRandomInt(0, 3);
            let roleElements = GameConfig.Role.getAllElement();
            this.roleId = roleElements[Tools.randomInt(0, roleElements.length - 1)].ID;
            this.aiChangeClothes(this.roleId, v);
        })
    }
    public changeAiState(state: AiState) {
        switch (state) {
            case AiState.NotActive:
                this.curAIManager.changeState(FSM_AiNotActive);
                break;
            case AiState.Ready:
                this.curAIManager.changeState(FSM_AiReady);
                break;
            case AiState.Move:
                this.curAIManager.changeState(FSM_AiMove);
                break;
            case AiState.Follow:
                this.curAIManager.changeState(FSM_AiFollow);
                break;
            case AiState.GunAttack:
                this.curAIManager.changeState(FSM_AiGunAttack);
                break;
            case AiState.KnifeAttack:
                this.curAIManager.changeState(FSM_AiKnifeAttack);
                break;
            case AiState.Still:
                this.curAIManager.changeState(FSM_AiStill);
                break;
        }
    }
    /**开启状态机 */
    public startMachine() {
        if (this.nowStance) {
            this.nowStance.stop();
            this.nowStance = null;
        }
        if (this.s_Machine) {
            TimeUtil.clearInterval(this.s_Machine);
            this.s_Machine = null;
        }
        this.s_Machine = TimeUtil.setInterval(() => {
            this.curAIManager.update();
        }, 0.06)
    }
    public stopMachine() {
        if (this.s_Machine) {
            TimeUtil.clearInterval(this.s_Machine);
            this.s_Machine = null;
            if (this.nowStance) {
                this.nowStance.stop();
                this.nowStance = null;
            }
        }
    }
    public readyState() {
        this.headIndex = (GameGlobals.curMapID % 10000) * 10000;
        this.total = GameConfig.AIWayPoint.getElement(this.headIndex).Num;
        this.aiModel.movementEnabled = true;
        this.aiGameState = PlayerGameState.Ready;
        this.aiHp = GameConfig.Rule.getElement(10015).Num;
        this.aiPropNum = 0;
        this.aiHp = 100;
        this.aiGold;
        this.aiWeaponState = PlayerWeaponState.UnEquip;
        this.aiNotUseColdWeapon();
        this.aiNotUseHotWeappon();
        if (this.nowStance) {
            this.nowStance.stop();
            this.nowStance = null;
        }
        this.aiModel.worldTransform.rotation = new mw.Rotation(new mw.Vector(0, 0, 0));
        this.target = null;
        this.moveToRandom(1);
        this.startMachine();
        this.isAttackCivilian = true;
        this.isCd = false;
        this.wearClothes();
    }
    public static civilMap: Map<number, number> = new Map();
    public moveState() {
        let playerList = this.findAroundPlayer();
        let res = this.getIdentityExist(playerList);
        if (this.camp == Camp.Civilian) {
            if (res.spyExist) {//平民范围内有黑手党
                this.moveToRandom(1);
                return;
            }
            else if (res.policeExist) {//平民范围内有警察
                let pro = Math.random();
                if (pro < 1) {//GameConfig.AIData.getElement(30003).Prob) {
                    this.changeAiState(AiState.Follow);
                }
            }
            else {
                let pro = Math.random();
                if (pro < GameConfig.AIData.getElement(30004).Prob) {//武器点
                    this.moveToRandom(3);
                }
                else if (pro < GameConfig.AIData.getElement(30004).Prob + GameConfig.AIData.getElement(30005).Prob) {//道具点
                    this.moveToRandom(2);
                }
                else {//随机点
                    this.moveToRandom(1);
                }
            }
        }
        if (this.camp == Camp.Spy) {
            this.moveToRandom(1);
            let pro = Math.random();
            if (res.inSightNum > 0) {
                pro = 0;
            }
            if (pro < GameConfig.AIData.getElement(30004).Prob + GameConfig.AIData.getElement(10003).Prob) {//亮刀
                this.changeAiState(AiState.KnifeAttack);
            }
        }
        else {
            this.moveToRandom(1);
            let pro = Math.random();
            if (res.spyExist) {
                pro = 0;
            }
            if (pro < GameConfig.AIData.getElement(30004).Prob + GameConfig.AIData.getElement(20003).Prob) {
                this.changeAiState(AiState.GunAttack);
            }
        }

        let moveAnimationId = GameConfig.Assets.getElement(20032).Guid;
        Tools.asyncDownloadAsset(moveAnimationId).then(() => {
            if (!this.moveAni) {
                this.moveAni = this.aiModel.loadAnimation(moveAnimationId);
                this.moveAni.loop = 0;
            }
            this.moveAni.play();
        });
    }
    checkUseWeapon() {
        let playerList = this.findAroundPlayer();
        let res = this.getIdentityExist(playerList);
        if (this.camp == Camp.Spy) {
            if (res.inSightNum > 0) {
                this.changeAiState(AiState.KnifeAttack);
            }
        }
        else if (this.camp == Camp.Police || this.camp == Camp.Hero) {
            if (res.spyExist) {
                this.changeAiState(AiState.GunAttack);
            }
        } else {
            if (!this.isAttackCivilian) return;
            this.isAttackCivilian = false;
            if (res.policeExist) {//平民范围内有警察
                let pro = Math.random();
                if (pro < 1) {//GameConfig.AIData.getElement(30003).Prob) {
                    this.changeAiState(AiState.Follow);
                }
            }
        }
    }
    checkIsAttack() {
        let playerList = this.findAroundPlayer();
        let res = this.getIdentityExist(playerList);
        if (this.camp == Camp.Spy) {
            if (res.inSightNum != 0) {
                let lucky = Tools.randomInt(0, res.inSightNum - 1);
                this.target = playerList[lucky];
                this.changeAiState(AiState.Follow);
            }
        }
        else if (this.camp == Camp.Police || this.camp == Camp.Hero) {
            if (res.spyExist) {
                this.target = GameGlobals.isSpyReal ? GameGlobals.spyPlayer.character : GameGlobals.spyAi.aiModel;
                this.changeAiState(AiState.Follow);
            }
            else {
                if (res.inSightNum != 0) {
                    let ran = Math.random();
                    if (!this.isAttackCivilian) return;
                    this.isAttackCivilian = false;
                    if (ran < 0.2) {
                        let lucky = Tools.randomInt(0, res.inSightNum - 1);
                        this.target = playerList[lucky];
                        this.changeAiState(AiState.Follow);
                    }
                }

            }
        }
    }
    public gunState() {
        this.aiUseHotWeapon();
        setTimeout(() => {
            if (this.curAIState == AiState.GunAttack) {
                this.changeAiState(AiState.Still);
            }
        }, GameConfig.AIData.getElement(20003).Time * 1000);
    }
    public knifeState() {
        this.aiUseColdWeapon();
        setTimeout(() => {
            if (this.curAIState == AiState.KnifeAttack) {
                this.changeAiState(AiState.Still);
            }
        }, GameConfig.AIData.getElement(10003).Time * 1000);
    }
    public followState() {
        if (this.camp == Camp.Civilian) {
            if (GameGlobals.heroAi == null && GameGlobals.heroPlayer == null) {
                this.target = GameGlobals.isPoliceReal ? GameGlobals.policePlayer.character : GameGlobals.policeAi.aiModel;
            }
            else {
                this.target = GameGlobals.isHeroReal ? GameGlobals.heroPlayer.character : GameGlobals.heroAi.aiModel;
            }
            setTimeout(() => {
                if (this.curAIState == AiState.Follow) {
                    this.changeAiState(AiState.Still);
                }
            }, GameConfig.AIData.getElement(30003).Time * 1000);
        }
        if (this.camp == Camp.Spy) {
            setTimeout(() => {
                if (this.curAIState == AiState.Follow) {
                    this.changeAiState(AiState.Still);
                }
            }, GameConfig.AIData.getElement(10004).Time * 1000);
        }
        else {
            setTimeout(() => {
                if (this.curAIState == AiState.Follow) {
                    this.changeAiState(AiState.Still);
                }
            }, GameConfig.AIData.getElement(20004).Time * 1000);
        }

    }
    public followUpdate() {
        if (this.aiGameState != PlayerGameState.Normal && this.aiGameState != PlayerGameState.Protect) return;
        if (!this.target) {
            this.changeAiState(AiState.Still);
        }
        if (PlayerManagerExtesion.isNpc(this.target)) {
            let aiobj = Tools.getAiObject(this.target as mw.Character);
            if (aiobj.aiGameState != PlayerGameState.Normal && aiobj.aiGameState != PlayerGameState.Protect) {
                this.changeAiState(AiState.Still);
                return;
            }
        }
        if (PlayerManagerExtesion.isCharacter(this.target)) {
            let player = (this.target as mw.Character).player;
            let state = PlayerGameState.Leave;
            if (GameGlobals.enterGameNormalPlayers.includes(player)) {
                state = DataCenterS.getData(player, GameModuleData).getState();
            }
            if (state != PlayerGameState.Normal && state != PlayerGameState.Protect) {
                this.changeAiState(AiState.Still);
                return;
            }
        }
        this.location = this.target.worldTransform.clone().position;
        if (this.camp == Camp.Spy) {
            if (this.aiModel.worldTransform.clone().position.subtract(this.location).length < GameConfig.Weapon.getElement(10001).Distance) {
                this.aiKnifeAttack();
            }
            else {
                this.location = this.target.worldTransform.clone().position;
                this.moveTo(this.location);
            }
        }
        else if (this.camp == Camp.Civilian) {
            if (this.aiModel.worldTransform.clone().position.subtract(this.location).length > 50) {
                this.moveTo(this.location);
            }
        } else {
            if (this.aiModel.worldTransform.clone().position.subtract(this.location).length < 400) {
                if (!this.aiGunAttack()) {
                    this.moveTo(this.location);
                }
            }
            else {
                this.moveTo(this.location);
            }
        }
    }

    public stillState() {
        this.aiNotUseColdWeapon();
        this.aiNotUseHotWeappon();
        let ran = Math.random();
        this.isAttackCivilian = true;
        if (ran > GameConfig.AIData.getElement(30002).Prob) {
            this.changeAiState(AiState.Move);
        }
        else {
            setTimeout(() => {
                if (this.curAIState == AiState.Still) {
                    this.changeAiState(AiState.Move);
                }
            }, GameConfig.AIData.getElement(30002).Time * 1000);
        }
    }
    /**
     * 
     * @param kind 1：随机点，2：道具点，3：武器掉落点
     */
    public moveToRandom(kind: number) {
        let loc: mw.Vector;
        switch (kind) {
            case 1://随机点
                loc = this.getRandomBoxLoc();
                break;
            case 2://道具点
                let ran = Tools.randomInt(10001, 10021);
                loc = GameConfig.PropsGenerate.getElement(ran).GeneratePoint;
                break;
            case 3://武器掉落点
                if (!GameGlobals.gunLeaveLoc.equals(new mw.Vector(0, 0, 0))) {
                    loc = GameGlobals.gunLeaveLoc;
                }
                else {
                    loc = this.getRandomBoxLoc();
                }
                break;
        }
        this.moveTo(loc);
    }
    private getRandomBoxLoc() {
        let loc: mw.Vector = new mw.Vector(0, 0, 0);
        let ran = Tools.randomInt(this.headIndex + 1, this.headIndex + this.total);
        let info = GameConfig.AIWayPoint.getElement(ran);
        let xRange = info.Scale.x * 100 / 2 - 50;
        let yRange = info.Scale.y * 100 / 2 - 50;
        let randomX = Tools.randomInt(-xRange, xRange);
        let randomY = Tools.randomInt(-yRange, yRange);
        loc.x = info.Location.x + randomX;
        loc.y = info.Location.y + randomY;
        loc.z = info.Location.z + 50;
        return loc;
    }
    /**
     * 
     * @param playerList 
     * @returns 黑手党是否存在，警探是否存在，视野内的人数
     */
    public getIdentityExist(playerList: Array<mw.GameObject>) {
        let spyExist: boolean = false;
        let policeExist: boolean = false;
        playerList.forEach((obj) => {
            if (PlayerManagerExtesion.isNpc(obj)) {
                let aiobj = Tools.getAiObject(obj as mw.Character);
                if (aiobj.camp == Camp.Spy && aiobj.aiWeaponState == PlayerWeaponState.Knife) {
                    spyExist = true;
                }
                else if ((aiobj.camp == Camp.Police || aiobj.camp == Camp.Hero) && aiobj.aiWeaponState == PlayerWeaponState.Gun) {
                    policeExist = true;
                }
            }
            if (PlayerManagerExtesion.isCharacter(obj)) {
                let player = (obj as mw.Character).player;
                let camp = DataCenterS.getData(player, GameModuleData).getPlayerCamp();
                let weaponState = DataCenterS.getData(player, GameModuleData).getWeaponState();
                if (camp == Camp.Spy && weaponState == PlayerWeaponState.Knife) {
                    spyExist = true;
                }
                else if ((camp == Camp.Police || camp == Camp.Hero) && weaponState == PlayerWeaponState.Gun) {
                    policeExist = true;
                }
            }
        })
        return { spyExist: spyExist, policeExist: policeExist, inSightNum: playerList.length };
    }
    /**检查周围是否有玩家 */
    public findAroundPlayer(): Array<mw.GameObject> {
        let angle;
        let radius;
        if (this.camp == Camp.Spy) {
            angle = GameConfig.AIData.getElement(10001).RangeAngle / 2;
            radius = GameConfig.AIData.getElement(10001).RangeRadius;
        }
        else if (this.camp == Camp.Civilian) {
            angle = GameConfig.AIData.getElement(30001).RangeAngle / 2;
            radius = GameConfig.AIData.getElement(30001).RangeRadius;
        }
        else {
            angle = GameConfig.AIData.getElement(20001).RangeAngle / 2;
            radius = GameConfig.AIData.getElement(20001).RangeRadius;
        }
        let playerList: Array<mw.GameObject> = [];
        GameGlobals.readyPlayers.forEach((player) => {
            let isIn = this.isInSight(player.character, angle, radius);
            if (isIn) playerList.push(player.character);
        })
        GameGlobals.aiPlayer.forEach((aiobj) => {
            if (aiobj.aiModel != this.aiModel) {
                let isIn = this.isInSight(aiobj.aiModel, angle, radius);
                if (isIn) playerList.push(aiobj.aiModel);
            }
        })
        return playerList;
    }
    /**判断玩家是否在视线内 */
    private isInSight(obj: mw.GameObject, angle: number, radius: number) {
        let forward = this.aiModel.worldTransform.getForwardVector();
        let objForward = obj.worldTransform.clone().position.subtract(this.aiModel.worldTransform.clone().position);
        let distance = mw.Vector.distance(obj.worldTransform.clone().position, this.aiModel.worldTransform.clone().position);
        let cosValue = mw.Vector.dot(forward, objForward) / distance;
        let cosStatic = Math.cos(angle * Math.PI / 180);
        if (distance <= radius && cosValue >= cosStatic) {
            return true;
        }
        else {
            return false;
        }
    }
    public changeAiLocation(loc: mw.Vector) {
        this.aiModel.worldTransform.position = loc;
    }
    public changeCoin(num: number): boolean {
        if (this.aiGold + num > GameConfig.Rule.getElement(10014).Num) {
            this.aiGold = GameConfig.Rule.getElement(10014).Num;
            return false;
        }
        else {
            this.aiGold += num;
            return true;
        }
    }
    public changeProp(num: number) {
        if (this.aiPropNum + num > GameModuleData.maxPropNum) {
            return { isChange: false, total: this.aiPropNum };;
        }
        else {
            this.aiPropNum += num;
            return { isChange: true, total: this.aiPropNum };
        }
    }
    public aiKnifeAttack() {
        if (this.aiGameState != PlayerGameState.Normal) return;
        if (this.isCd) return;
        let pro = Math.random();
        if (pro < 0.6) return;
        this.isCd = true;
        setTimeout(() => {
            this.isCd = false;
        }, 5000);
        if (this.aiWeaponState != PlayerWeaponState.Knife) return;
        this.lookAt(this.target.worldTransform.clone().position);
        let animGuid = GameConfig.Assets.getElement(15001).Guid;
        PlayerManagerExtesion.rpcPlayAnimation(this.aiModel, animGuid);

        let weaponInfo = GameConfig.Weapon.getElement(this.aiColdWeapon);
        setTimeout(() => {
            GeneralManager.rpcPlayEffectOnGameObject(weaponInfo.ShootEffectGUID.toString(), this.coldWeaponObj, 1);
        }, GameConfig.Rule.getElement(10022).Time * 1000);
        setTimeout(() => {
            ModuleService.getModule(ColdWeaponModuleS).checkTarget(this.aiColdWeapon, this.aiModel);
        }, GameConfig.Rule.getElement(10021).Time * 1000);

    }
    public async aiGunAttack() {
        if (this.aiGameState != PlayerGameState.Normal) return false;
        if (this.isCd) return false;
        let pro = Math.random();
        if (pro < 0.2) return false;
        this.isCd = true;
        setTimeout(() => {
            this.isCd = false;
        }, 2000);
        if (this.aiWeaponState != PlayerWeaponState.Gun) return false;
        this.stopMove();
        this.lookAt(this.target.worldTransform.clone().position);
        let loc1 = this.aiModel.worldTransform.clone().position;
        let vec = this.aiModel.worldTransform.getForwardVector();
        let rot = this.aiModel.worldTransform.getForwardVector().toRotation();
        this.aiModel.worldTransform.clone().rotation = rot;///
        let loc = loc1.add(vec.multiply(25));
        let bulletObj = new Projectile();
        await bulletObj.weaponChange(this.aiHotWeapon, this.aiModel.player, AiOrPlayer.AiPlayer, this);
        bulletObj.fire(this.aiModel.player, loc, vec);
        PlayerManagerExtesion.rpcPlayAnimation(this.aiModel, GameConfig.Assets.getElement(15003).Guid);
        mw.SoundService.play3DSound(GameConfig.Assets.getElement(10004).Guid, loc, 1);
        return true;
    }
    /**
      * 移动到目标点
      * @param target
      */
    public moveTo(target: mw.Vector) {
        this.beginMoveTime = mw.TimeUtil.time();
        this.stopMove();
        this.location = target;
        this.lookAt(target);
        console.error(`wfz - wfz - moveTo`);
        let moveAnimationId = GameConfig.Assets.getElement(20032).Guid;
        Tools.asyncDownloadAsset(moveAnimationId).then(() => {
            if (!this.moveAni) {
                this.moveAni = this.aiModel.loadAnimation(moveAnimationId);
                this.moveAni.loop = 0;
            }
            this.moveAni.play();
        });
        Navigation.navigateTo(this.aiModel, target, 5,
            () => {
                if (this.moveAni) this.moveAni.stop();
            },
            () => {
                if (this.moveAni) this.moveAni.stop();
                if (this.curAIState == AiState.Ready) {
                    setTimeout(() => {
                        this.moveToRandom(1);
                    }, 2000);
                }
                if (this.curAIState == AiState.NotActive) {

                }
                else if (this.curAIState != AiState.Still) {
                    this.changeAiState(AiState.Still);
                }
            });
    }

    /**
     * 是否到达目标点
     */
    public get isArrived() {
        if (this.location == null) return false;
        if (this.location.subtract(this.aiModel.worldTransform.clone().position).length <= 150) {
            console.warn("到达目标点");
            if (this.moveAni) this.moveAni.stop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * 停止移动
     */
    public stopMove() {
        console.error(`wfz - wfz - stopMove`);
        if (this.moveAni) this.moveAni.stop();
        Navigation.navigateTo(this.aiModel, this.aiModel.worldTransform.clone().position);
    }


    /**
     * 获取向前向量
     */
    public get ForwardVector(): mw.Vector {
        if (PlayerManagerExtesion.isNpc(this.aiModel)) {
            return this.aiModel.worldTransform.getForwardVector();
        }
        return null;
    }

    /**
     * 看向目标点
     * @param location
     */
    public lookAt(location: mw.Vector) {
        if (PlayerManagerExtesion.isNpc(this.aiModel)) {
            this.aiModel.lookAt(location);
        }
    }
    /**ai改为持枪 */
    public aiUseHotWeapon() {
        if (this.camp == Camp.Police || this.camp == Camp.Hero) {
            if (this.aiWeaponState == PlayerWeaponState.UnEquip) {
                let objInfo = GameConfig.Weapon.getElement(this.aiHotWeapon);
                PlayerManagerExtesion.rpcPlayAnimation(this.aiModel, objInfo.BufferActionGUID.toString(), 1, objInfo.BufferRate);
                setTimeout(() => {
                    this.aiModel.attachToSlot(this.hotWeaponObj, mw.HumanoidSlotType.RightHand);
                    if (this.nowStance) {
                        this.nowStance.stop();
                    }
                    this.nowStance = PlayerManagerExtesion.loadStanceExtesion(this.aiModel, objInfo.HoldPosture.toString());
                    this.nowStance.play();
                    console.error(`wfz - wfz - ai改为持枪`);
                    this.hotWeaponObj.localTransform.position = (objInfo.HoldOffset);
                    this.hotWeaponObj.localTransform.rotation = (new mw.Rotation(objInfo.HoldRotation));
                    this.aiWeaponState = PlayerWeaponState.Gun;
                }, Globals.getWeaponTime);
            }
        }
    }
    /**ai改为持刀 */
    public aiUseColdWeapon() {
        if (this.camp != Camp.Spy) return;
        if (this.aiWeaponState == PlayerWeaponState.UnEquip) {
            let objInfo = GameConfig.Weapon.getElement(this.aiColdWeapon);
            PlayerManagerExtesion.rpcPlayAnimation(this.aiModel, objInfo.BufferActionGUID.toString(), 1, objInfo.BufferRate);
            setTimeout(() => {
                this.aiModel.attachToSlot(this.coldWeaponObj, mw.HumanoidSlotType.RightHand);
                if (this.nowStance) {
                    this.nowStance.stop();
                }
                this.nowStance = PlayerManagerExtesion.loadStanceExtesion(this.aiModel, objInfo.HoldPosture.toString());
                this.nowStance.play();
                console.error(`wfz - wfz - ai改为持刀`);
                this.coldWeaponObj.localTransform.position = (objInfo.HoldOffset);
                this.coldWeaponObj.localTransform.rotation = (new mw.Rotation(objInfo.HoldRotation));
                this.aiWeaponState = PlayerWeaponState.Knife;
            }, Globals.getWeaponTime);
        }
    }
    /**ai取消持枪 */
    public aiNotUseHotWeappon() {
        if (this.nowStance) {
            this.nowStance.stop();
            this.nowStance = null;
        }

        let objInfo = GameConfig.Weapon.getElement(this.aiHotWeapon);
        this.aiModel.attachToSlot(this.hotWeaponObj, objInfo.RabbetPart);
        this.hotWeaponObj.localTransform.position = (objInfo.WeaponPosition);
        this.hotWeaponObj.localTransform.rotation = (new mw.Rotation(objInfo.WeaponRotation));
        this.aiWeaponState = PlayerWeaponState.UnEquip;
    }
    /**ai取消持刀 */
    public aiNotUseColdWeapon() {
        if (this.nowStance) {
            this.nowStance.stop();
            this.nowStance = null;
        }
        let objInfo = GameConfig.Weapon.getElement(this.aiColdWeapon);
        this.aiModel.attachToSlot(this.coldWeaponObj, objInfo.RabbetPart);
        this.coldWeaponObj.localTransform.position = (objInfo.WeaponPosition);
        this.coldWeaponObj.localTransform.rotation = (new mw.Rotation(objInfo.WeaponRotation));
        this.aiWeaponState = PlayerWeaponState.UnEquip;
    }

    private aiChangeClothes(roleId: number, aiModel: mw.Character) {
        ModuleService.getModule(AiModuleS).changeCloth(roleId, aiModel.gameObjectId);
        if (this.nowStance) {
            this.nowStance.stop();
            this.nowStance = null;
        }
        //To do
        this.aiJumpMaxHeight = GameConfig.Rule.getElement(10017).Num;
        this.aiSpeed = GameConfig.Rule.getElement(10016).Num;
        this.aiModel.maxWalkSpeed = this.aiSpeed;
        this.aiModel.collisionWithOtherCharacterEnabled = false;
    }
    private async aiEquipWeapon(weaponId: number) {
        let objInfo = GameConfig.Weapon.getElement(weaponId);
        let obj = await SpawnManager.wornAsyncSpawn(objInfo.ModleGUID.toString());
        this.aiModel.attachToSlot(obj, objInfo.RabbetPart);
        obj.localTransform.position = (objInfo.WeaponPosition);
        obj.localTransform.rotation = (new mw.Rotation(objInfo.WeaponRotation));
        obj.worldTransform.scale = objInfo.WeaponScale;
        (obj as mw.Model).setCollision(mw.PropertyStatus.Off, true);
        return obj;
    }
    public setAiName(str: string) {
        this.aiName = str;
        //this.aiModel.CharacterName = str;
    }
}
