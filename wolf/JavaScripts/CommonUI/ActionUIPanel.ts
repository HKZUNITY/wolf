import ActionUIPanel_Generate from "../ui-generate/common/ActionUIPanel_generate";

export default class ActionUIPanel extends ActionUIPanel_Generate {
	private action: Action = new Action()
	/**正在交互的guid */
	public actionGuidList: Array<string> = new Array<string>()
	/**玩家是否正在使用交互物 */
	public isUse: boolean = false
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.mStaleButton.onClicked.add(() => {
			if (this.action == null) return
			this.action.call()
		})
	}

	protected onHide(): void {
		this.action.clear()
	}

	/**设置按钮点击事件并且显示按钮 */
	public setBtnEventAndShow(btnHandler: Function) {
		this.action.clear()
		this.action.add(btnHandler)
		this.show()

	}
	/**设置玩家进入的交互物guid */
	public setActionGuid(guid: string) {
		let index = this.actionGuidList.indexOf(guid)
		if (index > -1) {
			return
		}
		this.actionGuidList.push(guid)
	}
	/**设置玩家进入交互物 */
	public setPlayerInAction(isUse: boolean) {
		this.isUse = isUse
	}
	/**删除玩家进入的交互物guid */
	public deleteActionGuid(guid: string) {
		let index = this.actionGuidList.indexOf(guid)
		if (index > -1) {
			this.actionGuidList.splice(index, 1)
		}
	}
}
