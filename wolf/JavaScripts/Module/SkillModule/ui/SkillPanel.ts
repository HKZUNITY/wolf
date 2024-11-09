
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.09-14.11.08
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import SkillPaneel_Generate from "../../../ui-generate/module/SkillModule/SkillPaneel_generate";
import { SkillShopData } from "../SkillData";
import { SkillModuleC } from "../SkillModuleC";
import { IItemRender, UIMultiScroller } from "../SuperScrollView";
import SkillInfoPanel from "./SkillInfoPanel";
import SkillItem from "./SkillItem";

export default class SkillPanel extends SkillPaneel_Generate {
	private _mScroll: UIMultiScroller;
	private showList: Array<SkillShopData> = new Array<SkillShopData>();

	private skillInfoPanel: SkillInfoPanel = null;
	private get getSkillInfoPanel(): SkillInfoPanel {
		if (!this.skillInfoPanel) {
			this.skillInfoPanel = UIService.getUI(SkillInfoPanel);
		}
		return this.skillInfoPanel;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initMultiScroll();
		this.mBtn_Close.onClicked.add(() => {
			ModuleService.getModule(SkillModuleC).isOpenSkillShopPanel(false);
		})
	}

	/**初始化辅助模块 */
	private initMultiScroll() {
		this._mScroll = new UIMultiScroller(this.mScrollBox, this.mCanvas_Content, SkillItem, 5, 30, 20, 180, 220, 3, 20, 20);
		this._mScroll.ItemCallback.add(this.onRefreshItem, this);
		this._mScroll.InitCallback.add(this.onInitItem, this);
	}

	public refreshSkillShop(showList: Array<SkillShopData>) {
		this.showList = showList;
		this._mScroll.setData(showList);
	}

	private onRefreshItem(index: number, renderItem: SkillItem) {
		let data = this.showList[index];
		renderItem.setData(data);
		renderItem["setData_data"] = data;
	}

	private onInitItem(index: number, renderItem: IItemRender) {
		let btn = renderItem.clickObj;
		if (btn) {
			btn.onClicked.add(() => {
				let data = renderItem["setData_data"];
				this.getSkillInfoPanel.showSkillDesc(data);
			})
		}
	}

}
