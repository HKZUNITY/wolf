
/** 
 * AUTHOR: 达瓦里氏
 * TIME: 2023.07.27-17.57.49
 */

import { Globals } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import Member_Generate from "../../ui-generate/uiTemplate/Hall/Member/Member_generate";
import P_BuyMemberItem from "./P_BuyMemberItem";
import SVIPModuleC, { SVIPGiftType } from "./SVIPModuleC";

export default class P_BuyMemberPanel extends Member_Generate {
	/**礼包剩余时间，只有一个 */
	private remainTime: number;
	private timer: any;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.initPanel();
	}

	public show(){
		mw.UIService.showUI(this);
		this.updatePanel();
	}

	public hide(){
		mw.UIService.hideUI(this);
		if (this.timer) {
			TimeUtil.clearInterval(this.timer);
			this.timer = null;
		}
	}

	private initPanel(){
		this.initNormalGift();
		this.initGoldenGift();
		this.mBtn_Close.onClicked.add(()=>{
			ModuleService.getModule(SVIPModuleC).isOpenBuySvipPanel(false);
		});
		
	}
	/**更新界面，每次打开的时候更新一下吧 */
	public async updatePanel(){
		let svipInfo = ModuleService.getModule(SVIPModuleC).getPlayerSVIPInfo();
		let isHaveSVIP = false;
		svipInfo.forEach((value, index)=>{
			if (value.giftId == SVIPGiftType.GoldenKeyGift) {
				isHaveSVIP = true;
				this.mBtne_Super_Buy.visibility = mw.SlateVisibility.Visible;
				this.mCanvas_Own.visibility = mw.SlateVisibility.SelfHitTestInvisible;
				this.remainTime = ModuleService.getModule(SVIPModuleC).getGiftRemainTime(SVIPGiftType.GoldenKeyGift);
				this.updateRemainTime();
				if (this.timer) {
					TimeUtil.clearInterval(this.timer);
					this.timer = null;
				}
				if (this.remainTime > 0) {
					this.timer = TimeUtil.setInterval(()=>{
						this.remainTime--;
						this.updateRemainTime();
					}, 1);
				}
			}
		})
		if (isHaveSVIP == false) {
			this.mCanvas_Own.visibility = mw.SlateVisibility.Collapsed;
			this.mBtne_Super_Buy.visibility = mw.SlateVisibility.Visible;
		}
		let haveVip = await ModuleService.getModule(SVIPModuleC).checkSVIP();
		this.mText_Normal_Own.visibility = haveVip ? mw.SlateVisibility.SelfHitTestInvisible: mw.SlateVisibility.Collapsed;
		this.mBtne_Normal_Buy.visibility = haveVip ? mw.SlateVisibility.Collapsed: mw.SlateVisibility.Visible;
	}

	

	private updateRemainTime(){
		if (this.remainTime == null || this.remainTime == undefined) {
			return;
		}
		if (this.remainTime >= 86400){
			this.mText_Super_Own.text =  StringUtil.format(GameConfig.Text.getElement("20058").Content, Math.floor(this.remainTime/ 86400));
		}
		else if(this.remainTime < 86400 && this.remainTime > 0){
			this.mText_Super_Own.text =  StringUtil.format(GameConfig.Text.getElement("20055").Content, Tools.changeSecond2Minus2(this.remainTime));
		}
		else{
			this.mText_Super_Own.text = "";
		}
		
		if (this.remainTime <= 0) {
			this.mCanvas_Own.visibility = mw.SlateVisibility.Collapsed;
			if (this.timer) {
				TimeUtil.clearInterval(this.timer);
				this.timer = null;
			}
		}
	}


	private	initNormalGift(){
		let normalGift = this.mCanvas_Normal_Reward;
		this.mBtne_Normal_Buy.onClicked.add(()=>{
			ModuleService.getModule(SVIPModuleC).tryBuySVIP();
		})
		GameConfig.Member.getAllElement().forEach((value, index)=>{
			if (value.MemberType == SVIPGiftType.NormalGift) {
				let child = mw.UIService.create(P_BuyMemberItem);
				normalGift.addChild(child.uiObject);
				child.uiObject.size = child.rootCanvas.size;
				child.mImg_Icon.imageGuid = value.IconGUID.toString();
				child.mText_Des.text = value.Name;
				child.mText_Num.text = value.CurrencyNum.toString();
				child.mText_Num.visibility = value.CurrencyNum > 0 ? mw.SlateVisibility.SelfHitTestInvisible: mw.SlateVisibility.Collapsed; 
			}
		})
	}

	private	initGoldenGift(){
		let normalGift = this.mCanvas_Super_Reward;
		this.mImg_Super_Tip_Icon.imageGuid = Globals.goldenKeyIcon;
		this.mBtne_Super_Buy.onClicked.add(()=>{
			ModuleService.getModule(SVIPModuleC).tryUseGoldenKeyByGift(SVIPGiftType.GoldenKeyGift);
		})
		GameConfig.Member.getAllElement().forEach((value, index)=>{
			if (value.MemberType == SVIPGiftType.GoldenKeyGift) {
				let child = mw.UIService.create(P_BuyMemberItem);
				normalGift.addChild(child.uiObject);
				child.uiObject.size = child.rootCanvas.size;
				child.mImg_Icon.imageGuid = value.IconGUID.toString();
				child.mText_Des.text = value.Name;
				child.mText_Num.text = value.CurrencyNum.toString();
				child.mText_Num.visibility = value.CurrencyNum > 0 ? mw.SlateVisibility.SelfHitTestInvisible: mw.SlateVisibility.Collapsed; 
			}
		})
	}


	/** 
	 * 构造UI文件成功后，onStart之后 
	 * 对于UI的根节点的添加操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onAdded() {
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
