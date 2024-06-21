import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","chatType","Mark"],["","",""],[1,["20042","20043","20044"],["学生","警探","凶手"]]];
export interface IChatExtensionElement extends IElementBase{
 	/**id*/
	id:number
	/**聊天类型
引用文本表ID*/
	chatType:Array<string>
	/**标注*/
	Mark:Array<string>
 } 
export class ChatExtensionConfig extends ConfigBase<IChatExtensionElement>{
	constructor(){
		super(EXCELDATA);
	}

}