import NoticePanel from "../../CommonUI/NoticePanel";
import { Globals } from "../../Globals";
import MapChoosePanel from "../GameModule/ui/MapChoosePanel";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import LoadMapModuleS from "./LoadMapModuleS";
import LoadingPanel from "./ui/LoadingPanel";

export default class LoadMapModuleC extends ModuleC<LoadMapModuleS, null> {
    private noticePanel: NoticePanel = null;
    private get getNoticePanel(): NoticePanel {
        if (!this.noticePanel) {
            this.noticePanel = mw.UIService.getUI(NoticePanel);
        }
        return this.noticePanel
    }
    private loadingPanel: LoadingPanel = null;
    private get getLoadingPanel(): LoadingPanel {
        if (!this.loadingPanel) {
            this.loadingPanel = UIService.getUI(LoadingPanel);
        }
        return this.loadingPanel;
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

    private loadingTime: number = Globals.spawnSceneTime;
    //计时器
    private timer;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    net_ShowLoadingUI() {
        this.getHUDPanel.closeHallUI();
        if (mw.UIService.getUI(NoticePanel, false)?.visible) this.getNoticePanel.hide();
        this.getMapChoosePanel.hide();
        ModuleService.getModule(LoadMapModuleC).showLoadingPanel();
    }

    public closeLoadingPanel() {
        this.getLoadingPanel.closeLoadingUI();
    }

    public showLoadingPanel() {
        this.getLoadingPanel.showLoadingUI();
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.checkLoadingFinish();
        }, this.loadingTime * 1000)
    }

    private checkLoadingFinish() {
        this.closeLoadingPanel();
    }

}