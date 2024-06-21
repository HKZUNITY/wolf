/*
 * @Author: ZiweiShen
 * @Date: 2022-07-08 14:19:17
 * @LastEditors: xicun.kang
 * @LastEditTime: 2022-12-08 15:38:21
 * @FilePath: \townmystery\JavaScripts\UILogic\Hall\P_Hall.ts
 * @Description: 
 */
import AdsPanel from "../../AdsPanel";
import { Globals } from "../../Globals";
import { MGSHome } from "../../MGSHome";
import { BubbleModuleC } from "../../Module/bubbleModule/BubbleModule";
import ExchangeModuleC from "../../Module/ExchangeModule/ExchangeModuleC";
import { LotteryModuleC } from "../../Module/LotteryModule/LotteryModuleC";
import { PlayerModuleC } from "../../Module/PlayerModule/PlayerModuleC";
import { WatchModuleC } from "../../Module/ProcModule/WatchModule";
import { ShopModuleC } from "../../Module/ShopModule/ShopCityModule";
import { SkillModuleC } from "../../Module/SkillModule/SkillModuleC";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from '../../Tools';
import MainMenu from "../../uiTemplate/Hall/MainMenu";
export default class P_Hall extends MainMenu {
    private static _instance: P_Hall;
    public static get instance(): P_Hall {
        if (this._instance == null) {
            this._instance = UIService.create(P_Hall);
            this._instance.setText();
        }
        return this._instance;
    }
    onStart() {
        if (Tools.isRewardActive()) {
            this.mCanvas_AD.visibility = (mw.SlateVisibility.Visible);
        }
        else {
            this.mCanvas_AD.visibility = (mw.SlateVisibility.Collapsed);
        }
        // this.mCanvas_Member.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump.focusable = (false);
        this.mBtn_Jump.onPressed.add(() => {
            if (Player.localPlayer.character.isJumping) return;
            Player.localPlayer.character.jump();
        })
        this.mBtn_Watch.onClicked.add(() => {
            ModuleService.getModule(WatchModuleC).watchOther();
            MGSHome.mgsResource3(0, true);
        })
        this.mBtn_Shop.onClicked.add(() => {
            ModuleService.getModule(ShopModuleC).ShopOpen(true);
            MGSHome.mgsResource3(1, true);
        })
        this.mBtn_lottery.onClicked.add(() => {
            ModuleService.getModule(LotteryModuleC).lotteryOpen(true)
            MGSHome.mgsResource3(2, true);
        });
        this.mBtn_Skill.onClicked.add(() => {
            ModuleService.getModule(SkillModuleC).isOpenSkillShopPanel(true);
            MGSHome.mgsResource3(3, true);
        })
        this.mBtn_Member.onClicked.add(() => {
            // ModuleService.getModule(SVIPModuleC).isOpenBuySvipPanel(true);
            UIService.getUI(AdsPanel).showRewardAd(() => {
                ModuleService.getModule(PlayerModuleC).addAdvToken(2);
            }, "免费领取2张广告券", "取消", "领取");
            MGSHome.mgsResource3(4, true);
        })
        this.mBtn_Exchange.onClicked.add(() => {
            ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(true);
            MGSHome.mgsResource3(5, true);
        })

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
        //还差一个兑换券
    }
    public static setHallPlayerName(name: string) {
        P_Hall.instance.mText_PlayerName.text = name;
    }
}