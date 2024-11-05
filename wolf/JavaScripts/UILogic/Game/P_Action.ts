import ActionUI_Generate from "../../ui-generate/ActionUI_generate";

export default class P_Action extends ActionUI_Generate {
	private action: Action = new Action()
	/**正在交互的guid */
	public actionGuidList: Array<string> = new Array<string>()
	/**玩家是否正在使用交互物 */
	public isUse: boolean = false
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;;
		this.mStaleButton.onClicked.add(() => {
			if (this.action == null) {
				return
			}

			this.action.call()
		})
	}
	public show() {
		mw.UIService.showUI(this, mw.UILayerBottom)
	}
	public hide() {
		this.action.clear()
		mw.UIService.hideUI(this)
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
