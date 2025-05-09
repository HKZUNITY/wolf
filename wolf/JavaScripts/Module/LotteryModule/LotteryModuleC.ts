﻿import P_Hall from "../../UILogic/Hall/P_Hall";
import { LotteryModuleS } from "./LotteryModuleS";
import { LotteryInsidePanel, LotteryPanel, LotteryScrollPanel } from "./LotteryPanel";
import { GameConfig } from "../../Tables/GameConfig";
import { ShopModuleC } from "../ShopModule/ShopCityModule";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { ShopModuleData } from "../ShopModule/ShopData";
import { Tools } from "../../Tools";

export class LotteryModuleC extends ModuleC<LotteryModuleS, null> {
    // 主界面
    private panel: LotteryPanel = null;
    // 武器箱内部界面
    private insidePanel: LotteryInsidePanel = null;
    // 滚动界面
    private scrollPanel: LotteryScrollPanel = null;

    // 滚动动画
    private scrollTween: mw.Tween<{
        x: number;
    }> = null;
    // 当前武器箱
    private curLotteryIndex: number = null
    // 本次抽象选中武器索引
    private index: number;
    // 滚动初速度
    private scrollStartSpeed: number;
    // 滚动时间
    private scrollTime: number = 6;
    // 滚动距离
    private scrollDistance: number;
    // 是否抽奖中
    private scrolling: boolean = false;
    // 结果展示定时器
    private resTimeout: number = null;
    onStart() {

    }
    public getIsScrolling() {
        return this.scrolling;
    }
    lotteryOpen(isOpen: boolean) {
        if (this.panel == null) {
            this.panel = this.creatPanel();
        }
        if (isOpen && this.panel.getView().visible == false) {
            mw.UIService.showUI(this.panel.getView());
            //TODO 默认展示
            //其他UI隐藏
            P_Hall.instance.showLottery();
            this.panel.refreshLotteryPage();
        }
        else if (isOpen == false && this.panel.getView().visible == true) {
            this.lotteryInsideOpen(false);
            mw.UIService.hideUI(this.panel.getView());
            P_Hall.instance.hideLottery();
        }
    }
    lotteryInsideOpen(isOpen: boolean, curLotteryIndex?: number) {
        if (this.insidePanel == null) {
            this.insidePanel = this.creatInsidePanel();
        }
        if (curLotteryIndex != undefined) {
            this.curLotteryIndex = curLotteryIndex
        }
        if (isOpen) {
            mw.UIService.hideUI(this.panel.getView());
            this.insidePanel.getView().mCanvas_lottery0.visibility = mw.SlateVisibility.SelfHitTestInvisible
            mw.UIService.showUI(this.insidePanel.getView());
            this.insidePanel.init(this.curLotteryIndex);
            this.insidePanel.setLotteryAd(false);
        }
        else {
            this.insidePanel.stopCountDown()
            if (this.resTimeout != null) {
                clearTimeout(this.resTimeout);
                this.insidePanel.closeResPanel();
                this.resTimeout = null;
            }
            this.lotteryScrollOpen(false);
            this.calcScrollResult(this.curLotteryIndex, false);
            mw.UIService.showUI(this.panel.getView());
            mw.UIService.hideUI(this.insidePanel.getView());
            /**为了在游戏里面也能抽奖之个先不能置空 */
            // this.curLotteryIndex = null
        }
    }
    lotteryScrollOpen(isOpen: boolean) {
        if (this.scrolling) return;
        if (this.resTimeout != null) {
            clearTimeout(this.resTimeout);
            this.insidePanel.closeResPanel();
            this.resTimeout = null;
        }
        if (this.scrollPanel == null) {
            this.scrollPanel = this.createScrollPanel();
        }
        if (isOpen) {
            this.scrolling = true
            mw.UIService.showUI(this.scrollPanel.getView());
            this.scrollPanel.init(this.curLotteryIndex);
        }
        else {
            mw.UIService.hideUI(this.scrollPanel.getView());
        }
    }
    /**开始抽奖，给埋点的 */
    startLottery(boxId: number, isUseMoney: boolean){
        this.server.net_startLottery(boxId, isUseMoney);
    }
    //创建UI
    private creatPanel(): LotteryPanel {
        let panel: LotteryPanel = mw.UIService.create(LotteryPanel);
        panel.init();
        return panel;
    }
    private creatInsidePanel(): LotteryInsidePanel {
        let panel: LotteryInsidePanel = mw.UIService.create(LotteryInsidePanel);
        return panel;
    }
    private createScrollPanel(): LotteryScrollPanel {
        let panel: LotteryScrollPanel = mw.UIService.create(LotteryScrollPanel);
        return panel;
    }
    public changeCoin(num: number) {
        if (this.insidePanel == null) return
        this.insidePanel.getView().mTextBlock_CoinNum.text = num.toString()
    }
    public changeGold(cost: number) {
        this.server.net_ChangeGold(this.localPlayer.playerId, cost);
    }
    public setLotterySaleTimes(lotteryIndex: number, reset: boolean) {
        this.server.net_SetLotterySaleTimes(this.localPlayer.playerId, lotteryIndex, reset);
    }
    public setLotteryWatchAdTime(lotteryIndex: number) {
        this.server.net_SetLotteryWatchAdTime(this.localPlayer.playerId, lotteryIndex);
    }
    public getRandomIndexRes(lotteryIndex: number, isEnd: boolean) {
        //TODO 根据一定规则 随机返回物品下标
        let itemArr = GameConfig.Lottery.getElement(lotteryIndex).Item;
        let rateArr = GameConfig.Lottery.getElement(lotteryIndex).Rate;
        let randomValue = mw.MathUtil.randomFloat(0, 1);
        let total = 0;
        for (let index = 0; index < rateArr.length; index++) {
            if (isEnd) {
                return this.getRandomMaxRateIndex(lotteryIndex);
            }
            total += rateArr[index];
            if (total >= randomValue) {
                return index;
            }
        }
    }

    private getRandomMaxRateIndex(lotteryIndex: number){
        let itemArr = GameConfig.Lottery.getElement(lotteryIndex).Item;
        let resArr = new Array<RandomItem>();
        itemArr.forEach((value, index)=>{
            let shopInfo = GameConfig.Shop.getElement(value);
            if(shopInfo.Rarity == 0){
                resArr.push(new RandomItem(value, index));
            }
        })
        if (resArr.length == 0) {
            console.error("没有找到稀有物品");
            return;   
        }
        let haveArr = ModuleService.getModule(ShopModuleC).getHaveArray();
        let notHaveDrawArr = new Array<RandomItem>();
        resArr.forEach((value, index)=>{
            if (haveArr.includes(value.itemId) == false) {
                notHaveDrawArr.push(value);
            }
        })
        //优先获得未拥有的
        if (notHaveDrawArr.length > 0) {
            let randomIndex = Tools.getRandomInt(0, notHaveDrawArr.length - 1);
            return notHaveDrawArr[randomIndex].lotteryIndex;
        }
        else{
            let randomIndex = Tools.getRandomInt(0, resArr.length - 1);
            return resArr[randomIndex].lotteryIndex;
        }
    }



    public scroll(lotteryIndex: number, isEnd: boolean) {
        //TODO 滚动列表
        this.index = this.getRandomIndexRes(lotteryIndex, isEnd);
        let chiledrenCount = this.scrollPanel.getView().mCanvas.getChildrenCount();
        let oneLength = this.scrollPanel.getItemSize().x;
        let randomValue = mw.MathUtil.randomInt(10, 30);
        this.scrollDistance = oneLength * randomValue + this.scrollPanel.getStyle()[0] * (randomValue - 1);
        this.scrollStartSpeed = this.scrollDistance * 2 / this.scrollTime;

        this.scrollTween = new mw.Tween({ x: this.scrollStartSpeed })
            .to({ x: 0 }, this.scrollTime * 1000)
            .onUpdate((v) => {
                this.scrollPanel.getView().mCanvas.position = mw.Vector2.add(this.scrollPanel.getView().mCanvas.position, new mw.Vector2(-v.x * TimeUtil.deltatime(), 0));
                //TODO 子物体改变位置  实现循环
                this.scrollPanel.updateScrollItemPos(randomValue, this.index);
            })
            .onComplete(() => {
                this.calcScrollResult(lotteryIndex);
            }).start();
    }
    public calcScrollResult(lotteryIndex: number, isShowRes: boolean = true) {
        if (!this.scrolling) return;
        if (this.scrollTween != null) {
            this.scrollTween.stop();
            this.scrollTween = null;
        }
        this.scrolling = false
        //TODO 根据index 执行操作
        this.lotteryScrollOpen(false)
        if (isShowRes) {
            this.showResPanel(GameConfig.Lottery.getElement(lotteryIndex).Item[this.index])
            this.resTimeout = setTimeout(() => {
                this.insidePanel.closeResPanel();
            }, 3000);
        }
        let curWeaponId = GameConfig.Lottery.getElement(lotteryIndex).Item[this.index]
        let index = (curWeaponId - curWeaponId % 10000) / 10000;
        let itemInfo = DataCenterC.getData(ShopModuleData).getShopDataByMap(index);
        let cfg = GameConfig.Lottery.getElement(lotteryIndex);
        let itemId = cfg.Item[this.index];
        let reclaim = GameConfig.Shop.getElement(itemId).Reclaim;
        if (itemInfo.state[itemInfo.listId.indexOf(curWeaponId)] == 1) {
            ModuleService.getModule(ShopModuleC).getItem(itemId);
        }
        else {
            ModuleService.getModule(PlayerModuleC).net_RewardGold(reclaim);
        }

    }

    private showResPanel(itemId: number){
        if (!this.insidePanel.getView().visible) {
            this.insidePanel.getView().mCanvas_lottery0.visibility = mw.SlateVisibility.Collapsed
            mw.UIService.showUI(this.insidePanel.getView())
        }
        this.insidePanel.showResPanel(itemId)
    }
    
}

class RandomItem{
    public itemId: number;
    public lotteryIndex: number;
    constructor(itemId: number, lotteryIndex: number){
        this.itemId = itemId;
        this.lotteryIndex = lotteryIndex;
    }
}