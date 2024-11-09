
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.09-13.31.26
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { Globals } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import MapChoosePanel_Generate from "../../../ui-generate/module/MapModule/MapChoosePanel_generate";
import { MapModuleC } from "../MapModule";

export default class MapChoosePanel extends MapChoosePanel_Generate {
	private mTabGroupBtns: Array<mw.StaleButton> = [];//tab的按钮序列
	private mGroupHands: Array<mw.Canvas> = [];
	private mGroupChoose: Array<mw.Canvas> = [];
	private mMapImgGroup: Array<mw.Image> = [];
	private mMapNameGroup: Array<mw.TextBlock> = [];
	private mMapNumGroup: Array<mw.TextBlock> = [];
	private tabGroup: mw.TabGroup<mw.StaleButton>;
	private curTime: number = 0;
	private curChoose: number = -1;

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerTop;
		this.initGroup();
	}

	showFinal(index: number) {
		this.mGroupChoose[index].visibility = (mw.SlateVisibility.SelfHitTestInvisible);
	}
	updateTime(time: number) {
		this.mText_ChooseTime.text = (time.toString());
		this.curTime = time;
		if (time <= 0) {
			this.mText_TopTips.text = (GameConfig.Text.getElement(20027).Content);
		}
	}
	updateChoose(infoList: Array<number>) {
		for (let i = 0; i < infoList.length; i++) {
			this.mMapNumGroup[i].text = (infoList[i].toString());
		}
	}
	showMapChooseUI(idList: Array<number>) {
		this.initMapInfo(idList);
		this.show();
	}
	initMapInfo(idList: Array<number>) {
		this.mText_TopTips.text = (GameConfig.Text.getElement(20026).Content);
		this.curChoose = -1;
		this.tabGroup.select(-1);
		this.curTime = Globals.chooseMapTime - 2;
		this.mText_ChooseTime.text = (this.curTime.toString());
		let mapNum = idList.length - 1;
		for (let i = 0; i < 3; i++) {
			if (i > mapNum) {
				let temp = i + 1;
				let can = this.mCanvas_MapChoose.getChildByName("mCanvas_Map" + temp);
				can.visibility = (mw.SlateVisibility.Collapsed);
			}
			else {
				let temp = i + 1;
				let can = this.mCanvas_MapChoose.getChildByName("mCanvas_Map" + temp);
				can.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
				let info = GameConfig.Level.getElement(idList[i]);
				this.mMapNameGroup[i].text = (info.Name);
				this.mMapImgGroup[i].imageGuid = (info.ImageGuid);
			}
			this.mGroupHands[i].visibility = (mw.SlateVisibility.Collapsed);
			this.mGroupChoose[i].visibility = (mw.SlateVisibility.Collapsed);
			this.mMapNumGroup[i].text = ("0");
		}
	}
	enableBtn(isUsable: boolean) {
		this.mTabGroupBtns.forEach((btn) => {
			if (isUsable) {
				btn.enable = (true);
			}
			else {
				btn.enable = (false);
			}
		})
	}
	initGroup() {
		this.mTabGroupBtns.push(this.mBtn_Map1);
		this.mTabGroupBtns.push(this.mBtn_Map2);
		this.mTabGroupBtns.push(this.mBtn_Map3);

		this.mGroupHands.push(this.mCanvas_PChoose1);
		this.mGroupHands.push(this.mCanvas_PChoose2);
		this.mGroupHands.push(this.mCanvas_PChoose3);

		this.mGroupChoose.push(this.mCanvas_SysChoose1);
		this.mGroupChoose.push(this.mCanvas_SysChoose2);
		this.mGroupChoose.push(this.mCanvas_SysChoose3);

		this.mMapImgGroup.push(this.mImage_Map1);
		this.mMapImgGroup.push(this.mImage_Map2);
		this.mMapImgGroup.push(this.mImage_Map3);

		this.mMapNameGroup.push(this.mText_Map1);
		this.mMapNameGroup.push(this.mText_Map2);
		this.mMapNameGroup.push(this.mText_Map3);

		this.mMapNumGroup.push(this.mText_ChooseNum1);
		this.mMapNumGroup.push(this.mText_ChooseNum2);
		this.mMapNumGroup.push(this.mText_ChooseNum3);

		//初始化标签组
		this.tabGroup = new mw.TabGroup(this.mTabGroupBtns);
		this.tabGroup.init((btn: mw.StaleButton, isSelect: boolean) => {
			if (this.curTime > 0) {
				let index = this.mTabGroupBtns.indexOf(btn);
				if (isSelect) {//To do
					this.mGroupHands[index].visibility = (mw.SlateVisibility.SelfHitTestInvisible);
				} else {
					this.mGroupHands[index].visibility = (mw.SlateVisibility.Collapsed);
				}
			}
		}, (selectIndex: number) => {
			if (this.curTime > 0) {
				if (this.curChoose == -1) {
					ModuleService.getModule(MapModuleC).chooseMap(selectIndex, true, this.curChoose);
				}
				else {
					if (this.curChoose != selectIndex) {
						ModuleService.getModule(MapModuleC).chooseMap(selectIndex, false, this.curChoose);
					}
				}
				this.curChoose = selectIndex;
			}
		},
			this, -1);
	}
}
