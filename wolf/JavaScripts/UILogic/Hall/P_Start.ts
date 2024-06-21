/*
 * @Author: zhangqing.fang
 * @Date: 2022-11-03 17:07:20
 * @LastEditors: zhangqing.fang
 * @LastEditTime: 2022-11-03 17:31:23
 * @FilePath: \townmysteryAPI\JavaScripts\UILogic\Hall\P_Start.ts
 * @Description: 
 */
import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
import { MGSHome } from "../../MGSHome";
import { PlayerModuleC } from "../../Module/PlayerModule/PlayerModuleC";
import { GameConfig } from "../../Tables/GameConfig";
import Start from "../../uiTemplate/Hall/Start";
export default class P_Start extends Start {
    private static _instance: P_Start;
    public static get instance(): P_Start {
        if (this._instance == null) {
            this._instance = UIService.create(P_Start);
        }
        return this._instance;
    }
    setText() {
        this.mBtn_Start.text = (GameConfig.Text.getElement(20002).Content);
        this.mText_Title.text = (GameConfig.Text.getElement(20001).Content);
    }
    onStart() {
        this.mBtn_Start.onClicked.add(() => {
            ModuleService.getModule(PlayerModuleC).isFirstIn();
            MGSHome.msgBtnClick(1);
            this.mBtn_Start.enable = false
        })
    }
    onUpdate() {

    }
    public showStartUI() {
        this.setText()
        UIService.showUI(this);
    }
    public static closeStartUI() {
        UIService.hide(this);

    }
}