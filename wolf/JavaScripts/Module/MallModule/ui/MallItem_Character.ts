import { Globals } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import MallItem_Character_Generate from "../../../ui-generate/module/MallModule/MallItem_Character_generate";
import Utils from "../../../Utils";
import { TabType, Tab1Type } from "../MallData";
import MallModuleC from "../MallModuleC";

export default class MallItem_Character extends MallItem_Character_Generate {
	private mallModuleC: MallModuleC = null;
	private get getMallModuleC(): MallModuleC {
		if (!this.mallModuleC) {
			this.mallModuleC = ModuleService.getModule(MallModuleC);
		}
		return this.mallModuleC;
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
		this.bindAction();
	}

	private initUI(): void {
		this.mIconImage.imageGuid = `32115`;
		this.updateSelectStateUI();
	}

	private bindButton(): void {
		this.mSelectButton.onClicked.add(this.addItemButton.bind(this));
		this.mDeleteButton.onClicked.add(this.addDeleteButton.bind(this));
	}

	private bindAction(): void {
		this.getMallModuleC.onSelectItemAction.add(this.addSelectItemAction.bind(this));
	}

	private addItemButton(): void {
		this.getMallModuleC.onSelectItemAction.call(this.tabType, this.tabId, this.assetId);
	}

	private addDeleteButton(): void {
		this.getMallModuleC.onDeleteItemAction.call(this.tabType, this.tabId, this.assetId);
	}

	private tabType: TabType = TabType.None;
	private tabId: number = 0;
	private assetId: string = null;
	public initItem(tabType: TabType, tabId: number, assetId: string, length: number): void {
		this.tabType = tabType;
		this.tabId = tabId;
		this.assetId = assetId;
		switch (tabId) {
			case Tab1Type.Tab1_Collection:
				if (assetId == `0`) {
					Utils.setWidgetVisibility(this.mIconCanvas, mw.SlateVisibility.Collapsed);
					Utils.setWidgetVisibility(this.mAddCanvas, mw.SlateVisibility.SelfHitTestInvisible);
					this.mAddTextBlock.text = StringUtil.format(GameConfig.Language.Text_SaveCurrentCharacter.Value, length, Globals.savaMaxCount);
				} else {
					Utils.setWidgetVisibility(this.mIconCanvas, mw.SlateVisibility.SelfHitTestInvisible);
					Utils.setWidgetVisibility(this.mAddCanvas, mw.SlateVisibility.Collapsed);
					this.mIconImage.imageInfo.setByAssetIcon(this.getMallModuleC.getCharacterDataUpAssetIdByKey(assetId), mw.AssetIconSize.Icon_128px);
				}
				break;
			default:
				break;
		}
		this.updateSelectState(false);
	}

	private addSelectItemAction(tabType: TabType, tabId: number, assetId: string): void {
		if (this.tabType != tabType || this.tabId != tabId) return;
		this.updateSelectState(this.assetId == assetId);
	}

	private isSelect: boolean = false;
	public updateSelectState(isSelect: boolean): void {
		if (this.isSelect == isSelect) return;
		this.isSelect = isSelect;
		this.updateSelectStateUI();
	}

	public updateSelectStateUI(): void {
		this.mSelectButton.renderOpacity = this.isSelect ? 1 : 0;
	}
}