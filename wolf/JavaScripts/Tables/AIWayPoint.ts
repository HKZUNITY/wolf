import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Location","Scale","Num"],["","","",""],[10000,null,null,14],[10001,new mw.Vector(2964,463,-20),new mw.Vector(5,5,1),0],[10002,new mw.Vector(2236,1057,-20),new mw.Vector(4,12,1),0],[10003,new mw.Vector(2116,-838,-20),new mw.Vector(4,4,1),0],[10004,new mw.Vector(3138,-1600,-20),new mw.Vector(2.5,10,1),0],[10005,new mw.Vector(3173,-392,-20),new mw.Vector(2,7,1),0],[10006,new mw.Vector(969,-25,-20),new mw.Vector(5.5,13,1),0],[10007,new mw.Vector(-314,305,-20),new mw.Vector(10,3,1),0],[10008,new mw.Vector(-347,-331,-20),new mw.Vector(10,3,1),0],[10009,new mw.Vector(1239,-1127,-20),new mw.Vector(3,3,1),0],[10010,new mw.Vector(-1422,-1242,-20),new mw.Vector(3,3,1),0],[10011,new mw.Vector(-1141,1462,-20),new mw.Vector(5,5,1),0],[10012,new mw.Vector(1159,1041,-20),new mw.Vector(2,2,1),0],[10013,new mw.Vector(-3204,-112,-20),new mw.Vector(3,35,1),0],[10014,new mw.Vector(-4560,-133,-20),new mw.Vector(4,15,1),0],[20000,null,null,14],[20001,new mw.Vector(2964,463,-20),new mw.Vector(5,5,1),0],[20002,new mw.Vector(2236,1057,-20),new mw.Vector(4,12,1),0],[20003,new mw.Vector(2116,-838,-20),new mw.Vector(4,4,1),0],[20004,new mw.Vector(3138,-1600,-20),new mw.Vector(2.5,10,1),0],[20005,new mw.Vector(3173,-392,-20),new mw.Vector(2,7,1),0],[20006,new mw.Vector(969,-25,-20),new mw.Vector(5.5,13,1),0],[20007,new mw.Vector(-314,305,-20),new mw.Vector(10,3,1),0],[20008,new mw.Vector(-347,-331,-20),new mw.Vector(10,3,1),0],[20009,new mw.Vector(1239,-1127,-20),new mw.Vector(3,3,1),0],[20010,new mw.Vector(-1422,-1242,-20),new mw.Vector(3,3,1),0],[20011,new mw.Vector(-1141,1462,-20),new mw.Vector(5,5,1),0],[20012,new mw.Vector(1159,1041,-20),new mw.Vector(2,2,1),0],[20013,new mw.Vector(-3204,-112,-20),new mw.Vector(3,35,1),0],[20014,new mw.Vector(-4560,-133,-20),new mw.Vector(4,15,1),0],[30000,null,null,14],[30001,new mw.Vector(2964,463,-20),new mw.Vector(5,5,1),0],[30002,new mw.Vector(2236,1057,-20),new mw.Vector(4,12,1),0],[30003,new mw.Vector(2116,-838,-20),new mw.Vector(4,4,1),0],[30004,new mw.Vector(3138,-1600,-20),new mw.Vector(2.5,10,1),0],[30005,new mw.Vector(3173,-392,-20),new mw.Vector(2,7,1),0],[30006,new mw.Vector(969,-25,-20),new mw.Vector(5.5,13,1),0],[30007,new mw.Vector(-314,305,-20),new mw.Vector(10,3,1),0],[30008,new mw.Vector(-347,-331,-20),new mw.Vector(10,3,1),0],[30009,new mw.Vector(1239,-1127,-20),new mw.Vector(3,3,1),0],[30010,new mw.Vector(-1422,-1242,-20),new mw.Vector(3,3,1),0],[30011,new mw.Vector(-1141,1462,-20),new mw.Vector(5,5,1),0],[30012,new mw.Vector(1159,1041,-20),new mw.Vector(2,2,1),0],[30013,new mw.Vector(-3204,-112,-20),new mw.Vector(3,35,1),0],[30014,new mw.Vector(-4560,-133,-20),new mw.Vector(4,15,1),0]];
export interface IAIWayPointElement extends IElementBase{
 	/**序号*/
	ID:number
	/**位置*/
	Location:mw.Vector
	/**大小*/
	Scale:mw.Vector
	/**数量*/
	Num:number
 } 
export class AIWayPointConfig extends ConfigBase<IAIWayPointElement>{
	constructor(){
		super(EXCELDATA);
	}

}