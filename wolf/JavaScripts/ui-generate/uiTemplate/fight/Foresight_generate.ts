
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/fight/Foresight.ui
 * TIME: 2023.08.01-15.33.50
 */

 

 @UIBind('UI/uiTemplate/fight/Foresight.ui')
 export default class Foresight_Generate extends mw.UIScript {
	 @UIWidgetBind('mRootCanvas')
    public mRootCanvas: mw.Canvas=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01')
    public mBtn_01: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_1')
    public mBtn_01_1: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_2')
    public mBtn_01_2: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_3')
    public mBtn_01_3: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_4')
    public mBtn_01_4: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_5')
    public mBtn_01_5: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_6')
    public mBtn_01_6: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_7')
    public mBtn_01_7: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_8')
    public mBtn_01_8: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_9')
    public mBtn_01_9: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_10')
    public mBtn_01_10: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_11')
    public mBtn_01_11: mw.Button=undefined;
    @UIWidgetBind('mRootCanvas/mBtn_01_12')
    public mBtn_01_12: mw.Button=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_01.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01");
		})
		this.mBtn_01.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_1");
		})
		this.mBtn_01_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_2");
		})
		this.mBtn_01_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_3");
		})
		this.mBtn_01_3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_4");
		})
		this.mBtn_01_4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_5");
		})
		this.mBtn_01_5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_6.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_6");
		})
		this.mBtn_01_6.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_7.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_7");
		})
		this.mBtn_01_7.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_8.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_8");
		})
		this.mBtn_01_8.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_9.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_9");
		})
		this.mBtn_01_9.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_10.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_10");
		})
		this.mBtn_01_10.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_11.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_11");
		})
		this.mBtn_01_11.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_12.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_12");
		})
		this.mBtn_01_12.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 