import DanMuPanel_Generate from "../../../ui-generate/module/DanMuModule/DanMuPanel_generate";
import { DanMuItem } from "../DanMuData";

export default class DanMuPanel extends DanMuPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerDialog;
		this.initData();
	}

	private initData(): void {
		setTimeout(() => {
			this.axisMin = 0;
			this.axisMax = this.mDanMuCanvas.size.y;
			console.error(`this.axisMax:${this.axisMax}`);
		}, 1);
	}

	private danMuItems: DanMuItem[] = [];//弹幕列表
	private axisMin: number = 0;
	private axisMax: number = 500;
	private time: number = 10;
	private lockY: number = -1;

	public createDanMuItem(msg: string, isActive: boolean, isSelf: boolean): void {
		if (!msg || !msg["toString"]) return;
		msg = msg.toString();
		if (msg.length <= 0) return;

		let danMuItem = this.getNewBc(msg, this.lockY);
		let fontColor: string = "FFFFFFFF";
		let outlineColor: string = "000000FF";
		if (isActive) {
			outlineColor = "FF0000FF";
		} else if (isSelf) {
			outlineColor = "00FF00FF";
		}
		danMuItem.textBlock.setFontColorByHex(fontColor);
		danMuItem.textBlock.setOutlineColorByHex(outlineColor);

		let endpos = { x: danMuItem.size.x * -1, y: danMuItem.pos.y };//获取结束点
		let textBlock = danMuItem.textBlock;
		new Tween(danMuItem.pos)
			.to(endpos, this.time * 1000)
			.onUpdate((v) => {
				textBlock.position = v;
			})
			.onComplete(() => {
				danMuItem.run = false;
			}).start();
	}

	private getNewBc(msg: string, lockY: number): DanMuItem {
		msg = msg.toString();
		let danMuItem = this.danMuItems.find(v => { return !v.run });
		if (!danMuItem) {//没找到没使用的旧弹幕对象
			let ui = mw.TextBlock.newObject(this.mDanMuCanvas, "msgUIObject");
			this.mDanMuCanvas.addChild(ui);
			danMuItem = new DanMuItem();
			danMuItem.textBlock = ui;
			danMuItem.run = true;
			danMuItem.pos = new mw.Vector2(this.mDanMuCanvas.size.x, 0);
			danMuItem.size = new mw.Vector2(35, 100);
			danMuItem.textBlock.outlineSize = 1;
			this.danMuItems.push(danMuItem);
		} else {
			danMuItem.run = true;//置为正在使用中
		}
		danMuItem.pos.x = this.mDanMuCanvas.size.x;//放到屏幕右边
		danMuItem.pos.y = lockY < 0 ? Math.random() * (this.axisMax - this.axisMin) + this.axisMin : lockY;//随机Y轴
		danMuItem.size.x = 40 * msg.length;//字符对象长度
		danMuItem.textBlock.text = msg;
		danMuItem.textBlock.size = new mw.Vector2(danMuItem.size.x, danMuItem.size.y);
		return danMuItem;
	}
}
