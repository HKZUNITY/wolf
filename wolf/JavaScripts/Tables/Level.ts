import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Remark","BirthName","BirthPoint","ImageGuid","PlayerSpeed"],["","Language","","","","",""],[10000,"Level_Name_10000","大厅","PlayStart_Hall","2C4F453B",null,"350"],[10001,"Level_Name_10004","恐怖校园","校园出生点","05D3FB23","292222","430",111775,292222],[10002,"Level_Name_10004","恐怖校园","校园出生点","05D3FB23","472609","430",111774,472609],[10003,"Level_Name_10004","恐怖校园","校园出生点","05D3FB23","472633","430",148628,472633]];
export interface ILevelElement extends IElementBase{
 	/**序号*/
	ID:number
	/**关卡名称*/
	Name:string
	/**标注*/
	Remark:string
	/**出生点名称*/
	BirthName:string
	/**出生点GUID*/
	BirthPoint:string
	/**关卡图片Guid*/
	ImageGuid:string
	/**玩家移速*/
	PlayerSpeed:string
 } 
export class LevelConfig extends ConfigBase<ILevelElement>{
	constructor(){
		super(EXCELDATA);
	}

}