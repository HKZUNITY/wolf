import { GameGlobals } from "../../Globals";
import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { GameConfig } from "../../Tables/GameConfig";
import { BagModuleS } from "../BagModule/BagModuleS";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import ShopModuleC from "./ShopModuleC";
import ShopModuleData, { ItemState } from "./ShopModuleData";

export default class ShopModuleS extends ModuleS<ShopModuleC, ShopModuleData> {
    private effectPropMap: Map<number, number> = new Map();
    private itemMap: Map<number, mw.GameObject> = new Map();
    private playerTimeShopItemMap: Map<number, Map<number, any>> = new Map<number, Map<number, any>>();
    /**进入对局但是装备过期的玩家，会到大厅后会触发道具卸载 */
    private waitUnequipMap: Map<number, Array<number>> = new Map<number, Array<number>>();
    initRole(playerId: number, roleID: number) {
        let cfg = GameConfig.Shop.getAllElement();
        let player = Player.getPlayer(playerId);
        cfg.forEach(value => {
            if (value.ID > 40000 && value.ID < 50000) {
                if (value.SuitItems[0] == roleID) {
                    // this.useCloth(player, value.ID);
                }
            }
        })
    }

    public initShopItem(player: mw.Player) {
        this.checkTimeShopItem(player);
        let useArray = this.getPlayerData(player).usingItems;
        let isCold: boolean = false;
        let isHot: boolean = false;
        useArray.forEach((value) => {
            let kind = (value - value % 10000) / 10000;
            if (kind != 4) this.useItem(player, value, true, true);
            if (kind == 1) {
                isCold = true;
            }
            else if (kind == 2) {
                isHot = true;
            }
        })
        if (!isCold) {
            this.useItem(player, 10000, true, true);
        }
        if (!isHot) {
            this.useItem(player, 20000, true, true);
        }
    }



    net_UseItem(id: number, isUse: boolean) {
        this.useItem(this.currentPlayer, id, isUse, false);
    }

    public useItem(player: mw.Player, id: number, isUse: boolean, isInit: boolean) {
        let kind = (id - id % 10000) / 10000;
        console.error(`kind:${kind} isUse:${isUse}`);
        if (isUse) {
            if (isInit == false && this.getPlayerData(player).getItemState(id) == ItemState.NotOwn) {
                return;
            }
            if (this.getPlayerData(player).usingItems.includes(id) && isInit == false) {
                console.error("重复的，返回");
                return;
            }
            if (kind == 1) {
                this.useWeapon(player, id);
            }
            else if (kind == 2) {
                this.useWeapon(player, id);

            }
            else if (kind == 3) {
                this.useEffect(player, id);
            }
            else if (kind == 5) {
                this.equipDecoration(player, id);
            }
            else if (kind == 4) {
                this.useCloth(player, id);
            }
        }
        else {
            if (kind == 1) {
                this.useWeapon(player, 10000);
            }
            else if (kind == 2) {
                this.useWeapon(player, 20000);
            }
            else if (kind == 3) {
                this.useEffect(player, 30000);
            }
            else if (kind == 5) {
                this.equipDecoration(player, 50000);
            }
            else if (kind == 4) {
                this.useCloth(player, 40000);
            }
        }
    }
    async equipDecoration(player: mw.Player, id: number) {
        this.getPlayerData(player).setUsingItem(id);
        this.getPlayerData(player).save(true);
        let playerId = player.playerId;
        if (id % 10000 == 0) {
            this.destroyDecorator(playerId);
        }
        else {
            this.destroyDecorator(playerId);
            let dataInfo = GameConfig.Shop.getElement(id);
            let obj = await SpawnManager.asyncSpawn({ guid: dataInfo.ModelGuid, replicates: true });
            obj.setCollision(mw.CollisionStatus.Off, true);
            player.character.attachToSlot(obj, dataInfo.RabbetPart);
            obj.localTransform.position = dataInfo.Offset.clone();
            obj.localTransform.rotation = new Rotation(dataInfo.Rotation);
            obj.worldTransform.scale = dataInfo.Scale.clone();
            this.itemMap.set(playerId, obj);
        }
        this.getClient(player).net_RefreshUI(id);
    }

    useWeapon(player: mw.Player, id: number) {
        this.getPlayerData(player).setUsingItem(id);
        this.getPlayerData(player).save(true);
        this.getClient(player).net_RefreshUI(id);
        if (id >= 20000) {//远程
            ModuleService.getModule(BagModuleS).equipHotWeapon(player, id + 1);
        }
        else {
            ModuleService.getModule(BagModuleS).equipColdWeapon(player, id + 1);
        }
    }
    useEffect(player: mw.Player, id: number) {
        this.resetEffect(player.playerId);
        this.getPlayerData(player).setUsingItem(id);
        this.getPlayerData(player).save(true);
        DataCenterS.getData(player, PlayerModuleData).setPlayerEffId(id);
        DataCenterS.getData(player, PlayerModuleData).save(true);
        this.getClient(player).net_RefreshUI(id);
        if (id == 30000) return;
        let effectId = GameConfig.Shop.getElement(id).ModelGuid;
        let newid = GeneralManager.rpcPlayEffectOnPlayer(effectId, player, mw.HumanoidSlotType.Root, -100, new mw.Vector(0, 0, 30), new mw.Rotation(0, 0, 0));
        this.effectPropMap.set(player.playerId, newid);
    }
    useCloth(player: mw.Player, id: number) {
        this.getPlayerData(player).setUsingItem(id);
        this.getPlayerData(player).save(true);
        this.getClient(player).net_RefreshUI(id);
        let cloth = 0;
        if (id == 40000) {//脱下
            // cloth = DataCenterS.getData(player, PlayerModuleData).getPlayerOrginRole();
            cloth = id;
        } else {
            cloth = GameConfig.Shop.getElement(id).SuitItems[0];
        }
        ModuleService.getModule(PlayerModuleS).net_SetPlayerModel(player.playerId, Number(cloth), true);
    }
    /**本来隐身不需要隐藏玩家身上道具，编辑器有问题绕一下 */
    stealHideEquipItem(player: mw.Player, isActive: boolean) {
        let playerId = player.playerId;
        let decoration = this.itemMap.get(playerId);
        if (decoration) {
            let isShow = isActive ? mw.PropertyStatus.On : mw.PropertyStatus.Off;
            decoration.setVisibility(isShow, true);
        }

        let effectId = this.effectPropMap.get(playerId);
        if (effectId && isActive == false) {
            EffectService.stop(effectId);
            this.effectPropMap.delete(playerId);
        }
        else if (isActive) {
            let data = this.getPlayerData(playerId);
            data.usingItems.forEach((value) => {
                let type = Math.floor(value / 10000);
                if (type == 3) {
                    this.useEffect(player, value);
                }
            })
        }

    }

    clearShopItem(playerId: number) {
        this.resetEffect(playerId);
        this.destroyDecorator(playerId);
        this.deleteTimeShopTimer(playerId);
        this.deleteWaitUnequipItem(playerId);
    }

    destroyDecorator(playerId: number) {
        if (this.itemMap.has(playerId)) {
            let id = this.itemMap.get(playerId);
            id.destroy();
        }
    }

    resetEffect(playerId: number) {
        if (this.effectPropMap.has(playerId)) {
            let id = this.effectPropMap.get(playerId);
            EffectService.stop(id);
        }
    }

    public unequipWaitItem(player: mw.Player) {
        let playerId = player.playerId;
        let unequipItems = this.waitUnequipMap.get(playerId);
        if (!unequipItems) {
            return;
        }
        unequipItems.forEach((value, index) => {
            this.useItem(player, value, false, false);
        })
    }

    private deleteWaitUnequipItem(playerId: number) {
        if (this.waitUnequipMap.has(playerId)) {
            this.waitUnequipMap.delete(playerId);
        }
    }

    /**增加带时间限制的物品 */
    private addTimeSheapItem(player: mw.Player, itemId: number, lastTime: number) {
        let timeOutTime = this.getPlayerData(player).addShopTimeItem(itemId, lastTime);
        this.addShopTimeItemTimer(player, itemId, timeOutTime);
    }

    /**添加一个时限物品的监听*/
    private addShopTimeItemTimer(player: mw.Player, itemId: number, timeOut: number) {
        let playerId: number = player.playerId;
        let playerMap = this.playerTimeShopItemMap.get(playerId);
        if (!playerMap) {
            playerMap = new Map<number, any>();
            this.playerTimeShopItemMap.set(playerId, playerMap);
        }
        if (playerMap.has(itemId)) {
            clearTimeout(playerMap.get(itemId));
            playerMap.delete(itemId);
        }
        let timer = setTimeout(() => {
            playerMap = this.playerTimeShopItemMap.get(playerId);
            if (!playerMap) return;
            playerMap.delete(itemId);
            this.getPlayerData(player).deleteShopTimeItem(itemId);
            /**先把数据卸了，物品等玩家回来再说 */
            if (this.getPlayerData(player).usingItems.includes(itemId)) {
                let isHall = GameGlobals.hallPlayer.find((value) => {
                    return value.playerId == playerId;
                })
                if (isHall) {
                    this.useItem(player, itemId, false, false);
                }
                else {
                    this.addWaitUnEquipItem(playerId, itemId);
                }
            }
            let itemType = (itemId - itemId % 10000);
            this.getPlayerData(player).setUsingItem(itemType);
            this.getClient(playerId).net_RefreshUI(itemId);
            //需不需要加一个通知，告诉玩家当前道具已经过期了;
        }, timeOut * 1000);
        playerMap.set(itemId, timer);
    }

    private addWaitUnEquipItem(playerId: number, itemId: number) {
        let unequipItems = this.waitUnequipMap.get(playerId);
        if (!unequipItems) {
            unequipItems = new Array<number>();
            this.waitUnequipMap.set(playerId, unequipItems);
        }
        unequipItems.push(itemId);
    }

    /**玩家退出 */
    private deleteTimeShopTimer(playerId: number) {
        let playerMap = this.playerTimeShopItemMap.get(playerId);
        if (!playerMap) {
            return;
        }
        playerMap.forEach((value, key) => {
            clearTimeout(value);
        })
        this.playerTimeShopItemMap.delete(playerId);
    }
    /**玩家上线了，需要检查一下物品是否到期 */
    private checkTimeShopItem(player: mw.Player) {
        let playerData = this.getPlayerData(player);
        let haveTimes = playerData.getHaveTimeItems();
        haveTimes.forEach((value, index) => {
            let nowTime = TimeUtil.time();
            let endTime = value.haveTime + value.lastTime;

            if (nowTime >= endTime) {
                playerData.deleteShopTimeItem(value.itemId);
                if (playerData.usingItems.includes(value.itemId)) {
                    this.useItem(player, value.itemId, false, false);
                }
            }
            else {
                let remainTime = endTime - nowTime;
                this.addShopTimeItemTimer(player, value.itemId, remainTime);
            }
        })
        playerData.usingItems.forEach((useItem, index) => {
            if (useItem) {
                let state = playerData.getItemState(useItem);
                if (state != ItemState.Using) {
                    playerData.usingItems = playerData.usingItems.filter((value) => { value != useItem });
                }
            }
        })
    }
    //直接添加物品，gm以及购买大会员礼包会用到
    addItem(player: mw.Player, itemId: number, lastTime: number) {
        let dataInfo = GameConfig.Shop.getElement(itemId);
        if (!dataInfo) {
            return;
        }
        if (lastTime < 0) {
            this.getPlayerData(player).setItemState(itemId, ItemState.Own);
        }
        else {
            this.addTimeSheapItem(player, itemId, lastTime);
        }
        this.getClient(player).net_RefreshUI(itemId);
    }

    //根据商店的id添加物品，兑换使用
    buyItemByShopId(player: mw.Player, shopId: number) {
        let dataInfo = GameConfig.Shop.getElement(shopId);
        let res = false;
        if (!dataInfo) {
            return res;
        }
        let money = dataInfo.Price;
        let costType = dataInfo.Money;
        if (costType == CurrencyType.Gold) {
            res = ModuleService.getModule(PlayerModuleS).tryDesGold(player, money);
        }
        else if (costType == CurrencyType.Diamond) {
            res = ModuleService.getModule(PlayerModuleS).tryDesDiamond(player, money);
        }
        else if (costType == CurrencyType.AdvToken) {
            res = ModuleService.getModule(PlayerModuleS).changeAdvToken(player, -money);
        }

        if (res) {
            this.getPlayerData(player).setItemState(shopId, ItemState.Own);
            this.getClient(player).net_RefreshUI(shopId);
        }
        return res;
    }

    net_BuyItem(id: number) {
        return this.buyItemByShopId(this.currentPlayer, id);
    }
    net_GetItem(id: number) {
        DataCenterS.getData(this.currentPlayer, ShopModuleData).setItemState(id, ItemState.Own);
        DataCenterS.getData(this.currentPlayer, ShopModuleData).save(true);
    }
    /**服装预览 */
    net_previewCloth(id: number, isPreview: boolean) {
        let cloth = 0;
        if (isPreview) {
            cloth = GameConfig.Shop.getElement(id).SuitItems[0];
        }
        else {//还原之前角色
            return;
            cloth = DataCenterS.getData(this.currentPlayer, PlayerModuleData).getPlayerRoleId();
        }
        ModuleService.getModule(PlayerModuleS).net_SetPlayerModel(this.currentPlayer.playerId, Number(cloth), false);
    }

    public award(player: mw.Player, shopId: number): void {
        this.getPlayerData(player).setItemState(shopId, ItemState.Own);
    }
}
/**货币类型 */
export enum CurrencyType {
    Gold = 0,
    Diamond = 1,
    Draw = 2,
    AdvToken = 5,
}