
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.09-14.11.20
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../../Tables/GameConfig";
import SkillInfoPanel_Generate from "../../../ui-generate/module/SkillModule/SkillInfoPanel_generate";
import { SkillShopData } from "../SkillData";
import { SkillModuleC } from "../SkillModuleC";
import { GoldType } from "../SkillModuleS";

export default class SkillInfoPanel extends SkillInfoPanel_Generate {
	public skillShopData: SkillShopData;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.mBtn_Price1_Buy.onClicked.add(() => {
			if (this.skillShopData) {
				ModuleService.getModule(SkillModuleC).buySkill(this.skillShopData.skillId, GoldType.Gold);
			}
		})
		this.mBtn_Price2_Buy.onClicked.add(() => {
			if (this.skillShopData) {
				ModuleService.getModule(SkillModuleC).buySkill(this.skillShopData.skillId, GoldType.Diamond);
			}
		})
		this.mBtn_Close.onClicked.add(() => {
			this.hide();
		})
		this.mBtn_Price3_Buy.onClicked.add(() => {
			if (this.skillShopData) {
				ModuleService.getModule(SkillModuleC).buySkill(this.skillShopData.skillId, GoldType.Adv);
			}
		})
	}

	public showSkillDesc(data: SkillShopData) {
		this.skillShopData = data;
		let dataInfo = GameConfig.SkillShop.getElement(data.skillId);
		this.mImg_Icon.imageGuid = dataInfo.IconGUID.toString();
		let name = dataInfo.Name;
		this.mText_Name.text = name.replace(/[\r\n]/g, "");
		this.mText_Des.text = dataInfo.Description;
		if (dataInfo.Max > 0 && data.remainTime > 0) {
			this.mText_Num.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
		else {
			this.mText_Num.visibility = mw.SlateVisibility.Collapsed;
		}
		this.mText_Num.text = data.remainTime.toString();
		if (data.isBuy == false || dataInfo.Max > 0) {
			this.mCanvas_Price.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mCanvas_Own.visibility = mw.SlateVisibility.Collapsed;
			let costArr = dataInfo.PriceType;
			this.mCanvas_Price_1.visibility = mw.SlateVisibility.Collapsed;
			this.mCanvas_Price_2.visibility = mw.SlateVisibility.Collapsed;
			this.mBtn_Price1_Buy.visibility = mw.SlateVisibility.Collapsed;
			this.mBtn_Price2_Buy.visibility = mw.SlateVisibility.Collapsed;
			this.mCanvas_Exchange.visibility = mw.SlateVisibility.Collapsed;
			costArr.forEach((value, index) => {
				if (value == GoldType.Gold) {
					this.mCanvas_Price_1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.mText_Price_1.text = dataInfo.PriceNum[index].toString();
					this.mBtn_Price1_Buy.visibility = mw.SlateVisibility.Visible;
				}
				else if (value == GoldType.Diamond) {
					this.mCanvas_Price_2.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.mText_Price_2.text = dataInfo.PriceNum[index].toString();
					this.mBtn_Price2_Buy.visibility = mw.SlateVisibility.Visible;
				}
				else if (value == GoldType.Adv) {
					this.mCanvas_Exchange.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.mText_Price_3.text = dataInfo.PriceNum[index].toString();
					this.mText_Price_3.visibility = mw.SlateVisibility.Visible;
				}
			})
		}
		//兑换会出现既显示购买也显示装备的情况
		if (data.isBuy) {
			this.mCanvas_Price.visibility = mw.SlateVisibility.Collapsed;
			if (dataInfo.Max > 0) {
				this.mCanvas_Exchange.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			}
			else {
				this.mCanvas_Exchange.visibility = mw.SlateVisibility.Collapsed;
			}

			this.mCanvas_Own.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			if (data.isUse) {
				this.mCanvas_Equip.visibility = mw.SlateVisibility.SelfHitTestInvisible;
				this.mText_Own.visibility = mw.SlateVisibility.Collapsed;
			}
			else {
				this.mCanvas_Equip.visibility = mw.SlateVisibility.Collapsed;
				this.mText_Own.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			}
		}
		this.changeEquipButton();
		this.show();
	}

	private changeEquipButton() {
		this.mBtn_Use.onClicked.clear();
		if (this.skillShopData.isUse) {
			this.mBtn_Use.onClicked.add(() => {
				ModuleService.getModule(SkillModuleC).unequipSkill(this.skillShopData.skillId);
			})
			this.mBtn_Use.text = GameConfig.Text.getElement("12030").Content;
		}
		else {
			this.mBtn_Use.onClicked.add(() => {
				ModuleService.getModule(SkillModuleC).equipSkill(this.skillShopData.skillId);
			})
			this.mBtn_Use.text = GameConfig.Text.getElement("12029").Content;
		}
	}
}
