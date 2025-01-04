import { Notice } from "../../../CommonUI/notice/Notice";
import { Globals } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import ShopPanel_Generate from "../../../ui-generate/module/ShopModule/ShopPanel_generate";
import AdsPanel from "../../AdsModule/ui/AdsPanel";
import { PlayerModuleData } from "../../PlayerModule/PlayerData";
import { PlayerModuleC } from "../../PlayerModule/PlayerModuleC";
import ShopModuleC from "../ShopModuleC";
import ShopModuleData, { ItemState } from "../ShopModuleData";
import ShopItem from "./ShopItem";

export default class ShopPanel extends ShopPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.setStyle(10, 10, 4);
	}

	//界面元素
	private mTabGroupBtns: Array<mw.StaleButton> = [];//tab的按钮序列
	//变量
	public tabGroup: mw.TabGroup<mw.StaleButton>;
	private goodsBoxArr: Array<ShopItem> = [];
	private rowSpacing: number = 15;//行距
	private columnSpacing: number = 10;//列距
	private rowGoodsNum: number = 4;//一行放几个
	private currentTabIndex: number = 0;//当前显示的标签
	private valuableBtnNum: number = 0;
	private curItem: ShopItem;
	private ownList: Array<ShopItem> = [];
	private notOwnList: Array<ShopItem> = [];
	private tabToShopIndexMap: Map<number, number> = new Map<number, number>();

	private initBtnString() {
		let totalMapNum = GameConfig.Shop.getElement(9999).Total;
		this.mTabGroupBtns.forEach((btn, index) => {
			if (index > totalMapNum - 1) {
				// btn.setButtonString(GameConfig.Text.getElement(40003).Content);
			}
			else {
				// btn.setButtonString(GameConfig.Text.getElement(40001 + index).Content);
				this.valuableBtnNum++;
			}
		})
	}

	protected onHide(): void {
		if (this.remainTimer) {
			TimeUtil.clearInterval(this.remainTimer);
			this.remainTimer = null;
		}
	}

	public init() {
		GameConfig.Shop.getAllElement().forEach((value) => {
			if (value.ID % 10000 == 0) {
				this.tabToShopIndexMap.set(value.Price, value.ID / 10000);
			}
		})

		//初始化基础元素
		this.mBtn_ShopClose.onClicked.add(() => {
			this.hide();
			this.curItem = null;
			ModuleService.getModule(ShopModuleC).ShopOpen(false);
		});
		this.mUIText20015_btn.onClicked.add(() => {//购买界面
			let money = GameConfig.Shop.getElement(this.curItem.itemId).Money;
			if (money == 0 || money == 1 || money == 5) {
				this.showBuyInfo();
			}
			else if (money == 3 || money == 4) {
				ModuleService.getModule(ShopModuleC).ShopOpen(false);
			}
		})
		this.mUIText20016_btn.onClicked.add(() => {//使用
			ModuleService.getModule(ShopModuleC).useItem(this.curItem.itemId, true);
		})
		this.mUIText20025_btn.onClicked.add(() => {//使用
			this.mCanvas_Result.visibility = (mw.SlateVisibility.Collapsed);
			ModuleService.getModule(ShopModuleC).useItem(this.curItem.itemId, true);
		})
		this.mUIText20017_btn.onClicked.add(() => {//使用中
			ModuleService.getModule(ShopModuleC).useItem(this.curItem.itemId, false);
		})
		this.mUIText20021_btn.onClicked.add(() => {//确定购买
			let curCoin = 0;
			let res = 1;
			let price = GameConfig.Shop.getElement(this.curItem.itemId).Price;
			let type = GameConfig.Shop.getElement(this.curItem.itemId).Money
			if (type == 0)
				curCoin = DataCenterC.getData(PlayerModuleData).getGold();
			else if (type == 1)
				curCoin = DataCenterC.getData(PlayerModuleData).getDiamond();
			else if (type == 5) {
				curCoin = ModuleService.getModule(PlayerModuleC).getPlayerAdvToken();
			}
			if (curCoin < price) {
				res = 0;
			}
			else {
				ModuleService.getModule(ShopModuleC).buyItem(this.curItem.itemId);
			}
			if (res == 1) {
				this.showBuySuccess();
			}
			else {
				Notice.showDownNotice(GameConfig.Tips.getElement(20002).Content);
			}

		})
		this.mUIText20022_btn.onClicked.add(() => {//取消购买
			this.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);
		})
		this.mBtn_VerifyReturn.onClicked.add(() => {//取消购买
			this.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);
		})
		this.mBtn_ResultReturn.onClicked.add(() => {//关闭购买成功界面
			this.mCanvas_Result.visibility = (mw.SlateVisibility.Collapsed);
		})

		//初始化标签组
		this.tabGroup = new mw.TabGroup(this.mTabGroupBtns);
		this.tabGroup.init((btn: mw.StaleButton, isSelect: boolean) => {
			if (isSelect) {
				btn.size = (new mw.Vector2(155, 100));
			} else {
				btn.size = (new mw.Vector2(155, 80));
			}
		}, (selectIndex: number) => {
			this.currentTabIndex = selectIndex;
			this.showGoods(this.currentTabIndex);
		},
			this);

		this.mAddCoinButton.onClicked.add(() => {
			if (!Globals.isOpenIAA) {
				ModuleService.getModule(PlayerModuleC).addCoin(Globals.addCoin);
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_6.Value, Globals.addCoin));
			} else {
				mw.UIService.getUI(AdsPanel).showRewardAd(() => {
					ModuleService.getModule(PlayerModuleC).addCoin(Globals.addCoin);
					Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_6.Value, Globals.addCoin));
				}, StringUtil.format(GameConfig.Language.Text_Ads_7.Value, Globals.addCoin), GameConfig.Language.Text_Content_20022.Value, GameConfig.Language.Text_Content_20030.Value);
			}
		});
		this.mAddCouponButton.onClicked.add(() => {
			if (!Globals.isOpenIAA) {
				ModuleService.getModule(PlayerModuleC).addAdvToken(Globals.advCount);
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_8.Value, Globals.advCount));
			} else {
				UIService.getUI(AdsPanel).showRewardAd(() => {
					ModuleService.getModule(PlayerModuleC).addAdvToken(Globals.advCount);
					Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Ads_8.Value, Globals.advCount));
				}, StringUtil.format(GameConfig.Language.Text_Ads_9.Value, Globals.advCount), GameConfig.Language.Text_Content_20022.Value, GameConfig.Language.Text_Content_20030.Value);
			}
		});
	}
	/**购买物品界面 */
	private showBuyInfo() {
		let info = GameConfig.Shop.getElement(this.curItem.itemId);
		// this.mImage_ItemIcon.imageGuid = (info.IconGuid);
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.mImage_ItemIcon, info.IconGuid.split(`_`)[1]);
		} else {
			this.mImage_ItemIcon.imageGuid = (info.IconGuid.toString());
		}
		this.mText_ItemName.text = (info.Name);
		this.mText_ItemPrice.text = (info.Price.toString());
		this.mCanvas_Verification.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
	}
	private showBuySuccess() {
		this.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);
		let info = GameConfig.Shop.getElement(this.curItem.itemId);
		// this.mImage_ItemGet.imageGuid = (info.IconGuid);
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.mImage_ItemGet, info.IconGuid.split(`_`)[1]);
		} else {
			this.mImage_ItemGet.imageGuid = (info.IconGuid.toString());
		}
		this.mText_ResultName.text = (info.Name);
		this.mCanvas_Result.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
	}
	private remainTimer;
	private showItemDetail(id: number, state: ItemState) {

		let info = GameConfig.Shop.getElement(id);
		// this.mImage_ItemShow.imageGuid = (info.IconGuid);
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.mImage_ItemShow, info.IconGuid.split(`_`)[1]);
		} else {
			this.mImage_ItemShow.imageGuid = (info.IconGuid.toString());
		}
		this.mText_ItemShowName.text = (info.Name);
		if (this.remainTimer) {
			TimeUtil.clearInterval(this.remainTimer);
			this.remainTimer = null;
		}
		let remain = ModuleService.getModule(ShopModuleC).getShopRemainTime(id);
		this.mText_Time.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.updateRemainTime(remain);
		if (remain > 0) {
			this.remainTimer = TimeUtil.setInterval(() => {
				remain--;
				this.updateRemainTime(remain);
			}, 1);
		}


		if (info.WeaponType == 1) {
			this.mUIText20010_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.mUIText20011_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.mUIText20019_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.mUIText20020_txt.visibility = (mw.SlateVisibility.Collapsed);

		}
		else if (info.WeaponType == 2) {
			this.mUIText20010_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.mUIText20011_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.mUIText20019_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.mUIText20020_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
		}
		else {
			this.mUIText20010_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.mUIText20011_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.mUIText20019_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.mUIText20020_txt.visibility = (mw.SlateVisibility.Collapsed);
		}
		if (info.Money == 0) {
			this.mImage_ItemPrice.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.mImage_ItemPrice_Diamond.visibility = (mw.SlateVisibility.Collapsed);
			this.mImage_ItemPrice_Ad.visibility = (mw.SlateVisibility.Collapsed);
		}
		else if (info.Money == 1) {
			this.mImage_ItemPrice.visibility = (mw.SlateVisibility.Collapsed);
			this.mImage_ItemPrice_Diamond.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.mImage_ItemPrice_Ad.visibility = (mw.SlateVisibility.Collapsed);
		}
		else if (info.Money == 5) {
			this.mImage_ItemPrice.visibility = (mw.SlateVisibility.Collapsed);
			this.mImage_ItemPrice_Diamond.visibility = (mw.SlateVisibility.Collapsed);
			this.mImage_ItemPrice_Ad.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
		}
		switch (state) {
			case ItemState.NotOwn:
				this.mUIText20015_btn.visibility = (mw.SlateVisibility.Visible);
				this.mUIText20016_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.mUIText20017_btn.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Own:
				this.mUIText20015_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.mUIText20016_btn.visibility = (mw.SlateVisibility.Visible);
				this.mUIText20017_btn.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Using:
				this.mUIText20015_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.mUIText20016_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.mUIText20017_btn.visibility = (mw.SlateVisibility.Visible);
				break;
		}

	}
	private updateRemainTime(remainTime: number) {
		if (remainTime >= 86400) {
			this.mText_Time.text = StringUtil.format(GameConfig.Text.getElement("20058").Content, Math.floor(remainTime / 86400));
		}
		else if (remainTime < 86400 && remainTime > 0) {
			this.mText_Time.text = StringUtil.format(GameConfig.Text.getElement("20055").Content, Tools.formatTime_2(remainTime));
		}
		else {
			this.mText_Time.text = "";
		}

		if (remainTime <= 0) {
			if (this.remainTimer) {
				TimeUtil.clearInterval(this.remainTimer);
				this.remainTimer = null;
			}
		}
	}

	public showGoods(tabIndex: number) {

		this.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);

		this.mCanvas_Result.visibility = (mw.SlateVisibility.Collapsed);

		if (this.tabToShopIndexMap.has(tabIndex + 1)) {
			let showIndex = this.tabToShopIndexMap.get(tabIndex + 1);
			if (tabIndex >= 0 && tabIndex < this.valuableBtnNum) {
				this.showAtlasByLevel(showIndex);
			}
			else {
				this.clearPage();
			}
			return;
		}

	}

	public showItemShop(itemId: number) {
		let mapIndex = Math.floor(itemId / 10000);
		let res = -1;
		this.tabToShopIndexMap.forEach((value, index) => {
			if (value == mapIndex) {
				res = index - 1;
			}
		});
		this.tabGroup.select(res);
		this.showGoods(res);
		this.ownList.forEach((value, index) => {
			if (value.itemId == itemId) {
				this.itemClickHandler(value, value.itemId, value.itemState);
			}
		})
		this.notOwnList.forEach((value, index) => {
			if (value.itemId == itemId) {
				this.itemClickHandler(value, value.itemId, value.itemState);
			}
		})
	}

	updateCurPage() {
		let showIndex = this.tabToShopIndexMap.get(this.currentTabIndex + 1);
		this.showAtlasByLevel(showIndex);
		if (!this.curItem) {
			return
		}
		this.mCanvas_ItemShow.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
		this.showItemDetail(this.curItem.itemId, this.curItem.itemState);
	}
	//刷新一页商品
	private refreshGoodsPage(tabIndex: number) {
		let mapId = tabIndex;
		let dataInfo = DataCenterC.getData(ShopModuleData).getShopDataByMap(mapId);
		let totalNum = GameConfig.Shop.getElement(mapId * 10000).Total;
		this.ownList.length = 0;
		this.notOwnList.length = 0;
		//设置商品列表
		for (let i = 1; i <= totalNum; i++) {
			let goodsBox: ShopItem = null;
			if (i <= this.goodsBoxArr.length) {
				goodsBox = this.goodsBoxArr[i - 1];
			} else {
				goodsBox = UIService.create(ShopItem);
				goodsBox.uiObject.size = new mw.Vector2(200, 350);
				this.goodsBoxArr.push(goodsBox);
				//消费类型
				let cfg = GameConfig.Shop.getElement(mapId * 10000 + i);
				if (cfg.Money == 0) {
					goodsBox.mImage_Price_Coin.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
					goodsBox.mImage_Price_Diamond.visibility = (mw.SlateVisibility.Collapsed);
				}
				else if (cfg.Money == 1) {
					goodsBox.mImage_Price_Coin.visibility = (mw.SlateVisibility.Collapsed);
					goodsBox.mImage_Price_Diamond.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
				}
				goodsBox.onClick.add((id, state) => {
					this.itemClickHandler(goodsBox, id, state);
				});
			}
			goodsBox.setShopItem(dataInfo.listId[i], dataInfo.state[i]);
			if (this.curItem != null) {
				if (this.curItem.itemId == dataInfo.listId[i]) {
					this.curItem = goodsBox;
				}
			}
			if (dataInfo.state[i] == ItemState.NotOwn) {
				this.notOwnList.push(goodsBox);
			}
			else {
				this.ownList.push(goodsBox);
			}
		}
		let j = 1;
		this.ownList = this.ownList.sort((a, b) => {
			let cfga = GameConfig.Shop.getElement(a.itemId)
			let cfgb = GameConfig.Shop.getElement(b.itemId)
			if (cfga.Rarity > cfgb.Rarity) {
				return 1;
			}
			else if (cfga.Rarity == cfgb.Rarity) {
				if (cfga.Money >= cfgb.Money) {
					return 1;
				}
				else {
					return -1
				}
			}
			else {
				return -1;
			}
		})
		this.notOwnList = this.notOwnList.sort((a, b) => {
			let cfga = GameConfig.Shop.getElement(a.itemId)
			let cfgb = GameConfig.Shop.getElement(b.itemId)
			if (cfga.Rarity > cfgb.Rarity) {
				return 1;
			}
			else if (cfga.Rarity == cfgb.Rarity) {
				if (cfga.Money >= cfgb.Money) {
					return 1;
				}
				else {
					return -1
				}
			}
			else {
				return -1;
			}
		})
		this.ownList.forEach((item) => {
			let rowIndex: number = Math.floor((j - 1) / this.rowGoodsNum);
			let columnIndex: number = (j - 1) % this.rowGoodsNum;
			this.mCanvas_Items.addChild(item.uiObject);
			item.uiObject.position = new mw.Vector2(columnIndex * (200 + this.columnSpacing), rowIndex * (350 + this.rowSpacing));
			j++
		})
		this.notOwnList.forEach((item) => {
			let rowIndex: number = Math.floor((j - 1) / this.rowGoodsNum);
			let columnIndex: number = (j - 1) % this.rowGoodsNum;
			this.mCanvas_Items.addChild(item.uiObject);
			item.uiObject.position = new mw.Vector2(columnIndex * (200 + this.columnSpacing), rowIndex * (350 + this.rowSpacing));
			j++;

		})
		this.mCanvas_Items.size = new mw.Vector2(860, Math.floor((j - 1) / this.rowGoodsNum) * (350 + this.rowSpacing) + 350);
		this.mCanvas_Items.position = new mw.Vector2(10, 0);
		this.mCanvas_Items.size = new mw.Vector2(860, Math.floor((j - 1) / this.rowGoodsNum) * (350 + this.rowSpacing) + 350);
		this.mCanvas_Items.position = new mw.Vector2(10, 0);
		this.mScrollBox_Items.scrollToStart();
	}

	private itemClickHandler(goodsBox: ShopItem, id: number, state: ItemState) {
		this.curItem = goodsBox;
		if (id > 60000) {
			ModuleService.getModule(ShopModuleC).previewCloth(id, true);
			this.mCanvas_ItemShow.visibility = (mw.SlateVisibility.Collapsed);
		}
		else {
			this.mCanvas_ItemShow.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
		}
		this.showItemDetail(id, state);
	}

	private showAtlasByLevel(levelIndex: number) {
		this.clearPage();
		this.refreshGoodsPage(levelIndex);
	}
	public showDefaltDetail() {
		if (this.goodsBoxArr.length != 0) {
			this.showItemDetail(this.goodsBoxArr[0].itemId, this.goodsBoxArr[0].itemState);
			this.curItem = this.goodsBoxArr[0];
		}
	}
	//清理页面
	private clearPage(): void {
		this.mCanvas_Items.removeAllChildren();
		// for (let i = 0; i < this.goodsBoxArr.length; i++) {
		// 	this.goodsBoxArr[i].removeFromParent();
		// }
		this.goodsBoxArr.length = 0;
	}
	public changeCoin(num: number) {
		this.mText_CoinsNumber.text = (num.toString());
	}
	public changeDiamond(num: number) {
		this.mText_DiamondNumber.text = (num.toString());
	}
	public changeAdvToken(num: number) {
		this.mText_AdCouponNumber.text = (num.toString());
	}

	protected setStyle(rowSpacing: number, columnSpacing: number, rowGoodsNum: number) {
		this.rowSpacing = rowSpacing;
		this.columnSpacing = columnSpacing;
		this.rowGoodsNum = rowGoodsNum;

		let size = this.mCanvas_ItemTypes.getChildrenCount();
		for (let i = 0; i < size; i++) {
			let btn: mw.StaleButton = this.mCanvas_ItemTypes.getChildAt(i) as mw.StaleButton;
			this.mTabGroupBtns.push(btn)
		}
		// BaseUI.getCanvasChildren(this.mCanvas_ItemTypes, mw.Button);
		this.initBtnString();
		this.setLan();
	}
	private setLan() {
		/**分类 */
		this.mUIText20012_btn.text = (GameConfig.Text.getElement(20012).Content);
		this.mUIText20029_btn.text = (GameConfig.Text.getElement(20029).Content);
		this.mUIText20013_btn.text = (GameConfig.Text.getElement(20013).Content);
		this.mUIText20014_btn.text = (GameConfig.Text.getElement(20014).Content);
		this.mUITextSuit_btn.text = (GameConfig.Text.getElement(100005).Content);

		/**阵营 */
		this.mUIText20010_txt.text = (GameConfig.Text.getElement(20010).Content);
		this.mUIText20019_txt.text = (GameConfig.Text.getElement(20010).Content);
		this.mUIText20011_txt.text = (GameConfig.Text.getElement(20011).Content);
		this.mUIText20020_txt.text = (GameConfig.Text.getElement(20011).Content);

		/**购买 */
		this.mUIText20015_btn.text = (GameConfig.Text.getElement(20015).Content);
		/**使用 */
		this.mUIText20016_btn.text = (GameConfig.Text.getElement(20016).Content);
		/**使用中 */
		this.mUIText20017_btn.text = (GameConfig.Text.getElement(20017).Content);

		/**购买物品 */
		this.mUIText20018_txt.text = (GameConfig.Text.getElement(20018).Content);

		/**确定 */
		this.mUIText20021_btn.text = (GameConfig.Text.getElement(20021).Content);
		/**取消 */
		this.mUIText20022_btn.text = (GameConfig.Text.getElement(20022).Content);


		/**点击返回 */
		this.mUIText20023_txt.text = (GameConfig.Text.getElement(20023).Content);
		/**购买成功 */
		this.mUIText20024_txt.text = (GameConfig.Text.getElement(20024).Content);

		/**使用按钮 */
		this.mUIText20025_btn.text = (GameConfig.Text.getElement(20025).Content);
	}
}
