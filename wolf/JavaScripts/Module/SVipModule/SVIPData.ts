/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-08-07 18:20:55
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-08-09 18:52:32
 * @FilePath     : \murdermystery3\JavaScripts\Module\SVipModule\SVIPData.ts
 * @Description  : 修改描述
 */
import { oTraceWarning } from "odin";
import { GameConfig } from "../../Tables/GameConfig";
import { SVIPGiftType } from "./SVIPModuleC";

export default class SVIPData extends Subdata {
    @Decorator.persistence()
    private svipInfoArray: Array<SVIPInfo> = new Array<SVIPInfo>();
    public readonly SVIPGiftUpdate: Action = new Action();
    protected initDefaultData(): void {
        this.svipInfoArray = new Array<SVIPInfo>();
    }

    public addSVIPGift(giftType: SVIPGiftType) {
        let dataInfo = GameConfig.Member.getElement(giftType);
        if (!dataInfo) {
            oTraceWarning("oTraceWarning: addSVIPGift dataInfo is null", giftType);
            return;
        }
        /**跟随会员的特权不需要额外存储跟着大会员走就可以了 */
        if (dataInfo.Duration <= 0) {
            return;
        }
        let sameItem = this.svipInfoArray.find((value) => {
            return value.giftId == giftType;
        })
        let endTime = 0;
        let duration = dataInfo.Duration * 3600;
        if (sameItem) {
            sameItem.lastTime += duration;
        }
        else {
            let svipInfo = new SVIPInfo(giftType, TimeUtil.time(), duration);
            this.svipInfoArray.push(svipInfo);
        }
        endTime = this.getHaveRemainTime(giftType);
        this.save(true);
        this.SVIPGiftUpdate.call();
        return endTime;
    }
    /**礼包到期了 */
    public deleteSVIPGift(giftType: SVIPGiftType) {
        this.svipInfoArray = this.svipInfoArray.filter((value) => {
            return value.giftId != giftType;
        })
        this.save(true);
        this.SVIPGiftUpdate.call();
    }

    public getHaveRemainTime(giftType: SVIPGiftType) {
        let res = 0;
        let sameItem = this.svipInfoArray.find((value) => {
            return value.giftId == giftType;
        })
        if (sameItem) {
            res = sameItem.haveTime + sameItem.lastTime - TimeUtil.time();
        }
        return res;
    }

    public getSVIPInfoArray() {
        return this.svipInfoArray;
    }
}

export class SVIPInfo {
    /**物品id */
    public giftId: number = 0;
    /**当期时间 */
    public haveTime: number = 0;
    /**持续时间 */
    public lastTime: number = 0;
    constructor(giftId: number, havetime: number, lasttime: number) {
        this.giftId = giftId;
        this.haveTime = havetime;
        this.lastTime = lasttime;
    }
}