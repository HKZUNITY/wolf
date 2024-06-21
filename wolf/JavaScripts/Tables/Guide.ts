import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["GuideID","GuideCondition","GuideModule","GuideType","ControlName","Remark","GuideContent","GuideTime","Comment"],["","","","","","","Language","",""],[10001,"身份名称（学生）","身份",0,"mText_Dark_Identity_Name_Explaine","这里是本局中你的身份","Guide_GuideContent_10001",2,null],[10002,"身份目标（学生）","身份",0,"mText_Dark_Identity_Goal_Civilian_Explaine","这里是你本局的目标，不知道做什么的话就看一下这里吧","Guide_GuideContent_10002",3,null],[10003,"身份目标1（学生）","身份",0,"mText_Dark_Identity_Alive_Civilian_Explaine","努力活下来才能够获得胜利~","Guide_GuideContent_10003",4,null],[10004,"身份目标2-1（学生）","身份",0,"mText_Dark_Identity_Prop_Civilian_Explaine_001","这是能量球：","Guide_GuideContent_10004",4,null],[10005,"身份目标2-2（学生）","身份",0,"mText_Dark_Identity_Prop_Civilian_Explaine_002","集齐能量球，可以获得一层保护壳","Guide_GuideContent_10005",4,null],[10006,"身份目标（凶手）","身份",0,"mText_Dark_Identity_Goal_Other_Explaine","这里是你本局的目标，在对局结束前完成目标才能获得胜利","Guide_GuideContent_10006",4,null],[10007,"身份目标（侦探）","身份",0,"mText_Dark_Identity_Goal_Other_Explaine","这里是你本局的目标，在对局结束前完成目标才能获得胜利","Guide_GuideContent_10007",4,null],[10008,"身份目标（英雄）","身份",0,"mText_Dark_Identity_Goal_Other_Explaine","你有了新的目标，击杀凶手，保护学生","Guide_GuideContent_10008",4,null],[10009,"身份名称（侦探）","身份",0,"mText_Dark_Identity_Name_Explaine","这里是本局中你的身份","Guide_GuideContent_10009",2,null],[10010,"身份名称（凶手）","身份",0,"mText_Dark_Identity_Name_Explaine","这里是本局中你的身份","Guide_GuideContent_10010",2,null],[10011,"身份名称（英雄）","身份",0,"mText_Dark_Identity_Name_Explaine","恭喜你拾取到武器，现在你成为了一名英雄","Guide_GuideContent_10011",3,null],[20001,"第一次吃到金币","金币",0,"mText_Dark_Coins_Get_Explaine","本局游戏内获得的金币将存储在这里，结算时会发放给你；不过金币袋是有上限的，袋子装满就无法获得了","Guide_GuideContent_20001",3,null],[20002,"金币袋满了","金币",0,"mText_Dark_Coins_Full_Explaine","金币袋已经满了，本局无法再拾取金币了","Guide_GuideContent_20002",3,null],[30001,"切换引导（凶手）","攻击",1,"mText_Dark_Attack_Switch_Explaine","点击这里可以切换姿态，选择亮出武器或藏起武器","Guide_GuideContent_30001",999,null],[30002,"攻击引导（凶手）","攻击",1,"mText_Dark_Attack_Attack_Explaine","在亮出武器后，可以点击这里进行攻击","Guide_GuideContent_30002",999,null],[30003,"切换引导（侦探）","攻击",1,"mText_Dark_Attack_Switch_Explaine","点击这里可以切换姿态，选择亮出武器或藏起武器","Guide_GuideContent_30003",999,null],[30004,"攻击引导（侦探）","攻击",1,"mText_Dark_Attack_Attack_Explaine","在亮出武器后，可以点击这里进行攻击","Guide_GuideContent_30004",999,null],[30005,"切换引导（英雄）","攻击",1,"mText_Dark_Attack_Switch_Explaine","点击这里可以切换姿态，选择亮出武器或藏起武器","Guide_GuideContent_30005",999,null],[30006,"攻击引导（英雄）","攻击",1,"mText_Dark_Attack_Attack_Explaine","在亮出武器后，可以点击这里进行攻击","Guide_GuideContent_30006",999,null],[40001,"保护壳(学生）","保护壳",0,"mText_Dark_Role_Protective_Explaine","恭喜你集齐了道具！现在你获得了一个保护壳！保护壳可以为你抵挡一次来自其他玩家的攻击，但是每局游戏只能获得一次","Guide_GuideContent_40001",3,null],[50001,"圈出结算界面","结算",0,"mText_Dark_Clearing_Explaine","现在你的第一局游戏已经结束，来看看结算面板吧","Guide_GuideContent_50001",2,null],[50002,"圈出结算标语","结算",0,"mText_Dark_Title_Explaine","这里说明了对局的最终结果","Guide_GuideContent_50002",2,null],[50003,"圈出结算关键信息","结算",0,"mText_Dark_Key_Explaine","这里显示了对对局产生影响最大的两方玩家和他们的胜负","Guide_GuideContent_50003",4,null],[50004,"圈出结算收益","结算",0,"mText_Dark_Earning_Explaine","这里显示了你在本轮对局获得的收益","Guide_GuideContent_50004",3,null],[60001,"侦探/凶手死亡提示（凶手/侦探）","死亡",0,"mText_Explaine","代表正义的你不可以乱开枪，攻击好人会导致自己死亡","Guide_GuideContent_60001",4,null]];
export interface IGuideElement extends IElementBase{
 	/**引导序号*/
	GuideID:number
	/**引导条件/内容*/
	GuideCondition:string
	/**所属功能*/
	GuideModule:string
	/**指引类型
0：光圈闪烁
1：引导按下*/
	GuideType:number
	/**控件名称*/
	ControlName:string
	/**标注*/
	Remark:string
	/**文本内容*/
	GuideContent:string
	/**持续时间*/
	GuideTime:number
	/**备注*/
	Comment:string
 } 
export class GuideConfig extends ConfigBase<IGuideElement>{
	constructor(){
		super(EXCELDATA);
	}

}