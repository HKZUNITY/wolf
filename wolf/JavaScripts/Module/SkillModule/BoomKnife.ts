import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { oTrace } from "odin";
import { AiObject } from "../../AI/AiObject";
import { AiOrPlayer, Camp, GameGlobals, GamingState, KillType, PlayerGameState } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { BagModuleData } from "../BagModule/BagData";
import { BagModuleS } from "../BagModule/BagModuleS";
import { BaseBullet } from "./BaseBullet";
import { GameModuleS } from "../GameModule/GameModuleS";
import ShelterModuleS from "../shelterModule/ShelterModuleS";
import { IWeaponElement } from "../../Tables/Weapon";
import { SkillModuleS } from "./SkillModuleS";
import AttributeManager, { Attribute, AttributeType } from "../SVipModule/AttributeManager";

export default class BoomKnife implements BaseBullet {
    /**玩家手上的冷兵器 */
    private weaponMesh: mw.GameObject;
    /**武器飞行速度 */
    private speed: number = GameConfig.Rule.getElement(20002).Num;
    /**武器旋转速度 */
    private rotateSpeed: number = 20;
    /**武器最大飞行距离 */
    private distance: number = 10000;
    /**击中特效 */
    private hitEffect: string;
    /**击中特效缩放 */
    private hitEffectScale: mw.Vector;
    /**击中特效旋转 */
    private hitEffectRot: mw.Vector = new mw.Vector(0, 0, 0);
    /**子弹伤害 */
    private dataInfo: IWeaponElement;
    private startPos: Vector;
    /**射出子弹的人 */
    private owner: mw.Player;
    /**射出子弹的AI */
    private ownAi: AiObject = null;
    /**投掷物逻辑对象 */
    private projectile: mw.ProjectileMovement;
    /**是否处于开火状态 */
    private isFire: boolean = false;
    /**生成武器特效 */
    private weaponEffect: number;
    /**计时器 */
    private timer;
    /**冷兵器命中非玩家存在时间 */
    private lastTime: number = 5
    /**最长持续时间计时器 */
    private maxLastTimer: number
    /**爆炸物体guid */
    private boomGuid: string = "68160"
    /**爆炸物体 */
    private boomObj: mw.GameObject;
    /**技能id */
    private skillId: number;
    /**子弹发射声音 */
    private knifeLauchSound: string;
    /**冷兵器最大存在时间 */
    private maxLastTime: number = 9;
    /**爆炸延时 */
    private boomDelay: number = 3;
    public async weaponChange(weaponId: number, player: mw.Player, isReal: AiOrPlayer, ai?: AiObject) {
        if (isReal == AiOrPlayer.AiPlayer) {
            this.ownAi = ai;
        }
        this.owner = player;


        let coldId = ModuleService.getModule(BagModuleS).getColdWeaponId(this.owner.playerId);
        let coldWeapon = ModuleService.getModule(BagModuleS).getColdWeaponObj(this.owner);
        let modelGuid = GameConfig.Weapon.getElement(coldId).ModleGUID;
        this.weaponMesh = await SpawnManager.asyncSpawn({ guid: modelGuid, replicates: true });
        this.weaponMesh.worldTransform = coldWeapon.worldTransform;
        (this.weaponMesh as mw.Model).setCollision(mw.CollisionStatus.QueryOnly, true);
        if (isReal == AiOrPlayer.RealPlayer) {
            let weaponId = DataCenterS.getData(player, BagModuleData).getCurColdWeapon()
            let dataInfo = GameConfig.Weapon.getElement(weaponId);
            this.dataInfo = dataInfo;
            let effectId = dataInfo.WeaponEffects
            if (effectId) {
                this.weaponEffect = GeneralManager.rpcPlayEffectOnGameObject(String(dataInfo.WeaponEffects), this.weaponMesh, 0, dataInfo.EffectsOffset, dataInfo.EffectsRotation.toRotation(), dataInfo.EffectsScale);
            }

            this.weaponMesh.worldTransform.scale = dataInfo.WeaponScale
        }
        this.initWeaponData(weaponId)
        await this.initColdWeapon()
    }

    /**初始化冷兵器投掷物模块 */
    public async initColdWeapon() {
        this.timer = TimeUtil.setInterval(() => {
            if (this.weaponMesh && this.weaponMesh.worldTransform.rotation) {
                let rot = this.weaponMesh.localTransform.rotation.clone()
                let quaternion = rot.toQuaternion();
                quaternion = mw.Quaternion.rotateY(quaternion, this.rotateSpeed * 0.05);
                this.weaponMesh.localTransform.rotation = quaternion.toRotation();
            }
        }, 0.05)
        let trigger = await mw.GameObject.asyncSpawn("Trigger");
        trigger.worldTransform.scale = new Vector(0.2, 0.1, 0.3);
        trigger.worldTransform.position = this.weaponMesh.worldTransform.position;
        this.weaponMesh.parent = trigger;
        this.weaponMesh.localTransform.position = new Vector(0, 0, -50);
        trigger.setCollision(mw.CollisionStatus.QueryOnly, true);
        this.initProjectile(this.weaponMesh);
    }

    private initProjectile(obj: mw.GameObject) {

        if (this.weaponMesh) {
            this.projectile = new mw.ProjectileMovement(obj.parent);
            this.projectile.onProjectileHit.add((hitActor: mw.GameObject, sweepResult: mw.HitResult) => {
                console.error("投掷物命中物体01");

                if (!this.isFire) return;
                console.error("投掷物命中物体01");
                this.hit(hitActor, sweepResult);
            })
            this.projectile.onProjectileLifeEnd.add(() => {
                if (!this.isFire) return;
                this.destroy();
            });
        }

    }

    private initWeaponData(weaponId: number) {
        let weaponInfo = GameConfig.Weapon.getElement(weaponId);
        this.hitEffect = weaponInfo.HitEffectGUID.toString();
        this.hitEffectScale = weaponInfo.HitEffectScaling;
        this.knifeLauchSound = weaponInfo.AttackSoundGUID.toString();
    }

    public hit(hitActor: mw.GameObject, sweepResult: mw.HitResult) {
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
        let isPlayer = this.hitPlayer(hitActor, sweepResult);
        this.destroy(true);
    }

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
            else if (ai.aiGameState == PlayerGameState.Die || ai.aiGameState == PlayerGameState.Back || ai.aiGameState == PlayerGameState.Leave) {
                return false;
            }
        }
        if (PlayerManagerExtesion.isCharacter(hitActor)) {
            let player = (hitActor as mw.Character).player;
            let state = ModuleService.getModule(GameModuleS).getPlayerState(player.playerId);
            if (player == this.owner) {
                return false;
            }
            else if (state == PlayerGameState.Die || state == PlayerGameState.Back || state == PlayerGameState.Leave) {
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
        let isPlayer = this.isHitPlayer(hitActor, false);
        if (!isPlayer && hit) {
            this.createBoomPrefab(hit, null);
        }
        else if (PlayerManagerExtesion.isNpc(hitActor) && hit) {
            let npc = hitActor as mw.Character
            this.createBoomPrefab(hit, npc);
        }
        else if (PlayerManagerExtesion.isCharacter(hitActor) && hit) {
            this.createBoomPrefab(hit, hitActor);
        }
        return isPlayer;
    }

    private boomHitPlayer(hitActor: mw.GameObject, boomPosition: Vector) {
        let dataInfo = GameConfig.Skill.getElement(this.skillId);
        let isPlayer = this.isHitPlayer(hitActor, true);
        if (isPlayer) {
            let endPos = new mw.Vector2(hitActor.worldTransform.position.x, hitActor.worldTransform.position.y);
            let startPos = new mw.Vector2(boomPosition.x, boomPosition.y);
            let tempDir = endPos.clone().subtract(startPos).normalized;
            let dir = new Vector(tempDir.x, tempDir.y, 0);
            let power = dir.multiply(dataInfo.HorizontalImpulse).add(new mw.Vector(0, 0, dataInfo.VerticalImpulse));
            if (hitActor instanceof mw.Character) {
                hitActor.addImpulse(power, true);
            }
        }
    }

    private isHitPlayer(hitActor: mw.GameObject, isHit: boolean) {
        let isPlayer: boolean = false;
        if (this.ownAi == null) {
            if (PlayerManagerExtesion.isNpc(hitActor)) {
                if (Tools.isAiPlayer(hitActor as mw.Character)) {
                    oTrace("子弹击中人机1");
                    let victim = Tools.getAiObj(hitActor as mw.Character);
                    if (isHit) {
                        ModuleService.getModule(GameModuleS).serverChangeHp(this.dataInfo.ID, AiOrPlayer.AiPlayer, Camp.Spy, KillType.Shoot, null, victim)
                    }
                }
                isPlayer = true;
            }
            if (PlayerManagerExtesion.isCharacter(hitActor)) {//都是真人
                oTrace("子弹击中人1");
                let victim = (hitActor as mw.Character).player;
                if (isHit) { ModuleService.getModule(GameModuleS).serverChangeHp(this.dataInfo.ID, AiOrPlayer.RealPlayer, Camp.Spy, KillType.Shoot, victim, null) }
                isPlayer = true;
            }
        }
        else {
            if (PlayerManagerExtesion.isNpc(hitActor)) {
                if (Tools.isAiPlayer(hitActor as mw.Character)) {
                    oTrace("子弹击中人机2");
                    let victim = Tools.getAiObj(hitActor as mw.Character);
                    if (isHit) { ModuleService.getModule(GameModuleS).serverChangeHp(this.dataInfo.ID, AiOrPlayer.AiPlayer, Camp.Spy, KillType.Shoot, null, victim) }
                }
                isPlayer = true;
            }
            if (PlayerManagerExtesion.isCharacter(hitActor)) {//都是真人
                oTrace("子弹击中人2");
                let victim = (hitActor as mw.Character).player;
                if (isHit) {
                    ModuleService.getModule(GameModuleS).serverChangeHp(this.dataInfo.ID, AiOrPlayer.RealPlayer, Camp.Spy, KillType.Shoot, victim, null)
                }
                isPlayer = true;
            }
        }
        Tools.playHitSound(this.dataInfo.id, hitActor);
        return isPlayer;
    }

    private async createBoomPrefab(hit: mw.HitResult, char: mw.Character) {
        let rot = hit.impactNormal.toRotation();
        rot.y -= 90;
        this.boomObj = await SpawnManager.asyncSpawn({ guid: this.boomGuid, replicates: true });
        this.boomObj.setCollision(mw.CollisionStatus.Off, true);
        let dataInfo = GameConfig.Skill.getElement(this.skillId);
        if (char) {
            char.attachToSlot(this.boomObj, mw.HumanoidSlotType.Root);
            this.boomObj.worldTransform.position = hit.position;
            this.boomObj.worldTransform.rotation = rot;
            if (PlayerManagerExtesion.isCharacter(char)) {
                ModuleService.getModule(SkillModuleS).createBoomDelayUI(char.player.playerId, this.boomDelay);
            }
            else {
                let npc = char as mw.Character
                ModuleService.getModule(SkillModuleS).createBoomDelayUI_NPC(npc.gameObjectId, this.boomDelay);
            }
        }
        else {
            this.boomObj.worldTransform.position = hit.position;
            this.boomObj.worldTransform.rotation = rot;
        }
        setTimeout(() => {
            GeneralManager.rpcPlayEffectAtLocation(dataInfo.HitEffect, this.boomObj.worldTransform.position.add(dataInfo.HitEffectPosition), 1, mw.Rotation.zero, dataInfo.HitEffectScale);
            let hitResult = QueryUtil.sphereOverlap(this.boomObj.worldTransform.position, dataInfo.HitDistance, true);
            let attack = this.owner || this.ownAi.aiModel;
            hitResult = hitResult.filter(value => value instanceof mw.Character && value != attack);
            hitResult.forEach((value) => {
                if (!this.isHitEffectiveTarget(value)) {
                    return;
                }
                this.boomHitPlayer(value, this.boomObj.worldTransform.position);
            })
            Tools.playSound(dataInfo.HitSound, this.boomObj.worldTransform.position);
            this.boomObj.destroy();
        }, dataInfo.Delay * 1000);
    }

    public destroy(immediate: boolean = false) {
        if (this.timer) {
            TimeUtil.clearInterval(this.timer);
            this.timer = null;
        }
        if (this.projectile) this.projectile.pause();
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

    private getFlySpeed() {
        let res = this.speed;
        if (this.owner) {
            res = AttributeManager.instance.getAttributeValue(this.owner.playerId, AttributeType.FlyKnifeSpeed);
        }
        return res;
    }

    public fire(player: mw.Player, pos: mw.Vector, dir: mw.Vector, skillId: number) {

        this.startPos = pos;
        this.isFire = true;
        this.projectile.pause();
        this.projectile.gravityScale = 0;
        this.projectile.initialSpeed = this.getFlySpeed();
        this.projectile.getRelatedGameObject().worldTransform.position = pos;
        this.projectile.getRelatedGameObject().worldTransform.rotation = dir.toRotation();
        // this.projectile.collisionLength = GameConfig.Weapon.getElement(20001).Distance;
        // this.projectile.collisionRadius = GameConfig.Weapon.getElement(20001).Distance;
        this.projectile.lifeSpan = this.distance / this.speed;
        // if (player) {
        //     this.projectile.bindPlayer(player);
        // }
        this.owner = player;
        this.skillId = skillId;

        this.projectile.launch(dir);
        let rot = dir.toRotation();
        rot = rot.add(new mw.Rotation(0, -90, 0));
        this.weaponMesh.worldTransform.rotation = rot;
        console.warn("传入的值" + pos + "===" + rot);
        console.warn("位置和旋转" + this.projectile.getRelatedGameObject().worldTransform.position + "===" + this.projectile.getRelatedGameObject().worldTransform.rotation);
        let config = GameConfig.Sound.getElement(10022);
        SoundService.play3DSound(this.knifeLauchSound, pos, config.Count, config.Rate, { radius: config.InnerRadius, falloffDistance: config.FalloffDistance })
        this.maxLastTimer = setTimeout(() => {
            this.destroy(true)
        }, this.maxLastTime * 1000);
    }
}