import { GamingState } from "../../Globals";
import { Tools } from "../../Tools";
import GameBattlePanel from "../GameModule/ui/GameBattlePanel";
import MapChoosePanel from "../GameModule/ui/MapChoosePanel";
import ReadyPanel from "../GameModule/ui/ReadyPanel";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import FSMModuleS from "./FSMModuleS";
import BlackMaskPanel from "./ui/BlackMaskPanel";

export default class FSMModuleC extends ModuleC<FSMModuleS, null> {
    private gameBattlePanel: GameBattlePanel = null;
    private get getGameBattlePanel(): GameBattlePanel {
        if (!this.gameBattlePanel) {
            this.gameBattlePanel = UIService.getUI(GameBattlePanel);
        }
        return this.gameBattlePanel;
    }
    private readyPanel: ReadyPanel = null;
    private get getReadyPanel(): ReadyPanel {
        if (!this.readyPanel) {
            this.readyPanel = UIService.getUI(ReadyPanel);
        }
        return this.readyPanel;
    }

    private BlackMaskPanel: BlackMaskPanel = null;
    private get getBlackMaskPanel(): BlackMaskPanel {
        if (!this.BlackMaskPanel) {
            this.BlackMaskPanel = UIService.getUI(BlackMaskPanel);
        }
        return this.BlackMaskPanel;
    }

    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }

    private mapChoosePanel: MapChoosePanel = null;
    private get getMapChoosePanel(): MapChoosePanel {
        if (!this.mapChoosePanel) {
            this.mapChoosePanel = UIService.getUI(MapChoosePanel);
        }
        return this.mapChoosePanel;
    }

    onStart(): void {

    }
    onEnterScene(sceneType: number): void {
    }

    public async reconnect() {
        await this.server.net_CheckIsReConnect();
    }

    public net_UpdateHallTime(curtime: number) {
        this.getHUDPanel.setHallTime(Tools.formatTime_1(curtime));
        this.getHUDPanel.setHallTip(10003);
    }
    public net_UpdateGameTime(curtime: number, currState: number) {
        if (currState == GamingState.GameReadyState) {
            this.getReadyPanel.setGameTime(curtime);
        } else if (currState == GamingState.GamingState) {
            this.getGameBattlePanel.setGameTime(curtime);
        }
        this.getHUDPanel.setHallTime(Tools.formatTime_1(curtime));
    }
    net_UpdateMapTime(time: number) {
        this.getMapChoosePanel.updateTime(time);
    }

    net_showBlack(time: number): void {
        this.getBlackMaskPanel.showMask(time, null)
    }
}