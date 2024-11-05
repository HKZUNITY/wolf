import { BubbleProxy, Bubble, IBubbleUI } from "module_bubble";
import BubbleUI_Generate from "./ui-generate/uiTemplate/bubbleModule/BubbleUI_generate";
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