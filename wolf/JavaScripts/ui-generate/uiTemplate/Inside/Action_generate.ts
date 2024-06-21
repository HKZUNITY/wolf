
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Inside/Action.ui
 * TIME: 2023.08.01-15.33.51
 */

 

 @UIBind('UI/uiTemplate/Inside/Action.ui')
 export default class Action_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Action_1/mImg_Action_1')
    public mImg_Action_1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Action_1/mText_Action_1')
    public mText_Action_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Action_1/mBtn_Action_1')
    public mBtn_Action_1: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Action_1')
    public mCanvas_Action_1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Action_2/mImg_Action_2')
    public mImg_Action_2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Action_2/mText_Action_2')
    public mText_Action_2: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Action_2/mBtn_Action_2')
    public mBtn_Action_2: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Action_2')
    public mCanvas_Action_2: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_Action_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Action_1");
		})
		this.mBtn_Action_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Action_2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Action_2");
		})
		this.mBtn_Action_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Action_1)
		
	
		this.initLanguage(this.mText_Action_2)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 