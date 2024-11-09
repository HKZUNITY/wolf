/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/DeadPanel.ui
 * TIME: 2024.11.10-00.23.21
 */
 
@UIBind('UI/module/GameModule/DeadPanel.ui')
export default class DeadPanel_Generate extends UIScript {
		private mImg_Dead_BG_100_Internal: mw.Image
	public get mImg_Dead_BG_100(): mw.Image {
		if(!this.mImg_Dead_BG_100_Internal&&this.uiWidgetBase) {
			this.mImg_Dead_BG_100_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Dead_BG_100') as mw.Image
		}
		return this.mImg_Dead_BG_100_Internal
	}
	private mImg_Dead_BG_96_Internal: mw.Image
	public get mImg_Dead_BG_96(): mw.Image {
		if(!this.mImg_Dead_BG_96_Internal&&this.uiWidgetBase) {
			this.mImg_Dead_BG_96_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Dead_BG_96') as mw.Image
		}
		return this.mImg_Dead_BG_96_Internal
	}
	private mImg_Dead_BG_92_Internal: mw.Image
	public get mImg_Dead_BG_92(): mw.Image {
		if(!this.mImg_Dead_BG_92_Internal&&this.uiWidgetBase) {
			this.mImg_Dead_BG_92_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Dead_BG_92') as mw.Image
		}
		return this.mImg_Dead_BG_92_Internal
	}
	private mText_Die_Internal: mw.TextBlock
	public get mText_Die(): mw.TextBlock {
		if(!this.mText_Die_Internal&&this.uiWidgetBase) {
			this.mText_Die_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Die') as mw.TextBlock
		}
		return this.mText_Die_Internal
	}
	private mImg_Die_Internal: mw.Image
	public get mImg_Die(): mw.Image {
		if(!this.mImg_Die_Internal&&this.uiWidgetBase) {
			this.mImg_Die_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Die') as mw.Image
		}
		return this.mImg_Die_Internal
	}
	private mImg_Die_1_Internal: mw.Image
	public get mImg_Die_1(): mw.Image {
		if(!this.mImg_Die_1_Internal&&this.uiWidgetBase) {
			this.mImg_Die_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Die_1') as mw.Image
		}
		return this.mImg_Die_1_Internal
	}
	private mImg_Explaine_BG_Internal: mw.Image
	public get mImg_Explaine_BG(): mw.Image {
		if(!this.mImg_Explaine_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Explaine_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Explaine/mImg_Explaine_BG') as mw.Image
		}
		return this.mImg_Explaine_BG_Internal
	}
	private mText_Explaine_Internal: mw.TextBlock
	public get mText_Explaine(): mw.TextBlock {
		if(!this.mText_Explaine_Internal&&this.uiWidgetBase) {
			this.mText_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Explaine/mText_Explaine') as mw.TextBlock
		}
		return this.mText_Explaine_Internal
	}
	private mCanvas_Explaine_Internal: mw.Canvas
	public get mCanvas_Explaine(): mw.Canvas {
		if(!this.mCanvas_Explaine_Internal&&this.uiWidgetBase) {
			this.mCanvas_Explaine_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Explaine') as mw.Canvas
		}
		return this.mCanvas_Explaine_Internal
	}
	private mUIText20032_txt_Internal: mw.TextBlock
	public get mUIText20032_txt(): mw.TextBlock {
		if(!this.mUIText20032_txt_Internal&&this.uiWidgetBase) {
			this.mUIText20032_txt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_DeadAD/mUIText20032_txt') as mw.TextBlock
		}
		return this.mUIText20032_txt_Internal
	}
	private mBtn_DeadAD_Internal: mw.Button
	public get mBtn_DeadAD(): mw.Button {
		if(!this.mBtn_DeadAD_Internal&&this.uiWidgetBase) {
			this.mBtn_DeadAD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_DeadAD') as mw.Button
		}
		return this.mBtn_DeadAD_Internal
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
		
		this.mBtn_DeadAD.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_DeadAD");
		});
		this.mBtn_DeadAD.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Die)
		
	
		this.initLanguage(this.mText_Explaine)
		
	
		this.initLanguage(this.mUIText20032_txt)
		
	
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
 