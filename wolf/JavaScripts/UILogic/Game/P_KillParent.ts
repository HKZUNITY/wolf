
/** 
 * AUTHOR: 达瓦里氏
 * TIME: 2023.07.12-16.01.38
 */

import { GameConfig } from "../../Tables/GameConfig";
import KillParent_Generate from "../../ui-generate/uiTemplate/Inside/KillParent_generate";
import P_Kill from "./P_Kill";

export default class P_KillParent extends KillParent_Generate {
    private idlePool: Array<mw.UserWidget> = new Array<mw.UserWidget>();
    private offsetX: number = GameConfig.Rule.getElement(60012).Num;
    private offsetY: number = GameConfig.Rule.getElement(60013).Num;
    // private upDistance: number = GameConfig.Rule.getElement(60011).Weight;
    private upDistance: number = -200;
    private tweenTime: number = GameConfig.Rule.getElement(60010).Time;
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = true;
		this.layer = mw.UILayerMiddle;
	}

    public addKillUI(pos: Vector){
        let idleUI = this.getIdleObj();
        let text = idleUI.findChildByPath("RootCanvas/mText_1") as mw.TextBlock;
        this.updateKillUI(text, pos);
        idleUI.visibility=  mw.SlateVisibility.HitTestInvisible;
        let tween = new mw.Tween({ y: 0}).to({ y: this.upDistance }, this.tweenTime* 1000)
        .onUpdate((data)=>{
            this.updateKillUI(text, pos);
            text.position = text.position.clone().add(new Vector2(0, data.y));
        })
        .onComplete(()=>{
            this.addIdleObj(idleUI);
        })
        .start();
    }

    private updateKillUI(text: mw.TextBlock, pos: Vector){
        let screenResult = InputUtil.projectWorldPositionToWidgetPosition(pos);
        let originPos = screenResult.screenPosition.clone()
        if (originPos.x == 0 && originPos.y == 0) {
            originPos = new mw.Vector2(-10000, -10000)
        }
        else{
            originPos.add(new Vector2(this.offsetX, this.offsetY));
        }
        text.position = originPos;
        
    }



    private getIdleObj() {
        let res: mw.UserWidget = null;
        if (this.idlePool.length <= 0) {
            res = mw.UIService.create(P_Kill).uiWidgetBase;
            res.visibility = mw.SlateVisibility.Collapsed;
            this.rootCanvas.addChild(res);
        }
        else{
            res = this.idlePool.pop();
        }
        return res;
    }

    private addIdleObj(obj: mw.UserWidget){
        obj.visibility = mw.SlateVisibility.Collapsed;
        this.idlePool.push(obj);
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
