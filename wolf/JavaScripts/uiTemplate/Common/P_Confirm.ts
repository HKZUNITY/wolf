/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-28 11:52:17
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-28 13:27:16
 * @FilePath     : \murdermystery3\JavaScripts\uiTemplate\Common\P_Confirm.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: 达瓦里氏
 * TIME: 2023.07.28-11.52.26
 */

import { Globals } from "../../Globals";
import SVIPModuleC from "../../Module/SVipModule/SVIPModuleC";
import { GameConfig } from "../../Tables/GameConfig";
import Confirm_Generate from "../../ui-generate/uiTemplate/Hall/Confirm_generate";

export default class P_Confirm extends Confirm_Generate {
	private _instance: P_Confirm;
	public get instance(): P_Confirm {
		if (!this._instance) {
			this._instance = mw.UIService.create(P_Confirm);
		}
		return this._instance;
	}
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.mBtn_Buy.onClicked.add(()=>{
			mw.UIService.hideUI(this);
		})
	}

	public showVIPConfirm(giftId: number){
		let dataInfo = GameConfig.Member.getElement(giftId);
		this.mImg_Icon.imageGuid = dataInfo.IconGUID.toString();
		this.mText_Name.text = dataInfo.Name;
		this.mText_Price.text = "1";
		this.mImg_Price.imageGuid = Globals.goldenKeyIcon;
		this.mBtn_Buy.onClicked.clear();
		this.mBtn_Buy.onClicked.add(()=>{
			ModuleService.getModule(SVIPModuleC).tryUseGoldenKeyByGift(giftId);
		})
	}
	
}
