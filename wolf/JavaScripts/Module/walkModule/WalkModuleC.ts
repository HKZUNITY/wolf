/*
 * @Author: tianran.shi
 * @Date: 2023-02-05 14:26:05
 * @LastEditors: tianran.shi
 * @LastEditTime: 2023-02-05 15:34:59
 * @FilePath: \murdermystery3\JavaScripts\Module\walkModule\walkModuleC.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { WalkModuleS, walkInfo } from "./WalkModuleS";
import { GameConfig } from "../../Tables/GameConfig";

export class WalkModuleC extends ModuleC<WalkModuleS, null> {

    private playerIdMap: Map<string, walk> = new Map<string, walk>();
    protected onEnterScene(sceneType: number): void {
        this.server.net_playerEnter();
    }

    net_initWalk(keyArray: Array<string>, valueArray: Array<walkInfo>){
        let length = keyArray.length;;
        for (let i = 0; i < length; i++) {
            this.net_creatWalk(keyArray[i], valueArray[i].isAi, valueArray[i].objGuid);
        }
        
    }

    //AI模型guid和身上的武器guid
    async net_creatWalk(charGuid: string, isAI: boolean, objGuid?: string) {
        let walkObj = new walk(charGuid, isAI);
        await walkObj.onWalk(objGuid);
        this.playerIdMap.set(charGuid, walkObj);
    }

    net_destroy(guid: string): void {
        if (this.playerIdMap.has(guid)) {
            this.playerIdMap.get(guid).onDestory();
            this.playerIdMap.delete(guid);
        }
    }
}

export class walk {
    private walkTime: number;
    private bool: boolean = false;
    /**模型guid */
    private charGuid: string;
    private isAI: boolean;
    /**物品guid */
    private objGuid: string;
    private playID: number;
    private jump: boolean = false;



    constructor(guid: string, isAI: boolean) {
        this.charGuid = guid;
        this.isAI = isAI;
    }

    /**脚步声 */
    async onWalk(objGuid?: string) {
        let obj = await GameObject.asyncFindGameObjectById(this.charGuid);
        if (!obj) {
            return;
        }
        await obj.asyncReady();
        let char = obj as mw.Character;
        if (this.isAI) {
            this.objGuid = objGuid;
        }
        this.walkTime = TimeUtil.setInterval(() => {
            if (!char.isJumping && char.isMoving) {//&&this.char.velocity>=550
                if (!this.bool) {
                    this.onCreat(char);
                }
            } else {
                if (this.bool) {
                    this.onStop();
                }
            }
            if (char.isJumping) {
                this.jump = true;
            } else if (!char.isJumping && this.jump) {
                this.jump = false;
                let sound = GameConfig.Sound.getElement(10003);
                mw.SoundService.play3DSound(sound.Guid, char.gameObjectId, sound.Count, sound.Rate);
            }
        }, 0.3);
    }

    onCreat(char: mw.Character) {
        let attGuid: string
        this.isAI ? attGuid = this.objGuid : attGuid = char.gameObjectId;
        let sound = GameConfig.Sound.getElement(10001);
        let playParam = { radius: sound.InnerRadius, falloffDistance: sound.FalloffDistance }
        this.playID = mw.SoundService.play3DSound(sound.Guid, attGuid, sound.Count, sound.Rate, playParam);
        this.bool = true;
    }

    onStop() {
        mw.SoundService.stop3DSound(this.playID);
        this.playID = null;
        this.bool = false;
    }


    onDestory() {
        if (this.walkTime) {
            if (this.playID) {
                mw.SoundService.stop3DSound(this.playID);
            }
            TimeUtil.clearInterval(this.walkTime);
            this.walkTime = null;
            this.bool = false;
        }
    }
}