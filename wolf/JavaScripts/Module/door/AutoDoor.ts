import { IDoorElement } from "../../Tables/Door";
import { GameConfig } from "../../Tables/GameConfig";
import { DoorModuleS } from "./DoorModuleS";
export enum AutoDoorState {
    /**开启 */
    Open,
    /**关闭 */
    Close,
    /**运行 */
    Move
}

export class AutoDoor {
    private id: number;
    private config: IDoorElement;
    private doorObj: mw.GameObject;
    private trigger: mw.Trigger;
    public doorState: AutoDoorState;
    private openDoor: mw.Tween<{ loc1: { L: mw.Vector; }; }>;
    private closeDoor: mw.Tween<{ loc2: { L: mw.Vector; }; }>;
    private bool: boolean;
    private time: number;
    /**处于触发器中的角色 */
    private inPlayers: Array<mw.Character> = new Array<mw.Character>();


    constructor(id: number) {
        this.id = id;
        this.config = GameConfig.Door.getElement(this.id);
        this.creat();
    }
    creat() {
        this.doorObj = GameObject.findGameObjectById(this.config.leftDoorGuid);
        this.trigger = GameObject.findGameObjectById(this.config.outTriggerGuid) as mw.Trigger;
        this.trigger.onEnter.add(this.enter.bind(this));
        this.trigger.onLeave.add(this.leave.bind(this));
        this.bool = false;
        this.reset()
    }


    reset() {
        this.doorObj.worldTransform.position = this.config.leftStartLoc.clone();
        this.changeState(AutoDoorState.Close);
        this.inPlayers.length = 0;
    }

    enter(obj: mw.GameObject) {
        if (obj instanceof mw.Character) {
            let bool = ModuleService.getModule(DoorModuleS).getCharState(obj);
            if (!this.inPlayers.includes(obj) && bool) {
                this.inPlayers.push(obj);
                this.check();
            }
        }
    }

    leave(obj: mw.GameObject) {
        if (obj instanceof mw.Character) {
            if (this.inPlayers.includes(obj)) {
                this.inPlayers = this.inPlayers.filter(item => item != obj);
                this.check();
            }
        }
    }

    playerLeave(playerId: number) {
        let char = Player.getPlayer(playerId).character;
        if (this.inPlayers.includes(char)) {
            this.inPlayers = this.inPlayers.filter(item => item != char);
        }
        this.check();
    }



    check() {
        if (this.inPlayers.length > 0) {
            this.openAnimation()
            //关闭计时器
            this.bool = false;
        } else if (this.inPlayers.length == 0 && this.doorState == AutoDoorState.Open) {
            //计时器5秒
            this.bool = true;
            this.time = 5;
        }
    }


    update(dt: number) {
        if (this.openDoor) {
            this.openDoor.update();
        }
        if (this.closeDoor) {
            this.closeDoor.update();
        }
        if (this.bool) {
            if (this.time > 0) {
                this.time -= dt;
            } else {
                this.bool = false;
                this.time = 0;
                this.endAnimation();
            }
        }

    }


    /**开门动画效果 */
    public openAnimation() {
        if (this.doorState != AutoDoorState.Close) return;
        this.changeState(AutoDoorState.Move);
        let sl1 = this.config.leftStartLoc.clone();
        let el1 = this.config.leftEndLoc.clone();
        let startData = { loc1: { L: sl1 } };
        this.openDoor = new mw.Tween(startData);
        this.openDoor
            .delay(100)
            .to({ loc1: { L: el1 } }, 1500)
            .easing(TweenUtil.Easing.Sinusoidal.InOut)
            .onUpdate((v) => {
                this.doorObj.worldTransform.position = new mw.Vector(v.loc1.L.x, v.loc1.L.y, v.loc1.L.z);
            })
            .onComplete(() => {
                this.openDoor = null;
                this.changeState(AutoDoorState.Open);
                this.check();
            })
            .start();
    }




    /**关门动画效果 */
    public endAnimation() {
        if (this.doorState != AutoDoorState.Open) return;
        this.changeState(AutoDoorState.Move);
        let sl2 = this.config.leftStartLoc.clone();;
        let el2 = this.config.leftEndLoc.clone();
        let endData = { loc2: { L: el2 } };
        this.closeDoor = new mw.Tween(endData);
        // startMove.chain(endMove);

        this.closeDoor
            .delay(100)
            .to({ loc2: { L: sl2 } }, 1500)
            .easing(TweenUtil.Easing.Sinusoidal.InOut)
            .onUpdate((v) => {
                this.doorObj.worldTransform.position = new mw.Vector(v.loc2.L.x, v.loc2.L.y, v.loc2.L.z);
            })
            .onComplete(() => {
                this.closeDoor = null;
                this.changeState(AutoDoorState.Close);
                this.check();
            })
            .start();
    }


    changeState(state: AutoDoorState) {
        this.doorState = state;
    }

}