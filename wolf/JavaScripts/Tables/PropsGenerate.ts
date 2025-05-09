import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["PropID","Name","GeneratePoint","Time","Num"],["","","","",""],[9997,"道具收集目标",null,0,5,"",null,""],[9998,"道具生成数量",null,0,6,"",null,""],[9999,"道具刷新间隔",null,10,0,"","",""],[10000,"地图1湖边别墅",null,0,21,"","",""],[10001,"道具刷新点1",new mw.Vector(850,105,750),0,0],[10002,"道具刷新点2",new mw.Vector(1050,1235,725),0,0],[10003,"道具刷新点3",new mw.Vector(130,2980,730),0,0],[10004,"道具刷新点4",new mw.Vector(-80,2265,725),0,0],[10005,"道具刷新点5",new mw.Vector(-285,3890,730),0,0],[10006,"道具刷新点6",new mw.Vector(1940,5610,740),0,0],[10007,"道具刷新点7",new mw.Vector(1770,5470,725),0,0],[10008,"道具刷新点8",new mw.Vector(2005,4505,800),0,0],[10009,"道具刷新点9",new mw.Vector(-665,715,730),0,0],[10010,"道具刷新点10",new mw.Vector(960,3560,410),0,0],[10011,"道具刷新点11",new mw.Vector(1645,4065,375),0,0],[10012,"道具刷新点12",new mw.Vector(795,1315,730),0,0],[10013,"道具刷新点13",new mw.Vector(860,850,740),0,0],[10014,"道具刷新点14",new mw.Vector(1345,2380,725),0,0],[10015,"道具刷新点15",new mw.Vector(1995,2755,340),0,0],[10016,"道具刷新点16",new mw.Vector(1540,3180,290),0,0],[10017,"道具刷新点17",new mw.Vector(-855,4970,725),0,0],[10018,"道具刷新点18",new mw.Vector(150,4410,725),0,0],[10019,"道具刷新点19",new mw.Vector(-130,50,730),0,0],[10020,"道具刷新点20",new mw.Vector(1435,2755,785),0,0],[10021,"道具刷新点21",new mw.Vector(935,5065,725),0,0],[20000,"地图2XXXX",null,0,21],[20001,"道具刷新点1",new mw.Vector(-12580,11440,40),0,0],[20002,"道具刷新点2",new mw.Vector(-11560,12295,94),0,0],[20003,"道具刷新点3",new mw.Vector(-10275,14230,10),0,0],[20004,"道具刷新点4",new mw.Vector(-12523,13433,10),0,0],[20005,"道具刷新点5",new mw.Vector(-13908,13274,40),0,0],[20006,"道具刷新点6",new mw.Vector(-13643,13434,49),0,0],[20007,"道具刷新点7",new mw.Vector(-12058,12544,45),0,0],[20008,"道具刷新点8",new mw.Vector(-13223,12784,45),0,0],[20009,"道具刷新点9",new mw.Vector(-13538,12019,45),0,0],[20010,"道具刷新点10",new mw.Vector(-12028,11989,45),0,0],[20011,"道具刷新点11",new mw.Vector(-13103,11769,45),0,0],[20012,"道具刷新点12",new mw.Vector(-12446,10476,10),0,0],[20013,"道具刷新点13",new mw.Vector(-13971,10861,12),0,0],[20014,"道具刷新点14",new mw.Vector(-14666,11831,10),0,0],[20015,"道具刷新点15",new mw.Vector(-13261,11601,40),0,0],[20016,"道具刷新点16",new mw.Vector(-10656,10671,10),0,0],[20017,"道具刷新点17",new mw.Vector(-10596,12381,-25),0,0],[20018,"道具刷新点18",new mw.Vector(-11711,14881,10),0,0],[20019,"道具刷新点19",new mw.Vector(-13311,13956,45),0,0],[20020,"道具刷新点20",new mw.Vector(-13511,14706,10),0,0],[20021,"道具刷新点21",new mw.Vector(-11506,13753,190),0,0],[30000,"地图3XXXX",null,0,18],[30001,"道具刷新点1",new mw.Vector(26591,30296,368),0,0],[30002,"道具刷新点2",new mw.Vector(29229,29704,368),0,0],[30003,"道具刷新点3",new mw.Vector(30151,31049,-2),0,0],[30004,"道具刷新点4",new mw.Vector(28166,31968,-2),0,0],[30005,"道具刷新点5",new mw.Vector(27843,33329,-3),0,0],[30006,"道具刷新点6",new mw.Vector(28472,33580,40),0,0],[30007,"道具刷新点7",new mw.Vector(26835,31626,-3),0,0],[30008,"道具刷新点8",new mw.Vector(26731,28274,-90),0,0],[30009,"道具刷新点9",new mw.Vector(28117,27225,-99),0,0],[30010,"道具刷新点10",new mw.Vector(299895,28030,-5),0,0],[30011,"道具刷新点11",new mw.Vector(28010,29258,242),0,0],[30012,"道具刷新点12",new mw.Vector(28311,30730,123),0,0],[30013,"道具刷新点13",new mw.Vector(28975,31292,-5),0,0],[30014,"道具刷新点14",new mw.Vector(27069,29265,242),0,0],[30015,"道具刷新点15",new mw.Vector(29117,28511,-5),0,0],[30016,"道具刷新点16",new mw.Vector(30222,27277,-5),0,0],[30017,"道具刷新点17",new mw.Vector(302405,29223,-2),0,0],[30018,"道具刷新点18",new mw.Vector(30242,30286,368),0,0]];
export interface IPropsGenerateElement extends IElementBase{
 	/**道具序号*/
	PropID:number
	/**名称*/
	Name:string
	/**生成点坐标*/
	GeneratePoint:mw.Vector
	/**刷新时间（秒）*/
	Time:number
	/**数量*/
	Num:number
 } 
export class PropsGenerateConfig extends ConfigBase<IPropsGenerateElement>{
	constructor(){
		super(EXCELDATA);
	}

}