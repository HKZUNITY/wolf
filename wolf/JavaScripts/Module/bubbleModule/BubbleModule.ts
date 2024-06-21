import { Bubble } from "module_bubble";
import { IChatElement } from "../../Tables/Chat";
import { GameConfig } from "../../Tables/GameConfig";
import Game_HUD_Chat_Generate from "../../ui-generate/uiTemplate/bubbleModule/Game_HUD_Chat_generate";
import Word_Generate from "../../ui-generate/uiTemplate/bubbleModule/Word_generate";
import { ChatUIExtension } from "../../uiTemplate/bubbleModule/ChatUIExtension";
import { MGSHome } from "../../MGSHome";

/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-21 16:31:43
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-10 09:28:00
 * @FilePath     : \murdermystery3\JavaScripts\Module\bubbleModule\BubbleModule.ts
 * @Description  : 修改描述
 */
export class BubbleModuleC extends ModuleC<BubbleModuleS, null> {
    public chatConfig: IChatElement[];
    /**主界面 */
    private _main: Game_HUD_Chat_Generate;
    /**主界面Nood */
    private _wordArr: Word_Generate[] = [];
    private isInit: boolean = true;
    protected onStart() {

    }

    public async initMainPanel(){
        if (this.isInit) {
            await Player.asyncGetLocalPlayer();
            this.chatConfig = GameConfig.Chat.getAllElement();
            this.initMain();
            this.addLayoutNodes();
            this.isInit = false;
        }
    }

    /**初始化UI */
    private initMain() {
        this._main = mw.UIService.show(Game_HUD_Chat_Generate, mw.UILayerTop- 10);
        this._main.canvas_word.visibility = mw.SlateVisibility.Collapsed;
        this._main.wordBtn.onClicked.add(() => {
            this._main.canvas_word.visibility = (this._main.canvas_word.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.Visible);
        });
    }

    /**刷新一下 */
    public refreshBubble(){
        if (this._main) {
            mw.UIService.hideUI(this._main);
            setTimeout(() => {
                mw.UIService.showUI(this._main, mw.UILayerTop);
            }, 500);
        }
    }

    /**向滚动条中添加结点 */
    private addLayoutNodes() {
        let length_word = this.chatConfig.length;
        for (let i = 0; i < length_word; i++) {
            let item = mw.UIService.create(Word_Generate);
            this._main.mCanvasWord.addChild(item.uiObject);
            item.uiObject.size = item.rootCanvas.size;
            this._wordArr.push(item);
            let btn = item.mBtn_word;
            let cfg = this.chatConfig[i];
            let string = cfg.chat;
            let firstId = cfg.id;
            // extension
            let isExtension = cfg.isExtension;
            if (isExtension) {
                let reg = /\{[\d]\}/;
                btn.text = string.replace(reg, "...");
            }
            else {
                btn.text = string;
            }
            btn.onClicked.add(async () => {
                // ToolUtils.reportLog("ts_action_click", "快捷聊天", { button: 3 });
                // ToolUtils.coreStep(2);
                let myString = string;
                let sec = 99999;
                if (isExtension) {
                    let temp = await ChatUIExtension.getChatString(string);
                    myString = temp.str;
                    if (!myString) return;
                    sec = ChatUIExtension.getTextIdByText(temp.res);
                }
                this._main.canvas_word.visibility = mw.SlateVisibility.Collapsed;
                MGSHome.mgsSendChatMsg(firstId, sec);
                this.showText(myString);

            });
        }
    }



    /**
     * 显示UI
     * @param text
     */
    showText(text: string) {
        if (this.localPlayer.character) {
            Bubble.showBubble(0, text, this.localPlayer.character.gameObjectId, false);
        }
    }
    
    

}

export class BubbleModuleS extends ModuleS<BubbleModuleS, null> {
    
}