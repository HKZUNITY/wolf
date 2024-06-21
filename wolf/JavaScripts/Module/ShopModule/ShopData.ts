/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-10 11:15:57
 * @FilePath     : \murdermystery3\JavaScripts\Module\ShopModule\ShopData.ts
 * @Description  : 修改描述
 */
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameConfig } from "../../Tables/GameConfig";
import { ShopModuleS } from "./ShopCityModule";

/*
 * @Author: zhangqing.fang
 * @Date: 2022-09-07 18:29:18
 * @LastEditors: xicun.kang
 * @LastEditTime: 2023-03-08 14:47:51
 * @FilePath: \murdermystery3\JavaScripts\Module\ShopModule\ShopData.ts
 * @Description: 
 */
export enum ShopDataType {
	Weapon = 1,
	Cloth = 2,
	Effect = 3
}

export class ShopModuleData extends Subdata {
	/**当前解锁的物品 */
	@Decorator.persistence()
	public items: Array<ShopItemList> = new Array();
	/**当前使用的物品id */
	@Decorator.persistence()
	public usingItems: Array<number> = [];
	/**带时限的物品 */
	@Decorator.persistence()
	private haveTimeItems: Array<ShopTimeItem> = [];
	private haveTimer: Map<number, any> = new Map<number, any>();
	public get dataName(): string {
		return "ShopDataInfo";
	}
	protected override initDefaultData(): void {
		this.items = [];
		this.initShopData();
	}
	public initShopData() {
		this.usingItems.length = 0;
		this.items = this.items;
		let mapNum = GameConfig.Shop.getElement(9999).Total;
		for (let i = 1; i <= mapNum; i++) {
			if (this.items[i] == null) {
				let levelItem = new ShopItemList();
				levelItem.listId = new Array();
				levelItem.state = new Array();
				this.items[i] = levelItem;
			}
			let curMap = i * 10000;
			let itemNum = GameConfig.Shop.getElement(curMap).Total;
			let curItem = this.items[i];
			for (let j = 1; j <= itemNum; j++) {
				if (curItem.listId[j] == null) {
					curItem.listId[j] = curMap + j;
					curItem.state[j] = ItemState.NotOwn;
				}
				if (curItem.state[j] == ItemState.Using) {
					this.usingItems.push(curItem.listId[j]);
				}
			}
			this.items[i] = curItem;
		}
	}
	public setItemState(itemid: number, state: ItemState) {
		let mapIndex = Math.floor(itemid / 10000);
		let itemIndex = itemid % 10000;
		this.items[mapIndex].state[itemIndex] = state;
		this.save(true);
	}

	public getItemState(itemid: number) {
		let mapIndex = Math.floor(itemid / 10000);
		let itemIndex = itemid % 10000;
		let item = this.items[mapIndex];
		let state = ItemState.NotOwn;
		if (item) {
			state = item.state[itemIndex];
		}
		return state;
	}

	public setUsingItem(id: number) {
		let index = (id - id % 10000) / 10000;
		let useMap = Math.floor(id / 10000);
		this.usingItems = this.usingItems.filter((value)=>{
			let mapIndex = Math.floor(value / 10000);
			return useMap != mapIndex;
		})
		
		this.usingItems.push(id);
		let itemInfo = this.getShopDataByMap(index);
		
		for (let i = 1; i < itemInfo.listId.length; i++) {
			if (itemInfo.listId[i] == id) {
				itemInfo.state[i] = ItemState.Using;
			}
			else {
				if (itemInfo.state[i] == ItemState.Using) {
					itemInfo.state[i] = ItemState.Own;
				}
			}
		}
		this.save(true);
	}
	public getShopDataByMap(id: number) {
		return this.items[id];
	}

	public getHaveTimeItems(): Array<ShopTimeItem> {
		return this.haveTimeItems;
	}
	/**增加带时间限制的商品 */
	public addShopTimeItem(itemId: number, lastTime: number){
		let nowTime = TimeUtil.time();
		let sameItem = this.haveTimeItems.find((value)=>{
			return value.itemId == itemId;
		})
		let res = 0;
		if (sameItem) {
			sameItem.lastTime += lastTime;
			res = sameItem.haveTime + sameItem.lastTime - nowTime;
		}
		else{
			let shopItem = new ShopTimeItem(itemId, nowTime, lastTime);
			this.haveTimeItems.push(shopItem);
			this.setItemState(itemId, ItemState.Own);
			res = lastTime;
		}

		this.save(true)
		return res;
	}

	public deleteShopTimeItem(itemId: number){
		this.haveTimeItems = this.haveTimeItems.filter((value)=>{
			return value.itemId != itemId;
		})
		
		this.setItemState(itemId, ItemState.NotOwn);
		this.save(true);
	}

	public getShopRemainTime(itemId: number){
		let res = 0;
		let item = this.haveTimeItems.find((value)=>{
			return value.itemId == itemId;
		})
		if (item) {
			res =  item.haveTime + item.lastTime - TimeUtil.time();
		}
		return res;
	}

}
export enum ItemState {
	Own,
	NotOwn,
	Using
}
export class ShopItemList {
	listId: Array<number>;
	state: Array<ItemState>;
}

export class ShopTimeItem{
	itemId: number;
	haveTime: number;
	lastTime: number;
	constructor(itemId: number, haveTime: number, lastTime: number){
		this.itemId = itemId;
		this.haveTime = haveTime;
		this.lastTime = lastTime;
	}
}
