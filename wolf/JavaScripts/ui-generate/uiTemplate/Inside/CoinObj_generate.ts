
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 
 * UI: UI/uiTemplate/Inside/CoinObj.ui
 * TIME: 2023.08.01-15.33.53
 */

 

 @UIBind('UI/uiTemplate/Inside/CoinObj.ui')
 export default class CoinObj_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCell_1/mImage_Coin1')
    public mImage_Coin1: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCell_1')
    public mCell_1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCell_2/mImage_Coin2')
    public mImage_Coin2: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCell_2')
    public mCell_2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCell_3/mImage_Coin3')
    public mImage_Coin3: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCell_3')
    public mCell_3: mw.Canvas=undefined;
    

 
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
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 