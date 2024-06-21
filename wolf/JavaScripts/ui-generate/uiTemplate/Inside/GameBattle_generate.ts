
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 就要按
 * UI: UI/uiTemplate/Inside/GameBattle.ui
 * TIME: 2023.08.01-14.29.15
 */

 

 @UIBind('UI/uiTemplate/Inside/GameBattle.ui')
 export default class GameBattle_Generate extends mw.UIScript {
	 @UIWidgetBind('RootCanvas/mCanvas_Attack')
    public mCanvas_Attack: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Attack/mBtn_Throw')
    public mBtn_Throw: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Attack/mBtn_Swith')
    public mBtn_Swith: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Attack/mBtn_FlySwith')
    public mBtn_FlySwith: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Attack/mBtn_Attack')
    public mBtn_Attack: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Attack/mBtn_Hack')
    public mBtn_Hack: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Attack/mText_Cd')
    public mText_Cd: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mImg_Jump_Inside_BG')
    public mImg_Jump_Inside_BG: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Jump_Inside')
    public mBtn_Jump_Inside: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Interaction')
    public mBtn_Interaction: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PowerBall')
    public mCanvas_PowerBall: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PowerBall/mText_PowerBall')
    public mText_PowerBall: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_EXP')
    public mCanvas_EXP: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_EXP/mProgressBar_EXP')
    public mProgressBar_EXP: mw.ProgressBar=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_EXP/mText_EXP')
    public mText_EXP: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown')
    public mCanvas_CountDown: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown/mText_CountExplain')
    public mText_CountExplain: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown/mText_CountDown')
    public mText_CountDown: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_CountDown/mText_Target')
    public mText_Target: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerNum')
    public mCanvas_PlayerNum: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerNum/mCanvas_Num')
    public mCanvas_Num: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerNum/mCanvas_Num/mText_Num')
    public mText_Num: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerNum/mCanvas_Pistol')
    public mCanvas_Pistol: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerNum/mCanvas_Pistol/mImg_Pistol_Mask')
    public mImg_Pistol_Mask: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_PlayerNum/mCanvas_Pistol/mText_Pistol')
    public mText_Pistol: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity')
    public mCanvas_Identity: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mText_IdentityExplain')
    public mText_IdentityExplain: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mText_IdentityName')
    public mText_IdentityName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mImg_IdentityIcon')
    public mImg_IdentityIcon: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mText_GoalTitle')
    public mText_GoalTitle: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mCanvas_Goal_1')
    public mCanvas_Goal_1: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mCanvas_Goal_1/mText_GoalExplain_000')
    public mText_GoalExplain_000: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mCanvas_Goal_2')
    public mCanvas_Goal_2: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mCanvas_Goal_2/mText_GoalExplain_001')
    public mText_GoalExplain_001: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Identity/mCanvas_Goal_2/mText_GoalExplain_002')
    public mText_GoalExplain_002: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Coins')
    public mCanvas_Coins: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Coins/mText_CionsCollect')
    public mText_CionsCollect: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Coins/mText_Coins_Member')
    public mText_Coins_Member: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch')
    public mCanvas_Watch: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch/mBtn_WatchL')
    public mBtn_WatchL: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch/mBtn_WatchR')
    public mBtn_WatchR: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch/mBtn_Close')
    public mBtn_Close: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch/mCanvas_WatchName')
    public mCanvas_WatchName: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Watch/mCanvas_WatchName/mText_WatchName')
    public mText_WatchName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill')
    public mCanvas_Skill: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mBtn_Skill')
    public mBtn_Skill: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mText_Dkill_Name')
    public mText_Dkill_Name: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mImg_Skill_Mask')
    public mImg_Skill_Mask: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mCanvas_Skill_Des')
    public mCanvas_Skill_Des: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mCanvas_Skill_Des/mText_Skill_Des')
    public mText_Skill_Des: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mCanvas_Skill/mText_SkillCD')
    public mText_SkillCD: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mImage_Center')
    public mImage_Center: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/mBtn_Click')
    public mBtn_Click: mw.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_Throw.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Throw");
		})
		this.initLanguage(this.mBtn_Throw);
		this.mBtn_Throw.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Swith.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Swith");
		})
		this.initLanguage(this.mBtn_Swith);
		this.mBtn_Swith.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_FlySwith.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_FlySwith");
		})
		this.initLanguage(this.mBtn_FlySwith);
		this.mBtn_FlySwith.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Attack.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Attack");
		})
		this.initLanguage(this.mBtn_Attack);
		this.mBtn_Attack.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Hack.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Hack");
		})
		this.initLanguage(this.mBtn_Hack);
		this.mBtn_Hack.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Jump_Inside.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Jump_Inside");
		})
		this.initLanguage(this.mBtn_Jump_Inside);
		this.mBtn_Jump_Inside.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Interaction.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Interaction");
		})
		this.initLanguage(this.mBtn_Interaction);
		this.mBtn_Interaction.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_WatchL.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_WatchL");
		})
		this.initLanguage(this.mBtn_WatchL);
		this.mBtn_WatchL.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_WatchR.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_WatchR");
		})
		this.initLanguage(this.mBtn_WatchR);
		this.mBtn_WatchR.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.initLanguage(this.mBtn_Close);
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Click.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Click");
		})
		this.initLanguage(this.mBtn_Click);
		this.mBtn_Click.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Skill.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Skill");
		})
		this.mBtn_Skill.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Cd)
		
	
		this.initLanguage(this.mText_PowerBall)
		
	
		this.initLanguage(this.mText_EXP)
		
	
		this.initLanguage(this.mText_CountExplain)
		
	
		this.initLanguage(this.mText_CountDown)
		
	
		this.initLanguage(this.mText_Target)
		
	
		this.initLanguage(this.mText_Num)
		
	
		this.initLanguage(this.mText_Pistol)
		
	
		this.initLanguage(this.mText_IdentityExplain)
		
	
		this.initLanguage(this.mText_IdentityName)
		
	
		this.initLanguage(this.mText_GoalTitle)
		
	
		this.initLanguage(this.mText_GoalExplain_000)
		
	
		this.initLanguage(this.mText_GoalExplain_001)
		
	
		this.initLanguage(this.mText_GoalExplain_002)
		
	
		this.initLanguage(this.mText_CionsCollect)
		
	
		this.initLanguage(this.mText_Coins_Member)
		
	
		this.initLanguage(this.mText_WatchName)
		
	
		this.initLanguage(this.mText_Dkill_Name)
		
	
		this.initLanguage(this.mText_Skill_Des)
		
	
		this.initLanguage(this.mText_SkillCD)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 