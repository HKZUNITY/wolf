/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-06-30 10:00:17
 * @FilePath     : \murdermystery3\JavaScripts\UILogic\Game\P_Die.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../../Tables/GameConfig";
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { MGSHome } from "../../MGSHome";
import { UiManager } from '../../UI/UiManager';
import Dead from "../../uiTemplate/Inside/Dead";
import { Tools } from '../../Tools';

export default class P_Die extends Dead {
    private static _instance: P_Die;
    private dieTween: mw.Tween<{ x: number, y: number }>;
    private imgTween: mw.Tween<{ x: number, y: number }>;
    private s_Time: number;
    private spantime: number = 0.5;
    private count: number = 0;
    private maxcount: number = Math.round(GameConfig.Rule.getElement(10010).Time / this.spantime);
    public static get instance(): P_Die {
        if (this._instance == null) {
            this._instance = UIService.create(P_Die);
            this._instance.setText();
        }
        return this._instance;
    }
    protected onStart(): void {
        this.canUpdate = true;
        if (Tools.isRewardActive()) {
            this.mBtn_DeadAD.visibility = (mw.SlateVisibility.Visible);
        }
        else {
            this.mBtn_DeadAD.visibility = (mw.SlateVisibility.Collapsed);
        }
    }
    setText() {
        this.mText_Explaine.text = (GameConfig.Guide.getElement(60001).GuideContent);
    }
    public static showDieEffectUI() {
        P_Die.instance.mCanvas_Explaine.visibility = (mw.SlateVisibility.Collapsed);
        P_Die.instance.dieEffect();
    }
    public static closeDieEffecUI() {
        UIService.hide(this);
        if (P_Die.instance.imgTween != null) {
            P_Die.instance.imgTween.stop();
            P_Die.instance.imgTween = null;
        }
        if (P_Die.instance.dieTween != null) {
            P_Die.instance.dieTween.stop();
            P_Die.instance.dieTween = null;
        }

    }
    private imgTweenBegin() {
        this.imgTween = new mw.Tween({ x: 0, y: 0 });
        this.imgTween.to({ x: 1, y: 1 }, 500)
            .onUpdate((v) => {
                if (v.x <= 0.1) {
                    this.mImg_Die.visibility = (mw.SlateVisibility.Visible);
                    this.mImg_Die_1.visibility = (mw.SlateVisibility.Hidden);
                } else if (v.x >= 0.9) {
                    this.mImg_Die.visibility = (mw.SlateVisibility.Hidden);
                    this.mImg_Die_1.visibility = (mw.SlateVisibility.Visible);
                }
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();

    }
    private dieEffect() {
        let staticX = this.mText_Die.position.x;
        this.count = 0;
        this.mImg_Die.visibility = (mw.SlateVisibility.Hidden);
        this.mImg_Die_1.visibility = (mw.SlateVisibility.Hidden);
        this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
        this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Hidden);
        this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Visible);
        UIService.showUI(this);

        this.dieTween = new mw.Tween({ x: staticX, y: -240 }).to({ x: staticX, y: 300 }, 2000).onUpdate((v) => {
            this.mText_Die.position = (new mw.Vector2(v.x, v.y));
            
        }).onComplete(() => {
            if (this.dieTween != null) {
                this.dieTween.stop();
                this.dieTween = null;
            }
            this.mImg_Die.visibility = (mw.SlateVisibility.Visible);
            this.imgTweenBegin();
        }).start();
        
        this.s_Time = TimeUtil.setInterval(() => {
            if (this.count >= this.maxcount) {
                TimeUtil.clearInterval(this.s_Time);
                UIService.hideUI(this);
                if (this.imgTween != null) {
                    this.imgTween.stop();
                    this.imgTween = null;
                }
            }
            this.hudEffect(this.count % 4);
            this.count++;
        }, this.spantime)
    }
    hudEffect(num: number) {
        switch (num) {
            case 0:
                this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
                this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Hidden);
                this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Visible);
                break;
            case 1:
                this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
                this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Visible);
                this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Hidden);
                break;
            case 2:
                this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Visible);
                this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Visible);
                this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Hidden);
                break;
            case 3:
                this.mImg_Dead_BG_100.visibility = (mw.SlateVisibility.Hidden);
                this.mImg_Dead_BG_96.visibility = (mw.SlateVisibility.Visible);
                this.mImg_Dead_BG_92.visibility = (mw.SlateVisibility.Hidden);
                break;
        }
    }

    public static showDieExplain() {
        P_Die.instance.mCanvas_Explaine.visibility = (mw.SlateVisibility.Visible);
        MGSHome.msgTutorStep(60001);
        setTimeout(() => {
            P_Die.instance.mCanvas_Explaine.visibility = (mw.SlateVisibility.Collapsed);
        }, GameConfig.Guide.getElement(60001).GuideTime * 1000);
    }
}