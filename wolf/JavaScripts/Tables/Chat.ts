import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","chat","chattrans","isExtension"],["","Language","",""],[1,"Chat_chat_1","我是{1}",true],[2,"Chat_chat_2","凶手是谁？",false],[3,"Chat_chat_3","😡气死我了",false],[4,"Chat_chat_4","救命💦",false],[5,"Chat_chat_5","别刀我😭",false],[6,"Chat_chat_6","谢谢你🙏",false],[7,"Chat_chat_7","🤺退！🤺退！🤺退！",false],[8,"Chat_chat_8","💯满分操作！",false],[9,"Chat_chat_9","🎭我要开始表演了~",false]];
export interface IChatElement extends IElementBase{
 	/**id*/
	id:number
	/**聊天*/
	chat:string
	/**翻译*/
	chattrans:string
	/**是否为拓展*/
	isExtension:boolean
 } 
export class ChatConfig extends ConfigBase<IChatElement>{
	constructor(){
		super(EXCELDATA);
	}

}