import { GameConfig } from "../../Tables/GameConfig";
import Congratulation from "../../uiTemplate/Inside/Congratulation";
export default class P_GameFinal extends Congratulation {
    private static _instance: P_GameFinal;
    private finalTween: mw.Tween<{ x: number, y: number }>;
    public static get instance(): P_GameFinal {
        if (this._instance == null) {
            this._instance = UIService.create(P_GameFinal);
            this._instance.setText();
        }
        return this._instance;
    }
    setText() {
        this.mText_Lose.text = (GameConfig.Text.getElement(11013).Content)
        this.mText_Win.text = (GameConfig.Text.getElement(11008).Content);
    }
    public static closeGameFinal() {
        UIService.hideUI(this._instance);
    }
    public static showGameFinal(isWin: boolean) {
        if (isWin) {
            P_GameFinal.instance.mCanvas_Lose.visibility = (mw.SlateVisibility.Hidden);
            P_GameFinal.instance.mCanvas_Win.visibility = (mw.SlateVisibility.Visible);
        }
        else {
            P_GameFinal.instance.mCanvas_Lose.visibility = (mw.SlateVisibility.Visible);
            P_GameFinal.instance.mCanvas_Win.visibility = (mw.SlateVisibility.Hidden);
        }
        P_GameFinal.instance.beginShow();
    }
    private beginShow() {
        let staticX = this.mCanvas_Win.position.x;
        UIService.showUI(this);
        this.finalTween = new mw.Tween({ x: staticX, y: -160 }).to({ x: staticX, y: 400 }, 1000).onUpdate((v) => {
            this.mCanvas_Win.position = (new mw.Vector2(v.x, v.y));
            this.mCanvas_Lose.position = (new mw.Vector2(v.x, v.y));
        }).onComplete(() => {
            this.finalTween.stop();
            this.finalTween = null;

        }).start();
    }
} 