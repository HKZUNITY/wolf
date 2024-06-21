import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["TipID","Affiliation","Remark","Content","Comment"],["","","","Language",""],[10001,"攻击","请先拿出武器！","Tips_Content_10001",null],[10002,"拾取武器","变成了英雄！可以拿出武器攻击了！","Tips_Content_10002",null],[10003,"学生道具","收集能量球数量+1~","Tips_Content_10003",null],[10004,"学生道具","本局获得能量球数量已满！","Tips_Content_10004",null],[10005,"保护壳","获得了能量保护壳！可以抵挡一次攻击！","Tips_Content_10005",null],[10006,"保护壳","能量保护壳被击碎了！小心！","Tips_Content_10006",null],[10007,"保护壳","保护壳的能量被吸收了...","Tips_Content_10007",null],[10008,"局内金币","金币袋已满！","Tips_Content_10008",null],[10009,"局内其他人死亡","有人死掉了！","Tips_Content_10009",null],[10010,"局内侦探死亡","侦探死亡了，找找他的武器吧！","Tips_Content_10010",null],[10011,"能力商店","购买成功","Tips_Content_10011",null],[10012,"能力商店","货币不足，再攒攒吧~","Tips_Content_10012",null],[10013,"场景加载提示","有玩家进入场景失败，对局将重新开始","Tips_Content_10013",null],[20001,"大厅观战","当前没有正在进行的对局！","Tips_Content_20001",null],[20002,"商店","货币不足","Tips_Content_20002",null],[20003,"大厅广告","时间还没到，再等一下才能获得哦~","Tips_Content_20003",null],[20004,"大厅广告","今天已经得到很多奖励了，明天再来吧~","Tips_Content_20004",null],[20005,"密码表飘字","密码输入正确","Tips_Content_20005",null],[20006,"密码表飘字","密码输入错误！","Tips_Content_20006",null],[20007,"抽奖主动提示","免费抽取武器皮肤，点击前往！","Tips_Content_20007",null],[20008,"抽奖广告冷却","广告冷却中","Tips_Content_20008",null],[20009,"死亡提示","凶手淘汰了你","Tips_Content_20009",null],[20010,"死亡提示","目标错误，你被淘汰了","Tips_Content_20010",null],[20011,"死亡提示","已被正义的警探消灭","Tips_Content_20011",null],[20012,"兑换","兑换成功","Tips_Content_20012",null],[20013,"兑换","兑换失败","Tips_Content_20013",null],[20014,"大会员","恭喜激活会员特权","Tips_Content_20014",null],[20015,"大会员","恭喜激活超级特权","Tips_Content_20015",null],[20016,"大会员","会员特权已到期失效","Tips_Content_20016",null],[20017,"大会员","超级特权已到期失效","Tips_Content_20017",null],[20018,"购买","持有数量已经达到上限","Tips_Content_20018",null],[20019,"广告券","恭喜获得广告券*1","Tips_Content_20019",null],[20020,"大会员","金钥匙数量不足","Tips_Content_20020",null],[20021,"大会员","这个版本不支持开通大会员","Tips_Content_20021",null]];
export interface ITipsElement extends IElementBase{
 	/**提示序号*/
	TipID:number
	/**所属功能*/
	Affiliation:string
	/**标注*/
	Remark:string
	/**内容*/
	Content:string
	/**备注*/
	Comment:string
 } 
export class TipsConfig extends ConfigBase<ITipsElement>{
	constructor(){
		super(EXCELDATA);
	}

}