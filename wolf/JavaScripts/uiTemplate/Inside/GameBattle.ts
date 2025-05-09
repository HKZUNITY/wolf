﻿
/** 
 * AUTHOR: 雾满拦江
 * TIME: 2022.11.02-10.08.58
 */

 import GameBattle_Generate from "../../ui-generate/uiTemplate/Inside/GameBattle_generate";

 export default class GameBattle extends GameBattle_Generate {
 
	/** 
	* 构造UI文件成功后，在合适的时机最先初始化一次 
	*/
	 protected onAwake() {
	 	//设置能否每帧触发onUpdate
	 	this.canUpdate = false;
	 	this.layer = mw.UILayerBottom;
	 	this.initButtons();
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
 
 }
 