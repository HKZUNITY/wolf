import { Notice } from "../../CommonUI/notice/Notice";
import { Globals } from "../../Globals";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import ShopModuleS from "../ShopModule/ShopModuleS";

export class TaskData extends Subdata {
    @Decorator.persistence()
    public onlineTime: number = 0;
    @Decorator.persistence()
    public resetTimeStr: string = "";
    @Decorator.persistence()
    public hasGetShopIds: number[] = [];
    @Decorator.persistence()
    public toDayShopIds: number[] = [0, 0];
    @Decorator.persistence()
    public isHasGetAward: boolean = false;

    public setOnlineTime(time: number): void {
        this.onlineTime += time;
        this.save(false);
    }

    public setResetTimeStr(timeStr: string, firstShopId: number, secondShopId: number): void {
        this.resetTimeStr = timeStr;
        this.onlineTime = 0;
        this.isHasGetAward = false;
        this.toDayShopIds[0] = firstShopId;
        this.toDayShopIds[1] = secondShopId;
        this.save(false);
    }

    public setHasGetShopIds(shopId: number): void {
        this.isHasGetAward = true;
        if (this.hasGetShopIds.includes(shopId)) return;
        this.hasGetShopIds.push(shopId);
        this.save(false);
    }
}

const shopIds: number[] = [
    20006,//冲锋枪(模拟)
    10031,//骨刺剑(恋)
    20010,//左轮(恋)
    10027,//军刀(模拟)
    10015,//毛鼻鲶
    10007,//镖(桎)
    10004,//匕首2
    10003,//匕首1
];

export class TaskModuleC extends ModuleC<TaskModuleS, TaskData> {
    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onEnterScene(sceneType: number): void {
        this.initTaskData();
    }

    protected onUpdate(dt: number): void {
        this.updateOnlineTime(dt);
    }

    private onlineTime: number = 0;
    private resetTimeStr: string = "";
    private hasGetShopIds: number[] = [];
    private firstShopId: number = 0;
    private secondShopId: number = 0;
    private isHasGetAward: boolean = false;
    private initTaskData(): void {
        this.onlineTime = this.data.onlineTime;
        this.resetTimeStr = this.data.resetTimeStr;
        this.hasGetShopIds = this.data.hasGetShopIds;
        this.firstShopId = this.data.toDayShopIds[0];
        this.secondShopId = this.data.toDayShopIds[1];
        this.isHasGetAward = this.data.isHasGetAward;

        let timeStr = Tools.getDay();
        if (timeStr != this.resetTimeStr) {
            let noHasShopIds: number[] = [];
            for (let i = 0; i < shopIds.length; ++i) {
                if (!this.hasGetShopIds.includes(shopIds[i])) {
                    noHasShopIds.push(shopIds[i]);
                }
            }
            if (!noHasShopIds || noHasShopIds.length == 0) {
                this.firstShopId = 0;
                this.secondShopId = 0;
            } else if (noHasShopIds.length == 1) {
                this.firstShopId = noHasShopIds[0];
                this.secondShopId = 0;
            } else {
                this.firstShopId = noHasShopIds[0];
                this.secondShopId = noHasShopIds[1];
            }
            this.setResetTimeStr(timeStr);
        }
        this.getHUDPanel.setTaskUI(this.firstShopId, this.secondShopId, this.onlineTime, this.isHasGetAward);
    }

    private time: number = 60;
    private timer: number = 0;
    private updateOnlineTime(dt: number): void {
        this.timer += dt;
        if (this.timer >= this.time) {
            this.timer = 0;
            this.setOnlineTime(1);
        }
    }

    public setOnlineTime(time: number): void {
        this.onlineTime += time;
        this.server.net_setOnlineTime(time);
        this.getHUDPanel.updateTaskOnlineTime(this.onlineTime);
    }

    public setResetTimeStr(timeStr: string): void {
        this.resetTimeStr = timeStr;
        this.onlineTime = 0;
        this.isHasGetAward = false;
        this.server.net_setResetTimeStr(timeStr, this.firstShopId, this.secondShopId);
    }

    public setHasGetShopId(shopId: number): void {
        this.isHasGetAward = true;
        if (this.hasGetShopIds.includes(shopId)) return;
        this.hasGetShopIds.push(shopId);
        this.server.net_setHasGetShopIds(shopId);
    }

    public getTaskAward(callBack: () => void): void {
        if (this.isHasGetAward) {
            Notice.showDownNotice(GameConfig.Language.Text_Task1.Value);
            return;
        }
        if (this.onlineTime < Globals.onlineTimeConfig) {
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_Task2.Value, Globals.onlineTimeConfig));
            return;
        }
        this.setHasGetShopId(this.firstShopId);
        if (callBack) callBack();
        this.server.net_award(this.firstShopId);
        Notice.showDownNotice(GameConfig.Language.Text_Task7.Value);
    }
}


export class TaskModuleS extends ModuleS<TaskModuleC, TaskData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_setOnlineTime(time: number): void {
        this.currentData.setOnlineTime(time);
    }

    @Decorator.noReply()
    public net_setResetTimeStr(timeStr: string, firstShopId: number, secondShopId: number): void {
        this.currentData.setResetTimeStr(timeStr, firstShopId, secondShopId);
    }

    @Decorator.noReply()
    public net_setHasGetShopIds(shopId: number): void {
        this.currentData.setHasGetShopIds(shopId);
    }

    public net_award(shopId: number): void {
        ModuleService.getModule(ShopModuleS).award(this.currentPlayer, shopId);
    }
}