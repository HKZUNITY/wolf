import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Type","Buff","Duration","CD","HitDistance","SkillType","HitEffect","HitEffectPosition","HitEffectScale","HitSound","Delay","HorizontalImpulse","VerticalImpulse","CastEffect","CastEffectPos","CastEffectScale"],["","","","","","","","","","","","","","","","","",""],[10001,"杀手步伐",0,[10001],0,0,0,0,null,null,null,0,0,0,0,null,null,null],[10002,"快速投掷",0,[10002],0,0,0,0,null,null,null,0,0,0,0,null,null,null],[10003,"爆炸飞刀",0,[10003],0,0,300,1,"85156",new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),10026,3,600,600,null,null,null],[10004,"幽灵斗篷",1,null,5,25,0,100,"108249",new mw.Vector(0,0,100),new mw.Vector(1,1,1),10026,0,0,0,"31122",new mw.Vector(0,0,-40),new mw.Vector(1,1,1)]];
export interface ISkillElement extends IElementBase{
 	/**序号*/
	ID:number
	/**名称*/
	Name:string
	/**类型
0：被动
1：主动*/
	Type:number
	/**Buff效果
引用Buff表ID*/
	Buff:Array<number>
	/**【仅主动技能】
持续生效时间*/
	Duration:number
	/**【仅主动技能】
冷却时间*/
	CD:number
	/**伤害范围半径
半径|角度*/
	HitDistance:number
	/**主动技能类型
100以下是子弹
100&以上是其他主动*/
	SkillType:number
	/**子弹命中特效GUID
持续特效GUID*/
	HitEffect:string
	/**命中特效偏移*/
	HitEffectPosition:mw.Vector
	/**命中特效缩放*/
	HitEffectScale:mw.Vector
	/**爆炸音效
技能释放音效
引用音效表ID*/
	HitSound:number
	/**爆炸延时（秒）*/
	Delay:number
	/**爆炸水平冲量*/
	HorizontalImpulse:number
	/**爆炸垂直冲量*/
	VerticalImpulse:number
	/**释放特效*/
	CastEffect:string
	/**释放特效偏移*/
	CastEffectPos:mw.Vector
	/**释放特效缩放*/
	CastEffectScale:mw.Vector
 } 
export class SkillConfig extends ConfigBase<ISkillElement>{
	constructor(){
		super(EXCELDATA);
	}

}