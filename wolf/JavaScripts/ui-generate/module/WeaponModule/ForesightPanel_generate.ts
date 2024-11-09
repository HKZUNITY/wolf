/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/WeaponModule/ForesightPanel.ui
 * TIME: 2024.11.09-14.30.16
 */
 
@UIBind('UI/module/WeaponModule/ForesightPanel.ui')
export default class ForesightPanel_Generate extends UIScript {
		private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private mBtn_01_Internal: mw.Button
	public get mBtn_01(): mw.Button {
		if(!this.mBtn_01_Internal&&this.uiWidgetBase) {
			this.mBtn_01_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01') as mw.Button
		}
		return this.mBtn_01_Internal
	}
	private mBtn_01_1_Internal: mw.Button
	public get mBtn_01_1(): mw.Button {
		if(!this.mBtn_01_1_Internal&&this.uiWidgetBase) {
			this.mBtn_01_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_1') as mw.Button
		}
		return this.mBtn_01_1_Internal
	}
	private mBtn_01_2_Internal: mw.Button
	public get mBtn_01_2(): mw.Button {
		if(!this.mBtn_01_2_Internal&&this.uiWidgetBase) {
			this.mBtn_01_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_2') as mw.Button
		}
		return this.mBtn_01_2_Internal
	}
	private mBtn_01_3_Internal: mw.Button
	public get mBtn_01_3(): mw.Button {
		if(!this.mBtn_01_3_Internal&&this.uiWidgetBase) {
			this.mBtn_01_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_3') as mw.Button
		}
		return this.mBtn_01_3_Internal
	}
	private mBtn_01_4_Internal: mw.Button
	public get mBtn_01_4(): mw.Button {
		if(!this.mBtn_01_4_Internal&&this.uiWidgetBase) {
			this.mBtn_01_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_4') as mw.Button
		}
		return this.mBtn_01_4_Internal
	}
	private mBtn_01_5_Internal: mw.Button
	public get mBtn_01_5(): mw.Button {
		if(!this.mBtn_01_5_Internal&&this.uiWidgetBase) {
			this.mBtn_01_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_5') as mw.Button
		}
		return this.mBtn_01_5_Internal
	}
	private mBtn_01_6_Internal: mw.Button
	public get mBtn_01_6(): mw.Button {
		if(!this.mBtn_01_6_Internal&&this.uiWidgetBase) {
			this.mBtn_01_6_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_6') as mw.Button
		}
		return this.mBtn_01_6_Internal
	}
	private mBtn_01_7_Internal: mw.Button
	public get mBtn_01_7(): mw.Button {
		if(!this.mBtn_01_7_Internal&&this.uiWidgetBase) {
			this.mBtn_01_7_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_7') as mw.Button
		}
		return this.mBtn_01_7_Internal
	}
	private mBtn_01_8_Internal: mw.Button
	public get mBtn_01_8(): mw.Button {
		if(!this.mBtn_01_8_Internal&&this.uiWidgetBase) {
			this.mBtn_01_8_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_8') as mw.Button
		}
		return this.mBtn_01_8_Internal
	}
	private mBtn_01_9_Internal: mw.Button
	public get mBtn_01_9(): mw.Button {
		if(!this.mBtn_01_9_Internal&&this.uiWidgetBase) {
			this.mBtn_01_9_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_9') as mw.Button
		}
		return this.mBtn_01_9_Internal
	}
	private mBtn_01_10_Internal: mw.Button
	public get mBtn_01_10(): mw.Button {
		if(!this.mBtn_01_10_Internal&&this.uiWidgetBase) {
			this.mBtn_01_10_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_10') as mw.Button
		}
		return this.mBtn_01_10_Internal
	}
	private mBtn_01_11_Internal: mw.Button
	public get mBtn_01_11(): mw.Button {
		if(!this.mBtn_01_11_Internal&&this.uiWidgetBase) {
			this.mBtn_01_11_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_11') as mw.Button
		}
		return this.mBtn_01_11_Internal
	}
	private mBtn_01_12_Internal: mw.Button
	public get mBtn_01_12(): mw.Button {
		if(!this.mBtn_01_12_Internal&&this.uiWidgetBase) {
			this.mBtn_01_12_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/mBtn_01_12') as mw.Button
		}
		return this.mBtn_01_12_Internal
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
		
		this.mBtn_01.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01");
		});
		this.mBtn_01.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_1");
		});
		this.mBtn_01_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_2");
		});
		this.mBtn_01_2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_3");
		});
		this.mBtn_01_3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_4");
		});
		this.mBtn_01_4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_5");
		});
		this.mBtn_01_5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_6.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_6");
		});
		this.mBtn_01_6.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_7.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_7");
		});
		this.mBtn_01_7.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_8.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_8");
		});
		this.mBtn_01_8.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_9.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_9");
		});
		this.mBtn_01_9.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_10.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_10");
		});
		this.mBtn_01_10.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_11.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_11");
		});
		this.mBtn_01_11.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_01_12.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_01_12");
		});
		this.mBtn_01_12.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
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
 