/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GameModule/GameBattlePanel.ui
 * TIME: 2025.04.05-16.17.27
 */
 
@UIBind('UI/module/GameModule/GameBattlePanel.ui')
export default class GameBattlePanel_Generate extends UIScript {
		private mCanvas_Attack_Internal: mw.Canvas
	public get mCanvas_Attack(): mw.Canvas {
		if(!this.mCanvas_Attack_Internal&&this.uiWidgetBase) {
			this.mCanvas_Attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Attack') as mw.Canvas
		}
		return this.mCanvas_Attack_Internal
	}
	private mBtn_Throw_Internal: mw.StaleButton
	public get mBtn_Throw(): mw.StaleButton {
		if(!this.mBtn_Throw_Internal&&this.uiWidgetBase) {
			this.mBtn_Throw_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Attack/mBtn_Throw') as mw.StaleButton
		}
		return this.mBtn_Throw_Internal
	}
	private mBtn_Swith_Internal: mw.StaleButton
	public get mBtn_Swith(): mw.StaleButton {
		if(!this.mBtn_Swith_Internal&&this.uiWidgetBase) {
			this.mBtn_Swith_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Attack/mBtn_Swith') as mw.StaleButton
		}
		return this.mBtn_Swith_Internal
	}
	private mBtn_FlySwith_Internal: mw.StaleButton
	public get mBtn_FlySwith(): mw.StaleButton {
		if(!this.mBtn_FlySwith_Internal&&this.uiWidgetBase) {
			this.mBtn_FlySwith_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Attack/mBtn_FlySwith') as mw.StaleButton
		}
		return this.mBtn_FlySwith_Internal
	}
	private mBtn_Attack_Internal: mw.StaleButton
	public get mBtn_Attack(): mw.StaleButton {
		if(!this.mBtn_Attack_Internal&&this.uiWidgetBase) {
			this.mBtn_Attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Attack/mBtn_Attack') as mw.StaleButton
		}
		return this.mBtn_Attack_Internal
	}
	private mBtn_Hack_Internal: mw.StaleButton
	public get mBtn_Hack(): mw.StaleButton {
		if(!this.mBtn_Hack_Internal&&this.uiWidgetBase) {
			this.mBtn_Hack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Attack/mBtn_Hack') as mw.StaleButton
		}
		return this.mBtn_Hack_Internal
	}
	private mText_Cd_Internal: mw.TextBlock
	public get mText_Cd(): mw.TextBlock {
		if(!this.mText_Cd_Internal&&this.uiWidgetBase) {
			this.mText_Cd_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Attack/mText_Cd') as mw.TextBlock
		}
		return this.mText_Cd_Internal
	}
	private mImg_Jump_Inside_BG_Internal: mw.Image
	public get mImg_Jump_Inside_BG(): mw.Image {
		if(!this.mImg_Jump_Inside_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Jump_Inside_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Jump_Inside_BG') as mw.Image
		}
		return this.mImg_Jump_Inside_BG_Internal
	}
	private mBtn_Jump_Inside_Internal: mw.StaleButton
	public get mBtn_Jump_Inside(): mw.StaleButton {
		if(!this.mBtn_Jump_Inside_Internal&&this.uiWidgetBase) {
			this.mBtn_Jump_Inside_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Jump_Inside') as mw.StaleButton
		}
		return this.mBtn_Jump_Inside_Internal
	}
	private mBtn_Interaction_Internal: mw.StaleButton
	public get mBtn_Interaction(): mw.StaleButton {
		if(!this.mBtn_Interaction_Internal&&this.uiWidgetBase) {
			this.mBtn_Interaction_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Interaction') as mw.StaleButton
		}
		return this.mBtn_Interaction_Internal
	}
	private mCanvas_PowerBall_Internal: mw.Canvas
	public get mCanvas_PowerBall(): mw.Canvas {
		if(!this.mCanvas_PowerBall_Internal&&this.uiWidgetBase) {
			this.mCanvas_PowerBall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PowerBall') as mw.Canvas
		}
		return this.mCanvas_PowerBall_Internal
	}
	private mText_PowerBall_Internal: mw.TextBlock
	public get mText_PowerBall(): mw.TextBlock {
		if(!this.mText_PowerBall_Internal&&this.uiWidgetBase) {
			this.mText_PowerBall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PowerBall/mText_PowerBall') as mw.TextBlock
		}
		return this.mText_PowerBall_Internal
	}
	private mCanvas_EXP_Internal: mw.Canvas
	public get mCanvas_EXP(): mw.Canvas {
		if(!this.mCanvas_EXP_Internal&&this.uiWidgetBase) {
			this.mCanvas_EXP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_EXP') as mw.Canvas
		}
		return this.mCanvas_EXP_Internal
	}
	private mProgressBar_EXP_Internal: mw.ProgressBar
	public get mProgressBar_EXP(): mw.ProgressBar {
		if(!this.mProgressBar_EXP_Internal&&this.uiWidgetBase) {
			this.mProgressBar_EXP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_EXP/mProgressBar_EXP') as mw.ProgressBar
		}
		return this.mProgressBar_EXP_Internal
	}
	private mText_EXP_Internal: mw.TextBlock
	public get mText_EXP(): mw.TextBlock {
		if(!this.mText_EXP_Internal&&this.uiWidgetBase) {
			this.mText_EXP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_EXP/mText_EXP') as mw.TextBlock
		}
		return this.mText_EXP_Internal
	}
	private mCanvas_CountDown_Internal: mw.Canvas
	public get mCanvas_CountDown(): mw.Canvas {
		if(!this.mCanvas_CountDown_Internal&&this.uiWidgetBase) {
			this.mCanvas_CountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown') as mw.Canvas
		}
		return this.mCanvas_CountDown_Internal
	}
	private mText_CountExplain_Internal: mw.TextBlock
	public get mText_CountExplain(): mw.TextBlock {
		if(!this.mText_CountExplain_Internal&&this.uiWidgetBase) {
			this.mText_CountExplain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown/mText_CountExplain') as mw.TextBlock
		}
		return this.mText_CountExplain_Internal
	}
	private mText_CountDown_Internal: mw.TextBlock
	public get mText_CountDown(): mw.TextBlock {
		if(!this.mText_CountDown_Internal&&this.uiWidgetBase) {
			this.mText_CountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown/mText_CountDown') as mw.TextBlock
		}
		return this.mText_CountDown_Internal
	}
	private mText_Target_Internal: mw.TextBlock
	public get mText_Target(): mw.TextBlock {
		if(!this.mText_Target_Internal&&this.uiWidgetBase) {
			this.mText_Target_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_CountDown/mText_Target') as mw.TextBlock
		}
		return this.mText_Target_Internal
	}
	private mCanvas_PlayerNum_Internal: mw.Canvas
	public get mCanvas_PlayerNum(): mw.Canvas {
		if(!this.mCanvas_PlayerNum_Internal&&this.uiWidgetBase) {
			this.mCanvas_PlayerNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerNum') as mw.Canvas
		}
		return this.mCanvas_PlayerNum_Internal
	}
	private mCanvas_Num_Internal: mw.Canvas
	public get mCanvas_Num(): mw.Canvas {
		if(!this.mCanvas_Num_Internal&&this.uiWidgetBase) {
			this.mCanvas_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerNum/mCanvas_Num') as mw.Canvas
		}
		return this.mCanvas_Num_Internal
	}
	private mText_Num_Internal: mw.TextBlock
	public get mText_Num(): mw.TextBlock {
		if(!this.mText_Num_Internal&&this.uiWidgetBase) {
			this.mText_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerNum/mCanvas_Num/mText_Num') as mw.TextBlock
		}
		return this.mText_Num_Internal
	}
	private mCanvas_Pistol_Internal: mw.Canvas
	public get mCanvas_Pistol(): mw.Canvas {
		if(!this.mCanvas_Pistol_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pistol_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerNum/mCanvas_Pistol') as mw.Canvas
		}
		return this.mCanvas_Pistol_Internal
	}
	private mImg_Pistol_Mask_Internal: mw.Image
	public get mImg_Pistol_Mask(): mw.Image {
		if(!this.mImg_Pistol_Mask_Internal&&this.uiWidgetBase) {
			this.mImg_Pistol_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerNum/mCanvas_Pistol/mImg_Pistol_Mask') as mw.Image
		}
		return this.mImg_Pistol_Mask_Internal
	}
	private mText_Pistol_Internal: mw.TextBlock
	public get mText_Pistol(): mw.TextBlock {
		if(!this.mText_Pistol_Internal&&this.uiWidgetBase) {
			this.mText_Pistol_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PlayerNum/mCanvas_Pistol/mText_Pistol') as mw.TextBlock
		}
		return this.mText_Pistol_Internal
	}
	private mCanvas_Identity_Internal: mw.Canvas
	public get mCanvas_Identity(): mw.Canvas {
		if(!this.mCanvas_Identity_Internal&&this.uiWidgetBase) {
			this.mCanvas_Identity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity') as mw.Canvas
		}
		return this.mCanvas_Identity_Internal
	}
	private mText_IdentityExplain_Internal: mw.TextBlock
	public get mText_IdentityExplain(): mw.TextBlock {
		if(!this.mText_IdentityExplain_Internal&&this.uiWidgetBase) {
			this.mText_IdentityExplain_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mText_IdentityExplain') as mw.TextBlock
		}
		return this.mText_IdentityExplain_Internal
	}
	private mText_IdentityName_Internal: mw.TextBlock
	public get mText_IdentityName(): mw.TextBlock {
		if(!this.mText_IdentityName_Internal&&this.uiWidgetBase) {
			this.mText_IdentityName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mText_IdentityName') as mw.TextBlock
		}
		return this.mText_IdentityName_Internal
	}
	private mImg_IdentityIcon_Internal: mw.Image
	public get mImg_IdentityIcon(): mw.Image {
		if(!this.mImg_IdentityIcon_Internal&&this.uiWidgetBase) {
			this.mImg_IdentityIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mImg_IdentityIcon') as mw.Image
		}
		return this.mImg_IdentityIcon_Internal
	}
	private mText_GoalTitle_Internal: mw.TextBlock
	public get mText_GoalTitle(): mw.TextBlock {
		if(!this.mText_GoalTitle_Internal&&this.uiWidgetBase) {
			this.mText_GoalTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mText_GoalTitle') as mw.TextBlock
		}
		return this.mText_GoalTitle_Internal
	}
	private mCanvas_Goal_1_Internal: mw.Canvas
	public get mCanvas_Goal_1(): mw.Canvas {
		if(!this.mCanvas_Goal_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Goal_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mCanvas_Goal_1') as mw.Canvas
		}
		return this.mCanvas_Goal_1_Internal
	}
	private mText_GoalExplain_000_Internal: mw.TextBlock
	public get mText_GoalExplain_000(): mw.TextBlock {
		if(!this.mText_GoalExplain_000_Internal&&this.uiWidgetBase) {
			this.mText_GoalExplain_000_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mCanvas_Goal_1/mText_GoalExplain_000') as mw.TextBlock
		}
		return this.mText_GoalExplain_000_Internal
	}
	private mCanvas_Goal_2_Internal: mw.Canvas
	public get mCanvas_Goal_2(): mw.Canvas {
		if(!this.mCanvas_Goal_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Goal_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mCanvas_Goal_2') as mw.Canvas
		}
		return this.mCanvas_Goal_2_Internal
	}
	private mText_GoalExplain_001_Internal: mw.TextBlock
	public get mText_GoalExplain_001(): mw.TextBlock {
		if(!this.mText_GoalExplain_001_Internal&&this.uiWidgetBase) {
			this.mText_GoalExplain_001_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mCanvas_Goal_2/mText_GoalExplain_001') as mw.TextBlock
		}
		return this.mText_GoalExplain_001_Internal
	}
	private mText_GoalExplain_002_Internal: mw.TextBlock
	public get mText_GoalExplain_002(): mw.TextBlock {
		if(!this.mText_GoalExplain_002_Internal&&this.uiWidgetBase) {
			this.mText_GoalExplain_002_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Identity/mCanvas_Goal_2/mText_GoalExplain_002') as mw.TextBlock
		}
		return this.mText_GoalExplain_002_Internal
	}
	private mCanvas_Coins_Internal: mw.Canvas
	public get mCanvas_Coins(): mw.Canvas {
		if(!this.mCanvas_Coins_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coins_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Coins') as mw.Canvas
		}
		return this.mCanvas_Coins_Internal
	}
	private mText_CionsCollect_Internal: mw.TextBlock
	public get mText_CionsCollect(): mw.TextBlock {
		if(!this.mText_CionsCollect_Internal&&this.uiWidgetBase) {
			this.mText_CionsCollect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Coins/mText_CionsCollect') as mw.TextBlock
		}
		return this.mText_CionsCollect_Internal
	}
	private mText_Coins_Member_Internal: mw.TextBlock
	public get mText_Coins_Member(): mw.TextBlock {
		if(!this.mText_Coins_Member_Internal&&this.uiWidgetBase) {
			this.mText_Coins_Member_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Coins/mText_Coins_Member') as mw.TextBlock
		}
		return this.mText_Coins_Member_Internal
	}
	private mCanvas_Watch_Internal: mw.Canvas
	public get mCanvas_Watch(): mw.Canvas {
		if(!this.mCanvas_Watch_Internal&&this.uiWidgetBase) {
			this.mCanvas_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch') as mw.Canvas
		}
		return this.mCanvas_Watch_Internal
	}
	private mBtn_WatchL_Internal: mw.StaleButton
	public get mBtn_WatchL(): mw.StaleButton {
		if(!this.mBtn_WatchL_Internal&&this.uiWidgetBase) {
			this.mBtn_WatchL_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mBtn_WatchL') as mw.StaleButton
		}
		return this.mBtn_WatchL_Internal
	}
	private mBtn_WatchR_Internal: mw.StaleButton
	public get mBtn_WatchR(): mw.StaleButton {
		if(!this.mBtn_WatchR_Internal&&this.uiWidgetBase) {
			this.mBtn_WatchR_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mBtn_WatchR') as mw.StaleButton
		}
		return this.mBtn_WatchR_Internal
	}
	private mBtn_Close_Internal: mw.StaleButton
	public get mBtn_Close(): mw.StaleButton {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mBtn_Close') as mw.StaleButton
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_WatchName_Internal: mw.Canvas
	public get mCanvas_WatchName(): mw.Canvas {
		if(!this.mCanvas_WatchName_Internal&&this.uiWidgetBase) {
			this.mCanvas_WatchName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_WatchName') as mw.Canvas
		}
		return this.mCanvas_WatchName_Internal
	}
	private mText_WatchName_Internal: mw.TextBlock
	public get mText_WatchName(): mw.TextBlock {
		if(!this.mText_WatchName_Internal&&this.uiWidgetBase) {
			this.mText_WatchName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_WatchName/mText_WatchName') as mw.TextBlock
		}
		return this.mText_WatchName_Internal
	}
	private mCanvas_Skill_Internal: mw.Canvas
	public get mCanvas_Skill(): mw.Canvas {
		if(!this.mCanvas_Skill_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill') as mw.Canvas
		}
		return this.mCanvas_Skill_Internal
	}
	private mBtn_Skill_Internal: mw.Button
	public get mBtn_Skill(): mw.Button {
		if(!this.mBtn_Skill_Internal&&this.uiWidgetBase) {
			this.mBtn_Skill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mBtn_Skill') as mw.Button
		}
		return this.mBtn_Skill_Internal
	}
	private mText_Dkill_Name_Internal: mw.TextBlock
	public get mText_Dkill_Name(): mw.TextBlock {
		if(!this.mText_Dkill_Name_Internal&&this.uiWidgetBase) {
			this.mText_Dkill_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mText_Dkill_Name') as mw.TextBlock
		}
		return this.mText_Dkill_Name_Internal
	}
	private mImg_Skill_Mask_Internal: mw.Image
	public get mImg_Skill_Mask(): mw.Image {
		if(!this.mImg_Skill_Mask_Internal&&this.uiWidgetBase) {
			this.mImg_Skill_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mImg_Skill_Mask') as mw.Image
		}
		return this.mImg_Skill_Mask_Internal
	}
	private mCanvas_Skill_Des_Internal: mw.Canvas
	public get mCanvas_Skill_Des(): mw.Canvas {
		if(!this.mCanvas_Skill_Des_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill_Des_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mCanvas_Skill_Des') as mw.Canvas
		}
		return this.mCanvas_Skill_Des_Internal
	}
	private mText_Skill_Des_Internal: mw.TextBlock
	public get mText_Skill_Des(): mw.TextBlock {
		if(!this.mText_Skill_Des_Internal&&this.uiWidgetBase) {
			this.mText_Skill_Des_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mCanvas_Skill_Des/mText_Skill_Des') as mw.TextBlock
		}
		return this.mText_Skill_Des_Internal
	}
	private mText_SkillCD_Internal: mw.TextBlock
	public get mText_SkillCD(): mw.TextBlock {
		if(!this.mText_SkillCD_Internal&&this.uiWidgetBase) {
			this.mText_SkillCD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill/mText_SkillCD') as mw.TextBlock
		}
		return this.mText_SkillCD_Internal
	}
	private mImage_Center_Internal: mw.Image
	public get mImage_Center(): mw.Image {
		if(!this.mImage_Center_Internal&&this.uiWidgetBase) {
			this.mImage_Center_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_Center') as mw.Image
		}
		return this.mImage_Center_Internal
	}
	private mBtn_Click_Internal: mw.StaleButton
	public get mBtn_Click(): mw.StaleButton {
		if(!this.mBtn_Click_Internal&&this.uiWidgetBase) {
			this.mBtn_Click_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Click') as mw.StaleButton
		}
		return this.mBtn_Click_Internal
	}


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
		});
		this.initLanguage(this.mBtn_Throw);
		this.mBtn_Throw.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Swith.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Swith");
		});
		this.initLanguage(this.mBtn_Swith);
		this.mBtn_Swith.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_FlySwith.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_FlySwith");
		});
		this.initLanguage(this.mBtn_FlySwith);
		this.mBtn_FlySwith.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Attack.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Attack");
		});
		this.initLanguage(this.mBtn_Attack);
		this.mBtn_Attack.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Hack.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Hack");
		});
		this.initLanguage(this.mBtn_Hack);
		this.mBtn_Hack.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Jump_Inside.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Jump_Inside");
		});
		this.initLanguage(this.mBtn_Jump_Inside);
		this.mBtn_Jump_Inside.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Interaction.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Interaction");
		});
		this.initLanguage(this.mBtn_Interaction);
		this.mBtn_Interaction.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_WatchL.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_WatchL");
		});
		this.initLanguage(this.mBtn_WatchL);
		this.mBtn_WatchL.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_WatchR.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_WatchR");
		});
		this.initLanguage(this.mBtn_WatchR);
		this.mBtn_WatchR.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		});
		this.initLanguage(this.mBtn_Close);
		this.mBtn_Close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Click.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Click");
		});
		this.initLanguage(this.mBtn_Click);
		this.mBtn_Click.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtn_Skill.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Skill");
		});
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
	
	/*初始化多语言*/
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

	/*显示panel*/
    public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	/*隐藏panel*/
    public hide(): void {
		mw.UIService.hideUI(this);
	}
 }
 