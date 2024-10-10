import { Camp, PlayerWeaponState } from "../../Globals";
import { GameModuleC } from "../../Module/GameModule/GameModuleC";
import { WatchModuleC } from "../../Module/ProcModule/WatchModule";
import { SkillModuleC } from "../../Module/SkillModule/SkillModuleC";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import GameBattle from "../../uiTemplate/Inside/GameBattle";

export default class P_Game extends GameBattle {
    private civilGoal: number = GameConfig.PropsGenerate.getElement(9997).Num;
    private static _instance: P_Game;
    private curWeaponCD: number = 0;
    private normalMaxCoin: number = 60;
    private maxCoin: number = 60;
    private lightTween: mw.Tween<{ alaf: number }>;
    private cdInterval: number;
    private timer: number
    private expInterval: number;
    public expNum: number = 0;
    private canupdate: boolean = false;
    public timeNum: number = 180;
    /**拿出刀子图片 */
    private equipKnifeImg = GameConfig.Rule.getElement(10033).Color
    /**放下刀子图片 */
    private unequipKnifeImg = GameConfig.Rule.getElement(10034).Color
    /**拿出飞刀图片 */
    private equipThrowKnifeImg = GameConfig.Rule.getElement(10035).Color
    /**放下飞刀图片 */
    private unequipThrowKnifeImg = GameConfig.Rule.getElement(10036).Color
    /**拿出枪械图片 */
    private equipGunImg = GameConfig.Rule.getElement(10031).Color
    /**放下枪械图片 */
    private unequipGunImg = GameConfig.Rule.getElement(10032).Color
    /**按压时间 */
    private pressTime = 0.8;
    /**按压计时器 */
    private pressTimer;


    public static get instance(): P_Game {
        if (this._instance == null) {
            this._instance = UIService.create(P_Game);
            this._instance.text();
        }
        return this._instance;
    }
    onStart() {
        this.canUpdate = true;
        this.mBtn_Jump_Inside.focusable = (false);
        this.mBtn_Jump_Inside.onPressed.add(() => {
            if (Player.localPlayer.character.isJumping) return;
            Player.localPlayer.character.jump();
        })
        this.mBtn_Jump_Inside.size = new mw.Vector2(200, 200);
        this.mBtn_Swith.onPressed.add(() => {
            ModuleService.getModule(GameModuleC).clickWeaponBtn();
        })
        this.mBtn_Attack.onReleased.add(() => {
            this.showShootCd()
        })
        // this.mBtn_Hack.onPressed.add(() => {
        //     ModuleService.getModule(GameModuleC).knifeAttack();
        // })
        // this.mBtn_Hack.onReleased.add(() => {
        //     this.mBtn_Hack.enable = (false);
        //     this.showCd();
        //     setTimeout(() => {
        //         this.mBtn_Hack.enable = (true);
        //         this.mText_Cd.visibility = (mw.SlateVisibility.Hidden);
        //         TimeUtil.clearInterval(this.cdInterval);
        //     }, P_Game.instance.curWeaponCD);
        // })
        this.mBtn_Close.onClicked.add(() => {
            ModuleService.getModule(WatchModuleC).net_EndWatch();
        })
        this.mBtn_WatchL.onClicked.add(() => {
            ModuleService.getModule(WatchModuleC).changeWatch(-1);
        })
        this.mBtn_WatchR.onClicked.add(() => {
            ModuleService.getModule(WatchModuleC).changeWatch(1);
        })
        this.mBtn_Throw.onClicked.add(() => {
            ModuleService.getModule(GameModuleC).clickThrowKnifeBtn()
        })
        this.mBtn_Skill.onPressed.add(() => {
            this.pressTimer = setTimeout(() => {
                this.mCanvas_Skill_Des.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }, this.pressTime * 1000);
        })
        this.mBtn_Skill.onReleased.add(() => {
            if (this.pressTimer) {
                clearTimeout(this.pressTimer);
                this.pressTimer = null;
            }
            this.mCanvas_Skill_Des.visibility = mw.SlateVisibility.Collapsed;
        })
        this.mBtn_Skill.onClicked.add(() => {
            ModuleService.getModule(SkillModuleC).activeSkill();
        })
        this.civilGoal = GameConfig.PropsGenerate.getElement(9997).Num;
        this.mCanvas_WatchName.visibility = mw.SlateVisibility.Collapsed;
        this.mBtn_Interaction.visibility = mw.SlateVisibility.Collapsed;
        this.mCanvas_EXP.visibility = mw.SlateVisibility.Collapsed;

    }

    /**
     * 自动攻击开关
     * @param bo 
     */
    autoCold(bo: boolean): void {
        ModuleService.getModule(GameModuleC).knifeAttack();
    }

    showCd() {
        let left = this.curWeaponCD / 1000;
        this.mText_Cd.text = (left.toFixed(1).toString());
        this.mText_Cd.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.cdInterval = TimeUtil.setInterval(() => {
            left -= 0.1;
            this.mText_Cd.text = (left.toFixed(1).toString());
        }, 0.1)
    }
    showShootCd() {
        this.mBtn_Attack.enable = (false);
        this.showCd();
        setTimeout(() => {
            this.mBtn_Attack.enable = (true);
            this.mText_Cd.visibility = (mw.SlateVisibility.Hidden);
            TimeUtil.clearInterval(this.cdInterval);
        }, P_Game.instance.curWeaponCD);
    }
    public static setGameTime(time: number) {
        P_Game.instance.timeNum = time
        P_Game.instance.mText_CountDown.text = (Tools.changeSecond2Minus(time));
    }
    public static setCoin(num: number) {
        P_Game.instance.mText_CionsCollect.text = ("" + num + "/" + P_Game.instance.maxCoin);
        /**如果有加成，显示特权 */
        if (num == 0) {
            P_Game.instance.mText_Coins_Member.visibility = P_Game.instance.maxCoin > P_Game.instance.normalMaxCoin ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        }
    }
    public static setTitle(id: number) {//11001,11002
        let str = GameConfig.Text.getElement(id).Content;
        P_Game.instance.mText_CountExplain.text = (str);
    }
    public static closeGameUI() {
        P_Game.instance.mCanvas_WatchName.visibility = mw.SlateVisibility.Collapsed;
        if (P_Game.instance.skillTimer) {
            TimeUtil.clearInterval(P_Game.instance.skillTimer);
            P_Game.instance.skillTimer = null;
            P_Game.instance.mImg_Skill_Mask.visibility = mw.SlateVisibility.Collapsed;
            P_Game.instance.mText_SkillCD.visibility = mw.SlateVisibility.Collapsed;
        }
        P_Game.instance.mBtn_Skill.enable = true;
        UIService.hide(this);
    }

    private skillTimer;

    public useSkill(skillId: number) {
        let dataInfo = GameConfig.Skill.getElement(skillId);
        let useTime = dataInfo.Duration;
        this.mImg_Skill_Mask.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mText_SkillCD.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mText_SkillCD.text = (useTime.toString());
        this.mBtn_Skill.enable = false;
        this.skillTimer = TimeUtil.setInterval(() => {
            useTime--;
            this.mText_SkillCD.text = (useTime.toString());
            if (useTime <= 0) {
                if (this.skillTimer) {
                    this.mImg_Skill_Mask.visibility = mw.SlateVisibility.Collapsed;
                    this.mText_SkillCD.visibility = mw.SlateVisibility.Collapsed;
                    TimeUtil.clearInterval(this.skillTimer);
                    this.skillTimer = null;
                }
            }
        }, 1)
    }

    public skillInCool(skillId) {
        if (this.skillTimer) {
            TimeUtil.clearInterval(this.skillTimer);
            this.skillTimer = null;
        }
        let dataInfo = GameConfig.Skill.getElement(skillId);
        let useTime = dataInfo.CD;
        this.mImg_Skill_Mask.visibility = mw.SlateVisibility.Collapsed;
        this.mText_SkillCD.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mText_SkillCD.text = (useTime.toString());
        this.mBtn_Skill.enable = false;
        this.skillTimer = TimeUtil.setInterval(() => {
            useTime--;
            this.mText_SkillCD.text = (useTime.toString());
            if ((useTime <= 0)) {
                this.mText_SkillCD.visibility = mw.SlateVisibility.Collapsed;
                if (this.skillTimer) {
                    TimeUtil.clearInterval(this.skillTimer);
                    this.mBtn_Skill.enable = true;
                    this.skillTimer = null;
                }
            }
        }, 1)
    }

    public updateInGameSkill(camp: number, skillId: number) {
        if (camp != Camp.Spy) {
            this.mCanvas_Skill.visibility = mw.SlateVisibility.Collapsed;
            return;
        }
        if (skillId && skillId > -1) {
            this.mCanvas_Skill.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            let dataInfo = GameConfig.SkillShop.getElement(skillId);
            this.mText_Dkill_Name.text = dataInfo.Name;
            this.mText_Skill_Des.text = dataInfo.Description;
            this.mBtn_Skill.normalImageGuid = dataInfo.IconGUID.toString();
            let skillInfo = GameConfig.Skill.getElement(dataInfo.SkillID);
            if (!skillInfo.Buff || skillInfo.Buff.length == 0) {
                this.mImg_Skill_Mask.visibility = mw.SlateVisibility.Collapsed;
            }
            this.mBtn_Skill.enable = true;
            this.mCanvas_Skill_Des.visibility = mw.SlateVisibility.Collapsed;
        }
        else {
            this.mCanvas_Skill.visibility = mw.SlateVisibility.Collapsed;
        }
        this.mText_SkillCD.visibility = mw.SlateVisibility.Collapsed;
    }

    public updateSkillIsActive(isActive: boolean) {
        if (isActive) {
            this.mImg_Skill_Mask.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        else {
            this.mImg_Skill_Mask.visibility = mw.SlateVisibility.Collapsed;
        }

    }

    public static showGameUI() {
        UIService.show(this);
    }
    public static enableBtn() {
        P_Game.instance.canupdate = true;
        P_Game.instance.mBtn_Attack.enable = (true);
        // P_Game.instance.mBtn_Hack.enable = (true);
        P_Game.instance.mBtn_Swith.enable = (true);
        P_Game.instance.mBtn_Throw.enable = true
    }
    public static disableBtn() {
        P_Game.instance.canupdate = false;
        P_Game.instance.mBtn_Attack.enable = (false);
        // P_Game.instance.mBtn_Hack.enable = (false);
        P_Game.instance.mBtn_Swith.enable = (false);
        P_Game.instance.mBtn_Throw.enable = false
    }

    /**是否显示倒计时 */
    public static iSountDownUI(bool: boolean) {
        P_Game.instance.mCanvas_CountDown.visibility = (bool ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed)
    }

    public static showCivilianUI(cd: number, maxCoin: number) {
        P_Game.instance.maxCoin = maxCoin;
        // P_Game.setGameTime(Globals.gameReadyTime);
        P_Game.instance.initCivilian();
        P_Game.setTitle(11001);
        P_Game.instance.curWeaponCD = cd * 1000;
        P_Game.setCoin(0);
        P_Game.instance.EXPUI(true);
        UIService.show(this);

    }
    public static showPoliceUI(cd: number, maxCoin: number) {
        P_Game.instance.maxCoin = maxCoin;
        // P_Game.setGameTime(Globals.gameReadyTime);
        P_Game.instance.initPolice();
        P_Game.setTitle(11001);
        P_Game.instance.curWeaponCD = cd * 1000;
        P_Game.setCoin(0);
        P_Game.instance.EXPUI(false);
        UIService.show(this);

    }
    public static showSpyUI(num: number, cd: number, maxCoin: number) {
        P_Game.instance.maxCoin = maxCoin;
        // P_Game.setGameTime(Globals.gameReadyTime);
        P_Game.instance.initSpy(num);
        P_Game.setTitle(11001);
        P_Game.instance.curWeaponCD = cd * 1000;
        P_Game.setCoin(0);
        P_Game.instance.EXPUI(false);
        UIService.show(this);

    }
    public static showHeroUI(cd: number) {
        P_Game.instance.initHero();
        P_Game.instance.curWeaponCD = cd * 1000;
        P_Game.instance.EXPUI(false);
        UIService.show(this);
    }

    /**经验条/能量球显示 */
    public EXPUI(bool: boolean) {
        let num: number = 0.1;//计时速度
        let addNum: number = 0;
        P_Game.instance.mProgressBar_EXP.percent = 0;
        P_Game.instance.mCanvas_PowerBall.visibility = (bool ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed);
        P_Game.instance.mCanvas_EXP.visibility = (bool ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed);
        let value = num / GameConfig.Rule.getElement(10002).Time;
        let speed = GameConfig.Rule.getElement(10028).Num;
        let str = GameConfig.Text.getElement(11016).Content;
        this.stopAddEXP();
        if (bool) {
            this.expNum = 0;//当前经验值
            P_Game.instance.mText_EXP.text = (mw.StringUtil.format(str, this.expNum));
            this.expInterval = TimeUtil.setInterval(() => {
                if (P_Game.instance.canupdate) {
                    addNum += num
                    if (addNum >= 1) {
                        addNum = 0;
                        this.expNum += speed;
                        P_Game.instance.mText_EXP.text = (mw.StringUtil.format(str, this.expNum));
                    }
                    P_Game.instance.mProgressBar_EXP.percent += value;
                }
            }, num);
        }
    }

    stopAddEXP() {
        if (this.expInterval) {
            TimeUtil.clearInterval(this.expInterval);
            this.expInterval = null;
            return true;
        }
        return false;

    }

    public static showWatch(camp: Camp, showNum: number, total: number, name: string) {
        switch (camp) {
            case Camp.Civilian:
                P_Game.instance.initCivilian();
                P_Game.updatePropNum(showNum);
                break;
            case Camp.Hero:
                P_Game.instance.initHero();
                break;
            case Camp.Police:
                P_Game.instance.initPolice();
                break;
            case Camp.Spy:
                P_Game.instance.initSpy(total);
                P_Game.updateKillNum(showNum, total);
                break
        }
        P_Game.instance.mText_Target.text = "";
        // P_Game.instance.setCampTarget(camp);
        P_Game.instance.initWatch(name);
        UIService.show(this);

    }
    private initWatch(name: string) {
        this.mText_CountExplain.text = (GameConfig.Text.getElement(20004).Content);
        this.mCanvas_Attack.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump_Inside.visibility = (mw.SlateVisibility.Collapsed);
        this.mImg_Jump_Inside_BG.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Skill.visibility = mw.SlateVisibility.Collapsed;
        this.mText_IdentityExplain.text = (GameConfig.Text.getElement(20005).Content);
        this.mCanvas_Coins.visibility = (mw.SlateVisibility.Collapsed);
        this.mImage_Center.visibility = (mw.SlateVisibility.Collapsed);
        //================================================================
        this.mCanvas_PowerBall.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_EXP.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Identity.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_WatchName.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mText_WatchName.text = name
        this.mBtn_Throw.visibility = (mw.SlateVisibility.Collapsed)
    }
    private initPolice() {
        let info = GameConfig.Identity.getElement(10001);
        this.mCanvas_Identity.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Attack.visibility = (mw.SlateVisibility.Visible);
        this.mText_IdentityName.text = (info.IdentityName);
        this.mCanvas_Goal_2.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Goal_1.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mImg_IdentityIcon.imageGuid = (info.IconGUID.toString());
        let aimstr1 = GameConfig.Text.getElement(info.Goal[0]).Content;
        this.mText_GoalExplain_000.text = (mw.StringUtil.format(aimstr1, 0, 1));
        this.mBtn_Attack.visibility = (mw.SlateVisibility.Visible);
        // this.mBtn_Hack.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump_Inside.visibility = (mw.SlateVisibility.Visible);
        this.mImg_Jump_Inside_BG.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mText_IdentityExplain.text = (GameConfig.Text.getElement(11003).Content);
        this.mCanvas_Coins.visibility = (mw.SlateVisibility.Visible);
        this.mImage_Center.visibility = (mw.SlateVisibility.Visible);
        this.mText_Cd.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Throw.visibility = (mw.SlateVisibility.Collapsed)
        this.mBtn_Swith.visibility = (mw.SlateVisibility.Visible)
        this.changeHotWeaponState(PlayerWeaponState.UnEquip)

    }
    private initSpy(num: number) {
        let info = GameConfig.Identity.getElement(10002);
        this.mCanvas_Identity.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Attack.visibility = (mw.SlateVisibility.Visible);
        this.mText_IdentityName.text = (info.IdentityName);
        this.mCanvas_Goal_2.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Goal_1.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mImg_IdentityIcon.imageGuid = (info.IconGUID.toString());
        let aimstr1 = GameConfig.Text.getElement(info.Goal[0]).Content;
        this.mText_GoalExplain_000.text = (mw.StringUtil.format(aimstr1, 0, num));
        this.mBtn_Attack.visibility = (mw.SlateVisibility.Collapsed);
        // this.mBtn_Hack.visibility = (mw.SlateVisibility.Visible);
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump_Inside.visibility = (mw.SlateVisibility.Visible);
        this.mImg_Jump_Inside_BG.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mText_IdentityExplain.text = (GameConfig.Text.getElement(11003).Content);
        this.mCanvas_Coins.visibility = (mw.SlateVisibility.Visible);
        this.mImage_Center.visibility = (mw.SlateVisibility.Visible);
        this.mText_Cd.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Throw.visibility = (mw.SlateVisibility.Visible)
        this.mBtn_Swith.visibility = (mw.SlateVisibility.Visible)
        this.changeColdWeaponState(PlayerWeaponState.UnEquip)
    }

    public static updateLiveNum(num: number, allNum: number, bool: boolean) {
        P_Game.instance.mImg_Pistol_Mask.visibility = bool ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        P_Game.instance.mText_Pistol.text = bool ? GameConfig.Text.getElement(11015).Content : GameConfig.Text.getElement(11014).Content;
        P_Game.instance.mText_Num.text = num + '/' + allNum;
        let color: number;
        num == allNum ? color = 10026 : color = 10027;
        P_Game.instance.mText_Num.setFontColorByHex(GameConfig.Rule.getElement(color).Color);
    }

    public static updateKillNum(num: number, total: number) {
        let info = GameConfig.Identity.getElement(10002);
        let aimstr1 = GameConfig.Text.getElement(info.Goal[0]).Content;
        P_Game.instance.mText_GoalExplain_000.text = (mw.StringUtil.format(aimstr1, num, total));
    }
    public static updatePropNum(num: number) {
        let info = GameConfig.Identity.getElement(10003);
        // let aimstr2 = GameConfig.Text.getElement(info.Goal[1]).Content;
        P_Game.instance.mText_PowerBall.text = num + '/' + P_Game.instance.civilGoal;// (mw.StringUtil.format(aimstr2, num, P_Game.instance.civilGoal));
    }
    private initCivilian() {
        let info = GameConfig.Identity.getElement(10003);
        this.mCanvas_Identity.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Attack.visibility = (mw.SlateVisibility.Collapsed);
        this.mText_IdentityName.text = (info.IdentityName);
        this.mCanvas_Goal_2.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mCanvas_Goal_1.visibility = (mw.SlateVisibility.Collapsed);
        let aimstr1 = GameConfig.Text.getElement(info.Goal[0]).Content;
        this.mText_GoalExplain_001.text = (aimstr1);
        this.mImg_IdentityIcon.imageGuid = (info.IconGUID.toString());
        // let aimstr2 = GameConfig.Text.getElement(info.Goal[1]).Content;
        this.mText_PowerBall.text = (0 + '/' + this.civilGoal);
        this.mBtn_Swith.visibility = (mw.SlateVisibility.Collapsed)
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump_Inside.visibility = (mw.SlateVisibility.Visible);
        this.mImg_Jump_Inside_BG.visibility = (mw.SlateVisibility.SelfHitTestInvisible);

        this.mText_IdentityExplain.text = (GameConfig.Text.getElement(11003).Content);
        this.mCanvas_Coins.visibility = (mw.SlateVisibility.Visible);
        this.mImage_Center.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Throw.visibility = (mw.SlateVisibility.Collapsed)
    }
    private initHero() {
        let info = GameConfig.Identity.getElement(10004);
        this.mCanvas_Identity.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Attack.visibility = (mw.SlateVisibility.Visible);
        this.mText_IdentityName.text = (info.IdentityName);
        this.mCanvas_Goal_2.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Goal_1.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mImg_IdentityIcon.imageGuid = (info.IconGUID.toString());
        let aimstr1 = GameConfig.Text.getElement(info.Goal[0]).Content;
        this.mText_GoalExplain_000.text = (mw.StringUtil.format(aimstr1, 0, 1));
        this.mBtn_Attack.visibility = (mw.SlateVisibility.Visible);
        // this.mBtn_Hack.visibility = (mw.SlateVisibility.Collapsed);
        this.mCanvas_Watch.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Jump_Inside.visibility = (mw.SlateVisibility.Visible);
        this.mImg_Jump_Inside_BG.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.mBtn_Swith.visibility = (mw.SlateVisibility.Visible)
        this.mText_IdentityExplain.text = (GameConfig.Text.getElement(11003).Content);
        this.mCanvas_Coins.visibility = (mw.SlateVisibility.Visible);
        this.mImage_Center.visibility = (mw.SlateVisibility.Visible);
        this.mText_Cd.visibility = (mw.SlateVisibility.Collapsed);
        this.mBtn_Throw.visibility = (mw.SlateVisibility.Collapsed)
        this.changeHotWeaponState(PlayerWeaponState.UnEquip)
    }
    private text() {
        this.mText_IdentityExplain.text = (GameConfig.Text.getElement(11006).Content);
        this.mText_GoalTitle.text = (GameConfig.Text.getElement(20006).Content);
    }
    public static hideAllFirstUI() {
        P_Game.instance.mBtn_Click.visibility = (mw.SlateVisibility.Collapsed);
    }
    /**正在进行装备武器动作暂时禁用按钮点击 */
    isEnableChangeWeaponBtn(isTrue: boolean) {
        this.mBtn_Throw.enable = isTrue
        this.mBtn_Swith.enable = isTrue
    }
    /**切换冷兵器相关按钮图片 */
    changeColdWeaponState(state: PlayerWeaponState) {
        if (state == PlayerWeaponState.UnEquip) {
            this.mBtn_Throw.normalImageGuid = this.equipThrowKnifeImg
            this.mBtn_Swith.normalImageGuid = this.equipKnifeImg
        }
        else if (state == PlayerWeaponState.Knife) {
            this.mBtn_Throw.normalImageGuid = this.equipThrowKnifeImg
            this.mBtn_Swith.normalImageGuid = this.unequipKnifeImg

        }
        else if (state == PlayerWeaponState.ThrowKnife) {
            this.mBtn_Throw.normalImageGuid = this.unequipThrowKnifeImg
            this.mBtn_Swith.normalImageGuid = this.equipKnifeImg
        }
    }
    /**切换热武器相关按钮图片 */
    changeHotWeaponState(state: PlayerWeaponState) {
        if (state == PlayerWeaponState.Gun) {
            this.mBtn_Swith.normalImageGuid = this.unequipGunImg
        }
        else if (state == PlayerWeaponState.UnEquip) {
            this.mBtn_Swith.normalImageGuid = this.equipGunImg
        }
    }
    /**进入交互物隐藏右侧ui */
    hideRightPartUI() {
        this.mBtn_Jump_Inside.visibility = mw.SlateVisibility.Collapsed
        this.mImg_Jump_Inside_BG.visibility = mw.SlateVisibility.Collapsed
        this.mBtn_Throw.visibility = mw.SlateVisibility.Collapsed
        this.mBtn_Swith.visibility = mw.SlateVisibility.Collapsed
    }
    /**离开交互物显示右侧ui */
    showRightPartUI() {
        this.mBtn_Jump_Inside.visibility = mw.SlateVisibility.Visible
        this.mImg_Jump_Inside_BG.visibility = mw.SlateVisibility.SelfHitTestInvisible
        let camp = ModuleService.getModule(GameModuleC).getPlayerCamp()
        if (camp != Camp.Civilian) {
            this.mBtn_Swith.visibility = mw.SlateVisibility.Visible
        }
        if (camp == Camp.Spy) {
            this.mBtn_Throw.visibility = mw.SlateVisibility.Visible
        }
    }
    /**更新当局目标 */
    setCampTarget(camp: Camp) {
        if (camp == Camp.Civilian) {
            this.mText_Target.text = GameConfig.Text.getElement("11020").Content
        }
        else if (camp == Camp.Hero) {
            this.mText_Target.text = GameConfig.Text.getElement("11019").Content
        }
        else if (camp == Camp.Police) {
            this.mText_Target.text = GameConfig.Text.getElement("11018").Content
        }
        else if (camp == Camp.Spy) {
            this.mText_Target.text = GameConfig.Text.getElement("11017").Content
        }
    }
    lightBling(uiEle: mw.Image) {
        if (this.lightTween != null) {
            this.lightTween.stop();
            this.lightTween = null;
        }
        let blingTime = 400;
        let color: mw.LinearColor = uiEle.imageColor;
        uiEle.imageColor = (new mw.LinearColor(color.r, color.g, color.b, 1));
        this.lightTween = new mw.Tween({ alaf: 1 }).to({ alaf: 0.1 }, blingTime)
            .onUpdate((v) => {
                uiEle.imageColor = (new mw.LinearColor(color.r, color.g, color.b, v.alaf));
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }
    bigAndSmall(big: mw.Image, small: mw.Image) {
        if (this.lightTween != null) {
            this.lightTween.stop();
        }
        let changtime = 800;
        big.visibility = (mw.SlateVisibility.Visible);
        small.visibility = (mw.SlateVisibility.Hidden);
        this.lightTween = new mw.Tween({ alaf: 1 }).to({ alaf: 0 }, changtime)
            .onUpdate((v) => {
                if (v.alaf <= 0.1) {
                    big.visibility = (mw.SlateVisibility.Hidden);
                    small.visibility = (mw.SlateVisibility.Visible);
                } else if (v.alaf >= 0.9) {
                    big.visibility = (mw.SlateVisibility.Visible);
                    small.visibility = (mw.SlateVisibility.Hidden);
                }
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }
}