import { AvatarDecora } from "./AvatarDecora"
import { IDescriptionElement } from "./Tables/Description"
import { GameConfig } from "./Tables/GameConfig"

/**
 * 角色外观接口工具,接口索引依赖红军配置表，接口解析依赖Description配置表
 */
export namespace AvatarApi {
    /**
     * 接口属性对应的值类型枚举
     */
    enum ValueType {
        /**数字，一般捏脸数值 */
        Number = 1,
        /**字符串，一般是资源guid，用在style的接口 */
        String,
        /**颜色，用在color的接口 */
        Color
    }
    /**
     * 函数类，包含get、set接口，和接口配置表
     */
    class FuncCls {
        /**获取数据函数，参数 角色对象：Character,区域索引?:number */
        getFunc: Function
        /**设置数据函数，参数 角色对象：Character,目标值:string|number|color,区域索引?:number */
        setFunc: Function
        cfg: IDescriptionElement
        hasArea: boolean
        constructor(getFunc: Function, setFunc: Function, cfg: IDescriptionElement, hasArea: boolean) {
            this.getFunc = getFunc
            this.setFunc = setFunc
            this.cfg = cfg
            this.hasArea = hasArea
        }
    }

    /**所有接口map，key:funcIndex,value:FuncCls */
    export var funcMap: Map<number, FuncCls> = new Map()
    /**存在区域的接口获取方法，key:funcIndex,value:Function */
    var areaCountMap: Map<number, Function> = new Map

    /**
     * 遍历Description表，初始化funcMap和areaCountMap
     */
    function initMap() {
        //遍历Description表，初始化funcMap和areaCountMap
        for (const cfg of GameConfig.Description.getAllElement()) {
            let getFunc: Function
            let setFunc: Function
            let hasArea: boolean = false
            //检查是否存在[],根据这个符号判断是否有区域
            if (cfg.tsAttribute.includes("[]")) {
                const s = cfg.tsAttribute.replace("[]", "[areaIndex]")
                getFunc = new Function("char", "areaIndex", `return char.description.${s}`)
                console.log();
                hasArea = true
                setFunc = new Function("char", "value", "areaIndex", `char.description.${s} = value`)

                //分割接口字符串，取第一个字符串作为获取区域数量函数
                let str = cfg.tsAttribute.split("[]")
                const tmp = str[0]
                const func = new Function("char", `return char.description.${tmp}.length`)
                areaCountMap.set(cfg.funcIndex, func)
            }
            else {
                getFunc = new Function("char", `return char.description.${cfg.tsAttribute}`)
                setFunc = new Function("char", "value", `char.description.${cfg.tsAttribute} = value`)
            }
            funcMap.set(cfg.funcIndex, new FuncCls(getFunc, setFunc, cfg, hasArea))
        }
    }
    initMap()
    /**封装好的数据类 */
    export class DescriptionApiData {
        /**数据版本 */
        version: number
        /**外观数据体 ，例如：[151,"0|32115",1,2,152,"1|0.5"],表示151接口0部位的值为32115,1接口的值为2,152接口1部位的值为0.5*/
        apiValue: (number | string)[] = []
        /**插槽挂件数据 */
        slotData?: string[]
        /**动态挂件数据,字符串数组，index=动态挂件索引，value=assetId */
        dynDecor?: string[]
    }

    /**
     * 根据数据体设置角色外观数据
     * @param char 角色对象
     * @param apiData 数据体 参考https://meta.feishu.cn/wiki/NjDhw7G5qiOpbAkHjF7cOxoEnEh 第一个评论
     * @param areaIndex 区域索引
     * @returns 主要部件加载成功返回true，否者false
     */
    export async function setDescriptionByApiData2(char: Character, apiData: DescriptionApiData) {
        if (apiData.apiValue.length % 2 != 0)
            throw new Error(`apiData.apiValue数据长度异常,${JSON.stringify(apiData)}`);

        /**接口要设置的值，key:funcIndex,value:解析后的值 */
        const dMap = new Map<number, { funcObj: FuncCls, areaIndex: number, value: any }[]>()
        /**基础接口，key:funcIndex,value:解析后的值 */
        const baseMap = new Map<number, { funcObj: FuncCls, areaIndex: number, value: any }[]>()
        /**需要依赖基础接口，key:funcIndex,value:解析后的值 */
        const subMap = new Map<number, { funcObj: FuncCls, areaIndex: number, value: any }[]>()
        let funcIndex175Value
        /**加载主要部件成功 */
        let loadMainPartSucceed = true
        const onLoadDescriptionFailed = () => {
            loadMainPartSucceed = false
            console.log(`setDescriptionByApiData2 加载主要部件失败`);
        }
        char.onLoadDescriptionFailed.add(onLoadDescriptionFailed)
        //解析数据
        for (let i = 0; i < apiData.apiValue.length; i += 2) {
            const funcIndex = apiData.apiValue[i] as number
            const funcObj = funcMap.get(funcIndex)
            let areaIndex: number
            let value: any
            if (funcObj.hasArea) {
                const strValue = apiData.apiValue[i + 1] as string
                const strArr = strValue.split("|")
                areaIndex = parseInt(strArr[0])
                value = deserialize(funcObj.cfg.valueType, strArr[1])
            }
            else
                value = deserialize(funcObj.cfg.valueType, apiData.apiValue[i + 1])
            if (dMap.has(funcIndex)) {
                dMap.get(funcIndex).push({ funcObj: funcObj, areaIndex: areaIndex, value: value })
            }
            else {
                dMap.set(funcIndex, [{ funcObj: funcObj, areaIndex: areaIndex, value: value }])
            }
            if (funcIndex == 175)
                funcIndex175Value = value
        }
        for (const [funcIndex, v] of dMap) {
            const funcObj = funcMap.get(funcIndex)
            if (funcObj.cfg.dependence) {
                subMap.set(funcIndex, v)
            }
            else {
                baseMap.set(funcIndex, v)
            }
        }
        //先设置基础接口装扮，再设置sub接口
        for (const [k, v] of baseMap) {
            for (const e of v) {
                try {
                    e.funcObj.setFunc(char, e.value, e.areaIndex)
                } catch (error) {
                    if (e.areaIndex != null)
                        console.error(`setDescriptionByApiData1 error,funcIndex(${e.funcObj.cfg.funcIndex}),areaIndex(${e.areaIndex}),value(${e.value})`);
                    else
                        console.error(`setDescriptionByApiData1 error,funcIndex(${e.funcObj.cfg.funcIndex}),value(${e.value})`);
                }
            }
        }
        for (const [k, v] of subMap) {
            for (const e of v) {
                try {
                    e.funcObj.setFunc(char, e.value, e.areaIndex)
                } catch (error) {
                    if (e.areaIndex != null)
                        console.error(`setDescriptionByApiData1 error,funcIndex(${e.funcObj.cfg.funcIndex}),areaIndex(${e.areaIndex}),value(${e.value})`);
                    else
                        console.error(`setDescriptionByApiData1 error,funcIndex(${e.funcObj.cfg.funcIndex}),value(${e.value})`);
                }
            }
        }
        if (funcIndex175Value) {
            //不是二次元和高模二次元就没有前发
            let style = getStyle(funcIndex175Value)
            if (!(style == StyleType.Quadratic)) {
                char.description.advance.hair.frontHair.style = ""
            }
        }
        await setSlotData(char, apiData.slotData)
        await setDynamicDecor(char, apiData.dynDecor)
        char.onLoadDescriptionFailed.remove(onLoadDescriptionFailed)
        return loadMainPartSucceed
    }

    /**
     * 比较角色当前的接口数据是否与目标数据相等
     * @param char 角色对象
     * @param funcIndex 接口索引
     * @param value serialization过的值
     * @param areaIndex 区域索引
     * @returns 相等返回true
     */
    function eqSerializationValue(char: Character, funcIndex: number, value: any, areaIndex?: number) {
        const curValue = getByFuncIndex(char, funcIndex, areaIndex)
        if (curValue == null || curValue == `undefined` || value == null || value == `undefined`)
            return true
        const valueType = funcMap.get(funcIndex).cfg.valueType
        const curV = serialization(valueType, curValue)
        let eqValue = false
        switch (valueType) {
            case ValueType.Number:
                eqValue = Math.abs(curV - value) <= 0.01
                break;
            case ValueType.Color:
                try {
                    let curColor = deserialize(ValueType.Color, curV) as LinearColor
                    let color = deserialize(ValueType.Color, value)
                    eqValue = (curColor).equality(color, 0.01)
                } catch (error) {
                    console.log(`eqSerializationValue error:${error}`);
                }
                break;
            default:
                eqValue = curV == value
                break;
        }
        return eqValue
    }

    /** 获取角色所有外观数据
     * @param char 角色
     * @param dataVersion 数据版本
     * @returns 封装好的数据类
     */
    export function getAllData(char: Character, dataVersion: number = 1) {
        const data = new DescriptionApiData
        data.version = dataVersion
        if (data.version == 1) {
            for (const [funcIndex, v] of funcMap) {
                if (areaCountMap.has(funcIndex)) {
                    for (let areaIndex = 0; areaIndex <= areaCountMap.get(funcIndex)(char); areaIndex++) {
                        const serializationValue = getSerializationValueByFuncIndex(char, funcIndex, areaIndex)
                        if (serializationValue != null)
                            data.apiValue.push(funcIndex, `${areaIndex}|${serializationValue}`)
                    }
                }
                else {
                    const serializationValue = getSerializationValueByFuncIndex(char, funcIndex)
                    if (serializationValue != null)
                        data.apiValue.push(funcIndex, serializationValue)
                }

                data.slotData = getSlotDataArr(char)
                data.dynDecor = getDynamicDecor(char)
            }
        }
        return data
    }

    /** 获取角色所有资源数据
     * @param char 角色
     * @returns assetGuidList
     */
    export function getAsset(char: Character) {
        const assets: { funcIndex: number, assetId: string, areaIndex?: number }[] = []
        for (const [funcIndex, v] of funcMap) {
            if (v.cfg.valueType == ValueType.String && !areaCountMap.has(funcIndex)) {
                if (areaCountMap.has(funcIndex)) {
                    for (let areaIndex = 0; areaIndex <= areaCountMap.get(funcIndex)(char); areaIndex++) {
                        const serializationValue = getSerializationValueByFuncIndex(char, funcIndex, areaIndex)
                        if (serializationValue != null)
                            assets.push({ funcIndex: funcIndex, assetId: serializationValue, areaIndex: areaIndex })
                    }
                }
                else {
                    const serializationValue = getSerializationValueByFuncIndex(char, funcIndex)
                    if (serializationValue != null)
                        assets.push({ funcIndex: funcIndex, assetId: serializationValue })
                }
            }
        }
        return assets
    }

    /**
     * 获取需要的角色对象外观数据
     * @param char 角色对象
     * @param funcIndexArr 外观接口索引数组，参考https://meta.feishu.cn/sheets/AIK0soPXEh4hTTtWVPScWjTDnon
     * @param dataVersion 数据版本
     * @returns 外观数据对象
     */
    export function getByFuncIndexArr(char: Character, funcIndexArr: number[], dataVersion = 1) {
        const data = new DescriptionApiData
        data.version = dataVersion
        if (data.version == 1) {
            for (const funcIndex of funcIndexArr) {
                if (areaCountMap.has(funcIndex)) {
                    for (let areaIndex = 0; areaIndex <= areaCountMap.get(funcIndex)(char); areaIndex++) {
                        const serializationValue = getSerializationValueByFuncIndex(char, funcIndex, areaIndex)
                        if (serializationValue != null)
                            data.apiValue.push(funcIndex, `${areaIndex}|${serializationValue}`)
                    }
                }
                else {
                    const serializationValue = getSerializationValueByFuncIndex(char, funcIndex)
                    if (serializationValue != null)
                        data.apiValue.push(funcIndex, serializationValue)
                }
            }
        }
        return data
    }

    /**
     * 根据保存类型saveType，导出对应接口的角色外观数据
     * @param char 角色对象
     * @param saveType 保存类型，参考Description.saveType
     * @param dataVersion 数据版本，默认1
     * @param extraFuncIndexArr 额外要添加的接口索引，可选参数
     * @returns 角色外观数据
     */
    export function getDataBySaveType(char: Character, saveType: number, dataVersion: number = 1, extraFuncIndexArr?: number[]) {
        let funcIndexArr: number[] = []
        for (const cfg of GameConfig.Description.getAllElement()) {
            switch (cfg.saveType) {
                case saveType:
                    funcIndexArr.push(cfg.funcIndex)
                    break;
            }
        }
        extraFuncIndexArr?.forEach((e) => {
            funcIndexArr.push(e)
        })
        return getByFuncIndexArr(char, funcIndexArr, dataVersion)
    }
    /**
     * 根据保存类型saveType，导出对应接口的角色外观数据
     * @param char 角色对象
     * @param saveTypeArr 保存类型，参考Description.saveType,例如[1,2]，导出头部捏脸、身材数值
     * @param dataVersion 数据版本，默认1
     * @param extraFuncIndexArr 额外要添加的接口索引，可选参数
     * @returns 角色外观数据
     */
    export function getDataBySaveTypeArr(char: Character, saveTypeArr: number[], dataVersion: number = 1, extraFuncIndexArr?: number[]) {
        let funcIndexArr: number[] = []
        for (const cfg of GameConfig.Description.getAllElement()) {
            saveTypeArr.forEach(saveType => {
                if (cfg.saveType == saveType)
                    funcIndexArr.push(cfg.funcIndex)
            })
        }
        extraFuncIndexArr?.forEach((e) => {
            funcIndexArr.push(e)
        })
        return getByFuncIndexArr(char, funcIndexArr, dataVersion)
    }

    /**
     * 根据funcIndex获取序列化后的值
     * @param char 角色对象
     * @param funcIndex 外观接口索引，参考https://meta.feishu.cn/sheets/AIK0soPXEh4hTTtWVPScWjTDnon
     * @param areaIndex 区域索引（可选参数）
     * @returns 序列化后的值
     */
    export function getSerializationValueByFuncIndex(char: Character, funcIndex: number, areaIndex?: number) {
        try {
            const funcObj = funcMap.get(funcIndex)
            const v2 = funcObj.getFunc(char, areaIndex)
            if (v2 != null) {
                const serializationValue = serialization(funcObj.cfg.valueType, v2)
                return serializationValue
            }
            return null
        } catch (error) {
            console.error(`getSerializationValueByFuncIndex error,funcIndex(${funcIndex}),areaCount(${areaIndex})`);
            return null
        }
    }
    /**
     * 设置角色外观该接口对应的值
     * @param char 角色
     * @param funcIndex 接口索引，参考https://meta.feishu.cn/sheets/AIK0soPXEh4hTTtWVPScWjTDnon
     * @param value 值,严格按照接口对应值类型
     * @param areaIndex 可选参数，区域
     */
    export function setByFuncIndex(char: mw.Character, funcIndex: number, value: number | string | LinearColor, areaIndex?: number) {
        const funcObj: FuncCls = funcMap.get(funcIndex)
        funcObj.setFunc(char, value, areaIndex)
    }
    /**
     * 获取角色外观该接口对应的值
     * @param char 角色
     * @param funcIndex 接口索引，参考https://meta.feishu.cn/sheets/AIK0soPXEh4hTTtWVPScWjTDnon
     * @param areaIndex 可选参数，区域
     * @returns 接口对应的值
     */
    export function getByFuncIndex(char: mw.Character, funcIndex: number, areaIndex?: number) {
        const funcObj = funcMap.get(funcIndex)
        const value = funcObj.getFunc(char, areaIndex)
        return value
    }
    /**
     * 根据值类型序列化为对应的值
     * @param valueType 值类型
     * @param value 值,number|string|LinearColor
     * @returns 序列化后的值
     */
    function serialization(valueType: ValueType, value: any) {
        let v: any
        switch (valueType) {
            case ValueType.Color:
                if (value.r > 1)
                    value.r = 1
                else if (value.r < 0)
                    value.r = 0

                if (value.g > 1)
                    value.g = 1
                else if (value.g < 0)
                    value.g = 0

                if (value.b > 1)
                    value.b = 1
                else if (value.b < 0)
                    value.b = 0

                if (value.a > 1)
                    value.a = 1
                else if (value.a < 0)
                    value.a = 0
                if (value.r + value.g + value.b + value.a == 0)
                    v = "0"
                else if (value.r == 1 && value.g == 1 && value.b == 1 && value.a == 1)
                    v = "f"
                else
                    v = linearToHex(value)
                break;
            case ValueType.Number:
                let numb = Number(value)
                if (Number(numb) % 1 !== 0)
                    v = parseFloat(numb.toFixed(3))
                else
                    v = numb
                break;
            case ValueType.String:
                if (value && value != "undefined")
                    v = value
                break
        }

        return v
    }
    function deserialize(valueType: ValueType, value: any) {
        let v: any;
        switch (valueType) {
            case ValueType.Color:
                if (value == "0")
                    value = "00000000"
                else if (value == "f")
                    value = "ffffff"
                v = hexToColor(value)
                break;
            case ValueType.Number:
                v = value;
                break;
            case ValueType.String:
                if (value && value != "undefined")
                    v = value
                break
        }
        return v;
    }
    /**
     * 16进制色值转为LinearColor
     * @param hex 16进制色值
     * @param outer 可选参数，LinearColor对象
     * @returns LinearColor对象
     */
    function hexToColor(hex: string, outer?: mw.LinearColor) {
        try {
            const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
            const match = hex.match(hexRegex);
            if (match) {
                const r = parseInt(match[1], 16) / 255;
                const g = parseInt(match[2], 16) / 255;
                const b = parseInt(match[3], 16) / 255;
                const a = match[4] ? parseInt(match[4], 16) / 255 : 1;
                if (!outer)
                    outer = new mw.LinearColor(r, g, b, a)
                else {
                    outer.r = r
                    outer.g = g
                    outer.b = b
                    outer.a = a
                }
                return outer
            }
        } catch (error) {
            console.error(`hexToColor error,hex(${hex}):${error}`);
            return LinearColor.white
        }
    }

    /**
     * LinearColor转为16进制色值,取值范围为 0 到 1
     * @param color LinearColor对象
     * @returns 16进制色值
     */
    function linearToHex(color: mw.LinearColor): string {
        let colorHex: string
        try {
            const r = color.r;
            const g = color.g;
            const b = color.b;
            const a = color.a;
            const hexR = Math.round(r * 255).toString(16).padStart(2, '0');
            const hexG = Math.round(g * 255).toString(16).padStart(2, '0');
            const hexB = Math.round(b * 255).toString(16).padStart(2, '0');
            const hexA = Math.round(a * 255).toString(16).padStart(2, '0');
            if (hexA === `ff`)
                colorHex = `${hexR}${hexG}${hexB}`;
            colorHex = `${hexR}${hexG}${hexB}${hexA}`;
        } catch (error) {
            console.error(`linearToHex error:${error}`);
        }
        if (colorHex?.length > 8) {
            console.log(`dddddddddddddddddddddddddddd:颜色换算大于八位,${color},${colorHex}`);

            throw new Error(`颜色换算大于八位,${color}`);
        }

        return colorHex
    }

    /**
     * 获取角色对象所有捏脸外观数据(log输出)
     * @param char 角色对象
     * @returns 外观数据字符串数组
     */
    export function toStrings(char: Character) {
        let strArr: string[] = []
        for (const [k, v] of funcMap) {
            if (v.hasArea) {
                for (let i = 0; i < areaCountMap.get(k)(char); i++) {
                    const str = `funcIndex(${v.cfg.funcIndex}),areaIndex(${i}),value(${v.getFunc(char, i)}),cfg:${JSON.stringify(v.cfg)}`
                    strArr.push(str)
                }
            }
            else {
                const str = `funcIndex(${v.cfg.funcIndex}),value(${v.getFunc(char)}),cfg:${JSON.stringify(v.cfg)}`
                strArr.push(str)
            }
            console.log(`toStrings:${k}`);

        }
        return strArr
    }

    /**
     * 根据funcIndex更换某个资源，还原依赖这个接口的
     * @param char 角色对象
     * @param funcIndex 接口索引，参考https://meta.feishu.cn/sheets/AIK0soPXEh4hTTtWVPScWjTDnon
     * @param value 资源guid值
     * @param areaIndex 区域
     * @returns
     */
    export async function changeAsset(char: Character, funcIndex: number, value: any, areaIndex?: number) {
        const funcObj = funcMap.get(funcIndex)
        const serializationVale = isNaN(areaIndex) ? serialization(funcObj.cfg.valueType, value) : `${areaIndex}|${serialization(funcObj.cfg.valueType, value)}`
        let tempData = getAllData(char)

        for (let i = 0; i < tempData.apiValue.length; i += 2) {
            if (tempData.apiValue[i] == funcIndex) {
                const curValue = tempData.apiValue[i + 1]
                tempData.apiValue[i + 1] = serializationVale
                // console.log(`changeAsset>>>funcIndex(${funcIndex}),curValue(${curValue})=>serializationVale(${serializationVale})`);
                break
            }
        }
        await setDescriptionByApiData2(char, tempData)

    }

    /**
     * 比较角色对象外观数据是否与数据体匹配
     * @param char 角色对象
     * @param apiData 数据体 参考https://meta.feishu.cn/wiki/NjDhw7G5qiOpbAkHjF7cOxoEnEh 第一个评论
     * @param eqSlot 比较挂件数据
     */
    export function equality(char: Character, apiData: DescriptionApiData, eqSlot: boolean = false) {
        let funcIndex: number
        let areaIndex: number
        let valueData: any
        let eq: boolean = true
        if (apiData.version == 1) {
            for (let i = 0; i < apiData.apiValue.length; i += 2) {
                funcIndex = apiData.apiValue[i] as number
                if (funcIndex == 182 || funcIndex == 183)
                    continue
                areaIndex = undefined
                const funcObj = funcMap.get(funcIndex)
                valueData = apiData.apiValue[i + 1]
                try {
                    if (typeof valueData === `string` && valueData.includes(`|`)) {
                        const str = valueData.split("|")
                        const value = str[1]
                        areaIndex = Number(str[0])
                        eq = eqSerializationValue(char, funcIndex, value, areaIndex)
                    }
                    else {
                        eq = eqSerializationValue(char, funcIndex, valueData)
                    }
                    if (!eq) {
                        // console.log(`AvatarApi.equality,funcIndex(${funcIndex}),areaIndex(${areaIndex}),valueData(${valueData}),eq(${eq})`);
                        break
                    }
                } catch (error) {
                    console.error(`AvatarApi.equality,funcIndex(${funcIndex}),areaIndex(${areaIndex}),valueData(${valueData}),eq(${eq}),error:${error}`);
                    return false
                }
            }
            if (eq && eqSlot) {
                eq = equalitySloth(char, apiData.slotData)
            }
            if (eq && eqSlot) {
                eq = equalityDynamicDecor(char, apiData.dynDecor)
            }
            return eq
        }
    }


    /**挂件分割字符 */
    const slotSplit = "$"
    /**获取所有挂件数据并序列化为字符串数组，如果数据长度=0，则为undefined */
    export function getSlotDataArr(char: Character) {
        let slot = char.description.advance.slotAndDecoration.slot
        let dataStrArr: string[] = []
        for (let i = 0; i < slot.length; i++) {
            for (let j = 0; j < slot[i].decoration.length; j++) {
                const decoration = slot[i].decoration[j]
                if (decoration.attachmentAssetId && decoration.attachmentGameObject && decoration.attachmentOffset) {
                    let transform = new Transform()
                    transform.position = new Vector(Number(decoration.attachmentOffset.position.x.toFixed(3)), Number(decoration.attachmentOffset.position.y.toFixed(3)), Number(decoration.attachmentOffset.position.z.toFixed(3)))
                    transform.rotation = new Rotation(Number(decoration.attachmentOffset.rotation.x.toFixed(3)), Number(decoration.attachmentOffset.rotation.y.toFixed(3)), Number(decoration.attachmentOffset.rotation.z.toFixed(3)))
                    transform.scale = new Vector(Number(decoration.attachmentOffset.scale.x.toFixed(3)), Number(decoration.attachmentOffset.scale.y.toFixed(3)), Number(decoration.attachmentOffset.scale.z.toFixed(3)))
                    const str = `${i}${slotSplit}${decoration.attachmentAssetId}${slotSplit}${transform.toString()}`
                    dataStrArr.push(str)
                }
            }
        }
        return dataStrArr.length > 0 ? dataStrArr : undefined
    }
    /**获取角色所有动态挂件数据 */
    export function getDynamicDecor(char: Character) {
        let dataStr: string[] = []
        const dynamicAttachments = char.description.advance.dynamicAttachments
        if (!dynamicAttachments || dynamicAttachments.length == 0) return dataStr;
        for (let i = 0; i < dynamicAttachments.length; i++) {
            const d = dynamicAttachments[i].style;
            dataStr.push(d)
        }
        return dataStr
    }
    /**获取所有挂件数据*/
    export function getSlotDataArr2(char: Character) {
        let slot = char.description.advance.slotAndDecoration.slot
        let dataStrArr: { assetId: string, slot: number, offset: Transform, obj: GameObject }[] = []
        for (let i = 0; i < slot.length; i++) {
            for (let j = 0; j < slot[i].decoration.length; j++) {
                const decoration = slot[i].decoration[j]
                if (decoration.attachmentAssetId && decoration.attachmentGameObject && decoration.attachmentOffset) {
                    dataStrArr.push({ assetId: decoration.attachmentAssetId, slot: i, offset: decoration.attachmentOffset, obj: decoration.attachmentGameObject })
                }
            }
        }
        return dataStrArr
    }
    /**
    * 设置动态挂件数据
    * @param char
    * @param strArr getDynamicDecor接口获取
    */
    export async function setDynamicDecor(char: Character, strArr: string[]) {
        if (strArr?.length > 0) {
            for (let i = 0; i < strArr.length; i++) {
                await AvatarDecora.setDynamicDecor(char, i, strArr[i])
            }
        }
    }
    /**
     * 设置挂件数据
     * @param char
     * @param strArr getSlotDataArr接口获取
     */
    export async function setSlotData(char: Character, strArr: string[]) {
        if (strArr?.length > 0) {
            for (let i = 0; i < strArr.length; i++) {
                const [slotIndexStr, assetId, transform] = strArr[i].split(slotSplit)
                const slotIndex = Number(slotIndexStr)
                if (slotIndex >= 0 && slotIndex < char.description.advance.slotAndDecoration.slot.length) {
                    await AvatarDecora.setDecora2(char, slotIndex, assetId, Transform.fromString(transform))
                }
            }
        }
        await char.asyncReady()
    }
    /**
     * 比较当前角色挂件是否完全相同
     * @param char 角色对象
     * @param strArr 挂件数据，getSlotDataArr接口获取
     * @returns 相同返回true,不相同返回false
     */
    export function equalitySloth(char: Character, strArr: string[]) {
        const curSlotData = getSlotDataArr(char)
        //如果挂件数据存在
        if (curSlotData && strArr) {
            //如果挂件数量相同
            if (curSlotData.length == strArr.length) {
                //遍历挂件数据，比较所有挂件数据
                for (let i = 0; i < curSlotData.length; i++) {
                    const [slotIndexStr1, assetId1, transform1] = curSlotData[i].split(slotSplit)
                    const [slotIndexStr2, assetId2, transform2] = strArr[i].split(slotSplit)
                    if (slotIndexStr1 != slotIndexStr2)
                        return false
                    if (assetId1 != assetId2)
                        return false
                    if (transform1.toString() != transform2.toString())
                        return false
                }
                console.log(`equalitySloth1`);

                return true
            }
            console.log(`equalitySloth2`);
            return false
        }
        console.log(`equalitySloth3,${curSlotData},${strArr}`);
        return !(curSlotData || strArr)
    }

    /**
    * 比较当前角色动态挂件是否完全相同
    * @param char 角色对象
    * @param strArr 挂件数据，getDynamicDecor接口获取
    * @returns 相同返回true,不相同返回false
    */
    export function equalityDynamicDecor(char: Character, strArr: string[]) {
        const curSlotData = getDynamicDecor(char)
        //如果挂件数据存在
        if (curSlotData && strArr) {
            for (let i = 0; i < curSlotData.length; i++) {
                if (curSlotData[i] != strArr[i])
                    return false
            }
        }
        return true
    }

    /**
     * 根据接口索引获取数据对象里的反序列化数据
     * @param apiData 目标数据
     * @param targetFuncIndex 目标接口索引
     * @returns 接口索引对应的反序列化数据
     */
    export function getValueByFuncIndex(apiData: DescriptionApiData, targetFuncIndex: number) {
        for (let i = 0; i < apiData.apiValue.length; i += 2) {
            const funcIndex = apiData.apiValue[i] as number
            if (targetFuncIndex == funcIndex) {
                const funcObj = funcMap.get(funcIndex)
                return deserialize(funcObj.cfg.valueType, apiData.apiValue[i + 1])
            }
        }
    }

    /**
     * 根据接口索引设置数据对象里的数据
     * @param apiData 目标数据
     * @param targetFuncIndex 目标接口索引
     * @returns 接口索引对应的数据
     */
    export function setValueByFuncIndex(apiData: DescriptionApiData, targetFuncIndex: number, value: any) {
        for (let i = 0; i < apiData.apiValue.length; i += 2) {
            const funcIndex = apiData.apiValue[i] as number
            if (targetFuncIndex == funcIndex) {
                const funcObj = funcMap.get(funcIndex)
                apiData.apiValue[i + 1] = serialization(funcObj.cfg.valueType, value)
                break
            }
        }
        return apiData
    }
    /** 获取所有资源guid
     * @param char 角色对象
     * @returns 所有guid拼接成的string,例如：guid1,guid2
     */
    export function getAssets(char: Character) {
        let assetMap = new Map<string, boolean>()
        for (const [funcIndex, v] of funcMap) {
            if (v.cfg.valueType == ValueType.String) {
                if (areaCountMap.has(funcIndex)) {
                    for (let areaIndex = 0; areaIndex <= areaCountMap.get(funcIndex)(char); areaIndex++) {
                        const serializationValue = getSerializationValueByFuncIndex(char, funcIndex, areaIndex);
                        if (serializationValue != null) {
                            assetMap.set(serializationValue, true)
                        }
                    }
                }
                else {
                    const serializationValue = getSerializationValueByFuncIndex(char, funcIndex)
                    if (serializationValue != null) {
                        assetMap.set(serializationValue, true)
                    }
                }
            }
        }
        getSlotDataArr2(char).forEach(e => {
            assetMap.set(e.assetId, true)
        })
        let assets = ""
        let a = [...assetMap.keys()]
        const lastIndex = a.length - 1
        a.forEach((guid, index) => { assets += index != lastIndex ? `${guid},` : `${guid}` })
        return assets
    }

    /**
    * 获取所有资源guid通过DescriptionApiData
    * @param apiData 封装好的数据类
    * @returns 所有guid拼接成的string,例如：guid1,guid2
    */
    export function getAssetsByDescriptionApiData(apiData: AvatarApi.DescriptionApiData) {
        let assetMap = new Map<string, boolean>()
        //解析数据
        for (let i = 0; i < apiData.apiValue.length; i += 2) {
            const funcIndex = apiData.apiValue[i] as number
            const funcObj = funcMap.get(funcIndex)
            let areaIndex: number
            let value: any
            if (funcObj.cfg.valueType == ValueType.String) {
                if (funcObj.hasArea) {
                    const strValue = apiData.apiValue[i + 1] as string
                    const strArr = strValue.split("|")
                    areaIndex = parseInt(strArr[0])
                    value = deserialize(funcObj.cfg.valueType, strArr[1])
                    assetMap.set(value, true)
                }
                else {
                    value = deserialize(funcObj.cfg.valueType, apiData.apiValue[i + 1])
                    assetMap.set(value, true)
                }
            }
        }
        return [...assetMap.keys()];
    }
    export function setValueByFuncIndex2<T>(char: Character, funcIndex: number, areaIndex: number, value: any) {
        try {
            const funcObj = funcMap.get(funcIndex)
            return funcObj.setFunc(char, value, areaIndex) as T
        } catch (error) {

        }
    }
}

export enum StyleType {
    /**二次元 */
    Quadratic = 1,

    /**低模 */
    LowPoly = 2,

    /**写实 */
    Realistic = 3,
    /**美式卡通 */
    Cartoony = 4,
}

export function getStyle(somatotype: mw.SomatotypeV2) {
    if (somatotype === mw.SomatotypeV2.LowpolyAdultFemale || somatotype === mw.SomatotypeV2.LowpolyAdultMale)
        return StyleType.LowPoly;
    if (somatotype === mw.SomatotypeV2.AnimeFemale || somatotype === mw.SomatotypeV2.AnimeMale)
        return StyleType.Quadratic;
    if (somatotype === mw.SomatotypeV2.RealisticAdultMale || somatotype === mw.SomatotypeV2.RealisticAdultFemale)
        return StyleType.Realistic;
    if (somatotype === mw.SomatotypeV2.CartoonyMale || somatotype === mw.SomatotypeV2.CartoonyFemale)
        return StyleType.Cartoony;
}