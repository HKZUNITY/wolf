import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","NameMark","Name","IconGUID","GetType","GetNum","ConsumeNum","ShopItem","SkillShopItem","Comment"],["","","","","","","","","",""],[10001,"一袋金币","一小堆金币",157828,1,500,5,0,0,null],[10002,"一箱金币","一大堆金币",157790,1,5000,45,0,0,null],[10003,"限定武器-樱","限定武器-樱",192902,0,0,0,10034,0,null],[10004,"限定武器-蝶","限定武器-蝶",192893,0,0,0,20011,0,null],[10005,"快速投掷体验券","快速投掷体验券",171561,0,0,0,0,10005,null],[10006,"爆炸飞刀体验券","爆炸飞刀体验券",171565,0,0,0,0,10006,null],[10007,"幽灵斗篷体验券","幽灵斗篷体验券",166661,0,0,0,0,10007,null]];
export interface IExchangeElement extends IElementBase{
 	/**序号*/
	ID:number
	/**名称标注*/
	NameMark:string
	/**名称*/
	Name:string
	/**图标GUID*/
	IconGUID:number
	/**获得物类型
1：金币
2：钻石*/
	GetType:number
	/**获得物数量*/
	GetNum:number
	/**广告券消耗数量*/
	ConsumeNum:number
	/**引用商店物品表*/
	ShopItem:number
	/**引用能力商店表*/
	SkillShopItem:number
	/**备注*/
	Comment:string
 } 
export class ExchangeConfig extends ConfigBase<IExchangeElement>{
	constructor(){
		super(EXCELDATA);
	}

}