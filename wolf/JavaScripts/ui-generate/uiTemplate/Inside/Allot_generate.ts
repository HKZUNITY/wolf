
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Inside/Allot.ui
 * TIME: 2023.07.26-16.32.31
 */

 

 @UIBind('UI/uiTemplate/Inside/Allot.ui')
 export default class Allot_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mText_Title')
    public mText_Title: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Explain')
    public mText_Explain: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mText_Member')
    public mText_Member: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_Identity/mText_Detective')
    public mText_Detective: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_Identity/mText_Maffia')
    public mText_Maffia: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_Identity/mText_Civilian')
    public mText_Civilian: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_Prob/mText_ProbNumber')
    public mText_ProbNumber: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Canvas_Prob/mText_Prob')
    public mText_Prob: mw.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Explain)
		
	
		this.initLanguage(this.mText_Member)
		
	
		this.initLanguage(this.mText_Detective)
		
	
		this.initLanguage(this.mText_Maffia)
		
	
		this.initLanguage(this.mText_Civilian)
		
	
		this.initLanguage(this.mText_ProbNumber)
		
	
		this.initLanguage(this.mText_Prob)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 