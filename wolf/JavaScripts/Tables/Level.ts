import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Remark","BirthName","BirthPoint","ImageGuid","PlayerSpeed"],["","","","","","",""],[10000,"水上乐园","大厅","PlayStart_Hall","2C4F453B",null,"350"],[10001,"水上乐园","夜色酒吧","PlayStart_Inside_001","6A4B9B76","292240","350"],[10002,"水上乐园","樱花咖啡馆","PlayStart_Inside_002","6A4B9B76","292241","350"],[10003,"水上乐园","泳池派对","PlayStart_Inside_003","6A4B9B76","292252","430"]];
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