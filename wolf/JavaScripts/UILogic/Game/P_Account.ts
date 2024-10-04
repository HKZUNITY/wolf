import { CalculateState, Camp } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import Clearing from "../../uiTemplate/Clearing/Clearing";
import { CalculateModuleC, calculateData } from "../../Module/ProcModule/CalculateModule";
import { IAAUtils } from "../../IAAUtils";
import P_Tips from "../../CommonUI/P_Tips";

export default class P_Account extends Clearing {
    private static _instance: P_Account;
    private lightTween: mw.Tween<{ alaf: number }>;
    private infoTween: mw.Tween<{
        x: number;
        y: number;
    }>
    private coinTween: mw.Tween<{ gold: number; }>
    private pos: mw.Vector2;
    private coinSound: string;


    public static get instance(): P_Account {
        if (this._instance == null) {
            this._instance = UIService.create(P_Account);
            this._instance.setText();
            this._instance.pos = this._instance.mCanvas_Info.position;
        }
        return this._instance;
    }
    setText() {
        this.mText_Dark_Clearing_Explaine.text = GameConfig.Guide.getElement(50001).GuideContent;
        this.mText_Dark_Title_Explaine.text = GameConfig.Guide.getElement(50002).GuideContent;
        this.mText_Dark_Key_Explaine.text = GameConfig.Guide.getElement(50003).GuideContent;
        this.mText_Dark_Earning_Explaine.text = GameConfig.Guide.getElement(50004).GuideContent;
    }
    onStart() {
        this.mBtn_Close.onClicked.add(() => {
            P_Account.closeAccountUI();
        })
        // if (Tools.isRewardActive()) {
        //     this.mBtn_ClearingAD.visibility = (mw.SlateVisibility.Visible);
        // }
        // else {
        //     this.mBtn_ClearingAD.visibility = (mw.SlateVisibility.Collapsed);
        // }
        this.layer = mw.UILayerMiddle;
        // this.mCanvas_AD.visibility = mw.SlateVisibility.SelfHitTestInvisible;//TODO-WFZ
    }

    public static showAccountUI(dataStr: string, isSvip: boolean) {
        P_Account.instance.initUI()
        P_Account.instance.accountDetail(dataStr);
        P_Account.instance.mText_Member.visibility = isSvip ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        UIService.show(this);
        P_Tips.show("开始结算");
    }
    public static closeAccountUI() {
        UIService.hide(this);
        if (P_Account.instance.coinSound) {
            mw.SoundService.stopSound(P_Account.instance.coinSound);
        }
        ModuleService.getModule(CalculateModuleC).closeCalculateUIMgs()
    }
    private initUI() {
        this.mCanvas_Step1.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_Step2.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_Step3.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_Step4.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_Info.position = this.pos;
        this.mText_VictoryAward2.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_Dark.visibility = mw.SlateVisibility.Collapsed;
        this.mBtn_Click.visibility = mw.SlateVisibility.Collapsed;
    }

    private accountDetail(dataStr: string) {
        let data: calculateData = JSON.parse(dataStr);
        let time: number = 0;
        let config1 = GameConfig.AccountStage.getElement(1001);
        let config2 = GameConfig.AccountStage.getElement(1002);
        let config3 = GameConfig.AccountStage.getElement(1003);
        let config4 = GameConfig.AccountStage.getElement(1004);

        let maffiaId: number;
        let TitleId: number;
        let maffiaLow: boolean;
        let detectiveLow: boolean;
        switch (data.calState) {
            case CalculateState.SpyWinNoHero:
                TitleId = 12002;
                maffiaId = 10001;
                maffiaLow = true;
                detectiveLow = false;
                break;
            case CalculateState.SpyWinHero:
                TitleId = 12001;
                maffiaId = 10004;
                maffiaLow = true;
                detectiveLow = false;
                break;
            case CalculateState.SpyLoseNoHero:
                TitleId = 12003;
                maffiaId = 10001;
                maffiaLow = false;
                detectiveLow = true;
                break;
            case CalculateState.SpyLoseHero:
                TitleId = 12004;
                maffiaId = 10004;
                maffiaLow = false;
                detectiveLow = true;
                break;
            case CalculateState.TimeNoHero:
                TitleId = 12005;
                maffiaId = 10001;
                maffiaLow = true;
                detectiveLow = true;
                break;
            case CalculateState.TimeHero:
                TitleId = 12006;
                maffiaId = 10004;
                maffiaLow = true;
                detectiveLow = true;
                break;
        }
        let ownId: number;
        let rewardText: number;
        let recordNum: number;

        let recordfen: number;
        let recordmiao: number;

        let rewardWinText: number;

        switch (data.camp) {
            case Camp.Civilian:
                ownId = 10003;
                rewardText = 12011;
                rewardWinText = 12014;
                // recordNum = data.liveTime;
                recordfen = Math.floor(data.liveTime / 60);//分
                recordmiao = data.liveTime % 60
                break;
            case Camp.Hero:
                ownId = 10004;
                rewardText = 12013;
                rewardWinText = 12015;
                recordNum = data.livenum;
                break;
            case Camp.Police:
                ownId = 10001;
                rewardText = 12012;
                rewardWinText = 12015;
                recordNum = data.livenum;
                break;
            case Camp.Spy:
                ownId = 10002;
                rewardText = 12010;
                rewardWinText = 12014;
                recordNum = data.killNum;
                break;
        }

        //===================step1
        //右侧杀手
        this.mText_Detective.text = GameConfig.Identity.getElement(10002).IdentityName;
        this.mImg_PlayerIcon_Detective.imageGuid = (GameConfig.Role.findElement(`ID`, data.spyRoleId) ? GameConfig.Role.getElement(data.spyRoleId).Image.toString() : GameConfig.Role.getElement(10001).Image.toString());
        this.mImg_WeaponIcon_Detective.imageGuid = GameConfig.Weapon.getElement(data.spyWeaponId).IconGUID.toString()
        this.mText_WeaponName_Detective.text = GameConfig.Weapon.getElement(data.spyWeaponId).WeaponName;
        this.mText_PlayerName_Detective.text = data.spyName;
        //左侧其他
        this.mText_Maffia.text = GameConfig.Identity.getElement(maffiaId).IdentityName;
        this.mImg_PlayerIcon_Maffia.imageGuid = (GameConfig.Role.findElement(`ID`, data.otherRoleId) ? GameConfig.Role.getElement(data.otherRoleId).Image.toString() : GameConfig.Role.getElement(10001).Image.toString());
        this.mImg_WeaponIcon_Maffia.imageGuid = GameConfig.Weapon.getElement(data.otherWeaponId).IconGUID.toString()
        this.mText_WeaponName_Maffia.text = GameConfig.Weapon.getElement(data.otherWeaponId).WeaponName
        this.mText_PlayerName_Maffia.text = data.otherName;
        //===================step2
        this.mText_Title.text = GameConfig.Text.getElement(TitleId).Content;
        this.mImg_Lose_Maffia.visibility = maffiaLow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        this.mImg_Lose_Detective.visibility = detectiveLow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        //==================step3（移动+显示个人奖励）
        this.mImg_IdentityIcon.imageGuid = GameConfig.Identity.getElement(ownId).IconGUID.toString();
        this.mText_Identity.text = GameConfig.Identity.getElement(ownId).IdentityName;
        //==================step4（金币显示+动画、关闭按钮）
        let str = GameConfig.Text.getElement(rewardText).Content;
        if (data.camp == Camp.Civilian) {
            this.mText_ChangeText.text = mw.StringUtil.format(str, recordfen, recordmiao);
        } else {
            this.mText_ChangeText.text = mw.StringUtil.format(str, recordNum);
        }
        this.mText_Award_EXP.text = data.baseExp.toString();
        this.mText_VictoryAward1.visibility = data.isWin ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        this.mText_VictoryAward1.text = GameConfig.Text.getElement(rewardWinText).Content;

        let stage = TimeUtil.setInterval(() => {
            if (time == config1.stageTime) {
                this.mCanvas_Step1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                mw.SoundService.playSound(config1.soundId.toString());
            } else if (time == config2.stageTime) {
                this.mCanvas_Step2.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                mw.SoundService.playSound(config2.soundId.toString());
            } else if (time == config3.stageTime) {
                mw.SoundService.playSound(config3.soundId.toString());
                let startpos = this.mCanvas_Info.position;
                let endPos = this.mCanvas_Info_EndPos.position;
                this.infoTween = new mw.Tween({ x: startpos.x, y: startpos.y })
                    .to({ x: endPos.x, y: endPos.y }, 1000)
                    .onUpdate((v) => {
                        this.mCanvas_Info.position = new mw.Vector(v.x, v.y);
                    }).onComplete(() => {
                        this.infoTween.stop();
                        this.infoTween = null;
                        this.mCanvas_Step3.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    }).start();
            } else if (time >= config4.stageTime) {
                TimeUtil.clearInterval(stage);
                this.mCanvas_Step4.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.coinSound = mw.SoundService.playSound(config4.soundId.toString());

                this.coinTween = new mw.Tween({ gold: 0 })
                    .to({ gold: data.gold, }, 1000)
                    .onUpdate((v) => {
                        let num = Math.round(v.gold);
                        this.mText_AwardNumber_Identity.text = num.toString();
                    }).onComplete(() => {
                        this.coinTween.stop();
                        this.coinTween = null;
                    }).start();
                // let keepTime = GameConfig.Rule.getElement(10030).Time;
                setTimeout(() => {
                    P_Account.closeAccountUI();
                }, 30 * 1000);
            }
            time++;
        }, 1);
    }




    lightBling(uiEle: mw.Image) {
        if (this.lightTween != null) {
            this.lightTween.stop();
        }
        let blingTime = 400;
        let color: mw.LinearColor = uiEle.imageColor;
        uiEle.imageColor = (new mw.LinearColor(color.r, color.g, color.b, 1));
        this.lightTween = new mw.Tween({ alaf: 1 }).to({ alaf: 0.1 }, blingTime)
            .onUpdate((v) => {
                uiEle.imageColor = (new mw.LinearColor(color.r, color.g, color.b, v.alaf));
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }

    public setMButtonWatchADEvent(event: () => {}) {
        this.mButton_WatchAD.onClicked.clear()
        this.mButton_WatchAD.onClicked.add(event)
    }
}