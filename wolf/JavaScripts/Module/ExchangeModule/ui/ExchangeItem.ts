import ExchangeItem_Generate from "../../../ui-generate/module/ExchangeModule/ExchangeItem_generate";

export default class ExchangeItem extends ExchangeItem_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
	}

}
