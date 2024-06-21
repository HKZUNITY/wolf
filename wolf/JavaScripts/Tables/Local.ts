import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["q_ID","name","value","value_en"],["","ReadByName|Key","MainLanguage","ChildLanguage"],[1,"ChatExtension_chatType_1","粉色","Pink"],[2,"ChatExtension_chatType_2","蓝色","Blue"],[3,"ChatExtension_chatType_3","紫色","Purple"],[4,"ChatExtension_chatType_4","黄色","Yellow"],[5,"ChatExtension_chatType_5","绿色","Green"],[6,"ChatExtension_chatType_6","左边","Left"],[7,"ChatExtension_chatType_7","右边","Right"],[8,"Chat_chat_1","快去按下{1}按钮！","Go and press the {1} button!"],[9,"Chat_chat_2","先按{1}按钮","Press the {1} button first"],[10,"Chat_chat_3","再按{1}按钮","Then press the {1} button"],[11,"Chat_chat_4","松开{1}按钮","Release the {1} button"],[12,"Chat_chat_5","你走{2}，我走另一边","You go {0}, I'll go the other way"],[13,"Chat_chat_6","你站在那里不要动","You stand there, don't move"],[14,"Chat_chat_7","我们一起冲过去！","Let's rush through together!"],[15,"Chat_chat_8","不好意思我失误了","Sorry for my mistake"],[16,"Chat_chat_9","没关系，再试一次吧","It's okay, try again"],[17,"GuideText_Guidetxt_1","欢迎来到教学关卡！在双人糖果跑酷中，一定要与你的搭档好好合作才可以顺利过关哦","Welcome to the Tutorial level! You must work well with your partner to pass the levels in pairs!"],[18,"GuideText_Guidetxt_2","按下按钮，可以开关对应颜色的机关门","Press the button to open or close the door with the corresponding color"],[19,"GuideText_Guidetxt_3","互帮互助才可以一起过关，不要忘了刚才帮助过你的搭档哟","Help each other to pass the level together. Don't forget your partner who has just helped you!"],[20,"GuideText_Guidetxt_4","这扇门需要同时按压两个按钮才可开启，与你的搭档一起冲过去吧！","This door needs to be opened by pressing two buttons at the same time, rush through it with your partner!"],[21,"GuideText_Guidetxt_5","方形的按钮只有用“同伴方块”才可按压，快将它推至对应位置打开大门吧！","The square button can only be pressed with the \"Companion Cube\", so push it to the corresponding position to open the door!"],[22,"GuideText_Guidetxt_6","与你的搭档合作，将友情方块顺利推至按钮处吧！","Cooperate with your partner and push the Friendship Cube to the button smoothly!"],[23,"GuideText_Guidetxt_7","建议先通关“信任即钥匙”关卡后再挑战本关卡","It is recommended to pass the \"Trust is the key\" level before challenging this level"],[24,"GuideText_Guidetxt_8","建议先通关“往返跳跃”关卡后再挑战本关卡","It is recommended to pass the \"Round-trip jump\" level first before challenging this level"],[25,"GuideText_Guidetxt_9","墙上的开关只能触发一瞬间，与你的默契搭档一同跳起打开大门吧！","The switch on the wall can only be triggered for a split second, so jump up and open the door with your trusty partner!"],[26,"GuideText_Guidetxt_10","建议先通关“箱子难题”关卡后再挑战本关卡","It is recommended to pass the \"Box Puzzle\" level before challenging this level"],[27,"GuideText_Guidetxt_11","这里是最难的关卡之一，建议先通关简单与普通难度的关卡再来挑战哦","This is one of the most difficult levels. It is recommended to clear the easy and normal levels before challenging"],[28,"Level_levelName_1","教程","Tutorials"],[29,"Level_levelName_2","齐心协力","Work together"],[30,"Level_levelName_3","信任即钥匙","Trust is the key"],[31,"Level_levelName_4","箱子难题","Box Puzzle"],[32,"Level_levelName_5","往返跳跃","Round-trip jump"],[33,"Level_levelName_6","蹦蹦跳跳","Bouncing and jumping"],[34,"Level_levelName_7","好朋友挑战","Friendship Challenge"],[35,"Level_levelName_8","层层登攀","Climbing up"],[36,"Level_levelName_9","心跳冲刺","Heartbeat Sprint"],[37,"Level_levelName_10","人箱合一","Human box in one"],[38,"UI_1","换装","Dress up"],[39,"UI_2","音量：开","Volume: On"],[40,"UI_3","音量：关","Volume: Off"],[41,"UI_4","返回大厅","Back to the lobby"],[42,"UI_5","排行榜","Leaderboard"],[43,"UI_6","排名","Rank"],[44,"UI_7","名称","Name"],[45,"UI_8","积分","Points"],[46,"UI_9","打招呼","Greeting"],[47,"UI_10","前指","Pointing forward"],[48,"UI_11","摇头","Shake head"],[49,"UI_12","庆祝","Celebrate"],[50,"UI_13","鼓励","Encourage"],[51,"UI_14","比心","Finger heart"],[52,"UI_15","快邀请你想要搭档的玩家一同闯关吧！","Invite the players to break through the levels!"],[53,"UI_16","这些玩家正在请求你的协助！","Help these players !"],[54,"UI_17","邀请","Invite"],[55,"UI_18","已邀请","Invited"],[56,"UI_19","协助","Assist"],[57,"UI_20","闯关邀请","Invitation"],[58,"UI_21","请求帮助","Ask for help"],[59,"UI_22","开始","Start"],[60,"UI_23","{0}请求支援","{0}Request for support"],[61,"UI_24","是否要返回大厅","Are you sure to return to the lobby?"],[62,"UI_25","取消","Cancel"],[63,"UI_26","返回大厅","Return"],[64,"GuideText_Guidetxt_12","前往前方挑战简单关卡","Go ahead and challenge the easy levels"],[65,"GuideText_Guidetxt_13","前往前方挑战普通关卡","Go ahead and challenge the normal level"],[66,"GuideText_Guidetxt_14","前往前方挑战困难关卡","Go ahead and challenge the difficult levels"],[67,"GuideText_Guidetxt_15","拖动左下的摇杆来控制角色移动","Drag the joystick on the lower left to control the movement of the character"],[68,"GuideText_Guidetxt_16","拖动右侧屏幕控制视角转动","Drag the right screen to control the view rotation"],[69,"GuideText_Guidetxt_17","点击                  按钮进行跳跃","Tap the button to jump"],[70,"UI_33","积分达到{0}分即可解锁","Reach {0} points to unlock"],[71,"Tips_1","积分不足暂无法进入，请先游玩其它关卡获取积分","You do not have enough points to enter, please play other levels first to earn points"],[72,"Tips_2","当前位置已保存","Current position saved"],[73,"Tips_3","{0}关卡已完成，获得{1}积分","{0} level has been completed, get {1} points"],[74,"UI_34","确认","Confirm"],[75,"GuideText_Guidetxt_18","简单关卡","Easy levels"],[76,"GuideText_Guidetxt_19","普通关卡","Normal level"],[77,"GuideText_Guidetxt_20","困难关卡","Difficult levels"],[78,"UI_NeedHelp","正在请求协助，快去帮帮他吧！","request for support, go and help him !"],[79,"UI_27","使用一张好友卡与{0}建立好友关系。你想与对方建立什么关系呢？","You can use a Friendship Card to establish a friendship with {0}. What relationship would you like to establish with the other person?"],[80,"UI_28","兄弟","Brother"],[81,"UI_29","闺蜜","Bestie"],[82,"UI_30","{0}想要与你成为{1}，你接受吗？","Do you accept {0}'s desire to become {1} with you?"],[83,"UI_31","*{0}*与*{1}*成为了*{2}*，祝贺他们！","*{0} * and * {1} * have become * {2} *, congratulations to them!"],[84,"UI_32","邀请好友","Invite friends"],[85,"UI_35","你的{0}{1}邀请你一同挑战{2}关卡","Your {0} {1} invites you to challenge the {2} level together"],[86,"UI_36","接受","Accept"],[87,"UI_37","拒绝","Refuse"],[88,"Tips_4","{0}接受了你的邀请","{0} has accepted your invitation"],[89,"Tips_5","祝贺*{0}*与*{1}*合作完成了*{2}*关卡！","Congratulations to * {0} * for collaborating with * {1} * to complete the * {2} * level!"],[90,"UI_38","{0}玩家与他人成立了好友关系，与你的好友关系已自动解除","Player {0} has established a friend relationship with someone else, and their friend relationship with you has been automatically terminated"],[91,"UI_39","{0}玩家已退出房间，与你的好友关系已自动解除","player {0} has exited the room and their friendship with you has been automatically terminated"],[92,"Tips_6","{0}拒绝了你的邀请","{0} has declined your invitation"],[93,"Tips_7","你们已经是好友啦！","You are already friends!"],[94,"Tips_8","没有{0}道具了，先去大厅获取吧！","There are no {0} items left, go to the lobby to get them first!"],[95,"Tips_9","成功使用{0}道具！","Successfully used {0} item!"],[96,"Tips_10","{0}道具已经使用过了","The item {0} has already been used"],[97,"Tips_11","当前位置已保存","The current location has been saved"],[98,"Tips_12","此道具不可在背包使用","This item cannot be used in backpacks"],[99,"GuideText_Guidetxt_21","将箱子推至这里跳上去吧！","Push the box here and jump up!"],[100,"GuideText_Guidetxt_22","使用好友卡与其他玩家成为闺蜜/兄弟吧！","Use your friend card to become bestie/brothers with other players!"],[101,"GuideText_Guidetxt_23","使用此道具在关卡结束时获得双倍积分！","Use this item to earn double points at the end of the level!"],[102,"GuideText_Guidetxt_24","使用飞行皮靴获得飞行能力飞过障碍！","Use flying boots to gain flying ability and fly over obstacles!"],[103,"GuideText_Guidetxt_25","召唤魔法伙伴帮助你控制机关吧！","Summon magical companions to help you control the mechanism!"],[104,"GuideText_Guidetxt_26","使用延时沙漏将时间机关延长15秒！","Use a delayed hourglass to extend the time mechanism by 15 seconds!"],[105,"GuideText_Guidetxt_27","先前往左边的简单关卡挑战第一关“教程”吧！","Go to the simple level on the left to challenge the first level \"Tutorial\" first!"],[106,"Tips_13","请从关卡起点进入后再使用该道具","Please use this item after entering the level."],[107,"Tips_14","本按钮已被占用，暂无法使用魔法伙伴","This button is occupied, magic partner is not available at the moment."],[108,"GuideText_Guidetxt_28","此按钮暂被其他玩家控制，最好不要乱动噢","This button is temporarily controlled by other players, not available now."],[109,"Tips_15","获得一个“{0}”道具","Get a \"{0}\" prop"],[110,"Item_nameKey_1","好友卡","Friendship Card"],[111,"Item_nameKey_2","双倍积分","Double Points"],[112,"Item_nameKey_3","飞行皮靴","Flying Boots"],[113,"Item_nameKey_4","魔法伙伴","Magic Partner"],[114,"Item_nameKey_5","延时沙漏","Time-lapse Hourglass"],[115,"DressProgress_namekey_1","眼间距","Eye Spacing"],[116,"DressProgress_namekey_2","眼睛上下移动","Eye Position"],[117,"DressProgress_namekey_3","眼睛角度","Eye Angle"],[118,"DressProgress_namekey_4","眼睛长度","Eye Length"],[119,"DressProgress_namekey_5","眼睛宽度","Eye Width"],[120,"DressProgress_namekey_6","眼角左右移动","Canthus Position X"],[121,"DressProgress_namekey_7","眼角上下移动","Canthus Position Y"],[122,"DressProgress_namekey_8","眉间距","Eyebrow Spacing"],[123,"DressProgress_namekey_9","眉毛上下移动","Eyebrows Height"],[124,"DressProgress_namekey_10","眉毛角度","Eyebrow Angle"],[125,"DressProgress_namekey_11","鼻梁高度","Nose Height"],[126,"DressProgress_namekey_12","鼻子长度","Nose Length"],[127,"DressProgress_namekey_13","鼻子上下移动","Nose Position"],[128,"DressProgress_namekey_14","嘴巴上下移动","Mouth Position X"],[129,"DressProgress_namekey_15","嘴巴宽度","Mouth Width"],[130,"DressProgress_namekey_16","嘴巴弧度","Mouth Curvature"],[131,"UI_40","颜色","Color"],[132,"UI_41","返回","Back"],[133,"UI_42","进阶","Advanced"],[134,"UI_43","保存装扮","Save"],[135,"UI_44","预设","Preset"],[136,"UI_45","脸部","Face"],[137,"UI_46","身体","Body"],[138,"UI_47","服装","Outfit"],[139,"UI_48","套装预设","Set Presets"],[140,"UI_49","脸部预设","Face Presets"],[141,"UI_50","身材预设","Body Presets"],[142,"UI_51","眼睛","Eyes"],[143,"UI_52","眉毛","Eyebrow"],[144,"UI_53","鼻子","Nose"],[145,"UI_54","嘴巴","Mouth"],[146,"UI_55","腮红","Blush"],[147,"UI_56","肤色","Skin"],[148,"UI_57","身材","Body"],[149,"UI_58","上衣","Top"],[150,"UI_59","下装","Bottom"],[151,"UI_60","鞋子","Shoes"],[152,"UI_61","手套","Gloves"],[153,"UI_62","头发","Hair"],[154,"UI_63","额外","Other"],[155,"UI_64","背包","Bag"],[156,"UI_65","关闭","Close"]];
export interface ILocalElement extends IElementBase{
 	/**ID*/
	q_ID:number
	/**名字*/
	name:string
	/**中文*/
	value:string
 } 
export class LocalConfig extends ConfigBase<ILocalElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**Pink*/
	get ChatExtension_chatType_1():ILocalElement{return this.getElement(1)};
	/**Blue*/
	get ChatExtension_chatType_2():ILocalElement{return this.getElement(2)};
	/**Purple*/
	get ChatExtension_chatType_3():ILocalElement{return this.getElement(3)};
	/**Yellow*/
	get ChatExtension_chatType_4():ILocalElement{return this.getElement(4)};
	/**Green*/
	get ChatExtension_chatType_5():ILocalElement{return this.getElement(5)};
	/**Left*/
	get ChatExtension_chatType_6():ILocalElement{return this.getElement(6)};
	/**Right*/
	get ChatExtension_chatType_7():ILocalElement{return this.getElement(7)};
	/**Go and press the {1} button!*/
	get Chat_chat_1():ILocalElement{return this.getElement(8)};
	/**Press the {1} button first*/
	get Chat_chat_2():ILocalElement{return this.getElement(9)};
	/**Then press the {1} button*/
	get Chat_chat_3():ILocalElement{return this.getElement(10)};
	/**Release the {1} button*/
	get Chat_chat_4():ILocalElement{return this.getElement(11)};
	/**You go {0}, I'll go the other way*/
	get Chat_chat_5():ILocalElement{return this.getElement(12)};
	/**You stand there, don't move*/
	get Chat_chat_6():ILocalElement{return this.getElement(13)};
	/**Let's rush through together!*/
	get Chat_chat_7():ILocalElement{return this.getElement(14)};
	/**Sorry for my mistake*/
	get Chat_chat_8():ILocalElement{return this.getElement(15)};
	/**It's okay, try again*/
	get Chat_chat_9():ILocalElement{return this.getElement(16)};
	/**Welcome to the Tutorial level! You must work well with your partner to pass the levels in pairs!*/
	get GuideText_Guidetxt_1():ILocalElement{return this.getElement(17)};
	/**Press the button to open or close the door with the corresponding color*/
	get GuideText_Guidetxt_2():ILocalElement{return this.getElement(18)};
	/**Help each other to pass the level together. Don't forget your partner who has just helped you!*/
	get GuideText_Guidetxt_3():ILocalElement{return this.getElement(19)};
	/**This door needs to be opened by pressing two buttons at the same time, rush through it with your partner!*/
	get GuideText_Guidetxt_4():ILocalElement{return this.getElement(20)};
	/**The square button can only be pressed with the "Companion Cube", so push it to the corresponding position to open the door!*/
	get GuideText_Guidetxt_5():ILocalElement{return this.getElement(21)};
	/**Cooperate with your partner and push the Friendship Cube to the button smoothly!*/
	get GuideText_Guidetxt_6():ILocalElement{return this.getElement(22)};
	/**It is recommended to pass the "Trust is the key" level before challenging this level*/
	get GuideText_Guidetxt_7():ILocalElement{return this.getElement(23)};
	/**It is recommended to pass the "Round-trip jump" level first before challenging this level*/
	get GuideText_Guidetxt_8():ILocalElement{return this.getElement(24)};
	/**The switch on the wall can only be triggered for a split second, so jump up and open the door with your trusty partner!*/
	get GuideText_Guidetxt_9():ILocalElement{return this.getElement(25)};
	/**It is recommended to pass the "Box Puzzle" level before challenging this level*/
	get GuideText_Guidetxt_10():ILocalElement{return this.getElement(26)};
	/**This is one of the most difficult levels. It is recommended to clear the easy and normal levels before challenging*/
	get GuideText_Guidetxt_11():ILocalElement{return this.getElement(27)};
	/**Tutorials*/
	get Level_levelName_1():ILocalElement{return this.getElement(28)};
	/**Work together*/
	get Level_levelName_2():ILocalElement{return this.getElement(29)};
	/**Trust is the key*/
	get Level_levelName_3():ILocalElement{return this.getElement(30)};
	/**Box Puzzle*/
	get Level_levelName_4():ILocalElement{return this.getElement(31)};
	/**Round-trip jump*/
	get Level_levelName_5():ILocalElement{return this.getElement(32)};
	/**Bouncing and jumping*/
	get Level_levelName_6():ILocalElement{return this.getElement(33)};
	/**Friendship Challenge*/
	get Level_levelName_7():ILocalElement{return this.getElement(34)};
	/**Climbing up*/
	get Level_levelName_8():ILocalElement{return this.getElement(35)};
	/**Heartbeat Sprint*/
	get Level_levelName_9():ILocalElement{return this.getElement(36)};
	/**Human box in one*/
	get Level_levelName_10():ILocalElement{return this.getElement(37)};
	/**Dress up*/
	get UI_1():ILocalElement{return this.getElement(38)};
	/**Volume: On*/
	get UI_2():ILocalElement{return this.getElement(39)};
	/**Volume: Off*/
	get UI_3():ILocalElement{return this.getElement(40)};
	/**Back to the lobby*/
	get UI_4():ILocalElement{return this.getElement(41)};
	/**Leaderboard*/
	get UI_5():ILocalElement{return this.getElement(42)};
	/**Rank*/
	get UI_6():ILocalElement{return this.getElement(43)};
	/**Name*/
	get UI_7():ILocalElement{return this.getElement(44)};
	/**Points*/
	get UI_8():ILocalElement{return this.getElement(45)};
	/**Greeting*/
	get UI_9():ILocalElement{return this.getElement(46)};
	/**Pointing forward*/
	get UI_10():ILocalElement{return this.getElement(47)};
	/**Shake head*/
	get UI_11():ILocalElement{return this.getElement(48)};
	/**Celebrate*/
	get UI_12():ILocalElement{return this.getElement(49)};
	/**Encourage*/
	get UI_13():ILocalElement{return this.getElement(50)};
	/**Finger heart*/
	get UI_14():ILocalElement{return this.getElement(51)};
	/**Invite the players to break through the levels!*/
	get UI_15():ILocalElement{return this.getElement(52)};
	/**Help these players !*/
	get UI_16():ILocalElement{return this.getElement(53)};
	/**Invite*/
	get UI_17():ILocalElement{return this.getElement(54)};
	/**Invited*/
	get UI_18():ILocalElement{return this.getElement(55)};
	/**Assist*/
	get UI_19():ILocalElement{return this.getElement(56)};
	/**Invitation*/
	get UI_20():ILocalElement{return this.getElement(57)};
	/**Ask for help*/
	get UI_21():ILocalElement{return this.getElement(58)};
	/**Start*/
	get UI_22():ILocalElement{return this.getElement(59)};
	/**{0}Request for support*/
	get UI_23():ILocalElement{return this.getElement(60)};
	/**Are you sure to return to the lobby?*/
	get UI_24():ILocalElement{return this.getElement(61)};
	/**Cancel*/
	get UI_25():ILocalElement{return this.getElement(62)};
	/**Return*/
	get UI_26():ILocalElement{return this.getElement(63)};
	/**Go ahead and challenge the easy levels*/
	get GuideText_Guidetxt_12():ILocalElement{return this.getElement(64)};
	/**Go ahead and challenge the normal level*/
	get GuideText_Guidetxt_13():ILocalElement{return this.getElement(65)};
	/**Go ahead and challenge the difficult levels*/
	get GuideText_Guidetxt_14():ILocalElement{return this.getElement(66)};
	/**Drag the joystick on the lower left to control the movement of the character*/
	get GuideText_Guidetxt_15():ILocalElement{return this.getElement(67)};
	/**Drag the right screen to control the view rotation*/
	get GuideText_Guidetxt_16():ILocalElement{return this.getElement(68)};
	/**Tap the button to jump*/
	get GuideText_Guidetxt_17():ILocalElement{return this.getElement(69)};
	/**Reach {0} points to unlock*/
	get UI_33():ILocalElement{return this.getElement(70)};
	/**You do not have enough points to enter, please play other levels first to earn points*/
	get Tips_1():ILocalElement{return this.getElement(71)};
	/**Current position saved*/
	get Tips_2():ILocalElement{return this.getElement(72)};
	/**{0} level has been completed, get {1} points*/
	get Tips_3():ILocalElement{return this.getElement(73)};
	/**Confirm*/
	get UI_34():ILocalElement{return this.getElement(74)};
	/**Easy levels*/
	get GuideText_Guidetxt_18():ILocalElement{return this.getElement(75)};
	/**Normal level*/
	get GuideText_Guidetxt_19():ILocalElement{return this.getElement(76)};
	/**Difficult levels*/
	get GuideText_Guidetxt_20():ILocalElement{return this.getElement(77)};
	/**request for support, go and help him !*/
	get UI_NeedHelp():ILocalElement{return this.getElement(78)};
	/**You can use a Friendship Card to establish a friendship with {0}. What relationship would you like to establish with the other person?*/
	get UI_27():ILocalElement{return this.getElement(79)};
	/**Brother*/
	get UI_28():ILocalElement{return this.getElement(80)};
	/**Bestie*/
	get UI_29():ILocalElement{return this.getElement(81)};
	/**Do you accept {0}'s desire to become {1} with you?*/
	get UI_30():ILocalElement{return this.getElement(82)};
	/***{0} * and * {1} * have become * {2} *, congratulations to them!*/
	get UI_31():ILocalElement{return this.getElement(83)};
	/**Invite friends*/
	get UI_32():ILocalElement{return this.getElement(84)};
	/**Your {0} {1} invites you to challenge the {2} level together*/
	get UI_35():ILocalElement{return this.getElement(85)};
	/**Accept*/
	get UI_36():ILocalElement{return this.getElement(86)};
	/**Refuse*/
	get UI_37():ILocalElement{return this.getElement(87)};
	/**{0} has accepted your invitation*/
	get Tips_4():ILocalElement{return this.getElement(88)};
	/**Congratulations to * {0} * for collaborating with * {1} * to complete the * {2} * level!*/
	get Tips_5():ILocalElement{return this.getElement(89)};
	/**Player {0} has established a friend relationship with someone else, and their friend relationship with you has been automatically terminated*/
	get UI_38():ILocalElement{return this.getElement(90)};
	/**player {0} has exited the room and their friendship with you has been automatically terminated*/
	get UI_39():ILocalElement{return this.getElement(91)};
	/**{0} has declined your invitation*/
	get Tips_6():ILocalElement{return this.getElement(92)};
	/**You are already friends!*/
	get Tips_7():ILocalElement{return this.getElement(93)};
	/**There are no {0} items left, go to the lobby to get them first!*/
	get Tips_8():ILocalElement{return this.getElement(94)};
	/**Successfully used {0} item!*/
	get Tips_9():ILocalElement{return this.getElement(95)};
	/**The item {0} has already been used*/
	get Tips_10():ILocalElement{return this.getElement(96)};
	/**The current location has been saved*/
	get Tips_11():ILocalElement{return this.getElement(97)};
	/**This item cannot be used in backpacks*/
	get Tips_12():ILocalElement{return this.getElement(98)};
	/**Push the box here and jump up!*/
	get GuideText_Guidetxt_21():ILocalElement{return this.getElement(99)};
	/**Use your friend card to become bestie/brothers with other players!*/
	get GuideText_Guidetxt_22():ILocalElement{return this.getElement(100)};
	/**Use this item to earn double points at the end of the level!*/
	get GuideText_Guidetxt_23():ILocalElement{return this.getElement(101)};
	/**Use flying boots to gain flying ability and fly over obstacles!*/
	get GuideText_Guidetxt_24():ILocalElement{return this.getElement(102)};
	/**Summon magical companions to help you control the mechanism!*/
	get GuideText_Guidetxt_25():ILocalElement{return this.getElement(103)};
	/**Use a delayed hourglass to extend the time mechanism by 15 seconds!*/
	get GuideText_Guidetxt_26():ILocalElement{return this.getElement(104)};
	/**Go to the simple level on the left to challenge the first level "Tutorial" first!*/
	get GuideText_Guidetxt_27():ILocalElement{return this.getElement(105)};
	/**Please use this item after entering the level.*/
	get Tips_13():ILocalElement{return this.getElement(106)};
	/**This button is occupied, magic partner is not available at the moment.*/
	get Tips_14():ILocalElement{return this.getElement(107)};
	/**This button is temporarily controlled by other players, not available now.*/
	get GuideText_Guidetxt_28():ILocalElement{return this.getElement(108)};
	/**Get a "{0}" prop*/
	get Tips_15():ILocalElement{return this.getElement(109)};
	/**Friendship Card*/
	get Item_nameKey_1():ILocalElement{return this.getElement(110)};
	/**Double Points*/
	get Item_nameKey_2():ILocalElement{return this.getElement(111)};
	/**Flying Boots*/
	get Item_nameKey_3():ILocalElement{return this.getElement(112)};
	/**Magic Partner*/
	get Item_nameKey_4():ILocalElement{return this.getElement(113)};
	/**Time-lapse Hourglass*/
	get Item_nameKey_5():ILocalElement{return this.getElement(114)};
	/**Eye Spacing*/
	get DressProgress_namekey_1():ILocalElement{return this.getElement(115)};
	/**Eye Position*/
	get DressProgress_namekey_2():ILocalElement{return this.getElement(116)};
	/**Eye Angle*/
	get DressProgress_namekey_3():ILocalElement{return this.getElement(117)};
	/**Eye Length*/
	get DressProgress_namekey_4():ILocalElement{return this.getElement(118)};
	/**Eye Width*/
	get DressProgress_namekey_5():ILocalElement{return this.getElement(119)};
	/**Canthus Position X*/
	get DressProgress_namekey_6():ILocalElement{return this.getElement(120)};
	/**Canthus Position Y*/
	get DressProgress_namekey_7():ILocalElement{return this.getElement(121)};
	/**Eyebrow Spacing*/
	get DressProgress_namekey_8():ILocalElement{return this.getElement(122)};
	/**Eyebrows Height*/
	get DressProgress_namekey_9():ILocalElement{return this.getElement(123)};
	/**Eyebrow Angle*/
	get DressProgress_namekey_10():ILocalElement{return this.getElement(124)};
	/**Nose Height*/
	get DressProgress_namekey_11():ILocalElement{return this.getElement(125)};
	/**Nose Length*/
	get DressProgress_namekey_12():ILocalElement{return this.getElement(126)};
	/**Nose Position*/
	get DressProgress_namekey_13():ILocalElement{return this.getElement(127)};
	/**Mouth Position X*/
	get DressProgress_namekey_14():ILocalElement{return this.getElement(128)};
	/**Mouth Width*/
	get DressProgress_namekey_15():ILocalElement{return this.getElement(129)};
	/**Mouth Curvature*/
	get DressProgress_namekey_16():ILocalElement{return this.getElement(130)};
	/**Color*/
	get UI_40():ILocalElement{return this.getElement(131)};
	/**Back*/
	get UI_41():ILocalElement{return this.getElement(132)};
	/**Advanced*/
	get UI_42():ILocalElement{return this.getElement(133)};
	/**Save*/
	get UI_43():ILocalElement{return this.getElement(134)};
	/**Preset*/
	get UI_44():ILocalElement{return this.getElement(135)};
	/**Face*/
	get UI_45():ILocalElement{return this.getElement(136)};
	/**Body*/
	get UI_46():ILocalElement{return this.getElement(137)};
	/**Outfit*/
	get UI_47():ILocalElement{return this.getElement(138)};
	/**Set Presets*/
	get UI_48():ILocalElement{return this.getElement(139)};
	/**Face Presets*/
	get UI_49():ILocalElement{return this.getElement(140)};
	/**Body Presets*/
	get UI_50():ILocalElement{return this.getElement(141)};
	/**Eyes*/
	get UI_51():ILocalElement{return this.getElement(142)};
	/**Eyebrow*/
	get UI_52():ILocalElement{return this.getElement(143)};
	/**Nose*/
	get UI_53():ILocalElement{return this.getElement(144)};
	/**Mouth*/
	get UI_54():ILocalElement{return this.getElement(145)};
	/**Blush*/
	get UI_55():ILocalElement{return this.getElement(146)};
	/**Skin*/
	get UI_56():ILocalElement{return this.getElement(147)};
	/**Body*/
	get UI_57():ILocalElement{return this.getElement(148)};
	/**Top*/
	get UI_58():ILocalElement{return this.getElement(149)};
	/**Bottom*/
	get UI_59():ILocalElement{return this.getElement(150)};
	/**Shoes*/
	get UI_60():ILocalElement{return this.getElement(151)};
	/**Gloves*/
	get UI_61():ILocalElement{return this.getElement(152)};
	/**Hair*/
	get UI_62():ILocalElement{return this.getElement(153)};
	/**Other*/
	get UI_63():ILocalElement{return this.getElement(154)};
	/**Bag*/
	get UI_64():ILocalElement{return this.getElement(155)};
	/**Close*/
	get UI_65():ILocalElement{return this.getElement(156)};

}