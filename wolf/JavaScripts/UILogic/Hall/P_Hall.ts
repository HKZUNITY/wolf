import AdsPanel from "../../AdsPanel";
import P_Tips from "../../CommonUI/P_Tips";
import { Globals } from "../../Globals";
import { ArkModuleC } from "../../Module/ArkModule/ArkModule";
import { BubbleModuleC } from "../../Module/bubbleModule/BubbleModule";
import ExchangeModuleC from "../../Module/ExchangeModule/ExchangeModuleC";
import { LotteryModuleC } from "../../Module/LotteryModule/LotteryModuleC";
import { PlayerModuleC } from "../../Module/PlayerModule/PlayerModuleC";
import { WatchModuleC } from "../../Module/ProcModule/WatchModule";
import { SetPanel } from "../../Module/SetModule/SetModule";
import { ShopModuleC } from "../../Module/ShopModule/ShopCityModule";
import { SkillModuleC } from "../../Module/SkillModule/SkillModuleC";
import { GameConfig } from "../../Tables/GameConfig";
import MainMenu_Generate from "../../ui-generate/uiTemplate/Hall/MainMenu_generate";
export default class P_Hall extends MainMenu_Generate {
    private static _instance: P_Hall;
    public static get instance(): P_Hall {
        if (this._instance == null) {
            this._instance = UIService.create(P_Hall);
            this._instance.setText();
        }
        return this._instance;
    }
    onStart() {
        // this.mCanvas_Member.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump.focusable = (false);
        this.mBtn_Jump.onPressed.add(() => {
            if (Player.localPlayer.character.isJumping) return;
            Player.localPlayer.character.jump();
        });
        this.mBtn_Watch.onClicked.add(() => {
            ModuleService.getModule(WatchModuleC).watchOther();
        })
        this.mBtn_Shop.onClicked.add(() => {
            ModuleService.getModule(ShopModuleC).ShopOpen(true);
        })
        this.mBtn_lottery.onClicked.add(() => {
            ModuleService.getModule(LotteryModuleC).lotteryOpen(true)
        });
        this.mBtn_Skill.onClicked.add(() => {
            ModuleService.getModule(SkillModuleC).isOpenSkillShopPanel(true);
        })
        let advCount: number = 1;
        this.mText_Member.text = `领券`;
        this.mBtn_Member.onClicked.add(() => {
            if (mw.SystemUtil.isPIE) {
                ModuleService.getModule(PlayerModuleC).addAdvToken(advCount);
                P_Tips.show(`恭喜获得${advCount}张券`);
            } else {
                UIService.getUI(AdsPanel).showRewardAd(() => {
                    ModuleService.getModule(PlayerModuleC).addAdvToken(advCount);
                    P_Tips.show(`恭喜获得${advCount}张券`);
                }, `免费领取${advCount}张广告券`, `取消`, `领取`);
            }
        })
        this.mBtn_Exchange.onClicked.add(() => {
            ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(true);
        })
        this.mBtn_Ark.onClicked.add(() => {
            ModuleService.getModule(ArkModuleC).addOpenArkPanel();
        });
        this.mBtn_Set.onClicked.add(() => {
            UIService.getUI(SetPanel).show();
        });
    }
    setText() {
        this.mText_Watch.text = (GameConfig.Text.getElement(20003).Content);
        this.mUIText20009_txt.text = (GameConfig.Text.getElement(20009).Content);
    }
    public static showHallUI() {
        UIService.show(this, mw.UILayerMiddle);
        ModuleService.getModule(BubbleModuleC).refreshBubble();
    }
    public static closeHallUI() {
        UIService.hide(this);
    }
    public showShop() {
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump.visibility = (mw.SlateVisibility.Collapsed);
        this.mImg_Jump_BG.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Shop.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_PlayerInf.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Skill.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_lottery.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Skill.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Member.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Exchange.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_AD.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Ark.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Set.visibility = (mw.SlateVisibility.Collapsed);
    }
    public hideShop() {
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mBtn_Jump.visibility = (mw.SlateVisibility.Visible);
        this.mImg_Jump_BG.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Shop.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_PlayerInf.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Skill.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_lottery.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Member.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Exchange.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_AD.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Ark.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Set.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
    }
    public showLottery() {
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump.visibility = (mw.SlateVisibility.Collapsed);
        this.mImg_Jump_BG.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Shop.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_PlayerInf.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Skill.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_lottery.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Skill.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Member.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Exchange.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_AD.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Ark.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Set.visibility = (mw.SlateVisibility.Collapsed);
    }
    public hideLottery() {
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mBtn_Jump.visibility = (mw.SlateVisibility.Visible);
        this.mImg_Jump_BG.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Shop.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_PlayerInf.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Skill.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_lottery.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Member.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Exchange.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_AD.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Ark.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Set.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
    }
    public static setHallTime(stime: string) {
        P_Hall.instance.mText_CountDown.text = (stime);
    }
    public static setHallTip(tipid: number) {
        let tipstr: string;
        tipstr = GameConfig.Text.getElement(tipid).Content;
        P_Hall.instance.mText_CountExplain.text = (tipstr);
    }
    public static setHallWaitNum(curnum: number) {
        P_Hall.instance.mText_CountDown.text = ("" + curnum + "/" + Globals.startMin);
    }
    public static setHallHeadImg(roleId: number) {
        P_Hall.instance.mImg_HeadIcon.imageGuid = (GameConfig.Role.getElement(roleId).HeadPortrait.toString());
    }
    public static setHallGoldNum(num: number) {
        P_Hall.instance.mText_CoinsNumber.text = num.toString();
        ModuleService.getModule(ShopModuleC).changeCoin(num);
        ModuleService.getModule(LotteryModuleC).changeCoin(num);
    }
    public static setHallDiamondNum(num: number) {
        P_Hall.instance.mText_DiamondNumber.text = num.toString();
        ModuleService.getModule(ShopModuleC).changeDiamond(num);
    }
    public static setHallAdvNum(num: number) {
        ModuleService.getModule(ShopModuleC).changeAdvToken(num);
        ModuleService.getModule(ExchangeModuleC).refreshExchangeItem();
        P_Hall.instance.mText_DiamondNumber.text = num.toString();
        Event.dispatchToLocal(`UpdateAdv`, num);
    }
    public static setHallPlayerName(name: string) {
        P_Hall.instance.mText_PlayerName.text = name;
    }
}