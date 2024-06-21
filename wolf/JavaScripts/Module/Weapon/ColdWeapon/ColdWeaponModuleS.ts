import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿/*
 * @Author: ZiweiShen
 * @Date: 2022-07-08 14:19:17
 * @LastEditors: ziwei.shen
 * @LastEditTime: 2022-12-25 16:41:58
 * @FilePath: \townmystery\JavaScripts\Module\Weapon\ColdWeapon\ColdWeaponModuleS.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { AiOrPlayer, Camp, ColdWeaponAttackMode, GameGlobals, GamingState, KillType } from "../../../Globals";
import { MGSDataInfo } from "../../../MGSHome";
import { GameConfig } from "../../../Tables/GameConfig";
import { IWeaponElement } from "../../../Tables/Weapon";
import { Tools } from "../../../Tools";
import { BagModuleData } from "../../BagModule/BagData";
import { BagModuleS } from "../../BagModule/BagModuleS";
import { GameModuleData } from "../../GameModule/GameData";
import { GameModuleS } from "../../GameModule/GameModuleS";
import { ColdWeaponModuleC } from "./ColdWeaponModuleC";
import { Projectile } from "../HotWeapon/Bullet";
import { SkillModuleS } from "../../SkillModule/SkillModuleS";
import { SkillBulletParam } from "../../SkillModule/InGameSkill";
import { GeneralManager } from '../../../Modified027Editor/ModifiedStaticAPI';
export class ColdWeaponModuleS extends ModuleS<ColdWeaponModuleC, null>{
    private effectdelay: number = GameConfig.Rule.getElement(10022).Time * 1000;
    private reloadMap: Map<number, number> = new Map<number, number>()
    private rotateTime: number = 0.1
    private countTime: number = 0.1
    private attackAngle = GameConfig.Rule.getElement("20006").Weight;
    private attackRad = GameConfig.Rule.getElement("20008").Weight;
    private attackMaxHeight = GameConfig.Rule.getElement("20010").Weight;
    private attackMinHeight = GameConfig.Rule.getElement("20012").Weight;
    private actionArr = GameConfig.Rule.getElement("60016").GuidList;
    private actionTime = GameConfig.Rule.getElement("60020").Time;
    onStart(): void {
    }

    protected onUpdate(dt: number): void {
    }
    /**
     *  目标确定
     * @param influenceRadius 射线直径
     * @param config 配置
     * @param catagory 攻击者类型
     * @param char 真人
     * @param ai Ai
     * @returns 
     */
    public checkTarget(configId: number, attack: mw.Character | mw.Character) {
        if (GameGlobals.curGameState != GamingState.GamingState) return;
        let targets;
        let tran = attack.worldTransform.clone();
        let targetTrigger = QueryUtil.sphereOverlap(tran.position, this.attackRad, true);
        targets = targetTrigger.filter(value => (PlayerManagerExtesion.isNpc(value) || PlayerManagerExtesion.isCharacter(value)) && value != attack);
        targets.forEach(target => {
            let res: number;
            oTrace("目标类型" + (PlayerManagerExtesion.isNpc(target)))
            let v2ToVec = new Vector2(target.worldTransform.position.x, target.worldTransform.position.y);
            let v2foVec = new Vector2(attack.worldTransform.position.x, attack.worldTransform.position.y);
            let dir = v2ToVec.subtract(v2foVec).normalize();
            let v3Forward = attack.worldTransform.getForwardVector().normalize();
            let v2Forward = new Vector2(v3Forward.x, v3Forward.y);
            let angle = Math.abs(Vector2.angle(v2Forward, dir));
            // oTraceError(`angle 真人 ==== foVec ${foVec}`);
            // oTraceError(`angle 真人 ==== toVec ${toVec}`);
            // oTraceError(`angle 真人 ==== angle ${angle}`);

            if (Math.abs(angle) > this.attackAngle/2) return;
            
            let foZ = this.getHumanRootPosition(attack).z;
            let toZ = this.getHumanRootPosition(target).z;
            let height = foZ - toZ;
            if (height > this.attackMaxHeight || height < this.attackMinHeight) return;
            if (Tools.isAiPlayer(target as mw.Character)) {
                let aiobj = Tools.getAiObj(target as mw.Character);
                if (aiobj == null) return;
                res = ModuleService.getModule(GameModuleS).serverChangeHp(configId, AiOrPlayer.AiPlayer, Camp.Spy, KillType.Knife, null, aiobj);
            }
            else if(PlayerManagerExtesion.isCharacter(target) && GameGlobals.livePlayers.includes(target.player)) {
                res = ModuleService.getModule(GameModuleS).serverChangeHp(configId, AiOrPlayer.RealPlayer, Camp.Spy, KillType.Knife, (target as mw.Character).player);
            }
            else{
                return;
            }
            if (res == 0) {
                MGSDataInfo.kill_player++;
            }
            Tools.playHitSound(1, target);
            if (PlayerManagerExtesion.isCharacter(attack)) {
                this.getClient(attack.player).net_playHitPlayerEffect();
            }

        })
    }

    public getHumanRootPosition(human: mw.Character| mw.Character){
        return human.getSlotWorldPosition(mw.HumanoidSlotType.Root);
    }

    public net_KnifeAttack() {
        // oTrace(`distance ==== 开始小刀攻击`)
        DataCenterS.getData(this.currentPlayer, GameModuleData).addAttackNum(1);
        let player = this.currentPlayer;
        // oTrace("玩家挥刀攻击" + this.currentPlayer.playerId);

        let weaponId = ModuleService.getModule(BagModuleS).getColdWeaponId(player.playerId);
        let config = GameConfig.Weapon.getElement(weaponId);
        this.playRandomAnimation(this.currentPlayer);
        let curColdWeapon = DataCenterS.getData(this.currentPlayer, BagModuleData).getCurColdWeapon();
        let weaponInfo = GameConfig.Weapon.getElement(curColdWeapon);
        setTimeout(() => {
            if (config.ShootEffectGUID) {
                let roc = new mw.Rotation(config.ShootEffectRotate.x, config.ShootEffectRotate.y, config.ShootEffectRotate.z);
                GeneralManager.rpcPlayEffectOnPlayer(weaponInfo.ShootEffectGUID.toString(), player, config.EffectPart, 1, config.ShootEffectOffset,
                    roc, config.ShootEffectScaling);
            }
        }, this.effectdelay);
        setTimeout(() => {
            this.checkTarget(curColdWeapon, player.character);
        }, config.AttackLatency * 1000);
    }
    private playRandomAnimation(player: mw.Player){
        let index = Tools.getRandomInt(0, this.actionArr.length - 1);
        let actionId = this.actionArr[index];
        let anim = PlayerManagerExtesion.loadAnimationExtesion(player.character, actionId);
        let length = anim.length;
        let playRate = length/ this.actionTime;
        anim.slot = AnimSlot.Upper;
        anim.speed = playRate;
        anim.play();
    }

    /**投掷飞刀 */
    public async net_throwColdWeapon(forward: mw.Vector) {
        //换弹计时
        console.error("服务器接受飞刀");
        
        this.addPlayerReload(this.currentPlayer)
        let weapon = ModuleService.getModule(BagModuleS).getColdWeaponObj(this.currentPlayer)
        let vec = forward;
        let dir = vec.clone()
        ModuleService.getModule(BagModuleS).hidePlayerColdWeapon(this.currentPlayer)
        DataCenterS.getData(this.currentPlayer, GameModuleData).addAttackNum(1);
        let loc1 = this.currentPlayer.character.worldTransform.position.clone();
        let loc = loc1.add(mw.Vector.multiply(vec, 80));
        let weaponGuid = ModuleService.getModule(BagModuleS).getColdWeaponId(this.currentPlayerId);
        let skill = ModuleService.getModule(SkillModuleS).getBulletSkill(this.currentPlayerId);
        if (skill) {
            skill.fireBullet({weaponId: weaponGuid, startPos: loc, dir: dir});
        }
        else{
            let bulletObj = new Projectile();
            await bulletObj.coldWeaponChange(weaponGuid, this.currentPlayer, AiOrPlayer.RealPlayer);
            bulletObj.fire(this.currentPlayer, loc, dir);
        }
        mw.SoundService.play3DSound(GameConfig.Assets.getElement(10004).Guid, loc, 1);

    }
    /**换弹计时 */
    private addPlayerReload(player: mw.Player) {
        ModuleService.getModule(BagModuleS).coldWeaponReload(player)
    }
    /**玩家离开时取消换弹 */
    public playerLeaveOnWeapon(player: mw.Player) {
        let timer = this.reloadMap.get(player.playerId)
        if (timer) {
            clearTimeout(timer)
        }
        this.reloadMap.delete(player.playerId)
    }
}