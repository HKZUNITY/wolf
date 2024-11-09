import GhostPanel_Generate from "../../../ui-generate/module/GameModule/GhostPanel_generate";

export default class GhostPanel extends GhostPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

}
