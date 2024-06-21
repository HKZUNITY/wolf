/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-25 10:41:27
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-27 18:59:10
 * @FilePath     : \murdermystery3\JavaScripts\Module\loadMapModule\LoadMapModuleC.ts
 * @Description  : 修改描述
 */
import { Globals } from "../../Globals";
import P_Hall from "../../UILogic/Hall/P_Hall";
import P_Loading from "../../UILogic/Hall/P_Loading";
import P_Map from "../../UILogic/Hall/P_Map";
import P_Notice from "../../uiTemplate/Common/P_Notice";
import SVIPModuleC from "../SVipModule/SVIPModuleC";
import LoadMapModuleS from "./LoadMapModuleS";

export default class LoadMapModuleC extends ModuleC<LoadMapModuleS, null> {
    private loadingTime: number = Globals.spawnSceneTime;
    //计时器
    private timer;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    net_ShowLoadingUI() {
        P_Hall.closeHallUI();
        mw.UIService.hide(P_Notice);
        P_Map.instance.hide();
        ModuleService.getModule(LoadMapModuleC).showLoadingPanel();
        ModuleService.getModule(SVIPModuleC).isOpenBuySvipPanel(false);
    }

    public closeLoadingPanel(){
        P_Loading.closeLoadingUI();
    }

    public showLoadingPanel(){
        P_Loading.showLoadingUI();
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.checkLoadingFinish();
        }, this.loadingTime* 1000)
    }

    private checkLoadingFinish(){
        this.closeLoadingPanel();
    }

}