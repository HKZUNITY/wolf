
/** 
 * AUTHOR: 达瓦里氏
 * TIME: 2023.08.01-17.36.56
 */

import ExchangeModuleC from "../../Module/ExchangeModule/ExchangeModuleC";
import { ExchangeGoldType } from "../../Module/ExchangeModule/ExchangeModuleS";
import { PlayerModuleC } from "../../Module/PlayerModule/PlayerModuleC";
import { ShopModuleC } from "../../Module/ShopModule/ShopCityModule";
import { SkillModuleC } from "../../Module/SkillModule/SkillModuleC";
import { GameConfig } from "../../Tables/GameConfig";
import Exchange_Generate from "../../ui-generate/uiTemplate/Hall/Exchange/Exchange_generate";
import P_ExchangeItem from "./P_ExchangeItem";

export default class P_Exchange extends Exchange_Generate {
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.initPanel();
		this.refreshPanel();
	}

	private initPanel(){
		this.mBtn_Close.onClicked.add(()=>{
			ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(false);
		})
		GameConfig.Exchange.getAllElement().forEach(dataInfo => {
			let item = mw.UIService.create(P_ExchangeItem);
			this.mCanvas_Content.addChild(item.uiObject);
			item.uiObject.size = item.rootCanvas.size;
			item.mImg_Icon.imageGuid = dataInfo.IconGUID.toString();
			item.mText_Name.text = dataInfo.Name;
			let getText = dataInfo.GetNum;
			if (getText == null || getText == 0) {
				getText = 1;
			}
			item.mText_Num.text = getText.toString();
			item.mImg_AdCoupon.imageGuid = GameConfig.Rule.getElement(10044).Num.toString();
			item.mText_Tip_2.text = dataInfo.ConsumeNum.toString();
			if(dataInfo.ShopItem > 0){
				item.mText_Tip_2.text = GameConfig.Shop.getElement(dataInfo.ShopItem).Price.toString();
			}
			else if(dataInfo.SkillShopItem > 0){
				item.mText_Tip_2.text = GameConfig.SkillShop.getElement(dataInfo.SkillShopItem).PriceNum[0].toString();
			}
			if (dataInfo.GetType > 0) {
				item.mBtn_Exchange.text = GameConfig.Text.getElement(20052).Content;
			}
			else{
				item.mBtn_Exchange.text = GameConfig.Text.getElement(20053).Content;
			}
			item.mBtn_Exchange.onClicked.add(()=>{
				/**兑换是直接走购买申请，其他的是走各自模块的逻辑，这里加一下货币检测 */
				if (dataInfo.GetType > 0) {
					ModuleService.getModule(ExchangeModuleC).exchangeItem(dataInfo.ID);
				}
				else if(dataInfo.ShopItem > 0){
					ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(false);
					ModuleService.getModule(ShopModuleC).selectTargetItem(dataInfo.ShopItem);

				}
				else if(dataInfo.SkillShopItem > 0){
					ModuleService.getModule(ExchangeModuleC).isOpenExchangePanel(false);
					ModuleService.getModule(SkillModuleC).isOpenSkillShopPanel(true);
				}
			})
		})
	}


	/** 
	 * 构造UI文件成功后，onStart之后 
	 * 对于UI的根节点的添加操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onAdded() {
	}

	public refreshPanel(){
		this.mText_AdCouponNumber.text = ModuleService.getModule(PlayerModuleC).getPlayerAdvToken().toString();
	}

	/** 
	 * 构造UI文件成功后，onAdded之后
	 * 对于UI的根节点的移除操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onRemoved() {
	}

	/** 
	* 构造UI文件成功后，UI对象再被销毁时调用 
	* 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
	*/
	protected onDestroy() {
	}

	/**
	* 每一帧调用
	* 通过canUpdate可以开启关闭调用
	* dt 两帧调用的时间差，毫秒
	*/
	//protected onUpdate(dt :number) {
	//}

	/**
	 * 设置显示时触发
	 */
	//protected onShow(...params:any[]) {
	//}

	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

	/**
	 * 当这个UI界面是可以接收事件的时候
	 * 手指或则鼠标触发一次Touch时触发
	 * 返回事件是否处理了
	 * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
	 * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
	 */
	//protected onTouchStarted(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标再UI界面上移动时
	 */
	//protected onTouchMoved(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标离开UI界面时
	 */
	//protected onTouchEnded(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
	 * 可以触发一次拖拽事件的开始生成
	 * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
	 */
	//protected onDragDetected(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent):mw.DragDropOperation {
	//	return this.newDragDrop(null);
	//}

	/**
	 * 拖拽操作生成事件触发后经过这个UI时触发
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDragOver(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后在这个UI释放完成时
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDrop(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后进入这个UI时触发
	 */
	//protected onDragEnter(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

	/**
	 * 拖拽操作生成事件触发后离开这个UI时触发
	 */
	//protected onDragLeave(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}
	
	/**
	 * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
	 */
	//protected onDragCancelled(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}
	
}


