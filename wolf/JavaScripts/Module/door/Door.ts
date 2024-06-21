import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { DoorModuleS } from "./DoorModuleS";
import { GameConfig } from "../../Tables/GameConfig";
import { IDoorElement } from "../../Tables/Door";

export enum DoorState {
    /**开启 */
    Open,
    /**关闭 */
    Close,
    /**运行 */
    Move
}

export class Door {
    private id: number;
    private index: number;

    private config: IDoorElement;
    /**外部触发器 */
    private outTrigger: mw.Trigger;
    /**内部触发器 */
    private inTrigger: mw.Trigger;
    /**关门触发器 */
    private closeTrigger: mw.Trigger;
    private doorL: mw.GameObject;//减去
    private doorR: mw.GameObject;//加上
    /**左门起始 */
    private locStartL: mw.Vector;
    /**左门终止 */
    private locEndL: mw.Vector;
    /**右门起始 */
    private locStartR: mw.Vector;
    /**右门终止  */
    private locEndR: mw.Vector;
    /**锁与对应的玩家 */
    public guidPlayeridMap: Map<string, number> = new Map<string, number>();
    /**关门玩家数组 */
    private closePlayers: Array<number> = new Array<number>();
    /**门状态 */
    public doorState: DoorState;
    private openDoor: mw.Tween<{ loc1: { L: mw.Vector; R: mw.Vector; }; }>;
    private closeDoor: mw.Tween<{ loc2: { L: mw.Vector; R: mw.Vector; }; }>;

    constructor(id: number, index: number) {
        this.id = id;
        this.index = index;
        this.config = GameConfig.Door.getElement(this.id);
        this.creat();
    }
    creat() {
        this.doorL = GameObject.findGameObjectById(this.config.leftDoorGuid);
        this.doorR = GameObject.findGameObjectById(this.config.rightDoorGuid);
        this.outTrigger = GameObject.findGameObjectById(this.config.outTriggerGuid) as mw.Trigger;
        this.inTrigger = GameObject.findGameObjectById(this.config.inTriggerGuid) as mw.Trigger;
        this.closeTrigger = GameObject.findGameObjectById(this.config.doorTriggerGuid) as mw.Trigger;


        if (!this.doorL || !this.doorR || !this.outTrigger || !this.inTrigger) {
            console.error('str=获取逃生门失败');
        }
        this.locStartL = this.config.leftStartLoc;
        this.locStartR = this.config.rightStartLoc;
        this.locEndL = this.config.leftEndLoc;
        this.locEndR = this.config.rightEndLoc;

        this.outTrigger.onEnter.add(this.enter.bind(this, this.outTrigger.gameObjectId))
        this.outTrigger.onLeave.add(this.leave.bind(this, this.outTrigger.gameObjectId))
        this.inTrigger.onEnter.add(this.enter.bind(this, this.inTrigger.gameObjectId))
        this.inTrigger.onLeave.add(this.leave.bind(this, this.inTrigger.gameObjectId))
        this.closeTrigger.onEnter.add(this.closeEnter.bind(this))
        this.closeTrigger.onLeave.add(this.closeLeave.bind(this))
        this.reset();
    }

    reset() {
        if (this.closeDoor) {
            this.closeDoor = null;
        }
        if (this.openDoor) {
            this.openDoor = null;
        }
        this.doorL.worldTransform.position = this.locStartL;//初始化位置
        this.doorR.worldTransform.position = this.locStartR;//初始化位置
        this.guidPlayeridMap.clear();
        this.closePlayers.length = 0;
        this.changeState(DoorState.Close);
    }

    private enter(triggerGuid: string, obj: mw.Character) {
        if (this.doorState != DoorState.Close) return;
        if (PlayerManagerExtesion.isCharacter(obj)) {
            let playerId = obj.player.playerId;
            if (this.guidPlayeridMap.has(triggerGuid)) return;
            this.guidPlayeridMap.set(triggerGuid, playerId);
            ModuleService.getModule(DoorModuleS).toShowUI(playerId, this.index);
        }
    }

    private leave(triggerGuid: string, obj: mw.Character) {
        if (this.doorState != DoorState.Close) return;
        if (PlayerManagerExtesion.isCharacter(obj)) {
            let playerId = obj.player.playerId;
            let value = this.guidPlayeridMap.get(triggerGuid);
            if (!value || value != playerId) return;
            this.guidPlayeridMap.delete(triggerGuid);
            ModuleService.getModule(DoorModuleS).toHideUI(playerId);
        }
    }

    closeEnter(obj: mw.Character) {
        if (this.doorState != DoorState.Open) return;
        if (PlayerManagerExtesion.isCharacter(obj)) {
            let playerId = obj.player.playerId;
            if (this.closePlayers.includes(playerId)) return;
            this.closePlayers.push(playerId);
            ModuleService.getModule(DoorModuleS).toShowBtnUI(playerId, this.index);
        }
    }


    closeLeave(obj: mw.Character) {
        if (this.doorState != DoorState.Open) return;
        if (PlayerManagerExtesion.isCharacter(obj)) {
            let playerId = obj.player.playerId;
            if (!this.closePlayers.includes(playerId)) return;
            this.closePlayers = this.closePlayers.filter(item => item != playerId);
            ModuleService.getModule(DoorModuleS).toHideBtnUI(playerId);
        }

    }

    playerLeave(playerId: number) {
        this.guidPlayeridMap.forEach((value: number, key: string) => {
            if (value == playerId) {
                this.guidPlayeridMap.delete(key);
            }
        })
        if (this.closePlayers.includes(playerId)) {
            this.closePlayers = this.closePlayers.filter(item => item != playerId);
        }
    }


    update() {
        if (this.openDoor) {
            this.openDoor.update();
        }
        if (this.closeDoor) {
            this.closeDoor.update();
        }
    }

    /**开门动画效果 */
    public openAnimation() {
        this.clearOpenMap();
        if (this.doorState != DoorState.Close) return;
        this.changeState(DoorState.Move);
        let sl1 = new mw.Vector(this.locStartL.x, this.locStartL.y, this.locStartL.z);
        let sr1 = new mw.Vector(this.locStartR.x, this.locStartR.y, this.locStartR.z);
        let el1 = new mw.Vector(this.locEndL.x, this.locEndL.y, this.locEndL.z);
        let er1 = new mw.Vector(this.locEndR.x, this.locEndR.y, this.locEndR.z);
        let startData = { loc1: { L: sl1, R: sr1 } };
        this.openDoor = new mw.Tween(startData);
        this.openDoor
            .delay(100)
            .to({ loc1: { L: el1, R: er1 } }, 1500)
            .easing(TweenUtil.Easing.Sinusoidal.InOut)
            .onUpdate((v) => {
                this.doorL.worldTransform.position = new mw.Vector(v.loc1.L.x, v.loc1.L.y, v.loc1.L.z);
                this.doorR.worldTransform.position = new mw.Vector(v.loc1.R.x, v.loc1.R.y, v.loc1.R.z);
            })
            .onComplete(() => {
                this.openDoor = null;
                this.changeState(DoorState.Open);
            })
            .start();
    }




    /**关门动画效果 */
    public endAnimation() {
        this.clearCloseArr();
        if (this.doorState != DoorState.Open) return;
        this.changeState(DoorState.Move);
        let sl2 = new mw.Vector(this.locStartL.x, this.locStartL.y, this.locStartL.z);
        let sr2 = new mw.Vector(this.locStartR.x, this.locStartR.y, this.locStartR.z);
        let el2 = new mw.Vector(this.locEndL.x, this.locEndL.y, this.locEndL.z);
        let er2 = new mw.Vector(this.locEndR.x, this.locEndR.y, this.locEndR.z);
        let endData = { loc2: { L: el2, R: er2 } };
        this.closeDoor = new mw.Tween(endData);
        // startMove.chain(endMove);

        this.closeDoor
            .delay(100)
            .to({ loc2: { L: sl2, R: sr2 } }, 1500)
            .easing(TweenUtil.Easing.Sinusoidal.InOut)
            .onUpdate((v) => {
                this.doorL.worldTransform.position = new mw.Vector(v.loc2.L.x, v.loc2.L.y, v.loc2.L.z);;
                this.doorR.worldTransform.position = new mw.Vector(v.loc2.R.x, v.loc2.R.y, v.loc2.R.z);
            })
            .onComplete(() => {
                this.closeDoor = null;
                this.changeState(DoorState.Close);
            })
            .start();
    }


    changeState(state: DoorState) {
        switch (state) {
            case DoorState.Open:
                this.clearOpenMap();
                break;
            case DoorState.Close:
                this.clearCloseArr();
                break;
        }
        this.doorState = state;
    }


    clearOpenMap() {
        if (this.guidPlayeridMap.size == 0) return;
        this.guidPlayeridMap.forEach((value: number, key: string) => {
            ModuleService.getModule(DoorModuleS).toHideUI(value);
        })
        this.guidPlayeridMap.clear();
    }

    clearCloseArr() {
        if (this.closePlayers.length == 0) return;
        this.closePlayers.forEach(playerId => {
            ModuleService.getModule(DoorModuleS).toHideBtnUI(playerId);
        })
        this.closePlayers.length = 0;
    }


    delect(playerId: number) {
        this.guidPlayeridMap.forEach((value: number, key: string) => {
            if (value == playerId) {
                this.guidPlayeridMap.delete(key);
            }
        })
    }



}