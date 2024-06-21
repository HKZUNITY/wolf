
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Hall/SkillItem.ui
 * TIME: 2023.08.01-10.14.50
 */

 

 @UIBind('UI/uiTemplate/Hall/SkillItem.ui')
 export default class SkillItem_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mImg_Icon')
    public mImg_Icon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mText_Name')
    public mText_Name: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Full')
    public mBtn_Full: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mImg_Equip')
    public mImg_Equip: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mText_Num')
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
		
		this.mBtn_Full.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Full");
		})
		this.mBtn_Full.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
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
 