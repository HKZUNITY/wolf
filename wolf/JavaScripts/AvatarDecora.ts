export class Decora {
    skeletonName: string
    assetId: string
    slotName: string
    relativeTransform: mw.Transform
    constructor(decoraStr: string) {
        let arr = decoraStr.split("#")
        if (arr.length < 4)
            throw new Error(`decoraStr Fail`);
        this.skeletonName = arr[0]
        this.assetId = arr[1]
        this.slotName = arr[2]
        this.relativeTransform = mw.Transform.fromString(arr[3])
    }
}
export enum DecorType {
    /**没有 */
    None = 1,
    /**静态模型 */
    StaticObj = 2,
    /**特效对象 */
    Effect = 3
}
export enum ItemType {
    物品类型 = 1,
    道具类型 = 2,
    消耗类型 = 3,
    服饰类型 = 4,
    上衣 = 5,
    下衣 = 6,
    手套 = 7,
    鞋子 = 8,
    前发 = 9,
    后发 = 10,
    眼睛贴图 = 11,//瞳孔样式
    瞳孔贴图 = 12,//瞳孔贴花
    睫毛 = 13,
    眉毛 = 14,
    唇膏 = 15,
    腮红 = 16,
    表情 = 17,
    整体发型 = 18,
    套装 = 19,
    体型 = 20,
    面部 = 21,
    UGC上衣 = 22,
    UGC下衣 = 23,
    UGC手套 = 24,
    UGC鞋子 = 25,
    眼影 = 26,
    背景_废弃 = 27,
    挂件_左手 = 28,
    挂件_背部 = 29,
    挂件_头部 = 30,
    挂件_耳部 = 31,
    挂件_面部 = 32,
    耳朵 = 33,
    鼻子 = 34,
    嘴巴 = 35,
    面部彩绘 = 36,
    上高光 = 37,
    下高光 = 38,
    挂件_臀部 = 39,
    挂件_肩部 = 40,
    背景 = 41,
    挂件_宠物 = 42,
    挂件_特效 = 43,
    脸型 = 44,
    全妆 = 45,
    V1皮套 = 46,
    挂件_左手_全骨骼 = 47,
    挂件_背饰_全骨骼 = 48,
    挂件_头饰_全骨骼 = 49,
    挂件_耳饰_全骨骼 = 50,
    挂件_面饰_全骨骼 = 51,
    挂件_臀部_全骨骼 = 52,
    挂件_肩部_全骨骼 = 53,
    /**独立添加，与后端无关 */
    肤色 = 1234124,
}
///MW_Skeleton#22915#Left_Glove#10,15,-5|0,0,0|1,1,1
export namespace AvatarDecora {
    /** 动态挂件的itemtype   */
    export const dynamicItemType = [ItemType.挂件_左手_全骨骼, ItemType.挂件_背饰_全骨骼, ItemType.挂件_头饰_全骨骼, ItemType.挂件_耳饰_全骨骼, ItemType.挂件_面饰_全骨骼, ItemType.挂件_臀部_全骨骼, ItemType.挂件_肩部_全骨骼]
    /** 静态挂件的itemtype   */
    export const staticItemType = [ItemType.挂件_左手, ItemType.挂件_背部, ItemType.挂件_头部, ItemType.挂件_耳部, ItemType.挂件_面部, ItemType.挂件_臀部, ItemType.挂件_肩部]

    /**根据静态插槽，返回对应的动态挂件索引 */
    export function getDynamicIndexBySlotIndex(slotIndex: mw.HumanoidSlotType): number {
        let itemType: ItemType
        switch (slotIndex) {
            case mw.HumanoidSlotType.LeftGlove:
                itemType = ItemType.挂件_左手_全骨骼
                break;
            case mw.HumanoidSlotType.BackOrnamental:
                itemType = ItemType.挂件_背饰_全骨骼
                break;
            case mw.HumanoidSlotType.Head:
                itemType = ItemType.挂件_头饰_全骨骼
                break;
            case mw.HumanoidSlotType.LeftHead:
                itemType = ItemType.挂件_耳饰_全骨骼
                break;
            case mw.HumanoidSlotType.FaceOrnamental:
                itemType = ItemType.挂件_面饰_全骨骼
                break;
            case mw.HumanoidSlotType.Buttocks:
                itemType = ItemType.挂件_臀部_全骨骼
                break;
            case mw.HumanoidSlotType.RightBack:
                itemType = ItemType.挂件_肩部_全骨骼
                break;
        }
        return getDynamicIndexByItemType(itemType)
    }
    /**根据itemType引返回动态挂件枚举 */
    export function getDynamicIndexByItemType(itemType: ItemType): number {
        return dynamicItemType.indexOf(itemType)
    }
    /**根据动态挂件索引，返回对应的itemType */
    export function getItemTypeByDynamicIndex(dynamicIndex: number): ItemType {
        return dynamicItemType[dynamicIndex]
    }
    /**动静挂件itemType互斥映射 */
    export function exclusiveItemType(itemType: ItemType): ItemType {
        const index = dynamicItemType.indexOf(itemType)
        if (index >= 0)
            return staticItemType[index]
        const index2 = staticItemType.indexOf(itemType)
        if (index2 >= 0)
            return dynamicItemType[index]
    }

    /**设置挂件（动态、静态）
     * @param char 角色对象
     * @param itemType 物品类型
     * @param assetId 挂件assetId
     * @param slotData 静态挂件的槽位必须参数（有些itemType可能存在不同的slothIdex）和偏移值
     */
    export function setDecor3(char: Character, itemType: ItemType, assetId: string, slotData?: { slotIndex: number, offset: mw.Transform }) {
        //动态挂件itemType
        if (dynamicItemType.includes(itemType)) {
            return setDynamicDecor(char, getDynamicIndexByItemType(itemType), assetId)
        }
        //静态itemType
        else if (staticItemType.includes(itemType)) {
            //静态插槽
            const slotIndex = getSlotByItemType(itemType)
            //校验插槽与offset
            if (slotIndex == slotData.slotIndex && slotData?.offset) {
                return setDecoraBase(char, slotIndex, assetId, slotData.offset)
            }
        }
        else if (itemType == ItemType.挂件_特效) {
            //校验插槽与offset
            if (slotData?.offset) {
                return setDecoraBase(char, slotData.slotIndex, assetId, slotData.offset)
            }
        }
        console.error(`挂件数据异常:itemType:${itemType},assetId:${assetId},slotData:${JSON.stringify(slotData)}`);
    }

    /**挂上一个挂件 */
    export async function setDecora(decoraStr: string, char: mw.Character = undefined) {
        let decora = deserialize(decoraStr)
        return setDecoraBase(char, decora.slotIndex, decora.assetId, decora.relativeTransform);

    }
    /**挂上一个挂件 */
    export async function setDecora2(char: Character, slotIndex: number, assetId: string, offset: mw.Transform) {
        return setDecoraBase(char, slotIndex, assetId, offset);
    }

    /**挂上一个挂件 */
    export async function setDecoraBase(char: Character, slotIndex: number, assetId: string, offset: mw.Transform) {
        let obj = await GameObject.asyncSpawn(assetId)
        if (obj) {
            obj.setCollision(mw.PropertyStatus.Off, true)
            // if (obj instanceof mw.Effect) {
            //     clearOneDecoraBySlotIndex(slotIndex, char, DecorType.Effect);
            // } else {
            //     clearOneDecoraBySlotIndex(slotIndex, char, DecorType.StaticObj);
            //     clearDynamicDecorByIndex(char, getDynamicIndexBySlotIndex(slotIndex))
            // }
            char.description.advance.slotAndDecoration.slot[slotIndex].decoration.add(obj, offset)
            return true
        }
        return false
    }
    /**根据索引清除动态挂件 */
    export function clearDynamicDecorByIndex(char: Character, dynamicIndex: number) {
        const decor = char.description.advance.dynamicAttachments[dynamicIndex]
        if (decor?.style?.length > 0) {
            decor.style = ""
        }
    }

    /**挂上一个动态挂件 */
    export async function setDynamicDecor(char: Character, dynamicIndex: number, assetId: string) {
        if (!(EDynamicAttachmentIndex[dynamicIndex])) {
            console.error(`动态骨骼索引异常:${dynamicIndex}`);
            return false
        }
        let downloadSucceed = await AssetUtil.asyncDownloadAsset(assetId)
        if (!downloadSucceed) return false;
        if (char.description.advance.dynamicAttachments[dynamicIndex].style != assetId) {
            char.description.advance.dynamicAttachments[dynamicIndex].style = assetId;
        }
        await char.asyncReady();
        const succeed = char.description.advance.dynamicAttachments[dynamicIndex].style == assetId
        //成功时，删除映射静态挂件
        if (succeed) {
            clearOneDecoraByItemType(exclusiveItemType(getItemTypeByDynamicIndex(dynamicIndex)), char)
        }
        return succeed
    }

    /**清除对应部位的挂件 */
    export function clearOneDecoraBySlotIndex(slotIndex: number, char: mw.Character = undefined, objType: DecorType = DecorType.StaticObj) {
        if (objType == DecorType.Effect) {
            let slot = char.description.advance.slotAndDecoration.slot;
            if (!slot || slot.length == 0) return;
            for (let i = 0; i < slot.length; ++i) {
                let decoration = slot[i]?.decoration;
                if (!decoration) continue;
                for (let j = 0; j < decoration.length; ++j) {
                    let attachmentGameObject = decoration[j]?.attachmentGameObject;
                    if (!attachmentGameObject || !(attachmentGameObject instanceof mw.Effect)) continue;
                    decoration.delete(attachmentGameObject, true);
                }
            }
        } else {
            let decoration = char.description.advance.slotAndDecoration.slot[slotIndex].decoration;
            if (!decoration || decoration.length == 0) return;
            for (let i = 0; i < decoration.length; ++i) {
                let attachmentGameObject = decoration[i]?.attachmentGameObject;
                if (!attachmentGameObject) continue;
                switch (objType) {
                    case DecorType.None:
                        decoration.delete(attachmentGameObject, true);
                        break;
                    case DecorType.StaticObj:
                        if (!(attachmentGameObject instanceof mw.Effect)) {
                            decoration.delete(attachmentGameObject, true);
                        }
                        break;
                    default:
                        console.error(`未知挂件类型${objType}`);
                        break;
                }
            }
        }
    }

    /**清除所有挂件 */
    export function clearAllDecora(char: mw.Character = undefined) {
        char.detachAllFromSlot({ isDestroy: true })
        for (let i = 0; i < char.description.advance.dynamicAttachments.length; ++i) {
            if (char.description.advance.dynamicAttachments[i].style != "") {
                char.description.advance.dynamicAttachments[i].style = "";
            }
        }
    }

    /**反序列化 */
    export function deserialize(decoraStr: string) {
        if (decoraStr.includes("#")) {
            let strs = decoraStr.split("#")
            if (strs[1] && strs[2])
                return { assetId: strs[1], slotIndex: getSlotIndexByName(strs[2]), relativeTransform: mw.Transform.fromString(strs[3]), highModel: strs[4] == "high" }
        }
        else {
            // 资源库id$挂点名称$变换信息$高模
            // "20686$FaceOrnamental$1,0,0|0,0,0|1,1,1$high
            let strs = decoraStr.split("$")
            if (strs.length >= 3)
                return { assetId: strs[0], slotIndex: getSlotIndexByName(strs[1]), relativeTransform: mw.Transform.fromString(strs[2]), highModel: strs[3] == "high" }
        }
        return undefined
    }

    /**根据名字获取槽位索引 */
    export function getSlotIndexByName(slotName: string): mw.HumanoidSlotType {
        switch (slotName) {
            case "Head":
                return HumanoidSlotType["Head"]
            case "Left_Glove":
                return HumanoidSlotType["LeftGlove"]
            case "Left_Head":
                return HumanoidSlotType["LeftHead"]
            case "BackOrnamental":
                return HumanoidSlotType["BackOrnamental"]
            case "Buns":
                return HumanoidSlotType["Buttocks"]
            case "Right_Shoulder":
                return HumanoidSlotType["RightShoulder"]
        }
        return HumanoidSlotType[slotName]
    }
    /**根据索引获取槽位名 */
    export function getSlotNameByIndex(slotIndex: number) {
        return HumanoidSlotType[slotIndex]
    }

    /**获取挂件序列化数据 */
    export function getDecorationsString(char: mw.Character) {
        let slot = char.description.advance.slotAndDecoration.slot
        let decs: string[] = []
        for (let i = 0; i < slot.length; i++) {
            for (let j = 0; j < slot[i].decoration.length; j++) {
                let str = `MW_Skeleton#${slot[i].decoration[j].attachmentAssetId}#${getSlotNameByIndex(i)}#${slot[i].decoration[j].attachmentOffset.toString()}`
                decs.push(str)
            }
        }
        return decs
    }

    /**一个槽位只能存在一个挂件 */
    export async function vefDescra(char: mw.Character,) {
        let isDestroy: boolean = false
        let slot = char.description.advance.slotAndDecoration.slot
        for (let i = 0; i < slot.length; i++) {
            let objs: string[] = []
            for (let j = 0; j < slot[i].decoration.length; j++) {
                if (objs.includes(slot[i].decoration[j].attachmentAssetId))
                    slot[i].decoration.delete(slot[i].decoration[j].attachmentGameObject, true);
                else
                    objs.push(slot[i].decoration[j].attachmentAssetId);
            }
        }
        if (isDestroy) {
            await char.asyncReady()
        }
    }

    export function getSlotByItemType(itemType: ItemType) {
        switch (itemType) {
            case ItemType.挂件_左手:
                return mw.HumanoidSlotType.LeftGlove
            case ItemType.挂件_背部:
                return mw.HumanoidSlotType.BackOrnamental
            case ItemType.挂件_头部:
                return mw.HumanoidSlotType.Head
            case ItemType.挂件_耳部:
                return mw.HumanoidSlotType.LeftHead
            case ItemType.挂件_面部:
                return mw.HumanoidSlotType.FaceOrnamental
            case ItemType.挂件_臀部:
                return mw.HumanoidSlotType.Buttocks
            case ItemType.挂件_肩部:
                return mw.HumanoidSlotType.RightBack
        }
    }

    /**清除对应部位的挂件(根据物品类型) */
    export function clearOneDecoraByItemType(itemType: ItemType, char: mw.Character) {
        if (itemType == ItemType.挂件_特效) {
            let slot = char.description.advance.slotAndDecoration.slot
            for (let i = 0; i < slot.length; i++) {
                for (let j = 0; j < slot[i].decoration.length; j++) {
                    let obj = slot[i].decoration[j].attachmentGameObject
                    if (obj instanceof mw.Effect) {
                        slot[i].decoration.delete(obj, true)
                    }
                }
            }
        } else if (dynamicItemType.includes(itemType)) {
            clearDynamicDecorByIndex(char, getDynamicIndexByItemType(itemType))
        } else {
            let slotIndex = getSlotByItemType(itemType)
            let slot = char.description.advance.slotAndDecoration.slot[slotIndex]
            if (!slot || slot.decoration.length == 0) return;
            for (let j = 0; j < slot.decoration.length; j++) {
                let obj = slot.decoration[j].attachmentGameObject
                if (!(obj instanceof mw.Effect)) {
                    slot.decoration.delete(obj, true)
                }
            }
        }
    }

    /**根据itemType获取挂件 */
    export function getDecorByItemType(char: mw.Character, itemType: ItemType) {
        if (itemType == ItemType.挂件_特效) {
            let slot = char.description.advance.slotAndDecoration.slot
            for (let i = 0; i < slot.length; i++) {
                for (let j = 0; j < slot[i].decoration.length; j++) {
                    const obj = slot[i].decoration[j].attachmentGameObject
                    if (obj instanceof mw.Effect) {
                        return slot[i].decoration[j].attachmentAssetId
                    }
                }
            }
        } else if (dynamicItemType.includes(itemType)) {
            return char.description.advance.dynamicAttachments[getDynamicIndexByItemType(itemType)]?.style
        } else {
            let slotIndex = getSlotByItemType(itemType)
            if (mw.HumanoidSlotType[slotIndex]) {
                let slot = char.description.advance.slotAndDecoration.slot[slotIndex]
                let f = slot
                for (let j = 0; j < f.decoration.length; j++) {
                    if (!(f.decoration[j].attachmentGameObject instanceof mw.Effect)) {
                        let assetId = f.decoration[j].attachmentAssetId
                        if (assetId)
                            return assetId
                    }
                }
            }
        }
    }
}