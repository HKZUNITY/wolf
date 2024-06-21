class MsgItem {
    public totalCnt: number = 0;
    public lastTime: number = 0;
    public name: string = "";
    public tooFast: boolean = false;
    public numInTime: number = 0;

    public constructor(name: string) {
        this.name = name;
    }
}

export class EventsTool {
    private static eventMap: Map<string, MsgItem> = new Map();
    private static tooFastTime: number = 2;
    private static tooFastCnt: number = 5;
    /**重置统计事件名 */
    public static start(reportTime: number = 10000, reportCnt: number = 5, fastTime: number = 2000, fastCnt: number = 5) {
        this.tooFastTime = fastTime;
        this.tooFastCnt = fastCnt;
        if (SystemUtil.isServer()) {
            // let oldDisToAll = mw.dispatchToAllClient;
            // mw.dispatchToAllClient = function (event: string, ...data: unknown[]) {
            //     EventsTool.setEventToMap(event);
            //     return oldDisToAll(event, ...data);
            // }
            // let oldDisToC = mw.dispatchToClient;
            // mw.dispatchToClient = function (player: mw.Player, event: string, ...data: unknown[]) {
            //     EventsTool.setEventToMap(event);
            //     return oldDisToC(player, event, ...data);
            // }
            // let oldDisLocal = mw.dispatchLocal;
            // mw.dispatchLocal = function (event: string, ...data: unknown[]) {
            //     EventsTool.setEventToMap(event);
            //     return oldDisLocal(event, ...data);
            // }
            let arg = mwext["NetManager"].getInstance();
            let oldNetCallClientFun = mwext["NetManager"].getInstance().callClientFun;
            mwext["NetManager"].getInstance().callClientFun = function (player: mw.Player | number, fun: string | Function, ...params: any[]) {
                EventsTool.setEventToMap(fun.toString());
                return oldNetCallClientFun.call(arg, player, fun, ...params);
            }
            let oldCallAllClientFun = mwext["NetManager"].getInstance().callAllClientFun;
            mwext["NetManager"].getInstance().callAllClientFun = function (fun: string | Function, ...params: any[]) {
                EventsTool.setEventToMap(fun.toString());
                return oldCallAllClientFun.call(arg, fun, ...params);
            }
        } else {//客户端向服务端通信
            // let oldDisToS = mw.dispatchToServer;
            // mw.dispatchToServer = function (event: string, ...data: unknown[]) {
            //     EventsTool.setEventToMap(event);
            //     return oldDisToS(event, ...data);
            // }
            // let oldDisLocal = mw.dispatchLocal;
            // mw.dispatchLocal = function (event: string, ...data: unknown[]) {
            //     EventsTool.setEventToMap(event);
            //     return oldDisLocal(event, ...data);
            // }
            let oldNetCallSeverFun = mwext["NetManager"].getInstance().callServerFun;
            let arg = mwext["NetManager"].getInstance();
            mwext["NetManager"].getInstance().callServerFun = function (fun: string | Function, ...params: any[]) {
                EventsTool.setEventToMap(fun.toString());
                return oldNetCallSeverFun.call(arg, fun, ...params);
            }
            let scroll = mw.ScrollBox.newObject(mw.UIService.canvas);
            scroll.zOrder = 10000000;
            scroll.position = new mw.Vector2(200, 400);
            scroll.size = new mw.Vector2(400, 400);
            scroll.visibility = mw.SlateVisibility.SelfHitTestInvisible;


            let img = mw.Image.newObject()
            img.size = new mw.Vector2(400, 400)
            img.position = new mw.Vector2(0, 0)
            img.imageColor = new mw.LinearColor(1, 1, 1, 0.5)
            scroll.addChild(img);

            let text = mw.TextBlock.newObject()
            scroll.addChild(text);
            // text.autoAdjust = true
            text.autoSizeEnable = true;
            text.fontColor = new mw.LinearColor(0, 0, 0);
            text.fontSize = 15;
            text.position = new mw.Vector2(0, 0);
            text.size = new mw.Vector2(400, 400);
            text.text = ""
            text.textAlign = mw.TextJustify.Left;

            // text.textLengthLimit = 1000000;
            // text.fontColor = new mw.LinearColor(255 / 255, 33 / 255, 22 / 255);

            let serverStr = "";
            let clientStr = "";

            Event.addServerListener("EventName.Net_test", (data: string) => {
                serverStr = data;
                update();
            })
            Event.addLocalListener("EventName.Net_test", (data: string) => {
                clientStr = data;
                update();
            })
            function update() {
                let str = "S调用:\n" + serverStr + "========================\nC调用:\n" + clientStr;
                text.text = str;
            }
            update();
        }

        if (SystemUtil.isServer()) {

            setInterval(() => {
                Event.dispatchToAllClient("EventName.Net_test", this.print(reportCnt));
            }, reportTime);

        }
        else {
            setInterval(() => {
                Event.dispatchToLocal("EventName.Net_test", this.print(reportCnt));
            }, reportTime);
        }
    }
    private static setEventToMap(name: string) {
        let num = EventsTool.eventMap.get(name) || new MsgItem(name);
        num.totalCnt++;

        if (num.tooFast == false) {
            //
            let now = Date.now();
            if (num.numInTime == 0) {
                num.lastTime = now;
            }
            if ((now - num.lastTime) <= this.tooFastTime) {
                num.numInTime++;
                if (num.numInTime >= this.tooFastCnt) {
                    num.tooFast = true;
                    // console.error("事件过于频繁");
                }
            }
            else {
                num.numInTime = 0;
            }
        }
        EventsTool.eventMap.set(name, num);

    }

    public static print(cnt: number) {
        let str = "";
        EventsTool.eventMap.forEach((value, key) => {
            if (value.totalCnt >= cnt || value.tooFast) {
                str += key + ":" + value.totalCnt + (value.tooFast ? " fast" : "") + "\n";
            }
        })
        return str;
    }

}
