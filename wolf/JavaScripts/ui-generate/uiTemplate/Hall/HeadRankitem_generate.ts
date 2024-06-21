
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/HeadRankitem.ui
 * TIME: 2023.08.01-15.33.50
 */

 

 @UIBind('UI/uiTemplate/Hall/HeadRankitem.ui')
 export default class HeadRankitem_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Rank_1/mImg_BG_1')
    public mImg_BG_1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Rank_1/mText_Rank_1')
    public mText_Rank_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Rank_1')
    public mCanvas_Rank_1: mw.Canvas=undefined;
    

 
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
		
		this.initLanguage(this.mText_Rank_1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 