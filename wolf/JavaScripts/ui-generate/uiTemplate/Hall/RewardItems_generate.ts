
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/RewardItems.ui
 * TIME: 2023.07.27-14.53.35
 */

 

 @UIBind('UI/uiTemplate/Hall/RewardItems.ui')
 export default class RewardItems_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Icon')
    public mCanvas_Icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mImage_IconBG')
    public mImage_IconBG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mImage_Icon')
    public mImage_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mText_RewardNum')
    public mText_RewardNum: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mText_Num')
    public mText_Num: mw.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.mText_RewardNum)
		
	
		this.initLanguage(this.mText_Num)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 