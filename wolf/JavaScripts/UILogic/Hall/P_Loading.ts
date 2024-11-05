import { Globals } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import LoadingScene from "../../uiTemplate/Hall/LoadingScene";
export default class P_Loading extends LoadingScene {
    private static _instance: P_Loading;
    private s_Time: number;
    public static get instance(): P_Loading {
        if (this._instance == null) {
            this._instance = UIService.create(P_Loading);
            this._instance.setText();
        }
        return this._instance;
    }
    setText() {
        this.mText_Loading.text = (GameConfig.Text.getElement(20008).Content);
    }
    public static showLoadingUI() {
        P_Loading.instance.beginLoading(Globals.spawnSceneTime);
    }
    public static closeLoadingUI() {
        UIService.hide(this);
        TimeUtil.clearInterval(P_Loading.instance.s_Time);
    }
    private beginLoading(loadTime: number) {
        let barnum = 0;
        this.mPro_Loading.percent = 0;
        UIService.showUI(this, mw.UILayerTop);
        this.s_Time = TimeUtil.setInterval(() => {
            if (barnum < 100) {
                barnum++;
                this.mPro_Loading.percent = barnum / 100;
            }
            else {
                TimeUtil.clearInterval(this.s_Time);
            }

        }, loadTime / 100);
    }
}