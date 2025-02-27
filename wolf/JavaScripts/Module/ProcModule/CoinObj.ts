import { GameGlobals, GamingState } from "../../Globals";
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import Gold from "../../Prefabs/CoinPoint/Script/GoldRotate";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { GameModuleS } from "../GameModule/GameModuleS";
import SoundManager = mw.SoundService;
export class CoinObj {
    private coinModel: mw.GameObject;
    private coinTrigger: mw.Trigger;
    private tableId: number;
    private state: CoinState;
    private curLoc: mw.Vector;
    private script: Gold
    public constructor(tableId: number, coinModel: mw.GameObject, coinTrigger: mw.Trigger, script: Gold) {
        this.tableId = tableId;
        this.coinModel = coinModel;
        this.coinTrigger = coinTrigger;
        this.curLoc = new mw.Vector(0, 0, -1500);
        this.coinTrigger.worldTransform.position = this.curLoc;
        this.state = CoinState.NotActive;
        this.script = script
        this.coinTrigger.onEnter.add(this.onPeopleIn.bind(this));
    }
    public active(tableId: number) {
        this.tableId = tableId;
        this.randomLoc();
        this.state = CoinState.Active;
        // this.coinModel.worldTransform.rotation = mw.Rotation.zero
    }
    public destroy() {
        this.state = CoinState.NotActive;
        this.curLoc = new mw.Vector(0, 0, -1500);
        this.coinTrigger.worldTransform.position = this.curLoc;
    }
    public disappear() {
        this.state = CoinState.Disappear;
        this.curLoc = new mw.Vector(0, 0, -1500);
        this.coinTrigger.worldTransform.position = this.curLoc;
        setTimeout(() => {
            if (this.state == CoinState.Disappear) {
                this.active(this.tableId);
            }
        }, GameConfig.Rule.getElement(10020).Time * 1000);
    }
    private onPeopleIn(char: mw.GameObject) {
        if (GameGlobals.curGameState != GamingState.GamingState) return;
        if (this.state != CoinState.Active) return;

        if (PlayerManagerExtesion.isNpc(char)) {
            let aiModel = char as mw.Character;
            if (Tools.isAiPlayer(aiModel)) {
                let ai = Tools.getAiObject(aiModel);
                let istrue = ai.changeCoin(1);
                if (!istrue) {
                    return;
                } else {
                    let soundguid = GameConfig.Assets.getElement(10009).Guid;
                    mw.SoundService.play3DSound(soundguid, this.curLoc, 1);
                    this.disappear();
                }
            }
            else {
                return;
            }
        } else if (PlayerManagerExtesion.isCharacter(char)) {
            let player = (char as mw.Character).player;
            //TODO:新手引导 旧
            let istrue = ModuleService.getModule(GameModuleS).net_ChangeCoin(player.playerId, 1);
            if (!istrue) return;
            let soundguid = GameConfig.Assets.getElement(10009).Guid;
            mw.SoundService.play3DSound(soundguid, this.coinModel.worldTransform.position, 1);
            this.disappear();

        }

    }
    private randomLoc() {
        let coinsGenerateElement = GameConfig.CoinsGenerate.getElement(this.tableId);
        let locCenter = coinsGenerateElement.Location;
        let x = coinsGenerateElement.Scale[0] * 100;
        let y = coinsGenerateElement.Scale[1] * 100;
        let z = locCenter.z;
        let randomX = Tools.randomInt(-x / 2, x / 2);
        let randomY = Tools.randomInt(-y / 2, y / 2);
        this.curLoc = new mw.Vector(locCenter.x + randomX, locCenter.y + locCenter.y + randomY, z);
        this.coinTrigger.worldTransform.position = this.curLoc;
    }
    private randomLoc2() {
        let pointO = GameConfig.CoinsGenerate.getElement(this.tableId).Point2;
        let pointA = GameConfig.CoinsGenerate.getElement(this.tableId).Point1;
        let pointB = GameConfig.CoinsGenerate.getElement(this.tableId).Point3;
        let m = Math.random();
        let n = Math.random();
        let OA = mw.Vector.subtract(pointA, pointO);
        let OB = mw.Vector.subtract(pointB, pointO);
        let aimPoint = pointO.add(mw.Vector.multiply(OA, m).add(mw.Vector.multiply(OB, n)));
        this.curLoc = aimPoint;
        this.coinTrigger.worldTransform.position = this.curLoc;
    }
}

export enum CoinState {
    NotActive,
    Active,
    Disappear
}