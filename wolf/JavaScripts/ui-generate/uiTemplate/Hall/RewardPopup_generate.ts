
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/RewardPopup.ui
 * TIME: 2023.07.27-11.48.39
 */

 

 @UIBind('UI/uiTemplate/Hall/RewardPopup.ui')
 export default class RewardPopup_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mImage_Protect')
    public mImage_Protect: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup')
    public mCanvas_RewardPopup: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mImage_RewardBG')
    public mImage_RewardBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mImage_RewardTitle')
    public mImage_RewardTitle: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mUIText20033_txt')
    public mUIText20033_txt: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mBtn_RewardClose')
    public mBtn_RewardClose: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mCanvas_RewardContent')
    public mCanvas_RewardContent: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mCanvas_RewardContent/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mCanvas_RewardContent/mScrollBox/mCanvas_Content')
    public mCanvas_Content: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mCanvas_RewardContent/mCanvas_Icon')
    public mCanvas_Icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mCanvas_RewardContent/mCanvas_Icon/mImage_IconBG')
    public mImage_IconBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mCanvas_RewardContent/mCanvas_Icon/mImage_Icon')
    public mImage_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_RewardPopup/mCanvas_RewardContent/mCanvas_Icon/mText_RewardNum')
    public mText_RewardNum: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_RewardClose.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_RewardClose");
		})
		this.mBtn_RewardClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mUIText20033_txt)
		
	
		this.initLanguage(this.mText_RewardNum)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 