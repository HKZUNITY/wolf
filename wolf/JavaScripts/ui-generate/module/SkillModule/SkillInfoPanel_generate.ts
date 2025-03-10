/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/SkillModule/SkillInfoPanel.ui
 * TIME: 2025.03.10-20.08.38
 */
 
@UIBind('UI/module/SkillModule/SkillInfoPanel.ui')
export default class SkillInfoPanel_Generate extends UIScript {
		private mText_Title_Internal: mw.TextBlock
	public get mText_Title(): mw.TextBlock {
		if(!this.mText_Title_Internal&&this.uiWidgetBase) {
			this.mText_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Title') as mw.TextBlock
		}
		return this.mText_Title_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_Own_Internal: mw.Canvas
	public get mCanvas_Own(): mw.Canvas {
		if(!this.mCanvas_Own_Internal&&this.uiWidgetBase) {
			this.mCanvas_Own_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Own') as mw.Canvas
		}
		return this.mCanvas_Own_Internal
	}
	private mBtn_Use_Internal: mw.StaleButton
	public get mBtn_Use(): mw.StaleButton {
		if(!this.mBtn_Use_Internal&&this.uiWidgetBase) {
			this.mBtn_Use_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Own/mBtn_Use') as mw.StaleButton
		}
		return this.mBtn_Use_Internal
	}
	private mText_Own_Internal: mw.TextBlock
	public get mText_Own(): mw.TextBlock {
		if(!this.mText_Own_Internal&&this.uiWidgetBase) {
			this.mText_Own_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Own/mText_Own') as mw.TextBlock
		}
		return this.mText_Own_Internal
	}
	private mCanvas_Equip_Internal: mw.Canvas
	public get mCanvas_Equip(): mw.Canvas {
		if(!this.mCanvas_Equip_Internal&&this.uiWidgetBase) {
			this.mCanvas_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Own/mCanvas_Equip') as mw.Canvas
		}
		return this.mCanvas_Equip_Internal
	}
	private mImg_Equip_Internal: mw.Image
	public get mImg_Equip(): mw.Image {
		if(!this.mImg_Equip_Internal&&this.uiWidgetBase) {
			this.mImg_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Own/mCanvas_Equip/mImg_Equip') as mw.Image
		}
		return this.mImg_Equip_Internal
	}
	private mText_Equip_Internal: mw.TextBlock
	public get mText_Equip(): mw.TextBlock {
		if(!this.mText_Equip_Internal&&this.uiWidgetBase) {
			this.mText_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Own/mCanvas_Equip/mText_Equip') as mw.TextBlock
		}
		return this.mText_Equip_Internal
	}
	private mCanvas_Icon_Internal: mw.Canvas
	public get mCanvas_Icon(): mw.Canvas {
		if(!this.mCanvas_Icon_Internal&&this.uiWidgetBase) {
			this.mCanvas_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Icon') as mw.Canvas
		}
		return this.mCanvas_Icon_Internal
	}
	private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Icon/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mText_Num_Internal: mw.TextBlock
	public get mText_Num(): mw.TextBlock {
		if(!this.mText_Num_Internal&&this.uiWidgetBase) {
			this.mText_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Icon/mText_Num') as mw.TextBlock
		}
		return this.mText_Num_Internal
	}
	private mCanvas_Text_Internal: mw.Canvas
	public get mCanvas_Text(): mw.Canvas {
		if(!this.mCanvas_Text_Internal&&this.uiWidgetBase) {
			this.mCanvas_Text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Text') as mw.Canvas
		}
		return this.mCanvas_Text_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Text/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mText_Des_Internal: mw.TextBlock
	public get mText_Des(): mw.TextBlock {
		if(!this.mText_Des_Internal&&this.uiWidgetBase) {
			this.mText_Des_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Text/mText_Des') as mw.TextBlock
		}
		return this.mText_Des_Internal
	}
	private mCanvas_Price_Internal: mw.Canvas
	public get mCanvas_Price(): mw.Canvas {
		if(!this.mCanvas_Price_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price') as mw.Canvas
		}
		return this.mCanvas_Price_Internal
	}
	private mCanvas_Price_Num_Internal: mw.Canvas
	public get mCanvas_Price_Num(): mw.Canvas {
		if(!this.mCanvas_Price_Num_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Num') as mw.Canvas
		}
		return this.mCanvas_Price_Num_Internal
	}
	private mCanvas_Price_1_Internal: mw.Canvas
	public get mCanvas_Price_1(): mw.Canvas {
		if(!this.mCanvas_Price_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_1') as mw.Canvas
		}
		return this.mCanvas_Price_1_Internal
	}
	private mImg_Price_1_Internal: mw.Image
	public get mImg_Price_1(): mw.Image {
		if(!this.mImg_Price_1_Internal&&this.uiWidgetBase) {
			this.mImg_Price_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_1/mImg_Price_1') as mw.Image
		}
		return this.mImg_Price_1_Internal
	}
	private mText_Price_1_Internal: mw.TextBlock
	public get mText_Price_1(): mw.TextBlock {
		if(!this.mText_Price_1_Internal&&this.uiWidgetBase) {
			this.mText_Price_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_1/mText_Price_1') as mw.TextBlock
		}
		return this.mText_Price_1_Internal
	}
	private mCanvas_Price_2_Internal: mw.Canvas
	public get mCanvas_Price_2(): mw.Canvas {
		if(!this.mCanvas_Price_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_2') as mw.Canvas
		}
		return this.mCanvas_Price_2_Internal
	}
	private mImg_Price_2_Internal: mw.Image
	public get mImg_Price_2(): mw.Image {
		if(!this.mImg_Price_2_Internal&&this.uiWidgetBase) {
			this.mImg_Price_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_2/mImg_Price_2') as mw.Image
		}
		return this.mImg_Price_2_Internal
	}
	private mText_Price_2_Internal: mw.TextBlock
	public get mText_Price_2(): mw.TextBlock {
		if(!this.mText_Price_2_Internal&&this.uiWidgetBase) {
			this.mText_Price_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Num/mCanvas_Price_2/mText_Price_2') as mw.TextBlock
		}
		return this.mText_Price_2_Internal
	}
	private mCanvas_Price_Buy_Internal: mw.Canvas
	public get mCanvas_Price_Buy(): mw.Canvas {
		if(!this.mCanvas_Price_Buy_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Buy') as mw.Canvas
		}
		return this.mCanvas_Price_Buy_Internal
	}
	private mBtn_Price1_Buy_Internal: mw.StaleButton
	public get mBtn_Price1_Buy(): mw.StaleButton {
		if(!this.mBtn_Price1_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Price1_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Buy/mBtn_Price1_Buy') as mw.StaleButton
		}
		return this.mBtn_Price1_Buy_Internal
	}
	private mBtn_Price2_Buy_Internal: mw.StaleButton
	public get mBtn_Price2_Buy(): mw.StaleButton {
		if(!this.mBtn_Price2_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Price2_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Price/mCanvas_Price_Buy/mBtn_Price2_Buy') as mw.StaleButton
		}
		return this.mBtn_Price2_Buy_Internal
	}
	private mCanvas_Exchange_Internal: mw.Canvas
	public get mCanvas_Exchange(): mw.Canvas {
		if(!this.mCanvas_Exchange_Internal&&this.uiWidgetBase) {
			this.mCanvas_Exchange_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange') as mw.Canvas
		}
		return this.mCanvas_Exchange_Internal
	}
	private mCanvas_Price_3_Internal: mw.Canvas
	public get mCanvas_Price_3(): mw.Canvas {
		if(!this.mCanvas_Price_3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mCanvas_Price_3') as mw.Canvas
		}
		return this.mCanvas_Price_3_Internal
	}
	private mImg_Price_3_Internal: mw.Image
	public get mImg_Price_3(): mw.Image {
		if(!this.mImg_Price_3_Internal&&this.uiWidgetBase) {
			this.mImg_Price_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mCanvas_Price_3/mImg_Price_3') as mw.Image
		}
		return this.mImg_Price_3_Internal
	}
	private mText_Price_3_Internal: mw.TextBlock
	public get mText_Price_3(): mw.TextBlock {
		if(!this.mText_Price_3_Internal&&this.uiWidgetBase) {
			this.mText_Price_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mCanvas_Price_3/mText_Price_3') as mw.TextBlock
		}
		return this.mText_Price_3_Internal
	}
	private mBtn_Price3_Buy_Internal: mw.StaleButton
	public get mBtn_Price3_Buy(): mw.StaleButton {
		if(!this.mBtn_Price3_Buy_Internal&&this.uiWidgetBase) {
			this.mBtn_Price3_Buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Exchange/mBtn_Price3_Buy') as mw.StaleButton
		}
		return this.mBtn_Price3_Buy_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Use.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Use");
		});
		this.initLanguage(this.mBtn_Use);
		this.mBtn_Use.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Price1_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Price1_Buy");
		});
		this.initLanguage(this.mBtn_Price1_Buy);
		this.mBtn_Price1_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Price2_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Price2_Buy");
		});
		this.initLanguage(this.mBtn_Price2_Buy);
		this.mBtn_Price2_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Price3_Buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Price3_Buy");
		});
		this.initLanguage(this.mBtn_Price3_Buy);
		this.mBtn_Price3_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		});
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Title)
		
	
		this.initLanguage(this.mText_Own)
		
	
		this.initLanguage(this.mText_Equip)
		
	
		this.initLanguage(this.mText_Num)
		
	
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Des)
		
	
		this.initLanguage(this.mText_Price_1)
		
	
		this.initLanguage(this.mText_Price_2)
		
	
		this.initLanguage(this.mText_Price_3)
		
	
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
 