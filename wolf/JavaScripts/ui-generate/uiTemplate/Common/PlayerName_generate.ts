
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Common/PlayerName.ui
 * TIME: 2023.08.01-21.47.02
 */

 

 @UIBind('UI/uiTemplate/Common/PlayerName.ui')
 export default class PlayerName_Generate extends mw.UIScript {
	 @UIWidgetBind('mRootCanvas')
    public mRootCanvas: mw.Canvas=undefined;
    @UIWidgetBind('mRootCanvas/mText_name')
    public mText_name: mw.TextBlock=undefined;
    @UIWidgetBind('mRootCanvas/mCanvas_Rank_1')
    public mCanvas_Rank_1: mw.Canvas=undefined;
    @UIWidgetBind('mRootCanvas/mCanvas_Rank_1/mImg_BG_1')
    public mImg_BG_1: mw.Image=undefined;
    @UIWidgetBind('mRootCanvas/mCanvas_Rank_1/mText_Rank_1')
    public mText_Rank_1: mw.TextBlock=undefined;
    @UIWidgetBind('mRootCanvas/mText_Countdown')
    public mText_Countdown: mw.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.mText_name)
		
	
		this.initLanguage(this.mText_Rank_1)
		
	
		this.initLanguage(this.mText_Countdown)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 