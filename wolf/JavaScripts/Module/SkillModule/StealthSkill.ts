import { ActiveSkillBase } from "./ActiveSkillBase";
import { SkillModuleS } from "./SkillModuleS";

export default class StealthSkill extends ActiveSkillBase {
    killOtherUpdate(playerId: number, skillId: number) {
        ModuleService.getModule(SkillModuleS).stealthKillUpdate(playerId, skillId);
    }
    active(playerId: number, skillId: number) {
        ModuleService.getModule(SkillModuleS).stealthActive(playerId, skillId);
    }
    unActive(playerId: number, skillId: number) {
        ModuleService.getModule(SkillModuleS).stealthUnActive(playerId, skillId);
    }

}