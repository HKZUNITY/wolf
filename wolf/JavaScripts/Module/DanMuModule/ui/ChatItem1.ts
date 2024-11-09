import ChatItem1_Generate from "../../../ui-generate/module/DanMuModule/ChatItem1_generate";
import DanMuModuleC from "../DanMuModuleC";

export default class ChatItem1 extends ChatItem1_Generate {
	private danMuModuleC: DanMuModuleC = null;
	private get getDanMuModuleC(): DanMuModuleC {
		if (!this.danMuModuleC) {
			this.danMuModuleC = ModuleService.getModule(DanMuModuleC);
		}
		return this.danMuModuleC;
	}
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.bindButton();
	}

	private bindButton(): void {
		this.mClickButton.onClicked.add(this.addClickButton.bind(this));
	}

	private isCanClick: boolean = true;
	private addClickButton(): void {
		if (!this.isCanClick) return;
		this.isCanClick = false;
		TimeUtil.delaySecond(1).then(() => { this.isCanClick = true; });
		this.getDanMuModuleC.onClickChatItem1Action.call(this.index);
	}

	private index: number = 0;
	public setData(index: number, text: string): void {
		this.index = index;
		this.mClickButton.text = text;
	}
}
