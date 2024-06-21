
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/LotterySlot_4.ui
 * TIME: 2023.08.01-15.33.51
 */

 

 @UIBind('UI/uiTemplate/Hall/LotterySlot_4.ui')
 export default class LotterySlot_4_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_slot/mImage_ShowBG')
    public mImage_ShowBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_slot/mScrollBox_weapon/mCanvas')
    public mCanvas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_slot/mScrollBox_weapon')
    public mScrollBox_weapon: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_slot/mImage_yellowLine')
    public mImage_yellowLine: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_slot/mBtn_Close')
    public mBtn_Close: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_slot')
    public mCanvas_slot: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.initLanguage(this.mBtn_Close);
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_slot/TextBlock_doing") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 