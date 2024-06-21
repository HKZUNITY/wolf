
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/LotteryItem_1.ui
 * TIME: 2023.08.01-15.33.51
 */

 

 @UIBind('UI/uiTemplate/Hall/LotteryItem_1.ui')
 export default class LotteryItem_1_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_LotteryItem/mBtn_Items')
    public mBtn_Items: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_LotteryItem/mImage_BG')
    public mImage_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_LotteryItem/mImage_Items')
    public mImage_Items: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_LotteryItem/mText_Items')
    public mText_Items: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_LotteryItem')
    public mCanvas_LotteryItem: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Items.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Items");
		})
		this.initLanguage(this.mBtn_Items);
		this.mBtn_Items.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Items)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 