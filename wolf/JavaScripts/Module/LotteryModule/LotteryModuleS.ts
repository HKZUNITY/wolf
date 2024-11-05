import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { LotteryModuleC } from "./LotteryModuleC";

export class LotteryModuleS extends ModuleS<LotteryModuleC, null> {

    net_ChangeGold(playerId: number, cost: number) {
        ModuleService.getModule(PlayerModuleS).changeGold(this.currentPlayer, cost);
    }
    net_SetLotterySaleTimes(playerId: number, lotteryIndex: number, reset: boolean) {
        let data = DataCenterS.getData(playerId, PlayerModuleData);
        data.setLotterySaleTimes(lotteryIndex, reset);
        data.save(true);
    }
    /**gm用的别调用 */
    gmLotterySaleTimes(playerId: number) {
        let data = DataCenterS.getData(playerId, PlayerModuleData);
        data.lotterySaleTimesArr.forEach((value, index) => {
            data.lotterySaleTimesArr[index] = 100;
        })
    }
    net_SetLotteryWatchAdTime(playerId: number, lotteryIndex: number) {
        let data = DataCenterS.getData(playerId, PlayerModuleData);
        data.setLotteryWatchAdTime(lotteryIndex);
    }
    net_startLottery(boxId: number, isUseMoney: boolean) {
        if (isUseMoney) {
            ModuleService.getModule(PlayerModuleS).playerUseMoneyDraw(this.currentPlayerId, boxId);
        }
        else {
            ModuleService.getModule(PlayerModuleS).playerWatchAdDraw(this.currentPlayerId, boxId);
        }

    }
}