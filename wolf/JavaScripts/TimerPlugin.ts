/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-27 09:38:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-06-30 10:11:03
 * @FilePath     : \murdermystery3\JavaScripts\TimerPlugin.ts
 * @Description  : 修改描述
 */
/*
 * @Author: zebin.ge
 * @Date: 2022-09-09 13:04:24
 * @LastEditors: zhangqing.fang
 * @LastEditTime: 2022-11-02 10:33:33
 * @FilePath: \townmysteryAPIReview\JavaScripts\TimerPlugin.ts
 * @Description: 计时
 */

import { oTrace } from 'odin';

export class TimerPlugin {
    private static _stop: boolean = false;

    /**
     * 倒计时函数
     * @param time 计时多久
     * @param tick 间隔时间
     * @param callback 每次间隔回调
     * @returns 
     */
    static timer(time: number, tick: number, callback: (time: number) => void): Promise<boolean> {
        let gameTimer = 0;
        return new Promise((resolve, reject) => {
            let id = TimeUtil.setInterval(() => {
                // console.error(`倒计时:${gameTimer}`);
                callback(gameTimer);
                if (gameTimer == time) {
                    TimeUtil.clearInterval(id);
                    resolve(true);
                }
                if (this._stop) {
                    TimeUtil.clearInterval(id);
                    resolve(false);
                    gameTimer = 0;
                }
                gameTimer += tick;
            }, tick);
        });
    }
    /**停止计时 */
    stopTimer() {
        TimerPlugin._stop = true;
    }
}