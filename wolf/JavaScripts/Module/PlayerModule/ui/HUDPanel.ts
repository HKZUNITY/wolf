
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.09-13.12.05
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { Notice } from "../../../CommonUI/notice/Notice";
import { Globals } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import HUDPanel_Generate from "../../../ui-generate/module/HUDModule/HUDPanel_generate";
import AdsPanel from "../../AdsModule/ui/AdsPanel";
import DanMuModuleC from "../../DanMuModule/DanMuModuleC";
import ExchangeModuleC from "../../ExchangeModule/ExchangeModuleC";
import { LotteryModuleC } from "../../LotteryModule/LotteryModuleC";
import { WatchModuleC } from "../../ProcModule/WatchModule";
import { SetPanel } from "../../SetModule/SetModule";
import ShopModuleC from "../../ShopModule/ShopModuleC";
import { SkillModuleC } from "../../SkillModule/SkillModuleC";
import { PlayerModuleC } from "../PlayerModuleC";

export default class HUDPanel extends HUDPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.setText();

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
		this.mBtn_Member.onClicked.add(() => {
			if (!Globals.isOpenIAA) {
				ModuleService.getModule(PlayerModuleC).addAdvToken(advCount);
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_8.Value, advCount));
			} else {
				UIService.getUI(AdsPanel).showRewardAd(() => {
					ModuleService.getModule(PlayerModuleC).addAdvToken(advCount);
					Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_8.Value, advCount));
				}, StringUtil.format(GameConfig.Language.Text_Ads_9.Value, advCount), GameConfig.Language.Text_Content_20022.Value, GameConfig.Language.Text_Content_20030.Value);
			}
		})
		this.mAddAdsButton.onClicked.add(() => {
			if (!Globals.isOpenIAA) {
				ModuleService.getModule(PlayerModuleC).addAdvToken(advCount);
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_8.Value, advCount));
			} else {
				UIService.getUI(AdsPanel).showRewardAd(() => {
					ModuleService.getModule(PlayerModuleC).addAdvToken(advCount);
					Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_8.Value, advCount));
				}, StringUtil.format(GameConfig.Language.Text_Ads_9.Value, advCount), GameConfig.Language.Text_Content_20022.Value, GameConfig.Language.Text_Content_20030.Value);
			}
		});
		let getCoinCount: number = 100;
		this.mAddCoinButton.onClicked.add(() => {
			if (!Globals.isOpenIAA) {
				ModuleService.getModule(PlayerModuleC).addCoin(getCoinCount);
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_6.Value, getCoinCount));
			} else {
				mw.UIService.getUI(AdsPanel).showRewardAd(() => {
					ModuleService.getModule(PlayerModuleC).addCoin(getCoinCount);
					Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_6.Value, getCoinCount));
				}, StringUtil.format(GameConfig.Language.Text_Ads_7.Value, getCoinCount), GameConfig.Language.Text_Content_20022.Value, GameConfig.Language.Text_Content_20030.Value);
			}
		});
		this.mBtn_Exchange.onClicked.add(() => {
			ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(true);
		})
		this.mBtn_Ark.onClicked.add(() => {
			// ModuleService.getModule(ArkModuleC).addOpenArkPanel();
		});
		this.mBtn_Set.onClicked.add(() => {
			UIService.getUI(SetPanel).show();
		});
	}

	setText() {
		this.mText_Watch.text = (GameConfig.Text.getElement(20003).Content);
		this.mUIText20009_txt.text = (GameConfig.Text.getElement(20009).Content);
		if (Globals.languageId == 0) {
			this.mText_Exchange.fontSize = 15;
		}
	}
	public showHallUI() {
		this.show();
		ModuleService.getModule(DanMuModuleC).refreshBubble();
	}
	public closeHallUI() {
		this.hide();
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
	public setHallTime(stime: string) {
		this.mText_CountDown.text = (stime);
	}
	public setHallTip(tipid: number) {
		let tipstr: string;
		tipstr = GameConfig.Text.getElement(tipid).Content;
		this.mText_CountExplain.text = (tipstr);
	}
	public setHallWaitNum(curnum: number) {
		this.mText_CountDown.text = ("" + curnum + "/" + Globals.startMin);
	}
	public setHallHeadImg(roleId: number) {
		this.mImg_HeadIcon.imageGuid = (GameConfig.Role.getElement(roleId).HeadPortrait.toString());
	}
	public setHallGoldNum(num: number) {
		this.mText_CoinsNumber.text = num.toString();
		ModuleService.getModule(ShopModuleC).changeCoin(num);
		ModuleService.getModule(LotteryModuleC).changeCoin(num);
	}
	public setHallDiamondNum(num: number) {
		this.mText_DiamondNumber.text = num.toString();
		ModuleService.getModule(ShopModuleC).changeDiamond(num);
	}
	public setHallAdvNum(num: number) {
		ModuleService.getModule(ShopModuleC).changeAdvToken(num);
		ModuleService.getModule(ExchangeModuleC).refreshExchangeItem();
		this.mText_DiamondNumber.text = num.toString();
		Event.dispatchToLocal(`UpdateAdv`, num);
	}
	public setHallPlayerName(name: string) {
		this.mText_PlayerName.text = name;
	}
}
