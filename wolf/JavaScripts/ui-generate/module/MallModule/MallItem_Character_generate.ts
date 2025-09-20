/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/MallModule/MallItem_Character.ui
 * TIME: 2025.09.20-11.56.18
 */
 
@UIBind('UI/module/MallModule/MallItem_Character.ui')
export default class MallItem_Character_Generate extends UIScript {
		private mSelectButton_Internal: mw.Button
	public get mSelectButton(): mw.Button {
		if(!this.mSelectButton_Internal&&this.uiWidgetBase) {
			this.mSelectButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectButton') as mw.Button
		}
		return this.mSelectButton_Internal
	}
	private mBgImage_Internal: mw.Image
	public get mBgImage(): mw.Image {
		if(!this.mBgImage_Internal&&this.uiWidgetBase) {
			this.mBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage') as mw.Image
		}
		return this.mBgImage_Internal
	}
	private mIconCanvas_Internal: mw.Canvas
	public get mIconCanvas(): mw.Canvas {
		if(!this.mIconCanvas_Internal&&this.uiWidgetBase) {
			this.mIconCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIconCanvas') as mw.Canvas
		}
		return this.mIconCanvas_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIconCanvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mDeleteButton_Internal: mw.Button
	public get mDeleteButton(): mw.Button {
		if(!this.mDeleteButton_Internal&&this.uiWidgetBase) {
			this.mDeleteButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIconCanvas/mDeleteButton') as mw.Button
		}
		return this.mDeleteButton_Internal
	}
	private mAddCanvas_Internal: mw.Canvas
	public get mAddCanvas(): mw.Canvas {
		if(!this.mAddCanvas_Internal&&this.uiWidgetBase) {
			this.mAddCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAddCanvas') as mw.Canvas
		}
		return this.mAddCanvas_Internal
	}
	private mAddBgTextBlock_Internal: mw.TextBlock
	public get mAddBgTextBlock(): mw.TextBlock {
		if(!this.mAddBgTextBlock_Internal&&this.uiWidgetBase) {
			this.mAddBgTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAddCanvas/mAddBgTextBlock') as mw.TextBlock
		}
		return this.mAddBgTextBlock_Internal
	}
	private mAddTextBlock_Internal: mw.TextBlock
	public get mAddTextBlock(): mw.TextBlock {
		if(!this.mAddTextBlock_Internal&&this.uiWidgetBase) {
			this.mAddTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAddCanvas/mAddTextBlock') as mw.TextBlock
		}
		return this.mAddTextBlock_Internal
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
		
		this.mSelectButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectButton");
		});
		this.mSelectButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDeleteButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDeleteButton");
		});
		this.mDeleteButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mAddBgTextBlock)
		
	
		this.initLanguage(this.mAddTextBlock)
		
	
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
 