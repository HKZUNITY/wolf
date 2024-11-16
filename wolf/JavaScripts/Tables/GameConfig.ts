import {ConfigBase, IElementBase} from "./ConfigBase";
import {AccountStageConfig} from "./AccountStage";
import {ActionConfigConfig} from "./ActionConfig";
import {ActionPropConfig} from "./ActionProp";
import {AIDataConfig} from "./AIData";
import {AIWayPointConfig} from "./AIWayPoint";
import {AssetsConfig} from "./Assets";
import {BuffConfig} from "./Buff";
import {ChatConfig} from "./Chat";
import {CoinsGenerateConfig} from "./CoinsGenerate";
import {ColorConfig} from "./Color";
import {DoorConfig} from "./Door";
import {ExchangeConfig} from "./Exchange";
import {ExpressionConfig} from "./Expression";
import {expRuleConfig} from "./expRule";
import {GuideConfig} from "./Guide";
import {IdentityConfig} from "./Identity";
import {LanguageConfig} from "./Language";
import {LevelConfig} from "./Level";
import {LotteryConfig} from "./Lottery";
import {MemberConfig} from "./Member";
import {PropsGenerateConfig} from "./PropsGenerate";
import {RankConfig} from "./Rank";
import {RoleConfig} from "./Role";
import {RuleConfig} from "./Rule";
import {SceneItemConfig} from "./SceneItem";
import {ShopConfig} from "./Shop";
import {SkillShopConfig} from "./SkillShop";
import {SkillConfig} from "./Skill";
import {SoundConfig} from "./Sound";
import {TextConfig} from "./Text";
import {TipsConfig} from "./Tips";
import {WeaponConfig} from "./Weapon";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get AccountStage():AccountStageConfig{ return this.getConfig(AccountStageConfig) };
	public static get ActionConfig():ActionConfigConfig{ return this.getConfig(ActionConfigConfig) };
	public static get ActionProp():ActionPropConfig{ return this.getConfig(ActionPropConfig) };
	public static get AIData():AIDataConfig{ return this.getConfig(AIDataConfig) };
	public static get AIWayPoint():AIWayPointConfig{ return this.getConfig(AIWayPointConfig) };
	public static get Assets():AssetsConfig{ return this.getConfig(AssetsConfig) };
	public static get Buff():BuffConfig{ return this.getConfig(BuffConfig) };
	public static get Chat():ChatConfig{ return this.getConfig(ChatConfig) };
	public static get CoinsGenerate():CoinsGenerateConfig{ return this.getConfig(CoinsGenerateConfig) };
	public static get Color():ColorConfig{ return this.getConfig(ColorConfig) };
	public static get Door():DoorConfig{ return this.getConfig(DoorConfig) };
	public static get Exchange():ExchangeConfig{ return this.getConfig(ExchangeConfig) };
	public static get Expression():ExpressionConfig{ return this.getConfig(ExpressionConfig) };
	public static get expRule():expRuleConfig{ return this.getConfig(expRuleConfig) };
	public static get Guide():GuideConfig{ return this.getConfig(GuideConfig) };
	public static get Identity():IdentityConfig{ return this.getConfig(IdentityConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get Level():LevelConfig{ return this.getConfig(LevelConfig) };
	public static get Lottery():LotteryConfig{ return this.getConfig(LotteryConfig) };
	public static get Member():MemberConfig{ return this.getConfig(MemberConfig) };
	public static get PropsGenerate():PropsGenerateConfig{ return this.getConfig(PropsGenerateConfig) };
	public static get Rank():RankConfig{ return this.getConfig(RankConfig) };
	public static get Role():RoleConfig{ return this.getConfig(RoleConfig) };
	public static get Rule():RuleConfig{ return this.getConfig(RuleConfig) };
	public static get SceneItem():SceneItemConfig{ return this.getConfig(SceneItemConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get SkillShop():SkillShopConfig{ return this.getConfig(SkillShopConfig) };
	public static get Skill():SkillConfig{ return this.getConfig(SkillConfig) };
	public static get Sound():SoundConfig{ return this.getConfig(SoundConfig) };
	public static get Text():TextConfig{ return this.getConfig(TextConfig) };
	public static get Tips():TipsConfig{ return this.getConfig(TipsConfig) };
	public static get Weapon():WeaponConfig{ return this.getConfig(WeaponConfig) };
}