
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2025.09.19-15.49.28
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { EventType } from "../../../Globals";
import WishPanel_Generate from "../../../ui-generate/module/WishModule/WishPanel_generate";
import Utils from "../../../Utils";
import ChatPanel from "../../DanMuModule/ui/ChatPanel";
import JoystickPanel from "../../GameModule/ui/JoystickPanel";
import HUDPanel from "../../PlayerModule/ui/HUDPanel";
import RankPanel from "../../RankModule/ui/RankPanel";
import { WishDataV0 } from "../WishData";
import WishModuleC from "../WishModuleC";
import WishTools from "../WishTools";
import WishItem from "./WishItem";

export default class WishPanel extends WishPanel_Generate {
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
		this.bindButton();
		this.bindAction();
	}

	private bindButton(): void {
		this.mSaveButton.onClicked.add(this.addSaveButton.bind(this));
		this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
	}

	private addSaveButton(): void {
		this.getWishModuleC.onRequestBuyAction.call(this.wishDataV0);
	}

	private addCloseButton(): void {
		this.hide();
	}

	private bindAction(): void {
		this.getWishModuleC.onSelectItemAction.add(this.addSelectItemAction.bind(this));
	}

	private wishDataV0: WishDataV0 = null;
	private addSelectItemAction(wishDataV0: WishDataV0): void {
		this.wishDataV0 = wishDataV0;
		this.updateIcon();
	}

	private updateIcon(): void {
		let icon = this.wishDataV0.iconGuid;
		if (WishTools.pendantItemTypes.includes(this.wishDataV0.itemType)) {
			this.mItemIconImage.imageInfo.setByAssetIcon(this.wishDataV0.prefabGuid, mw.AssetIconSize.Icon_128px);
		} else {
			this.mItemIconImage.imageGuid = icon;
		}
	}

	private wishItems: WishItem[] = [];
	public refreshPanel(wishDataV0s: WishDataV0[]): void {
		if (wishDataV0s.length > this.wishItems.length) {
			for (let i = 0; i < this.wishItems.length; ++i) {
				this.wishItems[i].initItem(wishDataV0s[i]);
				Utils.setWidgetVisibility(this.wishItems[i].uiObject, mw.SlateVisibility.SelfHitTestInvisible);
			}
			for (let i = this.wishItems.length; i < wishDataV0s.length; ++i) {
				let worldItem = UIService.create(WishItem);
				worldItem.initItem(wishDataV0s[i]);
				this.mItemContentCanvas.addChild(worldItem.uiObject);
				this.wishItems.push(worldItem);
			}
		} else {
			for (let i = 0; i < wishDataV0s.length; ++i) {
				this.wishItems[i].initItem(wishDataV0s[i]);
				Utils.setWidgetVisibility(this.wishItems[i].uiObject, mw.SlateVisibility.SelfHitTestInvisible);
			}
			for (let i = wishDataV0s.length; i < this.wishItems.length; ++i) {
				Utils.setWidgetVisibility(this.wishItems[i].uiObject, mw.SlateVisibility.Collapsed);
			}
		}

		if (this.wishDataV0 && this.wishDataV0?.itemId != wishDataV0s[0]?.itemId) {
			this.getWishModuleC.onSelectItemAction.call(this.wishDataV0);
		} else {
			this.wishDataV0 = wishDataV0s[0];
			this.wishItems[0].updateSelectState(true);
			this.updateIcon();
		}

		this.show();
	}

	private chatPanel: ChatPanel = null;
	private get getChatPanel(): ChatPanel {
		if (!this.chatPanel) {
			this.chatPanel = mw.UIService.getUI(ChatPanel);
		}
		return this.chatPanel;
	}

	private rankPanel: RankPanel = null;
	private get getRankPanel(): RankPanel {
		if (!this.rankPanel) {
			this.rankPanel = UIService.getUI(RankPanel);
		}
		return this.rankPanel;
	}

	private hudPanel: HUDPanel = null;
	private get getHUDPanel(): HUDPanel {
		if (!this.hudPanel) {
			this.hudPanel = UIService.getUI(HUDPanel);
		}
		return this.hudPanel;
	}

	private joystickPanel: JoystickPanel = null;
	private get getJoystickPanel(): JoystickPanel {
		if (!this.joystickPanel) {
			this.joystickPanel = UIService.getUI(JoystickPanel);
		}
		return this.joystickPanel;
	}

	protected onShow(...params: any[]): void {
		this.getChatPanel.hide();
		this.getRankPanel.hide();
		this.getHUDPanel.mCanvas_PlayerInf.visibility = mw.SlateVisibility.Collapsed;
		this.getJoystickPanel.mMWVirtualJoystickPanelDesigner.visibility = mw.SlateVisibility.Collapsed;
		this.getJoystickPanel.mMWVirtualJoystickPanelDesigner.resetJoyStick();
		// this.canUpdate = true;
		// TouchScript.instance.addScreenListener(this.mTouchImage, this.onMoveTouchEvent.bind(this), false);
	}

	protected onHide(): void {
		this.getChatPanel.show();
		this.getRankPanel.show();
		this.getHUDPanel.mCanvas_PlayerInf.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.getJoystickPanel.mMWVirtualJoystickPanelDesigner.visibility = mw.SlateVisibility.Visible;
		this.getJoystickPanel.mMWVirtualJoystickPanelDesigner.resetJoyStick();
		// this.canUpdate = false;
		// TouchScript.instance.removeScreenListener(this.mTouchImage);
	}
}
