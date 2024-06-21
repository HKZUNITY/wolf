import { SpawnManager,SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameConfig } from "../../../Tables/GameConfig";
import { UiManager } from "../../../UI/UiManager";
import P_Foresight from "../../../UILogic/Game/P_Foresight";
import { SceneItemConfig } from "../../../Tables/SceneItem";
import { AutoAimModuleS } from "./AutoAimModuleS";
import { Tools } from "../../../Tools";
import { Camp, Globals } from "../../../Globals";
import { GameModuleC } from "../../GameModule/GameModuleC";
import ShelterModuleC from "../../shelterModule/ShelterModuleC";
export class AutoAimModuleC extends ModuleC<AutoAimModuleS, null> {
    private curPlayer: mw.Player;
    /**设置一个触发器，往进入触发器的敌人发送射线 */
    private trigger: mw.Trigger
    /**加入对局的玩家 */
    private readyPlayerMap: Map<string, boolean> = new Map<string, boolean>()
    /**加入对局的ai */
    private readyModelMap: Map<string, boolean> = new Map<string, boolean>()
    /**死去玩家 */
    private deadPlayerMap: Map<string, boolean> = new Map<string, boolean>()
    /**死去AI */
    private deathAiModel: Map<string, boolean> = new Map<string, boolean>()
    /**替换当局用户的尸体模型 */
    private deathModelMap: Map<string, boolean> = new Map<string, boolean>()
    private minScale: number = GameConfig.Rule.getElement(40003).Time
    /**索敌范围 */
    private findEnemyScale: number
    /**最远距离 */
    private maxFindDistace: number
    /**瞄准ui */
    private foresightUI: P_Foresight
    /**玩家对应按钮 */
    private shootMap: Map<mw.GameObject, mw.Button> = new Map<mw.GameObject, mw.Button>()
    /**当前瞄准武器类型 */
    private isCold = false
    /**触摸事件 */
    private touch: mw.TouchInput;
    /**点击时间，低于这个才会发射子弹 */
    private shootClickTime: number = 0.1;
    /**计时器 */
    private timer;
    /**是否可以射击 */
    private canClickShoot: boolean = false;
    /**注册委托 */
    private btnClickHandler: Action1<Vector> = new Action1<Vector>();
    /**慢放update */
    private slowUpdate;
    /**当前点击位置 */
    private startClickPos: Vector2;
    /**转动大小 */
    private rotateDis: number = 5;
    private isActive: boolean = false;
    /**隐身的目标map */
    private stealthMap: Map<string, boolean> = new Map<string, boolean>()
    /** */
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    async onStart() {
        await Player.asyncGetLocalPlayer();
        this.touch = new mw.TouchInput();
        this.foresightUI = UiManager.instance.getUIForesight();
        await this.initTrigger();
        this.slowUpdate = TimeUtil.setInterval(()=>{
            this.updateShootUI();
        }, 0.2)
    }
    async startLineTrace(callBack: (a: Vector)=>void){
        this.btnClickHandler.clear();
        this.touch.onTouchBegin.clear();
        this.touch.onTouchEnd.clear();
        if (ModuleService.getModule(GameModuleC).getPlayerCamp() == Camp.Spy) {
            this.btnClickHandler.add(callBack);
        }
        else{
            this.touch.onTouchBegin.add((index, loc, touchType)=>{
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        clearTimeout(this.timer);
                        this.canClickShoot = false;
                        this.timer = null;  
                    }, this.shootClickTime* 1000);

                    
                }
                this.startClickPos = loc.clone();
                this.canClickShoot = true;
            })
            this.touch.onTouchEnd.add((index, loc, touchType)=>{
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                if (!this.canClickShoot) {
                    return;
                }
                let clickDis = Vector2.distance(loc, this.startClickPos);
                if (clickDis > this.rotateDis) {
                    return;
                }
                
                if (!Tools.getPlayerCanShoot(this.localPlayer)) {
                    return;
                }

                let nowSpeed = this.localPlayer.character.velocity;
                if ((Math.abs(nowSpeed.x)+ Math.abs(nowSpeed.y )+ Math.abs(nowSpeed.z)) > 0) {
                    return;
                }
                let v3 = InputUtil.convertScreenLocationToWorldSpace(loc.x, loc.y);
                let forward = v3.worldDirection.normalized;
                let endPosition = v3.worldPosition.clone().add(forward.multiply(3000));
                let hitResult = QueryUtil.lineTrace(v3.worldPosition, endPosition, true, Globals.isShowLineTrace, [], false, false, this.localPlayer.character);
                hitResult = hitResult.filter((value)=>{
                    if (value.gameObject instanceof mw.Trigger) {
                        return false;
                    }
                    return true;
                })
                if (hitResult && hitResult.length > 0) {
                    let res = hitResult[hitResult.length - 1].position;
                    hitResult.forEach((value)=>{
                        if ((PlayerManagerExtesion.isCharacter(value.gameObject) || PlayerManagerExtesion.isNpc(value.gameObject))) {
                            res = value.position;
                        }
                        if (PlayerManagerExtesion.isCharacter(value.gameObject.parent) || PlayerManagerExtesion.isNpc(value.gameObject.parent)) {
                            res = value.position;
                        }
                    })
                    callBack(res.clone());
                }
                else{
                    callBack(endPosition.clone());
                }
    
            })
        }
    }

    public addStealthPlayer(player: mw.Player){
        this.stealthMap.set(player.character.gameObjectId, true);
        this.updataOnePlayerButton(player.character);
    }

    public deleteStealthPlayer(player: mw.Player){
        this.stealthMap.delete(player.character.gameObjectId);
        this.updataOnePlayerButton(player.character);
    }

    endLineTrace(){
        if (!this.touch) {
            return;
        }
        this.touch.onTouchEnd.clear();
        this.touch.onTouchBegin.clear();
    }

    endAutoAnimTrigger(){
        if (!this.trigger) {
            return;
        }
        this.trigger.setSphereRadius(0, true);
        this.trigger.enabled = (false);
    }

    onUpdate(dt: number): void {
        if (!this.isActive) {
            return;   
        }
        this.shootMap.forEach((value, index)=>{
            this.setShootBtnPosition(value, index);

        })
    }

    /**更新一个玩家的瞄准按钮 */
    public updataOnePlayerButton(obj: mw.GameObject){
        if (this.trigger && this.trigger.checkInArea(obj)) {
            console.error("重置准星展示");
            this.clearOneButton(obj.gameObjectId);
            this.onTriggerEnter(obj);
        }
    }

    async onEnterScene(sceneType: number) {
        this.curPlayer = await Player.asyncGetLocalPlayer()
    }

    private async initTrigger(){
        this.trigger = await SpawnManager.wornAsyncSpawn("Trigger") as mw.Trigger;
        this.trigger.enabled = (false);
        this.trigger.shape = mw.TriggerShapeType.Sphere;
        this.trigger.setSphereRadius(0, true);
        this.curPlayer.character.attachToSlot(this.trigger, mw.HumanoidSlotType.Root);
        this.trigger.localTransform.position = new mw.Vector(0, 0, 100);
        this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
        this.trigger.onLeave.add(this.onTriggerLeave.bind(this));

    }
    /**
     * 初始化自动瞄准组件
     * @param findScale 自动瞄准范围
     * @param isCold 是否为冷兵器
     */
    public initAutoModule(findScale: number, isCold: boolean) {
        if (!this.trigger) {
            return;
        }
        this.findEnemyScale = findScale;
        this.maxFindDistace = this.findEnemyScale * 1.5;
        this.trigger.setSphereRadius(this.findEnemyScale, true);
        this.isCold = isCold;
        this.trigger.enabled = (true);
    }



    /**更新射击ui */
    private updateShootUI() {
        let enterMap = ModuleService.getModule(ShelterModuleC).getEnterPlayerMap();
        let guid = this.localPlayer.character.gameObjectId;
        let loc = this.curPlayer.character.worldTransform.position;
        this.shootMap.forEach((value, obj) => {
            let res = QueryUtil.lineTrace(loc, obj.worldTransform.position, true, false, [], false, false, this.localPlayer.character);
            let isShow = false;
            if (!enterMap.has(obj.gameObjectId) && !enterMap.has(guid)) {
                isShow = true;
            }
            else if(enterMap.has(obj.gameObjectId) && enterMap.has(guid)){
                isShow = true;
            }
            
            if (isShow == true) {
                res.every((hit, index) => {
                    if (!hit.blockingHit) {
                        return true;
                    }
                    if (PlayerManagerExtesion.isCharacter(hit.gameObject) || PlayerManagerExtesion.isNpc(hit.gameObject) || hit.gameObject instanceof mw.Trigger) {
                        return true
                    }
                    isShow = false;
                    return false;
                })
            }
            if (isShow == true) {
                value.visibility = mw.SlateVisibility.Visible;
            }
            else {
                value.visibility = mw.SlateVisibility.Collapsed;
            }
        })
    }

    private setShootBtnPosition(button: mw.Button, enemy: mw.GameObject) {
        let distance = mw.Vector.distance(this.curPlayer.character.worldTransform.position, enemy.worldTransform.position)
        let rate = this.minScale + (1 - (distance / this.findEnemyScale)) * (1 - this.minScale)
        this.foresightUI.setShootScale(button, rate)
        let worldPosition = enemy.worldTransform.position
        let screenResult = InputUtil.projectWorldPositionToWidgetPosition(worldPosition)
        let originPos = screenResult.screenPosition.clone()
        if (originPos.x == 0 && originPos.y == 0) {
            originPos = new mw.Vector2(-10000, -10000)
        }
        let buttonScale = button.size
        let res = originPos.add(new mw.Vector2(-buttonScale.x / 2, -buttonScale.y / 2))
        button.position = res

    }

    private triggerActive() {
        this.isActive = true;
        this.foresightUI.show();
    }
    private triggerDisable() {
        this.isActive = false;
        this.foresightUI.hide();
    }
    /**清除所有按钮 */
    private clearButton() {
        this.shootMap.forEach((value, index) => {
            value.visibility = mw.SlateVisibility.Collapsed
            this.foresightUI.addIdleButton(value);
            value.onPressed.clear();
            value.enable = true;
        })
        this.shootMap.clear();
    }
    /**清除一个按钮 */
    private clearOneButton(guid: string) {
        this.shootMap.forEach((value, obj) => {
            if (obj.gameObjectId == guid) {
                let button = this.shootMap.get(obj);
                button.visibility = mw.SlateVisibility.Collapsed;
                button.onPressed.clear();
                this.foresightUI.addIdleButton(button)
                this.shootMap.delete(obj);
                button.enable = true;
            }
        });
    }
    private onTriggerEnter(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) || PlayerManagerExtesion.isNpc(obj)) {
            /**重复的也不录入 */
            if (this.shootMap.get(obj)) {
                return
            }
            /**自己也不能进来 */
            if (obj.gameObjectId == this.curPlayer.character.gameObjectId) {
                return
            }
            /**不是对局玩家 */
            if ((this.isPlayerInMatch(obj.gameObjectId) || this.isAIModelInMatch(obj.gameObjectId)) == false) {
                return
            }
            /**死去ai不录入 */
            if (this.isDeadAi(obj.gameObjectId)) {
                return
            }
            /**死去玩家不录入 */
            if (this.isDeadPlayer(obj.gameObjectId)) {
                return
            }
            /**尸体模型不录入 */
            if (this.isDeadModel(obj.gameObjectId)) {
                return
            }
            /**隐身的玩家不录入 */
            if (this.stealthMap.has(obj.gameObjectId)) {
                return;
            }
            let button = this.foresightUI.getIdleButton();
            
            if (ModuleService.getModule(GameModuleC).getPlayerCamp() == Camp.Spy) {
                button.enable = true;
                button.onPressed.add(() => {
                    let nowSpeed = this.localPlayer.character.velocity;
                    if ((Math.abs(nowSpeed.x)+ Math.abs(nowSpeed.y )+ Math.abs(nowSpeed.z)) > 0) {
                        return;
                    }
                    let dir = obj.worldTransform.position.clone().subtract(this.curPlayer.character.worldTransform.position).normalize();
                    this.btnClickHandler.call(dir);
                })
            }
            else{
                button.enable = false;
            }
            this.shootMap.set(obj, button);
        }
    }

    private onTriggerLeave(obj: mw.GameObject) {
        let id = "0"

        if (PlayerManagerExtesion.isCharacter(obj)) {
            let char = obj as mw.Character
            id = char.gameObjectId
        }
        else if (PlayerManagerExtesion.isNpc(obj)) {
            let human = obj as mw.Character
            id = human.gameObjectId
        }
        this.clearOneButton(id)
    }
    /**游戏开始时清空所有数据 */
    net_initGameData(readyStr: Array<string>, readeyBo: Array<boolean>,
        readyAiSrt: Array<string>, readyAiBo: Array<boolean>) {

        let readyPlayer: Map<string, boolean> = new Map();
        let readAi: Map<string, boolean> = new Map();

        readyPlayer = Tools.decoderArrToMap3(readyStr, readeyBo) as Map<string, boolean>;
        readAi = Tools.decoderArrToMap3(readyAiSrt, readyAiBo) as Map<string, boolean>;

        this.readyModelMap.clear()
        this.readyPlayerMap.clear()
        this.deadPlayerMap.clear()
        this.deathAiModel.clear()
        this.stealthMap.clear();
        this.readyPlayerMap = readyPlayer
        this.readyModelMap = readAi
    }
    /**玩家死亡 */
    net_playerDead(guid: string) {
        this.deadPlayerMap.set(guid, true)
        if (this.curPlayer.character.gameObjectId == guid) {
            this.clearButton()
        }
        else {
            this.clearOneButton(guid)
        }
    }
    /**ai死亡 */
    net_aiGameOver(guid: string) {
        this.deathAiModel.set(guid, true)
        this.clearOneButton(guid)
    }
    /**玩家离开游戏 */
    net_playerLeft(guid: string) {
        this.clearOneButton(guid)
    }
    /**增加尸体模型 */
    net_createDeathModel(guid: string) {
        this.deathModelMap.set(guid, true)
    }
    public startForesight() {
        this.triggerActive()
    }
    public endForesight() {
        this.triggerDisable()
        // this.clearButton()
    }
    /**
     * 判断当前id是否为死亡后的ai
     * @param guid 物品id
     */
    private isDeadAi(guid: string) {
        return this.deathAiModel.has(guid)
    }
    /**
     * 判断当前id是否为死亡后的玩家
     * @param guid 
     * @returns 
     */
    private isDeadPlayer(guid: string) {
        return this.deadPlayerMap.has(guid)
    }
    /**
     * 判断当前id是否为尸体模型
     * @param guid 
     * @returns 
     */
    private isDeadModel(guid: string) {
        return this.deathModelMap.has(guid)
    }
    /**判断当前id是否为对局玩家 */
    private isPlayerInMatch(guid: string) {
        return this.readyPlayerMap.has(guid)
    }
    /**判断当前id是否为对局ai */
    private isAIModelInMatch(guid: string) {
        return this.readyModelMap.has(guid)
    }
}