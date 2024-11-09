
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.09-14.11.15
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { Globals } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import SkillItem_Generate from "../../../ui-generate/module/SkillModule/SkillItem_generate";
import { SkillShopData } from "../SkillData";

export default class SkillItem extends SkillItem_Generate {
	private skillShopData: SkillShopData;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

	setData(data: SkillShopData): void {
		this.skillShopData = data;
		let dataInfo = GameConfig.SkillShop.getElement(data.skillId);
		this.mImg_Icon.imageGuid = dataInfo.IconGUID.toString();
		this.mText_Name.text = dataInfo.Name;
		if (Globals.languageId == 0) {
			this.mText_Name.fontSize = 12;
		}
		this.setEquip(data.isUse);
		if (dataInfo.Max > 0 && data.remainTime > 0) {
			this.mText_Num.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
		else {
			this.mText_Num.visibility = mw.SlateVisibility.Collapsed;
		}
		this.mText_Num.text = data.remainTime.toString();
	}
	get clickObj(): mw.StaleButton | mw.Button {
		return this.mBtn_Full;
	}
	//没有选取背景这个先空着
	setSelect(bool: boolean): void {

	}

	setEquip(bool: boolean) {
		if (bool) {
			this.mImg_Equip.visibility = mw.SlateVisibility.HitTestInvisible;
		}
		else {
			this.mImg_Equip.visibility = mw.SlateVisibility.Collapsed;
		}
	}

}
