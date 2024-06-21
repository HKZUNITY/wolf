/*
 * @Author: ziwei.shen
 * @Date: 2022-07-08 14:19:17
 * @LastEditors: zhangqing.fang
 * @LastEditTime: 2022-11-02 15:05:38
 * @FilePath: \townmysteryAPIReview\JavaScripts\Module\GameModule\PropObj.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { GameGlobals } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { PropsGenerateConfig } from "../../Tables/PropsGenerate";
import { Tools } from "../../Tools";
import { GameModuleS } from "./GameModuleS";

export class PropObj {
    //对应的触发器index
    private triggerIndex: number;
    private triggerObj: mw.Trigger;
    //对应prop表的propid
    public propTableIndex: number = 0;
    //当前道具的状态
    public propState: PropState;
    //刷新时间
    public static refreshTime: number = GameConfig.PropsGenerate.getElement(9999).Time;
    public static usedTableId: Map<number, number> = new Map<number, number>();
    constructor(triggerId: number, trigger: mw.Trigger) {
        this.triggerIndex = triggerId;
        this.triggerObj = trigger;
        this.propState = PropState.NotActive;
        PropObj.usedTableId.set(triggerId, 0);
    }
    propGet() {
        this.setPropState(PropState.WaitActive);
        setTimeout(() => {
            if (this.propState == PropState.WaitActive) {
                this.setPropState(PropState.Active);
            }
        }, PropObj.refreshTime * 1000);
    }
    setPropState(state: PropState) {
        this.propState = state;
        switch (state) {
            case PropState.Active:
                this.propInit();
                break;
            case PropState.NotActive:
                this.propDisappear();
                break;
            case PropState.WaitActive:
                this.propDisappear();
                break;
        }
    }
    propInit() {
        let tableId = this.getRandomTableId();
        this.propTableIndex = tableId;
        PropObj.usedTableId.set(this.triggerIndex, this.propTableIndex);
        ModuleService.getModule(GameModuleS).createPropEffect(this.propTableIndex);
        let loc = GameConfig.PropsGenerate.getElement(tableId).GeneratePoint;
        this.triggerObj.worldTransform.position = loc;
    }
    propDisappear() {
        ModuleService.getModule(GameModuleS).removePropEffect(this.propTableIndex);
        this.triggerObj.worldTransform.position = new mw.Vector(0, 0, 0);
        this.propTableIndex = 0;
        PropObj.usedTableId.set(this.triggerIndex, this.propTableIndex);
    }
    getRandomTableId() {
        let headIndex = (GameGlobals.curMapID % 10000) * 10000;
        let total = GameConfig.PropsGenerate.getElement(headIndex).Num;
        let rand = Tools.getRandomInt(headIndex + 1, headIndex + total);
        let isLoop = true;
        while (isLoop) {
            let existSame: boolean = false;
            PropObj.usedTableId.forEach((tableId, triggerId) => {
                if (triggerId != this.triggerIndex && tableId == rand) {
                    existSame = true;
                }
            })
            if (!existSame) {
                isLoop = false;
            }
            else {
                rand = rand + 1;
                if (rand > headIndex + total) {
                    rand = headIndex + 1;
                }
            }
        }
        return rand;
    }
}
export enum PropState {
    NotActive,
    Active,
    WaitActive
}