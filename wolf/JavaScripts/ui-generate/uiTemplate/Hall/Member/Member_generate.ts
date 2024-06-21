
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/Member/Member.ui
 * TIME: 2023.07.27-11.48.40
 */

 

 @UIBind('UI/uiTemplate/Hall/Member/Member.ui')
 export default class Member_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mBtn_Close')
    public mBtn_Close: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal')
    public mCanvas_MemberNormal: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mText_Normal_Title')
    public mText_Normal_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mText_Normal_Content')
    public mText_Normal_Content: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mCanvas_Normal_Icon')
    public mCanvas_Normal_Icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mCanvas_Normal_Icon/mScrollBox_Normal')
    public mScrollBox_Normal: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mCanvas_Normal_Icon/mScrollBox_Normal/mCanvas_Normal_Reward')
    public mCanvas_Normal_Reward: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mText_Normal_Tip')
    public mText_Normal_Tip: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mCanvas_Normal_State')
    public mCanvas_Normal_State: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mCanvas_Normal_State/mBtne_Normal_Buy')
    public mBtne_Normal_Buy: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberNormal/mCanvas_Normal_State/mText_Normal_Own')
    public mText_Normal_Own: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper')
    public mCanvas_MemberSuper: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mText_Super_Title')
    public mText_Super_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mText_Super_Content')
    public mText_Super_Content: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_Icon')
    public mCanvas_Super_Icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_Icon/mScrollBox_Super')
    public mScrollBox_Super: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_Icon/mScrollBox_Super/mCanvas_Super_Reward')
    public mCanvas_Super_Reward: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_Tip')
    public mCanvas_Super_Tip: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_Tip/mText_Super_Tip_1')
    public mText_Super_Tip_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_Tip/mImg_Super_Tip_Icon')
    public mImg_Super_Tip_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_Tip/mText_Super_Tip_2')
    public mText_Super_Tip_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_State')
    public mCanvas_Super_State: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_State/mBtne_Super_Buy')
    public mBtne_Super_Buy: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_State/mCanvas_Own')
    public mCanvas_Own: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_State/mCanvas_Own/mText_Super_Own')
    public mText_Super_Own: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MemberSuper/mCanvas_Super_State/mCanvas_Own/mText_Super_CountDown')
    public mText_Super_CountDown: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtne_Normal_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtne_Normal_Buy");
		})
		this.initLanguage(this.mBtne_Normal_Buy);
		this.mBtne_Normal_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtne_Super_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtne_Super_Buy");
		})
		this.initLanguage(this.mBtne_Super_Buy);
		this.mBtne_Super_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Normal_Title)
		
	
		this.initLanguage(this.mText_Normal_Content)
		
	
		this.initLanguage(this.mText_Normal_Tip)
		
	
		this.initLanguage(this.mText_Normal_Own)
		
	
		this.initLanguage(this.mText_Super_Title)
		
	
		this.initLanguage(this.mText_Super_Content)
		
	
		this.initLanguage(this.mText_Super_Tip_1)
		
	
		this.initLanguage(this.mText_Super_Tip_2)
		
	
		this.initLanguage(this.mText_Super_Own)
		
	
		this.initLanguage(this.mText_Super_CountDown)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 