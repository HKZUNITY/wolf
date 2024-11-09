import { Globals } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import ExchangePanel_Generate from "../../../ui-generate/module/ExchangeModule/ExchangePanel_generate";
import { PlayerModuleC } from "../../PlayerModule/PlayerModuleC";
import ShopModuleC from "../../ShopModule/ShopModuleC";
import { SkillModuleC } from "../../SkillModule/SkillModuleC";
import ExchangeModuleC from "../ExchangeModuleC";
import ExchangeItem from "./ExchangeItem";

export default class ExchangePanel extends ExchangePanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initPanel();
		this.refreshPanel();
	}
	private initPanel() {
		this.mBtn_Close.onClicked.add(() => {
			ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(false);
		})
		GameConfig.Exchange.getAllElement().forEach(dataInfo => {
			let item = mw.UIService.create(ExchangeItem);
			this.mCanvas_Content.addChild(item.uiObject);
			item.uiObject.size = item.rootCanvas.size;

			let iconStr = dataInfo.IconGUID;
			if (iconStr && iconStr[0] == `m`) {
				Tools.setImageByAssetIconData(item.mImg_Icon, iconStr.split(`_`)[1]);
			} else {
				item.mImg_Icon.imageGuid = dataInfo.IconGUID;
			}
			item.mText_Name.text = dataInfo.Name;
			if (Globals.languageId == 0) {
				item.mText_Name.fontSize = 12;
			} else {
				item.mText_Name.fontSize = 15;
			}
			let getText = dataInfo.GetNum;
			if (getText == null || getText == 0) {
				getText = 1;
			}
			item.mText_Num.text = getText.toString();
			item.mImg_AdCoupon.imageGuid = GameConfig.Rule.getElement(10044).Num.toString();
			item.mText_Tip_2.text = dataInfo.ConsumeNum.toString();
			if (dataInfo.ShopItem > 0) {
				item.mText_Tip_2.text = GameConfig.Shop.getElement(dataInfo.ShopItem).Price.toString();
			}
			else if (dataInfo.SkillShopItem > 0) {
				item.mText_Tip_2.text = GameConfig.SkillShop.getElement(dataInfo.SkillShopItem).PriceNum[0].toString();
			}
			if (dataInfo.GetType > 0) {
				item.mBtn_Exchange.text = GameConfig.Text.getElement(20052).Content;
			}
			else {
				item.mBtn_Exchange.text = GameConfig.Text.getElement(20053).Content;
			}
			item.mBtn_Exchange.onClicked.add(() => {
				/**兑换是直接走购买申请，其他的是走各自模块的逻辑，这里加一下货币检测 */
				if (dataInfo.GetType > 0) {
					ModuleService.getModule(ExchangeModuleC).exchangeItem(dataInfo.ID);
				}
				else if (dataInfo.ShopItem > 0) {
					ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(false);
					ModuleService.getModule(ShopModuleC).selectTargetItem(dataInfo.ShopItem);

				}
				else if (dataInfo.SkillShopItem > 0) {
					ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(false);
					ModuleService.getModule(SkillModuleC).isOpenSkillShopPanel(true);
				}
			})
		})
	}
	public refreshPanel() {
		this.mText_AdCouponNumber.text = ModuleService.getModule(PlayerModuleC).getPlayerAdvToken().toString();
	}
}
