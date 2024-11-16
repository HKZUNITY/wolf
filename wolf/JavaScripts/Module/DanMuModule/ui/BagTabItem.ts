import BagTabItem_Generate from "../../../ui-generate/module/DanMuModule/BagTabItem_generate";
import DanMuModuleC from "../DanMuModuleC";

export default class BagTabItem extends BagTabItem_Generate {
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
		this.initUI();
		this.bindButton();
	}

	private initUI(): void {
		this.mClickButton.normalImageGuid = `221282`;
		this.mClickButton.pressedImageGuid = `221283`;
		this.mClickButton.disableImageGuid = `221283`;
	}

	private bindButton(): void {
		this.mClickButton.onClicked.add(this.addClickButton.bind(this));
		this.getDanMuModuleC.onClickBagTabAction.add(this.addClickActionTabAction.bind(this));
	}

	private addClickButton(): void {
		this.getDanMuModuleC.onClickBagTabAction.call(this.index);
	}

	private addClickActionTabAction(index: number): void {
		if (index == this.index) {
			this.select(true);
		} else {
			this.select(false);
		}
	}

	private index: number = 0;
	public setDatas(index: number, name: string): void {
		this.index = index;
		let nameStr = name.split(`-`);
		this.mTabNameTextBlock.text = nameStr[1];//TODO:LanguageId
	}

	private isSelect: boolean = false;
	public select(isSelect: boolean): void {
		if (this.isSelect == isSelect) return;
		this.isSelect = isSelect;
		let icon = isSelect ? `221283` : `221282`;
		this.mClickButton.normalImageGuid = icon;
	}
}
