import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","stageTime","soundId"],["","",""],[1001,0,47426],[1002,1,12348],[1003,2,47426],[1004,3,148629]];
export interface IAccountStageElement extends IElementBase{
 	/**Id*/
	id:number
	/**阶段时间点*/
	stageTime:number
	/**对应音效*/
	soundId:number
 } 
export class AccountStageConfig extends ConfigBase<IAccountStageElement>{
	constructor(){
		super(EXCELDATA);
	}

}