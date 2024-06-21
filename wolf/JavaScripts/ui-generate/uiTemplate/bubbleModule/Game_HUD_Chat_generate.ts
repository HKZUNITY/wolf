
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/bubbleModule/Game_HUD_Chat.ui
 * TIME: 2023.08.01-15.33.50
 */

 

 @UIBind('UI/uiTemplate/bubbleModule/Game_HUD_Chat.ui')
 export default class Game_HUD_Chat_Generate extends mw.UIScript {
	 @UIWidgetBind('Canvas/canvas_btn')
    public canvas_btn: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/canvas_btn/wordBtn')
    public wordBtn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/canvas_word')
    public canvas_word: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/canvas_word/scrollBox_word')
    public scrollBox_word: mw.ScrollBox=undefined;
    @UIWidgetBind('Canvas/canvas_word/scrollBox_word/mCanvasWord')
    public mCanvasWord: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.wordBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "wordBtn");
		})
		this.initLanguage(this.wordBtn);
		this.wordBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

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
 