import { oTraceWarning } from "odin";
import P_Tips from "../../CommonUI/P_Tips";
import Tips from "../../uiTemplate/Common/Tips";
import SVIPData from "./SVIPData";
import SVIPModuleS from "./SVIPModuleS";
import { Globals } from "../../Globals";
import P_BuyMemberPanel from "./P_BuyMemberPanel";
import P_RewardPopup from "../../UILogic/Hall/P_RewardPopup";
import { GameConfig } from "../../Tables/GameConfig";
import P_Hall from "../../UILogic/Hall/P_Hall";
import { MGSHome } from "../../MGSHome";
import { Tools } from "../../Tools";

export default class SVIPModuleC extends ModuleC<SVIPModuleS, SVIPData> {
    private buyPanel: P_BuyMemberPanel;
    private svipTimer;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        PurchaseService.onPremiumMemberStatusUpdate.add((result) => {
            this.premiumMemberStatusUpdateCallBack(result);
        })
        this.data.SVIPGiftUpdate.add(() => {
            if (this.buyPanel && this.buyPanel.visible) {
                this.buyPanel.updatePanel();
            }
        })
    }

    public async initVIPInfo() {
        let res = await this.checkSVIP();
        await this.server.net_changeVipPrivilege(res);
    }

    public isOpenBuySvipPanel(isOpen: boolean) {
        return;
        if (!this.buyPanel) {
            this.buyPanel = mw.UIService.create(P_BuyMemberPanel);
        }
        if (isOpen && this.buyPanel.visible == false) {
            this.buyPanel.show();
            P_Hall.instance.showShop();
        }
        else if (isOpen == false && this.buyPanel.visible == true) {
            this.buyPanel.hide();
            P_Hall.instance.hideShop();
        }

    }

    public async checkSVIP() {
        let myRes = false;
        if (SystemUtil.isPIE) {
            myRes = Globals.pieIsVip;
            oTraceWarning("在pie环境下如果想要vip请使用gm")
        }
        else {
            console.error("检查vip");

            await new Promise<void>(async (resolve) => {
                let isSupport = await this.getPremiumMemberSupported();
                if (isSupport) {
                    PurchaseService.isPremiumMember((result) => {
                        // 不是大会员
                        myRes = result;
                        resolve();
                    });
                }
                else {
                    // 在手机上运行时要确保支持大会员
                    P_Tips.show(GameConfig.Tips.getElement(20021).Content);
                    myRes = false;
                    resolve();
                }
            })

        }
        return myRes;
    }

    public async getPremiumMemberSupported() {
        if (SystemUtil.isPIE) {
            return true;
        }
        if (Globals.isSuppertSvip != null) {
            return Globals.isSuppertSvip;
        }
        let res = false;
        await new Promise<void>((resolve) => {
            PurchaseService.isPremiumMemberSupported((isSuppert) => {
                res = isSuppert;
                resolve();
                console.error("平台结果", res);
                if (this.svipTimer) {
                    clearTimeout(this.svipTimer);
                }
            })
            if (this.svipTimer) {
                clearTimeout(this.svipTimer);
            }
            /**为了避免没有回调，这里加一个延时自己返回结果 */
            this.svipTimer = setTimeout(() => {
                res = false;
                resolve();
            }, 3000);
        })
        Globals.isSuppertSvip = res;
        return res;
    }

    public getPlayerSVIPInfo() {
        return this.data.getSVIPInfoArray();
    }

    public getGiftRemainTime(giftType: SVIPGiftType) {
        return this.data.getHaveRemainTime(giftType);
    }

    /**尝试购买大会员 */
    public async tryBuySVIP() {
        let isSvip = await this.checkSVIP();
        if (isSvip) {
            console.warn("oTraceWarning >>>>>  已经是大会员了")
            return;
        }
        if (SystemUtil.isPIE) {
            Globals.pieIsVip = true;
            Globals.pieGoldKey = 2;
            /**弹出购买成功界面 */
            this.premiumMemberStatusUpdateCallBack(true);
        }
        else {
            PurchaseService.openPremiumMemberPurchasePage();
        }
    }

    private showBuyGiftSuccessPanel(giftType: SVIPGiftType) {
        P_RewardPopup.instance.showRewardItem(giftType);
    }

    /**尝试通过金钥匙购买特权礼包 */
    public tryUseGoldenKeyByGift(giftId: number) {
        if (SystemUtil.isPIE) {
            let haveKey = Globals.pieGoldKey;
            if (haveKey <= 0) {
                //购买金钥匙界面
                P_Tips.show(GameConfig.Tips.getElement(20020).Content);
            }
            else {
                this.getGoldenKeyCallBack(haveKey, giftId);
            }
        }
        else {
            PurchaseService.getUserKeyNumber((keyNumber) => {
                console.warn("oTranceWarning >>>>>  keyNumber: ", keyNumber);
                this.getGoldenKeyCallBack(keyNumber, giftId);
            })
        }
    }

    private getGoldenKeyCallBack(keyNumber: number, giftId: number) {
        if (keyNumber <= 0) {
            //购买金钥匙界面
            P_Tips.show(GameConfig.Tips.getElement(20020).Content);
        }
        else {
            if (SystemUtil.isPIE) {
                this.server.net_buyGoldenKeyGift(giftId);
                this.showBuyGiftSuccessPanel(giftId);
                P_Tips.show(GameConfig.Tips.getElement(20015).Content);
                Tools.playSound(10027);
                Globals.pieGoldKey--;
            }
            PurchaseService.consumeKey(giftId.toString(), 1, 1, (result: consumeKeyStatus) => {
                if (result == consumeKeyStatus.Success) {
                    //下单成功，服务器会有回调的
                    console.warn("oTranceWarning >>>>>  下单成功，服务器会有回调的");
                    this.showBuyGiftSuccessPanel(giftId);
                    P_Tips.show(GameConfig.Tips.getElement(20015).Content);
                    Tools.playSound(10027);

                }
                else {
                    P_Tips.show(GameConfig.Tips.getElement(10012).Content);
                }
            })
        }
    }

    private async premiumMemberStatusUpdateCallBack(result) {
        console.warn("onPremiumMemberStatusUpdate listen >>>>>  SVIP update: ", result);
        result = await this.checkSVIP();
        this.server.net_changeVipPrivilege(result);
        if (result == false) {
            P_Tips.show(GameConfig.Tips.getElement(20016).Content);
            Tools.playSound(10028);
        }

        if (this.buyPanel) {
            this.isOpenBuySvipPanel(false);
            //每次进入游戏的时候这个监听都会发送一次事件，所以这个做一下处理，在开ui的时候走购买回调逻辑
            if (result) {
                MGSHome.buyVipGift_C(SVIPGiftType.NormalGift);
                P_RewardPopup.instance.showRewardItem(SVIPGiftType.NormalGift);
                P_Tips.show(GameConfig.Tips.getElement(20014).Content);
                Tools.playSound(10027);
            }
        }
    }
    /**超级会员到期了 */
    public net_svipGoldenTimeOut() {
        P_Tips.show(GameConfig.Tips.getElement(20017).Content);
        Tools.playSound(10028);
    }

}
/**SVIP礼包类型 */
export enum SVIPGiftType {
    /**上线就有的特权礼包 */
    NormalGift = 1,
    /**需要花费金钥匙购买的 */
    GoldenKeyGift = 2,
}