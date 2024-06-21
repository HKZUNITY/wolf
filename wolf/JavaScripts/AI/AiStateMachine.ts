import { AiObject } from "./AiObject";

export enum AiState {
    NotActive,
    Ready,
    Move,//随机坐标点
    Follow,//跟随某玩家
    GunAttack,//持枪状态
    KnifeAttack,//持刀状态
    Still,//静止不动状态
}
export class AiManager {
    public aiobj: AiObject;
    constructor(obj: AiObject) {
        this.aiobj = obj;
    }
    private _mCurrentState: IAIState;
    public changeState(n: { new(...args: any[]): IAIState }, ...params: any[]) {
        if (this._mCurrentState) {
            this._mCurrentState.exit();
            this._mCurrentState = null;
        }
        let newState = new n(params);
        this._mCurrentState = newState;
        newState.enter(this.aiobj);
    }
    public update() {
        if (this._mCurrentState) {
            this._mCurrentState.onUpdate();
        }
    }
}
export interface IAIState {
    enter(obj: AiObject): void;
    onUpdate(): void;
    exit(): void;
}
export class FSM_AiNotActive implements IAIState {
    enter(obj: AiObject): void {
        obj.curAIState = AiState.NotActive;
        obj.stopMove();
        obj.target = null;
        obj.stopMachine();
    }
    onUpdate(): void {

    }
    exit(): void {

    }
}
export class FSM_AiReady implements IAIState {
    public aiobj: AiObject;
    enter(obj: AiObject): void {
        obj.curAIState = AiState.Ready;
        obj.readyState();
        this.aiobj = obj;
    }
    onUpdate(): void {
        if (this.aiobj != null) {
            if (this.aiobj.isArrived) {
                this.aiobj.moveToRandom(1);
            }
            if (mw.TimeUtil.time() - this.aiobj.beginMoveTime > 15) {
                this.aiobj.moveToRandom(1);
            }
        }
    }
    exit(): void {


    }
}
export class FSM_AiMove implements IAIState {
    public aiobj: AiObject;
    enter(obj: AiObject): void {
        obj.curAIState = AiState.Move;
        this.aiobj = obj;
        this.aiobj.moveState();
    }
    onUpdate(): void {
        if (this.aiobj != null) {
            if (this.aiobj.isArrived) {
                this.aiobj.changeAiState(AiState.Still);
            }
            if (mw.TimeUtil.time() - this.aiobj.beginMoveTime > 15) {
                this.aiobj.changeAiState(AiState.Still);
            }
            this.aiobj.checkUseWeapon();
        }
    }
    exit(): void {
        if (this.aiobj.moveAni) this.aiobj.moveAni.stop();
    }
}
export class FSM_AiFollow implements IAIState {
    public aiobj: AiObject;
    enter(obj: AiObject): void {
        obj.curAIState = AiState.Follow;
        this.aiobj = obj;
        this.aiobj.followState();
    }
    onUpdate(): void {
        if (this.aiobj != null) {
            this.aiobj.followUpdate();
        }
    }
    exit(): void {
    }
}
export class FSM_AiGunAttack implements IAIState {
    public aiobj: AiObject;
    enter(obj: AiObject): void {
        obj.curAIState = AiState.GunAttack;
        this.aiobj = obj;
        obj.gunState();
    }
    onUpdate(): void {
        if (this.aiobj != null) {
            if (this.aiobj.isArrived) {
                this.aiobj.moveToRandom(1);
            }
            if (mw.TimeUtil.time() - this.aiobj.beginMoveTime > 15) {
                this.aiobj.moveToRandom(1);
            }
            this.aiobj.checkIsAttack();
        }
    }
    exit(): void {


    }
}
export class FSM_AiKnifeAttack implements IAIState {
    public aiobj: AiObject;
    enter(obj: AiObject): void {
        obj.curAIState = AiState.KnifeAttack;
        this.aiobj = obj;
        obj.knifeState();
    }
    onUpdate(): void {
        if (this.aiobj != null) {
            if (this.aiobj.isArrived) {
                this.aiobj.moveToRandom(1);
            }
            if (mw.TimeUtil.time() - this.aiobj.beginMoveTime > 15) {
                this.aiobj.moveToRandom(1);
            }
            this.aiobj.checkIsAttack();
        }
    }
    exit(): void {


    }
}
export class FSM_AiStill implements IAIState {
    enter(obj: AiObject): void {
        obj.curAIState = AiState.Still;
        obj.stillState();
    }
    onUpdate(): void {

    }
    exit(): void {


    }
}
