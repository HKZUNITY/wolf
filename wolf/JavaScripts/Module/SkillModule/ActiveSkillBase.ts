export abstract class ActiveSkillBase {
    abstract active(playerId: number, skillId: number);
    abstract unActive(playerId: number, skillId: number);
    abstract killOtherUpdate(playerId: number, skillId: number);
}