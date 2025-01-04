/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/SkillModule/SkillItem.ui
 * TIME: 2025.01.04-16.15.06
 */
 
@UIBind('UI/module/SkillModule/SkillItem.ui')
export default class SkillItem_Generate extends UIScript {
		private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mText_Name_Internal: mw.TextBlock
	public get mText_Name(): mw.TextBlock {
		if(!this.mText_Name_Internal&&this.uiWidgetBase) {
			this.mText_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Name') as mw.TextBlock
		}
		return this.mText_Name_Internal
	}
	private mBtn_Full_Internal: mw.Button
	public get mBtn_Full(): mw.Button {
		if(!this.mBtn_Full_Internal&&this.uiWidgetBase) {
			this.mBtn_Full_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Full') as mw.Button
		}
		return this.mBtn_Full_Internal
	}
	private mImg_Equip_Internal: mw.Image
	public get mImg_Equip(): mw.Image {
		if(!this.mImg_Equip_Internal&&this.uiWidgetBase) {
			this.mImg_Equip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Equip') as mw.Image
		}
		return this.mImg_Equip_Internal
	}
	private mText_Num_Internal: mw.TextBlock
	public get mText_Num(): mw.TextBlock {
		if(!this.mText_Num_Internal&&this.uiWidgetBase) {
			this.mText_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Num') as mw.TextBlock
		}
		return this.mText_Num_Internal
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
		
		this.mBtn_Full.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Full");
		});
		this.mBtn_Full.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Name)
		
	
		this.initLanguage(this.mText_Num)
		
	
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
 