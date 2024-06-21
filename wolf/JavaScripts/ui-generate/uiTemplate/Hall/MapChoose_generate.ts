
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/MapChoose.ui
 * TIME: 2023.08.01-15.33.52
 */

 

 @UIBind('UI/uiTemplate/Hall/MapChoose.ui')
 export default class MapChoose_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mImage_Protect')
    public mImage_Protect: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mScrollBox_Protect')
    public mScrollBox_Protect: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose')
    public mCanvas_MapChoose: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mImage_BackGround')
    public mImage_BackGround: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mImage_Title')
    public mImage_Title: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mText_TopTips')
    public mText_TopTips: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mText_ChooseTime')
    public mText_ChooseTime: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map1')
    public mCanvas_Map1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mImage_Map1')
    public mImage_Map1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mText_Map1')
    public mText_Map1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mBtn_Map1')
    public mBtn_Map1: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mImage_MapIcon1')
    public mImage_MapIcon1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mText_ChooseNum1')
    public mText_ChooseNum1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map2')
    public mCanvas_Map2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mImage_Map2')
    public mImage_Map2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mText_Map2')
    public mText_Map2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mBtn_Map2')
    public mBtn_Map2: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mImage_MapIcon2')
    public mImage_MapIcon2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mText_ChooseNum2')
    public mText_ChooseNum2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map3')
    public mCanvas_Map3: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mImage_Map3')
    public mImage_Map3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mText_Map3')
    public mText_Map3: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mBtn_Map3')
    public mBtn_Map3: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mImage_MapIcon3')
    public mImage_MapIcon3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mText_ChooseNum3')
    public mText_ChooseNum3: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose1')
    public mCanvas_PChoose1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose1/mImage_PChooseIcon1')
    public mImage_PChooseIcon1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose2')
    public mCanvas_PChoose2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose2/mImage_PChooseIcon2')
    public mImage_PChooseIcon2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose3')
    public mCanvas_PChoose3: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose3/mImage_PChooseIcon3')
    public mImage_PChooseIcon3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose1')
    public mCanvas_SysChoose1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose1/mImage_SysChoose1')
    public mImage_SysChoose1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose2')
    public mCanvas_SysChoose2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose2/mImage_SysChoose2')
    public mImage_SysChoose2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose3')
    public mCanvas_SysChoose3: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose3/mImage_SysChoose3')
    public mImage_SysChoose3: mw.Image=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Map1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Map1");
		})
		this.initLanguage(this.mBtn_Map1);
		this.mBtn_Map1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Map2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Map2");
		})
		this.initLanguage(this.mBtn_Map2);
		this.mBtn_Map2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Map3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Map3");
		})
		this.initLanguage(this.mBtn_Map3);
		this.mBtn_Map3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_TopTips)
		
	
		this.initLanguage(this.mText_ChooseTime)
		
	
		this.initLanguage(this.mText_Map1)
		
	
		this.initLanguage(this.mText_ChooseNum1)
		
	
		this.initLanguage(this.mText_Map2)
		
	
		this.initLanguage(this.mText_ChooseNum2)
		
	
		this.initLanguage(this.mText_Map3)
		
	
		this.initLanguage(this.mText_ChooseNum3)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 