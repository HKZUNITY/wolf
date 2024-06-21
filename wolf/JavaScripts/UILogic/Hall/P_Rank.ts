/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-13 15:35:23
 * @LastEditors  : songyang.xie
 * @LastEditTime : 2023-02-17 15:03:42
 * @FilePath     : \murdermystery3\JavaScripts\UILogic\Hall\P_Rank.ts
 * @Description  : 修改描述
 */

/** 
 * AUTHOR: 可可果嘟
 * TIME: 2023.02.09-11.23.40
 */

import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import HeadRank_Generate from "../../ui-generate/uiTemplate/Hall/HeadRank_generate";
import { GameConfig } from "../../Tables/GameConfig";

export default class P_Rank extends HeadRank_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	private idleArray: Array<mw.Canvas> = new Array<mw.Canvas>()
	private originSize: mw.Vector2 = new mw.Vector2(60, 60)
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.initRankUI()
	}

	show(){
		mw.UIService.showUI(this, mw.UILayerScene)
	}
	hide(){
		mw.UIService.hideUI(this)
	}
	/**获取等级ui */
	getRankUI(){
		if (this.idleArray.length <= 0) {
			oTraceError("按钮列表为空")
			return
		}
		let temp = this.idleArray.shift()
		return temp
	}
	addIdleRank(canvas: mw.Canvas){
		canvas.visibility = mw.SlateVisibility.Collapsed
		this.idleArray.push(canvas)
	}
	/**初始化rankui */
	initRankUI(){
		let count = this.rootCanvas.getChildrenCount()
		for (let i = 0; i < count; i++) {
			let child = this.rootCanvas.getChildAt(i) as mw.Canvas
			this.idleArray.push(child)
		}
	}
	/**更新玩家等级 */
	updateRankUI(rankUI: mw.Canvas, level: number){
		let levelText = rankUI.getChildAt(1) as mw.TextBlock
		levelText.text = level.toString()
		GameConfig.Rank.getAllElement().every((value, index)=>{
			if (value.Level == level) {
				let image = value.BgID.toString()
				let imageUI = rankUI.getChildAt(0) as mw.Image
				imageUI.imageGuid = image
				return false
			}
			return true
		})

	}
	/**更新等级大小 */
	setRankScale(canvas: mw.Canvas, rate: number){
		let newSize = mw.Vector2.multiply(this.originSize, rate)
		canvas.size = newSize
		canvas.getChildAt(0).size = newSize
		canvas.getChildAt(1).size = newSize
		let text = canvas.getChildAt(1) as mw.TextBlock
		/**020版本编辑器问题，需要重新刷新文字对齐方式 */
		text.textVerticalAlign = mw.TextVerticalJustify.Center
	}
}
