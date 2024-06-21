import { GameConfig } from "../Tables/GameConfig";
import Black_Generate from "../ui-generate/uiTemplate/Hall/Black_generate";

export default class P_BlackMask extends Black_Generate {

    private static _instance: P_BlackMask;

    private static curSpeed: number = 0;

    private static curA: number = 255;

    private static waitTime: number = 0;

    private static runTime: number = 0;

    private static curColor: mw.LinearColor = null;

    private static callBack: () => void;

    public static get instance(): P_BlackMask {
        if (this._instance == null) {
            this._instance = mw.UIService.create(P_BlackMask);
            this.curColor = this._instance.mImg_BG.imageColor;
        }
        return this._instance;
    }

    onUpdate(dt: number) {
        if (P_BlackMask.curA <= 0) {
            P_BlackMask.curA = 255;
            if (P_BlackMask.callBack) {
                P_BlackMask.callBack();
            }
            P_BlackMask.callBack = null;
            P_BlackMask.instance.canUpdate = false;
            mw.UIService.hideUI(P_BlackMask.instance);
            console.error(`开始展示 ========= 关闭黑幕`);
        } else {
            P_BlackMask.curA -= P_BlackMask.curSpeed * dt;
            P_BlackMask.instance.mImg_BG.setImageColorDecimal(P_BlackMask.curColor.r, P_BlackMask.curColor.g, P_BlackMask.curColor.b, P_BlackMask.curA)
        }
    }

    showMask(time: number, callBack: () => void): void {
        let ratio = GameConfig.Rule.getElement(50008).Time;
        let curTime = time * ratio;
        P_BlackMask.runTime = curTime;
        P_BlackMask.waitTime = time - curTime;
        P_BlackMask.curSpeed = P_BlackMask.curA / P_BlackMask.runTime;
        P_BlackMask.callBack = callBack;
        console.error(`准备开始 ========= 开启黑幕 curTime: ${P_BlackMask.runTime}  waitTime:${P_BlackMask.waitTime}`);
        mw.UIService.showUI(P_BlackMask.instance);
        setTimeout(() => {
            console.error(`开始展示 ========= 开启黑幕`);
            P_BlackMask.instance.canUpdate = true;
        }, P_BlackMask.waitTime);
    }
}