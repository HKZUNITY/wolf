import TrampolineItem_Generate from "../../ui-generate/module/Trampoline/TrampolineItem_generate";
import TrampolineRank_Generate from "../../ui-generate/module/Trampoline/TrampolineRank_generate";

export class TranmpolineData {
    public userId: string;
    public name: string;
    public height: number;

    constructor(userId: string, name: string, height: number) {
        this.userId = userId;
        this.name = name;
        this.height = height;
    }
}

export class TrampolineItem extends TrampolineItem_Generate {
    protected onStart(): void {

    }

    public setData(rank: number, tranmpolineData: TranmpolineData): void {
        this.mRankTextBlock.text = `${rank}`;
        this.mNameTextBlock.text = tranmpolineData.name;
        this.mCountTextBlock.text = `${tranmpolineData.height}`;
    }
}


export class TranmpolineRank extends TrampolineRank_Generate {
    protected onStart(): void {
        this.initUI();
    }

    private initUI(): void {
        this.mRankTextBlock.text = `排名`;
        this.mNameTextBlock.text = `昵称`;
        this.mCountTextBlock.text = `高度`;
    }

    private trampolineItems: TrampolineItem[] = [];
    public updateRank(tranmpolineDatas: TranmpolineData[]): void {
        if (tranmpolineDatas.length > this.trampolineItems.length) {
            for (let i = 0; i < this.trampolineItems.length; ++i) {
                this.trampolineItems[i].setData(i + 1, tranmpolineDatas[i]);
                this.trampolineItems[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
            for (let i = this.trampolineItems.length; i < tranmpolineDatas.length; ++i) {
                let trampolineItem = mw.UIService.create(TrampolineItem);
                trampolineItem.setData(i + 1, tranmpolineDatas[i]);
                this.mContentCanvas.addChild(trampolineItem.uiObject);
                this.trampolineItems.push(trampolineItem);
            }
        } else {
            for (let i = 0; i < tranmpolineDatas.length; ++i) {
                this.trampolineItems[i].setData(i + 1, tranmpolineDatas[i]);
                this.trampolineItems[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
            for (let i = tranmpolineDatas.length; i < this.trampolineItems.length; ++i) {
                this.trampolineItems[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
            }
        }
    }
}

const rankWorldUIId: string = "2D300B95";
export class TrampolineModuleC extends ModuleC<TrampolineModuleS, null> {
    private tranmpolineRank: TranmpolineRank = null;
    private get getTranmpolineRank(): TranmpolineRank {
        if (!this.tranmpolineRank) {
            this.tranmpolineRank = mw.UIService.getUI(TranmpolineRank);
        }
        return this.tranmpolineRank;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let i = 0;
        InputUtil.onKeyDown(mw.Keys.P, () => {
            i++;
            Event.dispatchToServer(`RefreshMaxHeight`, i);
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.initTrampoline();
    }

    private initTrampoline(): void {
        mw.GameObject.asyncFindGameObjectById(rankWorldUIId).then((worldUI: mw.UIWidget) => {
            worldUI.setTargetUIWidget(this.getTranmpolineRank.uiWidgetBase);
            let nickName = mw.AccountService.getNickName();
            this.server.net_onEnterScene(!nickName ? `谁是凶手？` : nickName);
        });
    }

    private tranmpolineDatas: TranmpolineData[] = [];
    public net_syncTranmpolineHeight(tranmpolineDatas: TranmpolineData[]): void {
        this.tranmpolineDatas = tranmpolineDatas;
        if (!this.tranmpolineDatas || this.tranmpolineDatas.length == 0) return;
        this.tranmpolineDatas.sort((a: TranmpolineData, b: TranmpolineData) => {
            return b.height - a.height;
        });
        this.getTranmpolineRank.updateRank(this.tranmpolineDatas);
    }
}


export class TrampolineModuleS extends ModuleS<TrampolineModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initEvent();
    }

    protected onPlayerLeft(player: mw.Player): void {
        let userId = player.userId;
        if (this.tranmpolineDataMap.has(userId)) {
            this.tranmpolineDataMap.delete(userId);
            this.syncTranmpolineHeight();
        }
    }

    private initEvent(): void {
        Event.addClientListener("RefreshMaxHeight", this.refreshMaxHeight.bind(this));
    }

    private refreshMaxHeight(player: mw.Player, height: number): void {
        this.setTranmpolineHeight(player.userId, height);
    }

    @Decorator.noReply()
    public net_onEnterScene(nickName: string): void {
        let userId = this.currentPlayer.userId;
        let tranmpolineData = new TranmpolineData(userId, nickName, 0);

        if (this.tranmpolineDataMap.has(userId)) return;
        this.tranmpolineDataMap.set(userId, tranmpolineData);

        this.syncTranmpolineHeight();
    }

    private tranmpolineDataMap: Map<string, TranmpolineData> = new Map<string, TranmpolineData>();
    public setTranmpolineHeight(userId: string, height: number): void {
        if (!this.tranmpolineDataMap.has(userId)) return;

        let tranmpolineData = this.tranmpolineDataMap.get(userId);
        tranmpolineData.height = height;

        this.tranmpolineDataMap.set(userId, tranmpolineData);

        this.syncTranmpolineHeight();
    }

    private syncTranmpolineHeight(): void {
        let tranmpolineDatas: TranmpolineData[] = [];
        this.tranmpolineDataMap.forEach((tranmpolineData) => {
            tranmpolineDatas.push(tranmpolineData);
        });
        this.getAllClient().net_syncTranmpolineHeight(tranmpolineDatas);
    }
}