/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-08-02 14:37:59
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-02 17:21:04
 * @FilePath     : \murdermystery3\JavaScripts\Module\ExchangeModule\ExchangeModuleC.ts
 * @Description  : 修改描述
 */

import P_Tips from "../../CommonUI/P_Tips";
import { GameConfig } from "../../Tables/GameConfig";
import P_Exchange from "../../UILogic/Hall/P_Exchange";
import P_Hall from "../../UILogic/Hall/P_Hall";
import ExchangeModuleS from "./ExchangeModuleS";


export default class ExchangeModuleC extends ModuleC<ExchangeModuleS, null> {
    private exchangePanel: P_Exchange;
    public isOpenExchangePanel(isOpen: boolean){
        if (!this.exchangePanel) {
            this.exchangePanel = mw.UIService.create(P_Exchange);
        }
        if (isOpen) {
        mw.UIService.showUI(this.exchangePanel);
            P_Hall.instance.showShop();
        }
        else{
            mw.UIService.hideUI(this.exchangePanel);
            P_Hall.instance.hideShop();
        }
    }

    public async exchangeItem(id: number){
        let res = await this.server.net_buyExchangeItem(id);
        if (res) {
            P_Tips.show(GameConfig.Tips.getElement(10011).Content);
        }
        else{
            P_Tips.show(GameConfig.Tips.getElement(10012).Content);
        }
    }

    public refreshExchangeItem(){
        if (this.exchangePanel) {
            this.exchangePanel.refreshPanel();
        }
    }

}