
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/PwUI.ui
 * TIME: 2023.08.01-15.33.49
 */

 

 @UIBind('UI/PwUI.ui')
 export default class PwUI_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mStaleButton_exit')
    public mStaleButton_exit: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mImage_BackColor')
    public mImage_BackColor: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_1')
    public mButton_1: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_2')
    public mButton_2: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_3')
    public mButton_3: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_0')
    public mButton_0: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_4')
    public mButton_4: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_5')
    public mButton_5: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_6')
    public mButton_6: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_R')
    public mButton_R: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_7')
    public mButton_7: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_8')
    public mButton_8: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_9')
    public mButton_9: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mButton_OK')
    public mButton_OK: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mKey/mCanvas_pw/mTextBlock4')
    public mTextBlock4: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mKey/mCanvas_pw/mTextBlock_1')
    public mTextBlock_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mKey/mCanvas_pw/mTextBlock_3')
    public mTextBlock_3: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mKey/mCanvas_pw/mTextBlock_2')
    public mTextBlock_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mKey/mCanvas_pw')
    public mCanvas_pw: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mKey')
    public mKey: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mStaleButton_exit.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mStaleButton_exit");
		})
		this.initLanguage(this.mStaleButton_exit);
		this.mStaleButton_exit.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_1");
		})
		this.initLanguage(this.mButton_1);
		this.mButton_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_2");
		})
		this.initLanguage(this.mButton_2);
		this.mButton_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_3");
		})
		this.initLanguage(this.mButton_3);
		this.mButton_3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_0.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_0");
		})
		this.initLanguage(this.mButton_0);
		this.mButton_0.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_4");
		})
		this.initLanguage(this.mButton_4);
		this.mButton_4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_5");
		})
		this.initLanguage(this.mButton_5);
		this.mButton_5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_6.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_6");
		})
		this.initLanguage(this.mButton_6);
		this.mButton_6.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_R.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_R");
		})
		this.initLanguage(this.mButton_R);
		this.mButton_R.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_7.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_7");
		})
		this.initLanguage(this.mButton_7);
		this.mButton_7.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_8.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_8");
		})
		this.initLanguage(this.mButton_8);
		this.mButton_8.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_9.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_9");
		})
		this.initLanguage(this.mButton_9);
		this.mButton_9.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_OK.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_OK");
		})
		this.initLanguage(this.mButton_OK);
		this.mButton_OK.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock4)
		
	
		this.initLanguage(this.mTextBlock_1)
		
	
		this.initLanguage(this.mTextBlock_3)
		
	
		this.initLanguage(this.mTextBlock_2)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 