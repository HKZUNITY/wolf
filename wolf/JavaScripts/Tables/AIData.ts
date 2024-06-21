import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Camp","Time","Prob","RangeAngle","RangeRadius","Range","AIName","Comment"],["","","","","","","","","Language",""],[10001,"黑手党视野范围",0,0,0,120,600,null,null,null],[10002,"黑手党静止",0,3,0.2,0,0,null,null,null],[10003,"黑手党亮刀",0,10,0.2,0,0,null,null,null],[10004,"黑手党追击时间",0,20,0,0,0,null,null,null],[10005,"黑手党攻击命中率",0,0,0.6,0,0,null,null,null],[20001,"警探英雄视野范围",1,0,0,160,400,null,null,null],[20002,"警探英雄静止",1,3,0.2,0,0,null,null,null],[20003,"警探英雄亮枪",1,10,0.4,0,0,null,null,"周围有黑手党时=1"],[20004,"警探英雄追击时间",1,12,0,0,0,null,null,"也是开枪的持续时间"],[20005,"警探英雄向不明身份玩家开枪概率",1,0,0.2,0,0,null,null,"对亮刀的黑手党会百分百持续射击"],[20006,"警探开枪率",1,0,0.5,0,0,null,null,null],[20007,"警探开枪距离范围",0,0,0,0,0,[50,100],null,null],[30001,"平民视野范围",2,0,0,160,400,null,null,null],[30002,"平民静止",2,3,0.2,0,0,null,null,null],[30003,"平民跟随警探",2,8,0.6,0,0,null,null,null],[30004,"平民拾取掉落武器概率",2,0,0.1,0,0,null,null,"拾取武器概率、拾取能量球概率、进入下一随机点概率，和为1"],[30005,"平民拾取能量球概率",2,0,0.4,0,0,null,null,null],[30006,"平民进入下一个随机点概率",2,0,0.5,0,0,null,null,null],[90001,"AI名称1",0,0,0,0,0,null,"AIData_AIName_90001",null],[90002,"AI名称2",0,0,0,0,0,null,"AIData_AIName_90002",null],[90003,"AI名称3",0,0,0,0,0,null,"AIData_AIName_90003",null],[90004,"AI名称4",0,0,0,0,0,null,"AIData_AIName_90004",null],[90005,"AI名称5",0,0,0,0,0,null,"AIData_AIName_90005",null],[90006,"AI名称6",0,0,0,0,0,null,"AIData_AIName_90006",null],[90007,"AI名称7",0,0,0,0,0,null,"AIData_AIName_90007",null],[90008,"AI名称8",0,0,0,0,0,null,"AIData_AIName_90008",null],[90009,"AI名称9",0,0,0,0,0,null,"AIData_AIName_90009",null],[90010,"AI名称10",0,0,0,0,0,null,"AIData_AIName_90010",null],[90011,"AI名称11",0,0,0,0,0,null,"AIData_AIName_90011",null]];
export interface IAIDataElement extends IElementBase{
 	/**序号*/
	ID:number
	/**参数名称*/
	Name:string
	/**所属身份
0：黑手党
1：警探/英雄
2：平民*/
	Camp:number
	/**时间：秒*/
	Time:number
	/**概率
*最大值为1，即100％*/
	Prob:number
	/**范围角度*/
	RangeAngle:number
	/**范围半径*/
	RangeRadius:number
	/**范围*/
	Range:Array<number>
	/**AI名称*/
	AIName:string
	/**备注*/
	Comment:string
 } 
export class AIDataConfig extends ConfigBase<IAIDataElement>{
	constructor(){
		super(EXCELDATA);
	}

}