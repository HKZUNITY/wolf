import { UiManager } from "../../UI/UiManager";
import P_Action from "../../UILogic/Game/P_Action";
import P_Game from "../../UILogic/Game/P_Game";
import { DoorModuleS } from "./DoorModuleS";
import P_KeyUI from "./doorUI/P_KeyUI";

export class DoorModuleC extends ModuleC<DoorModuleS, null> {
    private keyUI: P_KeyUI;
    private actionUI: P_Action;
    private index: number;


    onStart(): void {
        this.keyUI = UiManager.instance.getUIKey();
        this.actionUI = UiManager.instance.getActionUI()
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
        P_Game.showGameUI();
    }

    net_showPassUI(index: number) {
        this.index = index;
        this.actionUI.show();
        this.actionUI.mStaleButton.onPressed.add(() => {
            this.showPassUI()
        })
    }


    showPassUI() {
        this.keyUI.show()
        P_Game.closeGameUI()
        this.net_hideActionUI();
    }

    net_hidePassUI(bool: boolean) {
        this.actionUI.mStaleButton.onPressed.clear();
        this.actionUI.hide();
        this.keyUI.hide()
        if (bool) {
            P_Game.showGameUI()
        }
    }


    net_showActionUI(index: number) {
        this.index = index;
        this.actionUI.show();
        this.actionUI.mStaleButton.onPressed.add(() => {
            this.net_hideActionUI();
            this.server.net_closeDoor(this.index);
        })
    }


    net_hideActionUI() {
        this.actionUI.mStaleButton.onPressed.clear();
        this.actionUI.hide();
    }




}