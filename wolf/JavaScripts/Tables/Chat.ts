import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","Chats","ChatChilds"],["","",""],[1,["I Am {0}","我是{0}"],[["Student","学生"],["Detective","侦探"],["Murderer","凶手"]]],[2,["Who Is The Murderer?","凶手是谁？"],null],[3,["It Ticks Me Off","0.o 气死我了"],null],[4,["Help!","救命啊！"],null],[5,["Thank You!","谢谢你 ^_^"],null],[6,["Hello!","你好！"],null],[7,["Don't Kill Me :(((","别刀我 QAQ"],null],[8,["Stay Away From Me!","<--退！<--退！<--退！"],null],[9,["Perfect!","*0* 满分操作！"],null],[10,["Show Time!",")*o*( 我要开始表演了~"],null]];
export interface IChatElement extends IElementBase{
 	/**唯一ID*/
	Id:number
	/**undefined*/
	Chats:Array<string>
	/**undefined*/
	ChatChilds:Array<Array<string>>
 } 
export class ChatConfig extends ConfigBase<IChatElement>{
	constructor(){
		super(EXCELDATA);
	}

}