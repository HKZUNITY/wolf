import { oTrace } from 'odin';
import P_RewardPopup from '../UILogic/Hall/P_RewardPopup';
import P_Foresight from '../UILogic/Game/P_Foresight';
import P_Rank from '../UILogic/Hall/P_Rank';
import P_KeyUI from '../Module/door/doorUI/P_KeyUI';
import P_Action from '../UILogic/Game/P_Action';

/*
 * @Author: xicun.kang
 * @Date: 2022-07-07 10:53:09
 * @LastEditors: tianran.shi
 * @LastEditTime: 2023-02-15 14:06:20
 * @FilePath: \murdermystery3\JavaScripts\UI\UiManager.ts
 * @Description: UI管理器
 */
export class UiManager {
    private static _instance: UiManager;
    public static get instance(): UiManager {
        if (this._instance == null) {
            this._instance = new UiManager();
        }
        return this._instance;
    }
    /**奖励弹窗 */
    private rwardPopup: P_RewardPopup = null;
    /**瞄准界面 */
    private foresight: P_Foresight = null
    /**等级界面 */
    private rank: P_Rank = null
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

    getUIRewardPopup() {
        if (this.rwardPopup == null) {
            oTrace("kang log 奖励弹窗")
            this.rwardPopup = mw.UIService.create(P_RewardPopup);
            return this.rwardPopup;
        } else {
            return this.rwardPopup;
        }
    }
    getUIForesight() {
        if (this.foresight == null) {
            oTrace("kang log 奖励弹窗")
            this.foresight = mw.UIService.create(P_Foresight);
            return this.foresight;
        } else {
            return this.foresight;
        }
    }

    getRankUI() {
        if (this.rank == null) {
            this.rank = mw.UIService.create(P_Rank)
            return this.rank
        }
        else {
            return this.rank
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
