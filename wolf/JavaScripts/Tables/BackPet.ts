import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Describe","AssetId","Transform","SexType"],["","","","",""],[1,null,"454704",["-7","0","0","0","0","0","1","1","1"],0],[2,null,"454729",["-7","0","0","0","0","0","1","1","1"],0],[3,null,"454730",["-7","0","0","0","0","0","1","1","1"],0],[4,null,"454731",["-7","0","0","0","0","0","1","1","1"],0],[5,null,"454740",["-7","0","0","0","0","0","1","1","1"],0],[6,null,"458894",["-7","0","0","0","0","0","1","1","1"],0],[7,null,"458895",["-7","0","0","0","0","0","1","1","1"],0],[8,null,"458896",["-7","0","0","0","0","0","1","1","1"],0],[9,null,"458897",["-7","0","0","0","0","0","1","1","1"],0]];
export interface IBackPetElement extends IElementBase{
 	/**undefined*/
	ID:number
	/**undefined*/
	Describe:string
	/**undefined*/
	AssetId:string
	/**undefined*/
	Transform:Array<string>
	/**0-Common
1-Male
2-FeMale*/
	SexType:number
 } 
export class BackPetConfig extends ConfigBase<IBackPetElement>{
	constructor(){
		super(EXCELDATA);
	}

}