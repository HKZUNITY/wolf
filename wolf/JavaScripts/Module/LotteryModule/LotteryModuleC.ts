import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import ChatPanel from "../DanMuModule/ui/ChatPanel";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import ShopModuleC from "../ShopModule/ShopModuleC";
import ShopModuleData from "../ShopModule/ShopModuleData";
import { LotteryModuleS } from "./LotteryModuleS";
import LotteryInPanel from "./ui/LotteryInPanel";
import LotteryPanel from "./ui/LotteryPanel";
import LotteryTypePanel from "./ui/LotteryTypePanel";

export class LotteryModuleC extends ModuleC<LotteryModuleS, null> {
    // 主界面
    private lotteryPanel: LotteryPanel = null;
    private get getLotteryPanel(): LotteryPanel {
        if (this.lotteryPanel == null) {
            this.lotteryPanel = mw.UIService.getUI(LotteryPanel);
            this.lotteryPanel.init();
        }
        return this.lotteryPanel;
    }
    // 武器箱内部界面
    private lotteryTypePanel: LotteryTypePanel = null;
    private get getLotteryTypePanel(): LotteryTypePanel {
        if (this.lotteryTypePanel == null) {
            this.lotteryTypePanel = mw.UIService.getUI(LotteryTypePanel);
        }
        return this.lotteryTypePanel;
    }
    // 滚动界面
    private lotteryInPanel: LotteryInPanel = null;
    private get getLotteryInPanel(): LotteryInPanel {
        if (this.lotteryInPanel == null) {
            this.lotteryInPanel = mw.UIService.getUI(LotteryInPanel);
        }
        return this.lotteryInPanel;
    }
    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }
    private chatPanel: ChatPanel = null;
    private get getChatPanel(): ChatPanel {
        if (!this.chatPanel) {
            this.chatPanel = UIService.getUI(ChatPanel);
        }
        return this.chatPanel;
    }

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
        if (isOpen) {
            this.getLotteryPanel.show();
            this.getHUDPanel.showLottery();//其他UI隐藏
            this.getLotteryPanel.refreshLotteryPage();
            this.getChatPanel.hide();
        } else {
            this.lotteryInsideOpen(false);
            this.getLotteryPanel.hide();
            this.getHUDPanel.hideLottery();
            this.getChatPanel.show();
        }
    }

    lotteryInsideOpen(isOpen: boolean, curLotteryIndex?: number) {
        if (this.lotteryTypePanel == null) this.lotteryTypePanel = mw.UIService.getUI(LotteryTypePanel);

        if (curLotteryIndex != undefined) {
            this.curLotteryIndex = curLotteryIndex
        }

        if (isOpen) {
            this.getLotteryPanel.hide();
            this.getLotteryTypePanel.mCanvas_lottery0.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.getLotteryTypePanel.show();
            this.getLotteryTypePanel.init(this.curLotteryIndex);
        } else {
            this.getLotteryTypePanel.stopCountDown()
            if (this.resTimeout != null) {
                clearTimeout(this.resTimeout);
                this.getLotteryTypePanel.closeResPanel();
                this.resTimeout = null;
            }
            this.lotteryScrollOpen(false);
            this.calcScrollResult(this.curLotteryIndex, false);
            this.getLotteryPanel.show();
            this.getLotteryTypePanel.hide();
        }
    }
    lotteryScrollOpen(isOpen: boolean) {
        if (this.scrolling) return;
        if (this.resTimeout != null) {
            clearTimeout(this.resTimeout);
            this.getLotteryTypePanel.closeResPanel();
            this.resTimeout = null;
        }

        if (this.lotteryInPanel == null) this.lotteryInPanel = mw.UIService.getUI(LotteryInPanel);

        if (isOpen) {
            this.scrolling = true
            this.getLotteryInPanel.show();
            this.getLotteryInPanel.init(this.curLotteryIndex);
        } else {
            this.getLotteryInPanel.hide();
        }
    }
    /**开始抽奖，给埋点的 */
    startLottery(boxId: number, isUseMoney: boolean) {
        this.server.net_startLottery(boxId, isUseMoney);
    }

    public changeCoin(num: number) {
        if (this.lotteryTypePanel == null) return
        this.getLotteryTypePanel.mTextBlock_CoinNum.text = num.toString()
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

    private getRandomMaxRateIndex(lotteryIndex: number) {
        let itemArr = GameConfig.Lottery.getElement(lotteryIndex).Item;
        let resArr = new Array<RandomItem>();
        itemArr.forEach((value, index) => {
            let shopInfo = GameConfig.Shop.getElement(value);
            if (shopInfo.Rarity == 0) {
                resArr.push(new RandomItem(value, index));
            }
        })
        if (resArr.length == 0) {
            console.error("没有找到稀有物品");
            return;
        }
        let haveArr = ModuleService.getModule(ShopModuleC).getHaveArray();
        let notHaveDrawArr = new Array<RandomItem>();
        resArr.forEach((value, index) => {
            if (haveArr.includes(value.itemId) == false) {
                notHaveDrawArr.push(value);
            }
        })
        //优先获得未拥有的
        if (notHaveDrawArr.length > 0) {
            let randomIndex = Tools.randomInt(0, notHaveDrawArr.length - 1);
            return notHaveDrawArr[randomIndex].lotteryIndex;
        }
        else {
            let randomIndex = Tools.randomInt(0, resArr.length - 1);
            return resArr[randomIndex].lotteryIndex;
        }
    }

    public scroll(lotteryIndex: number, isEnd: boolean) {
        //TODO 滚动列表
        this.index = this.getRandomIndexRes(lotteryIndex, isEnd);
        let chiledrenCount = this.getLotteryInPanel.mCanvas.getChildrenCount();
        let oneLength = this.getLotteryInPanel.getItemSize().x;
        let randomValue = mw.MathUtil.randomInt(10, 30);
        this.scrollDistance = oneLength * randomValue + this.getLotteryInPanel.getStyle()[0] * (randomValue - 1);
        this.scrollStartSpeed = this.scrollDistance * 2 / this.scrollTime;

        this.scrollTween = new mw.Tween({ x: this.scrollStartSpeed })
            .to({ x: 0 }, this.scrollTime * 1000)
            .onUpdate((v) => {
                this.getLotteryInPanel.mCanvas.position = mw.Vector2.add(this.getLotteryInPanel.mCanvas.position, new mw.Vector2(-v.x * TimeUtil.deltatime(), 0));
                //TODO 子物体改变位置  实现循环
                this.getLotteryInPanel.updateScrollItemPos(randomValue, this.index);
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
                this.getLotteryTypePanel.closeResPanel();
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
        } else {
            ModuleService.getModule(PlayerModuleC).net_RewardGold(reclaim);
        }
    }

    private showResPanel(itemId: number) {
        if (!this.lotteryTypePanel?.visible) {
            this.getLotteryTypePanel.mCanvas_lottery0.visibility = mw.SlateVisibility.Collapsed
            this.getLotteryTypePanel.show();
        }
        this.getLotteryTypePanel.showResPanel(itemId)
    }

}

class RandomItem {
    public itemId: number;
    public lotteryIndex: number;
    constructor(itemId: number, lotteryIndex: number) {
        this.itemId = itemId;
        this.lotteryIndex = lotteryIndex;
    }
}