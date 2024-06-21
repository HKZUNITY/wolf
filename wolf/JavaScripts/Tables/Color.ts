import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Num","Rate","Pos","Shop","Shopwords","Case","Casewords","Slot","Slotwords"],["","","","","","","","",""],[10001,"红色",null,new mw.Vector(255,0,96),new mw.Vector(255,64,107),new mw.Vector(255,0,96),new mw.Vector(255,64,107),new mw.Vector(255,0,96),new mw.Vector(255,0,96)],[10002,"紫色",null,new mw.Vector(255,90,234),new mw.Vector(255,90,234),new mw.Vector(230,0,241),new mw.Vector(255,90,234),new mw.Vector(230,0,241),new mw.Vector(230,0,241)],[10003,"蓝色",null,new mw.Vector(90,124,247),new mw.Vector(90,124,247),new mw.Vector(0,79,212),new mw.Vector(90,124,247),new mw.Vector(0,79,212),new mw.Vector(0,79,212)],[10004,"绿色",null,new mw.Vector(75,243,69),new mw.Vector(75,243,69),new mw.Vector(29,236,0),new mw.Vector(75,243,69),new mw.Vector(29,236,0),new mw.Vector(29,236,0)],[10005,"白色",null,new mw.Vector(247,224,202),new mw.Vector(247,224,202),new mw.Vector(247,224,202),new mw.Vector(247,224,202),new mw.Vector(247,224,202),new mw.Vector(247,224,202)]];
export interface IColorElement extends IElementBase{
 	/**序号*/
	Num:number
	/**稀有度*/
	Rate:string
	/**UI位置：*/
	Pos:string
	/**商店背景*/
	Shop:mw.Vector
	/**商店字体*/
	Shopwords:mw.Vector
	/**武器箱内背光*/
	Case:mw.Vector
	/**箱内字体（名字和概率）*/
	Casewords:mw.Vector
	/**抽奖过程中*/
	Slot:mw.Vector
	/**抽奖过程中字体*/
	Slotwords:mw.Vector
 } 
export class ColorConfig extends ConfigBase<IColorElement>{
	constructor(){
		super(EXCELDATA);
	}

}