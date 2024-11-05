import P_KeyUI from '../Module/door/doorUI/P_KeyUI';
import P_Action from '../UILogic/Game/P_Action';
import P_Foresight from '../UILogic/Game/P_Foresight';

export class UiManager {
    private static _instance: UiManager;
    public static get instance(): UiManager {
        if (this._instance == null) {
            this._instance = new UiManager();
        }
        return this._instance;
    }
    /**瞄准界面 */
    private foresight: P_Foresight = null
    /**交互界面 */
    private action: P_Action = null
    /**大门密码界面 */
    private keyUI: P_KeyUI = null

    getUIKey() {
        if (this.keyUI == null) {
            this.keyUI = mw.UIService.create(P_KeyUI);
            return this.keyUI;
        } else {
            return this.keyUI;
        }
    }

    getUIForesight() {
        if (this.foresight == null) {
            console.warn("kang log 奖励弹窗")
            this.foresight = mw.UIService.create(P_Foresight);
            return this.foresight;
        } else {
            return this.foresight;
        }
    }

    getActionUI() {
        if (this.action == null) {
            this.action = mw.UIService.create(P_Action)
            return this.action
        }
        else {
            return this.action
        }
    }
}
