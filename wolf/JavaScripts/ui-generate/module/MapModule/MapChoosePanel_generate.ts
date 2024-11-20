/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/MapModule/MapChoosePanel.ui
 * TIME: 2024.11.21-00.11.24
 */
 
@UIBind('UI/module/MapModule/MapChoosePanel.ui')
export default class MapChoosePanel_Generate extends UIScript {
		private mImage_Protect_Internal: mw.Image
	public get mImage_Protect(): mw.Image {
		if(!this.mImage_Protect_Internal&&this.uiWidgetBase) {
			this.mImage_Protect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Protect') as mw.Image
		}
		return this.mImage_Protect_Internal
	}
	private mScrollBox_Protect_Internal: mw.ScrollBox
	public get mScrollBox_Protect(): mw.ScrollBox {
		if(!this.mScrollBox_Protect_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Protect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScrollBox_Protect') as mw.ScrollBox
		}
		return this.mScrollBox_Protect_Internal
	}
	private mCanvas_MapChoose_Internal: mw.Canvas
	public get mCanvas_MapChoose(): mw.Canvas {
		if(!this.mCanvas_MapChoose_Internal&&this.uiWidgetBase) {
			this.mCanvas_MapChoose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose') as mw.Canvas
		}
		return this.mCanvas_MapChoose_Internal
	}
	private mImage_BackGround_Internal: mw.Image
	public get mImage_BackGround(): mw.Image {
		if(!this.mImage_BackGround_Internal&&this.uiWidgetBase) {
			this.mImage_BackGround_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mImage_BackGround') as mw.Image
		}
		return this.mImage_BackGround_Internal
	}
	private mImage_Title_Internal: mw.Image
	public get mImage_Title(): mw.Image {
		if(!this.mImage_Title_Internal&&this.uiWidgetBase) {
			this.mImage_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mImage_Title') as mw.Image
		}
		return this.mImage_Title_Internal
	}
	private mText_TopTips_Internal: mw.TextBlock
	public get mText_TopTips(): mw.TextBlock {
		if(!this.mText_TopTips_Internal&&this.uiWidgetBase) {
			this.mText_TopTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mText_TopTips') as mw.TextBlock
		}
		return this.mText_TopTips_Internal
	}
	private mText_ChooseTime_Internal: mw.TextBlock
	public get mText_ChooseTime(): mw.TextBlock {
		if(!this.mText_ChooseTime_Internal&&this.uiWidgetBase) {
			this.mText_ChooseTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mText_ChooseTime') as mw.TextBlock
		}
		return this.mText_ChooseTime_Internal
	}
	private mCanvas_Map1_Internal: mw.Canvas
	public get mCanvas_Map1(): mw.Canvas {
		if(!this.mCanvas_Map1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Map1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map1') as mw.Canvas
		}
		return this.mCanvas_Map1_Internal
	}
	private mImage_Map1_Internal: mw.Image
	public get mImage_Map1(): mw.Image {
		if(!this.mImage_Map1_Internal&&this.uiWidgetBase) {
			this.mImage_Map1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mImage_Map1') as mw.Image
		}
		return this.mImage_Map1_Internal
	}
	private mText_Map1_Internal: mw.TextBlock
	public get mText_Map1(): mw.TextBlock {
		if(!this.mText_Map1_Internal&&this.uiWidgetBase) {
			this.mText_Map1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mText_Map1') as mw.TextBlock
		}
		return this.mText_Map1_Internal
	}
	private mBtn_Map1_Internal: mw.StaleButton
	public get mBtn_Map1(): mw.StaleButton {
		if(!this.mBtn_Map1_Internal&&this.uiWidgetBase) {
			this.mBtn_Map1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mBtn_Map1') as mw.StaleButton
		}
		return this.mBtn_Map1_Internal
	}
	private mImage_MapIcon1_Internal: mw.Image
	public get mImage_MapIcon1(): mw.Image {
		if(!this.mImage_MapIcon1_Internal&&this.uiWidgetBase) {
			this.mImage_MapIcon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mImage_MapIcon1') as mw.Image
		}
		return this.mImage_MapIcon1_Internal
	}
	private mText_ChooseNum1_Internal: mw.TextBlock
	public get mText_ChooseNum1(): mw.TextBlock {
		if(!this.mText_ChooseNum1_Internal&&this.uiWidgetBase) {
			this.mText_ChooseNum1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map1/mText_ChooseNum1') as mw.TextBlock
		}
		return this.mText_ChooseNum1_Internal
	}
	private mCanvas_Map2_Internal: mw.Canvas
	public get mCanvas_Map2(): mw.Canvas {
		if(!this.mCanvas_Map2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Map2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map2') as mw.Canvas
		}
		return this.mCanvas_Map2_Internal
	}
	private mImage_Map2_Internal: mw.Image
	public get mImage_Map2(): mw.Image {
		if(!this.mImage_Map2_Internal&&this.uiWidgetBase) {
			this.mImage_Map2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mImage_Map2') as mw.Image
		}
		return this.mImage_Map2_Internal
	}
	private mText_Map2_Internal: mw.TextBlock
	public get mText_Map2(): mw.TextBlock {
		if(!this.mText_Map2_Internal&&this.uiWidgetBase) {
			this.mText_Map2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mText_Map2') as mw.TextBlock
		}
		return this.mText_Map2_Internal
	}
	private mBtn_Map2_Internal: mw.StaleButton
	public get mBtn_Map2(): mw.StaleButton {
		if(!this.mBtn_Map2_Internal&&this.uiWidgetBase) {
			this.mBtn_Map2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mBtn_Map2') as mw.StaleButton
		}
		return this.mBtn_Map2_Internal
	}
	private mImage_MapIcon2_Internal: mw.Image
	public get mImage_MapIcon2(): mw.Image {
		if(!this.mImage_MapIcon2_Internal&&this.uiWidgetBase) {
			this.mImage_MapIcon2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mImage_MapIcon2') as mw.Image
		}
		return this.mImage_MapIcon2_Internal
	}
	private mText_ChooseNum2_Internal: mw.TextBlock
	public get mText_ChooseNum2(): mw.TextBlock {
		if(!this.mText_ChooseNum2_Internal&&this.uiWidgetBase) {
			this.mText_ChooseNum2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map2/mText_ChooseNum2') as mw.TextBlock
		}
		return this.mText_ChooseNum2_Internal
	}
	private mCanvas_Map3_Internal: mw.Canvas
	public get mCanvas_Map3(): mw.Canvas {
		if(!this.mCanvas_Map3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Map3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map3') as mw.Canvas
		}
		return this.mCanvas_Map3_Internal
	}
	private mImage_Map3_Internal: mw.Image
	public get mImage_Map3(): mw.Image {
		if(!this.mImage_Map3_Internal&&this.uiWidgetBase) {
			this.mImage_Map3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mImage_Map3') as mw.Image
		}
		return this.mImage_Map3_Internal
	}
	private mText_Map3_Internal: mw.TextBlock
	public get mText_Map3(): mw.TextBlock {
		if(!this.mText_Map3_Internal&&this.uiWidgetBase) {
			this.mText_Map3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mText_Map3') as mw.TextBlock
		}
		return this.mText_Map3_Internal
	}
	private mBtn_Map3_Internal: mw.StaleButton
	public get mBtn_Map3(): mw.StaleButton {
		if(!this.mBtn_Map3_Internal&&this.uiWidgetBase) {
			this.mBtn_Map3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mBtn_Map3') as mw.StaleButton
		}
		return this.mBtn_Map3_Internal
	}
	private mImage_MapIcon3_Internal: mw.Image
	public get mImage_MapIcon3(): mw.Image {
		if(!this.mImage_MapIcon3_Internal&&this.uiWidgetBase) {
			this.mImage_MapIcon3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mImage_MapIcon3') as mw.Image
		}
		return this.mImage_MapIcon3_Internal
	}
	private mText_ChooseNum3_Internal: mw.TextBlock
	public get mText_ChooseNum3(): mw.TextBlock {
		if(!this.mText_ChooseNum3_Internal&&this.uiWidgetBase) {
			this.mText_ChooseNum3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_Map3/mText_ChooseNum3') as mw.TextBlock
		}
		return this.mText_ChooseNum3_Internal
	}
	private mCanvas_PChoose1_Internal: mw.Canvas
	public get mCanvas_PChoose1(): mw.Canvas {
		if(!this.mCanvas_PChoose1_Internal&&this.uiWidgetBase) {
			this.mCanvas_PChoose1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose1') as mw.Canvas
		}
		return this.mCanvas_PChoose1_Internal
	}
	private mImage_PChooseIcon1_Internal: mw.Image
	public get mImage_PChooseIcon1(): mw.Image {
		if(!this.mImage_PChooseIcon1_Internal&&this.uiWidgetBase) {
			this.mImage_PChooseIcon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose1/mImage_PChooseIcon1') as mw.Image
		}
		return this.mImage_PChooseIcon1_Internal
	}
	private mCanvas_PChoose2_Internal: mw.Canvas
	public get mCanvas_PChoose2(): mw.Canvas {
		if(!this.mCanvas_PChoose2_Internal&&this.uiWidgetBase) {
			this.mCanvas_PChoose2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose2') as mw.Canvas
		}
		return this.mCanvas_PChoose2_Internal
	}
	private mImage_PChooseIcon2_Internal: mw.Image
	public get mImage_PChooseIcon2(): mw.Image {
		if(!this.mImage_PChooseIcon2_Internal&&this.uiWidgetBase) {
			this.mImage_PChooseIcon2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose2/mImage_PChooseIcon2') as mw.Image
		}
		return this.mImage_PChooseIcon2_Internal
	}
	private mCanvas_PChoose3_Internal: mw.Canvas
	public get mCanvas_PChoose3(): mw.Canvas {
		if(!this.mCanvas_PChoose3_Internal&&this.uiWidgetBase) {
			this.mCanvas_PChoose3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose3') as mw.Canvas
		}
		return this.mCanvas_PChoose3_Internal
	}
	private mImage_PChooseIcon3_Internal: mw.Image
	public get mImage_PChooseIcon3(): mw.Image {
		if(!this.mImage_PChooseIcon3_Internal&&this.uiWidgetBase) {
			this.mImage_PChooseIcon3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_PChoose3/mImage_PChooseIcon3') as mw.Image
		}
		return this.mImage_PChooseIcon3_Internal
	}
	private mCanvas_SysChoose1_Internal: mw.Canvas
	public get mCanvas_SysChoose1(): mw.Canvas {
		if(!this.mCanvas_SysChoose1_Internal&&this.uiWidgetBase) {
			this.mCanvas_SysChoose1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose1') as mw.Canvas
		}
		return this.mCanvas_SysChoose1_Internal
	}
	private mImage_SysChoose1_Internal: mw.Image
	public get mImage_SysChoose1(): mw.Image {
		if(!this.mImage_SysChoose1_Internal&&this.uiWidgetBase) {
			this.mImage_SysChoose1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose1/mImage_SysChoose1') as mw.Image
		}
		return this.mImage_SysChoose1_Internal
	}
	private mCanvas_SysChoose2_Internal: mw.Canvas
	public get mCanvas_SysChoose2(): mw.Canvas {
		if(!this.mCanvas_SysChoose2_Internal&&this.uiWidgetBase) {
			this.mCanvas_SysChoose2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose2') as mw.Canvas
		}
		return this.mCanvas_SysChoose2_Internal
	}
	private mImage_SysChoose2_Internal: mw.Image
	public get mImage_SysChoose2(): mw.Image {
		if(!this.mImage_SysChoose2_Internal&&this.uiWidgetBase) {
			this.mImage_SysChoose2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose2/mImage_SysChoose2') as mw.Image
		}
		return this.mImage_SysChoose2_Internal
	}
	private mCanvas_SysChoose3_Internal: mw.Canvas
	public get mCanvas_SysChoose3(): mw.Canvas {
		if(!this.mCanvas_SysChoose3_Internal&&this.uiWidgetBase) {
			this.mCanvas_SysChoose3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose3') as mw.Canvas
		}
		return this.mCanvas_SysChoose3_Internal
	}
	private mImage_SysChoose3_Internal: mw.Image
	public get mImage_SysChoose3(): mw.Image {
		if(!this.mImage_SysChoose3_Internal&&this.uiWidgetBase) {
			this.mImage_SysChoose3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_MapChoose/mCanvas_SysChoose3/mImage_SysChoose3') as mw.Image
		}
		return this.mImage_SysChoose3_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Map1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Map1");
		});
		this.initLanguage(this.mBtn_Map1);
		this.mBtn_Map1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Map2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Map2");
		});
		this.initLanguage(this.mBtn_Map2);
		this.mBtn_Map2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Map3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Map3");
		});
		this.initLanguage(this.mBtn_Map3);
		this.mBtn_Map3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_TopTips)
		
	
		this.initLanguage(this.mText_ChooseTime)
		
	
		this.initLanguage(this.mText_Map1)
		
	
		this.initLanguage(this.mText_ChooseNum1)
		
	
		this.initLanguage(this.mText_Map2)
		
	
		this.initLanguage(this.mText_ChooseNum2)
		
	
		this.initLanguage(this.mText_Map3)
		
	
		this.initLanguage(this.mText_ChooseNum3)
		
	
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
 