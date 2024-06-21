import CoinObj from "../../uiTemplate/Inside/CoinObj";
export default class P_CoinGet extends CoinObj {
    private static _instance: P_CoinGet;
    private freeCellArr: Array<mw.Canvas> = [];//当前空闲的条目
    private activeCellArr: Array<mw.Canvas> = [];//当前激活的条目
    private overCellArr: Array<mw.Canvas> = [];//已经完成的条目
    private tweenMap: Map<mw.Canvas, mw.Tween<{}>> = new Map();
    private static readonly START = new mw.Vector2(910, 400);
    private static readonly OVER = new mw.Vector2(0, 280);
    private static readonly MOVE_SPEED = 500;
    private static readonly KEEP_TIME = 0.5;
    private static get instance(): P_CoinGet {
        if (this._instance == null) {
            this._instance = UIService.create(P_CoinGet);
        }
        return this._instance;
    }
    onStart() {
        this.freeCellArr = [this.mCell_1, this.mCell_2, this.mCell_3];
        for (let i = 0; i < this.freeCellArr.length; i++) {
            this.freeCellArr[i].visibility = (mw.SlateVisibility.Hidden);
        }
    }

    public static show() {
        this._instance = UIService.show(this);
        P_CoinGet.instance.showMsg();
    }
    public static closeCoinUi() {
        this._instance = UIService.hide(this);
        for (let i = 0; i < P_CoinGet.instance.freeCellArr.length; i++) {
            P_CoinGet.instance.freeCellArr[i].visibility = (mw.SlateVisibility.Hidden);
        }
    }
    private showMsg() {
        this.canUpdate = true;
        let cell: mw.Canvas = null;
        if (this.freeCellArr.length > 0) {
            cell = this.freeCellArr.shift();
        } else {
            this.stopTween(cell);
            cell = this.activeCellArr.shift();
        }
        this.activeCellArr.push(cell);
        this.createTween1(cell);
    }
    createTween1(cell: mw.Canvas) {
        let newTween = new mw.Tween({ pos: { x: 860, y: 400 } });
        cell.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        newTween.to({ pos: { x: 2200, y: 70 } }, 500)
            .onUpdate((v) => {
                cell.position = (new mw.Vector2(v.pos.x, v.pos.y));
            })
            .onStop(() => {
                cell.visibility = (mw.SlateVisibility.Hidden);
            })
            .onComplete(() => {
                cell.visibility = (mw.SlateVisibility.Hidden);
                this.overCellArr.push(cell);
            })
            .start();
        this.tweenMap.set(cell, newTween);
    }
    // createTween2(cell: mw.Canvas) {
    //     let newTween = new Odin.Tween({ pos: { x: 860, y: 400 } });
    //     cell.SetVisibility(mw.SlateVisibility.SelfHitTestInvisible);
    //     newTween.to({ pos: { x: 860, y: 200 } }, 300)
    //         .onUpdate((v) => {
    //             cell.GetSlot().SetPosition(new mw.Vector2(v.pos.x, v.pos.y));
    //         })
    //         .onStop(() => {
    //             cell.SetVisibility(mw.SlateVisibility.Hidden);
    //         })
    //         .onComplete(() => {
    //             this.overCellArr.push(cell);
    //         })
    //         .start();
    //     this.tweenMap.set(cell, newTween);
    // }
    stopTween(cell: mw.Canvas) {
        let tween = this.tweenMap.get(cell);
        if (tween != undefined) {
            tween.stop();
            cell.visibility = (mw.SlateVisibility.Hidden);
        }
    }
    onUpdate(dt: number) {
        if (this.activeCellArr.length == 0) return;
        for (let i = 0; i < this.activeCellArr.length; i++) {
            this.tweenMap.get(this.activeCellArr[i]).update();
        }
        while (this.overCellArr.length > 0) {
            let cell = this.overCellArr.shift();
            let index = this.activeCellArr.indexOf(cell);
            this.activeCellArr.splice(index, 1);
            this.stopTween(cell);
            this.freeCellArr.push(cell);
        }
    }
}