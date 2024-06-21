import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","GUID","Name","Remark","Item","Rate","Price","Times","ADTImes"],["","","Language","","","","","",""],[1,171571,"Lottery_Name_10003","未来武器箱",[10022,20003,10023,20004,10024,10025,10027,20006,20005,10026],[0.01,0.01,0.05,0.05,0.1,0.1,0.15,0.15,0.19,0.19],600,100,60],[2,171571,"Lottery_Name_10004","神话武器箱",[10028,20007,10029,20008,20009,10030,10031,20010,10032,10033],[0.01,0.01,0.05,0.05,0.1,0.1,0.15,0.15,0.19,0.19],600,100,60],[3,66231,"Lottery_Name_10001","飞镖武器箱",[10013,10012,10011,10010,10009,10008,10007,10006],[0.01,0.03,0.03,0.03,0.1,0.1,0.3,0.4],600,100,60],[4,66235,"Lottery_Name_10002","深海武器箱",[10021,10020,10019,10018,10017,10016,10015,10014],[0.01,0.03,0.03,0.03,0.1,0.1,0.3,0.4],600,100,60]];
export interface ILotteryElement extends IElementBase{
 	/**宝箱序号*/
	ID:number
	/**宝箱图标guid*/
	GUID:number
	/**宝箱名称*/
	Name:string
	/**备注（自己看，不走程序）*/
	Remark:string
	/**包含武器（对应商店物品表）*/
	Item:Array<number>
	/**对应权重（和为1）*/
	Rate:Array<number>
	/**价格（金币）*/
	Price:number
	/**保底次数*/
	Times:number
	/**广告免费刷新时间*/
	ADTImes:number
 } 
export class LotteryConfig extends ConfigBase<ILotteryElement>{
	constructor(){
		super(EXCELDATA);
	}

}