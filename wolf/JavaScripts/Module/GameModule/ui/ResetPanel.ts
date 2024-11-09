import ResetPanel_Generate from "../../../ui-generate/module/HUDModule/ResetPanel_generate";
import { PlayerModuleC } from "../../PlayerModule/PlayerModuleC";

export default class ResetPanel extends ResetPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initBtnHandler();
	}

	private initBtnHandler() {
		this.mBtn_Reset.onClicked.add(() => {
			ModuleService.getModule(PlayerModuleC).onResetPlayerCamera();
		})
	}
}
