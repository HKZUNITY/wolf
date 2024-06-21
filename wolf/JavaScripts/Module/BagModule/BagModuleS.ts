import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-02 15:56:34
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-14 17:31:42
 * @FilePath     : \murdermystery3\JavaScripts\Module\BagModule\BagModuleS.ts
 * @Description  : 修改描述
 */
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { AiState } from "../../AI/AiStateMachine";
import { GameGlobals, Globals, PlayerGameState, PlayerWeaponState } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { IWeaponElement } from "../../Tables/Weapon";
import { GameModuleData } from "../GameModule/GameData";
import { BagModuleData } from "./BagData";
import { BagModuleC } from "./BagModuleC";
import { HotWeaponModuleS } from "../Weapon/HotWeapon/HotWeaponModuleS";
import { GameCache } from "../../GameCache";
import { Tools } from "../../Tools";
import { GameModuleS } from "../GameModule/GameModuleS";

export class BagModuleS extends ModuleS<BagModuleC, BagModuleData>{
    public hotWeaponMap: Map<number, mw.GameObject> = new Map();
    public coldWeaponMap: Map<number, mw.GameObject> = new Map();

    // public hotWeaponEff: Map<number, number> = new Map<number, number>();
    // public coldWeaponEff: Map<number, number> = new Map<number, number>();

    public hotWeaponTypeMap: Map<number, number> = new Map();
    public coldWeaponTypeMap: Map<number, number> = new Map();

    //使用武器    玩家ID 配置
    public useCold: Map<number, IWeaponElement> = new Map();
    //开启自动    玩家ID  是否第一次
    public openCold: Map<number, boolean> = new Map();
    // private frame: number = 0;
    private distance: number = GameConfig.Rule.getElement(20008).Weight;
    /**冷兵器换弹计时器map */
    private playerReloadTimerMap: Map<number, number> = new Map<number, number>()
    /**冷兵器换弹动画map*/
    private playerReloadAnimMap: Map<number, number> = new Map<number, number>()
    /**冷兵器换弹动画map */
    private playerReloadAnimObjMap: Map<number, mw.Animation> = new Map<number, mw.Animation>()
    /**热兵器换弹动画map */
    private playerHotReloadAnimMap: Map<number, number> = new Map<number, number>()
    /**热兵器换单动画物体map */
    private playerHotReloadAnimObjMap: Map<number, mw.Animation> = new Map<number, mw.Animation>()
    /** 热武器姿态 */
    private playerHotStance: Map<number, mw.SubStance> = new Map();
    /** 冷兵器姿态 */
    private playerColdStance: Map<number, mw.SubStance> = new Map();

    onUpdate(dt: number) {

        this.useCold.forEach((config, playerId) => {
            let player = Player.getPlayer(playerId);
            let bo = this.isNearby(player, this.distance)
            // oTrace(`distance ==== 开始循环遍历 : ${playerId} 是否距离内 : ${bo} 距离判定 :${config.Distance}`);
            if (bo) {
                this.controlUseCold(player, true);
            } else {
                this.controlUseCold(player, false);
            }
        })

        // this.frame += dt;
        // if (this.frame > 0.2) {
        //     this.frame = 0;
        // oTraceError(`distance ==== 开始距离判定 `)
        // }

    }

    clearAuto() {
        this.useCold.forEach((config, playerId) => {
            let player = Player.getPlayer(playerId);
            this.getClient(player).net_contorlCold(false);
        });
        this.useCold.clear();
        this.openCold.clear();
    }

    /**
     * 范围判定
     * @param curPlayer 判定玩家 
     * @param distance 距离
     * @returns 
     */
    isNearby(curPlayer: mw.Player, distance: number): boolean {
        let bo: boolean = false;
        GameGlobals.aiPlayer.forEach((ai) => {
            if (ai.curAIState == AiState.NotActive) return;
            let dis = mw.Vector.distance(ai.aiModel.worldTransform.position, curPlayer.character.worldTransform.position);
            // oTrace(`distance ==== 距离 ai :: ${dis}`);
            if (dis < distance) {
                bo = true;
            }
        })
        GameGlobals.livePlayers.forEach((player) => {
            if (player.playerId != curPlayer.playerId) {
                let pos = player.character.worldTransform.position;
                if (pos) {
                    let dis = mw.Vector.distance(player.character.worldTransform.position, curPlayer.character.worldTransform.position);
                    // oTrace(`distance ==== 距离 玩家 :: ${dis}`);
                    if (dis < distance) {
                        bo = true;
                    }
                }
            }
        })
        return bo;
    }

    /**
     * 冷兵器自动攻击控制
     * @param player 玩家
     * @param bo 开关
     */
    controlUseCold(player: mw.Player, bo: boolean): void {
        // oTrace(`distance ==== 控制自动使用冷兵器 ::${bo}`)
        let playerId = player.playerId;
        if (bo) {
            if (this.openCold.has(playerId)) {
                if (!this.openCold.get(playerId)) {
                    this.getClient(player).net_contorlCold(true, this.useCold.get(playerId).CD);
                    this.openCold.set(playerId, true);
                }
            }
            else{
                this.getClient(player).net_contorlCold(true, this.useCold.get(playerId).CD);
                this.openCold.set(playerId, true);
            }
        } 
        else {
            if (this.openCold.has(playerId)) {
                if (this.openCold.get(playerId)) {
                    this.getClient(player).net_contorlCold(false);
                    this.openCold.set(playerId, false);
                }
            }
            else{
                    this.getClient(player).net_contorlCold(false);
                    this.openCold.set(playerId, false);
            }

        }
    }

    /**
     * 装备热武器
     */
    public equipHotWeapon(player: mw.Player, weaponId: number) {

        let objInfo = GameConfig.Weapon.getElement(weaponId);
        SpawnManager.asyncSpawn({guid: objInfo.ModleGUID.toString()}).then((obj) => {
            obj.setCollision(mw.PropertyStatus.Off, true);
            player.character.attachToSlot(obj, objInfo.RabbetPart);
            obj.localTransform.position = (objInfo.WeaponPosition);
            obj.localTransform.rotation = (new mw.Rotation(objInfo.WeaponRotation));
            obj.worldTransform.scale = objInfo.WeaponScale;

            if (this.hotWeaponMap.get(player.playerId) != undefined) {
                // if (this.hotWeaponEff.has(player.playerId)) {
                //     EffectService.stop(this.hotWeaponEff.get(player.playerId));
                //     this.hotWeaponEff.delete(player.playerId);
                // }
                this.hotWeaponMap.get(player.playerId).destroy();
                this.hotWeaponTypeMap.delete(player.playerId);
            }

            // if (objInfo.WeaponEffects) {
            //     let id = GeneralManager.rpcPlayEffectOnGameObject(String(objInfo.WeaponEffects), obj, 0, objInfo.EffectsOffset, objInfo.EffectsRotation.toRotation(), objInfo.EffectsScale);
            //     this.hotWeaponEff.set(player.playerId, id);
            // }

            this.hotWeaponMap.set(player.playerId, obj);
            this.hotWeaponTypeMap.set(player.playerId, weaponId);

            let dataInfo = this.getPlayerData(player)
            dataInfo.setCurHotWeapon(weaponId);
            dataInfo.save(true);
            this.getClient(player).net_setHotWeaponObj(obj.gameObjectId);
        })
    }
    /**
     * 装备冷兵器   
    */
    public equipColdWeapon(player: mw.Player, weaponId: number) {
        let objInfo = GameConfig.Weapon.getElement(weaponId);
        SpawnManager.asyncSpawn({guid: objInfo.ModleGUID.toString()}).then((obj) => {
            obj.setCollision(mw.PropertyStatus.Off, true);
            player.character.attachToSlot(obj, objInfo.RabbetPart);
            obj.localTransform.position = (objInfo.WeaponPosition);
            obj.localTransform.rotation = (new mw.Rotation(objInfo.WeaponRotation));
            obj.worldTransform.scale = objInfo.WeaponScale;

            if (this.coldWeaponMap.get(player.playerId) != undefined) {
                // if (this.coldWeaponEff.has(player.playerId)) {
                //     EffectService.stop(this.coldWeaponEff.get(player.playerId));
                //     this.coldWeaponEff.delete(player.playerId);
                // }
                this.coldWeaponMap.get(player.playerId).destroy();
                this.coldWeaponTypeMap.delete(player.playerId);
            }

            // if (objInfo.WeaponEffects) {
            //     let id = GeneralManager.rpcPlayEffectOnGameObject(String(objInfo.WeaponEffects), obj, 0, objInfo.EffectsOffset, objInfo.EffectsRotation.toRotation(), objInfo.EffectsScale);
            //     this.coldWeaponEff.set(player.playerId, id);
            // }
            this.coldWeaponMap.set(player.playerId, obj);
            this.coldWeaponTypeMap.set(player.playerId, weaponId);

            let dataInfo = this.getPlayerData(player)
            dataInfo.setCurColdWeapon(weaponId);
            dataInfo.save(true);
        })
    }
    /**
     * 使用热武器
     * @param player 
     */
    public useHotWeapon(player: mw.Player) {
        let weapon = this.hotWeaponMap.get(player.playerId);
        let hotid = DataCenterS.getData(player, BagModuleData).getCurHotWeapon();
        let objInfo = GameConfig.Weapon.getElement(hotid);
        player.character.attachToSlot(weapon, mw.HumanoidSlotType.RightHand);
        let stance = PlayerManagerExtesion.loadStanceExtesion(player.character, objInfo.HoldPosture.toString());
        if (stance) {
            stance.play();
            this.playerHotStance.set(player.playerId, stance);
        }
        weapon.localTransform.position = (objInfo.HoldOffset);
        weapon.localTransform.rotation = (new mw.Rotation(objInfo.HoldRotation));
        weapon.worldTransform.scale = objInfo.HoldScale;
    }
    /**
     * 不使用热武器
     * @param player 
     */
    public notUseHotWeapon(player: mw.Player) {
        this.cancelHotWeaponReload(player)
        if (this.playerHotStance.has(player.playerId)) {
            this.playerHotStance.get(player.playerId).stop();
            this.playerHotStance.delete(player.playerId);
        }
        let weapon = this.hotWeaponMap.get(player.playerId);
        if (!weapon) {
            return;
        }
        let hotid = DataCenterS.getData(player, BagModuleData).getCurHotWeapon();
        let objInfo = GameConfig.Weapon.getElement(hotid);
        player.character.attachToSlot(weapon, objInfo.RabbetPart);
        weapon.localTransform.position = (objInfo.WeaponPosition);
        weapon.localTransform.rotation = (new mw.Rotation(objInfo.WeaponRotation));
        weapon.worldTransform.scale = objInfo.WeaponScale;
    }
    private hotReloadTime = GameConfig.Rule.getElement(40008).Time;
    /**
     * 热武器换弹
     * @param player 
     */
    public hotWeaponReload(player: mw.Player) {
        let playerId = player.playerId
        let weaponId = this.getHotWeaponId(playerId)
        let dataInfo = GameConfig.Weapon.getElement(weaponId)
        let animObj = PlayerManagerExtesion.loadAnimationExtesion(player.character, dataInfo.BufferActionGUID.toString())
        animObj.speed = animObj.length/ this.hotReloadTime;
        animObj.slot = AnimSlot.Upper;
        animObj.play();
        this.playerHotReloadAnimObjMap.set(playerId, animObj)
        // this.playerHotReloadAnimMap.set(playerId, timer)
    }
    /**
     * 使用冷兵器
     * @param player 
     */
    public useColdWeapon(player: mw.Player) {
        this.cancelColdWeaponReload(player);
        let weapon = this.coldWeaponMap.get(player.playerId);
        let coldid = DataCenterS.getData(player, BagModuleData).getCurColdWeapon();
        let objInfo = GameConfig.Weapon.getElement(coldid);
        // PlayerManagerExtesion.rpcPlayAnimation(player.character, objInfo.BufferActionGUID.toString(), 1, objInfo.BufferRate);
        player.character.attachToSlot(weapon, mw.HumanoidSlotType.RightHand);
        // PlayerManagerExtesion.changeStanceExtesion(player.character,objInfo.HoldPosture.toString());
        console.error(`装武器姿态 ==== ${objInfo.HoldPosture.toString()}`);
        let stance = PlayerManagerExtesion.loadStanceExtesion(player.character, objInfo.HoldPosture.toString());
        if (stance) {
            stance.play();
            this.playerColdStance.set(player.playerId, stance);  
        }
        

        weapon.localTransform.position = (objInfo.HoldOffset);
        weapon.localTransform.rotation = (new mw.Rotation(objInfo.HoldRotation));
        weapon.worldTransform.scale = objInfo.HoldScale;
        this.useCold.set(player.playerId, objInfo);
        
        // oTraceError(`distance ==== 装备武器  ${player.playerId}`)
    }
    /**
     * 切换投掷冷兵器
     * @param player 
     */
    public throwColdWeapon(player: mw.Player) {
        let weapon = this.coldWeaponMap.get(player.playerId);
        let coldid = DataCenterS.getData(player, BagModuleData).getCurColdWeapon();
        let objInfo = GameConfig.Weapon.getElement(coldid);
        player.character.attachToSlot(weapon, mw.HumanoidSlotType.RightHand);
        weapon.localTransform.position = (objInfo.HoldOffset);
        weapon.localTransform.rotation = (new mw.Rotation(objInfo.HoldRotation));
        weapon.worldTransform.scale = objInfo.HoldScale;
        this.useCold.set(player.playerId, objInfo);
        /**准备投掷飞刀动作 */
        let holdKnifeAction = GameConfig.Weapon.getElement(GameGlobals.throwKnifeDataId).HoldPosture.toString()
        // PlayerManagerExtesion.changeStanceExtesion(player.character,holdKnifeAction);
        let stance = PlayerManagerExtesion.loadStanceExtesion(player.character, holdKnifeAction);
        if (stance) {
            stance.play();
        }
    }
    /**
     * 不使用冷兵器
     * @param player 
     */
    public notUseColdWeapon(player: mw.Player) {
        this.cancelColdWeaponReload(player)
        this.notUseColdWeaponData(player)
        // oTraceError(`distance ==== 卸下武器  ${player.playerId}`)

    }
    private notUseColdWeaponData(player: mw.Player) {
        if (this.playerColdStance.has(player.playerId)) {
            this.playerColdStance.get(player.playerId)?.stop();
            this.playerColdStance.delete(player.playerId);
        }
        let weapon = this.coldWeaponMap.get(player.playerId);
        this.useCold.delete(player.playerId);
        if (!weapon) {
            return;
        }
        let coldid = DataCenterS.getData(player, BagModuleData).getCurColdWeapon();
        let objInfo = GameConfig.Weapon.getElement(coldid);
        player.character.attachToSlot(weapon, objInfo.RabbetPart);
        weapon.localTransform.position = (objInfo.WeaponPosition);
        weapon.localTransform.rotation = (new mw.Rotation(objInfo.WeaponRotation));
        weapon.worldTransform.scale = objInfo.WeaponScale;

    }
    /**冷兵器换弹动作 */
    public coldWeaponReload(player: mw.Player) {
        this.notUseColdWeaponData(player)
        let reloadAction = GameConfig.Weapon.getElement(GameGlobals.throwKnifeDataId).BufferActionGUID.toString()
        let reloadRate = GameConfig.Weapon.getElement(GameGlobals.throwKnifeDataId).BufferRate
        let animObj = PlayerManagerExtesion.loadAnimationExtesion(player.character, reloadAction)
        animObj.speed = reloadRate;
        animObj.slot = AnimSlot.Upper;
        let animTime = setTimeout(() => {
            this.throwColdWeapon(player)
        }, (animObj.length / animObj.speed) * 1000);
        animObj.play()
        this.playerReloadAnimObjMap.set(player.playerId, animObj)
        let reloadTimer = setTimeout(() => {
            let weapon = this.getColdWeaponObj(player)
            let objInfo = GameConfig.Weapon.getElement(this.getColdWeaponId(player.playerId))
            player.character.attachToSlot(weapon, mw.HumanoidSlotType.RightHand);
            weapon.localTransform.position = (objInfo.HoldOffset);
            weapon.localTransform.rotation = (new mw.Rotation(objInfo.HoldRotation));
            weapon.worldTransform.scale = objInfo.HoldScale;
            this.useCold.set(player.playerId, objInfo);
        }, 200);
        this.playerReloadAnimMap.set(player.playerId, animTime)
        this.playerReloadTimerMap.set(player.playerId, reloadTimer)
    }
    /**取消冷兵器换弹动画 */
    public cancelColdWeaponReload(player: mw.Player) {
        let playerId = player.playerId;
        if(!this.playerReloadAnimObjMap.get(playerId)){
            return;
        }
        let reloadTimer = this.playerReloadTimerMap.get(playerId)
        clearTimeout(reloadTimer)
        let temp = this.playerReloadAnimMap.get(playerId)
        clearTimeout(temp)
        if (this.playerReloadAnimObjMap.has(playerId)) {
            let animObj = this.playerReloadAnimObjMap.get(playerId)
            animObj.stop()
        }
        this.playerReloadTimerMap.delete(playerId)
        this.playerReloadAnimMap.delete(playerId)
        this.playerReloadAnimObjMap.delete(playerId)
    }
    /**取消热兵器换弹动画 */
    public cancelHotWeaponReload(player: mw.Player) {
        let playerId = player.playerId
        PlayerManagerExtesion.stopStanceExtesion(player.character, );
        if (this.playerHotReloadAnimObjMap.has(playerId)) {
            let animObj = this.playerHotReloadAnimObjMap.get(playerId)
            animObj.stop()
            this.playerHotReloadAnimObjMap.delete(playerId)
        }
    }

    public notUseBothWeapon(player: mw.Player) {
        this.notUseColdWeapon(player);
        this.notUseHotWeapon(player);
        ModuleService.getModule(GameModuleS).changeWeaponState(player, PlayerWeaponState.UnEquip);
    }

    public hideAutoModule(player: mw.Player) {
        this.notUseBothWeapon(player)
        this.getClient(player).net_hideAutoModule()
    }

    public playerLeaveOnWeapon(player: mw.Player) {

        if (this.useCold.has(player.playerId)) {
            this.useCold.delete(player.playerId);
        }
        if (this.openCold.has(player.playerId)) {
            this.openCold.delete(player.playerId);
        }

        let hotWeapon = this.hotWeaponMap.get(player.playerId);
        let coldWeapon = this.coldWeaponMap.get(player.playerId);
        if (hotWeapon != undefined) {
            hotWeapon.destroy();
            this.hotWeaponMap.delete(player.playerId);
        }
        if (coldWeapon != undefined) {
            coldWeapon.destroy();
            this.coldWeaponMap.delete(player.playerId);
        }
        // if (this.hotWeaponEff.has(player.playerId)) {
        //     EffectService.stop(this.hotWeaponEff.get(player.playerId));
        //     this.hotWeaponEff.delete(player.playerId);
        // }
        // if (this.coldWeaponEff.has(player.playerId)) {
        //     EffectService.stop(this.coldWeaponEff.get(player.playerId));
        //     this.coldWeaponEff.delete(player.playerId);
        // }

    }

    public getHotWeaponObj(player: mw.Player) {
        let obj = this.hotWeaponMap.get(player.playerId);
        return obj;
    }

    public getColdWeaponObj(player: mw.Player) {
        let obj = this.coldWeaponMap.get(player.playerId)
        return obj
    }

    public hidePlayerColdWeapon(player: mw.Player) {
        let obj = this.coldWeaponMap.get(player.playerId)
        obj.setVisibility(mw.PropertyStatus.Off)
    }

    public showPlayerColdWeapon(player: mw.Player) {
        let obj = this.coldWeaponMap.get(player.playerId)
        obj.setVisibility(mw.PropertyStatus.On)
    }

    public net_showPlayerColdWeapon() {
        this.showPlayerColdWeapon(this.currentPlayer)
    }

    /**
     * 获取当前角色热色武器ID
     * @param playerId 玩家ID
     * @returns 
     */
    getHotWeaponId(playerId: number): number {
        if (this.hotWeaponTypeMap.has(playerId)) {
            return this.hotWeaponTypeMap.get(playerId);
        }
        return null;
    }
    /**
     * 获取当前角色冷兵器ID
     * @param playerId 玩家ID
     * @returns 
     */
    getColdWeaponId(playerId: number): number {
        if (this.coldWeaponTypeMap.has(playerId)) {
            return this.coldWeaponTypeMap.get(playerId);
        }
        return null;
    }

}