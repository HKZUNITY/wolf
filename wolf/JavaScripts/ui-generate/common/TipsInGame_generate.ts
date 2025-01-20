/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/common/TipsInGame.ui
 * TIME: 2025.01.20-22.23.08
 */
 
@UIBind('UI/common/TipsInGame.ui')
export default class TipsInGame_Generate extends UIScript {
		private mImg_StageBG_Internal: mw.Image
	public get mImg_StageBG(): mw.Image {
		if(!this.mImg_StageBG_Internal&&this.uiWidgetBase) {
			this.mImg_StageBG_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_StageTips/mImg_StageBG') as mw.Image
		}
		return this.mImg_StageBG_Internal
	}
	private mImg_StageIcon_Internal: mw.Image
	public get mImg_StageIcon(): mw.Image {
		if(!this.mImg_StageIcon_Internal&&this.uiWidgetBase) {
			this.mImg_StageIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_StageTips/mImg_StageIcon') as mw.Image
		}
		return this.mImg_StageIcon_Internal
	}
	private mText_StageContent_Internal: mw.TextBlock
	public get mText_StageContent(): mw.TextBlock {
		if(!this.mText_StageContent_Internal&&this.uiWidgetBase) {
			this.mText_StageContent_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_StageTips/mText_StageContent') as mw.TextBlock
		}
		return this.mText_StageContent_Internal
	}
	private mCanvas_StageTips_Internal: mw.Canvas
	public get mCanvas_StageTips(): mw.Canvas {
		if(!this.mCanvas_StageTips_Internal&&this.uiWidgetBase) {
			this.mCanvas_StageTips_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_StageTips') as mw.Canvas
		}
		return this.mCanvas_StageTips_Internal
	}
	private mImg_GuideBG_Internal: mw.Image
	public get mImg_GuideBG(): mw.Image {
		if(!this.mImg_GuideBG_Internal&&this.uiWidgetBase) {
			this.mImg_GuideBG_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_GuideTips/mImg_GuideBG') as mw.Image
		}
		return this.mImg_GuideBG_Internal
	}
	private mImg_GuideIcon_Internal: mw.Image
	public get mImg_GuideIcon(): mw.Image {
		if(!this.mImg_GuideIcon_Internal&&this.uiWidgetBase) {
			this.mImg_GuideIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_GuideTips/mImg_GuideIcon') as mw.Image
		}
		return this.mImg_GuideIcon_Internal
	}
	private mText_GuideContent_Internal: mw.TextBlock
	public get mText_GuideContent(): mw.TextBlock {
		if(!this.mText_GuideContent_Internal&&this.uiWidgetBase) {
			this.mText_GuideContent_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_GuideTips/mText_GuideContent') as mw.TextBlock
		}
		return this.mText_GuideContent_Internal
	}
	private mCanvas_GuideTips_Internal: mw.Canvas
	public get mCanvas_GuideTips(): mw.Canvas {
		if(!this.mCanvas_GuideTips_Internal&&this.uiWidgetBase) {
			this.mCanvas_GuideTips_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_GuideTips') as mw.Canvas
		}
		return this.mCanvas_GuideTips_Internal
	}
	private mImg_MirrorBG_Internal: mw.Image
	public get mImg_MirrorBG(): mw.Image {
		if(!this.mImg_MirrorBG_Internal&&this.uiWidgetBase) {
			this.mImg_MirrorBG_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_MirrorTips/mImg_MirrorBG') as mw.Image
		}
		return this.mImg_MirrorBG_Internal
	}
	private mText_MirrorContent_Internal: mw.TextBlock
	public get mText_MirrorContent(): mw.TextBlock {
		if(!this.mText_MirrorContent_Internal&&this.uiWidgetBase) {
			this.mText_MirrorContent_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_MirrorTips/mText_MirrorContent') as mw.TextBlock
		}
		return this.mText_MirrorContent_Internal
	}
	private mCanvas_MirrorTips_Internal: mw.Canvas
	public get mCanvas_MirrorTips(): mw.Canvas {
		if(!this.mCanvas_MirrorTips_Internal&&this.uiWidgetBase) {
			this.mCanvas_MirrorTips_Internal = this.uiWidgetBase.findChildByPath('Canvas_TipsInGame/mCanvas_MirrorTips') as mw.Canvas
		}
		return this.mCanvas_MirrorTips_Internal
	}


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
	
	/*初始化多语言*/
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

	/*显示panel*/
    public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	/*隐藏panel*/
    public hide(): void {
		mw.UIService.hideUI(this);
	}
 }
 