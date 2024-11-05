import { Camp, GameGlobals, PlayerGameState } from "./Globals";
import { BagModuleData } from "./Module/BagModule/BagData";
import { GameModuleData } from "./Module/GameModule/GameData";
import { PlayerModuleData } from "./Module/PlayerModule/PlayerData";

export class GameCache {
    public static gamePlayersInfo: Map<mw.Player, PlayerGamingInfo> = new Map<mw.Player, PlayerGamingInfo>();
    public static initAll() {
        GameCache.gamePlayersInfo.clear();
        GameGlobals.readyPlayers.forEach((player) => {
            GameCache.init(player);
        })
    }
    private static init(player: mw.Player) {
        let temp: PlayerGamingInfo = {
            playerId: player.playerId,
            name: DataCenterS.getData(player, PlayerModuleData).getPlayerName(),
            camp: DataCenterS.getData(player, GameModuleData).getPlayerCamp(),
            state: PlayerGameState.Ready,
            roleId: DataCenterS.getData(player, PlayerModuleData).getPlayerRoleId(),
            hotId: DataCenterS.getData(player, BagModuleData).getCurHotWeapon(),
            coldId: DataCenterS.getData(player, BagModuleData).getCurColdWeapon(),
            isFirstLeave: true
        }
        GameCache.gamePlayersInfo.set(player, temp);
    }
}
export class PlayerGamingInfo {
    playerId: number;
    name: string;
    camp: Camp;
    state: PlayerGameState;
    roleId: number;
    hotId: number;
    coldId: number;
    isFirstLeave: boolean;
}