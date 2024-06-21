import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","ItemGUID","Content","Comment"],["","","","",""],[10001,"PlayStart_Inside_001","6A4B9B76","局内出生点组-关卡1",null],[10002,"PlayStart_Hall","2C4F453B","大厅出生点组",null],[10003,"WeaponPoint","989CD40E","掉落武器触发器",null],[10004,"WeaponModle","583E02554D42FD82533CE79B29D1B966","掉落武器模型",null],[10005,"PropPoint","21018C61","道具触发器",null],[10006,"CoinPoint","5CFC9038","金币触发器+金币模型",null],[10007,"PlayStart_Inside_002","10DBE474","局内出生点组-关卡2",null],[10008,"NameScriptExt","34B99411","玩家头顶名称","世界UI脚本"],[10009,"AIModle","38DD145E","AI父节点",null],[10010,"PlayStart_Inside_003","2683B3F2","局内出生点组-关卡3",null]];
export interface ISceneItemElement extends IElementBase{
 	/**序号
10000：其他
20000：武器特效*/
	ID:number
	/**名称*/
	Name:string
	/**物品GUID*/
	ItemGUID:string
	/**内容*/
	Content:string
	/**备注*/
	Comment:string
 } 
export class SceneItemConfig extends ConfigBase<ISceneItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}