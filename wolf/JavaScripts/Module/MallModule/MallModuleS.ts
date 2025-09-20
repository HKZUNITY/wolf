import { WishDataV0 } from "../WishModule/WishData";
import MallData from "./MallData";
import MallModuleC from "./MallModuleC";
import Nickname from "./Nickname";

export default class MallModuleS extends ModuleS<MallModuleC, MallData> {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.initPlayerVipData(player);
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.deleteNickname(player);
    }

    private nicknameMap: Map<string, Nickname> = new Map<string, Nickname>();
    private initPlayerVipData(player: mw.Player): void {
        let nickname = player.character.addComponent(Nickname, true);
        this.nicknameMap.set(player.userId, nickname);
        nickname.wishDataV0 = null;
    }

    private deleteNickname(player: mw.Player): void {
        if (this.nicknameMap.has(player.userId)) {
            let nickname = this.nicknameMap.get(player.userId);
            nickname.destroy();
            this.nicknameMap.delete(player.userId);
        }
    }

    public net_updateNickWish(wishDataV0: WishDataV0): boolean {
        let userId = wishDataV0.userId;
        if (this.nicknameMap.has(userId)) {
            let nickname = this.nicknameMap.get(userId);
            nickname.wishDataV0 = wishDataV0;
            if (!wishDataV0.itemId) this.getClient(Player.getPlayer(userId)).net_giveSuccess();
            return true;
        }
        return false;
    }
}