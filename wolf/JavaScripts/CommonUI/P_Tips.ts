import Tips from "../uiTemplate/Common/Tips";
/**
 * 系统提示
 * 一个顶一个向上跳动，然后消失，最多三条
 */

export default class P_Tips extends Tips {
    private static readonly Y_START = 400;
    private static readonly Y_OVER = 150;
    private static readonly MOVE_SPEED = 500;
    private static readonly KEEP_TIME = 1.5;
    private static _instance: P_Tips;
    private freeCellArr: Array<mw.Canvas> = [];//当前空闲的条目
    private activeCellArr: Array<mw.Canvas> = [];//当前激活的条目
    private overCellArr: Array<mw.Canvas> = [];//已经完成的条目

    private static get instance(): P_Tips {
        if (this._instance == null) {
            this._instance = mw.UIService.create(P_Tips);
        }
        return this._instance;
    }



    onAwake() {
        Event.addServerListener("Event_ShowTips", (content: string) => {
            P_Tips.show(content);
        });
    }

    onStart() {
        this.canUpdate = true;
        this.layer = mw.UILayerTop;
        this.freeCellArr = [this.mCell1, this.mCell2, this.mCell3];
        for (let i = 0; i < this.freeCellArr.length; i++) {
            this.freeCellArr[i].visibility = mw.SlateVisibility.Hidden;
        }
    }

    // //隐藏的对象不参与UI布局，所以要布局完成后再隐藏
    // onLayout() {
    // }

    /**
     * 显示系统提示
     * @param msg 提示内容
     */
    public static show(msg: string) {
        mw.UIService.showUI(this.instance, mw.UILayerTop);
        P_Tips.instance.showMsg(msg);
    }

    // TODO 架构TODO 这一个show，一个showToClient 啥区别~得写在注释里面吧
    /**
     * 在客户端显示
     * @param player 玩家
     * @param content 内容
     */
    public static showToClient(player: mw.Player, content: string) {
        Event.dispatchToClient(player, "Event_ShowTips", content);
    }

    private showMsg(content: string) {
        let cell: mw.Canvas = null;
        if (this.freeCellArr.length > 0) {
            cell = this.freeCellArr.shift();
        } else {
            cell = this.activeCellArr.shift();
        }
        let text: mw.TextBlock = cell.findChildByPath('Content_txt') as mw.TextBlock;
        text.text = content;
        cell["state"] = 0;
        cell["stopTime"] = 0;
        this.activeCellArr.push(cell);
    }

    onUpdate(dt: number) {
        if (this.activeCellArr.length == 0) return;
        let pos: mw.Vector2 = null;
        for (let i = 0; i < this.activeCellArr.length; i++) {
            let cell = this.activeCellArr[i];
            switch (cell["state"]) {
                case 0:
                    cell.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    pos = cell.position;
                    pos.y = P_Tips.Y_START;
                    cell.position = pos;
                    cell["state"]++;
                    break;
                case 1:
                    pos = cell.position;
                    pos.y -= P_Tips.MOVE_SPEED * dt;
                    if (i == 0) {
                        if (pos.y <= P_Tips.Y_OVER) {
                            pos.y = P_Tips.Y_OVER;
                            cell["state"]++;
                        }
                    } else {
                        let lastCellPos = this.activeCellArr[i - 1].position;
                        if (pos.y <= lastCellPos.y + 60) {
                            pos.y = lastCellPos.y + 60;
                            cell["stopTime"] += dt;
                            if (cell["stopTime"] >= P_Tips.KEEP_TIME) {
                                cell["state"] += 2;
                            }
                        }
                    }
                    cell.position = pos;
                    break;
                case 2:
                    cell["stopTime"] += dt;
                    if (cell["stopTime"] >= P_Tips.KEEP_TIME) {
                        cell["state"]++;
                    }
                    break;
                case 3:
                    cell.visibility = mw.SlateVisibility.Hidden;
                    this.overCellArr.push(cell);
                    break;
            }
        }
        while (this.overCellArr.length > 0) {
            let cell = this.overCellArr.shift();
            let index = this.activeCellArr.indexOf(cell);
            this.activeCellArr.splice(index, 1);
            this.freeCellArr.push(cell);
        }
    }
}