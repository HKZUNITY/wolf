import { GameConfig } from "../../Tables/GameConfig";
import Skill_Generate from "../../ui-generate/uiTemplate/Hall/Skill_generate";
import P_SkillShopItem from "./P_SkillShopItem";
import P_SkillShopItemDesc from "./P_SkillShopItemDesc";
import { SkillModuleC } from "./SkillModuleC";
import { IItemRender, UIMultiScroller } from "./SuperScrollView";

export default class P_SkillShop extends Skill_Generate {
	private _mScroll: UIMultiScroller;
	private showList: Array<SkillShopData> = new Array<SkillShopData>();

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.initMultiScroll();
		this.mBtn_Close.onClicked.add(() => {
			ModuleService.getModule(SkillModuleC).isOpenSkillShopPanel(false);
		})
	}
	/**初始化辅助模块 */
	private initMultiScroll() {
		this._mScroll = new UIMultiScroller(this.mScrollBox, this.mCanvas_Content, P_SkillShopItem, 5, 30, 20, 180, 220, 3, 20, 20);
		this._mScroll.ItemCallback.add(this.onRefreshItem, this);
		this._mScroll.InitCallback.add(this.onInitItem, this);
	}

	public refreshSkillShop(showList: Array<SkillShopData>) {
		this.showList = showList;
		this._mScroll.setData(showList);
	}

	private onRefreshItem(index: number, renderItem: P_SkillShopItem) {
		let data = this.showList[index];
		renderItem.setData(data);
		renderItem["setData_data"] = data;
	}

	private onInitItem(index: number, renderItem: IItemRender) {
		let btn = renderItem.clickObj;
		if (btn) {
			btn.onClicked.add(() => {
				let data = renderItem["setData_data"];
				P_SkillShopItemDesc.instance.showSkillDesc(data);
			})
		}
	}

}

export class SkillShopData {
	public skillId: number;
	public isBuy: boolean;
	public showIndex: number;
	public isUse: boolean;
	public remainTime: number;
	constructor(skillId, isBuy, isUse, remainTime: number) {
		this.skillId = skillId;
		this.isBuy = isBuy;
		this.isUse = isUse;
		let dataInfo = GameConfig.SkillShop.getElement(this.skillId);
		this.showIndex = dataInfo.Sequence;
		this.remainTime = remainTime;
	}
}
