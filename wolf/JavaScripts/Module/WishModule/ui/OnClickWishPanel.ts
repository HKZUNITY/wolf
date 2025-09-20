
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2025.09.19-22.42.59
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import OnClickWishPanel_Generate from "../../../ui-generate/module/WishModule/OnClickWishPanel_generate";
import { WishDataV0 } from "../WishData";
import WishModuleC from "../WishModuleC";

export default class OnClickWishPanel extends OnClickWishPanel_Generate {
	private wishModuleC: WishModuleC = null;
	private get getWishModuleC(): WishModuleC {
		if (!this.wishModuleC) {
			this.wishModuleC = ModuleService.getModule(WishModuleC);
		}
		return this.wishModuleC;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.bindButtons();
	}

	/**按钮绑定 */
	private bindButtons(): void {
		this.mClickBtn.onClicked.add(this.onClickButtons.bind(this));
	}

	private onClickButtons(): void {
		this.getWishModuleC.onBuyAction.call(this.wishDataV0);
	}

	private wishDataV0: WishDataV0 = null;
	public updateWishDataV0(wishDataV0: WishDataV0): void {
		this.wishDataV0 = wishDataV0;
	}
}
