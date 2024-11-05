import AdsPanel from "../../AdsPanel";
import P_Tips from '../../CommonUI/P_Tips';
import { GamingState, SoundGlobals } from "../../Globals";
import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import P_CoinGet from "../../UILogic/Game/P_CoinGet";
import P_Game from "../../UILogic/Game/P_Game";
import P_GameFinal from "../../UILogic/Game/P_GameFinal";
import P_Hall from "../../UILogic/Hall/P_Hall";
import P_Reset from "../../UILogic/Hall/P_Reset";
import P_Info from "../../uiTemplate/Common/P_Info";
import { BubbleModuleC } from "../bubbleModule/BubbleModule";
import { FSMModuleC } from "../FSMModule";
import { GameModuleC } from "../GameModule/GameModuleC";
import { LotteryModuleC } from "../LotteryModule/LotteryModuleC";
import { WatchModuleC } from "../ProcModule/WatchModule";
import ShelterModuleC from "../shelterModule/ShelterModuleC";
import { ShopModuleC } from "../ShopModule/ShopCityModule";
import { PlayerModuleData } from "./PlayerData";
import { PlayerModuleS } from "./PlayerModuleS";

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData> {
    /**玩家等级列表 */
    private playerLevelMap: Map<number, number> = new Map<number, number>()
    /**在大厅的玩家 */
    private playerInHallMap: Map<number, boolean> = new Map<number, boolean>()
    /**当前玩家是否在大厅 */
    private playerIsHall: boolean = false
    /**是否正在观战 */
    private isWatch: boolean = false
    /**玩家是否初始化过 */
    private isInit: boolean = false
    onStart(): void {
        this.initCoinAds();

        ModifiedCameraSystem.followTargetInterpSpeed = 0;
        mw.UIService.show(P_Reset);
    }

    private _mText_ADTime: mw.TextBlock;
    private mUIText20030_txt: mw.TextBlock;
    private getCoinCount: number = 100;
    private initCoinAds(): void {
        this.mUIText20030_txt = P_Hall.instance.mUIText20030_txt;
        this.mUIText20030_txt.text = `领金币`;
        this._mText_ADTime = P_Hall.instance.mText_ADTime;
        this._mText_ADTime.visibility = mw.SlateVisibility.Collapsed;
        P_Hall.instance.mBtn_AD.onClicked.add(() => {
            if (mw.SystemUtil.isPIE) {
                this.server.net_ChangeGold(this.getCoinCount);
                P_Tips.show(`恭喜获得${this.getCoinCount}金币`);
            } else {
                mw.UIService.getUI(AdsPanel).showRewardAd(() => {
                    this.server.net_ChangeGold(this.getCoinCount);
                    P_Tips.show(`恭喜获得${this.getCoinCount}金币`);
                }, `看广告免费领取${this.getCoinCount}金币`, `取消`, `免费领取`);
            }
        });
    }

    public addCoin(coin: number): void {
        this.server.net_ChangeGold(coin);
    }

    public onResetPlayerCamera() {
        ModifiedCameraSystem.resetOverrideCameraRotation();
        ModuleService.getModule(WatchModuleC).changeWatchTarget(this.localPlayer.character);
    }

    public net_initAllPlayerStroke(playerArray: Array<number>) {
        playerArray.forEach(async (value, index) => {
            let player = await mw.Player.getPlayer(value);
            if (player) {
                this.addOutLine(player);
            }
        })
    }

    public async net_initOtherPlayerStroke(newPlayer: number) {
        let player = await mw.Player.getPlayer(newPlayer);
        if (player) {
            this.addOutLine(player);
        }
    }

    private addOutLine(player: mw.Player) {
        let color = mw.LinearColor.colorHexToLinearColor(GameConfig.Rule.getElement(70001).Color);
        let weight = GameConfig.Rule.getElement(70002).Weight;
        GeneralManager.modifyaddOutlineEffect(player.character, color, weight, 0, 1, false, true);
    }

    net_initLevelData(hallArray: Array<number>, levelArray: Array<number>, playerId: number) {

        let expMap: Map<number, number> = new Map();
        let hallPlayer: Map<number, boolean> = new Map();
        let length = hallArray.length;
        for (let i = 0; i < length; i++) {
            let hallId = hallArray[i];
            let level = levelArray[i];
            expMap.set(hallId, level);
            hallPlayer.set(hallId, true);
        }

        let level = expMap.get(playerId)

        Player.asyncGetLocalPlayer().then((player: mw.Player) => {
            if (player.playerId == playerId) {
                this.isInit = true
                this.playerLevelMap = expMap
                this.playerInHallMap = hallPlayer
                this.playerIsHall = true
                this.showLevelUI()

            }
            else {
                this.net_playerBackToHall(playerId, level)
            }
        })

    }
    net_changeModel(roleID: number, modelGuid: string) {
        let modelInfo = GameConfig.Role.getElement(roleID);
        GameObject.asyncFindGameObjectById(modelGuid).then((obj) => {
            let model = obj as mw.Character;
            if (PlayerManagerExtesion.isNpc(model)) {
                model.worldTransform.scale = new mw.Vector(0.8, 0.8, 0.8);
                console.error(`changeCloth ==== 模型 1 roleID : ${roleID} :: modelGuid ${modelGuid}`);
            } else {
                console.error(`changeCloth ==== 玩家 1 roleID : ${roleID} :: modelGuid ${modelGuid}`);
                // return;
            }
            if (!model) return;
            Tools.changeClothByRole(modelInfo, model);
        })

    }
    net_changeDiamond(num: number) {
        P_Hall.setHallDiamondNum(num);
    }
    net_changeAdvToken(num: number) {
        P_Hall.setHallAdvNum(num);
    }
    net_changeGold(num: number) {
        P_Hall.setHallGoldNum(num);
    }
    net_changeRole(roleid: number) {
        P_Hall.setHallHeadImg(roleid);
    }
    net_changeName(name: string) {
        P_Hall.setHallPlayerName(name);
    }
    onEnterScene(sceneType: number) {
        //优先走断线重连逻辑，之后才是玩家进入要不会出问题
        ModuleService.getModule(FSMModuleC).reconnect();
        this.isFirstIn();
        // this.setHallAd();
        // Camera.currentCamera.enableMovementCollisionDetection = false;
        Camera.currentCamera.springArm.collisionInterpSpeed = 0;
        mw.UIService.show(P_Info);
        this.changePlayerAppear(this.localPlayer.character);
        this.clearSceneNpcName();
        this.initSceneTrigger();
        P_Hall.setHallHeadImg(10001);
    }
    private lotteryBlock: boolean = false;
    private svipBlock: boolean = false;
    private async initSceneTrigger() {
        let lottery = await GameObject.asyncFindGameObjectById("04AEED65") as mw.Trigger;
        if (lottery) {
            lottery.onEnter.add((other: mw.GameObject) => {
                if (PlayerManagerExtesion.isCharacter(other)) {
                    if (other != this.localPlayer.character) {
                        return;
                    }
                    if (this.lotteryBlock != false) {
                        return;
                    }
                    ModuleService.getModule(LotteryModuleC).lotteryOpen(true);
                    this.lotteryBlock = true;
                }
            })
            lottery.onLeave.add((other: mw.GameObject) => {
                if (PlayerManagerExtesion.isCharacter(other)) {
                    if (other != this.localPlayer.character) {
                        return;
                    }
                    ModuleService.getModule(LotteryModuleC).lotteryOpen(false);
                    this.lotteryBlock = false;
                }
            })
        }

        let svip = await GameObject.asyncFindGameObjectById("0BD40AFA") as mw.Trigger;
        if (svip) {
            svip.onEnter.add((other: mw.GameObject) => {
                if (PlayerManagerExtesion.isCharacter(other)) {
                    if (other != this.localPlayer.character) {
                        return;
                    }
                    if (this.svipBlock != false) {
                        return;
                    }
                    // ModuleService.getModule(SVIPModuleC).isOpenBuySvipPanel(true);//TODO:
                    ModuleService.getModule(ShopModuleC).ShopOpen(true);
                    this.svipBlock = true;
                }
            })
            // svip.onLeave.add((other: mw.GameObject) => {
            //     if (PlayerManagerExtesion.isCharacter(other)) {
            //         if (other != this.localPlayer.character) {
            //             return;
            //         }
            //         ModuleService.getModule(SVIPModuleC).isOpenBuySvipPanel(false);
            //         this.svipBlock = false;
            //     }
            // })
        }

    }

    private async clearSceneNpcName() {
        let parent = await GameObject.asyncFindGameObjectById("2DFF0AF7");
        if (parent) {
            parent.getChildren().forEach((obj) => {
                if (obj) {
                    let npc = obj as mw.Character;
                    npc.displayName = "";
                }
            })
        }
    }

    public addAdvToken(num: number) {
        this.server.net_changeAdvToken(num);
        // P_Tips.show(GameConfig.Tips.getElement(20019).Content);
    }

    public async changePlayerAppear(character: mw.Character | mw.Character) {
        await new Promise<void>((resolve) => {
            mw.AccountService.downloadData(character, () => {
                resolve();
            })
        })
        if (character.isDescriptionReady) {
            AccountService.uploadData(character);
        } else {
            let fuc = () => {
                character.onDescriptionComplete.remove(fuc);
                AccountService.uploadData(character);
            };
            character.onDescriptionComplete.add(fuc);
        }
    }

    public async isFirstIn() {
        this.server.net_SetPlayerName(mw.AccountService.getNickName());
        let roleId: number = this.data.getPlayerRoleId();
        if (roleId == 0) {//第一次进入
            let ranNum = Tools.randomInt(0, 3);
            if (ranNum <= 1) {
                ranNum += 10001;
            }
            else {
                ranNum += 20001 - 2;
            }
            console.warn("随机的角色id为:" + ranNum);
            this.firstEnterHall(ranNum);
        }
        else {
            this.firstEnterHall(roleId);
        }
    }


    /**初始化玩家形象，装备等 */
    private firstEnterHall(roleId: number) {
        this.server.net_InitPlayer(roleId);
    }

    /**玩家进入游戏，展示玩家名字 */
    public async net_showPlayerName(playerId: number, keyArray: Array<number>, valueArray: Array<string>, vipArray: Array<number>) {
        let playerNameMap: Map<number, PlayerNameInfo> = new Map<number, PlayerNameInfo>();
        let length = keyArray.length;

        for (let i = 0; i < length; i++) {
            let key = keyArray[i];
            let value = valueArray[i];
            let colorId = vipArray[i];
            let info = new PlayerNameInfo(value, colorId);
            playerNameMap.set(key, info);
        }
        if (playerId == Player.localPlayer.playerId) {
            playerNameMap.forEach(async (value, index) => {
                let player = await mw.Player.getPlayer(index);
                if (!player) {
                    return;
                }
                let name = value.playerName;
                let ui = player.character.overheadUI;
                let vipColor = value.specialColorId;
                this.changeUI(ui, name, vipColor);
            })
            /**初始化名字完毕之后，初始化等级信息 */
            this.server.net_initLevelData()
        }
        else {
            if (playerNameMap.has(playerId)) {
                let p = await mw.Player.getPlayer(playerId);
                if (!p) {
                    return;
                }
                let info = playerNameMap.get(playerId);
                let name = info.playerName
                let ui = p.character.overheadUI;
                let isVip = info.specialColorId
                this.changeUI(ui, name, isVip);
            }
        }
    }

    public net_FirstInitHallUI(state: number, bo: boolean = true) {
        if (state == GamingState.InitState) {
            P_Hall.setHallTip(10001);
            P_Hall.setHallWaitNum(1);
        } else if (state == GamingState.WaitingState) {
            P_Hall.setHallTip(10001);
        }
        else if (state == GamingState.ReadyState) {
            P_Hall.setHallTip(10003);
        } else {
            P_Hall.setHallTip(10002);
        }
        P_Hall.showHallUI();
        console.warn(`Camera :: ===== 相机重置前判断:: ${bo}`);
        if (bo) {
            ModuleService.getModule(BubbleModuleC).initMainPanel();
        }

    }
    /**更新玩家等级 */
    public async net_updatePlayerLevel(playerId: number, level: number) {
        this.playerLevelMap.set(playerId, level)
        if (this.playerIsHall == true && this.isInit) {
            this.updateRankUI(playerId)
        }
    }
    /**进入终结者观战 */
    public net_enterFinishWatch() {
        if (this.isInit == false) {
            return
        }
        this.enterWatch()
    }
    /**退出终结者观战 */
    public net_exitFinishWatch() {
        if (this.isInit == false) {
            this.onResetPlayerCamera();
            return
        }
        this.exitWatch()
    }


    /**玩家出生以及返回大厅的时候更新数据 */
    public net_playerBackToHall(playerId: number, level: number) {
        this.playerLevelMap.set(playerId, level)
        this.playerInHallMap.set(playerId, true)
        if (playerId == Player.localPlayer.playerId) {
            this.playerIsHall = true
            this.showLevelUI()
        }
        else if (playerId != Player.localPlayer.playerId && this.playerIsHall == true && this.isWatch == false) {
            this.addRankUI(playerId)
        }
    }
    /**玩家离开游戏 */
    public net_playerLeave(playerId: number) {
        if (this.playerLevelMap.has(playerId)) {
            this.playerLevelMap.delete(playerId)
        }
        if (this.playerInHallMap.has(playerId)) {
            this.playerInHallMap.delete(playerId)
        }
        if (playerId == Player.localPlayer.playerId) {
            this.hideAllRankUI();
        }
        else if (this.playerIsHall == true && playerId != Player.localPlayer.playerId) {
            this.hideRankUI(playerId)
        }
    }
    /**玩家进入游戏，取消显示等级ui */
    public net_playerEnterGame(playerArr: Array<number>) {
        let havePlayer = false
        playerArr.forEach((value, index) => {
            if (value == Player.localPlayer.playerId) {
                havePlayer = true;
            }
            this.hideRankUI(value);
        })
        if (havePlayer) {
            this.playerIsHall = false
        }
        /**激活遮蔽物 */
        ModuleService.getModule(ShelterModuleC).setActive(true);
    }
    /**进入观战隐藏等级ui */
    public enterWatch() {
        this.isWatch = true
        this.hideLevelPanel()
    }
    /**退出观战显示等级ui */
    public exitWatch() {
        this.isWatch = false;
        this.onResetPlayerCamera();
        this.showLevelUI()
    }
    /**隐藏等级ui */
    private hideLevelPanel() {
        Player.getAllPlayers().forEach(async (player: mw.Player) => {
            let rankCanvas = await this.getPlayerHeadUI(player.playerId)
            if (rankCanvas) {
                rankCanvas.visibility = mw.SlateVisibility.Collapsed
            }
        })

    }

    /**显示玩家等级ui */
    private showLevelUI() {
        if (this.playerIsHall == false || this.isWatch == true || this.isInit == false) {
            return
        }
        this.playerInHallMap.forEach((value, index) => {
            this.addRankUI(index)
        })

    }
    /**增加等级ui */
    public async addRankUI(playerId: number) {
        let rankUI = await this.getPlayerHeadUI(playerId);
        let nameUI = await this.getPlayerNameUI(playerId);
        if (rankUI == null || rankUI == undefined || !this.playerInHallMap.get(playerId) || this.isInit == false || this.playerLevelMap.get(playerId) == null || this.playerLevelMap.get(playerId) == undefined) {
            return
        }
        this.updateRankUI(playerId)
        rankUI.visibility = mw.SlateVisibility.SelfHitTestInvisible
        if (nameUI == null) {
            return;
        }
        nameUI.visibility = mw.SlateVisibility.SelfHitTestInvisible
    }
    /**隐藏等级ui */
    private async hideRankUI(playerId: number) {
        this.playerInHallMap.delete(playerId)
        let rankUI = await this.getPlayerHeadUI(playerId)
        let nameUI = await this.getPlayerNameUI(playerId);
        if (rankUI == null) {
            return
        }
        rankUI.visibility = mw.SlateVisibility.Collapsed;
        if (nameUI == null) {
            return;
        }
        nameUI.visibility = mw.SlateVisibility.Collapsed;
    }
    /**隐藏所有rankUI */
    private hideAllRankUI() {
        this.playerInHallMap.clear()
        this.hideLevelPanel()
    }
    private async updateRankUI(playerId: number) {
        let level = this.playerLevelMap.get(playerId);
        if (level == null || level == undefined) {
            return;
        }
        let canvas = await this.getPlayerHeadUI(playerId)
        if (!canvas) {
            return;
        }
        let levelText = canvas.getChildAt(1) as mw.TextBlock
        levelText.text = level.toString()
        if (level <= 70) {
            GameConfig.Rank.getAllElement().every((value, index) => {
                if (value.Level == level) {
                    let image = value.BgID.toString()
                    let imageUI = canvas.getChildAt(0) as mw.Image
                    imageUI.imageGuid = image
                    return false
                }
                return true
            });
        } else {
            let imageUI = canvas.getChildAt(0) as mw.Image
            imageUI.imageGuid = `128708`;
        }
    }
    /**获取玩家头顶的等级ui */
    private async getPlayerHeadUI(playerId: number) {
        let otherPlayer = await mw.Player.getPlayer(playerId);
        if (!otherPlayer) {
            return;
        }
        let headWidget = otherPlayer.character.overheadUI
        if (headWidget == null) {
            return;
        }
        headWidget.setVisibility(mw.PropertyStatus.On, false);
        let headUI = headWidget.getTargetUIWidget();
        let rankCanvas = headUI.findChildByPath('mRootCanvas/mCanvas_Rank_1') as mw.Canvas;
        return rankCanvas
    }
    /**获取玩家名字ui */
    private async getPlayerNameUI(playerId: number) {
        let otherPlayer = await mw.Player.getPlayer(playerId);
        if (!otherPlayer) {
            return;
        }
        let headWidget = otherPlayer.character.overheadUI
        if (headWidget == null) {
            return;
        }
        let headUI = headWidget.getTargetUIWidget();
        let rankCanvas = headUI.findChildByPath('mRootCanvas/mText_name') as mw.TextBlock;
        return rankCanvas
    }
    /**展示玩家名字 */
    private changeUI(ui: mw.UIWidget, name: string, isVip: number) {
        ui.setUIbyID('049AD6A946CA75E232D4DCA874511D5B');
        ui.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        ui.drawSize = new mw.Vector2(400, 100);
        ui.selfOcclusion = false;
        ui.occlusionEnable = true;
        let nameUI = ui.getTargetUIWidget()
        let nametext = nameUI.findChildByPath('mRootCanvas/mText_name') as mw.TextBlock;
        nametext.text = name;
        if (isVip == 0) {
            nametext.fontColor = mw.LinearColor.white;
        }
        else {
            nametext.setFontColorByHex(GameConfig.Rule.getElement(isVip).Color);
        }
        nametext.visibility = mw.SlateVisibility.Collapsed;
    }

    /**更改玩家名称颜色 */
    public async net_changePlayerNameColor(playerId: number, configId: number) {
        this.changePlayerNameColor(playerId, configId);
    }

    private async changePlayerNameColor(playerId: number, configId: number) {
        let ui = await this.getPlayerNameUI(playerId);
        if (!ui) {
            return;
        }
        if (configId == 0) {
            ui.fontColor = mw.LinearColor.white;
        }
        else {
            ui.setFontColorByHex(GameConfig.Rule.getElement(configId).Color);
        }
    }

    // private async checkHallAd() {
    //     this._todayFreeReward = await this.server.net_getTodayFreeReward(0);
    //     console.error("kang log 获取当前玩家免费观看大厅广告次数:" + this._todayFreeReward);
    //     if (this._todayFreeReward == 0) {
    //         //直接获得奖励
    //         let rewardPopup = UiManager.instance.getUIRewardPopup();
    //         rewardPopup.show();
    //         this.server.net_getTodayFreeReward(1);
    //         let gold = GameConfig.Rule.getElement(30004).Num
    //         this.server.net_ChangeGold(gold);
    //         rewardPopup.refreshText(gold);
    //         //TODO:开始倒计时
    //         this._mImage_RedPoint.visibility = (mw.SlateVisibility.Collapsed);
    //         console.warn("kang log 今日首次领取奖励后开始倒计时");
    //         let time = GameConfig.Rule.getElement(30006).Time;
    //         this._mText_ADTime.visibility = (mw.SlateVisibility.HitTestInvisible);
    //         this.setCountDown(time);
    //     }
    //     else {
    //         if (await this.getHallAdNum(0) >= this._numL) {
    //             console.warn("kang log 已经达到上限");
    //             P_Tips.show(GameConfig.Tips.getElement(20004).Content);
    //             return;
    //         }
    //         this.rewardAd();
    //         return;
    //         //是否正在倒计时
    //         if (this._mText_ADTime.text != "") {
    //             console.warn("kang log 正在倒计时");
    //             P_Tips.show(GameConfig.Tips.getElement(20003).Content);
    //         }
    //         else {
    //         }
    //     }
    // }
    // private async rewardAd() {
    //     let numA = GameConfig.Rule.getElement(30004).Num;
    //     let numB = await this.server.net_getHallAdNum(0);
    //     let numN = GameConfig.Rule.getElement(30005).Num;
    //     console.warn("kang log numA=" + numA + " numB=" + numB + " numN=" + numN);
    //     //N=A+n*B
    //     let num = numA + numB * numN;
    //     UIService.getUI(AdsPanel).showRewardAd(async () => {
    //         console.warn("kang log 大厅金币激励广告播放成功");
    //         MGSHome.mgsSceneId(2);
    //         console.warn("kang log 大厅金币激励广告播放完成，给奖励");
    //         //弹出奖励界面
    //         let rewardPopup = UiManager.instance.getUIRewardPopup();
    //         rewardPopup.show();

    //         rewardPopup.refreshText(num);
    //         this.server.net_ChangeGold(num);
    //         let nu = await this.getHallAdNum(1);
    //         console.warn("kang log 已经观看了" + nu + "次广告");
    //         //是否满足
    //         if (nu >= this._numL) {
    //             this._mText_ADTime.visibility = (mw.SlateVisibility.Collapsed);
    //             this._mImage_RedPoint.visibility = (mw.SlateVisibility.Collapsed);
    //         }
    //         else {
    //             //继续开始倒计时
    //             this.setCountDown(GameConfig.Rule.getElement(30006).Time);
    //             this._mImage_RedPoint.visibility = (mw.SlateVisibility.Collapsed);
    //         }
    //     }, `免费领取${num}金币`, "取消", "领取");
    // }
    // private async setHallAd() {
    //     //获取当前玩家观看大厅广告次数
    //     this._todayFreeReward = await this.server.net_getTodayFreeReward(0);
    //     this._todayFreeReward == 0 ? this._mText_ADTime.visibility = (mw.SlateVisibility.Collapsed)
    //         : this._mText_ADTime.visibility = (mw.SlateVisibility.HitTestInvisible);
    //     //大厅激励-广告上限L
    //     console.warn("kang log 当前玩家观看大厅广告次数:" + this._todayFreeReward + "大厅观看次数累计" + await this.getHallAdNum(0) + "  大厅激励-广告上限L:" + this._numL);
    //     if (this._todayFreeReward != 0) {
    //         let time = await this.server.net_WatchAdCountDown(0);
    //         console.warn("kang log 正在倒计时 " + time);
    //         //TODO:是否有倒计时，有的话继续倒计时
    //         if (await this.getHallAdNum(0) >= this._numL) {
    //             this._mImage_RedPoint.visibility = (mw.SlateVisibility.Collapsed);
    //         }
    //         else if (time > 0) {
    //             this.setCountDown(time);
    //             this._mImage_RedPoint.visibility = (mw.SlateVisibility.Collapsed);
    //         }
    //     }
    // }

    //倒计时
    // private setCountDown(time: number) {
    //     this._mText_ADTime.visibility = (mw.SlateVisibility.HitTestInvisible);
    //     TimerPlugin.timer(time, 1, (timer: number) => {
    //         //倒计时
    //         this._mText_ADTime.text = (Tools.changeSecond2Minus((time - timer)));
    //         // if ((time - timer) % 5 == 0) {
    //         // console.warn("kang log 保存看广告倒计时=" + (time - timer))
    //         this.server.net_WatchAdCountDown(time - timer);
    //         // }
    //     })
    //         .then((result) => {
    //             if (result) {
    //                 console.warn("kang log 倒计时结束");
    //                 this._mText_ADTime.text = ("");
    //                 this._mText_ADTime.visibility = (mw.SlateVisibility.Collapsed);
    //                 this._mImage_RedPoint.visibility = (mw.SlateVisibility.HitTestInvisible);
    //             }
    //         })
    //         ;
    // }
    // private async getHallAdNum(num: number) {
    //     return await this.server.net_getHallAdNum(num);
    // }
    public net_SetHallTip(state: number) {
        if (state == GamingState.InitState) {
            P_Hall.setHallTip(10001);
            P_Hall.setHallWaitNum(1);
        } else if (state == GamingState.WaitingState) {
            P_Hall.setHallTip(10001);
        }
        else if (state == GamingState.ReadyState) {
            P_Hall.setHallTip(10003);
        } else if (state == GamingState.MapState) {
            P_Hall.setHallTip(20028);
        }
        else {
            P_Hall.setHallTip(10002);
        }
    }
    public net_SetHallWaitNum(num: number) {
        P_Hall.setHallWaitNum(num);
        P_Hall.setHallTip(10001);
    }
    public net_BackToHall(state: GamingState, bo: boolean) {
        P_Game.closeGameUI();
        P_GameFinal.closeGameFinal();
        this.net_FirstInitHallUI(state, !bo);
        P_CoinGet.closeCoinUi();
        ModuleService.getModule(GameModuleC).backToHall();
        ModuleService.getModule(ShelterModuleC).setActive(false);
        setTimeout(() => {
            PlayerManagerExtesion.changeStanceExtesion(this.localPlayer.character, "");
        }, 2000);
    }
    //奖励金币
    public net_RewardGold(gold: number) {
        this.server.net_ChangeGold(gold);
    }
    net_playerHallBGM(): void {
        console.warn(`BGM ==== Hall`);
        let bgm = SoundGlobals.BGM2[0];
        mw.SoundService.stopBGM();
        mw.SoundService.playBGM(bgm.Guid, bgm.Rate);
    }
    //货币相关的
    public getPlayerAdvToken() {
        return this.data.getAdvToken();
    }
    public getPlayerGold() {
        return this.data.getGold();
    }
    public getPlayerDiamond() {
        return this.data.getDiamond();
    }
}

class PlayerNameInfo {
    public playerName: string;
    public specialColorId: number;
    constructor(name: string, colorId: number) {
        this.playerName = name;
        this.specialColorId = colorId;
    }
}