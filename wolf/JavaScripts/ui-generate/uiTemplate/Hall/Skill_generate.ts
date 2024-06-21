
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/Skill.ui
 * TIME: 2023.08.01-15.33.52
 */

 

 @UIBind('UI/uiTemplate/Hall/Skill.ui')
 export default class Skill_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Skill')
    public mCanvas_Skill: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mBtn_Close')
    public mBtn_Close: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mScrollBox/mCanvas_Content')
    public mCanvas_Content: mw.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 