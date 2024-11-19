import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Location","Scale","Num"],["","","",""],[10000,null,null,14],[10001,new mw.Vector(480,400,760),new mw.Vector(8,6,1),0],[10002,new mw.Vector(-405,350,760),new mw.Vector(9,6,1),0],[10003,new mw.Vector(-710,900,760),new mw.Vector(3,2.4,1),0],[10004,new mw.Vector(700,895,760),new mw.Vector(3,2.4,1),0],[10005,new mw.Vector(-760,2040,820),new mw.Vector(2,5,1),0],[10006,new mw.Vector(1235,1900,760),new mw.Vector(4,10,1),0],[10007,new mw.Vector(485,2815,760),new mw.Vector(6,6,1),0],[10008,new mw.Vector(-725,4400,820),new mw.Vector(2,5,1),0],[10009,new mw.Vector(-145,3745,760),new mw.Vector(1,5,1),0],[10010,new mw.Vector(1150,2760,760),new mw.Vector(4,5,1),0],[10011,new mw.Vector(1465,5060,760),new mw.Vector(6,10,1),0],[10012,new mw.Vector(1930,5110,760),new mw.Vector(2,6,1),0],[10013,new mw.Vector(1280,4215,410),new mw.Vector(2,2,1),0],[10014,new mw.Vector(1355,3780,410),new mw.Vector(2,2,1),0],[20000,null,null,14],[20001,new mw.Vector(-21450,20000,106),new mw.Vector(4,4,1),0],[20002,new mw.Vector(-20467,20615,103),new mw.Vector(3,3,1),0],[20003,new mw.Vector(-19671,21137,104),new mw.Vector(2,2,1),0],[20004,new mw.Vector(-19223,20691,103),new mw.Vector(4,4,1),0],[20005,new mw.Vector(-19844,20423,110),new mw.Vector(4,4,1),0],[20006,new mw.Vector(-19275,20186,106),new mw.Vector(2,2,1),0],[20007,new mw.Vector(-18427,20049,104),new mw.Vector(1,1,1),0],[20008,new mw.Vector(-19442,19417,103),new mw.Vector(1,1,1),0],[20009,new mw.Vector(-18947,18825,100),new mw.Vector(1,1,1),0],[20010,new mw.Vector(-21192,19129,210),new mw.Vector(1,1,1),0],[20011,new mw.Vector(-20680,19789,109),new mw.Vector(3,3,1),0],[20012,new mw.Vector(-19995,19649,106),new mw.Vector(3,3,1),0],[20013,new mw.Vector(-20067,19034,107),new mw.Vector(1,1,1),0],[20014,new mw.Vector(-20300,20089,106),new mw.Vector(1,1,1),0],[30000,null,null,16],[30001,new mw.Vector(985,14686,35),new mw.Vector(1,1,1),0],[30002,new mw.Vector(2601,14525,35),new mw.Vector(1,1,1),0],[30003,new mw.Vector(2101,13240,35),new mw.Vector(1,1,1),0],[30004,new mw.Vector(3795,13799,35),new mw.Vector(1,1,1),0],[30005,new mw.Vector(4735,15233,35),new mw.Vector(1,1,1),0],[30006,new mw.Vector(5315,16041,35),new mw.Vector(1,1,1),0],[30007,new mw.Vector(4489,14667,35),new mw.Vector(1,1,1),0],[30008,new mw.Vector(5684,14270,35),new mw.Vector(1,1,1),0],[30009,new mw.Vector(1694,13495,35),new mw.Vector(1,1,1),0],[30010,new mw.Vector(3512,11796,35),new mw.Vector(1,1,1),0],[30011,new mw.Vector(4113,11831,35),new mw.Vector(1,1,1),0],[30012,new mw.Vector(3111,12086,35),new mw.Vector(1,1,1),0],[30013,new mw.Vector(1496,12493,35),new mw.Vector(1,1,1),0],[30014,new mw.Vector(2141,11850,35),new mw.Vector(1,1,1),0],[30015,new mw.Vector(899,11993,35),new mw.Vector(1,1,1),0],[30016,new mw.Vector(1257,13326,35),new mw.Vector(1,1,1),0]];
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