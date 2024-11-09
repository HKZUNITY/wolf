import ShopModuleC from "../Module/ShopModule/ShopModuleC";
import NoticePanel_Generate from "../ui-generate/common/NoticePanel_generate";

export default class NoticePanel extends NoticePanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initButton();
	}

	private initButton() {
		this.mBtn_Close.onClicked.add(() => {
			this.hide();
		})
		this.mBtn_JumpTo.onClicked.add(() => {
			this.hide();
			ModuleService.getModule(ShopModuleC).ShopOpen(true);
		})
	}
}
