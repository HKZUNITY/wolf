import { GameConfig } from "../../../Tables/GameConfig";
import { Tools } from "../../../Tools";
import ShopItem_Generate from "../../../ui-generate/module/ShopModule/ShopItem_generate";
import { ItemState } from "../ShopModuleData";

export default class ShopItem extends ShopItem_Generate {
	public itemId: number = null;
	public itemState: ItemState = null;
	public readonly onClick: Action2<number, ItemState> = new Action2<number, ItemState>();

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.bindButtons();
	}

	private bindButtons(): void {
		this.mBtn_Items.onClicked.add(this.onClickButton.bind(this));
	}

	private onClickButton(): void {
		this.onClick.call(this.itemId, this.itemState);
	}

	public setShopItem(itemId: number, itemState: ItemState): void {
		this.itemId = itemId;
		this.itemState = itemState;
		let info = GameConfig.Shop.getElement(itemId);
		if (info.IconGuid && info.IconGuid[0] == `m`) {
			Tools.setImageByAssetIconData(this.mImage_Items, info.IconGuid.split(`_`)[1]);
		} else {
			this.mImage_Items.imageGuid = info.IconGuid;
		}

		this.mText_Items.text = info.Name;
		this.mText_ItemsPrice.text = `${info.Price}`;
		let shopColor = GameConfig.Color.getElement(10001 + info.Rarity).Shop
		let shopwordsColor = GameConfig.Color.getElement(10001 + info.Rarity).Shopwords
		this.mBtn_Items.normalImageColor = new mw.LinearColor(shopColor.x / 255, shopColor.y / 255, shopColor.z / 255)
		this.mText_Items.fontColor = new mw.LinearColor(shopwordsColor.x / 255, shopwordsColor.y / 255, shopwordsColor.z / 255)
		switch (itemState) {
			case ItemState.NotOwn:
				this.mImage_Lock.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
				this.mImage_Using.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Own:
				this.mImage_Lock.visibility = (mw.SlateVisibility.Collapsed);
				this.mImage_Using.visibility = (mw.SlateVisibility.Collapsed);
				break;
			case ItemState.Using:
				this.mImage_Lock.visibility = (mw.SlateVisibility.Collapsed);
				this.mImage_Using.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
				break;
		}
		this.mText_ItemsPrice.visibility = mw.SlateVisibility.Collapsed;
		this.mCanvas_Price_Coin.visibility = mw.SlateVisibility.Collapsed;
		this.mCanvas_Price_Diamond.visibility = mw.SlateVisibility.Collapsed;
		this.mCanvas_Price_L.visibility = mw.SlateVisibility.Collapsed;
		this.mCanvas_Price_AdCoupon.visibility = mw.SlateVisibility.Collapsed;
		if (itemState == ItemState.NotOwn) {
			switch (info.Money) {
				case 0:
					this.mText_ItemsPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible
					this.mCanvas_Price_Coin.visibility = mw.SlateVisibility.SelfHitTestInvisible
					break;
				case 1:
					this.mText_ItemsPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible
					this.mCanvas_Price_Diamond.visibility = mw.SlateVisibility.SelfHitTestInvisible
					break;
				case 2:
					this.mCanvas_Price_L.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.mTextBlock.text = GameConfig.Text.getElement(20035).Content;
					break;
				case 3:
					this.mCanvas_Price_L.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.mTextBlock.text = GameConfig.Text.getElement(20059).Content;
					break;
				case 4:
					this.mCanvas_Price_L.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.mTextBlock.text = GameConfig.Text.getElement(20060).Content;
					break;
				case 5:
					this.mText_ItemsPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					this.mCanvas_Price_AdCoupon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
					break;
				default:
					break;
			}
		}
		else {
			this.mText_ItemsPrice.visibility = mw.SlateVisibility.Collapsed
			this.mCanvas_Price_Coin.visibility = mw.SlateVisibility.Collapsed
			this.mCanvas_Price_Diamond.visibility = mw.SlateVisibility.Collapsed
			this.mCanvas_Price_L.visibility = mw.SlateVisibility.Collapsed
		}
	}

	public updateItemInfo(itemState: ItemState): void {
		this.itemState = itemState;
	}
}
