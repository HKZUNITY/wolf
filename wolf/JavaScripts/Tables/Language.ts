import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","mur","Value","Value_Ch","Comment"],["","Key|ReadByName","MainLanguage","ChildLanguage",""],[10001,"Guide_GuideContent_10001","This is what you are playing in this round","这里是本局中你的身份","10000：新手引导表"],[10002,"Guide_GuideContent_10002","This is your goal in this round, check it here if you don't know what to do","这里是你本局的目标，不知道做什么的话就看一下这里吧",null],[10003,"Guide_GuideContent_10003","Survive to win~","努力活下来才能够获得胜利~",null],[10004,"Guide_GuideContent_10004","Here is the energy ball:","这是能量球：",null],[10005,"Guide_GuideContent_10005","Collect them all to get a protective shield","集齐能量球，可以获得一层保护壳",null],[10006,"Guide_GuideContent_10006","This is your goal in this round, achieve it before the game ends to win","这里是你本局的目标，在对局结束前完成目标才能获得胜利",null],[10007,"Guide_GuideContent_10007","This is your goal in this round, achieve it before the game ends to win","这里是你本局的目标，在对局结束前完成目标才能获得胜利",null],[10008,"Guide_GuideContent_10008","You have a new goal, to defeat the Murderer and protect the Students","你有了新的目标，击杀凶手，保护学生",null],[10009,"Guide_GuideContent_10009","This is what you are playing in this round","这里是本局中你的身份",null],[10010,"Guide_GuideContent_10010","This is what you are playing in this round","这里是本局中你的身份",null],[10011,"Guide_GuideContent_10011","Congratulation! You just picked up the weapon and you're a Hero now","恭喜你拾取到武器，现在你成为了一名英雄",null],[10012,"Guide_GuideContent_20001","The Coins gained in this game will be stored here and be given to you during the settlement; but there is a limitation for the Coin Bag and cannot gain more Coins when it's full.","本局游戏内获得的金币将存储在这里，结算时会发放给你；不过金币袋是有上限的，袋子装满就无法获得了",null],[10013,"Guide_GuideContent_20002","Coin Bag is full, cannot gain more Coins in this round","金币袋已经满了，本局无法再拾取金币了",null],[10014,"Guide_GuideContent_30001","Click here to switch your status, choose to show or hide the weapon","点击这里可以切换姿态，选择亮出武器或藏起武器",null],[10015,"Guide_GuideContent_30002","Show the weapon, then you can click here to attack","在亮出武器后，可以点击这里进行攻击",null],[10016,"Guide_GuideContent_30003","Click here to switch your status, choose to show or hide the weapon","点击这里可以切换姿态，选择亮出武器或藏起武器",null],[10017,"Guide_GuideContent_30004","Show the weapon, then you can click here to attack","在亮出武器后，可以点击这里进行攻击",null],[10018,"Guide_GuideContent_30005","Click here to switch your status, choose to show or hide the weapon","点击这里可以切换姿态，选择亮出武器或藏起武器",null],[10019,"Guide_GuideContent_30006","Show the weapon, then you can click here to attack","在亮出武器后，可以点击这里进行攻击",null],[10020,"Guide_GuideContent_40001","Congratulations! You collected all the energy balls! Now you have a protective shield! The protective shield can protect you from another player once, but you can only get it once per round","恭喜你集齐了道具！现在你获得了一个保护壳！保护壳可以为你抵挡一次来自其他玩家的攻击，但是每局游戏只能获得一次",null],[10021,"Guide_GuideContent_50001","Your first round is over, take a look at the settlement panel","现在你的第一局游戏已经结束，来看看结算面板吧",null],[10022,"Guide_GuideContent_50002","Here is the final result of the game","这里说明了对局的最终结果",null],[10023,"Guide_GuideContent_50003","Here shows the two players who impacted the game most as well as their wins and losses","这里显示了对对局产生影响最大的两方玩家和他们的胜负",null],[10024,"Guide_GuideContent_50004","Here's shows your earning in this round","这里显示了你在本轮对局获得的收益",null],[10025,"Guide_GuideContent_60001","On behalf of justice, you can't shoot randomly, attacking good people leads to your own death","代表正义的你不可以乱开枪，攻击好人会导致自己死亡",null],[20001,"Identity_IdentityName_10001","Detective","侦探","20000：身份属性表"],[20002,"Identity_IdentityName_10002","Murderer","凶手",null],[20003,"Identity_IdentityName_10003","Student","学生",null],[20004,"Identity_IdentityName_10004","Hero","英雄",null],[30001,"Text_Content_10001","Not enough player","当前人数不足","30000：文本表"],[30002,"Text_Content_10002","Match in progress","对局进行中",null],[30003,"Text_Content_10003","Matching","等待对局开始",null],[30004,"Text_Content_11001","The game starts with a countdown...","游戏开始倒计时...",null],[30005,"Text_Content_11002","End-of-game countdown","对局结束倒计时",null],[30006,"Text_Content_11003","You are playing as:","你的身份是：",null],[30007,"Text_Content_11004","Chance being Murderer:","成为凶手的概率：",null],[30008,"Text_Content_11005","(Match in the game will increase the possibility)","（参与对局将增加概率）",null],[30009,"Text_Content_11006","What you play","你的身份",null],[30010,"Text_Content_11007","You Died","你死了",null],[30011,"Text_Content_11008","Victory!","胜利！",null],[30012,"Text_Content_11009","Kill all the players {0}/{1}","击杀所有人{0}/{1}",null],[30013,"Text_Content_11010","Kill the Murderer {0}/{1}","击杀凶手{0}/{1}",null],[30014,"Text_Content_11011","Stay alive","活下去",null],[30015,"Text_Content_11012","Hidden energy balls collected {0}/{1}","收集隐秘的能量球{0}/{1}",null],[30016,"Text_Content_11013","Time's up!","时间到！",null],[30017,"Text_Content_12001","The Murderer is on a killing spree!","凶手大杀特杀！",null],[30018,"Text_Content_12002","The Murderer kills all the players!","凶手轻松解决了所有人！",null],[30019,"Text_Content_12003","Detective arrested the Murderer!","侦探逮捕了凶手！",null],[30020,"Text_Content_12004","Hero appeared and turned the tide!","一位英雄出现并逆转了局面！",null],[30021,"Text_Content_12005","Murderer seems to be missing something...","凶手似乎遗漏了什么...",null],[30022,"Text_Content_12006","Murderer seems to be missing something...","凶手似乎遗漏了什么...",null],[30023,"Text_Content_20001","Murder Mystery","合宿谜团",null],[30024,"Text_Content_20002","Start","开始",null],[30025,"Text_Content_20003","View","观战",null],[30026,"Text_Content_20004","View Countdown","观战倒计时",null],[30027,"Text_Content_20005","He is playing as:","他的身份是",null],[30028,"Text_Content_20006","Goals for your Identity","身份目标",null],[30029,"Text_Content_20007","Start","开始",null],[30030,"Text_Content_20008","Loading...","加载中...",null],[30031,"Tips_Content_20002","Insufficient currency","货币不足",null],[30032,"Text_Content_20009","Shop","商店",null],[30033,"Text_Content_20010","For Murderers","凶手专用",null],[30034,"Text_Content_20011","For Detectives","侦探专用",null],[30035,"Text_Content_20012","Gun","枪",null],[30036,"Text_Content_20013","Knife","刀",null],[30037,"Text_Content_20014","Acc","挂件",null],[30038,"Text_Content_20015","Buy","购买",null],[30039,"Text_Content_20016","Use","使用",null],[30040,"Text_Content_20017","Take Off","脱下",null],[30041,"Text_Content_20018","Buy Items","购买物品",null],[30042,"Text_Content_20019","For the Murderers","凶手专用",null],[30043,"Text_Content_20020","For Detectives","侦探专用",null],[30044,"Text_Content_20021","Confirm","确定",null],[30045,"Text_Content_20022","Cancel","取消",null],[30046,"Text_Content_20023","Tap anywhere to go back","点击任意一处返回",null],[30047,"Text_Content_20024","Purchase Successfully","购买成功",null],[30048,"Text_Content_20025","Use","使用",null],[30049,"Text_Content_10301","Please select a map to play","请选择要游玩的地图",null],[30050,"Text_Content_10302","Map Selected","地图已选出",null],[30051,"Text_Content_10004","Randomizing","随机地图中",null],[30052,"Text_Content_20029","Trail","拖尾",null],[30053,"Text_Content_20030","Get it for free","免费领取",null],[30054,"Text_Content_20031","Watch ads to get extra rewards","观看广告领取额外奖励",null],[30055,"Text_Content_20032","Watch the ad to receive compensation","观看广告领取补偿",null],[30056,"Text_Content_20033","Congratulations on receiving","恭喜获得",null],[30057,"Tips_Content_20003","It's not ready yet, please wait a little longer to get it~","时间还没到，再等一下才能获得哦~",null],[30058,"Tips_Content_20004","You've already received plenty of rewards today, so please come back tomorrow~","今天已经得到很多奖励了，明天再来吧~",null],[30059,"Text_Content_11014","Available","待拾取",null],[30060,"Text_Content_11015","Exist","存在",null],[30061,"Text_Content_11016","Survival experience +{0}EXP","存活经验+{0}EXP",null],[30062,"Text_Content_12007","Reward","奖励",null],[30063,"Text_Content_12008","Identity","本局身份",null],[30064,"Text_Content_12009","Coins","收集金币",null],[30065,"Text_Content_12010","Defeats {0}","消灭了{0}名学生！",null],[30066,"Text_Content_12011","Survived for {0}mins {1} s","已存活{0}分{1}秒",null],[30067,"Text_Content_12012","Saved {0} Students","拯救了{0}位学生",null],[30068,"Text_Content_12013","Saved {0} Students","拯救了{0}位学生",null],[30069,"Text_Content_12014","× 1.5 (Bonus)","× 1.5 ( 胜利奖励)",null],[30070,"Text_Content_12015","+ 900 (Bonus )","+ 900 ( 胜利奖励)",null],[30071,"Text_Content_12016","Watch ads to get double coins!","观看广告，获得双倍金币！","UI按钮上的文字"],[30072,"Text_Content_12017","GET","观看","UI按钮上的文字"],[30073,"Text_Content_12018","Lottery","抽奖","UI按钮上的文字"],[30074,"Text_Content_12019","Weapon Box","武器箱","UI按钮上的文字"],[30075,"Text_Content_12020","Watch the ad for a free draw","观看广告，免费抽奖一次","UI按钮上的文字"],[30076,"Text_Content_12021","Until the next free draw:","距离下次免费：","UI按钮上的文字"],[30077,"Text_Content_12022","Your draws","累计抽奖","UI按钮上的文字"],[30078,"Text_Content_12023","Next time you will get a RED quality weapon","下次必得红色品质武器","UI按钮上的文字"],[30079,"Text_Content_12024","Box opening...","正在打开箱子...","UI按钮上的文字"],[30080,"Text_Content_12025","Congratulations!","恭喜获得","UI按钮上的文字"],[30081,"Text_Content_12026","Owned, automatically recycled to gold coins","已拥有，自动回收为金币","UI按钮上的文字"],[30082,"Text_Content_11017","Defeat everyone and leave no one out!","击败所有人，一个也不要放过！",null],[30083,"Text_Content_11018","You are Detective, defeat the Murderer!","你是侦探，寻找凶手并击败他！",null],[30084,"Text_Content_11019","You're the Hero, find the Murderer and defeat him!","你化身英雄，找到凶手击败他！",null],[30085,"Text_Content_11020","Survive...","活下去...",null],[30086,"Text_Content_20034","Terminator!","本轮终结者！",null],[30087,"Text_Content_20035","Lottery","抽奖获得",null],[40001,"Tips_Content_10001","Please pick up your weapon first!","请先拿出武器！","40000：提示表"],[40002,"Tips_Content_10002","You are a Hero now! Pick up your weapon and attack!","变成了英雄！可以拿出武器攻击了！",null],[40003,"Tips_Content_10003","Energy balls collected +1~","收集能量球数量+1~",null],[40004,"Tips_Content_10004","Energy balls obtained in this round is full!","本局获得能量球数量已满！",null],[40005,"Tips_Content_10005","Energy shield obtained! You can resist an attack now!","获得了能量保护壳！可以抵挡一次攻击！",null],[40006,"Tips_Content_10006","Energy shield is shattered! Be careful!","能量保护壳被击碎了！小心！",null],[40007,"Tips_Content_10007","Energy of the shield is absorbed...","保护壳的能量被吸收了...",null],[40008,"Tips_Content_10008","Coin Bag is full!","金币袋已满！",null],[40009,"Tips_Content_10009","Someone died!","有人倒下了！",null],[40010,"Tips_Content_10010","The Detective is dead, find his weapon!","侦探死亡了，找找他的武器吧！",null],[40011,"Tips_Content_20001","There are currently no active matches!","当前没有正在进行的对局！",null],[40012,"Tips_Content_20005","Correct Password","密码输入正确",null],[40013,"Tips_Content_20006","Wrong Password！","密码输入错误！",null],[40014,"Tips_Content_20007","Weapon skins！Click to go！","免费抽取武器皮肤，点击前往！",null],[40015,"Tips_Content_20008","Ad in CD","广告冷却中",null],[50001,"Weapon_WeaponName_10001","Knife","小刀","50000：武器表"],[50002,"Weapon_WeaponName_20001","Revolver","左轮手枪",null],[50003,"Weapon_WeaponName_10002","Fire Axe","消防斧","武器名称"],[50004,"Weapon_WeaponName_10003","Nepalese Knife","尼泊尔军刀","武器名称"],[50005,"Weapon_WeaponName_20002","Submachine Gun","冲锋枪","武器名称"],[50006,"Weapon_WeaponName_20003","Rifle","步枪","武器名称"],[50007,"Weapon_WeaponName_10004","Assassin Dagger","暗杀匕首","武器名称"],[50008,"Weapon_WeaponName_10005","Survival Dagger","求生匕首","武器名称"],[50009,"Weapon_WeaponName_10006","Kitchen Knife","菜刀","武器名称"],[50010,"Weapon_WeaponName_10007","Dart (Wave)","镖(波)","武器名称"],[50011,"Weapon_WeaponName_10008","Dart (Fetter)","镖(桎)","武器名称"],[50012,"Weapon_WeaponName_10009","Dart (Shatter)","镖(碎)","武器名称"],[50013,"Weapon_WeaponName_10010","Dart (Swirl)","镖(漩)","武器名称"],[50014,"Weapon_WeaponName_10011","Dart (Qi)","镖(气)","武器名称"],[50015,"Weapon_WeaponName_10012","Dart (Stirring)","镖(激荡)","武器名称"],[50016,"Weapon_WeaponName_10013","Dart (Seal)","镖(封印)","武器名称"],[50017,"Weapon_WeaponName_10014","Dart (Fate)","镖(轮回)","武器名称"],[50018,"Weapon_WeaponName_10015","Dogfish","狗鱼","武器名称"],[50019,"Weapon_WeaponName_10016","Hairy-nosed catfish","毛鼻鲶","武器名称"],[50020,"Weapon_WeaponName_10017","Goldfish","金鱼","武器名称"],[50021,"Weapon_WeaponName_10018","Tuna","金枪鱼","武器名称"],[50022,"Weapon_WeaponName_10019","Lobster","龙虾","武器名称"],[50023,"Weapon_WeaponName_10020","Oarfish","皇带鱼","武器名称"],[50024,"Weapon_WeaponName_10021","Miracle Conch","神奇海螺","武器名称"],[50025,"Weapon_WeaponName_10022","King Trident","海王三叉戟","武器名称"],[50027,"Lottery_Name_10001","Dart Weapon Box","飞镖武器箱","武器箱子名称"],[50028,"Lottery_Name_10002","Ocean Weapon Box","深海武器箱","武器箱子名称"],[60001,"AIData_AIName_90001","Creabhop","Creabhop","60000：AI数据表"],[60002,"AIData_AIName_90002","Rival","Rival",null],[60003,"AIData_AIName_90003","Ironpup","Ironpup",null],[60004,"AIData_AIName_90004","TonyXenos","TonyXenos",null],[60005,"AIData_AIName_90005","L8s","L8s",null],[60006,"AIData_AIName_90006","Crilm","Crilm",null],[60007,"AIData_AIName_90007","Himiko Toga","Himiko Toga",null],[60008,"AIData_AIName_90008","Rocco21","Rocco21",null],[60009,"AIData_AIName_90009","Elysian","Elysian",null],[60010,"AIData_AIName_90010","Bunny Rat","Bunny Rat",null],[60011,"AIData_AIName_90011","Zaptar","Zaptar",null],[70001,"Level_Name_10000","Hall","大厅",null],[70002,"Level_Name_10001","Night Bar","夜色酒吧","关卡地图名称"],[70003,"Level_Name_10002","Barbiesville","芭比小镇","关卡地图名称"],[70004,"Level_Name_10003","Pool Party","泳池派对","关卡地图名称"],[80001,"Item_Name_20001","Smoke","烟雾","拖尾道具"],[80002,"Item_Name_20002","Aura","紫电","拖尾道具"],[80003,"Item_Name_20003","Thunder","雷霆","拖尾道具"],[80004,"Item_Name_20004","Breeze","清风","拖尾道具"],[80005,"Item_Name_20005","Rainbow","虹彩","拖尾道具"],[80006,"Item_Name_20006","Dream","梦幻","拖尾道具"],[80007,"Item_Name_30001","Gentle Senpai","温柔学姐","套装名称"],[80008,"Item_Name_30002","Discipline Member","风纪委员","套装名称"],[80009,"Item_Name_30003","Bad Girl","不良少女","套装名称"],[80010,"Item_Name_30004","Korean Girl","韩式淑女","套装名称"],[80011,"Item_Name_30005","Cute School Girl","可爱学妹","套装名称"],[80012,"Item_Name_30006","Fantasy Girl","奇幻少女","套装名称"],[80013,"Item_Name_30007","Gentle Senior","温柔学长","套装名称"],[80014,"Item_Name_30008","Bad Boy","不良少年","套装名称"],[80015,"Item_Name_30009","Cheerleader","啦啦队长","套装名称"],[80016,"Item_Name_30010","Art Student","艺术生","套装名称"],[80017,"Item_Name_30011","Anime Girl","二次元少女","套装名称"],[80018,"Item_Name_30012","English Teacher","英语老师","套装名称"],[80019,"Item_Name_30013","Justice Boy","正义少年","套装名称"],[80020,"Item_Name_30014","Trendy Girl","潮流少女","套装名称"],[80021,"Item_Name_30015","Student President","学生会长","套装名称"],[80022,"Item_Name_30016","Female Teacher","女老师","套装名称"],[80023,"Item_Name_30017","Class Monitor","班主任","套装名称"],[80024,"Item_Name_30018","Sea Girl","海边姐姐","套装名称"],[80025,"Item_Name_30019","Girl Next Door","邻家妹妹","套装名称"],[80026,"Item_Name_30020","Fitness Coach","健身教练","套装名称"],[80027,"Item_Name_30021","Elegant Girl","优雅少女","套装名称"],[80028,"Item_Name_30022","The Adventurer","探险家","套装名称"],[80029,"Item_Name_30023","Chinese Student","民国学生","套装名称"],[80030,"Item_Name_30024","Cocoa Girl","可可少女","套装名称"],[80031,"Item_Name_30025","Cat Shopkeeper","猫猫店员","套装名称"],[80032,"Item_Name_30026","Sweet Maid","女仆甜心","套装名称"],[80033,"Item_Name_30027","Cat-eared Maid","猫耳女仆","套装名称"],[80034,"Item_Name_30028","Girl Idol","少女偶像","套装名称"],[80035,"Item_Name_30029","Christmas Girl","圣诞少女","套装名称"],[80036,"Item_Name_20007","Flame","火焰","拖尾道具"],[80037,"Item_Name_20008","Witch","女巫","拖尾道具"],[80038,"Item_Name_20009","Knight","骑士","拖尾道具"],[80039,"Item_Name_20010","Demon","恶魔","拖尾道具"],[80040,"Item_Name_20011","Devil","魔鬼","拖尾道具"],[90001,"Chat_chat_1","I am {1}!","我是{1}~",null],[90002,"Chat_chat_2","Who is the murderer?","凶手是谁？",null],[90003,"Chat_chat_3","Help!","救命！",null],[90004,"Chat_chat_4","Thank you!","谢谢你！",null],[90005,"Chat_chat_5","Hello!","你好！",null],[90006,"Chat_chat_6","Don't kill me :(((","别刀我QAQ","QAQ希望也本地化一下，换成欧美比较熟悉的颜表情"],[90007,"Chat_chat_7","Stay away from me!","退！退！退！",null],[90008,"Chat_chat_8","Perfect!","满分操作~",null],[90009,"Chat_chat_9","Show time!","我要开始表演了~",null],[90010,"Text_Content_20042","Student","学生",null],[90011,"Text_Content_20043","Detective","侦探",null],[90012,"Text_Content_20044","Murderer","凶手",null],[90013,"Text_Content_20036","1. The Murderer can attack in two ways\n2. In melee attack mode, you will auto wave knife when aproaching other players.\n3. An aming sign will appear when you are nearby a target. Tap the sign to attack.","1.凶手有近战穿刺、远程飞刀两种方式，可以自由切换\n2.在近战状态下，靠近其他玩家并面向他们，就可以自动挥刀击杀\n3.在远程状态下，附近有可攻击的目标时，会出现瞄准标志，点击标志即可扔出飞刀","文本长度尽量和中文一致"],[90014,"Text_Content_20037","1. The detective can shoot in two ways.\n2. An aming sign will appear when holding the gun nearby a target. Tap the sign to fire.\n3. Also, you can tap any position to fire at.","1.侦探可以开枪进行射击，有两种射击方法\n2.在持枪状态下，附近有可攻击目标时，会出现瞄准标志，点击标志即可发射子弹\n3.除此之外，持枪状态下点击任意位置都可以发射子弹哦~","文本长度尽量和中文一致"],[90015,"Text_Content_20038","1. If you are a murderer/detective, try not to reveal your identity.\n2. Don't trust anyone who tries to get close to you, they are dangerous, always stay alert.\n3. If you are a student, try to survive!","1.如果你是杀手/侦探，请尽量不要暴露自己的身份\n2.不要相信任何试图靠近你的人，他们很危险，时刻保持警惕\n3.假如你是平民，那么努力活下来吧","文本长度尽量和中文一致"],[90016,"Text_Content_20039","Murderer Tutorial","凶手教学",null],[90017,"Text_Content_20040","Detective Tutorial","侦探教学",null],[90018,"Text_Content_20041","Tips","温馨提示",null],[90019,"Tips_Content_20009","The murderer defeated you.","凶手淘汰了你",null],[90020,"Tips_Content_20010","Wrong target, you're eliminated.","目标错误，你被淘汰了",null],[90021,"Tips_Content_20011","You have been eliminated by the detective.","已被正义的警探消灭",null],[90022,"Text_Content_12027","Power Store","能力商店",null],[90023,"Text_Content_12028","Power Details","能力详情",null],[90024,"Text_Content_12029","Equip","装备","动词"],[90025,"Text_Content_12030","Remove","卸下",null],[90026,"Text_Content_12031","Coin Purchase","金币购买",null],[90027,"Text_Content_12032","Diamond Purchase","钻石购买",null],[90028,"Text_Content_12033","Equipped","装备中","指“已装备”"],[90029,"Text_Content_12034","Owned","已拥有",null],[90030,"Tips_Content_10011","Purchase successfully!","购买成功",null],[90031,"Tips_Content_10012","Purchase failed","货币不足，再攒攒吧~",null],[90032,"SkillShop_Name_10001","Killer Pace","杀手步伐","杀手的特殊能力名称"],[90033,"SkillShop_Name_10002","Quick Throw","快速投掷","杀手的特殊能力名称"],[90034,"SkillShop_Name_10003","Explosive Knife","爆炸飞刀","杀手的特殊能力名称"],[90035,"SkillShop_Description_10001","[Murderer's Passive Ability] When you pull out your knife, your movement speed is increased by 10% faster than usual.","【杀手被动能力】\n当你掏出你的刀时，你的移动速度会比平时更快，提升10％",null],[90036,"SkillShop_Description_10002","[Murderer's Passive Ability] Now your thrown flying knives will fly faster, boosted by 100%!","【杀手被动能力】\n现在你扔出的飞刀会飞得更快，提升100％",null],[90037,"SkillShop_Description_10003","[Murderer Passive Ability] When your throwing knife hits a target, instead of immediately dealing damage to the target, it plants a bomb. The bomb will explode after a small delay and deal damage to players around a certain range.","【杀手被动能力】\n当你的飞刀命中目标时，不会立即对目标造成伤害，而是在目标处埋下一颗炸弹，延迟一小段时间后会爆炸，并对周围一定范围内的玩家同样造成伤害",null],[90038,"Shop_Name_40001","Skibidi Rainbow Toilet","彩虹马桶人","马桶人是外网热梗，就叫skibidi toilet"],[90039,"Shop_Name_40002","Skibidi Princess Toilet","公主马桶人","马桶人是外网热梗，就叫skibidi toilet"],[90040,"Shop_Name_40003","Skibidi Space Toilet","太空马桶人","马桶人是外网热梗，就叫skibidi toilet"],[90041,"Shop_Name_40004","Skibidi Spider Toilet","蜘蛛马桶人","马桶人是外网热梗，就叫skibidi toilet"],[90042,"Shop_Name_40005","Cameraman","监控人","马桶人系列，就叫这个"],[90043,"Shop_Name_40006","Speakerman","音响人","马桶人系列，就叫这个"],[90044,"Shop_Name_40007","TV Man","电视人","马桶人系列，就叫这个"],[90045,"Shop_Name_40008","Cartoon Speakerman","卡通音响人",null],[90046,"Shop_Name_40009","Cartoon TVman","卡通电视人",null],[90047,"Text_Content_10005","This update:\n1. New [Skibidi Toilet VS Cameraman] series of pendants, welcome to the shop!\n2. New [Power Store], the configuration of the murderer's special abilities is now available!\n3. Optimised the operating experience of detectives, murderers, and the related interface.\n4. Adjusted the lobby and level scenes to improve performance.\n5. New reset button, try to tap it when the camera stucks!","本次更新：\n1.新增【马桶人VS监控人】系列挂件，欢迎大家去商店选购~\n2.新增【能力商店】，开放杀手局内特殊能力的配置\n3.优化了侦探、凶手的操作手感及相关界面\n4.调整大厅及关卡场景，提升性能\n5.新增还原按钮，镜头卡住的时候点一下试试吧","马桶人是外网热梗，就叫skibidi toilet"],[90048,"Tips_Content_10013","A player fails to enter the scene, the game will restart.","有玩家进入场景失败，对局将重新开始",null],[90049,"Text_Content_10006","Jump","跳转",null],[90050,"Text_Content_20045","Pull out gun","掏出手枪",null],[90051,"Text_Content_20046","Put away gun","收起手枪",null],[90052,"Text_Content_20047","Aim Sign","准星图标",null],[90053,"Text_Content_20048","Melee mode","掏出近战匕首",null],[90054,"Text_Content_20049","Throwing mode","掏出远程飞刀",null],[90055,"Text_Content_20050","Put away knife","收起武器",null],[90056,"Text_Content_20051","A","暂无获取途径",null],[90057,"Lottery_Name_10003","Sci-Fi Weapon Box","科幻武器箱",null],[90058,"Lottery_Name_10004","Myth Weapon Box","神话武器箱",null],[90059,"Weapon_WeaponName_20004","Gun of Singularity","奇点之枪",null],[90060,"Weapon_WeaponName_10023","Staff of Imaginary","虚数之杖",null],[90061,"Weapon_WeaponName_10024","Spectral Spear","光谱矛",null],[90062,"Weapon_WeaponName_20005","Anti-Matter Gun","反物质枪",null],[90063,"Weapon_WeaponName_10025","Spectral Blade","光谱剑",null],[90064,"Weapon_WeaponName_10026","Spectral Blade (Ruby)","光谱剑(晶红)",null],[90065,"Weapon_WeaponName_10027","Dagger (Simulacrum)","匕首(模拟)",null],[90066,"Weapon_WeaponName_10028","Saber (Simulacrum)","军刀(模拟)",null],[90067,"Weapon_WeaponName_20006","Revolver (Simulacrum)","左轮(模拟)",null],[90068,"Weapon_WeaponName_20007","SMG (Simulacrum)","冲锋枪(模拟)",null],[90069,"Weapon_WeaponName_10029","Storm Caller (Rune)","唤雷(符文)",null],[90070,"Weapon_WeaponName_20008","Sun Seeker (Rune)","逐日(符文)",null],[90071,"Weapon_WeaponName_10030","Hammer of Thor","雷神之锤",null],[90072,"Weapon_WeaponName_20009","Blunderbuss","火铳",null],[90073,"Weapon_WeaponName_10031","Bonespike Sword (Devine)","骨刺剑(圣)",null],[90074,"Weapon_WeaponName_20010","Revolver (Devine)","左轮(圣)",null],[90075,"Weapon_WeaponName_10032","Bonespike Sword (Love)","骨刺剑(恋)",null],[90076,"Weapon_WeaponName_20011","Revolver (Love)","左轮(恋)",null],[90077,"Weapon_WeaponName_10033","Bonespike Sword (Flame)","骨刺剑(炽)",null],[90078,"Weapon_WeaponName_10034","Bonespike Sword (Frost)","骨刺剑(霜)",null],[90079,"Weapon_WeaponName_10035","Sakura","樱",null],[90080,"Weapon_WeaponName_20012","Butterfly","蝶",null],[90081,"Weapon_WeaponName_10036","Golden Bat (Rainbow)","黄金球棍(虹彩)",null],[90082,"Weapon_WeaponName_20013","Golden Revolver (Rainbow)","黄金左轮(虹彩)",null],[90083,"SkillShop_Name_10004","Ghost's Cloak","幽灵斗篷",null],[90084,"SkillShop_Description_10004","[Murderer Active Ability] When active, you become invisable for 5 secs, eliminating any player will instantly end the ghost‘s cloak","【杀手主动能力】\n激活后，你可以隐身5秒，若你在隐身时击败了任何玩家，则会立即结束隐身",null],[90085,"Tips_Content_20012","Successful exchange","兑换成功",null],[90086,"Tips_Content_20013","Conversion failure","兑换失败",null],[90087,"Tips_Content_20014","Congratulations on activating membership privileges","恭喜激活会员特权",null],[90088,"Tips_Content_20015","Congratulations on activating Super Privilege","恭喜激活超级特权",null],[90089,"Tips_Content_20016","Membership privileges have expired","会员特权已到期失效",null],[90090,"Tips_Content_20017","The super privilege has expired","超级特权已到期失效",null],[90091,"Tips_Content_20018","The number of holdings has reached its limit","持有数量已经达到上限",null],[90092,"Text_Content_20052","Exchange","兑换",null],[90093,"Text_Content_20053","skip","跳转",null],[90094,"Text_Content_20054","Member privileges active","会员特权激活中",null],[90095,"Text_Content_20055","Remaining activation time {0}","剩余激活时间{0}",null],[90096,"Text_Content_20056","Member privileges have not been activated","尚未激活会员特权",null],[90097,"Text_Content_20057","Super privilege has not been activated","尚未激活超级特权",null],[90098,"Text_Content_20058","Remaining activation time {0} days","剩余激活时间{0}天",null],[90099,"Text_Content_20059","Membership privileges","会员特权",null],[90100,"Text_Content_20060","Super privilege","超级特权",null],[90101,"Tips_Content_20019","Congratulations on getting an advertising voucher *1","恭喜获得广告券*1",null],[90102,"Item_Name_20012","Here comes the Tuhao","土豪来啦",null],[90103,"SkillShop_Name_10005","Quick throw\nexperience pass","快速投掷体验券",null],[90104,"SkillShop_Name_10006","Explosive knife\nexperience coupon","爆炸飞刀体验券",null],[90105,"SkillShop_Name_10007","Ghost Cloak\nexperience pass","幽灵斗篷体验券",null],[90106,"SkillShop_Description_10005","【 Killer passivity 】\nThe knife you throw will now fly faster, increasing by 100%","【杀手被动能力】\n现在你扔出的飞刀会飞得更快，提升100％","和上面一样"],[90107,"SkillShop_Description_10006","【 Killer passivity 】\nWhen your throwing knife hits a target, it does not deal immediate damage to the target, but instead plants a bomb at the target, which explodes after a short delay and also deals damage to players within a certain radius","【杀手被动能力】\n当你的飞刀命中目标时，不会立即对目标造成伤害，而是在目标处埋下一颗炸弹，延迟一小段时间后会爆炸，并对周围一定范围内的玩家同样造成伤害","和上面一样"],[90108,"SkillShop_Description_10007","【 Killer initiative 】\nOnce activated, you can be invisible for 5 seconds, and if you beat any player while cloaking, the cloaking ends immediately","【杀手主动能力】\n激活后，你可以隐身5秒，若你在隐身时击败了任何玩家，则会立即结束隐身","和上面一样"],[90109,"Tips_Content_20020","There are not enough golden keys","金钥匙数量不足",null],[90110,"Tips_Content_20021","This version does not support large membership","这个版本不支持开通大会员",null],[90111,"Weapon_WeaponName_10037","Purple Lightsaber","紫光剑",null],[90112,"Weapon_WeaponName_20014","Ice bow and arrow","冰寒弓箭",null],[90113,"Item_Name_20013","Firework tail","烟花拖尾",null],[90114,"Item_Name_20014","Firecracker tail","爆竹拖尾",null],[90115,"Item_Name_20015","Gift trail","礼物拖尾",null],[90116,"Item_Name_20016","Candy tail","糖果拖尾",null],[90117,"Item_Name_20017","Poop trail","便便拖尾",null],[90118,"Shop_Name_40010","Flame wing"," 火焰翅膀",null],[90119,"Shop_Name_40011","Flame wing","火焰翅膀",null],[90120,"Shop_Name_40012","Drainage wing","水系翅膀",null],[90121,"Shop_Name_40013","Dark wing","黑暗翅膀",null],[90122,"Shop_Name_40014","Devil wing","恶魔翅膀",null],[90123,"Shop_Name_40015","Ghost wing","恶灵翅膀",null],[90124,"Shop_Name_40016","Angel wings","天使翅膀",null],[90125,"Shop_Name_40017","Angel wings","六翼翅膀",null],[100001,"Text_FreeCoupon","Free Coupon","免费领券",null],[100002,"Text_Set","Set","设置",null],[100003,"Text_Pay","Pay","充值",null],[100004,"Text_HUD_SkillShop","Skill","能力商店",null],[100005,"Text_Shop_Skin","Skin","皮肤",null],[100006,"Text_VoucherExchange","Voucher Exchange","广告券兑换",null],[100007,"Text_ASmallPileOfGoldCoins","Small Pile Of Gold Coins","一小堆金币",null],[100008,"Text_APileOfGoldCoins","Pile Of Gold Coins","一大堆金币",null],[100009,"Text_LimitedWeaponSakura","Limited Weapon\nSakura","限定武器-樱",null],[100010,"Text_LimitedWeaponButterfly","Limited Weapon\nButterfly","限定武器-蝶",null],[100011,"Text_LimitedWeaponPurpleLightsaber","Limited Weapon\nPurple Lightsaber","限定武器-紫光剑",null],[100012,"Text_LimitedWeaponIceBow","Limited Weapon\nIce Bow","限定武器-冰寒弓箭",null],[100013,"Text_Expend","Expend","消耗",null],[100014,"Text_KillerPowerAssembly","Killer Power Assembly","凶手能力装配",null],[100015,"Text_Ads_1","Free Reward","免费奖励",null],[100016,"Text_Ads_2","{0} Failed, Please Try Again","{0}失败，请重试",null],[100017,"Text_Ads_3","Successful Costume Change","换装成功",null],[100018,"Text_Ads_4","See Ads For Free Fittings","看广告免费试穿",null],[100019,"Text_Ads_5","Free Try On","免费试穿",null],[100020,"Text_Ads_6","Congratulations On Winning {0} Gold","恭喜获得{0}金币",null],[100021,"Text_Ads_7","See Ads To Receive {0} Coins For Free","看广告免费领取{0}金币",null],[100022,"Text_Ads_8","Congratulations On Getting {0} Advertising Vouchers","恭喜获得{0}张广告券",null],[100023,"Text_Ads_9","Receive {0} Free Advertising Vouchers","免费领取{0}张广告券",null],[100024,"Text_Ads_10","Free Double Gold\nSend Another Advertising Voucher.","免费领取双倍金币\n再送一张广告券",null],[100025,"Text_FreeDraw","Free draw","免费抽奖",null],[100026,"Text_Ranking","Ranking","排名",null],[100027,"Text_nickname","nickname","昵称",null],[100028,"Text_Altitude","Altitude","高度",null],[100029,"Text_StartSettlement","Start settlement","开始结算",null],[100030,"Text_PlayerIsDead","Player {0} is dead","玩家{0}死亡了",null],[100031,"Text_1","If a player fails to enter the scene, the game restarts","有玩家没有成功进入场景，游戏重新开始",null],[100032,"Text_World1","Don't reveal your identity easily\nStay away from people who try to get close to you\nDon't trust anyone.\nEveryone can be dangerous!","不要轻易暴露自己的身份\n远离那些试图靠近你的人\n不要相信任何人\n每个人都可能很危险!",null],[100033,"Text_World2","Pull out your pistol and tap the screen to fire\nFind the hidden killer and defeat him!\nDon't attack civilians.","掏出手枪后，点击屏幕射击\n找到隐藏的凶手，击败他!\n不要攻击平民",null],[100034,"Text_World3","When you pull out a melee weapon, it will automatically attack surrounding players\nAfter taking out the long range knife, click the crosshairs to throw it\nBeat them all! Watch out, detective!","掏出近战武器后，会自动攻击周围玩家\n掏出远程飞刀后，点击准星来扔出\n击败所有人，小心侦探!",null],[100035,"Text_World4","Restore default image","恢复默认形象",null],[100036,"Text_Task1","non-repeatable","不能重复领取",null],[100037,"Text_Task2","Online for less than {0} minutes","在线时间不足{0}分钟",null],[100038,"Text_Task3","Claimed","已领取",null],[100039,"Text_Task4","Bonus Gold","奖励金币",null],[100040,"Text_Task5","Tomorrow's Reward","明日奖励",null],[100041,"Text_Task6","Free Online {0} Minutes ({1}/{2})","在线{0}分钟免费领取({1}/{2})",null],[100042,"Text_Task7","Receive successfully, open the shop to use","领取成功、打开商店使用",null],[100043,"Text_SoldouttodayPleaseReplaceWithOtherProductsToPurchase","Sold Out Today, Please Replace With Other Products To Purchase","今日已售空,请更换其他商品购买",null],[100044,"Text_Rechargediamonds","Recharge","充值广告券",null],[100045,"Text_Nopurchaserestrictions","No purchase Restrictions","不限购",null],[100046,"Text_Soldouttoday","Sold Out Today","今日已售空",null],[100047,"Text_Limitedtoonepurchaseperday","Limited To One Purchase Per Day","每天限购一次",null],[100048,"Text_AdvertisingCoupon","Coupon","广告券",null],[100049,"Text_TipsTooFast","Don't order too fast","别点太快",null],[100050,"Text_ChangeClothes","Clothes","超级装扮",null],[100051,"Level_Name_10004","Terror Campus","恐怖校园",null]];
export interface ILanguageElement extends IElementBase{
 	/**ID*/
	ID:number
	/**名字*/
	mur:string
	/**英文*/
	Value:string
	/**备注*/
	Comment:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**这里是本局中你的身份*/
	get Guide_GuideContent_10001():ILanguageElement{return this.getElement(10001)};
	/**这里是你本局的目标，不知道做什么的话就看一下这里吧*/
	get Guide_GuideContent_10002():ILanguageElement{return this.getElement(10002)};
	/**努力活下来才能够获得胜利~*/
	get Guide_GuideContent_10003():ILanguageElement{return this.getElement(10003)};
	/**这是能量球：*/
	get Guide_GuideContent_10004():ILanguageElement{return this.getElement(10004)};
	/**集齐能量球，可以获得一层保护壳*/
	get Guide_GuideContent_10005():ILanguageElement{return this.getElement(10005)};
	/**这里是你本局的目标，在对局结束前完成目标才能获得胜利*/
	get Guide_GuideContent_10006():ILanguageElement{return this.getElement(10006)};
	/**这里是你本局的目标，在对局结束前完成目标才能获得胜利*/
	get Guide_GuideContent_10007():ILanguageElement{return this.getElement(10007)};
	/**你有了新的目标，击杀凶手，保护学生*/
	get Guide_GuideContent_10008():ILanguageElement{return this.getElement(10008)};
	/**这里是本局中你的身份*/
	get Guide_GuideContent_10009():ILanguageElement{return this.getElement(10009)};
	/**这里是本局中你的身份*/
	get Guide_GuideContent_10010():ILanguageElement{return this.getElement(10010)};
	/**恭喜你拾取到武器，现在你成为了一名英雄*/
	get Guide_GuideContent_10011():ILanguageElement{return this.getElement(10011)};
	/**本局游戏内获得的金币将存储在这里，结算时会发放给你；不过金币袋是有上限的，袋子装满就无法获得了*/
	get Guide_GuideContent_20001():ILanguageElement{return this.getElement(10012)};
	/**金币袋已经满了，本局无法再拾取金币了*/
	get Guide_GuideContent_20002():ILanguageElement{return this.getElement(10013)};
	/**点击这里可以切换姿态，选择亮出武器或藏起武器*/
	get Guide_GuideContent_30001():ILanguageElement{return this.getElement(10014)};
	/**在亮出武器后，可以点击这里进行攻击*/
	get Guide_GuideContent_30002():ILanguageElement{return this.getElement(10015)};
	/**点击这里可以切换姿态，选择亮出武器或藏起武器*/
	get Guide_GuideContent_30003():ILanguageElement{return this.getElement(10016)};
	/**在亮出武器后，可以点击这里进行攻击*/
	get Guide_GuideContent_30004():ILanguageElement{return this.getElement(10017)};
	/**点击这里可以切换姿态，选择亮出武器或藏起武器*/
	get Guide_GuideContent_30005():ILanguageElement{return this.getElement(10018)};
	/**在亮出武器后，可以点击这里进行攻击*/
	get Guide_GuideContent_30006():ILanguageElement{return this.getElement(10019)};
	/**恭喜你集齐了道具！现在你获得了一个保护壳！保护壳可以为你抵挡一次来自其他玩家的攻击，但是每局游戏只能获得一次*/
	get Guide_GuideContent_40001():ILanguageElement{return this.getElement(10020)};
	/**现在你的第一局游戏已经结束，来看看结算面板吧*/
	get Guide_GuideContent_50001():ILanguageElement{return this.getElement(10021)};
	/**这里说明了对局的最终结果*/
	get Guide_GuideContent_50002():ILanguageElement{return this.getElement(10022)};
	/**这里显示了对对局产生影响最大的两方玩家和他们的胜负*/
	get Guide_GuideContent_50003():ILanguageElement{return this.getElement(10023)};
	/**这里显示了你在本轮对局获得的收益*/
	get Guide_GuideContent_50004():ILanguageElement{return this.getElement(10024)};
	/**代表正义的你不可以乱开枪，攻击好人会导致自己死亡*/
	get Guide_GuideContent_60001():ILanguageElement{return this.getElement(10025)};
	/**侦探*/
	get Identity_IdentityName_10001():ILanguageElement{return this.getElement(20001)};
	/**凶手*/
	get Identity_IdentityName_10002():ILanguageElement{return this.getElement(20002)};
	/**学生*/
	get Identity_IdentityName_10003():ILanguageElement{return this.getElement(20003)};
	/**英雄*/
	get Identity_IdentityName_10004():ILanguageElement{return this.getElement(20004)};
	/**当前人数不足*/
	get Text_Content_10001():ILanguageElement{return this.getElement(30001)};
	/**对局进行中*/
	get Text_Content_10002():ILanguageElement{return this.getElement(30002)};
	/**等待对局开始*/
	get Text_Content_10003():ILanguageElement{return this.getElement(30003)};
	/**游戏开始倒计时...*/
	get Text_Content_11001():ILanguageElement{return this.getElement(30004)};
	/**对局结束倒计时*/
	get Text_Content_11002():ILanguageElement{return this.getElement(30005)};
	/**你的身份是：*/
	get Text_Content_11003():ILanguageElement{return this.getElement(30006)};
	/**成为凶手的概率：*/
	get Text_Content_11004():ILanguageElement{return this.getElement(30007)};
	/**（参与对局将增加概率）*/
	get Text_Content_11005():ILanguageElement{return this.getElement(30008)};
	/**你的身份*/
	get Text_Content_11006():ILanguageElement{return this.getElement(30009)};
	/**你死了*/
	get Text_Content_11007():ILanguageElement{return this.getElement(30010)};
	/**胜利！*/
	get Text_Content_11008():ILanguageElement{return this.getElement(30011)};
	/**击杀所有人{0}/{1}*/
	get Text_Content_11009():ILanguageElement{return this.getElement(30012)};
	/**击杀凶手{0}/{1}*/
	get Text_Content_11010():ILanguageElement{return this.getElement(30013)};
	/**活下去*/
	get Text_Content_11011():ILanguageElement{return this.getElement(30014)};
	/**收集隐秘的能量球{0}/{1}*/
	get Text_Content_11012():ILanguageElement{return this.getElement(30015)};
	/**时间到！*/
	get Text_Content_11013():ILanguageElement{return this.getElement(30016)};
	/**凶手大杀特杀！*/
	get Text_Content_12001():ILanguageElement{return this.getElement(30017)};
	/**凶手轻松解决了所有人！*/
	get Text_Content_12002():ILanguageElement{return this.getElement(30018)};
	/**侦探逮捕了凶手！*/
	get Text_Content_12003():ILanguageElement{return this.getElement(30019)};
	/**一位英雄出现并逆转了局面！*/
	get Text_Content_12004():ILanguageElement{return this.getElement(30020)};
	/**凶手似乎遗漏了什么...*/
	get Text_Content_12005():ILanguageElement{return this.getElement(30021)};
	/**凶手似乎遗漏了什么...*/
	get Text_Content_12006():ILanguageElement{return this.getElement(30022)};
	/**合宿谜团*/
	get Text_Content_20001():ILanguageElement{return this.getElement(30023)};
	/**开始*/
	get Text_Content_20002():ILanguageElement{return this.getElement(30024)};
	/**观战*/
	get Text_Content_20003():ILanguageElement{return this.getElement(30025)};
	/**观战倒计时*/
	get Text_Content_20004():ILanguageElement{return this.getElement(30026)};
	/**他的身份是*/
	get Text_Content_20005():ILanguageElement{return this.getElement(30027)};
	/**身份目标*/
	get Text_Content_20006():ILanguageElement{return this.getElement(30028)};
	/**开始*/
	get Text_Content_20007():ILanguageElement{return this.getElement(30029)};
	/**加载中...*/
	get Text_Content_20008():ILanguageElement{return this.getElement(30030)};
	/**货币不足*/
	get Tips_Content_20002():ILanguageElement{return this.getElement(30031)};
	/**商店*/
	get Text_Content_20009():ILanguageElement{return this.getElement(30032)};
	/**凶手专用*/
	get Text_Content_20010():ILanguageElement{return this.getElement(30033)};
	/**侦探专用*/
	get Text_Content_20011():ILanguageElement{return this.getElement(30034)};
	/**枪*/
	get Text_Content_20012():ILanguageElement{return this.getElement(30035)};
	/**刀*/
	get Text_Content_20013():ILanguageElement{return this.getElement(30036)};
	/**挂件*/
	get Text_Content_20014():ILanguageElement{return this.getElement(30037)};
	/**购买*/
	get Text_Content_20015():ILanguageElement{return this.getElement(30038)};
	/**使用*/
	get Text_Content_20016():ILanguageElement{return this.getElement(30039)};
	/**脱下*/
	get Text_Content_20017():ILanguageElement{return this.getElement(30040)};
	/**购买物品*/
	get Text_Content_20018():ILanguageElement{return this.getElement(30041)};
	/**凶手专用*/
	get Text_Content_20019():ILanguageElement{return this.getElement(30042)};
	/**侦探专用*/
	get Text_Content_20020():ILanguageElement{return this.getElement(30043)};
	/**确定*/
	get Text_Content_20021():ILanguageElement{return this.getElement(30044)};
	/**取消*/
	get Text_Content_20022():ILanguageElement{return this.getElement(30045)};
	/**点击任意一处返回*/
	get Text_Content_20023():ILanguageElement{return this.getElement(30046)};
	/**购买成功*/
	get Text_Content_20024():ILanguageElement{return this.getElement(30047)};
	/**使用*/
	get Text_Content_20025():ILanguageElement{return this.getElement(30048)};
	/**请选择要游玩的地图*/
	get Text_Content_10301():ILanguageElement{return this.getElement(30049)};
	/**地图已选出*/
	get Text_Content_10302():ILanguageElement{return this.getElement(30050)};
	/**随机地图中*/
	get Text_Content_10004():ILanguageElement{return this.getElement(30051)};
	/**拖尾*/
	get Text_Content_20029():ILanguageElement{return this.getElement(30052)};
	/**免费领取*/
	get Text_Content_20030():ILanguageElement{return this.getElement(30053)};
	/**观看广告领取额外奖励*/
	get Text_Content_20031():ILanguageElement{return this.getElement(30054)};
	/**观看广告领取补偿*/
	get Text_Content_20032():ILanguageElement{return this.getElement(30055)};
	/**恭喜获得*/
	get Text_Content_20033():ILanguageElement{return this.getElement(30056)};
	/**时间还没到，再等一下才能获得哦~*/
	get Tips_Content_20003():ILanguageElement{return this.getElement(30057)};
	/**今天已经得到很多奖励了，明天再来吧~*/
	get Tips_Content_20004():ILanguageElement{return this.getElement(30058)};
	/**待拾取*/
	get Text_Content_11014():ILanguageElement{return this.getElement(30059)};
	/**存在*/
	get Text_Content_11015():ILanguageElement{return this.getElement(30060)};
	/**存活经验+{0}EXP*/
	get Text_Content_11016():ILanguageElement{return this.getElement(30061)};
	/**奖励*/
	get Text_Content_12007():ILanguageElement{return this.getElement(30062)};
	/**本局身份*/
	get Text_Content_12008():ILanguageElement{return this.getElement(30063)};
	/**收集金币*/
	get Text_Content_12009():ILanguageElement{return this.getElement(30064)};
	/**消灭了{0}名学生！*/
	get Text_Content_12010():ILanguageElement{return this.getElement(30065)};
	/**已存活{0}分{1}秒*/
	get Text_Content_12011():ILanguageElement{return this.getElement(30066)};
	/**拯救了{0}位学生*/
	get Text_Content_12012():ILanguageElement{return this.getElement(30067)};
	/**拯救了{0}位学生*/
	get Text_Content_12013():ILanguageElement{return this.getElement(30068)};
	/**× 1.5 ( 胜利奖励)*/
	get Text_Content_12014():ILanguageElement{return this.getElement(30069)};
	/**+ 900 ( 胜利奖励)*/
	get Text_Content_12015():ILanguageElement{return this.getElement(30070)};
	/**观看广告，获得双倍金币！*/
	get Text_Content_12016():ILanguageElement{return this.getElement(30071)};
	/**观看*/
	get Text_Content_12017():ILanguageElement{return this.getElement(30072)};
	/**抽奖*/
	get Text_Content_12018():ILanguageElement{return this.getElement(30073)};
	/**武器箱*/
	get Text_Content_12019():ILanguageElement{return this.getElement(30074)};
	/**观看广告，免费抽奖一次*/
	get Text_Content_12020():ILanguageElement{return this.getElement(30075)};
	/**距离下次免费：*/
	get Text_Content_12021():ILanguageElement{return this.getElement(30076)};
	/**累计抽奖*/
	get Text_Content_12022():ILanguageElement{return this.getElement(30077)};
	/**下次必得红色品质武器*/
	get Text_Content_12023():ILanguageElement{return this.getElement(30078)};
	/**正在打开箱子...*/
	get Text_Content_12024():ILanguageElement{return this.getElement(30079)};
	/**恭喜获得*/
	get Text_Content_12025():ILanguageElement{return this.getElement(30080)};
	/**已拥有，自动回收为金币*/
	get Text_Content_12026():ILanguageElement{return this.getElement(30081)};
	/**击败所有人，一个也不要放过！*/
	get Text_Content_11017():ILanguageElement{return this.getElement(30082)};
	/**你是侦探，寻找凶手并击败他！*/
	get Text_Content_11018():ILanguageElement{return this.getElement(30083)};
	/**你化身英雄，找到凶手击败他！*/
	get Text_Content_11019():ILanguageElement{return this.getElement(30084)};
	/**活下去...*/
	get Text_Content_11020():ILanguageElement{return this.getElement(30085)};
	/**本轮终结者！*/
	get Text_Content_20034():ILanguageElement{return this.getElement(30086)};
	/**抽奖获得*/
	get Text_Content_20035():ILanguageElement{return this.getElement(30087)};
	/**请先拿出武器！*/
	get Tips_Content_10001():ILanguageElement{return this.getElement(40001)};
	/**变成了英雄！可以拿出武器攻击了！*/
	get Tips_Content_10002():ILanguageElement{return this.getElement(40002)};
	/**收集能量球数量+1~*/
	get Tips_Content_10003():ILanguageElement{return this.getElement(40003)};
	/**本局获得能量球数量已满！*/
	get Tips_Content_10004():ILanguageElement{return this.getElement(40004)};
	/**获得了能量保护壳！可以抵挡一次攻击！*/
	get Tips_Content_10005():ILanguageElement{return this.getElement(40005)};
	/**能量保护壳被击碎了！小心！*/
	get Tips_Content_10006():ILanguageElement{return this.getElement(40006)};
	/**保护壳的能量被吸收了...*/
	get Tips_Content_10007():ILanguageElement{return this.getElement(40007)};
	/**金币袋已满！*/
	get Tips_Content_10008():ILanguageElement{return this.getElement(40008)};
	/**有人倒下了！*/
	get Tips_Content_10009():ILanguageElement{return this.getElement(40009)};
	/**侦探死亡了，找找他的武器吧！*/
	get Tips_Content_10010():ILanguageElement{return this.getElement(40010)};
	/**当前没有正在进行的对局！*/
	get Tips_Content_20001():ILanguageElement{return this.getElement(40011)};
	/**密码输入正确*/
	get Tips_Content_20005():ILanguageElement{return this.getElement(40012)};
	/**密码输入错误！*/
	get Tips_Content_20006():ILanguageElement{return this.getElement(40013)};
	/**免费抽取武器皮肤，点击前往！*/
	get Tips_Content_20007():ILanguageElement{return this.getElement(40014)};
	/**广告冷却中*/
	get Tips_Content_20008():ILanguageElement{return this.getElement(40015)};
	/**小刀*/
	get Weapon_WeaponName_10001():ILanguageElement{return this.getElement(50001)};
	/**左轮手枪*/
	get Weapon_WeaponName_20001():ILanguageElement{return this.getElement(50002)};
	/**消防斧*/
	get Weapon_WeaponName_10002():ILanguageElement{return this.getElement(50003)};
	/**尼泊尔军刀*/
	get Weapon_WeaponName_10003():ILanguageElement{return this.getElement(50004)};
	/**冲锋枪*/
	get Weapon_WeaponName_20002():ILanguageElement{return this.getElement(50005)};
	/**步枪*/
	get Weapon_WeaponName_20003():ILanguageElement{return this.getElement(50006)};
	/**暗杀匕首*/
	get Weapon_WeaponName_10004():ILanguageElement{return this.getElement(50007)};
	/**求生匕首*/
	get Weapon_WeaponName_10005():ILanguageElement{return this.getElement(50008)};
	/**菜刀*/
	get Weapon_WeaponName_10006():ILanguageElement{return this.getElement(50009)};
	/**镖(波)*/
	get Weapon_WeaponName_10007():ILanguageElement{return this.getElement(50010)};
	/**镖(桎)*/
	get Weapon_WeaponName_10008():ILanguageElement{return this.getElement(50011)};
	/**镖(碎)*/
	get Weapon_WeaponName_10009():ILanguageElement{return this.getElement(50012)};
	/**镖(漩)*/
	get Weapon_WeaponName_10010():ILanguageElement{return this.getElement(50013)};
	/**镖(气)*/
	get Weapon_WeaponName_10011():ILanguageElement{return this.getElement(50014)};
	/**镖(激荡)*/
	get Weapon_WeaponName_10012():ILanguageElement{return this.getElement(50015)};
	/**镖(封印)*/
	get Weapon_WeaponName_10013():ILanguageElement{return this.getElement(50016)};
	/**镖(轮回)*/
	get Weapon_WeaponName_10014():ILanguageElement{return this.getElement(50017)};
	/**狗鱼*/
	get Weapon_WeaponName_10015():ILanguageElement{return this.getElement(50018)};
	/**毛鼻鲶*/
	get Weapon_WeaponName_10016():ILanguageElement{return this.getElement(50019)};
	/**金鱼*/
	get Weapon_WeaponName_10017():ILanguageElement{return this.getElement(50020)};
	/**金枪鱼*/
	get Weapon_WeaponName_10018():ILanguageElement{return this.getElement(50021)};
	/**龙虾*/
	get Weapon_WeaponName_10019():ILanguageElement{return this.getElement(50022)};
	/**皇带鱼*/
	get Weapon_WeaponName_10020():ILanguageElement{return this.getElement(50023)};
	/**神奇海螺*/
	get Weapon_WeaponName_10021():ILanguageElement{return this.getElement(50024)};
	/**海王三叉戟*/
	get Weapon_WeaponName_10022():ILanguageElement{return this.getElement(50025)};
	/**飞镖武器箱*/
	get Lottery_Name_10001():ILanguageElement{return this.getElement(50027)};
	/**深海武器箱*/
	get Lottery_Name_10002():ILanguageElement{return this.getElement(50028)};
	/**Creabhop*/
	get AIData_AIName_90001():ILanguageElement{return this.getElement(60001)};
	/**Rival*/
	get AIData_AIName_90002():ILanguageElement{return this.getElement(60002)};
	/**Ironpup*/
	get AIData_AIName_90003():ILanguageElement{return this.getElement(60003)};
	/**TonyXenos*/
	get AIData_AIName_90004():ILanguageElement{return this.getElement(60004)};
	/**L8s*/
	get AIData_AIName_90005():ILanguageElement{return this.getElement(60005)};
	/**Crilm*/
	get AIData_AIName_90006():ILanguageElement{return this.getElement(60006)};
	/**Himiko Toga*/
	get AIData_AIName_90007():ILanguageElement{return this.getElement(60007)};
	/**Rocco21*/
	get AIData_AIName_90008():ILanguageElement{return this.getElement(60008)};
	/**Elysian*/
	get AIData_AIName_90009():ILanguageElement{return this.getElement(60009)};
	/**Bunny Rat*/
	get AIData_AIName_90010():ILanguageElement{return this.getElement(60010)};
	/**Zaptar*/
	get AIData_AIName_90011():ILanguageElement{return this.getElement(60011)};
	/**大厅*/
	get Level_Name_10000():ILanguageElement{return this.getElement(70001)};
	/**夜色酒吧*/
	get Level_Name_10001():ILanguageElement{return this.getElement(70002)};
	/**芭比小镇*/
	get Level_Name_10002():ILanguageElement{return this.getElement(70003)};
	/**泳池派对*/
	get Level_Name_10003():ILanguageElement{return this.getElement(70004)};
	/**烟雾*/
	get Item_Name_20001():ILanguageElement{return this.getElement(80001)};
	/**紫电*/
	get Item_Name_20002():ILanguageElement{return this.getElement(80002)};
	/**雷霆*/
	get Item_Name_20003():ILanguageElement{return this.getElement(80003)};
	/**清风*/
	get Item_Name_20004():ILanguageElement{return this.getElement(80004)};
	/**虹彩*/
	get Item_Name_20005():ILanguageElement{return this.getElement(80005)};
	/**梦幻*/
	get Item_Name_20006():ILanguageElement{return this.getElement(80006)};
	/**温柔学姐*/
	get Item_Name_30001():ILanguageElement{return this.getElement(80007)};
	/**风纪委员*/
	get Item_Name_30002():ILanguageElement{return this.getElement(80008)};
	/**不良少女*/
	get Item_Name_30003():ILanguageElement{return this.getElement(80009)};
	/**韩式淑女*/
	get Item_Name_30004():ILanguageElement{return this.getElement(80010)};
	/**可爱学妹*/
	get Item_Name_30005():ILanguageElement{return this.getElement(80011)};
	/**奇幻少女*/
	get Item_Name_30006():ILanguageElement{return this.getElement(80012)};
	/**温柔学长*/
	get Item_Name_30007():ILanguageElement{return this.getElement(80013)};
	/**不良少年*/
	get Item_Name_30008():ILanguageElement{return this.getElement(80014)};
	/**啦啦队长*/
	get Item_Name_30009():ILanguageElement{return this.getElement(80015)};
	/**艺术生*/
	get Item_Name_30010():ILanguageElement{return this.getElement(80016)};
	/**二次元少女*/
	get Item_Name_30011():ILanguageElement{return this.getElement(80017)};
	/**英语老师*/
	get Item_Name_30012():ILanguageElement{return this.getElement(80018)};
	/**正义少年*/
	get Item_Name_30013():ILanguageElement{return this.getElement(80019)};
	/**潮流少女*/
	get Item_Name_30014():ILanguageElement{return this.getElement(80020)};
	/**学生会长*/
	get Item_Name_30015():ILanguageElement{return this.getElement(80021)};
	/**女老师*/
	get Item_Name_30016():ILanguageElement{return this.getElement(80022)};
	/**班主任*/
	get Item_Name_30017():ILanguageElement{return this.getElement(80023)};
	/**海边姐姐*/
	get Item_Name_30018():ILanguageElement{return this.getElement(80024)};
	/**邻家妹妹*/
	get Item_Name_30019():ILanguageElement{return this.getElement(80025)};
	/**健身教练*/
	get Item_Name_30020():ILanguageElement{return this.getElement(80026)};
	/**优雅少女*/
	get Item_Name_30021():ILanguageElement{return this.getElement(80027)};
	/**探险家*/
	get Item_Name_30022():ILanguageElement{return this.getElement(80028)};
	/**民国学生*/
	get Item_Name_30023():ILanguageElement{return this.getElement(80029)};
	/**可可少女*/
	get Item_Name_30024():ILanguageElement{return this.getElement(80030)};
	/**猫猫店员*/
	get Item_Name_30025():ILanguageElement{return this.getElement(80031)};
	/**女仆甜心*/
	get Item_Name_30026():ILanguageElement{return this.getElement(80032)};
	/**猫耳女仆*/
	get Item_Name_30027():ILanguageElement{return this.getElement(80033)};
	/**少女偶像*/
	get Item_Name_30028():ILanguageElement{return this.getElement(80034)};
	/**圣诞少女*/
	get Item_Name_30029():ILanguageElement{return this.getElement(80035)};
	/**火焰*/
	get Item_Name_20007():ILanguageElement{return this.getElement(80036)};
	/**女巫*/
	get Item_Name_20008():ILanguageElement{return this.getElement(80037)};
	/**骑士*/
	get Item_Name_20009():ILanguageElement{return this.getElement(80038)};
	/**恶魔*/
	get Item_Name_20010():ILanguageElement{return this.getElement(80039)};
	/**魔鬼*/
	get Item_Name_20011():ILanguageElement{return this.getElement(80040)};
	/**我是{1}~*/
	get Chat_chat_1():ILanguageElement{return this.getElement(90001)};
	/**凶手是谁？*/
	get Chat_chat_2():ILanguageElement{return this.getElement(90002)};
	/**救命！*/
	get Chat_chat_3():ILanguageElement{return this.getElement(90003)};
	/**谢谢你！*/
	get Chat_chat_4():ILanguageElement{return this.getElement(90004)};
	/**你好！*/
	get Chat_chat_5():ILanguageElement{return this.getElement(90005)};
	/**别刀我QAQ*/
	get Chat_chat_6():ILanguageElement{return this.getElement(90006)};
	/**退！退！退！*/
	get Chat_chat_7():ILanguageElement{return this.getElement(90007)};
	/**满分操作~*/
	get Chat_chat_8():ILanguageElement{return this.getElement(90008)};
	/**我要开始表演了~*/
	get Chat_chat_9():ILanguageElement{return this.getElement(90009)};
	/**学生*/
	get Text_Content_20042():ILanguageElement{return this.getElement(90010)};
	/**侦探*/
	get Text_Content_20043():ILanguageElement{return this.getElement(90011)};
	/**凶手*/
	get Text_Content_20044():ILanguageElement{return this.getElement(90012)};
	/**1.凶手有近战穿刺、远程飞刀两种方式，可以自由切换
2.在近战状态下，靠近其他玩家并面向他们，就可以自动挥刀击杀
3.在远程状态下，附近有可攻击的目标时，会出现瞄准标志，点击标志即可扔出飞刀*/
	get Text_Content_20036():ILanguageElement{return this.getElement(90013)};
	/**1.侦探可以开枪进行射击，有两种射击方法
2.在持枪状态下，附近有可攻击目标时，会出现瞄准标志，点击标志即可发射子弹
3.除此之外，持枪状态下点击任意位置都可以发射子弹哦~*/
	get Text_Content_20037():ILanguageElement{return this.getElement(90014)};
	/**1.如果你是杀手/侦探，请尽量不要暴露自己的身份
2.不要相信任何试图靠近你的人，他们很危险，时刻保持警惕
3.假如你是平民，那么努力活下来吧*/
	get Text_Content_20038():ILanguageElement{return this.getElement(90015)};
	/**凶手教学*/
	get Text_Content_20039():ILanguageElement{return this.getElement(90016)};
	/**侦探教学*/
	get Text_Content_20040():ILanguageElement{return this.getElement(90017)};
	/**温馨提示*/
	get Text_Content_20041():ILanguageElement{return this.getElement(90018)};
	/**凶手淘汰了你*/
	get Tips_Content_20009():ILanguageElement{return this.getElement(90019)};
	/**目标错误，你被淘汰了*/
	get Tips_Content_20010():ILanguageElement{return this.getElement(90020)};
	/**已被正义的警探消灭*/
	get Tips_Content_20011():ILanguageElement{return this.getElement(90021)};
	/**能力商店*/
	get Text_Content_12027():ILanguageElement{return this.getElement(90022)};
	/**能力详情*/
	get Text_Content_12028():ILanguageElement{return this.getElement(90023)};
	/**装备*/
	get Text_Content_12029():ILanguageElement{return this.getElement(90024)};
	/**卸下*/
	get Text_Content_12030():ILanguageElement{return this.getElement(90025)};
	/**金币购买*/
	get Text_Content_12031():ILanguageElement{return this.getElement(90026)};
	/**钻石购买*/
	get Text_Content_12032():ILanguageElement{return this.getElement(90027)};
	/**装备中*/
	get Text_Content_12033():ILanguageElement{return this.getElement(90028)};
	/**已拥有*/
	get Text_Content_12034():ILanguageElement{return this.getElement(90029)};
	/**购买成功*/
	get Tips_Content_10011():ILanguageElement{return this.getElement(90030)};
	/**货币不足，再攒攒吧~*/
	get Tips_Content_10012():ILanguageElement{return this.getElement(90031)};
	/**杀手步伐*/
	get SkillShop_Name_10001():ILanguageElement{return this.getElement(90032)};
	/**快速投掷*/
	get SkillShop_Name_10002():ILanguageElement{return this.getElement(90033)};
	/**爆炸飞刀*/
	get SkillShop_Name_10003():ILanguageElement{return this.getElement(90034)};
	/**【杀手被动能力】
当你掏出你的刀时，你的移动速度会比平时更快，提升10％*/
	get SkillShop_Description_10001():ILanguageElement{return this.getElement(90035)};
	/**【杀手被动能力】
现在你扔出的飞刀会飞得更快，提升100％*/
	get SkillShop_Description_10002():ILanguageElement{return this.getElement(90036)};
	/**【杀手被动能力】
当你的飞刀命中目标时，不会立即对目标造成伤害，而是在目标处埋下一颗炸弹，延迟一小段时间后会爆炸，并对周围一定范围内的玩家同样造成伤害*/
	get SkillShop_Description_10003():ILanguageElement{return this.getElement(90037)};
	/**彩虹马桶人*/
	get Shop_Name_40001():ILanguageElement{return this.getElement(90038)};
	/**公主马桶人*/
	get Shop_Name_40002():ILanguageElement{return this.getElement(90039)};
	/**太空马桶人*/
	get Shop_Name_40003():ILanguageElement{return this.getElement(90040)};
	/**蜘蛛马桶人*/
	get Shop_Name_40004():ILanguageElement{return this.getElement(90041)};
	/**监控人*/
	get Shop_Name_40005():ILanguageElement{return this.getElement(90042)};
	/**音响人*/
	get Shop_Name_40006():ILanguageElement{return this.getElement(90043)};
	/**电视人*/
	get Shop_Name_40007():ILanguageElement{return this.getElement(90044)};
	/**卡通音响人*/
	get Shop_Name_40008():ILanguageElement{return this.getElement(90045)};
	/**卡通电视人*/
	get Shop_Name_40009():ILanguageElement{return this.getElement(90046)};
	/**本次更新：
1.新增【马桶人VS监控人】系列挂件，欢迎大家去商店选购~
2.新增【能力商店】，开放杀手局内特殊能力的配置
3.优化了侦探、凶手的操作手感及相关界面
4.调整大厅及关卡场景，提升性能
5.新增还原按钮，镜头卡住的时候点一下试试吧*/
	get Text_Content_10005():ILanguageElement{return this.getElement(90047)};
	/**有玩家进入场景失败，对局将重新开始*/
	get Tips_Content_10013():ILanguageElement{return this.getElement(90048)};
	/**跳转*/
	get Text_Content_10006():ILanguageElement{return this.getElement(90049)};
	/**掏出手枪*/
	get Text_Content_20045():ILanguageElement{return this.getElement(90050)};
	/**收起手枪*/
	get Text_Content_20046():ILanguageElement{return this.getElement(90051)};
	/**准星图标*/
	get Text_Content_20047():ILanguageElement{return this.getElement(90052)};
	/**掏出近战匕首*/
	get Text_Content_20048():ILanguageElement{return this.getElement(90053)};
	/**掏出远程飞刀*/
	get Text_Content_20049():ILanguageElement{return this.getElement(90054)};
	/**收起武器*/
	get Text_Content_20050():ILanguageElement{return this.getElement(90055)};
	/**暂无获取途径*/
	get Text_Content_20051():ILanguageElement{return this.getElement(90056)};
	/**科幻武器箱*/
	get Lottery_Name_10003():ILanguageElement{return this.getElement(90057)};
	/**神话武器箱*/
	get Lottery_Name_10004():ILanguageElement{return this.getElement(90058)};
	/**奇点之枪*/
	get Weapon_WeaponName_20004():ILanguageElement{return this.getElement(90059)};
	/**虚数之杖*/
	get Weapon_WeaponName_10023():ILanguageElement{return this.getElement(90060)};
	/**光谱矛*/
	get Weapon_WeaponName_10024():ILanguageElement{return this.getElement(90061)};
	/**反物质枪*/
	get Weapon_WeaponName_20005():ILanguageElement{return this.getElement(90062)};
	/**光谱剑*/
	get Weapon_WeaponName_10025():ILanguageElement{return this.getElement(90063)};
	/**光谱剑(晶红)*/
	get Weapon_WeaponName_10026():ILanguageElement{return this.getElement(90064)};
	/**匕首(模拟)*/
	get Weapon_WeaponName_10027():ILanguageElement{return this.getElement(90065)};
	/**军刀(模拟)*/
	get Weapon_WeaponName_10028():ILanguageElement{return this.getElement(90066)};
	/**左轮(模拟)*/
	get Weapon_WeaponName_20006():ILanguageElement{return this.getElement(90067)};
	/**冲锋枪(模拟)*/
	get Weapon_WeaponName_20007():ILanguageElement{return this.getElement(90068)};
	/**唤雷(符文)*/
	get Weapon_WeaponName_10029():ILanguageElement{return this.getElement(90069)};
	/**逐日(符文)*/
	get Weapon_WeaponName_20008():ILanguageElement{return this.getElement(90070)};
	/**雷神之锤*/
	get Weapon_WeaponName_10030():ILanguageElement{return this.getElement(90071)};
	/**火铳*/
	get Weapon_WeaponName_20009():ILanguageElement{return this.getElement(90072)};
	/**骨刺剑(圣)*/
	get Weapon_WeaponName_10031():ILanguageElement{return this.getElement(90073)};
	/**左轮(圣)*/
	get Weapon_WeaponName_20010():ILanguageElement{return this.getElement(90074)};
	/**骨刺剑(恋)*/
	get Weapon_WeaponName_10032():ILanguageElement{return this.getElement(90075)};
	/**左轮(恋)*/
	get Weapon_WeaponName_20011():ILanguageElement{return this.getElement(90076)};
	/**骨刺剑(炽)*/
	get Weapon_WeaponName_10033():ILanguageElement{return this.getElement(90077)};
	/**骨刺剑(霜)*/
	get Weapon_WeaponName_10034():ILanguageElement{return this.getElement(90078)};
	/**樱*/
	get Weapon_WeaponName_10035():ILanguageElement{return this.getElement(90079)};
	/**蝶*/
	get Weapon_WeaponName_20012():ILanguageElement{return this.getElement(90080)};
	/**黄金球棍(虹彩)*/
	get Weapon_WeaponName_10036():ILanguageElement{return this.getElement(90081)};
	/**黄金左轮(虹彩)*/
	get Weapon_WeaponName_20013():ILanguageElement{return this.getElement(90082)};
	/**幽灵斗篷*/
	get SkillShop_Name_10004():ILanguageElement{return this.getElement(90083)};
	/**【杀手主动能力】
激活后，你可以隐身5秒，若你在隐身时击败了任何玩家，则会立即结束隐身*/
	get SkillShop_Description_10004():ILanguageElement{return this.getElement(90084)};
	/**兑换成功*/
	get Tips_Content_20012():ILanguageElement{return this.getElement(90085)};
	/**兑换失败*/
	get Tips_Content_20013():ILanguageElement{return this.getElement(90086)};
	/**恭喜激活会员特权*/
	get Tips_Content_20014():ILanguageElement{return this.getElement(90087)};
	/**恭喜激活超级特权*/
	get Tips_Content_20015():ILanguageElement{return this.getElement(90088)};
	/**会员特权已到期失效*/
	get Tips_Content_20016():ILanguageElement{return this.getElement(90089)};
	/**超级特权已到期失效*/
	get Tips_Content_20017():ILanguageElement{return this.getElement(90090)};
	/**持有数量已经达到上限*/
	get Tips_Content_20018():ILanguageElement{return this.getElement(90091)};
	/**兑换*/
	get Text_Content_20052():ILanguageElement{return this.getElement(90092)};
	/**跳转*/
	get Text_Content_20053():ILanguageElement{return this.getElement(90093)};
	/**会员特权激活中*/
	get Text_Content_20054():ILanguageElement{return this.getElement(90094)};
	/**剩余激活时间{0}*/
	get Text_Content_20055():ILanguageElement{return this.getElement(90095)};
	/**尚未激活会员特权*/
	get Text_Content_20056():ILanguageElement{return this.getElement(90096)};
	/**尚未激活超级特权*/
	get Text_Content_20057():ILanguageElement{return this.getElement(90097)};
	/**剩余激活时间{0}天*/
	get Text_Content_20058():ILanguageElement{return this.getElement(90098)};
	/**会员特权*/
	get Text_Content_20059():ILanguageElement{return this.getElement(90099)};
	/**超级特权*/
	get Text_Content_20060():ILanguageElement{return this.getElement(90100)};
	/**恭喜获得广告券*1*/
	get Tips_Content_20019():ILanguageElement{return this.getElement(90101)};
	/**土豪来啦*/
	get Item_Name_20012():ILanguageElement{return this.getElement(90102)};
	/**快速投掷体验券*/
	get SkillShop_Name_10005():ILanguageElement{return this.getElement(90103)};
	/**爆炸飞刀体验券*/
	get SkillShop_Name_10006():ILanguageElement{return this.getElement(90104)};
	/**幽灵斗篷体验券*/
	get SkillShop_Name_10007():ILanguageElement{return this.getElement(90105)};
	/**【杀手被动能力】
现在你扔出的飞刀会飞得更快，提升100％*/
	get SkillShop_Description_10005():ILanguageElement{return this.getElement(90106)};
	/**【杀手被动能力】
当你的飞刀命中目标时，不会立即对目标造成伤害，而是在目标处埋下一颗炸弹，延迟一小段时间后会爆炸，并对周围一定范围内的玩家同样造成伤害*/
	get SkillShop_Description_10006():ILanguageElement{return this.getElement(90107)};
	/**【杀手主动能力】
激活后，你可以隐身5秒，若你在隐身时击败了任何玩家，则会立即结束隐身*/
	get SkillShop_Description_10007():ILanguageElement{return this.getElement(90108)};
	/**金钥匙数量不足*/
	get Tips_Content_20020():ILanguageElement{return this.getElement(90109)};
	/**这个版本不支持开通大会员*/
	get Tips_Content_20021():ILanguageElement{return this.getElement(90110)};
	/**紫光剑*/
	get Weapon_WeaponName_10037():ILanguageElement{return this.getElement(90111)};
	/**冰寒弓箭*/
	get Weapon_WeaponName_20014():ILanguageElement{return this.getElement(90112)};
	/**烟花拖尾*/
	get Item_Name_20013():ILanguageElement{return this.getElement(90113)};
	/**爆竹拖尾*/
	get Item_Name_20014():ILanguageElement{return this.getElement(90114)};
	/**礼物拖尾*/
	get Item_Name_20015():ILanguageElement{return this.getElement(90115)};
	/**糖果拖尾*/
	get Item_Name_20016():ILanguageElement{return this.getElement(90116)};
	/**便便拖尾*/
	get Item_Name_20017():ILanguageElement{return this.getElement(90117)};
	/** 火焰翅膀*/
	get Shop_Name_40010():ILanguageElement{return this.getElement(90118)};
	/**火焰翅膀*/
	get Shop_Name_40011():ILanguageElement{return this.getElement(90119)};
	/**水系翅膀*/
	get Shop_Name_40012():ILanguageElement{return this.getElement(90120)};
	/**黑暗翅膀*/
	get Shop_Name_40013():ILanguageElement{return this.getElement(90121)};
	/**恶魔翅膀*/
	get Shop_Name_40014():ILanguageElement{return this.getElement(90122)};
	/**恶灵翅膀*/
	get Shop_Name_40015():ILanguageElement{return this.getElement(90123)};
	/**天使翅膀*/
	get Shop_Name_40016():ILanguageElement{return this.getElement(90124)};
	/**六翼翅膀*/
	get Shop_Name_40017():ILanguageElement{return this.getElement(90125)};
	/**免费领券*/
	get Text_FreeCoupon():ILanguageElement{return this.getElement(100001)};
	/**设置*/
	get Text_Set():ILanguageElement{return this.getElement(100002)};
	/**充值*/
	get Text_Pay():ILanguageElement{return this.getElement(100003)};
	/**能力商店*/
	get Text_HUD_SkillShop():ILanguageElement{return this.getElement(100004)};
	/**皮肤*/
	get Text_Shop_Skin():ILanguageElement{return this.getElement(100005)};
	/**广告券兑换*/
	get Text_VoucherExchange():ILanguageElement{return this.getElement(100006)};
	/**一小堆金币*/
	get Text_ASmallPileOfGoldCoins():ILanguageElement{return this.getElement(100007)};
	/**一大堆金币*/
	get Text_APileOfGoldCoins():ILanguageElement{return this.getElement(100008)};
	/**限定武器-樱*/
	get Text_LimitedWeaponSakura():ILanguageElement{return this.getElement(100009)};
	/**限定武器-蝶*/
	get Text_LimitedWeaponButterfly():ILanguageElement{return this.getElement(100010)};
	/**限定武器-紫光剑*/
	get Text_LimitedWeaponPurpleLightsaber():ILanguageElement{return this.getElement(100011)};
	/**限定武器-冰寒弓箭*/
	get Text_LimitedWeaponIceBow():ILanguageElement{return this.getElement(100012)};
	/**消耗*/
	get Text_Expend():ILanguageElement{return this.getElement(100013)};
	/**凶手能力装配*/
	get Text_KillerPowerAssembly():ILanguageElement{return this.getElement(100014)};
	/**免费奖励*/
	get Text_Ads_1():ILanguageElement{return this.getElement(100015)};
	/**{0}失败，请重试*/
	get Text_Ads_2():ILanguageElement{return this.getElement(100016)};
	/**换装成功*/
	get Text_Ads_3():ILanguageElement{return this.getElement(100017)};
	/**看广告免费试穿*/
	get Text_Ads_4():ILanguageElement{return this.getElement(100018)};
	/**免费试穿*/
	get Text_Ads_5():ILanguageElement{return this.getElement(100019)};
	/**恭喜获得{0}金币*/
	get Text_Ads_6():ILanguageElement{return this.getElement(100020)};
	/**看广告免费领取{0}金币*/
	get Text_Ads_7():ILanguageElement{return this.getElement(100021)};
	/**恭喜获得{0}张广告券*/
	get Text_Ads_8():ILanguageElement{return this.getElement(100022)};
	/**免费领取{0}张广告券*/
	get Text_Ads_9():ILanguageElement{return this.getElement(100023)};
	/**免费领取双倍金币
再送一张广告券*/
	get Text_Ads_10():ILanguageElement{return this.getElement(100024)};
	/**免费抽奖*/
	get Text_FreeDraw():ILanguageElement{return this.getElement(100025)};
	/**排名*/
	get Text_Ranking():ILanguageElement{return this.getElement(100026)};
	/**昵称*/
	get Text_nickname():ILanguageElement{return this.getElement(100027)};
	/**高度*/
	get Text_Altitude():ILanguageElement{return this.getElement(100028)};
	/**开始结算*/
	get Text_StartSettlement():ILanguageElement{return this.getElement(100029)};
	/**玩家{0}死亡了*/
	get Text_PlayerIsDead():ILanguageElement{return this.getElement(100030)};
	/**有玩家没有成功进入场景，游戏重新开始*/
	get Text_1():ILanguageElement{return this.getElement(100031)};
	/**不要轻易暴露自己的身份
远离那些试图靠近你的人
不要相信任何人
每个人都可能很危险!*/
	get Text_World1():ILanguageElement{return this.getElement(100032)};
	/**掏出手枪后，点击屏幕射击
找到隐藏的凶手，击败他!
不要攻击平民*/
	get Text_World2():ILanguageElement{return this.getElement(100033)};
	/**掏出近战武器后，会自动攻击周围玩家
掏出远程飞刀后，点击准星来扔出
击败所有人，小心侦探!*/
	get Text_World3():ILanguageElement{return this.getElement(100034)};
	/**恢复默认形象*/
	get Text_World4():ILanguageElement{return this.getElement(100035)};
	/**不能重复领取*/
	get Text_Task1():ILanguageElement{return this.getElement(100036)};
	/**在线时间不足{0}分钟*/
	get Text_Task2():ILanguageElement{return this.getElement(100037)};
	/**已领取*/
	get Text_Task3():ILanguageElement{return this.getElement(100038)};
	/**奖励金币*/
	get Text_Task4():ILanguageElement{return this.getElement(100039)};
	/**明日奖励*/
	get Text_Task5():ILanguageElement{return this.getElement(100040)};
	/**在线{0}分钟免费领取({1}/{2})*/
	get Text_Task6():ILanguageElement{return this.getElement(100041)};
	/**领取成功、打开商店使用*/
	get Text_Task7():ILanguageElement{return this.getElement(100042)};
	/**今日已售空,请更换其他商品购买*/
	get Text_SoldouttodayPleaseReplaceWithOtherProductsToPurchase():ILanguageElement{return this.getElement(100043)};
	/**充值广告券*/
	get Text_Rechargediamonds():ILanguageElement{return this.getElement(100044)};
	/**不限购*/
	get Text_Nopurchaserestrictions():ILanguageElement{return this.getElement(100045)};
	/**今日已售空*/
	get Text_Soldouttoday():ILanguageElement{return this.getElement(100046)};
	/**每天限购一次*/
	get Text_Limitedtoonepurchaseperday():ILanguageElement{return this.getElement(100047)};
	/**广告券*/
	get Text_AdvertisingCoupon():ILanguageElement{return this.getElement(100048)};
	/**别点太快*/
	get Text_TipsTooFast():ILanguageElement{return this.getElement(100049)};
	/**超级装扮*/
	get Text_ChangeClothes():ILanguageElement{return this.getElement(100050)};
	/**恐怖校园*/
	get Level_Name_10004():ILanguageElement{return this.getElement(100051)};

}