/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-06-21 16:19:51
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-06-28 10:59:19
 * @FilePath     : \murdermystery3\JavaScripts\uiTemplate\bubbleModule\ChatUIExtension.ts
 * @Description  : 修改描述
 */

/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-03-17 16:29:14
 * @FilePath     : \doubleparkour\JavaScripts\ui\ChatUIExtension.ts
 * @LastEditors  : chen.liang chen.liang@appshahe.com
 * @LastEditTime : 2023-03-21 15:14:52
 * @Description  : 
 */

import { GameConfig } from "../../Tables/GameConfig";
import ChatUIExtensionItem_Generate from "../../ui-generate/uiTemplate/bubbleModule/ChatUIExtensionItem_generate";
import ChatUIExtension_Generate from "../../ui-generate/uiTemplate/bubbleModule/ChatUIExtension_generate";




export class ChatUIExtension extends ChatUIExtension_Generate {
    public static extenList: Array<ExtensionInfo> = new Array();
    public static async getChatString(str: string) {

        // 获取类型
        let reg = /\{[\d]\}/;
        let matchs = str.match(reg);
        if (!matchs) return {str: str, res: ""};
        // 显示ui
        let result: string;
        for (let [index, match] of matchs.entries()) {
            // console.log("!!! aaaaa ", match);
            let cfgId = Number(match.charAt(1));
            // 获得string
            result = await mw.UIService.show(ChatUIExtension).getStr(cfgId);
            if (!result) return null;
            // 填入string
            str = str.replace(match, result);
        }
        return {str: str, res: result};
    }

    private resolve;

    private onStart() {
        this.closeButton.onClicked.add(() => {
            mw.UIService.hideUI(this);
            this.resolve && this.resolve(null);
        });
    }

    getStr(cfgId: number): Promise<string> {
        console.log("!!! ", cfgId);

        const cfg = GameConfig.ChatExtension.getElement(cfgId);
        if (!cfg) {
            return;
        }
        let types: string[] = cfg.chatType;
        this.mCanvas.removeAllChildren();
        ChatUIExtension.extenList = new Array<ExtensionInfo>();
        for (let type of types) {
            console.log("zzzz", type);
            let showText = GameConfig.Text.getElement(type).Content;
            let temp = new ExtensionInfo(Number(type), showText);
            ChatUIExtension.extenList.push(temp);
            this.createItem(showText);
        }
        return new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    createItem(type: string) {
        let item = mw.UIService.create(ChatUIExtensionItem_Generate);
        this.mCanvas.addChild(item.uiObject);
        let btn: mw.StaleButton = item.mStaleButton;
        btn.text = type;
        btn.onClicked.add(() => {
            mw.UIService.hideUI(this);
            this.resolve(type);
        });
    }

    public static getTextIdByText(showText: string){
        let res = 99999;
        this.extenList.forEach((value, index) => {
            if(value.showText == showText){
                res = value.id;
            }
        })
        return res;
    }

}

class ExtensionInfo{
    public id: number;
    public showText: string;
    constructor(id: number, showText: string) {
        this.id = id;
        this.showText = showText;
    }
}