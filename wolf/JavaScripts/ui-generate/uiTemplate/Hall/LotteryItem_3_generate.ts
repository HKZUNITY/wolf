
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/LotteryItem_3.ui
 * TIME: 2023.08.01-15.33.51
 */

 

 @UIBind('UI/uiTemplate/Hall/LotteryItem_3.ui')
 export default class LotteryItem_3_Generate extends mw.UIScript {
	 @UIWidgetBind('mRootCanvas/mCanvas_LotteryItem/mImage_BG')
    public mImage_BG: mw.Image=undefined;
    @UIWidgetBind('mRootCanvas/mCanvas_LotteryItem/mImage_Items')
    public mImage_Items: mw.Image=undefined;
    @UIWidgetBind('mRootCanvas/mCanvas_LotteryItem/mText_Items')
    public mText_Items: mw.TextBlock=undefined;
    @UIWidgetBind('mRootCanvas/mCanvas_LotteryItem/mText_Items_1')
    public mText_Items_1: mw.TextBlock=undefined;
    @UIWidgetBind('mRootCanvas/mCanvas_LotteryItem')
    public mCanvas_LotteryItem: mw.Canvas=undefined;
    @UIWidgetBind('mRootCanvas')
    public mRootCanvas: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Items)
		
	
		this.initLanguage(this.mText_Items_1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 