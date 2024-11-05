import { Camp } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import Allot from "../../uiTemplate/Inside/Allot";
import SoundManager = mw.SoundService;
export default class P_Allot extends Allot {
    private static _instance: P_Allot;
    private changeIntervel: number = GameConfig.Rule.getElement(10004).Time;
    private s_time: number;
    private randomSoundGuid: string = GameConfig.Assets.getElement(10002).Guid;
    public static get instance(): P_Allot {
        if (this._instance == null) {
            this._instance = UIService.create(P_Allot);
            this._instance.text();
        }
        return this._instance;
    }
    public static showAllotUI(showNum: number, isSvip: boolean) {
        let showString = (showNum * 100).toFixed(0);
        P_Allot.instance.mText_ProbNumber.text = ("" + showString + "%");
        P_Allot.instance.changeVisible(0);
        UIService.show(this);
        P_Allot.instance.beginChange();
        P_Allot.instance.mText_Member.visibility = isSvip ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }
    public static showCamp(camp: number) {
        TimeUtil.clearInterval(P_Allot.instance.s_time);
        let readySound = GameConfig.Sound.getElement("10006").Guid
        if (camp == Camp.Police) {
            readySound = GameConfig.Sound.getElement("10005").Guid
        }
        else if (camp == Camp.Spy) {
            readySound = GameConfig.Sound.getElement("10004").Guid
        }
        SoundService.playSound(readySound);
        P_Allot.instance.changeVisible(camp);
    }
    public static closeAllotUI() {
        UIService.hide(this);

        TimeUtil.clearInterval(P_Allot.instance.s_time);
    }
    private text = () => {
        this.mText_Explain.text = (GameConfig.Text.getElement(11005).Content);
        this.mText_Prob.text = (GameConfig.Text.getElement(11004).Content);
        this.mText_Title.text = (GameConfig.Text.getElement(11003).Content);
        this.mText_Civilian.text = (GameConfig.Identity.getElement(10003).IdentityName);
        this.mText_Detective.text = (GameConfig.Identity.getElement(10001).IdentityName);
        this.mText_Maffia.text = (GameConfig.Identity.getElement(10002).IdentityName);
    }
    private beginChange() {
        let num = 0;
        this.s_time = TimeUtil.setInterval(() => {
            num++;
            this.changeVisible(num % 3);
        }, this.changeIntervel)
        setTimeout(() => {
            TimeUtil.clearInterval(this.s_time);
        }, 5000);
    }
    private changeVisible(num: number) {
        SoundService.playSound(this.randomSoundGuid);
        switch (num) {
            case 2://平民
                this.mText_Civilian.visibility = (mw.SlateVisibility.Visible);
                this.mText_Maffia.visibility = (mw.SlateVisibility.Hidden);
                this.mText_Detective.visibility = (mw.SlateVisibility.Hidden);
                break;
            case 0://警察
                this.mText_Civilian.visibility = (mw.SlateVisibility.Hidden);
                this.mText_Maffia.visibility = (mw.SlateVisibility.Hidden);
                this.mText_Detective.visibility = (mw.SlateVisibility.Visible);
                break;
            case 1://黑手党
                this.mText_Civilian.visibility = (mw.SlateVisibility.Hidden);
                this.mText_Maffia.visibility = (mw.SlateVisibility.Visible);
                this.mText_Detective.visibility = (mw.SlateVisibility.Hidden);
                break;
        }
    }
}