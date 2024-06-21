/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-09 17:26:26
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-25 10:57:02
 * @FilePath     : \murdermystery3\JavaScripts\Module\loadMapModule\SceneScript.ts
 * @Description  : 修改描述
 */

import { Tools } from "../../Tools";
import LoadMapModuleC from "./LoadMapModuleC";

@Component
export default class SceneScript extends mw.Script {
    private nowState: SceneState = SceneState.Loading;
    private timer;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            // this.gameObject.asyncReady().then(()=>{
            //     if (this.nowState == SceneState.Destroy) {
            //         return;
            //     }
            //     this.timer = TimeUtil.setInterval(async ()=>{
            //         let obj = this.gameObject.getChildByName("CoreObject");
            //         if (obj) {
            //             TimeUtil.clearInterval(this.timer);
            //             this.timer = null;
            //             await obj.asyncReady();
            //             this.gameObject.getChildren().forEach(async (child)=>{
            //                 await child.asyncReady();
            //             })
            //             this.nowState = SceneState.Loaded;
            //             // ModuleService.getModule(LoadMapModuleC).finishLoading();
            //         }
            //     }, 0.5);
            // })
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this.nowState = SceneState.Destroy;
        if (this.timer) {
            TimeUtil.clearInterval(this.timer);
            this.timer = null;
        }
    }
}

export enum SceneState {
    Loading,
    Loaded,
    Destroy,
}