import { Globals } from "../../../Globals";
import ActionItem_Generate from "../../../ui-generate/module/DanMuModule/ActionItem_generate";
import { ActionData } from "../DanMuData";
import DanMuModuleC from "../DanMuModuleC";

export default class ActionItem extends ActionItem_Generate {
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
		TimeUtil.delaySecond(1).then(() => { this.isCanClick = true; });
		this.getDanMuModuleC.onClickActionItemAction.call(this.index);
	}

	private index: number = 0;
	public setDatas(tabIndex: number, index: number, actionData: ActionData): void {
		this.index = index;
		this.mIconImage.imageGuid = tabIndex != 1 ? actionData.icon : actionData.icon.split('-')[1];
		this.nNameTextBlock.text = actionData.names[Globals.languageId];
	}
}
