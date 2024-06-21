
/** 
 * AUTHOR: 达瓦里氏
 * TIME: 2023.07.17-10.30.57
 */

import { GameConfig } from "../../Tables/GameConfig";
import SkillItem_Generate from "../../ui-generate/uiTemplate/Hall/SkillItem_generate";
import { SkillShopData } from "./P_SkillShop";
import { IItemRender } from "./SuperScrollView";

export default class P_SkillShopItem extends SkillItem_Generate implements IItemRender {

	private skillShopData: SkillShopData;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
	}

	setData(data: SkillShopData): void {
		this.skillShopData = data;
		let dataInfo = GameConfig.SkillShop.getElement(data.skillId);
		this.mImg_Icon.imageGuid = dataInfo.IconGUID.toString();
		this.mText_Name.text = dataInfo.Name;
		this.setEquip(data.isUse);
		if (dataInfo.Max > 0 && data.remainTime > 0) {
			this.mText_Num.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
		else{
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

	setEquip(bool: boolean){
		if (bool) {
			this.mImg_Equip.visibility = mw.SlateVisibility.HitTestInvisible;
		}
		else{
			this.mImg_Equip.visibility = mw.SlateVisibility.Collapsed;
		}
	}


	
}
