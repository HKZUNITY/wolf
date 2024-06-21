import { GameConfig } from "../../Tables/GameConfig";

export class SkillData extends Subdata {
    public readonly onHaveSkillChange: Action1<number> = new Action1<number>();
    public readonly onEquipSkillChange: Action1<number> = new Action1<number>();
    public readonly onUnequipSkillChange: Action1<number> = new Action1<number>();
    public readonly onSkillTimeReduce: Action1<number> = new Action1<number>();
    //当前拥有的技能列表
    @Decorator.persistence()
    private haveSkill: Array<number>;
    //当前装备的技能
    @Decorator.persistence()
    private nowEquipSkill: number;
    //带次数的技能
    @Decorator.persistence()
    private timeSkillArr: Array<TimeSkill> = new Array<TimeSkill>();
    /**数据要更新一下，出现带有使用次数的技能了 */
    protected override initDefaultData(): void {
        if (this.haveSkill) {
            console.error("已经又线上数据了返回", this.haveSkill.length);
            return;
        }

        
        this.haveSkill = new Array<number>();
        this.timeSkillArr = new Array<TimeSkill>();
        this.haveSkill.push(10001);
        this.nowEquipSkill = 10001;
    }

    public getHaveSkillArr(){
        return this.haveSkill;
    }
    
    public buySkill(skillId: number, time: number){
        this.addTimeSkill(skillId, time);
        if (!this.haveSkill.includes(skillId)) {
            this.haveSkill.push(skillId);
        }
        this.save(true);
        this.onHaveSkillChange.call(skillId);
    }
    /**只能给gm调用 */
    private addTimeSkill(skillId: number, time: number){
        let dataInfo = GameConfig.SkillShop.getElement(skillId);
        if (dataInfo.Max > 0){
            let index = this.timeSkillArr.findIndex((value)=>{
                return value.skillId == skillId;
            })
            if (index >= 0) {
                this.timeSkillArr[index].time = this.timeSkillArr[index].time + time;
                this.timeSkillArr[index].time = Math.min(this.timeSkillArr[index].time, dataInfo.Max);
            }
            else{
                let timeSkill = new TimeSkill(skillId, dataInfo.Max);
                this.timeSkillArr.push(timeSkill);
            }
        }
    }

    public decTimeSkill(skillId: number){
        let index = this.timeSkillArr.findIndex((value)=>{
            return value.skillId == skillId;
        })
        if (index < 0) {
            console.error("没有找到对应的技能id", skillId);
            return;
        }
        this.timeSkillArr[index].time = this.timeSkillArr[index].time - 1;
        let remain = this.timeSkillArr[index].time;
        
        if (remain <= 0) {
            this.timeSkillArr = this.timeSkillArr.splice(index, 1);
            this.haveSkill = this.haveSkill.filter((value)=>{
                return value != skillId;
            });
            if (this.nowEquipSkill == skillId) {
                this.nowEquipSkill = -1;
            }
        }
        this.save(true);
        this.onSkillTimeReduce.call(skillId);
    }

    public equipSkill(skillId: number){
        this.nowEquipSkill = skillId;
        this.save(true);
        this.onEquipSkillChange.call(skillId);
    }

    public unequipSkill(skillId: number){
        this.nowEquipSkill = -1;
        this.save(true);
        this.onUnequipSkillChange.call(skillId);
    }

    public getEquipSkill(){
        return this.nowEquipSkill;
    }

    public getTimeSkill(){
        return this.timeSkillArr;
    }
    
    public getSkillRemainTime(skillId: number){
        let index = this.timeSkillArr.findIndex((value)=>{
            return value.skillId == skillId;
        })
        if (index < 0) {
            return 0;
        }
        return this.timeSkillArr[index].time;
    }
}

export class TimeSkill{
    skillId: number;
    time: number;
    maxTime: number;
    constructor(skillId: number, maxTime: number){
        this.skillId = skillId;
        this.time = 1;
        this.maxTime = maxTime;
    }
}