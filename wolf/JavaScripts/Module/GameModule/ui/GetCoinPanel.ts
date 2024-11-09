import GetCoinPanel_Generate from "../../../ui-generate/module/GameModule/GetCoinPanel_generate";

export default class GetCoinPanel extends GetCoinPanel_Generate {
	private freeCellArr: Array<mw.Canvas> = [];//当前空闲的条目
	private activeCellArr: Array<mw.Canvas> = [];//当前激活的条目
	private overCellArr: Array<mw.Canvas> = [];//已经完成的条目
	private tweenMap: Map<mw.Canvas, mw.Tween<{}>> = new Map();
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;

		this.freeCellArr = [this.mCell_1, this.mCell_2, this.mCell_3];
		for (let i = 0; i < this.freeCellArr.length; i++) {
			this.freeCellArr[i].visibility = (mw.SlateVisibility.Hidden);
		}
	}

	protected onShow(...params: any[]): void {
		this.showMsg();
	}

	public closeCoinUi() {
		this.hide();
		for (let i = 0; i < this.freeCellArr.length; i++) {
			this.freeCellArr[i].visibility = mw.SlateVisibility.Hidden;
		}
	}

	private showMsg() {
		this.canUpdate = true;
		let cell: mw.Canvas = null;
		if (this.freeCellArr.length > 0) {
			cell = this.freeCellArr.shift();
		} else {
			this.stopTween(cell);
			cell = this.activeCellArr.shift();
		}
		this.activeCellArr.push(cell);
		this.createTween1(cell);
	}

	createTween1(cell: mw.Canvas) {
		let newTween = new mw.Tween({ pos: { x: 860, y: 400 } });
		cell.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
		newTween.to({ pos: { x: 2200, y: 70 } }, 500)
			.onUpdate((v) => {
				cell.position = (new mw.Vector2(v.pos.x, v.pos.y));
			})
			.onStop(() => {
				cell.visibility = (mw.SlateVisibility.Hidden);
			})
			.onComplete(() => {
				cell.visibility = (mw.SlateVisibility.Hidden);
				this.overCellArr.push(cell);
			})
			.start();
		this.tweenMap.set(cell, newTween);
	}

	stopTween(cell: mw.Canvas) {
		let tween = this.tweenMap.get(cell);
		if (tween != undefined) {
			tween.stop();
			cell.visibility = (mw.SlateVisibility.Hidden);
		}
	}

	protected onUpdate(dt: number) {
		if (this.activeCellArr.length == 0) return;
		for (let i = 0; i < this.activeCellArr.length; i++) {
			this.tweenMap.get(this.activeCellArr[i]).update();
		}
		while (this.overCellArr.length > 0) {
			let cell = this.overCellArr.shift();
			let index = this.activeCellArr.indexOf(cell);
			this.activeCellArr.splice(index, 1);
			this.stopTween(cell);
			this.freeCellArr.push(cell);
		}
	}
}
