import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","BuffDesc","Type","Condition","Param1"],["","","","",""],[10001,"位移加速为1.1倍",0,1,1.1],[10002,"飞刀移速加速为1.6倍",1,2,2],[10003,"爆炸飞刀",-1,2,0]];
export interface IBuffElement extends IElementBase{
 	/**序号*/
	ID:number
	/**Buff说明*/
	BuffDesc:string
	/**类型
-1：不生效
0：位移加速
1：飞刀加速*/
	Type:number
	/**生效条件
0：杀手
1：杀手持刀
2：杀手飞刀*/
	Condition:number
	/**参数1（百分比）*/
	Param1:number
 } 
export class BuffConfig extends ConfigBase<IBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}