import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager,SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { AiObject } from "../../../AI/AiObject";
import { AiOrPlayer, Camp, GameGlobals, GamingState, KillType, PlayerGameState } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import { IWeaponElement } from "../../../Tables/Weapon";
import { Tools } from "../../../Tools";
import { HotWeaponModuleS } from "./HotWeaponModuleS";
import SoundManager = mw.SoundService;
import { BagModuleS } from "../../BagModule/BagModuleS";
import { AiModuleS } from "../../../AI/AiModule";
import { GameModuleS } from "../../GameModule/GameModuleS";
import { BagModuleData } from "../../BagModule/BagData";
import ShelterModuleS from "../../shelterModule/ShelterModuleS";
import { SkillModuleS } from "../../SkillModule/SkillModuleS";
import AttributeManager, { AttributeType } from "../../SVipModule/AttributeManager";

export class Projectile {
    /**子弹模型 */
    private bulletMesh: mw.GameObject;
    /**生成武器特效 */
    private weaponEffect: number
    /**子弹模型guid */
    private bulletGuid: string = "43368";
    /**射出子弹的人 */
    private owner: mw.Player;
    /**射出子弹的AI */
    private ownAi: AiObject = null;
    /**投掷物逻辑对象 */
    private projectile: mw.ProjectileMovement;
    /**是否处于开火状态 */
    private isFire: boolean = false;

    /**子弹自带特效guid */
    private bulletEffect: string;
    /**子弹特效动态id */
    private bulletEffectId: number = 0;
    /**子弹特效缩放 */
    private bulletEffectScale: mw.Vector;
    /**子弹特效旋转 */
    private bulletEffectRot: mw.Rotation;
    /**子弹特效偏移 */
    private bulletEffectLoc: mw.Vector = new mw.Vector(0, 0, 0);
    
    private startPos: Vector;
    /**击中特效 */
    private hitEffect: string;
    /**击中特效缩放 */
    private hitEffectScale: mw.Vector;
    /**击中特效旋转 */
    private hitEffectRot: mw.Vector = new mw.Vector(0, 0, 0);
    /**击中特效偏移量 */
    private hitEffectLoc: mw.Vector = new mw.Vector(0, 0, 0);

    /**弹孔缩放 */
    private shellScale = new mw.Vector(1, 1, 1);
    /**子弹重力 */
    private gravity: number = 0;

    /**子弹发射声音 */
    private bulletLauchSound: string;
    /**子弹击中物体声音 */
    private bulletHitSound: string;
    /**子弹伤害 */
    private bulletConfig: IWeaponElement;
    /**子弹开始的枪口特效 */
    private gunEffect: string;
    private gunEffectScale: mw.Vector;
    private gunEffectRot: mw.Vector;
    private gunEffectLoc: mw.Vector;
    /**武器飞行速度 */
    private speed: number
    /**武器旋转速度 */
    private rotateSpeed: number = 20;
    /**武器最大飞行距离 */
    private distance: number
    /**冷兵器命中非玩家存在时间 */
    private lastTime: number = 5
    /**玩家手上的冷兵器 */
    private weaponMesh: mw.GameObject
    /**ai默认冷兵器 */
    private defaultColdWeapon: number
    /**冷兵器最大存在时间 */
    private maxLastTime: number = 9
    /**最长持续时间计时器 */
    private maxLastTimer: number
    /**计时器 */
    private timer;
    /**子弹飞行速度 */
    private bulletSpeed = GameConfig.Rule.getElement(20001).Num;
    /**飞刀飞行速度 */
    private knifeSpeed = GameConfig.Rule.getElement(20002).Num;
    /**初始化热武器投掷物模块 */
    public async initBullet() {
        this.bulletMesh =  await SpawnManager.asyncSpawn({guid: this.bulletGuid, replicates: true});//子弹模型
        this.bulletMesh.setCollision(mw.CollisionStatus.QueryOnly, true);
        this.bulletMesh.localTransform.position = (mw.Vector.zero);
        this.bulletMesh.localTransform.rotation = (new mw.Rotation(0, 90, 0));
        this.bulletMesh.worldTransform.scale = this.shellScale;
        this.bulletMesh.setVisibility(mw.PropertyStatus.On);
        await this.initProjectile(this.bulletMesh)
        this.bulletEffectId = GeneralManager.rpcPlayEffectOnGameObject(this.bulletEffect, this.bulletMesh, -10, this.bulletEffectLoc, this.bulletEffectRot, this.bulletEffectScale);
    }
    /**初始化冷兵器投掷物模块 */
    public async initColdWeapon() {
        this.timer = TimeUtil.setInterval(()=>{
            if (this.weaponMesh && this.weaponMesh.worldTransform.rotation) {
                let rot = this.weaponMesh.localTransform.rotation.clone()
                let quaternion = rot.toQuaternion();
                quaternion = mw.Quaternion.rotateY(quaternion, this.rotateSpeed * 0.05);
                this.weaponMesh.localTransform.rotation = quaternion.toRotation();
    }}, 0.05)
        let trigger = await mw.GameObject.asyncSpawn("Trigger");
        trigger.worldTransform.scale = new Vector(0.2, 0.1, 0.3);
        trigger.worldTransform.position = this.weaponMesh.worldTransform.position;
        this.weaponMesh.parent = trigger;
        this.weaponMesh.localTransform.position = new Vector(0, 0, -50);
        trigger.setCollision(mw.CollisionStatus.QueryOnly, true);
        await this.initProjectile(this.weaponMesh);
    }
    private async initProjectile(obj: mw.GameObject) {
        //关闭投掷物默认自带的碰撞效果
        if (this.weaponMesh) {
            this.projectile = new mw.ProjectileMovement(obj.parent);
            this.projectile.onProjectileHit.add((hitActor: mw.GameObject, sweepResult: mw.HitResult) => {
                if (!this.isFire) return;
                this.coldHit(hitActor, sweepResult);
            })
            this.projectile.onProjectileLifeEnd.add(() => {
                if (!this.isFire) return;
                this.destroy();
            });
            // this.weaponMesh.localTransform.rotation = (this.throwKnifeRotate);
        }
        else {
            this.projectile = new mw.ProjectileMovement(obj);
            this.projectile.onProjectileHit.add((hitActor: mw.GameObject, sweepResult: mw.HitResult) => {
                if (!this.isFire) return;
                this.hit(hitActor, sweepResult);
            })

            this.projectile.onProjectileLifeEnd.add(() => {
                if (!this.isFire) return;
                this.destroy();
            });
        }

    }

    public async weaponChange(weaponId: number, player: mw.Player, isReal: AiOrPlayer, ai?: AiObject) {
        if (isReal == AiOrPlayer.AiPlayer) {
            this.ownAi = ai;
        }
        this.owner = player;
        this.distance = 10000;
        this.speed = this.bulletSpeed;
        this.initWeaponData(weaponId)
        await this.initBullet();
    }

    public async coldWeaponChange(weaponId: number, player: mw.Player, isReal: AiOrPlayer, ai?: AiObject) {
        if (isReal == AiOrPlayer.AiPlayer) {
            this.ownAi = ai;
        }
        this.owner = player;
        let coldId = ModuleService.getModule(BagModuleS).getColdWeaponId(this.owner.playerId);
        let coldWeapon = ModuleService.getModule(BagModuleS).getColdWeaponObj(this.owner);
        let modelGuid = GameConfig.Weapon.getElement(coldId).ModleGUID;
        this.weaponMesh = await SpawnManager.asyncSpawn({guid: modelGuid, replicates: true});
        this.weaponMesh.setCollision(mw.CollisionStatus.QueryOnly, true);
        this.weaponMesh.worldTransform = coldWeapon.worldTransform
        if (isReal == AiOrPlayer.RealPlayer) {
            let weaponId = DataCenterS.getData(player, BagModuleData).getCurColdWeapon()
            let dataInfo = GameConfig.Weapon.getElement(weaponId)
            let effectId = dataInfo.WeaponEffects
            if (effectId) {
                this.weaponEffect = GeneralManager.rpcPlayEffectOnGameObject(String(dataInfo.WeaponEffects), this.weaponMesh, -50, dataInfo.EffectsOffset, dataInfo.EffectsRotation.toRotation(), dataInfo.EffectsScale);
            }

            this.weaponMesh.worldTransform.scale = dataInfo.WeaponScale
        }
        else {
            let dataInfo = GameConfig.Weapon.getElement(this.defaultColdWeapon)
            this.weaponMesh.worldTransform.scale = dataInfo.WeaponScale
        }
        this.speed = this.getFlySpeed();
        this.distance = 10000;
        this.initWeaponData(weaponId)
        await this.initColdWeapon()
    }

    private getFlySpeed(){
        let res = this.knifeSpeed;
        if (this.owner) {
            res = AttributeManager.instance.getAttributeValue(this.owner.playerId, AttributeType.FlyKnifeSpeed);
        }
        return res;
    }

    private initWeaponData(weaponId: number) {
        let weaponInfo = GameConfig.Weapon.getElement(weaponId);

        this.bulletEffect = weaponInfo.BulletEffectGUID.toString();
        this.bulletEffectScale = weaponInfo.BulletEffectScaling;
        this.bulletEffectRot = new Rotation(weaponInfo.BulletEffectRotate);

        this.hitEffect = weaponInfo.HitEffectGUID.toString();
        this.hitEffectScale = weaponInfo.HitEffectScaling;
        this.bulletLauchSound = weaponInfo.AttackSoundGUID.toString();
        this.bulletHitSound = weaponInfo.HitSoundGUID.toString();
        this.bulletConfig = weaponInfo;
        this.gunEffect = weaponInfo.ShootEffectGUID.toString();
        this.gunEffectLoc = weaponInfo.ShootEffectOffset;
        this.gunEffectRot = weaponInfo.ShootEffectRotate;
        this.gunEffectScale = weaponInfo.ShootEffectScaling;
    }

    public hit(hitActor: mw.GameObject, sweepResult: mw.HitResult) {
        if (GameGlobals.curGameState != GamingState.GamingState) {
            this.isFire = false;
            this.destroy();
            return false
        };

        if (this.isHitEffectiveTarget(hitActor) == false) {
            return
        }
        oTrace("子弹击中物体")
        this.isFire = false;
        GeneralManager.rpcPlayEffectAtLocation(this.hitEffect, sweepResult.position, 1, this.hitEffectRot.toRotation(), this.hitEffectScale);//后期可能加上偏移
        SoundService.play3DSound(this.bulletHitSound, sweepResult.position);
        this.destroy(true);
        this.hitPlayer(hitActor, sweepResult);
    }

    public coldHit(hitActor: mw.GameObject, sweepResult: mw.HitResult) {
        if (GameGlobals.curGameState != GamingState.GamingState) {
            this.isFire = false;
            this.destroy(true)
            return false
        };

        if (this.isHitEffectiveTarget(hitActor) == false) {
            return
        }

        if (PlayerManagerExtesion.isCharacter(hitActor)) {
            oTrace("击中角色");
            let player = (hitActor as mw.Character).player;
            if (player == this.owner) {
                this.isFire = false;
                this.destroy(true);
                oTrace("击中自己");
                return false;
            }
        }
        this.isFire = false;
        this.hitPlayer(hitActor, sweepResult)
        let isAi = null
        if (PlayerManagerExtesion.isNpc(hitActor)) {
            let npc = hitActor as mw.Character;
            isAi = Tools.getAiObj(npc)
        }
        if (isAi != null || PlayerManagerExtesion.isCharacter(hitActor)) {
            this.destroy(true);
        }
        else {
            this.destroy();
        }
    }

    /**是否击中有效目标 */
    private isHitEffectiveTarget(hitActor: mw.GameObject) {
        oTrace("击中目标");
        if (GameGlobals.curGameState != GamingState.GamingState) return false;
        oTrace("击中目标" + hitActor + "id" + hitActor.gameObjectId);
        if (Tools.isTrigger(hitActor)) return false;
        oTrace("人形对象" + (PlayerManagerExtesion.isNpc(hitActor)))
        oTrace("角色" + (PlayerManagerExtesion.isCharacter(hitActor)))

        if (PlayerManagerExtesion.isNpc(hitActor)) {
            let ai = Tools.getAiObj(hitActor as mw.Character);
            if (!ai) {
                oTrace("ai不存在");
                return false;
            }
            if (ai == this.ownAi) {
                oTrace("击中自己")
                return false;
            }
            else if(ai.aiGameState == PlayerGameState.Die || ai.aiGameState == PlayerGameState.Back || ai.aiGameState == PlayerGameState.Leave ){
                return false;
            }
        }
        if (PlayerManagerExtesion.isCharacter(hitActor)) {
            let player = (hitActor as mw.Character).player;
            let state = ModuleService.getModule(GameModuleS).getPlayerState(player.playerId);
            if (player == this.owner) {
                return false;
            }
            else if(state == PlayerGameState.Die || state == PlayerGameState.Back || state == PlayerGameState.Leave ){
                return false;
            }
            if (this.owner && !ModuleService.getModule(ShelterModuleS).canHitPlayer(this.owner.character.gameObjectId, hitActor.gameObjectId)) {
                return false;
            }
        }
        return true;
    }
    /**击中玩家 */
    private hitPlayer(hitActor: mw.GameObject, hit: mw.HitResult) {
        let isPlayer: boolean = false;
        if (this.ownAi == null) {
            if (PlayerManagerExtesion.isNpc(hitActor)) {
                if (Tools.isAiPlayer(hitActor as mw.Character)) {
                    oTrace("子弹击中人机1");
                    let victim = Tools.getAiObj(hitActor as mw.Character);
                    if (this.weaponMesh) {
                        ModuleService.getModule(GameModuleS).serverChangeHp(this.bulletConfig.ID, AiOrPlayer.AiPlayer, Camp.Spy, KillType.Shoot, null, victim)
                    }
                    else {
                        ModuleService.getModule(HotWeaponModuleS).beAttackByBullet(this.bulletConfig, AiOrPlayer.RealPlayer, AiOrPlayer.AiPlayer, this.owner, null, null, victim);
                    }
                }
                isPlayer = true;
            }
            if (PlayerManagerExtesion.isCharacter(hitActor)) {//都是真人
                oTrace("子弹击中人1");
                let victim = (hitActor as mw.Character).player;
                if (this.weaponMesh) {
                    ModuleService.getModule(GameModuleS).serverChangeHp(this.bulletConfig.ID, AiOrPlayer.RealPlayer, Camp.Spy, KillType.Shoot, victim, null)
                }
                else {
                    ModuleService.getModule(HotWeaponModuleS).beAttackByBullet(this.bulletConfig, AiOrPlayer.RealPlayer, AiOrPlayer.RealPlayer, this.owner, victim, null, null);
                }
                isPlayer = true;
            }
        }
        else {
            if (PlayerManagerExtesion.isNpc(hitActor)) {
                if (Tools.isAiPlayer(hitActor as mw.Character)) {
                    oTrace("子弹击中人机2");
                    let victim = Tools.getAiObj(hitActor as mw.Character);
                    if (this.weaponMesh) {
                        ModuleService.getModule(GameModuleS).serverChangeHp(this.bulletConfig.ID, AiOrPlayer.AiPlayer, Camp.Spy, KillType.Shoot, null, victim)
                    }
                    else {
                        ModuleService.getModule(HotWeaponModuleS).beAttackByBullet(this.bulletConfig, AiOrPlayer.AiPlayer, AiOrPlayer.AiPlayer, this.owner, null, null, victim);
                    }
                }
                isPlayer = true;
            }
            if (PlayerManagerExtesion.isCharacter(hitActor)) {//都是真人
                oTrace("子弹击中人2");
                let victim = (hitActor as mw.Character).player;
                if (this.weaponMesh) {
                    ModuleService.getModule(GameModuleS).serverChangeHp(this.bulletConfig.ID, AiOrPlayer.RealPlayer, Camp.Spy, KillType.Shoot, victim, null)
                }
                else {
                    ModuleService.getModule(HotWeaponModuleS).beAttackByBullet(this.bulletConfig, AiOrPlayer.RealPlayer, AiOrPlayer.RealPlayer, this.owner, victim, null, null);
                }
                isPlayer = true;
            }
        }
        Tools.playHitSound(this.bulletConfig.id, hitActor);
        if (!isPlayer && !this.weaponMesh) {
            this.createBulletHold(hit);
        }
    }

    private createBulletHold(hit: mw.HitResult) {
        let rot = hit.impactNormal.toRotation();
        rot.y -= 90;
        GeneralManager.rpcPlayEffectAtLocation("98958", hit.position, 1, rot);
    }


    public destroy(immediate: boolean = false) {
        if (this.timer) {
            TimeUtil.clearInterval(this.timer);
            this.timer = null;
        }
        if (this.projectile) this.projectile.pause();
        if (this.bulletEffectId) {
            EffectService.stop(this.bulletEffectId)
            this.bulletEffectId = 0;
        }
        if (immediate == true) {
            this.destroyFunc()
            return
        }
        setTimeout(() => {
            this.destroyFunc()
        }, this.lastTime * 1000);
    }
    private destroyFunc() {
        if (this.maxLastTimer) {
            clearTimeout(this.maxLastTimer)
        }

        if (this.bulletMesh) {
            this.bulletMesh.destroy();
            this.bulletMesh = null;
        }
        if (this.weaponMesh) {
            this.weaponMesh.destroy();
            this.weaponMesh = null;
        }
        if (this.projectile) {
            this.projectile.destroy(true);
            this.projectile = null;
        }
        if (this.weaponEffect) {
            EffectService.stop(this.weaponEffect)
            this.weaponEffect = null
        }
    }
    public fire(player: mw.Player, pos: mw.Vector, dir: mw.Vector) {
        this.startPos = pos;
        this.isFire = true;
        this.projectile.pause();
        this.projectile.gravityScale = this.gravity
        // this.projectile.setLocationAndRotation(pos, rot);
        this.projectile.initialSpeed = this.speed;
        // this.projectile.collisionLength = GameConfig.Weapon.getElement(20001).Distance;
        // this.projectile.collisionRadius = GameConfig.Weapon.getElement(20001).Distance;
        this.projectile.lifeSpan = this.distance/ this.speed;
        this.projectile.getRelatedGameObject().worldTransform.position = pos;
        this.projectile.getRelatedGameObject().worldTransform.rotation = dir.toRotation();
        // if (player) {
        //     this.projectile.bindPlayer(player);
        // }
        this.owner = player;
        console.warn("传入的值" + pos + "===" + dir);
        console.warn("位置和旋转" + this.projectile.getRelatedGameObject().worldTransform.position + "===" + this.projectile.getRelatedGameObject().worldTransform.rotation);
        this.projectile.launch(dir);
        if (this.weaponMesh) {
            let rot = dir.toRotation();
            rot = rot.add(new mw.Rotation(0, -90, 0));
            this.weaponMesh.worldTransform.rotation = rot;
            let config = GameConfig.Sound.getElement(10022);
            SoundService.play3DSound(this.bulletLauchSound, pos, config.Count, config.Rate, { radius: config.InnerRadius, falloffDistance: config.FalloffDistance})
            this.maxLastTimer = setTimeout(() => {
                this.destroy(true)
            }, this.maxLastTime * 1000);
        }
        else{
            GeneralManager.rpcPlayEffectAtLocation(this.gunEffect, this.startPos, 1, this.gunEffectRot.toRotation(), this.gunEffectScale);
            let config = GameConfig.Sound.getElement(10020);
            SoundService.play3DSound(this.bulletLauchSound, this.startPos, config.Count, config.Rate, { radius: config.InnerRadius, falloffDistance: config.FalloffDistance})

        }
    }
}