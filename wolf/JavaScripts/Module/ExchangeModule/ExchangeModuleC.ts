import { Notice } from "../../CommonUI/notice/Notice";
import { GameConfig } from "../../Tables/GameConfig";
import ChatPanel from "../DanMuModule/ui/ChatPanel";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import ExchangeModuleS from "./ExchangeModuleS";
import ExchangePanel from "./ui/ExchangePanel";

export default class ExchangeModuleC extends ModuleC<ExchangeModuleS, null> {
    private exchangePanel: ExchangePanel = null;
    private get getExchangePanel(): ExchangePanel {
        if (!this.exchangePanel) {
            this.exchangePanel = mw.UIService.create(ExchangePanel);
        }
        return this.exchangePanel;
    }

    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }

    private chatPanel: ChatPanel = null;
    private get getChatPanel(): ChatPanel {
        if (!this.chatPanel) {
            this.chatPanel = UIService.getUI(ChatPanel);
        }
        return this.chatPanel;
    }

    public isOpenExchangePanel(isOpen: boolean) {
        if (isOpen) {
            this.getExchangePanel.show();
            this.getHUDPanel.showShop();
            this.getChatPanel.hide();
        }
        else {
            this.getExchangePanel.hide();
            this.getHUDPanel.hideShop();
            this.getChatPanel.show();
        }
    }

    public async exchangeItem(id: number) {
        let res = await this.server.net_buyExchangeItem(id);
        if (res) {
            Notice.showDownNotice(GameConfig.Tips.getElement(10011).Content);
        }
        else {
            Notice.showDownNotice(GameConfig.Tips.getElement(10012).Content);
        }
    }

    public refreshExchangeItem() {
        if (mw.UIService.getUI(ExchangePanel, false)?.visible) {
            this.getExchangePanel.refreshPanel();
        }
    }
}