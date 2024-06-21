/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-08-22 15:07:34
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-23 10:48:05
 * @FilePath     : \murdermystery3\JavaScripts\BubbleScript.ts
 * @Description  : 修改描述
 */
import { BubbleProxy, Bubble, IBubbleUI } from "module_bubble";
import BubbleUI_Generate from "./ui-generate/uiTemplate/bubbleModule/BubbleUI_generate";


/** 
 * @Author       : songyang.xie songyang.xie@appshahe.com
 * @Date         : 2023-06-21 14:57:52
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-13 13:20:07
 * @FilePath     : \murdermystery3\JavaScripts\BubbleScript.ts
 * @Description  : wwwwwwwww
 */
@Component
export default class BubbleScript extends BubbleProxy {
   
    protected async onStart() {
        super.onStart();
        /**监听MGS消息 */
        if (SystemUtil.isClient()) {
            this.useUpdate = true;
            mw.RoomService.registerMGSChatMessageEvent(msg => {
                //这里的0可以替换成其他皮肤配置，可以每个角色不一样
                Bubble.showBubble(0, msg);
            });
        }
    }

    protected onCreateBubbleUI(): IBubbleUI {
        return mw.UIService.create(BubbleUI_Generate);
    }
}