import { MGSHome } from "../../MGSHome";
import { GameConfig } from "../../Tables/GameConfig";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { ShopModuleS } from "../ShopModule/ShopCityModule";
import { GoldType, SkillModuleS } from "../SkillModule/SkillModuleS";
import ExchangeModuleC from "./ExchangeModuleC";

export default class ExchangeModuleS extends ModuleS<ExchangeModuleC, null> {

    public net_buyExchangeItem(id: number){
        let dataInfo = GameConfig.Exchange.getElement(id);
        if(dataInfo == null){
            return false;
        }
        let haveCount = ModuleService.getModule(PlayerModuleS).getAdvToken(this.currentPlayer);
        let needCount = dataInfo.ConsumeNum;
        
        if (haveCount < needCount) {
            return false;
        }
        ModuleService.getModule(PlayerModuleS).changeAdvToken(this.currentPlayer, -needCount);
        //货币
        if (dataInfo.GetType > 0) {
            if (dataInfo.GetType == ExchangeGoldType.Gold) {
                ModuleService.getModule(PlayerModuleS).changeGold(this.currentPlayer, dataInfo.GetNum);
            }
            else if(dataInfo.GetType == ExchangeGoldType.Diamond){
                ModuleService.getModule(PlayerModuleS).changeDiamond(this.currentPlayer, dataInfo.GetNum);
            }
        }
        //装备
        else if(dataInfo.ShopItem > 0){
            ModuleService.getModule(ShopModuleS).buyItemByShopId(this.currentPlayer, dataInfo.ShopItem);
        }
        //能力
        else if(dataInfo.SkillShopItem > 0){
            ModuleService.getModule(SkillModuleS).buySkill(this.currentPlayer, dataInfo.SkillShopItem, GoldType.Adv);
        }
        MGSHome.exchangeItem(this.currentPlayer, id);
        return true;
    }
}

export enum ExchangeGoldType{
	Gold = 1,
	Diamond = 2,
}