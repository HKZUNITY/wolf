import MallTipsPanel_Generate from "../../../ui-generate/module/MallModule/MallTipsPanel_generate";

export default class MallTipsPanel extends MallTipsPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.bindButtons();
	}

	private bindButtons(): void {
		this.mSureButton.onClicked.add(this.addSureButton.bind(this));
		this.mCancelButton.onClicked.add(this.addCancelButton.bind(this));
	}

	private addSureButton(): void {
		if (this.sureCallback) this.sureCallback();
		this.hide();
	}

	private addCancelButton(): void {
		if (this.cancelCallback) this.cancelCallback();
		this.hide();
	}

	private sureCallback: () => void = null;
	private cancelCallback: () => void = null;
	public showTips(sureCallback: () => void, cancelCallback: () => void, titleText: string, contentText: string, noText: string, yesText: string): void {
		this.sureCallback = sureCallback;
		this.cancelCallback = cancelCallback;
		this.mTipsTextBlock.text = titleText;
		this.mContentTextBlock.text = contentText;
		this.mCancelTextBlock.text = noText;
		this.mSureTextBlock.text = yesText;
		this.show();
	}
}
