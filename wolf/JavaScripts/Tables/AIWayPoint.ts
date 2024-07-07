import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Location","Scale","Num"],["","","",""],[10000,null,null,14],[10001,new mw.Vector(480,400,760),new mw.Vector(8,6,1),0],[10002,new mw.Vector(-405,350,760),new mw.Vector(9,6,1),0],[10003,new mw.Vector(-710,900,760),new mw.Vector(3,2.4,1),0],[10004,new mw.Vector(700,895,760),new mw.Vector(3,2.4,1),0],[10005,new mw.Vector(-760,2040,820),new mw.Vector(2,5,1),0],[10006,new mw.Vector(1235,1900,760),new mw.Vector(4,10,1),0],[10007,new mw.Vector(485,2815,760),new mw.Vector(6,6,1),0],[10008,new mw.Vector(-725,4400,820),new mw.Vector(2,5,1),0],[10009,new mw.Vector(-145,3745,760),new mw.Vector(1,5,1),0],[10010,new mw.Vector(1150,2760,760),new mw.Vector(4,5,1),0],[10011,new mw.Vector(1465,5060,760),new mw.Vector(6,10,1),0],[10012,new mw.Vector(1930,5110,760),new mw.Vector(2,6,1),0],[10013,new mw.Vector(1280,4215,410),new mw.Vector(2,2,1),0],[10014,new mw.Vector(1355,3780,410),new mw.Vector(2,2,1),0],[20000,null,null,14],[20001,new mw.Vector(-11330,11295,65),new mw.Vector(5,6,1),0],[20002,new mw.Vector(-11330,12070,65),new mw.Vector(5,9,1),0],[20003,new mw.Vector(-11155,13270,65),new mw.Vector(5,4,1),0],[20004,new mw.Vector(-10585,14065,65),new mw.Vector(2,3,1),0],[20005,new mw.Vector(-10185,14460,75),new mw.Vector(2,1,1),0],[20006,new mw.Vector(-11825,13915,65),new mw.Vector(2,2,1),0],[20007,new mw.Vector(-13460,14145,90),new mw.Vector(7,3,1),0],[20008,new mw.Vector(-13955,13325,90),new mw.Vector(1,3,1),0],[20009,new mw.Vector(-13610,11495,90),new mw.Vector(6,2,1),0],[20010,new mw.Vector(-12900,11510,95),new mw.Vector(2,2,1),0],[20011,new mw.Vector(-12750,10550,65),new mw.Vector(1,2,1),0],[20012,new mw.Vector(-9845,12185,65),new mw.Vector(1,7,1),0],[20013,new mw.Vector(-13560,13125,90),new mw.Vector(2,1,1),0],[20014,new mw.Vector(-12045,12480,90),new mw.Vector(0.5,1,1),0],[30000,null,null,18],[30001,new mw.Vector(26591,30296,368),new mw.Vector(1,1,1),0],[30002,new mw.Vector(29229,29704,368),new mw.Vector(1,1,1),0],[30003,new mw.Vector(30151,31049,-2),new mw.Vector(1,1,1),0],[30004,new mw.Vector(28166,31968,-2),new mw.Vector(1,1,1),0],[30005,new mw.Vector(27843,33329,-3),new mw.Vector(1,1,1),0],[30006,new mw.Vector(28472,33580,40),new mw.Vector(1,1,1),0],[30007,new mw.Vector(26835,31626,-3),new mw.Vector(1,1,1),0],[30008,new mw.Vector(26731,28274,-90),new mw.Vector(1,1,1),0],[30009,new mw.Vector(28117,27225,-99),new mw.Vector(1,1,1),0],[30010,new mw.Vector(299895,28030,-5),new mw.Vector(1,1,1),0],[30011,new mw.Vector(28010,29258,242),new mw.Vector(1,1,1),0],[30012,new mw.Vector(28311,30730,123),new mw.Vector(1,1,1),0],[30013,new mw.Vector(28975,31292,-5),new mw.Vector(1,1,1),0],[30014,new mw.Vector(27069,29265,242),new mw.Vector(1,1,1),0],[30015,new mw.Vector(29117,28511,-5),new mw.Vector(1,1,1),0],[30016,new mw.Vector(30222,27277,-5),new mw.Vector(1,1,1),0],[30017,new mw.Vector(302405,29223,-2),new mw.Vector(1,1,1),0],[30018,new mw.Vector(30242,30286,368),new mw.Vector(1,1,1),0]];
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