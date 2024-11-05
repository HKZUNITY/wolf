import AdsPanel from '../../AdsPanel';
import { BaseUI } from '../../BaseUI';
import P_Tips from "../../CommonUI/P_Tips";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { ShopModuleC } from "./ShopCityModule";
import { ShopItem } from "./ShopCityUI";
import { ItemState, ShopModuleData } from "./ShopData";
import Action2 = mw.Action2;
import SoundManager = mw.SoundService;
export interface IShopBaseItemView extends mw.UIScript {
	mImage_Items: mw.Image;
	mText_Items: mw.TextBlock;
	mText_ItemsPrice: mw.TextBlock;
	mBtn_Items: mw.StaleButton;
	mImage_Lock: mw.Image;
	mImage_Using: mw.Image;
	mImage_Price_Coin: mw.Image;
	mImage_Price_Diamond: mw.Image;
	mImage_BG: mw.Image
	mCanvas_Price_Coin: mw.Canvas
	mCanvas_Price_Diamond: mw.Canvas
	mCanvas_Price_L: mw.Canvas
	mCanvas_Price_AdCoupon: mw.Canvas
	mTextBlock: mw.TextBlock
}
export interface IShopBasePanelView extends mw.UIScript {
	mBtn_ShopClose: mw.StaleButton;
	mImage_ItemShow: mw.Image;
	mText_ItemShowName: mw.TextBlock;
	mText_Time: mw.TextBlock;
	mCanvas_Items: mw.Canvas;
	mScrollBox_Items: mw.ScrollBox;
	mCanvas_ItemTypes: mw.Canvas;
	mText_CoinsNumber: mw.TextBlock;
	mText_DiamondNumber: mw.TextBlock;
	mText_AdCouponNumber: mw.TextBlock;
	/**标签页 */
	mUIText20012_btn: mw.StaleButton;//刀
	mUIText20029_btn: mw.StaleButton;//枪
	mUIText20013_btn: mw.StaleButton;//特效
	mUIText20014_btn: mw.StaleButton;//套装
	mUITextSuit_btn: mw.StaleButton;//套装

	/**分类提示 */
	mUIText20010_txt: mw.TextBlock;//黑手党
	mUIText20011_txt: mw.TextBlock;//警探
	mUIText20019_txt: mw.TextBlock;//黑手党
	mUIText20020_txt: mw.TextBlock;//警探
	/**购买 */
	mUIText20015_btn: mw.StaleButton;
	/**使用 */
	mUIText20016_btn: mw.StaleButton;
	/**使用中 */
	mUIText20017_btn: mw.StaleButton;

	mCanvas_Verification: mw.Canvas;
	mBtn_VerifyReturn: mw.StaleButton;
	/**购买物品 */
	mUIText20018_txt: mw.TextBlock;
	mImage_ItemIcon: mw.Image;
	mText_ItemName: mw.TextBlock;
	mText_ItemPrice: mw.TextBlock;
	/**确定 */
	mUIText20021_btn: mw.StaleButton;
	/**取消 */
	mUIText20022_btn: mw.StaleButton;

	mCanvas_Result: mw.Canvas;
	mBtn_ResultReturn: mw.StaleButton;
	/**点击返回 */
	mUIText20023_txt: mw.TextBlock;
	/**购买成功 */
	mUIText20024_txt: mw.TextBlock;
	mImage_ItemGet: mw.Image;
	mText_ResultName: mw.TextBlock;
	/**使用按钮 */
	mUIText20025_btn: mw.StaleButton;
	/**详情中的消费类别 */
	mImage_ItemPrice: mw.Image;//JINGBI
	mImage_ItemPrice_Diamond: mw.Image;//钻石
	mImage_ItemPrice_Ad: mw.Image;//兑换券
	/**Item信息 */
	mCanvas_ItemShow: mw.Canvas;

	mAddCoinButton: mw.Button
	mAddCouponButton: mw.Button
}
export class ShopBaseItem<T extends IShopBaseItemView> extends BaseUI<T> {
	public itemId: number;
	public itemState: ItemState;
	public readonly onClick: Action2<number, ItemState> = new Action2();
	constructor(ViewClass: any) {
		super(ViewClass);
	}
	protected onStart(): void {
		this.view.mBtn_Items.onClicked.add(() => {
			this.onClick.call(this.itemId, this.itemState);
		});
	}

	public setShopItem(itemId: number, itemState: ItemState) {
		this.itemId = itemId;
		this.itemState = itemState;
		let info = GameConfig.Shop.getElement(itemId);
		// this.view.mImage_Items.imageGuid = (info.IconGuid.toString());
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.view.mImage_Items, info.IconGuid.split(`_`)[1]);
		} else {
			this.view.mImage_Items.imageGuid = (info.IconGuid.toString());
		}

		this.view.mText_Items.text = (info.Name);
		this.view.mText_ItemsPrice.text = (info.Price.toString());
		let shopColor = GameConfig.Color.getElement(10001 + info.Rarity).Shop
		let shopwordsColor = GameConfig.Color.getElement(10001 + info.Rarity).Shopwords
		this.view.mBtn_Items.normalImageColor = new mw.LinearColor(shopColor.x / 255, shopColor.y / 255, shopColor.z / 255)
		this.view.mText_Items.fontColor = new mw.LinearColor(shopwordsColor.x / 255, shopwordsColor.y / 255, shopwordsColor.z / 255)
		switch (itemState) {
			case ItemState.NotOwn:
				this.view.mImage_Lock.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
				this.view.mImage_Using.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Own:
				this.view.mImage_Lock.visibility = (mw.SlateVisibility.Collapsed);
				this.view.mImage_Using.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Using:
				this.view.mImage_Lock.visibility = (mw.SlateVisibility.Collapsed);
				this.view.mImage_Using.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
				break;

		}
		this.view.mText_ItemsPrice.visibility = mw.SlateVisibility.Collapsed;
		this.view.mCanvas_Price_Coin.visibility = mw.SlateVisibility.Collapsed;
		this.view.mCanvas_Price_Diamond.visibility = mw.SlateVisibility.Collapsed;
		this.view.mCanvas_Price_L.visibility = mw.SlateVisibility.Collapsed;
		this.view.mCanvas_Price_AdCoupon.visibility = mw.SlateVisibility.Collapsed;
		if (itemState == ItemState.NotOwn) {
			switch (info.Money) {
				case 0:
					this.view.mText_ItemsPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible
					this.view.mCanvas_Price_Coin.visibility = mw.SlateVisibility.SelfHitTestInvisible
					break;
				case 1:
					this.view.mText_ItemsPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible
					this.view.mCanvas_Price_Diamond.visibility = mw.SlateVisibility.SelfHitTestInvisible
					break;
				case 2:
					this.view.mCanvas_Price_L.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.view.mTextBlock.text = GameConfig.Text.getElement(20035).Content;
					break;
				case 3:
					this.view.mCanvas_Price_L.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.view.mTextBlock.text = GameConfig.Text.getElement(20059).Content;
					break;
				case 4:
					this.view.mCanvas_Price_L.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.view.mTextBlock.text = GameConfig.Text.getElement(20060).Content;
					break;
				case 5:
					this.view.mText_ItemsPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.view.mCanvas_Price_AdCoupon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					break;
				default:
					break;
			}
		}
		else {
			this.view.mText_ItemsPrice.visibility = mw.SlateVisibility.Collapsed
			this.view.mCanvas_Price_Coin.visibility = mw.SlateVisibility.Collapsed
			this.view.mCanvas_Price_Diamond.visibility = mw.SlateVisibility.Collapsed
			this.view.mCanvas_Price_L.visibility = mw.SlateVisibility.Collapsed
		}
	}
	public updateItemInfo(itemState: ItemState) {
		this.itemState = itemState;
	}
}
//TODO:11
// type ShopItem = ShopBaseItem<Items>;//商品的UI类型
export class ShopBasePanel<T extends IShopBasePanelView> extends BaseUI<T> {
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

	public onHide() {
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
		this.view.mBtn_ShopClose.onClicked.add(() => {
			UIService.hideUI(this);
			this.curItem = null;
			ModuleService.getModule(ShopModuleC).ShopOpen(false);
			SoundService.playSound(GameConfig.Assets.getElement(10001).Guid, 1, 3);
		});
		this.view.mUIText20015_btn.onClicked.add(() => {//购买界面
			let money = GameConfig.Shop.getElement(this.curItem.itemId).Money;
			if (money == 0 || money == 1 || money == 5) {
				this.showBuyInfo();
			}
			else if (money == 3 || money == 4) {
				ModuleService.getModule(ShopModuleC).ShopOpen(false);
			}
		})
		this.view.mUIText20016_btn.onClicked.add(() => {//使用
			ModuleService.getModule(ShopModuleC).useItem(this.curItem.itemId, true);
		})
		this.view.mUIText20025_btn.onClicked.add(() => {//使用
			this.view.mCanvas_Result.visibility = (mw.SlateVisibility.Collapsed);
			ModuleService.getModule(ShopModuleC).useItem(this.curItem.itemId, true);
		})
		this.view.mUIText20017_btn.onClicked.add(() => {//使用中
			ModuleService.getModule(ShopModuleC).useItem(this.curItem.itemId, false);
		})
		this.view.mUIText20021_btn.onClicked.add(() => {//确定购买
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
				P_Tips.show(GameConfig.Tips.getElement(20002).Content);
			}

		})
		this.view.mUIText20022_btn.onClicked.add(() => {//取消购买
			this.view.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);
		})
		this.view.mBtn_VerifyReturn.onClicked.add(() => {//取消购买
			this.view.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);
		})
		this.view.mBtn_ResultReturn.onClicked.add(() => {//关闭购买成功界面
			this.view.mCanvas_Result.visibility = (mw.SlateVisibility.Collapsed);
		})

		//初始化标签组
		this.tabGroup = new mw.TabGroup(this.mTabGroupBtns);
		this.tabGroup.init((btn: mw.StaleButton, isSelect: boolean) => {
			if (isSelect) {
				btn.size = (new mw.Vector2(170, 120));
			} else {
				btn.size = (new mw.Vector2(170, 100));
			}
		}, (selectIndex: number) => {
			this.currentTabIndex = selectIndex;
			this.showGoods(this.currentTabIndex);
		},
			this);

		this.view.mAddCoinButton.onClicked.add(() => {
			if (mw.SystemUtil.isPIE) {
				ModuleService.getModule(PlayerModuleC).addCoin(100);
				P_Tips.show(`恭喜获得${100}金币`);
			} else {
				mw.UIService.getUI(AdsPanel).showRewardAd(() => {
					ModuleService.getModule(PlayerModuleC).addCoin(100);
					P_Tips.show(`恭喜获得${100}金币`);
				}, `看广告免费领取${100}金币`, `取消`, `免费领取`);
			}
		});
		this.view.mAddCouponButton.onClicked.add(() => {
			if (mw.SystemUtil.isPIE) {
				ModuleService.getModule(PlayerModuleC).addAdvToken(1);
				P_Tips.show(`恭喜获得${1}张券`);
			} else {
				UIService.getUI(AdsPanel).showRewardAd(() => {
					ModuleService.getModule(PlayerModuleC).addAdvToken(1);
					P_Tips.show(`恭喜获得${1}张券`);
				}, `免费领取${1}张广告券`, `取消`, `领取`);
			}
		});
	}
	/**购买物品界面 */
	private showBuyInfo() {
		let info = GameConfig.Shop.getElement(this.curItem.itemId);
		// this.view.mImage_ItemIcon.imageGuid = (info.IconGuid);
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.view.mImage_ItemIcon, info.IconGuid.split(`_`)[1]);
		} else {
			this.view.mImage_ItemIcon.imageGuid = (info.IconGuid.toString());
		}
		this.view.mText_ItemName.text = (info.Name);
		this.view.mText_ItemPrice.text = (info.Price.toString());
		this.view.mCanvas_Verification.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
	}
	private showBuySuccess() {
		this.view.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);
		let info = GameConfig.Shop.getElement(this.curItem.itemId);
		// this.view.mImage_ItemGet.imageGuid = (info.IconGuid);
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.view.mImage_ItemGet, info.IconGuid.split(`_`)[1]);
		} else {
			this.view.mImage_ItemGet.imageGuid = (info.IconGuid.toString());
		}
		this.view.mText_ResultName.text = (info.Name);
		this.view.mCanvas_Result.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
	}
	private remainTimer;
	private showItemDetail(id: number, state: ItemState) {

		let info = GameConfig.Shop.getElement(id);
		// this.view.mImage_ItemShow.imageGuid = (info.IconGuid);
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.view.mImage_ItemShow, info.IconGuid.split(`_`)[1]);
		} else {
			this.view.mImage_ItemShow.imageGuid = (info.IconGuid.toString());
		}
		this.view.mText_ItemShowName.text = (info.Name);
		if (this.remainTimer) {
			TimeUtil.clearInterval(this.remainTimer);
			this.remainTimer = null;
		}
		let remain = ModuleService.getModule(ShopModuleC).getShopRemainTime(id);
		this.view.mText_Time.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.updateRemainTime(remain);
		if (remain > 0) {
			this.remainTimer = TimeUtil.setInterval(() => {
				remain--;
				this.updateRemainTime(remain);
			}, 1);
		}


		if (info.WeaponType == 1) {
			this.view.mUIText20010_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.view.mUIText20011_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mUIText20019_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.view.mUIText20020_txt.visibility = (mw.SlateVisibility.Collapsed);

		}
		else if (info.WeaponType == 2) {
			this.view.mUIText20010_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mUIText20011_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.view.mUIText20019_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mUIText20020_txt.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
		}
		else {
			this.view.mUIText20010_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mUIText20011_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mUIText20019_txt.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mUIText20020_txt.visibility = (mw.SlateVisibility.Collapsed);
		}
		if (info.Money == 0) {
			this.view.mImage_ItemPrice.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.view.mImage_ItemPrice_Diamond.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mImage_ItemPrice_Ad.visibility = (mw.SlateVisibility.Collapsed);
		}
		else if (info.Money == 1) {
			this.view.mImage_ItemPrice.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mImage_ItemPrice_Diamond.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			this.view.mImage_ItemPrice_Ad.visibility = (mw.SlateVisibility.Collapsed);
		}
		else if (info.Money == 5) {
			this.view.mImage_ItemPrice.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mImage_ItemPrice_Diamond.visibility = (mw.SlateVisibility.Collapsed);
			this.view.mImage_ItemPrice_Ad.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
		}
		switch (state) {
			case ItemState.NotOwn:
				this.view.mUIText20015_btn.visibility = (mw.SlateVisibility.Visible);
				this.view.mUIText20016_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.view.mUIText20017_btn.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Own:
				this.view.mUIText20015_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.view.mUIText20016_btn.visibility = (mw.SlateVisibility.Visible);
				this.view.mUIText20017_btn.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Using:
				this.view.mUIText20015_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.view.mUIText20016_btn.visibility = (mw.SlateVisibility.Collapsed);
				this.view.mUIText20017_btn.visibility = (mw.SlateVisibility.Visible);
				break;
		}

	}
	private updateRemainTime(remainTime: number) {
		if (remainTime >= 86400) {
			this.view.mText_Time.text = StringUtil.format(GameConfig.Text.getElement("20058").Content, Math.floor(remainTime / 86400));
		}
		else if (remainTime < 86400 && remainTime > 0) {
			this.view.mText_Time.text = StringUtil.format(GameConfig.Text.getElement("20055").Content, Tools.formatTime_2(remainTime));
		}
		else {
			this.view.mText_Time.text = "";
		}

		if (remainTime <= 0) {
			if (this.remainTimer) {
				TimeUtil.clearInterval(this.remainTimer);
				this.remainTimer = null;
			}
		}
	}

	public showGoods(tabIndex: number) {

		this.view.mCanvas_Verification.visibility = (mw.SlateVisibility.Collapsed);

		this.view.mCanvas_Result.visibility = (mw.SlateVisibility.Collapsed);

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
		this.view.mCanvas_ItemShow.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
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
					goodsBox.getView().mImage_Price_Coin.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
					goodsBox.getView().mImage_Price_Diamond.visibility = (mw.SlateVisibility.Collapsed);
				}
				else if (cfg.Money == 1) {
					goodsBox.getView().mImage_Price_Coin.visibility = (mw.SlateVisibility.Collapsed);
					goodsBox.getView().mImage_Price_Diamond.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
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
			this.view.mCanvas_Items.addChild(item.getView().uiObject);
			item.getView().uiObject.position = new mw.Vector2(columnIndex * (200 + this.columnSpacing), rowIndex * (350 + this.rowSpacing));
			j++
		})
		this.notOwnList.forEach((item) => {
			let rowIndex: number = Math.floor((j - 1) / this.rowGoodsNum);
			let columnIndex: number = (j - 1) % this.rowGoodsNum;
			this.view.mCanvas_Items.addChild(item.getView().uiObject);
			item.getView().uiObject.position = new mw.Vector2(columnIndex * (200 + this.columnSpacing), rowIndex * (350 + this.rowSpacing));
			j++;

		})
		this.view.mCanvas_Items.size = new mw.Vector2(860, Math.floor((j - 1) / this.rowGoodsNum) * (350 + this.rowSpacing) + 350);
		this.view.mCanvas_Items.position = new mw.Vector2(10, 0);
		this.view.mCanvas_Items.size = new mw.Vector2(860, Math.floor((j - 1) / this.rowGoodsNum) * (350 + this.rowSpacing) + 350);
		this.view.mCanvas_Items.position = new mw.Vector2(10, 0);
		this.view.mScrollBox_Items.scrollToStart();
	}

	private itemClickHandler(goodsBox: ShopItem, id: number, state: ItemState) {
		this.curItem = goodsBox;
		if (id > 60000) {
			ModuleService.getModule(ShopModuleC).previewCloth(id, true);
			this.view.mCanvas_ItemShow.visibility = (mw.SlateVisibility.Collapsed);
		}
		else {
			this.view.mCanvas_ItemShow.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
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
		this.view.mCanvas_Items.removeAllChildren();
		// for (let i = 0; i < this.goodsBoxArr.length; i++) {
		// 	this.goodsBoxArr[i].removeFromParent();
		// }
		this.goodsBoxArr.length = 0;
	}
	public changeCoin(num: number) {
		this.view.mText_CoinsNumber.text = (num.toString());
	}
	public changeDiamond(num: number) {
		this.view.mText_DiamondNumber.text = (num.toString());
	}
	public changeAdvToken(num: number) {
		this.view.mText_AdCouponNumber.text = (num.toString());
	}

	protected setStyle(rowSpacing: number, columnSpacing: number, rowGoodsNum: number) {
		this.rowSpacing = rowSpacing;
		this.columnSpacing = columnSpacing;
		this.rowGoodsNum = rowGoodsNum;

		let size = this.view.mCanvas_ItemTypes.getChildrenCount();
		for (let i = 0; i < size; i++) {
			let btn: mw.StaleButton = this.view.mCanvas_ItemTypes.getChildAt(i) as mw.StaleButton;
			this.mTabGroupBtns.push(btn)
		}
		// BaseUI.getCanvasChildren(this.view.mCanvas_ItemTypes, mw.Button);
		this.initBtnString();
		this.setLan();
	}
	private setLan() {
		/**分类 */
		this.view.mUIText20012_btn.text = (GameConfig.Text.getElement(20012).Content);
		this.view.mUIText20029_btn.text = (GameConfig.Text.getElement(20029).Content);
		this.view.mUIText20013_btn.text = (GameConfig.Text.getElement(20013).Content);
		this.view.mUIText20014_btn.text = (GameConfig.Text.getElement(20014).Content);
		this.view.mUITextSuit_btn.text = `皮肤`;

		/**阵营 */
		this.view.mUIText20010_txt.text = (GameConfig.Text.getElement(20010).Content);
		this.view.mUIText20019_txt.text = (GameConfig.Text.getElement(20010).Content);
		this.view.mUIText20011_txt.text = (GameConfig.Text.getElement(20011).Content);
		this.view.mUIText20020_txt.text = (GameConfig.Text.getElement(20011).Content);

		/**购买 */
		this.view.mUIText20015_btn.text = (GameConfig.Text.getElement(20015).Content);
		/**使用 */
		this.view.mUIText20016_btn.text = (GameConfig.Text.getElement(20016).Content);
		/**使用中 */
		this.view.mUIText20017_btn.text = (GameConfig.Text.getElement(20017).Content);

		/**购买物品 */
		this.view.mUIText20018_txt.text = (GameConfig.Text.getElement(20018).Content);

		/**确定 */
		this.view.mUIText20021_btn.text = (GameConfig.Text.getElement(20021).Content);
		/**取消 */
		this.view.mUIText20022_btn.text = (GameConfig.Text.getElement(20022).Content);


		/**点击返回 */
		this.view.mUIText20023_txt.text = (GameConfig.Text.getElement(20023).Content);
		/**购买成功 */
		this.view.mUIText20024_txt.text = (GameConfig.Text.getElement(20024).Content);

		/**使用按钮 */
		this.view.mUIText20025_btn.text = (GameConfig.Text.getElement(20025).Content);



	}
}
