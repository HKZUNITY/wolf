
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: abby
 * UI: UI/uiTemplate/Hall/Member/MemberItems.ui
 * TIME: 2023.07.27-18.09.40
 */

 

 @UIBind('UI/uiTemplate/Hall/Member/MemberItems.ui')
 export default class MemberItems_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Icon')
    public mCanvas_Icon: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mImg_Icon')
    public mImg_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Icon/mText_Des')
    public mText_Des: mw.TextBlock=undefined;
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
		
		this.initLanguage(this.mText_Des)
		
	
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
 