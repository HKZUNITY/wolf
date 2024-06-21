
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/Lottery_0.ui
 * TIME: 2023.08.01-15.33.51
 */

 

 @UIBind('UI/uiTemplate/Hall/Lottery_0.ui')
 export default class Lottery_0_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_lottery0/mImage_ShowBG')
    public mImage_ShowBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mTextBlock')
    public mTextBlock: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mBtn_Close_1')
    public mBtn_Close_1: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mScrollBox/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_lottery0')
    public mCanvas_lottery0: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Close_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close_1");
		})
		this.initLanguage(this.mBtn_Close_1);
		this.mBtn_Close_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 