
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/SkillDes.ui
 * TIME: 2023.08.02-16.13.08
 */

 

 @UIBind('UI/uiTemplate/Hall/SkillDes.ui')
 export default class SkillDes_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Close')
    public mBtn_Close: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Own')
    public mCanvas_Own: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Own/mBtn_Use')
    public mBtn_Use: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Own/mText_Own')
    public mText_Own: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Own/mCanvas_Equip')
    public mCanvas_Equip: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Own/mCanvas_Equip/mImg_Equip')
    public mImg_Equip: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Own/mCanvas_Equip/mText_Equip')
    public mText_Equip: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon')
    public mCanvas_Icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mImg_Icon')
    public mImg_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mText_Num')
    public mText_Num: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Text')
    public mCanvas_Text: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Text/mText_Name')
    public mText_Name: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Text/mText_Des')
    public mText_Des: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price')
    public mCanvas_Price: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Num')
    public mCanvas_Price_Num: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_1')
    public mCanvas_Price_1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_1/mImg_Price_1')
    public mImg_Price_1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_1/mText_Price_1')
    public mText_Price_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_2')
    public mCanvas_Price_2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_2/mImg_Price_2')
    public mImg_Price_2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_2/mText_Price_2')
    public mText_Price_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Buy')
    public mCanvas_Price_Buy: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Buy/mBtn_Price1_Buy')
    public mBtn_Price1_Buy: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Price/mCanvas_Price_Buy/mBtn_Price2_Buy')
    public mBtn_Price2_Buy: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange')
    public mCanvas_Exchange: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mCanvas_Price_3')
    public mCanvas_Price_3: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mCanvas_Price_3/mImg_Price_3')
    public mImg_Price_3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mCanvas_Price_3/mText_Price_3')
    public mText_Price_3: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Exchange/mBtn_Price3_Buy')
    public mBtn_Price3_Buy: mw.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Use");
		})
		this.initLanguage(this.mBtn_Use);
		this.mBtn_Use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Price1_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Price1_Buy");
		})
		this.initLanguage(this.mBtn_Price1_Buy);
		this.mBtn_Price1_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Price2_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Price2_Buy");
		})
		this.initLanguage(this.mBtn_Price2_Buy);
		this.mBtn_Price2_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Price3_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Price3_Buy");
		})
		this.initLanguage(this.mBtn_Price3_Buy);
		this.mBtn_Price3_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Own)
		
	
		this.initLanguage(this.mText_Equip)
		
	
		this.initLanguage(this.mText_Num)
		
	
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Des)
		
	
		this.initLanguage(this.mText_Price_1)
		
	
		this.initLanguage(this.mText_Price_2)
		
	
		this.initLanguage(this.mText_Price_3)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 