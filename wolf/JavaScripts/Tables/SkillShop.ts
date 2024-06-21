import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Sequence","NameMark","Name","Description","IconGUID","PriceType","PriceNum","SkillID","Max"],["","","","Language","Language","","","","",""],[10001,4,"杀手步伐","SkillShop_Name_10001","SkillShop_Description_10001",184596,[0],[1],10001,0],[10002,5,"快速投掷","SkillShop_Name_10002","SkillShop_Description_10002",171561,[0],[3000],10002,0],[10003,6,"爆炸飞刀","SkillShop_Name_10003","SkillShop_Description_10003",171565,[0],[5000],10003,0],[10004,7,"幽灵斗篷","SkillShop_Name_10004","SkillShop_Description_10004",166661,[0],[4000],10004,0],[10005,1,"快速投掷体验券","SkillShop_Name_10005","SkillShop_Description_10005",171561,[2],[6],10002,99],[10006,2,"爆炸飞刀体验券","SkillShop_Name_10006","SkillShop_Description_10006",171565,[2],[10],10003,99],[10007,3,"幽灵斗篷体验券","SkillShop_Name_10007","SkillShop_Description_10007",166661,[2],[8],10004,99]];
export interface ISkillShopElement extends IElementBase{
 	/**序号*/
	ID:number
	/**显示顺序*/
	Sequence:number
	/**名称标注*/
	NameMark:string
	/**名称*/
	Name:string
	/**描述*/
	Description:string
	/**图标GUID*/
	IconGUID:number
	/**价格类型
0：金币
1：钻石
2：广告券*/
	PriceType:Array<number>
	/**价格数量（与类型一一对应）*/
	PriceNum:Array<number>
	/**技能ID
引用技能表ID*/
	SkillID:number
	/**持有上限*/
	Max:number
 } 
export class SkillShopConfig extends ConfigBase<ISkillShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}