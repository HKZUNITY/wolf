import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","camp","state","baseNum","baseMultiple","winNum","winMultiple","Comment"],["","","","","","","",""],[10001,0,0,0,300,900,1,"每拯救一名学生"],[10002,0,1,100,1,0,1,null],[10003,1,0,0,700,0,1.5,"凶手每次击杀"],[10004,1,1,0,700,0,1,null],[10005,2,0,0,1,0,1.5,null],[10006,2,1,0,1,0,1,null],[10007,3,0,0,300,900,1,"每拯救一名学生"],[10008,3,1,0,1,0,1,null]];
export interface IexpRuleElement extends IElementBase{
 	/**Id*/
	id:number
	/**阵营
0：侦探
1：凶手
2：学生
3：英雄*/
	camp:number
	/**0：获胜
1：失败*/
	state:number
	/**基础加成（默认0）*/
	baseNum:number
	/**基础倍率（默认填1）*/
	baseMultiple:number
	/**获胜加成（默认0）*/
	winNum:number
	/**获胜倍率（默认填1）*/
	winMultiple:number
	/**备注*/
	Comment:string
 } 
export class expRuleConfig extends ConfigBase<IexpRuleElement>{
	constructor(){
		super(EXCELDATA);
	}

}