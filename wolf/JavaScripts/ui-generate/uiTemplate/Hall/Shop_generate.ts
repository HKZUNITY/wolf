
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/Shop.ui
 * TIME: 2023.08.03-10.56.57
 */



@UIBind('UI/uiTemplate/Hall/Shop.ui')
export default class Shop_Generate extends mw.UIScript {
    @UIWidgetBind('RootCanvas/mScrollBox_WholePro')
    public mScrollBox_WholePro: mw.ScrollBox = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop')
    public mCanvas_Shop: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemShow')
    public mCanvas_ItemShow: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mImage_ShowBG')
    public mImage_ShowBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mImage_ItemShow')
    public mImage_ItemShow: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mText_ItemShowName')
    public mText_ItemShowName: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mText_Time')
    public mText_Time: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mUIText20010_txt')
    public mUIText20010_txt: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemShow/mUIText20011_txt')
    public mUIText20011_txt: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose')
    public mCanvas_ItemChoose: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mImage_ItemChooseBG')
    public mImage_ItemChooseBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mImage_ItemTitleBG')
    public mImage_ItemTitleBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mScrollBox_Items')
    public mScrollBox_Items: mw.ScrollBox = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mScrollBox_Items/mCanvas_Items')
    public mCanvas_Items: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes')
    public mCanvas_ItemTypes: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20014_btn')
    public mUIText20014_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20029_btn')
    public mUIText20029_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20013_btn')
    public mUIText20013_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUIText20012_btn')
    public mUIText20012_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ItemChoose/mCanvas_ItemTypes/mUITextSuit_btn')
    public mUITextSuit_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money')
    public mCanvas_Money: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mImage_ShopMoney')
    public mImage_ShopMoney: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin')
    public mCanvas_Coin: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mImage_CoinBG')
    public mImage_CoinBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mImage_CoinFrame')
    public mImage_CoinFrame: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mImage_CoinIcon')
    public mImage_CoinIcon: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mText_CoinsNumber')
    public mText_CoinsNumber: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_Coin/mAddCoinButton')
    public mAddCoinButton: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond')
    public cCanvas_Diamond: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mImage_DiamondBG')
    public mImage_DiamondBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mImage_DiamondFrame')
    public mImage_DiamondFrame: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mImage_DiamondIcon')
    public mImage_DiamondIcon: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/cCanvas_Diamond/mText_DiamondNumber')
    public mText_DiamondNumber: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon')
    public mCanvas_AdCoupon: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mImage_AdCouponBG')
    public mImage_AdCouponBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mImage_AdCouponFrame')
    public mImage_AdCouponFrame: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mImage_AdCouponIcon')
    public mImage_AdCouponIcon: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mText_AdCouponNumber')
    public mText_AdCouponNumber: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Money/mCanvas_AdCoupon/mAddCouponButton')
    public mAddCouponButton: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Buy')
    public mCanvas_Buy: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Buy/mUIText20015_btn')
    public mUIText20015_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Buy/mUIText20016_btn')
    public mUIText20016_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Buy/mUIText20017_btn')
    public mUIText20017_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_Buy/mText_Member_Null')
    public mText_Member_Null: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ShopClose')
    public mCanvas_ShopClose: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ShopClose/mImage_CloseBG')
    public mImage_CloseBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ShopClose/mImage_CloseFrame')
    public mImage_CloseFrame: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Shop/mCanvas_ShopClose/mBtn_ShopClose')
    public mBtn_ShopClose: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification')
    public mCanvas_Verification: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mBtn_VerifyReturn')
    public mBtn_VerifyReturn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mScrollBox_VerifyProtect')
    public mScrollBox_VerifyProtect: mw.ScrollBox = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mImage_VerifyBG')
    public mImage_VerifyBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mImage_VerifyTitle')
    public mImage_VerifyTitle: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mUIText20018_txt')
    public mUIText20018_txt: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails')
    public mCanvas_ItemDetails: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemIconBG')
    public mImage_ItemIconBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemIcon')
    public mImage_ItemIcon: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mText_ItemName')
    public mText_ItemName: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mUIText20019_txt')
    public mUIText20019_txt: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mUIText20020_txt')
    public mUIText20020_txt: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mText_ItemPrice')
    public mText_ItemPrice: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemPrice')
    public mImage_ItemPrice: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemPrice_Diamond')
    public mImage_ItemPrice_Diamond: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemDetails/mImage_ItemPrice_Ad')
    public mImage_ItemPrice_Ad: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemBuy')
    public mCanvas_ItemBuy: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemBuy/mUIText20021_btn')
    public mUIText20021_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Verification/mCanvas_ItemBuy/mUIText20022_btn')
    public mUIText20022_btn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result')
    public mCanvas_Result: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mBtn_ResultReturn')
    public mBtn_ResultReturn: mw.StaleButton = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mUIText20023_txt')
    public mUIText20023_txt: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mImage_ResultBG')
    public mImage_ResultBG: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mImage_ResultTitle')
    public mImage_ResultTitle: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mUIText20024_txt')
    public mUIText20024_txt: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mImage_ItemGet')
    public mImage_ItemGet: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mText_ResultName')
    public mText_ResultName: mw.TextBlock = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mScrollBox_ResultProtect')
    public mScrollBox_ResultProtect: mw.ScrollBox = undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Result/mUIText20025_btn')
    public mUIText20025_btn: mw.StaleButton = undefined;



    protected onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    protected initButtons() {
        //按钮添加点击

        this.mUIText20014_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20014_btn");
        })
        this.initLanguage(this.mUIText20014_btn);
        this.mUIText20014_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20029_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20029_btn");
        })
        this.initLanguage(this.mUIText20029_btn);
        this.mUIText20029_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20013_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20013_btn");
        })
        this.initLanguage(this.mUIText20013_btn);
        this.mUIText20013_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20012_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20012_btn");
        })
        this.initLanguage(this.mUIText20012_btn);
        this.mUIText20012_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);

        this.mUITextSuit_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUITextSuit_btn");
        })
        this.initLanguage(this.mUITextSuit_btn);
        this.mUITextSuit_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);

        this.mUIText20015_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20015_btn");
        })
        this.initLanguage(this.mUIText20015_btn);
        this.mUIText20015_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20016_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20016_btn");
        })
        this.initLanguage(this.mUIText20016_btn);
        this.mUIText20016_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20017_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20017_btn");
        })
        this.initLanguage(this.mUIText20017_btn);
        this.mUIText20017_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mBtn_ShopClose.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn_ShopClose");
        })
        this.initLanguage(this.mBtn_ShopClose);
        this.mBtn_ShopClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mBtn_VerifyReturn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn_VerifyReturn");
        })
        this.initLanguage(this.mBtn_VerifyReturn);
        this.mBtn_VerifyReturn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20021_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20021_btn");
        })
        this.initLanguage(this.mUIText20021_btn);
        this.mUIText20021_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20022_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20022_btn");
        })
        this.initLanguage(this.mUIText20022_btn);
        this.mUIText20022_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mBtn_ResultReturn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn_ResultReturn");
        })
        this.initLanguage(this.mBtn_ResultReturn);
        this.mBtn_ResultReturn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        this.mUIText20025_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mUIText20025_btn");
        })
        this.initLanguage(this.mUIText20025_btn);
        this.mUIText20025_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


        //按钮添加点击


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
    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
}
