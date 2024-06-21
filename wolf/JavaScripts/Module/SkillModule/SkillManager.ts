import { ActiveSkillBase } from "./ActiveSkillBase";
import { SkillType } from "./InGameSkill";
import StealthSkill from "./StealthSkill";

export default class SkillManager {
	private static _instance: SkillManager;
	private skillMap: Map<number, ActiveSkillBase> = new Map<number, ActiveSkillBase>();
	public static get instance(): SkillManager{
		if (!this._instance) {
			this._instance = new SkillManager();
			this._instance.registerSkill();
		}	
		return this._instance;
	}
    private registerSkill(){
		this.skillMap.set(SkillType.Stealth, new StealthSkill());
	}
	public getSkillByType(skillType: SkillType): ActiveSkillBase{
		return this.skillMap.get(skillType);
	}
	
}