import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import BagItem_Generate from "../../../ui-generate/module/DanMuModule/BagItem_generate";
import DanMuModuleC from "../DanMuModuleC";

export default class BagItem extends BagItem_Generate {
	private danMuModuleC: DanMuModuleC = null;
	private get getDanMuModuleC(): DanMuModuleC {
		if (!this.danMuModuleC) {
			this.danMuModuleC = ModuleService.getModule(DanMuModuleC);
		}
		return this.danMuModuleC;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.bindButton();
	}

	private bindButton(): void {
		this.mClickButton.onClicked.add(this.addClickButton.bind(this));
	}

	private isCanClick: boolean = true;
	private addClickButton(): void {
		if (!this.isCanClick) return;
		this.isCanClick = false;
		TimeUtil.delaySecond(3).then(() => { this.isCanClick = true; });
		this.getDanMuModuleC.onClickBagItemAction.call(this.bagId);
	}

	private bagId: number = 0;
	public setDatas(bagId: number): void {
		this.bagId = bagId;
		let actionPropElement = GameConfig.ActionProp.getElement(this.bagId);
		if (actionPropElement.Icon) {
			Tools.setImageByAssetIconData(this.mIconImage, actionPropElement.Icon);
		} else {
			Tools.setImageByAssetIconData(this.mIconImage, actionPropElement.AssetId);
		}
	}
}
