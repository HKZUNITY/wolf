/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-31 10:49:37
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-23 13:54:38
 * @FilePath     : \murdermystery3\JavaScripts\Module\SkillModule\InGameSkill.ts
 * @Description  : 修改描述
 */
import { AiOrPlayer, Camp, GameGlobals, GamingState, PlayerWeaponState } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { BagModuleS } from "../BagModule/BagModuleS";
import { GameModuleS } from "../GameModule/GameModuleS";
import { ActiveSkillBase } from "./ActiveSkillBase";
import AttributeManager, { AttributeType } from "../SVipModule/AttributeManager";
import { BaseBullet } from "./BaseBullet";
import BoomKnife from "./BoomKnife";
import SkillManager from "./SkillManager";
import { SkillModuleS } from "./SkillModuleS";

export default class InGameSkill {
    public skillShopId: number;
    public skillId: number;
    private buffArray: Array<SkillBuff>;
    private playerId: number;
    private duration: number;
    private cd: number;
    private canUse: boolean = true;
    private timer;
    private state: SkillState = SkillState.UnActive;
    private skill: ActiveSkillBase;

    constructor(playerId: number, skillShopId: number){
        this.playerId = playerId;
        this.skillShopId = skillShopId;
        this.skillId = GameConfig.SkillShop.getElement(skillShopId).SkillID;
        let dataInfo = GameConfig.Skill.getElement(this.skillId);
        this.buffArray = new Array<SkillBuff>();
        if (dataInfo.Buff) {
            dataInfo.Buff.forEach((value, index)=>{
                let buff = new SkillBuff(this.playerId, value);
                this.buffArray.push(buff);
            })
        }
        if (dataInfo.Type == ReleaseType.Active) {
            this.skill = SkillManager.instance.getSkillByType(dataInfo.SkillType);
            this.state = SkillState.Active;
        }
        this.duration = dataInfo.Duration | 0;
        this.cd = dataInfo.CD | 0;
    }

    public async fireBullet(bulletParam: SkillBulletParam){
        let dataInfo = GameConfig.Skill.getElement(this.skillId);
        if (this.canUse && dataInfo.SkillType != null) {
            let bullet: BaseBullet
            if (dataInfo.SkillType == SkillType.Boom) {
                bullet = new BoomKnife();
            }
            let player = Player.getPlayer(this.playerId);
            await bullet.weaponChange(bulletParam.weaponId, player, AiOrPlayer.RealPlayer);
            bullet.fire(player, bulletParam.startPos, bulletParam.dir, this.skillId);
        }
    }
    /**技能激活,主动限定 */
    public activeSkill(){
        let dataInfo = GameConfig.Skill.getElement(this.skillId);
        if (dataInfo.Type != ReleaseType.Active) {
            return false;
        }
        if (this.state != SkillState.Active || GameGlobals.curGameState != GamingState.GamingState) {
            return false;
        }
        this.state = SkillState.Using;
        this.skill.active(this.playerId, this.skillId);
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            this.disableSkill();
            this.timer = null;
        }, this.duration* 1000);
    }

    private disableSkill(){
        this.state = SkillState.CD;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.skill.unActive(this.playerId, this.skillId);
        this.timer = setTimeout(() => {
            this.state = SkillState.Active;
            this.timer = null;
        }, this.cd* 1000);
    }
    /**强制更改技能状态，目前提供的逻辑，技能由使用状态->冷却状态 */
    public setSkillState(state: SkillState){
        if (this.state == SkillState.Using && state == SkillState.CD) {
            this.disableSkill();
        }   
    }

    public killOtherUpdate(){
        let dataInfo = GameConfig.Skill.getElement(this.skillId);
        if (dataInfo.Type != ReleaseType.Active) {
            return;
        }
        this.skill.killOtherUpdate(this.playerId, this.skillId);
    }

    public updateBuff(){
        this.buffArray.forEach((value)=>{
            value.updateBuffEffect();
        })
    }

    
    public skillDestroy(){
        this.buffArray.forEach((value)=>{
            value.buffDisappear();
        })

        if (this.state == SkillState.Using) {
            this.disableSkill();
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}

export class SkillBuff{
    private buffId: number;
    private condition: number;
    private buffType: number;
    private playerId: number;
    private param: number;
    private isActive: boolean = null;
    constructor(playerId: number, buffId: number){
        this.buffId = buffId;
        let dataInfo = GameConfig.Buff.getElement(buffId);
        this.condition = dataInfo["Condition"];
        this.buffType = dataInfo.Type;
        this.playerId = playerId;
        this.param = dataInfo.Param1;
    }
    updateBuffEffect(){
        this.buffDisappear();
        let res = false;
        if (this.condition == BuffCondition.Spy) {
            let camp = ModuleService.getModule(GameModuleS).getPlayerCamp(this.playerId);
            res = camp == Camp.Spy;
        }
        else if(this.condition == BuffCondition.UseKnife){
            let state = ModuleService.getModule(GameModuleS).getPlayerWeaponState(this.playerId);
            res = state == PlayerWeaponState.Knife || state == PlayerWeaponState.ThrowKnife;
        }
        else if(this.condition == BuffCondition.FlyKnife){
            let state = ModuleService.getModule(GameModuleS).getPlayerWeaponState(this.playerId);
            res = state == PlayerWeaponState.ThrowKnife;
        }
        if (res) {
            this.buffActive();
        }
        if (this.isActive == null || this.isActive != res) {
            ModuleService.getModule(SkillModuleS).updateClientSkillActive(this.playerId, res);
        }
        this.isActive = res;
    }

    buffActive(){
        if (this.buffType == BuffType.NoBuff) {
            return;
        }
        else if (this.buffType == BuffType.WalkSpeedUp) {
            let player = Player.getPlayer(this.playerId);
            player.character.maxWalkSpeed = GameConfig.Rule.getElement(10016).Num* this.param;
        }
        else if(this.buffType == BuffType.ThrowKnifeSpeedUp){
            let speed = GameConfig.Rule.getElement(20002).Num* this.param;
            AttributeManager.instance.setAttributeValue(this.playerId, AttributeType.FlyKnifeSpeed, speed);
        }
    }
    buffDisappear(){
        if (this.buffType == BuffType.NoBuff) {
            return;
        }
        else if (this.buffType == BuffType.WalkSpeedUp) {
            let player = Player.getPlayer(this.playerId);
            player.character.maxWalkSpeed = GameConfig.Rule.getElement(10016).Num;
        }
        else if(this.buffType == BuffType.ThrowKnifeSpeedUp){
            let speed = GameConfig.Rule.getElement(20002).Num;
            AttributeManager.instance.setAttributeValue(this.playerId, AttributeType.FlyKnifeSpeed, speed);
        }
    }
}

export enum SkillState{
    /**技能未激活 */
    UnActive = 0,
    /**技能激活 */
    Active = 1,
    /**技能冷却中 */
    CD = 2,
    /**技能使用中 */
    Using = 3,
}

enum BuffCondition{
    Spy,
    UseKnife,
    FlyKnife,
}

enum BuffType{
    NoBuff = -1,
    WalkSpeedUp = 0,
    ThrowKnifeSpeedUp = 1,
}
/**技能的类型 */
export enum SkillType{
    /**爆炸刀 */
    Boom = 1,
    /**隐身 */
    Stealth = 100,
}
/**主动技能还是被动的 */
enum ReleaseType{
    Passive = 0,
    Active = 1,
}

export class SkillBulletParam{
    public startPos: Vector;
    public dir: Vector;
    public weaponId: number;
    constructor(weaponId: number, startPos: Vector, dir: Vector){
        this.weaponId = weaponId;
        this.startPos = startPos;
        this.dir = dir;
    }
}