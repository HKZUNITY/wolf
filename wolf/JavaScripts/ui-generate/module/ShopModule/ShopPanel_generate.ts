/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShopModule/ShopPanel.ui
 * TIME: 2024.12.24-22.05.35
 */
 
@UIBind('UI/module/ShopModule/ShopPanel.ui')
export default class ShopPanel_Generate extends UIScript {
		private mCanvas_Shop_Internal: mw.Canvas
	public get mCanvas_Shop(): mw.Canvas {
		if(!this.mCanvas_Shop_Internal&&this.uiWidgetBase) {
			this.mCanvas_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop') as mw.Canvas
		}
		return this.mCanvas_Shop_Internal
	}
	private mCanvas_ItemShow_Internal: mw.Canvas
	public get mCanvas_ItemShow(): mw.Canvas {
		if(!this.mCanvas_ItemShow_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemShow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemShow') as mw.Canvas
		}
		return this.mCanvas_ItemShow_Internal
	}
	private mImage_ShowBG_Internal: mw.Image
	public get mImage_ShowBG(): mw.Image {
		if(!this.mImage_ShowBG_Internal&&this.uiWidgetBase) {
			this.mImage_ShowBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mImage_ShowBG') as mw.Image
		}
		return this.mImage_ShowBG_Internal
	}
	private mImage_ItemShow_Internal: mw.Image
	public get mImage_ItemShow(): mw.Image {
		if(!this.mImage_ItemShow_Internal&&this.uiWidgetBase) {
			this.mImage_ItemShow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mImage_ItemShow') as mw.Image
		}
		return this.mImage_ItemShow_Internal
	}
	private mText_ItemShowName_Internal: mw.TextBlock
	public get mText_ItemShowName(): mw.TextBlock {
		if(!this.mText_ItemShowName_Internal&&this.uiWidgetBase) {
			this.mText_ItemShowName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mText_ItemShowName') as mw.TextBlock
		}
		return this.mText_ItemShowName_Internal
	}
	private mText_Time_Internal: mw.TextBlock
	public get mText_Time(): mw.TextBlock {
		if(!this.mText_Time_Internal&&this.uiWidgetBase) {
			this.mText_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mText_Time') as mw.TextBlock
		}
		return this.mText_Time_Internal
	}
	private mUIText20010_txt_Internal: mw.TextBlock
	public get mUIText20010_txt(): mw.TextBlock {
		if(!this.mUIText20010_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20010_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mUIText20010_txt') as mw.TextBlock
		}
		return this.mUIText20010_txt_Internal
	}
	private mUIText20011_txt_Internal: mw.TextBlock
	public get mUIText20011_txt(): mw.TextBlock {
		if(!this.mUIText20011_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20011_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mUIText20011_txt') as mw.TextBlock
		}
		return this.mUIText20011_txt_Internal
	}
	private mCanvas_ItemChoose_Internal: mw.Canvas
	public get mCanvas_ItemChoose(): mw.Canvas {
		if(!this.mCanvas_ItemChoose_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemChoose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose') as mw.Canvas
		}
		return this.mCanvas_ItemChoose_Internal
	}
	private mImage_ItemChooseBG_Internal: mw.Image
	public get mImage_ItemChooseBG(): mw.Image {
		if(!this.mImage_ItemChooseBG_Internal&&this.uiWidgetBase) {
			this.mImage_ItemChooseBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mImage_ItemChooseBG') as mw.Image
		}
		return this.mImage_ItemChooseBG_Internal
	}
	private mImage_ItemTitleBG_Internal: mw.Image
	public get mImage_ItemTitleBG(): mw.Image {
		if(!this.mImage_ItemTitleBG_Internal&&this.uiWidgetBase) {
			this.mImage_ItemTitleBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mImage_ItemTitleBG') as mw.Image
		}
		return this.mImage_ItemTitleBG_Internal
	}
	private mScrollBox_Items_Internal: mw.ScrollBox
	public get mScrollBox_Items(): mw.ScrollBox {
		if(!this.mScrollBox_Items_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mScrollBox_Items') as mw.ScrollBox
		}
		return this.mScrollBox_Items_Internal
	}
	private mCanvas_Items_Internal: mw.Canvas
	public get mCanvas_Items(): mw.Canvas {
		if(!this.mCanvas_Items_Internal&&this.uiWidgetBase) {
			this.mCanvas_Items_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mScrollBox_Items/mCanvas_Items') as mw.Canvas
		}
		return this.mCanvas_Items_Internal
	}
	private mCanvas_ItemTypes_Internal: mw.Canvas
	public get mCanvas_ItemTypes(): mw.Canvas {
		if(!this.mCanvas_ItemTypes_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemTypes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes') as mw.Canvas
		}
		return this.mCanvas_ItemTypes_Internal
	}
	private mUIText20014_btn_Internal: mw.StaleButton
	public get mUIText20014_btn(): mw.StaleButton {
		if(!this.mUIText20014_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20014_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20014_btn') as mw.StaleButton
		}
		return this.mUIText20014_btn_Internal
	}
	private mUIText20029_btn_Internal: mw.StaleButton
	public get mUIText20029_btn(): mw.StaleButton {
		if(!this.mUIText20029_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20029_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20029_btn') as mw.StaleButton
		}
		return this.mUIText20029_btn_Internal
	}
	private mUIText20013_btn_Internal: mw.StaleButton
	public get mUIText20013_btn(): mw.StaleButton {
		if(!this.mUIText20013_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20013_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20013_btn') as mw.StaleButton
		}
		return this.mUIText20013_btn_Internal
	}
	private mUIText20012_btn_Internal: mw.StaleButton
	public get mUIText20012_btn(): mw.StaleButton {
		if(!this.mUIText20012_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20012_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20012_btn') as mw.StaleButton
		}
		return this.mUIText20012_btn_Internal
	}
	private mUITextSuit_btn_Internal: mw.StaleButton
	public get mUITextSuit_btn(): mw.StaleButton {
		if(!this.mUITextSuit_btn_Internal&&this.uiWidgetBase) {
			this.mUITextSuit_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUITextSuit_btn') as mw.StaleButton
		}
		return this.mUITextSuit_btn_Internal
	}
	private mCanvas_Money_Internal: mw.Canvas
	public get mCanvas_Money(): mw.Canvas {
		if(!this.mCanvas_Money_Internal&&this.uiWidgetBase) {
			this.mCanvas_Money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money') as mw.Canvas
		}
		return this.mCanvas_Money_Internal
	}
	private mCanvas_Coin_Internal: mw.Canvas
	public get mCanvas_Coin(): mw.Canvas {
		if(!this.mCanvas_Coin_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin') as mw.Canvas
		}
		return this.mCanvas_Coin_Internal
	}
	private mImage_CoinBG_Internal: mw.Image
	public get mImage_CoinBG(): mw.Image {
		if(!this.mImage_CoinBG_Internal&&this.uiWidgetBase) {
			this.mImage_CoinBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mImage_CoinBG') as mw.Image
		}
		return this.mImage_CoinBG_Internal
	}
	private mImage_CoinFrame_Internal: mw.Image
	public get mImage_CoinFrame(): mw.Image {
		if(!this.mImage_CoinFrame_Internal&&this.uiWidgetBase) {
			this.mImage_CoinFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mImage_CoinFrame') as mw.Image
		}
		return this.mImage_CoinFrame_Internal
	}
	private mImage_CoinIcon_Internal: mw.Image
	public get mImage_CoinIcon(): mw.Image {
		if(!this.mImage_CoinIcon_Internal&&this.uiWidgetBase) {
			this.mImage_CoinIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mImage_CoinIcon') as mw.Image
		}
		return this.mImage_CoinIcon_Internal
	}
	private mText_CoinsNumber_Internal: mw.TextBlock
	public get mText_CoinsNumber(): mw.TextBlock {
		if(!this.mText_CoinsNumber_Internal&&this.uiWidgetBase) {
			this.mText_CoinsNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mText_CoinsNumber') as mw.TextBlock
		}
		return this.mText_CoinsNumber_Internal
	}
	private mAddCoinButton_Internal: mw.Button
	public get mAddCoinButton(): mw.Button {
		if(!this.mAddCoinButton_Internal&&this.uiWidgetBase) {
			this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mAddCoinButton') as mw.Button
		}
		return this.mAddCoinButton_Internal
	}
	private cCanvas_Diamond_Internal: mw.Canvas
	public get cCanvas_Diamond(): mw.Canvas {
		if(!this.cCanvas_Diamond_Internal&&this.uiWidgetBase) {
			this.cCanvas_Diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond') as mw.Canvas
		}
		return this.cCanvas_Diamond_Internal
	}
	private mImage_DiamondBG_Internal: mw.Image
	public get mImage_DiamondBG(): mw.Image {
		if(!this.mImage_DiamondBG_Internal&&this.uiWidgetBase) {
			this.mImage_DiamondBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mImage_DiamondBG') as mw.Image
		}
		return this.mImage_DiamondBG_Internal
	}
	private mImage_DiamondFrame_Internal: mw.Image
	public get mImage_DiamondFrame(): mw.Image {
		if(!this.mImage_DiamondFrame_Internal&&this.uiWidgetBase) {
			this.mImage_DiamondFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mImage_DiamondFrame') as mw.Image
		}
		return this.mImage_DiamondFrame_Internal
	}
	private mImage_DiamondIcon_Internal: mw.Image
	public get mImage_DiamondIcon(): mw.Image {
		if(!this.mImage_DiamondIcon_Internal&&this.uiWidgetBase) {
			this.mImage_DiamondIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mImage_DiamondIcon') as mw.Image
		}
		return this.mImage_DiamondIcon_Internal
	}
	private mText_DiamondNumber_Internal: mw.TextBlock
	public get mText_DiamondNumber(): mw.TextBlock {
		if(!this.mText_DiamondNumber_Internal&&this.uiWidgetBase) {
			this.mText_DiamondNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mText_DiamondNumber') as mw.TextBlock
		}
		return this.mText_DiamondNumber_Internal
	}
	private mCanvas_AdCoupon_Internal: mw.Canvas
	public get mCanvas_AdCoupon(): mw.Canvas {
		if(!this.mCanvas_AdCoupon_Internal&&this.uiWidgetBase) {
			this.mCanvas_AdCoupon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon') as mw.Canvas
		}
		return this.mCanvas_AdCoupon_Internal
	}
	private mImage_AdCouponBG_Internal: mw.Image
	public get mImage_AdCouponBG(): mw.Image {
		if(!this.mImage_AdCouponBG_Internal&&this.uiWidgetBase) {
			this.mImage_AdCouponBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mImage_AdCouponBG') as mw.Image
		}
		return this.mImage_AdCouponBG_Internal
	}
	private mImage_AdCouponFrame_Internal: mw.Image
	public get mImage_AdCouponFrame(): mw.Image {
		if(!this.mImage_AdCouponFrame_Internal&&this.uiWidgetBase) {
			this.mImage_AdCouponFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mImage_AdCouponFrame') as mw.Image
		}
		return this.mImage_AdCouponFrame_Internal
	}
	private mImage_AdCouponIcon_Internal: mw.Image
	public get mImage_AdCouponIcon(): mw.Image {
		if(!this.mImage_AdCouponIcon_Internal&&this.uiWidgetBase) {
			this.mImage_AdCouponIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mImage_AdCouponIcon') as mw.Image
		}
		return this.mImage_AdCouponIcon_Internal
	}
	private mText_AdCouponNumber_Internal: mw.TextBlock
	public get mText_AdCouponNumber(): mw.TextBlock {
		if(!this.mText_AdCouponNumber_Internal&&this.uiWidgetBase) {
			this.mText_AdCouponNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mText_AdCouponNumber') as mw.TextBlock
		}
		return this.mText_AdCouponNumber_Internal
	}
	private mAddCouponButton_Internal: mw.Button
	public get mAddCouponButton(): mw.Button {
		if(!this.mAddCouponButton_Internal&&this.uiWidgetBase) {
			this.mAddCouponButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mAddCouponButton') as mw.Button
		}
		return this.mAddCouponButton_Internal
	}
	private mCanvas_Buy_Internal: mw.Canvas
	public get mCanvas_Buy(): mw.Canvas {
		if(!this.mCanvas_Buy_Internal&&this.uiWidgetBase) {
			this.mCanvas_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Buy') as mw.Canvas
		}
		return this.mCanvas_Buy_Internal
	}
	private mUIText20015_btn_Internal: mw.StaleButton
	public get mUIText20015_btn(): mw.StaleButton {
		if(!this.mUIText20015_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20015_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Buy/mUIText20015_btn') as mw.StaleButton
		}
		return this.mUIText20015_btn_Internal
	}
	private mUIText20016_btn_Internal: mw.StaleButton
	public get mUIText20016_btn(): mw.StaleButton {
		if(!this.mUIText20016_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20016_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Buy/mUIText20016_btn') as mw.StaleButton
		}
		return this.mUIText20016_btn_Internal
	}
	private mUIText20017_btn_Internal: mw.StaleButton
	public get mUIText20017_btn(): mw.StaleButton {
		if(!this.mUIText20017_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20017_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Buy/mUIText20017_btn') as mw.StaleButton
		}
		return this.mUIText20017_btn_Internal
	}
	private mText_Member_Null_Internal: mw.TextBlock
	public get mText_Member_Null(): mw.TextBlock {
		if(!this.mText_Member_Null_Internal&&this.uiWidgetBase) {
			this.mText_Member_Null_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_Buy/mText_Member_Null') as mw.TextBlock
		}
		return this.mText_Member_Null_Internal
	}
	private mCanvas_ShopClose_Internal: mw.Canvas
	public get mCanvas_ShopClose(): mw.Canvas {
		if(!this.mCanvas_ShopClose_Internal&&this.uiWidgetBase) {
			this.mCanvas_ShopClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ShopClose') as mw.Canvas
		}
		return this.mCanvas_ShopClose_Internal
	}
	private mImage_CloseBG_Internal: mw.Image
	public get mImage_CloseBG(): mw.Image {
		if(!this.mImage_CloseBG_Internal&&this.uiWidgetBase) {
			this.mImage_CloseBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ShopClose/mImage_CloseBG') as mw.Image
		}
		return this.mImage_CloseBG_Internal
	}
	private mImage_CloseFrame_Internal: mw.Image
	public get mImage_CloseFrame(): mw.Image {
		if(!this.mImage_CloseFrame_Internal&&this.uiWidgetBase) {
			this.mImage_CloseFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ShopClose/mImage_CloseFrame') as mw.Image
		}
		return this.mImage_CloseFrame_Internal
	}
	private mBtn_ShopClose_Internal: mw.StaleButton
	public get mBtn_ShopClose(): mw.StaleButton {
		if(!this.mBtn_ShopClose_Internal&&this.uiWidgetBase) {
			this.mBtn_ShopClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mCanvas_ShopClose/mBtn_ShopClose') as mw.StaleButton
		}
		return this.mBtn_ShopClose_Internal
	}
	private mCanvas_Verification_Internal: mw.Canvas
	public get mCanvas_Verification(): mw.Canvas {
		if(!this.mCanvas_Verification_Internal&&this.uiWidgetBase) {
			this.mCanvas_Verification_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification') as mw.Canvas
		}
		return this.mCanvas_Verification_Internal
	}
	private mBtn_VerifyReturn_Internal: mw.StaleButton
	public get mBtn_VerifyReturn(): mw.StaleButton {
		if(!this.mBtn_VerifyReturn_Internal&&this.uiWidgetBase) {
			this.mBtn_VerifyReturn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mBtn_VerifyReturn') as mw.StaleButton
		}
		return this.mBtn_VerifyReturn_Internal
	}
	private mImage_VerifyBG_Internal: mw.Image
	public get mImage_VerifyBG(): mw.Image {
		if(!this.mImage_VerifyBG_Internal&&this.uiWidgetBase) {
			this.mImage_VerifyBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mImage_VerifyBG') as mw.Image
		}
		return this.mImage_VerifyBG_Internal
	}
	private mUIText20018_txt_Internal: mw.TextBlock
	public get mUIText20018_txt(): mw.TextBlock {
		if(!this.mUIText20018_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20018_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mUIText20018_txt') as mw.TextBlock
		}
		return this.mUIText20018_txt_Internal
	}
	private mCanvas_ItemDetails_Internal: mw.Canvas
	public get mCanvas_ItemDetails(): mw.Canvas {
		if(!this.mCanvas_ItemDetails_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails') as mw.Canvas
		}
		return this.mCanvas_ItemDetails_Internal
	}
	private mImage_ItemIcon_Internal: mw.Image
	public get mImage_ItemIcon(): mw.Image {
		if(!this.mImage_ItemIcon_Internal&&this.uiWidgetBase) {
			this.mImage_ItemIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemIcon') as mw.Image
		}
		return this.mImage_ItemIcon_Internal
	}
	private mText_ItemName_Internal: mw.TextBlock
	public get mText_ItemName(): mw.TextBlock {
		if(!this.mText_ItemName_Internal&&this.uiWidgetBase) {
			this.mText_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mText_ItemName') as mw.TextBlock
		}
		return this.mText_ItemName_Internal
	}
	private mUIText20019_txt_Internal: mw.TextBlock
	public get mUIText20019_txt(): mw.TextBlock {
		if(!this.mUIText20019_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20019_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mUIText20019_txt') as mw.TextBlock
		}
		return this.mUIText20019_txt_Internal
	}
	private mUIText20020_txt_Internal: mw.TextBlock
	public get mUIText20020_txt(): mw.TextBlock {
		if(!this.mUIText20020_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20020_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mUIText20020_txt') as mw.TextBlock
		}
		return this.mUIText20020_txt_Internal
	}
	private mText_ItemPrice_Internal: mw.TextBlock
	public get mText_ItemPrice(): mw.TextBlock {
		if(!this.mText_ItemPrice_Internal&&this.uiWidgetBase) {
			this.mText_ItemPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mText_ItemPrice') as mw.TextBlock
		}
		return this.mText_ItemPrice_Internal
	}
	private mImage_ItemPrice_Internal: mw.Image
	public get mImage_ItemPrice(): mw.Image {
		if(!this.mImage_ItemPrice_Internal&&this.uiWidgetBase) {
			this.mImage_ItemPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemPrice') as mw.Image
		}
		return this.mImage_ItemPrice_Internal
	}
	private mImage_ItemPrice_Diamond_Internal: mw.Image
	public get mImage_ItemPrice_Diamond(): mw.Image {
		if(!this.mImage_ItemPrice_Diamond_Internal&&this.uiWidgetBase) {
			this.mImage_ItemPrice_Diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemPrice_Diamond') as mw.Image
		}
		return this.mImage_ItemPrice_Diamond_Internal
	}
	private mImage_ItemPrice_Ad_Internal: mw.Image
	public get mImage_ItemPrice_Ad(): mw.Image {
		if(!this.mImage_ItemPrice_Ad_Internal&&this.uiWidgetBase) {
			this.mImage_ItemPrice_Ad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemPrice_Ad') as mw.Image
		}
		return this.mImage_ItemPrice_Ad_Internal
	}
	private mCanvas_ItemBuy_Internal: mw.Canvas
	public get mCanvas_ItemBuy(): mw.Canvas {
		if(!this.mCanvas_ItemBuy_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemBuy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemBuy') as mw.Canvas
		}
		return this.mCanvas_ItemBuy_Internal
	}
	private mUIText20021_btn_Internal: mw.StaleButton
	public get mUIText20021_btn(): mw.StaleButton {
		if(!this.mUIText20021_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20021_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemBuy/mUIText20021_btn') as mw.StaleButton
		}
		return this.mUIText20021_btn_Internal
	}
	private mUIText20022_btn_Internal: mw.StaleButton
	public get mUIText20022_btn(): mw.StaleButton {
		if(!this.mUIText20022_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20022_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Verification/mCanvas_ItemBuy/mUIText20022_btn') as mw.StaleButton
		}
		return this.mUIText20022_btn_Internal
	}
	private mCanvas_Result_Internal: mw.Canvas
	public get mCanvas_Result(): mw.Canvas {
		if(!this.mCanvas_Result_Internal&&this.uiWidgetBase) {
			this.mCanvas_Result_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result') as mw.Canvas
		}
		return this.mCanvas_Result_Internal
	}
	private mBtn_ResultReturn_Internal: mw.StaleButton
	public get mBtn_ResultReturn(): mw.StaleButton {
		if(!this.mBtn_ResultReturn_Internal&&this.uiWidgetBase) {
			this.mBtn_ResultReturn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mBtn_ResultReturn') as mw.StaleButton
		}
		return this.mBtn_ResultReturn_Internal
	}
	private mUIText20023_txt_Internal: mw.TextBlock
	public get mUIText20023_txt(): mw.TextBlock {
		if(!this.mUIText20023_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20023_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mUIText20023_txt') as mw.TextBlock
		}
		return this.mUIText20023_txt_Internal
	}
	private mImage_ResultBG_Internal: mw.Image
	public get mImage_ResultBG(): mw.Image {
		if(!this.mImage_ResultBG_Internal&&this.uiWidgetBase) {
			this.mImage_ResultBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mImage_ResultBG') as mw.Image
		}
		return this.mImage_ResultBG_Internal
	}
	private mImage_ResultTitle_Internal: mw.Image
	public get mImage_ResultTitle(): mw.Image {
		if(!this.mImage_ResultTitle_Internal&&this.uiWidgetBase) {
			this.mImage_ResultTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mImage_ResultTitle') as mw.Image
		}
		return this.mImage_ResultTitle_Internal
	}
	private mUIText20024_txt_Internal: mw.TextBlock
	public get mUIText20024_txt(): mw.TextBlock {
		if(!this.mUIText20024_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20024_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mUIText20024_txt') as mw.TextBlock
		}
		return this.mUIText20024_txt_Internal
	}
	private mImage_ItemGet_Internal: mw.Image
	public get mImage_ItemGet(): mw.Image {
		if(!this.mImage_ItemGet_Internal&&this.uiWidgetBase) {
			this.mImage_ItemGet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mImage_ItemGet') as mw.Image
		}
		return this.mImage_ItemGet_Internal
	}
	private mText_ResultName_Internal: mw.TextBlock
	public get mText_ResultName(): mw.TextBlock {
		if(!this.mText_ResultName_Internal&&this.uiWidgetBase) {
			this.mText_ResultName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mText_ResultName') as mw.TextBlock
		}
		return this.mText_ResultName_Internal
	}
	private mUIText20025_btn_Internal: mw.StaleButton
	public get mUIText20025_btn(): mw.StaleButton {
		if(!this.mUIText20025_btn_Internal&&this.uiWidgetBase) {
			this.mUIText20025_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Result/mUIText20025_btn') as mw.StaleButton
		}
		return this.mUIText20025_btn_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mUIText20014_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20014_btn");
		});
		this.initLanguage(this.mUIText20014_btn);
		this.mUIText20014_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20029_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20029_btn");
		});
		this.initLanguage(this.mUIText20029_btn);
		this.mUIText20029_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20013_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20013_btn");
		});
		this.initLanguage(this.mUIText20013_btn);
		this.mUIText20013_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20012_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20012_btn");
		});
		this.initLanguage(this.mUIText20012_btn);
		this.mUIText20012_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUITextSuit_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUITextSuit_btn");
		});
		this.initLanguage(this.mUITextSuit_btn);
		this.mUITextSuit_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20015_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20015_btn");
		});
		this.initLanguage(this.mUIText20015_btn);
		this.mUIText20015_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20016_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20016_btn");
		});
		this.initLanguage(this.mUIText20016_btn);
		this.mUIText20016_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20017_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20017_btn");
		});
		this.initLanguage(this.mUIText20017_btn);
		this.mUIText20017_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_ShopClose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_ShopClose");
		});
		this.initLanguage(this.mBtn_ShopClose);
		this.mBtn_ShopClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_VerifyReturn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_VerifyReturn");
		});
		this.initLanguage(this.mBtn_VerifyReturn);
		this.mBtn_VerifyReturn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20021_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20021_btn");
		});
		this.initLanguage(this.mUIText20021_btn);
		this.mUIText20021_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20022_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20022_btn");
		});
		this.initLanguage(this.mUIText20022_btn);
		this.mUIText20022_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_ResultReturn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_ResultReturn");
		});
		this.initLanguage(this.mBtn_ResultReturn);
		this.mBtn_ResultReturn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUIText20025_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUIText20025_btn");
		});
		this.initLanguage(this.mUIText20025_btn);
		this.mUIText20025_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mAddCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
		});
		this.mAddCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddCouponButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCouponButton");
		});
		this.mAddCouponButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_ItemShowName)
		
	
		this.initLanguage(this.mText_Time)
		
	
		this.initLanguage(this.mUIText20010_txt)
		
	
		this.initLanguage(this.mUIText20011_txt)
		
	
		this.initLanguage(this.mText_CoinsNumber)
		
	
		this.initLanguage(this.mText_DiamondNumber)
		
	
		this.initLanguage(this.mText_AdCouponNumber)
		
	
		this.initLanguage(this.mText_Member_Null)
		
	
		this.initLanguage(this.mUIText20018_txt)
		
	
		this.initLanguage(this.mText_ItemName)
		
	
		this.initLanguage(this.mUIText20019_txt)
		
	
		this.initLanguage(this.mUIText20020_txt)
		
	
		this.initLanguage(this.mText_ItemPrice)
		
	
		this.initLanguage(this.mUIText20023_txt)
		
	
		this.initLanguage(this.mUIText20024_txt)
		
	
		this.initLanguage(this.mText_ResultName)
		
	
		//文本多语言
		
	}
	
	/*初始化多语言*/
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

	/*显示panel*/
    public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	/*隐藏panel*/
    public hide(): void {
		mw.UIService.hideUI(this);
	}
 }
 