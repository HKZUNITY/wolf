import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Remark","BirthName","BirthPoint","ImageGuid","PlayerSpeed"],["","Language","","","","",""],[10000,"Level_Name_10000","大厅","PlayStart_Hall","2C4F453B",null,"350"],[10001,"Level_Name_10001","湖边别墅","PlayStart_Inside_001","6A4B9B76","111775","350"],[10002,"Level_Name_10002","林中庭院","PlayStart_Inside_002","10DBE474","111774","350"],[10003,"Level_Name_10003","赛博之城","PlayStart_Inside_003","2683B3F2","54193","430"]];
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