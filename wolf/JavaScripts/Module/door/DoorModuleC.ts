import ActionUIPanel from "../../CommonUI/ActionUIPanel";
import GameBattlePanel from "../GameModule/ui/GameBattlePanel";
import { DoorModuleS } from "./DoorModuleS";
import P_KeyUI from "./doorUI/P_KeyUI";

export class DoorModuleC extends ModuleC<DoorModuleS, null> {
    private keyUI: P_KeyUI;
    private get getkeyUI(): P_KeyUI {
        if (!this.keyUI) {
            this.keyUI = UIService.getUI(P_KeyUI);
        }
        return this.keyUI;
    }
    private actionUIPanel: ActionUIPanel = null;
    private get getActionUIPanel(): ActionUIPanel {
        if (!this.actionUIPanel) {
            this.actionUIPanel = UIService.getUI(ActionUIPanel);
        }
        return this.actionUIPanel;
    }
    private gameBattlePanel: GameBattlePanel = null;
    private get getGameBattlePanel(): GameBattlePanel {
        if (!this.gameBattlePanel) {
            this.gameBattlePanel = UIService.getUI(GameBattlePanel);
        }
        return this.gameBattlePanel;
    }
    private index: number;


    onStart(): void {
    }

    /**提示 */
    showTip(bool: boolean) {

    }

    //去开门
    openDoor() {
        this.server.net_Open(this.index);
    }

    //删除
    toDelect() {
        this.server.net_delect(this.index);
        this.getGameBattlePanel.showGameUI();
    }

    net_showPassUI(index: number) {
        this.index = index;
        this.getActionUIPanel.show();
        this.getActionUIPanel.mStaleButton.onPressed.add(() => {
            this.showPassUI()
        })
    }


    showPassUI() {
        this.getkeyUI.show()
        this.getGameBattlePanel.closeGameUI()
        this.net_hideActionUI();
    }

    net_hidePassUI(bool: boolean) {
        this.getActionUIPanel.mStaleButton.onPressed.clear();
        this.getActionUIPanel.hide();
        this.getkeyUI.hide()
        if (bool) {
            this.getGameBattlePanel.showGameUI()
        }
    }


    net_showActionUI(index: number) {
        this.index = index;
        this.getActionUIPanel.show();
        this.getActionUIPanel.mStaleButton.onPressed.add(() => {
            this.net_hideActionUI();
            this.server.net_closeDoor(this.index);
        })
    }


    net_hideActionUI() {
        this.getActionUIPanel.mStaleButton.onPressed.clear();
        this.getActionUIPanel.hide();
    }




}