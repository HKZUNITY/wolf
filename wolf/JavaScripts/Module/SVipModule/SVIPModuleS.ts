/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-26 18:16:31
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-10 11:05:44
 * @FilePath     : \murdermystery3\JavaScripts\Module\SVipModule\SVIPModuleS.ts
 * @Description  : 修改描述
 */
import { oTraceWarning } from "odin";
import SVIPData from "./SVIPData";
import SVIPModuleC from "./SVIPModuleC";
import { GameConfig } from "../../Tables/GameConfig";
import { ShopModuleS } from "../ShopModule/ShopCityModule";
import AttributeManager, { AttributeType } from "./AttributeManager";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { GoldType } from "../SkillModule/SkillModuleS";
import { GameGlobals } from "../../Globals";
import { MGSHome } from "../../MGSHome";
export default class SVIPModuleS extends ModuleS<SVIPModuleC, SVIPData> {
    private havePrivilegeMap: Map<number, boolean> = new Map<number, boolean>();
    private playerSVIPInfoMap: Map<number, Map<SVIPGiftType, any>> = new Map<number, Map<SVIPGiftType, any>>();
    private waitUnequipMap: Map<number, Array<number>> = new Map<number, Array<number>>();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        PurchaseService.onPremiumMemberOrderDelivered.add((player: mw.Player, orderId: string, boxId: string, amount: number, confirmOrder: (bReceived: boolean) => void) => {
            this.onKeyConsume(player, orderId, boxId, amount, confirmOrder);
        });
    }
    /**初始化进入玩家的特权 */
    public initPlayerSVIPRight(player: mw.Player) {
        let data = this.getPlayerData(player);
        let giftMap = data.getSVIPInfoArray();
        giftMap.forEach((value, key) => {
            let remain = data.getHaveRemainTime(value.giftId);
            if (remain > 0) {
                this.addGiftRight(player, value.giftId, false);
                this.addSVIPGiftTimer(player, value.giftId);
            }
            else {
                this.getPlayerData(player).deleteSVIPGift(value.giftId);
            }
        })
    }

    /**玩家离开的时候把数据清了吧 */
    public clearSVIPInfo(playerId: number) {
        /**请等待销毁的 */
        if (this.waitUnequipMap.has(playerId)) {
            this.waitUnequipMap.delete(playerId);
        }
        /**请计时器 */
        let playerMap = this.playerSVIPInfoMap.get(playerId);
        if (!playerMap) {
            return;
        }
        playerMap.forEach((value, key) => {
            clearTimeout(value);
        })
        this.playerSVIPInfoMap.delete(playerId);
        /**清除vip */
        if (this.havePrivilegeMap.has(playerId)) {
            this.havePrivilegeMap.delete(playerId);
        }
    }

    public net_changeVipPrivilege(isAdd: boolean) {
        oTraceWarning("oTranceWarning: net_changeVipPrivilege", isAdd)
        if (isAdd) {
            /**为了放置重复添加这里面处理一下 */
            if (!this.havePrivilegeMap.has(this.currentPlayerId)) {
                this.buyGoldenKeyGift(this.currentPlayer, SVIPGiftType.NormalGift);
            }
            this.havePrivilegeMap.set(this.currentPlayerId, true);

        }
        else {
            this.havePrivilegeMap.delete(this.currentPlayerId);
        }
    }
    /**给pie环境下使用的测试接口 */
    public net_buyGoldenKeyGift(giftId: number) {
        this.buyGoldenKeyGift(this.currentPlayer, giftId);
    }

    private buyGoldenKeyGift(player: mw.Player, giftId: number) {
        console.error("购买金钥匙礼包", giftId);

        this.getPlayerData(player).addSVIPGift(giftId);
        this.addGiftRight(player, giftId, true);
        this.addSVIPGiftTimer(player, giftId);
        if (giftId == SVIPGiftType.GoldenKeyGift) {
            MGSHome.buyVipGift_S(player, SVIPGiftType.GoldenKeyGift);
        }

    }

    private addSVIPGiftTimer(player: mw.Player, giftId: number) {
        let timeOut = this.getPlayerData(player).getHaveRemainTime(giftId);
        if (timeOut == 0) {
            return;
        }
        let playerId: number = player.playerId;
        let playerMap = this.playerSVIPInfoMap.get(playerId);
        if (!playerMap) {
            playerMap = new Map<number, any>();
            this.playerSVIPInfoMap.set(playerId, playerMap);
        }
        if (playerMap.has(giftId)) {
            clearTimeout(playerMap.get(giftId));
            playerMap.delete(giftId);
        }
        let timer = setTimeout(() => {
            playerMap = this.playerSVIPInfoMap.get(playerId);
            if (!playerMap) return;
            playerMap.delete(giftId);
            this.getPlayerData(player).deleteSVIPGift(giftId);
            /**先把数据卸了，特权等玩家回来再说 */
            let isHall = GameGlobals.hallPlayer.find((value) => {
                return value.playerId == playerId;
            })
            if (isHall) {
                this.deleteGiftRight(player, giftId);
            }
            else {
                this.addWaitUnEquipItem(playerId, giftId);
            }
            this.getClient(playerId).net_svipGoldenTimeOut();
            //需不需要加一个通知，告诉玩家当前道具已经过期了;
        }, timeOut * 1000);
        playerMap.set(giftId, timer);
    }


    public unequipWaitItem(player: mw.Player) {
        let playerId = player.playerId;
        let unequipItems = this.waitUnequipMap.get(playerId);
        if (!unequipItems) {
            return;
        }
        unequipItems.forEach((value, index) => {
            this.deleteGiftRight(player, value);
        })
    }

    private addWaitUnEquipItem(playerId: number, itemId: number) {
        let unequipItems = this.waitUnequipMap.get(playerId);
        if (!unequipItems) {
            unequipItems = new Array<number>();
            this.waitUnequipMap.set(playerId, unequipItems);
        }
        unequipItems.push(itemId);
    }

    private addGiftRight(player: mw.Player, giftId: number, isNew: boolean) {
        let dataInfo = GameConfig.Member.getElement(giftId);
        if (!dataInfo) {
            return;
        }
        let oldColor = AttributeManager.instance.getAttributeValue(player.playerId, AttributeType.ShowSpecialName);

        let lastTime = dataInfo.Duration * 3600;
        GameConfig.Member.getAllElement().forEach(element => {
            if (element.MemberType == giftId) {
                if (element.ShopItem && element.ShopItem > 0 && isNew == true) {
                    //如果持续时间小于0，那么就是和会员共存的,否则就是带有时间限制的，会员共存的逻辑还没有做，没有需求，暂时搁置
                    ModuleService.getModule(ShopModuleS).addItem(player, element.ShopItem, lastTime);
                }
                if (element.RewardType && element.RewardType > 0) {
                    AttributeManager.instance.setAttributeValue(player.playerId, element.RewardType, element.RewardNum);
                }
                if (element.CurrencyType && element.CurrencyType > 0 && isNew == true) {
                    if (element.CurrencyType == GetGoldType.Gold) {
                        ModuleService.getModule(PlayerModuleS).changeGold(player, element.CurrencyNum);
                    }
                    else if (element.CurrencyType == GetGoldType.Diamond) {
                        ModuleService.getModule(PlayerModuleS).changeDiamond(player, element.CurrencyNum);
                    }
                    else if (element.CurrencyType == GetGoldType.AdvToken) {
                        ModuleService.getModule(PlayerModuleS).changeAdvToken(player, element.CurrencyNum);
                    }
                }
            }
        })
        let newColor = AttributeManager.instance.getAttributeValue(player.playerId, AttributeType.ShowSpecialName);
        if (oldColor != newColor) {
            ModuleService.getModule(PlayerModuleS).changePlayerNameColor(player.playerId, newColor);
        }

    }
    /**金币不需要收回，商店的商店那边已经处理了，这里只需要去除特权即可 */
    private deleteGiftRight(player: mw.Player, giftId: number) {
        GameConfig.Member.getAllElement().forEach(element => {
            if (element.MemberType == giftId) {
                if (element.RewardType && element.RewardType > 0) {
                    AttributeManager.instance.resetAttributeValue(player.playerId, element.RewardType);
                }
            }
        })
    }



    private onKeyConsume(player: mw.Player, orderId: string, boxId: string, amount: number, confirmOrder: (bReceived: boolean) => void) {
        this.buyGoldenKeyGift(player, Number(boxId));
        confirmOrder(true);
    }

    public getHavePrivilegeMap() {
        return this.havePrivilegeMap;
    }
}

enum GetGoldType {
    Gold = 1,
    Diamond = 2,
    AdvToken = 3,
}

enum SVIPGiftType {
    NormalGift = 1,
    GoldenKeyGift = 2,
}
