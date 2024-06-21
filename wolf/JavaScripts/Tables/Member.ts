import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","MemberType","NameMark","Name","IconGUID","ShopItem","RewardType","RewardNum","CurrencyType","CurrencyNum","Duration"],["","","","","","","","","","",""],[1,0,null,"会员特权",180106,0,0,0,0,0,-1],[2,0,null,"超级特权",180106,0,0,0,0,0,480],[10001,1,null,"红色昵称",158298,0,1,30009,0,0,0],[10002,1,null,"结算额外奖励",163444,0,2,0.5,0,0,0],[10003,1,null,"金币袋额外上限",163450,0,3,40,0,0,0],[10004,2,null,"随身份概率翻倍",194015,0,4,1,0,0,0],[10005,2,null,"专属拖尾",148829,30012,0,0,0,0,0],[10006,2,null,"凶手武器",192890,10035,0,0,0,0,0],[10007,2,null,"侦探武器",192900,20012,0,0,0,0,0],[10008,2,null,"一箱金币",163408,0,0,0,1,3888,0],[10009,2,null,"广告券",181394,0,0,0,3,50,0]];
export interface IMemberElement extends IElementBase{
 	/**序号*/
	ID:number
	/**特权类别
1：会员特权
2：超级特权*/
	MemberType:number
	/**名称标注*/
	NameMark:string
	/**奖励名称*/
	Name:string
	/**奖励图标GUID*/
	IconGUID:number
	/**奖励物品
引用商店表ID*/
	ShopItem:number
	/**局外表现类型
1：昵称变色【引用规则表ID】
2：结算额外奖励倍率
3：金币袋上限增加数量
4：随机身份权重增加倍率*/
	RewardType:number
	/**局外表现参数*/
	RewardNum:number
	/**货币类型
1：金币
2：钻石
3：广告券*/
	CurrencyType:number
	/**货币数量*/
	CurrencyNum:number
	/**持续时间（时）*/
	Duration:number
 } 
export class MemberConfig extends ConfigBase<IMemberElement>{
	constructor(){
		super(EXCELDATA);
	}

}