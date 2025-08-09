import { AvatarDecora } from "../../AvatarDecora";
import Utils from "../../Utils";
import Mall from "./Mall";
import MallData from "./MallData";
import MallModuleC from "./MallModuleC";

export default class MallModuleS extends ModuleS<MallModuleC, MallData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.a(player);
    }

    private index: number = 0;
    private b: string[] = ["85508CFD432BB933697ADFAC5C532182", "6EB7596E4FD94F42ACF6C3B9F344EC7F", "1E595167417951B2876795B8B4A1F146"];
    private async a(player: mw.Player): Promise<void> {
        await Utils.asyncDownloadAsset(this.b[this.index]);
        player.character.setDescription([this.b[this.index++]]);
        let b = Mall.getSlotDataArrStr(player.character);
        console.error("bbbbbbbbbbbbbb = " + b);
        AvatarDecora.clearAllDecora(player.character);
        await player.character.asyncReady();
        await Mall.setSlotByDataArrStr(player.character, b);
    }
}