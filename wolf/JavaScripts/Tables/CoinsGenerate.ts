import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Location","Scale","Point1","Point2","Point3","Quantity"],["","","","","","",""],[10000,null,null,null,null,null,6],[10001,new mw.Vector(-7230,-1800,241),[2,20,1],new mw.Vector(-7220,-2625,241),new mw.Vector(-841,-1288,241),new mw.Vector(-7116,1747,241),50],[10002,new mw.Vector(-7230,700,241),[2,22,1],new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),50],[10003,new mw.Vector(-6730,-2490,241),[7,6,1],new mw.Vector(-7116,1747,241),new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),50],[10004,new mw.Vector(-5800,-2570,241),[5,5,1],new mw.Vector(-1101,1050,241),new mw.Vector(-7116,1747,241),new mw.Vector(-841,-1288,241),50],[10005,new mw.Vector(-4000,-2600,241),[14,4,1],new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),new mw.Vector(-7116,1747,241),50],[10006,new mw.Vector(-5124,-2342,241),[8,2.5,1],new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),50],[20000,null,null,null,null,null,6],[20001,new mw.Vector(-7230,-1800,241),[2,20,1],new mw.Vector(-7220,-2625,241),new mw.Vector(-841,-1288,241),new mw.Vector(-7116,1747,241),50],[20002,new mw.Vector(-7230,700,241),[2,22,1],new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),50],[20003,new mw.Vector(-6730,-2490,241),[7,6,1],new mw.Vector(-7116,1747,241),new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),50],[20004,new mw.Vector(-5800,-2570,241),[5,5,1],new mw.Vector(-1101,1050,241),new mw.Vector(-7116,1747,241),new mw.Vector(-841,-1288,241),50],[20005,new mw.Vector(-4000,-2600,241),[14,4,1],new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),new mw.Vector(-7116,1747,241),50],[20006,new mw.Vector(-5124,-2342,241),[8,2.5,1],new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),50],[30000,null,null,null,null,null,6],[30001,new mw.Vector(-7230,-1800,241),[2,20,1],new mw.Vector(-7220,-2625,241),new mw.Vector(-841,-1288,241),new mw.Vector(-7116,1747,241),50],[30002,new mw.Vector(-7230,700,241),[2,22,1],new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),50],[30003,new mw.Vector(-6730,-2490,241),[7,6,1],new mw.Vector(-7116,1747,241),new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),50],[30004,new mw.Vector(-5800,-2570,241),[5,5,1],new mw.Vector(-1101,1050,241),new mw.Vector(-7116,1747,241),new mw.Vector(-841,-1288,241),50],[30005,new mw.Vector(-4000,-2600,241),[14,4,1],new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),new mw.Vector(-7116,1747,241),50],[30006,new mw.Vector(-5124,-2342,241),[8,2.5,1],new mw.Vector(-841,-1288,241),new mw.Vector(-7220,-2625,241),new mw.Vector(-1101,1050,241),50]];
export interface ICoinsGenerateElement extends IElementBase{
 	/**序号*/
	ID:number
	/**位置*/
	Location:mw.Vector
	/**尺寸*/
	Scale:Array<number>
	/**点1
+|+|0*/
	Point1:mw.Vector
	/**点2
-|+|0*/
	Point2:mw.Vector
	/**点3
-|-|0*/
	Point3:mw.Vector
	/**生成数量*/
	Quantity:number
 } 
export class CoinsGenerateConfig extends ConfigBase<ICoinsGenerateElement>{
	constructor(){
		super(EXCELDATA);
	}

}