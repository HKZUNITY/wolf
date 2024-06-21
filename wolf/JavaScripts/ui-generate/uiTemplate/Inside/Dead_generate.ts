
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Inside/Dead.ui
 * TIME: 2023.08.01-15.33.53
 */

 

 @UIBind('UI/uiTemplate/Inside/Dead.ui')
 export default class Dead_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mImg_Dead_BG_100')
    public mImg_Dead_BG_100: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mImg_Dead_BG_96')
    public mImg_Dead_BG_96: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mImg_Dead_BG_92')
    public mImg_Dead_BG_92: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mText_Die')
    public mText_Die: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mImg_Die')
    public mImg_Die: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mImg_Die_1')
    public mImg_Die_1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Explaine/mImg_Explaine_BG')
    public mImg_Explaine_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Explaine/mText_Explaine')
    public mText_Explaine: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Explaine')
    public mCanvas_Explaine: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mBtn_DeadAD/mUIText20032_txt')
    public mUIText20032_txt: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn_DeadAD')
    public mBtn_DeadAD: mw.Button=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_DeadAD.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_DeadAD");
		})
		this.mBtn_DeadAD.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Die)
		
	
		this.initLanguage(this.mText_Explaine)
		
	
		this.initLanguage(this.mUIText20032_txt)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 