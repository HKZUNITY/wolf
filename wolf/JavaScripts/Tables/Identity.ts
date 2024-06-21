import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Remark","IdentityName","AttackType","IconGUID","Goal"],["","","Language","","",""],[10001,"侦探","Identity_IdentityName_10001",1,48004,[11010]],[10002,"凶手","Identity_IdentityName_10002",2,48003,[11009]],[10003,"学生","Identity_IdentityName_10003",0,48007,[11011,11012]],[10004,"英雄","Identity_IdentityName_10004",1,50177,[11010]]];
export interface IIdentityElement extends IElementBase{
 	/**序号*/
	ID:number
	/**标注*/
	Remark:string
	/**身份名称*/
	IdentityName:string
	/**使用武器类型
0：无法使用武器
1：远程武器
2：近战武器*/
	AttackType:number
	/**身份图标GUID*/
	IconGUID:number
	/**身份目标
*引用文本表*/
	Goal:Array<number>
 } 
export class IdentityConfig extends ConfigBase<IIdentityElement>{
	constructor(){
		super(EXCELDATA);
	}

}