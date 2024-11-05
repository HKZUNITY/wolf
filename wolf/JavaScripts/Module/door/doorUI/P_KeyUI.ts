import P_Tips from "../../../CommonUI/P_Tips";
import { GameConfig } from "../../../Tables/GameConfig";
import PwUI_Generate from "../../../ui-generate/PwUI_generate";
import { DoorModuleC } from "../DoorModuleC";

export default class P_KeyUI extends PwUI_Generate {
	/**当前密码 */
	private currPassArr: Array<number> = new Array<number>();
	/**输入密码 */
	private inputPassArr: Array<number> = new Array<number>();
	//按钮数组
	private keyBtns: Array<mw.StaleButton> = new Array<mw.StaleButton>();
	//密码文本
	private pasTexts: Array<mw.TextBlock> = new Array<mw.TextBlock>();

	protected onStart() {
		this.keyBtns.push(
			this.mButton_0, this.mButton_1, this.mButton_2, this.mButton_3, this.mButton_4,
			this.mButton_5, this.mButton_6, this.mButton_7, this.mButton_8, this.mButton_9);
		for (let i = 0; i < this.keyBtns.length; i++) {
			this.keyBtns[i].onClicked.add(this.keyClicked.bind(this, i));
		}
		this.pasTexts.push(this.mTextBlock_1, this.mTextBlock_2, this.mTextBlock_3, this.mTextBlock4);
		this.pasTexts.forEach((item) => {
			item.text = '';
		})
		this.mStaleButton_exit.onClicked.add(() => {
			this.exit();
		})

	}

	keyClicked(num: number) {
		this.inputPassArr.push(num);
		let index = this.inputPassArr.length - 1;
		if (this.inputPassArr[index] == this.currPassArr[index]) {
			this.pasTexts[index].fontColor = mw.LinearColor.green;
			if (this.inputPassArr.length == this.currPassArr.length) {
				ModuleService.getModule(DoorModuleC).openDoor();
				this.hide();
				P_Tips.show(GameConfig.Tips.getElement(20005).Content);
			}
		} else {//输入错的
			this.exit()
			P_Tips.show(GameConfig.Tips.getElement(20006).Content);
		}

	}

	exit() {
		ModuleService.getModule(DoorModuleC).toDelect();
		this.hide();
	}



	show() {
		this.creatPassword();
		mw.UIService.showUI(this);
	}


	creatPassword() {
		this.inputPassArr.length = 0;
		this.currPassArr.length = 0;
		for (let i = 0; i < this.pasTexts.length; i++) {
			let num = Math.floor(Math.random() * 10)
			this.currPassArr.push(num);
			this.pasTexts[i].text = num.toString();
			this.pasTexts[i].fontColor = mw.LinearColor.red;
		}
	}


	hide() {
		mw.UIService.hideUI(this);
	}



}
