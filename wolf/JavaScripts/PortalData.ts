/** 
 * @Author       : 复读机读复读机
 * @Date         : 2025-09-10 15:00:59
 * @LastEditors  : 复读机读复读机
 * @LastEditTime : 2025-09-18 16:46:54
 * @FilePath     : \APITest\JavaScripts\GiftModule\PortalData.ts
 * @Description  : 修改描述
 */




/**获取心愿列表get */
const http_wishListQueueResopnse = "metaverse/item/wish/item/wishListQueue"

/**申请赠送【接口post] */
const http_applySendWishItem = "metaverse/item/wish/item/applySendWishItem"

/**取消赠送心愿道具【接口post] */
const http_cancelWishSend = "metaverse/item/wish/item/cancelWishSend"


export default class PortalData {

    /**获取心愿列表
      * @param otherUserid 查询对方的userid
      * @param page 页面索引
      * @param perPage 页面长度
      */
    static async wishListQueueRequest(otherUserid: string, page: number, perPage: number = 50): Promise<ResultData<WishResponseData_S.WishListQueueResopnse>> {
        const jsonContent = {
            otherUserId: otherUserid,
            page: page,
            perPage: perPage
        }
        const responseData = await HttpHelper.HttpUtils.syncGet(http_wishListQueueResopnse, jsonContent)
        const resultData2 = ResultData.create(responseData.code, responseData.data as WishResponseData_S.WishListQueueResopnse, responseData.msg)
        return resultData2
    }

    /**赠送物品
     * @param itemId 要赠送的心愿物品
     * @param destUserid 要赠送的目标用户userid
     */
    static async applySendWishItemRequest(itemId: string, destUserid: string): Promise<ResultData<WishResponseData_S.ApplySendWishItemResponse>> {
        const jsonContent = {
            itemId: itemId,
            destUserId: destUserid
        }
        const responseData = await HttpHelper.HttpUtils.syncPost(http_applySendWishItem, jsonContent)
        const resultData2 = ResultData.create(responseData.code, responseData.data as WishResponseData_S.ApplySendWishItemResponse, responseData.msg)
        console.log(responseData.data.status);


        return resultData2
    }

    /**取消赠送物品
     * @param itemId 要赠送的心愿物品
     * @param destUserid 要赠送的目标用户userid
     */
    static async cancelSendWishItemRequest(itemIds: string[], userId: string): Promise<ResultData<WishResponseData_S.CancelWishSendResponse>> {
        const jsonContent = {
            itemIds: itemIds,
            destUserId: userId
        }
        const responseData = await HttpHelper.HttpUtils.syncPost(http_cancelWishSend, jsonContent)
        const resultData2 = ResultData.create(responseData.code, responseData.data as WishResponseData_S.CancelWishSendResponse, responseData.msg)
        return resultData2
    }





}

export var MaxCount = 5
export class ResultData<T> {
    get hasData() {
        return this.code == 200 && !!this.data
    }
    code: number
    data: T
    msg: string
    private constructor(code: number, data: T, msg?: string) {
        this.code = code
        this.data = data
        this.msg = msg
    }
    static create<T>(code: number, data: T, msg?: string) {
        const r = new ResultData<T>(code, data, msg)
        return r
    }
    pushResult() {
        console.log(`pushResult:${this.code},${this.data},${this.msg}`);
        return this
    }
}

export namespace HttpHelper {

    function extensionHttpRequestTransmitData(response: HttpResponse, paramUrl: string, jsonContent: any, requestType: HttpRequestType): boolean {
        return httpRequestTransmitData(response, paramUrl, jsonContent, requestType);
    }

    export class HttpUtils {
        static buildUrl(baseUrl: string, params: any): string {
            var queryString = Object.keys(params).map(function (key) {
                return key + '=' + params[key]
            }).join('&');
            let url = baseUrl + "?" + queryString
            console.log(`HttpUtils.buildUrl( ${baseUrl} , ${params} => ${url}) `);
            return url;
        }

        static get(baseUrl: string, params: any, response: HttpResponse): boolean {
            return extensionHttpRequestTransmitData(response, HttpUtils.buildUrl(baseUrl, params), {}, HttpRequestType.Get)
        }

        static post(url: string, jsonBody: any, response: HttpResponse): boolean {
            return extensionHttpRequestTransmitData(response, url, jsonBody, HttpRequestType.Post)
        }

        static syncGet(baseUrl: string, params: any): Promise<any> {
            return new Promise<any>((resolve: (value: any) => void) => {
                HttpUtils.get(baseUrl, params, (result: boolean, content: string, responseCode: number) => {
                    console.info(`HttpUtils.syncGet url:${baseUrl} param:${params} result:${result} content:${content} responseCode:${responseCode}`);
                    if (!result) return resolve(null);
                    if (responseCode != 200) return resolve(null);
                    try {
                        if (!content) return resolve(null);
                        let rData = JSON.parse(content);
                        if (rData) return resolve(rData);
                    } catch (error) {
                        return resolve(null);
                    }
                });
            });
        }

        static syncPost(baseUrl: string, jsonBody: any): Promise<any> {
            return new Promise<any>((resolve: (value: any) => void) => {
                HttpUtils.post(baseUrl, jsonBody, (result: boolean, content: string, responseCode: number) => {
                    console.info(`HttpUtils.syncPost url:${baseUrl} body:${jsonBody} result:${result} content:${content} responseCode:${responseCode}`);
                    if (!result) return resolve(null);
                    if (responseCode != 200) return resolve(null);
                    try {
                        if (!content) return resolve(null);
                        let rData = JSON.parse(content);
                        if (rData) return resolve(rData);
                    } catch (error) {
                        return resolve(null);
                    }
                });
            });
        }
    }
}



export namespace WishResponseData_S {
    /**心愿道具 */
    export class WishItem2GV0 {
        /**用户userId */
        userId: string
        /**ID */
        itemId: string
        /**公开状态 */
        pubStatus: number
        /**更新时间 */
        activeTime: number
        /**创建时间 */
        createTime: number
    }
    /**获取心愿列表 */
    export class WishListQueueResopnse {
        /**总数 */
        count: number
        /**本次回调的心愿道具列表 */
        rows: WishItem2GV0[]
    }
    /**申请赠送物品 */
    export class ApplySendWishItemResponse {
        /**0成功，1道具不合法，2用户不存在，3非好友关系，4对方拥有，5未知错误，6超过最大次数，7不是对方的心愿物品，8不能给自己赠送物品，9功能未开启，10物品正在被赠送 */
        status: number
        /**购买类型,1赠送，0通用 */
        shippedType: number
        token: string
    }
    /**取消赠送物品回调 */
    export class CancelWishSendResponse {
        /**0成功 */
        status: number
    }
    /**添加心愿物品 */
    export class AddwishItemResponse {
        /**0成功，1道具不存在，2重复添加，3道具已拥有，4超过最大限制个数，5未知错误 */
        status: number
    }
    /**删除心愿物品 */
    export class DeleteWishItemResponse {
        /**0成功，1失败 */
        status: number
    }
    /**获取心愿单物品 */
    // export class GetMyWishItemResponse {
    //     /**本次回调的心愿道具map,key:itemId,value:WishItem2GV0 */
    //     wishMap: KVDataMap_Str<WishItem2GV0>
    // }
    /**根据资源guid获取iconUrl
     * iconUrl=`${cdnUrl}${iconKey}`
     */
    export class GetIconUrlByAssetIdsResponse {
        cdnUrl: string
        assetDpiRespList: {
            dpi: number,
            assetIdIconMapResp: { assetId: string, iconKey: string }[]
        }[]
    }
    /**价格区间 */
    export class WishNewRecommend {
        index: number
        price: string
        itemIds: string[]
    }
    /**获取推荐物品 */
    export class WishRecommendItemResponse {
        /**潮流单品区间 */
        news: WishNewRecommend[]
        /**热梦物品itemId */
        hotItems: string[]
    }
    /**获取人气好物 */
    export class HotItemResponse {
        /**itemIds */
        itemIds: number[] = []
    }

    /**服务端消息推送 */
    export class Itemnotify {
        /**1收到心愿道具 */
        notifyType: number
        data: PushData
    }
    /**推送数据 */
    export class PushData {
        /**赠送者userId */
        userId: string
        /**收到赠送的物品id */
        itemId: string
    }

}



export interface Commodity extends CommodityInfo {
    commodityId: string;
    number: number;
    expand?: {
        shippedParams?: {
            shippedType: string,
            shippedArg: string
        }
    },
}



/**物品已获取方式|可获取方式 */
export enum ExtraInformationType {
    /**未能索引到物品信息 */
    UNKNOW_ITEM = 0,
    /**未获取 */
    NOT_ACQUIRED = 1,
    /**非会员 */
    NOT_VIP,
    /**已从商城购买 */
    STORE_PURCHASED,
    /**已从活动获取 */
    EVENT_ACQUIRED,
    /**免费物品 */
    ITEM_FOR_FREE,
    /**VIP物品 */
    VIP_PRIVILEGE,
    /**每周赠送活动 */
    ACTIVITY_WEEK_SEND_ITEM,
    /**赠送玩家身上avatar涉及到的道具 */
    INIT_SEND_AVATAR_ITEM,
    /**未知获取途径 */
    UNKNOW_ACQUIRED,
    /**套装 子物品信息不一致 */
    OUTFIT,
}
/**物品获取方式 */
export enum AcquiredFrom {
    无获取途径 = 0,
    免费商品 = 1,
    vip权益 = 2,
    商城购买 = 3,
    活动获取 = 4,
    盲盒 = 5,
    积分 = 6
}
/**许可状态 */
export enum PermissionStatus {
    未知 = 0,
    可用 = 1,
    不可用 = 2
}
/**
 * 装扮列表请求下来的数据类型
 */
export class ItemJsonData {
    readonly onUpdateData: Action1<ItemJsonData> = new Action1<ItemJsonData>()
    toString() {
        return JSON.stringify({ itemId: this.itemId, tagIds: this.tagIds, prefabGuid: this.prefabGuid, content: this.content, commodityId: this.commodityId, grade: this.grade, discount: this.discount, acquiredFrom: this.acquiredFrom })
    }
    tagIds: number[]
    itemId: any
    itemType: any
    itemName: any
    prefabGuid: string
    maxStock: any
    count: any
    weight: any
    description: any
    /**[2]=会员 */
    permissionTypes: any
    iconGuid: any
    pmId: any
    /**自定义数据，套装对应SuitData */
    content: any
    /**父节点页签 */
    parentPmId: number

    /**商品id */
    commodityId: string
    /**等级 */
    grade: number
    /**价格 */
    price: number
    /**设计师，平台账号，233号，gpark号 */
    designer: string
    /**折扣，通过Mall更新 */
    discount: number
    /**
     * 0无获取途径，1免费商品，2vip权益，3商城购买，4活动获取
     * 一个物品可能有多种获取方式
     */
    acquiredFrom: AcquiredFrom[]
    /**物品已获取方式|可获取方式*/
    extraInformation: ExtraInformationType
    /**是否可用 \
     * UNKNOW(0, "未知"),
ENABLE(1, "可用"),
DISABLE(2, "不可用"),
    */
    permissionStatus: PermissionStatus

    /**道具到期时间 */
    expireTime: number
    /**子物品itemId */
    subItemIds: number[]
}

/**商品类，基本字段包含从后端请求的字段 */
// export class Commodity {
//     getPrice: () => number
//     getParentPmId: () => number
//     getDiscount: () => number = () => { return 1 }
//     getCommodityId: () => string
//     isHave: () => boolean
//     commodityGetOfWay: () => AcquiredFrom[]
//     /**商品id,ItemJsonData.commodityId */
//     get id(): string {
//         return this.getCommodityId()
//     }
//     /**价格 */
//     get price(): number {
//         return this.getPrice()
//     }
//     /**是否已拥有 */
//     get have(): boolean {
//         return this.isHave()
//     }
//     /**获取方式，0无获取途径，1VIP，2购买，3活动，4免费 */
//     get getOf(): AcquiredFrom[] {
//         return this.commodityGetOfWay()
//     }
//     /**折扣0~1 */
//     get discount(): number {
//         return this.getDiscount()
//     }
//     /**100制折扣 */
//     get discount100() {
//         return -Math.floor(100 - this.getDiscount() * 100)
//     }
//     /**商品类型，根据这个字段getTabCfgByPmId获取页签配置 */
//     get parentPmId(): number {
//         return this.getParentPmId()
//     }
//     /**折扣token */
//     discountToken?: string

//     /**折扣后价格 */
//     get discountPrice() {
//         let _discountPrice = Math.floor(this.getPrice() * this.discount);
//         if (_discountPrice < 1) {
//             _discountPrice = 1;
//         }
//         return _discountPrice
//     }
// }

/**配置的套装数据 */
export class SuitData {
    somatotype: number
    behindHair: string
    frontHair: string
    upperCloth: string
    lowerCloth: string
    gloves: string
    shoe: string
    /**套装guid */
    assetId: string
    static toJson(data: SuitData) {
        return JSON.stringify(data)
    }
    static parse(str: string) {
        return JSON.parse(str) as SuitData
    }
    /**检查角色当前是否穿着这个套装 */
    static checkDress(char: Character, suitData: SuitData) {
        const v2 = char.description.advance
        const frontHair = v2.hair.frontHair.style
        const behindHair = v2.hair.backHair.style
        const upperCloth = v2.clothing.upperCloth.style
        const lowerCloth = v2.clothing.lowerCloth.style
        const gloves = v2.clothing.gloves.style
        const shoe = v2.clothing.shoes.style

        return (suitData.frontHair ? frontHair == suitData.frontHair : true)
            && (suitData.behindHair ? behindHair == suitData.behindHair : true)
            && (suitData.upperCloth ? upperCloth == suitData.upperCloth : true)
            && (suitData.lowerCloth ? lowerCloth == suitData.lowerCloth : true)
            && (suitData.gloves ? gloves == suitData.gloves : true)
            && (suitData.shoe ? shoe == suitData.shoe : true)
    }
    /**角色数据资源guid，解析成套装数据json */
    static async guidToJson(guid: string, char: Character) {
        const loadSuccess = await AssetUtil.asyncDownloadAsset(guid)
        if (loadSuccess) {
            char.setDescription([guid])
            await TimeUtil.delaySecond(TimeUtil.deltatime())
            await char.asyncReady()
            const v2 = char.description.advance
            const suitData = new SuitData()
            suitData.somatotype = char.description.advance.base.characterSetting.somatotype
            suitData.frontHair = v2.hair.frontHair.style
            suitData.behindHair = v2.hair.backHair.style
            suitData.upperCloth = v2.clothing.upperCloth.style
            suitData.lowerCloth = v2.clothing.lowerCloth.style
            suitData.gloves = v2.clothing.gloves.style
            suitData.shoe = v2.clothing.shoes.style
            return JSON.stringify(suitData)
        }
        return null

    }

}



