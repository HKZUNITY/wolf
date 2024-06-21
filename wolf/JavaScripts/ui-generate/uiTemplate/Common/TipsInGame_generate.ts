
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Common/TipsInGame.ui
 * TIME: 2023.08.01-15.33.53
 */

 

 @UIBind('UI/uiTemplate/Common/TipsInGame.ui')
 export default class TipsInGame_Generate extends mw.UIScript {
	 @UIWidgetBind('Canvas_TipsInGame/mCanvas_StageTips/mImg_StageBG')
    public mImg_StageBG: mw.Image=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_StageTips/mImg_StageIcon')
    public mImg_StageIcon: mw.Image=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_StageTips/mText_StageContent')
    public mText_StageContent: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_StageTips')
    public mCanvas_StageTips: mw.Canvas=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_GuideTips/mImg_GuideBG')
    public mImg_GuideBG: mw.Image=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_GuideTips/mImg_GuideIcon')
    public mImg_GuideIcon: mw.Image=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_GuideTips/mText_GuideContent')
    public mText_GuideContent: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_GuideTips')
    public mCanvas_GuideTips: mw.Canvas=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_MirrorTips/mImg_MirrorBG')
    public mImg_MirrorBG: mw.Image=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_MirrorTips/mText_MirrorContent')
    public mText_MirrorContent: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas_TipsInGame/mCanvas_MirrorTips')
    public mCanvas_MirrorTips: mw.Canvas=undefined;
    

 
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
		
		this.initLanguage(this.mText_StageContent)
		
	
		this.initLanguage(this.mText_GuideContent)
		
	
		this.initLanguage(this.mText_MirrorContent)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 