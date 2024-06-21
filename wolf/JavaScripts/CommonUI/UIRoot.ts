/*
 * @Author: ZiweiShen
 * @Date: 2022-07-08 14:19:17
 * @LastEditors: zhangqing.fang
 * @LastEditTime: 2022-11-04 11:13:53
 * @FilePath: \townmysteryAPI\JavaScripts\CommonUI\UIRoot.ts
 * @Description: 
 */

import UIRoot from "../uiTemplate/Common/UIRoot";


export default class P_UIRoot extends UIRoot {
    private selfShow: boolean = false;//姿势是否处于显示状态
    private loading: mw.Canvas;
    private progressBar: mw.ProgressBar;
    private msg_txt: mw.TextBlock;
    private targetPercent: number = 0;
    private loadingCompleteCallback: Function;

    onStart(): void {
        this.canUpdate = true;
        this.onShowLoading("", 1, this.onHideLoading);
    }

    onUpdate(dt: number) {
        if (!this.selfShow) return;
        let value = this.progressBar.currentValue;
        if (value >= this.targetPercent) {
            if (this.loadingCompleteCallback != null) {
                this.loadingCompleteCallback();
                this.loadingCompleteCallback = null;
            }
            return;
        }
        value += dt * 0.4;
        this.progressBar.currentValue = value;
    }

    //显示loading
    onShowLoading(msg: string, targetPercent: number, complete: Function) {
        this.selfShow = true;
        if (this.loading.visibility == mw.SlateVisibility.Hidden) {
            this.progressBar.currentValue = 0;
            this.loading.visibility = mw.SlateVisibility.Visible;
        }
        this.targetPercent = Math.min(1, targetPercent);
        this.loadingCompleteCallback = complete;
        this.msg_txt.text = msg;
    }

    //隐藏loading
    onHideLoading() {
        this.selfShow = false;
        this.canUpdate = false;

        if (this.progressBar.currentValue >= 1) {
            this.loading.visibility = mw.SlateVisibility.Hidden;
        }
    }
}
