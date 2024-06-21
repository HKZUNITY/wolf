import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Gender","FrontHair","FHRGB","BehindHair","BHRGB","Head","EyesRGB","BrowRGB","UpperCloth","UCRGB","LowerCloth","Shoes","Gloves","HeadPortrait","Image","ShopIcon","DeadBodyGUID"],["","","","","","","","","","","","","","","","","","",""],[10001,"毛衣水手棕发",2,74868,null,66563,null,22860,null,null,59857,null,64333,63294,75663,86330,86337,86337,"52DFC18E4E8CAF0A1B3820827B99F74D"],[10002,"连体制服银发",2,63544,null,63550,null,22860,null,null,62776,null,65659,64206,75663,86332,86335,86335,"1EA968604B4E0D23A2DA37AD965B9C99"],[20001,"不良水手粉发",2,62785,null,62789,null,22860,null,null,57730,null,65665,66571,66423,86331,86333,86333,"7A763BB04FF484E750AA049EE03062EB"],[20002,"韩式水手马尾",2,64257,null,64261,null,22860,null,null,62777,null,62790,62781,75663,86336,86334,86334,"E08FFFDC461373FE6983FB964FE53AEE"],[30001,"可爱双马尾女",2,57731,null,57735,null,22860,null,null,62776,null,63312,64206,75663,94185,94181,94181,null],[30002,"兔耳杀马特女",2,74448,null,63647,null,22860,null,null,63648,null,65665,65657,75663,94183,94180,94180,null],[30003,"棕毛针织衫男",1,66162,null,66161,null,30454,null,null,63674,null,66699,66416,75664,94186,94184,94184,null],[30004,"红毛不良男",1,66064,null,66068,null,30454,null,null,63593,null,65062,63596,75664,94179,94182,94182,null],[30005,"蓝马尾科技少女",2,22868,null,22848,null,22860,null,null,26040,null,26063,26045,26058,48713,48715,48716,"52DFC18E4E8CAF0A1B3820827B99F74D"],[30006,"粉“兔耳”科技少女",2,26051,null,26056,null,22860,null,null,26040,null,26064,26047,22849,48714,48712,48713,"1EA968604B4E0D23A2DA37AD965B9C99"],[30007,"精英风男",1,35177,null,35179,null,30454,null,null,30452,null,30465,35168,30461,51906,51904,51905,"7A763BB04FF484E750AA049EE03062EB"],[30008,"可爱鲨鱼男",1,30459,null,30460,null,30454,null,null,35165,null,35192,35170,35184,51907,51905,51906,"E08FFFDC461373FE6983FB964FE53AEE"],[30009,"啦啦队长",2,64311,null,64310,null,22860,null,null,59880,null,64334,64209,75663,110501,110493,110493,null],[30010,"文静大小姐",2,66506,null,66507,null,22860,null,null,64545,null,116955,64456,67544,110512,110508,110508,null],[30011,"兔耳美少女",2,63546,null,63549,null,22860,null,null,64140,null,64457,64711,75663,110499,110522,110522,null],[30012,"男老师",1,74118,null,74121,null,30454,null,null,66160,null,63965,64713,75664,110519,110490,110490,null],[30013,"宅男",1,65975,null,65977,null,30454,null,null,74113,null,66426,66417,75664,110517,110500,110500,null],[30014,"潮流女孩",2,62963,null,62966,null,22860,null,null,63300,null,66424,64727,75663,110511,110498,110498,null],[30015,"学生会长",1,64996,null,64998,null,30454,null,null,63671,null,63680,63675,75664,141820,141795,141795,null],[30016,"女老师",2,74868,null,66563,null,22860,null,null,62956,null,60113,62961,75663,141794,141819,141819,null],[30017,"班主任",2,64254,null,64259,null,22860,null,null,62536,null,67589,63294,75663,141797,141810,141810,null],[30018,"海边姐姐",2,118530,null,118531,null,22860,null,null,111497,null,111722,111195,75663,141793,141798,141798,null],[30019,"邻家妹妹",2,119428,null,119430,null,22860,null,null,115921,null,111722,111207,75663,141817,141787,141787,null],[30020,"健身教练",2,118484,null,118483,null,22860,null,null,66301,null,64729,111206,65978,141812,141814,141814,null],[30021,"优雅少女",2,66573,null,66575,null,22860,null,null,66572,null,66576,62780,66710,141820,141803,141803,null],[30022,"探险家",2,92726,null,118571,null,22860,null,null,64458,null,66576,74458,66423,141811,141801,141801,null],[30023,"民国学生",2,118420,null,118421,null,22860,null,null,119362,null,116955,66729,75663,141818,141815,141815,null],[30024,"可可少女",2,118545,null,118544,null,22860,null,null,59955,null,67590,66371,75663,141809,141808,141808,null],[30025,"猫猫店员",2,63299,null,63309,null,22860,null,null,63295,null,63313,63301,63308,141788,141792,141792,null],[30026,"女仆甜心",2,119414,null,119413,null,22860,null,null,64305,null,64309,64304,75663,141790,141816,141816,null],[30027,"猫耳女仆",2,64143,null,64148,null,22860,null,null,63291,null,67589,63294,63307,141791,141807,141807,null],[30028,"少女偶像",2,67588,null,67586,null,22860,null,null,63304,null,63315,63296,63890,141796,141799,141799,null],[30029,"圣诞少女",2,67584,null,67587,null,22860,null,null,67582,null,116973,67592,64416,141813,141789,141789,null]];
export interface IRoleElement extends IElementBase{
 	/**角色序号*/
	ID:number
	/**角色名称*/
	Name:string
	/**性别，2女，1男*/
	Gender:number
	/**前发*/
	FrontHair:number
	/**前发颜色*/
	FHRGB:string
	/**后发*/
	BehindHair:number
	/**后发颜色*/
	BHRGB:string
	/**脑壳*/
	Head:number
	/**瞳孔颜色*/
	EyesRGB:string
	/**眉毛和睫毛颜色*/
	BrowRGB:string
	/**上衣*/
	UpperCloth:number
	/**上衣颜色*/
	UCRGB:string
	/**下装*/
	LowerCloth:number
	/**鞋子*/
	Shoes:number
	/**手套*/
	Gloves:number
	/**角色头像GUID*/
	HeadPortrait:number
	/**角色形象GUID*/
	Image:number
	/**商店图标GUID*/
	ShopIcon:number
	/**角色尸体GUID*/
	DeadBodyGUID:string
 } 
export class RoleConfig extends ConfigBase<IRoleElement>{
	constructor(){
		super(EXCELDATA);
	}

}