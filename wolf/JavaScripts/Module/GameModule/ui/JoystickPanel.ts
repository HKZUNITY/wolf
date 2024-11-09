import JoystickPanel_Generate from "../../../ui-generate/module/HUDModule/JoystickPanel_generate";

export default class JoystickPanel extends JoystickPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}
}
