import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","leftDoorGuid","leftStartLoc","leftEndLoc","rightDoorGuid","rightStartLoc","rightEndLoc","outTriggerGuid","inTriggerGuid","doorTriggerGuid"],["","","","","","","","","",""],[101,"C0BDABF4",new mw.Vector(4988,12665,35),new mw.Vector(4988,12545,35),"ECA07B4D",new mw.Vector(4988,12786,35),new mw.Vector(4988,12906,35),"44859C93","30976772","32B3C456"],[102,"01BE2B82",new mw.Vector(7414,12771,34),new mw.Vector(7414,12771,260),null,null,null,"A2BFB90D","A2BFB90D",null]];
export interface IDoorElement extends IElementBase{
 	/**ID*/
	id:number
	/**左边门*/
	leftDoorGuid:string
	/**左门起始位置*/
	leftStartLoc:mw.Vector
	/**左门终止位置*/
	leftEndLoc:mw.Vector
	/**右边门*/
	rightDoorGuid:string
	/**右门起始位置*/
	rightStartLoc:mw.Vector
	/**右门终止位置*/
	rightEndLoc:mw.Vector
	/**门外触发器*/
	outTriggerGuid:string
	/**门内触发器*/
	inTriggerGuid:string
	/**关门触发器*/
	doorTriggerGuid:string
 } 
export class DoorConfig extends ConfigBase<IDoorElement>{
	constructor(){
		super(EXCELDATA);
	}

}