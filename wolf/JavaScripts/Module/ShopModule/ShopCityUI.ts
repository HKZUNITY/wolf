/*
 * @Author: ziwei.shen
 * @Date: 2022-08-31 13:00:01
 * @LastEditors: zhangqing.fang
 * @LastEditTime: 2022-11-03 18:19:21
 * @FilePath: \townmysteryAPI\JavaScripts\Module\ShopModule\ShopCityUI.ts
 * @Description: 
 */
import Items from "../../uiTemplate/Hall/Items";
import Shop from "../../uiTemplate/Hall/Shop";
import { ShopBaseItem, ShopBasePanel } from "./ShopCityPanel";

export class ShopItem extends ShopBaseItem<Items>{
	constructor() {
		super(Items);
	}
	getView() {
		return this.view;
	}

}
export class ShopPanel extends ShopBasePanel<Shop>{
	constructor() {
		super(Shop);
	}
	onStart() {
		//设置显示方式
		this.setStyle(10, 10, 4);
	}
	getView() {
		return this.view;
	}
}
