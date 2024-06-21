import { PlayerManagerExtesion, } from './Modified027Editor/ModifiedPlayer';
import { ModifiedCameraSystem, CameraModifid, } from './Modified027Editor/ModifiedCamera';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { AiModuleS } from "./AI/AiModule";
import { AiObject } from "./AI/AiObject";
import { Camp, GameGlobals, GamingState, KillType, PlayerGameState } from "./Globals";
import { IRoleElement } from "./Tables/Role";
import { GameConfig } from "./Tables/GameConfig";
import { PlayerModuleC } from "./Module/PlayerModule/PlayerModuleC";
import { GameModuleC } from "./Module/GameModule/GameModuleC";
import { HotWeaponModuleC } from "./Module/Weapon/HotWeapon/HotWeaponModuleC";
import { ColdWeaponModuleC } from "./Module/Weapon/ColdWeapon/ColdWeaponModuleC";
import { ISoundElement } from "./Tables/Sound";
import { GameModuleS } from "./Module/GameModule/GameModuleS";
/**音效枚举 */
export enum SoundType {
    /**BGM */
    BGM,
    /**客户端音效 */
    Sound,
    /**3D音效 */
    Sound3D
}
export class Tools {

    /**
     * 播放音效
     * @param confId 配置表id
     * @param type 音效类型
     * @param loc 播放3D音效时的坐标（其他音效不传）
     */
    public static playSound(confId: number, char?: mw.Character | Vector) {
        let sound = GameConfig.Sound.getElement(confId);
        switch (Number(sound.Type)) {
            case SoundType.BGM:
                mw.SoundService.stopBGM();
                mw.SoundService.playBGM(sound.Guid, sound.Rate);
                break;
            case SoundType.Sound:
                mw.SoundService.playSound(sound.Guid, sound.Count, sound.Rate);
                break;
            case SoundType.Sound3D:
                let playParam = { radius: sound.InnerRadius, falloffDistance: sound.FalloffDistance }
                mw.SoundService.play3DSound(sound.Guid, char, sound.Count, sound.Rate, playParam);
                break;
        }
    }
    public static getFirePos(obj: mw.GameObject) {
        let res = obj;
        for (let i = 0; i < 3; i++) {
            res = res.getChildren()[0];
            if (i == 2) {
                return res.worldTransform.position.clone();
            }
        }
    }


    private static deathMap: Map<number, Array<mw.Animation>> = new Map();
    private static deathAim1: string = GameConfig.Assets.getElement(15005).Guid;
    private static deathAim2: string = GameConfig.Assets.getElement(14003).Guid;
    /**
     * 给角色播放死亡动画
     * @param bo 开关
     * @param playerId 玩家ID
     * @param delayTime 延迟时间
     */
    public static deathAim(bo: boolean, playerId: number) {
        if (bo) {
            if (this.deathMap.has(playerId)) {
                oTrace(`Death :: 玩家 ==== 玩家已经死亡,先关闭死亡姿态`)
                this.deathAim(false, playerId)
            };
            let animArr: Array<mw.Animation> = [];
            let player = Player.getPlayer(playerId);
            if (!player) {
                return;
            }
            player.character.movementEnabled = false;
            PlayerManagerExtesion.changeStanceExtesion(player.character, ``);
            let anim1 = PlayerManagerExtesion.rpcPlayAnimation(player.character, this.deathAim1, 1);
            animArr.push(anim1);
            setTimeout(() => {
                animArr.pop();
                let anim2 = PlayerManagerExtesion.rpcPlayAnimation(player.character, this.deathAim2, 0)
                animArr.push(anim2);
                this.deathMap.set(playerId, animArr);
                oTrace(`Death :: 玩家 ==== 玩家 ${playerId} 已经死亡 `)
            }, anim1.length / 2 * 1000);
        } else {
            let player = Player.getPlayer(playerId);
            if (GameGlobals.curGameState != GamingState.GamingFinish) {
                player.character.movementEnabled = true;
            }
            if (this.deathMap.has(playerId)) {
                this.deathMap.get(playerId).forEach((anim) => {
                    anim.stop();
                })
                this.deathMap.delete(playerId);
            }
            oTrace(`Death :: 玩家 ==== 玩家 ${playerId} 恢复原状态 `)
        }
    }

    private static deathAiMap: Map<mw.Character, Array<mw.Animation>> = new Map();
    private static deathAiAim1: string = GameConfig.Assets.getElement(15005).Guid;
    private static deathAiAim2: string = GameConfig.Assets.getElement(14003).Guid;

    /**
     * 给AI播放死亡动画
     * @param bo 开关
     * @param ai AI对象
     * @param delayTime 延迟时间
     * @returns 
     */
    public static deathAIAim(bo: boolean, ai: mw.Character) {
        if (bo) {
            if (this.deathAiMap.has(ai)) {
                oTrace(`Death :: AI ==== 玩家已经死亡,先关闭死亡姿态`)
                return;
            };
            let animArr: Array<mw.Animation> = [];
            ai.movementEnabled = false;
            PlayerManagerExtesion.changeStanceExtesion(ai, "");
            let anim1 = PlayerManagerExtesion.rpcPlayAnimation(ai, this.deathAiAim1, 1);
            animArr.push(anim1);
            setTimeout(() => {
                animArr.pop();
                let anim2 = PlayerManagerExtesion.rpcPlayAnimation(ai, this.deathAiAim2, 0);
                animArr.push(anim2);
                this.deathAiMap.set(ai, animArr);
            }, anim1.length / 2 * 1000);
        } else {
            ai.movementEnabled = true;
            if (this.deathAiMap.has(ai)) {
                this.deathAiMap.get(ai).forEach((anim) => {
                    anim.stop();
                })
                this.deathAiMap.delete(ai);
            }
        }

    }
    /**获取人形对象的身高 */
    public static getHumanHeight(char: mw.Character | mw.Character) {
        return char.collisionExtent.z - 10;
    }

    public static getRandomInt(min: number, max: number): number {
        let range = max - min + 1;
        let rand = Math.random();
        return Math.floor((min + rand * range));
    }
    public static changeSecond2Minus(curtime: number) {
        let resStr = "0";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        let minus = Math.floor(time / 60);
        let seconds = time % 60;
        let secondstr = seconds.toString();
        if (seconds < 10) {
            secondstr = "0" + seconds.toString();
        }
        resStr = minus.toString() + ":" + secondstr;
        return resStr;
    }
    /**转换时间格式为00:00:00 */
    public static changeSecond2Minus2(curtime: number) {
        let resStr = "0";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        let hour = Math.floor(time / 3600);
        let minus = Math.floor((time - hour * 3600) / 60);
        let seconds = time % 60;
        let secondstr = seconds.toString();
        let minusstr = minus.toString();
        let hourstr = hour.toString();
        if (seconds < 10) {
            secondstr = "0" + seconds.toString();
        }
        if (minus < 10) {
            minusstr = "0" + minus.toString();
        }
        if (hour < 10) {
            hourstr = "0" + hour.toString();
        }
        resStr = hourstr + ":" + minusstr + ":" + secondstr;
        return resStr;
    }
    private static shakeTimer;
    public static playShakeEffect(player: mw.Player, isAttack: boolean) {
        if (SystemUtil.isServer()) {
            return;
        }
        let camera = Camera.currentCamera;

        Camera.stopShake();
        if (this.shakeTimer) {
            clearTimeout(this.shakeTimer);
            this.shakeTimer = null;
        }
        let shakeData = ModifiedCameraSystem.getDefaultCameraShakeData();
        if (isAttack) {
            let lastTime = GameConfig.Rule.getElement(60018).Time;
            let tempShake: CameraModifid.Oscillator = {
                amplitude: GameConfig.Rule.getElement(60005).Weight,
                frequency: GameConfig.Rule.getElement(60006).Weight,
                waveform: CameraModifid.EOscillatorWaveform.SineWave,
            }
            shakeData.locXOscillation = tempShake;
            shakeData.locYOscillation = tempShake;
            ModifiedCameraSystem.startCameraShake(shakeData);
            this.shakeTimer = setTimeout(() => {
                Camera.stopShake();
                this.shakeTimer = null;
            }, lastTime * 1000);
        }
        else {
            let lastTime = GameConfig.Rule.getElement(60019).Time;
            let tempShake: CameraModifid.Oscillator = {
                amplitude: GameConfig.Rule.getElement(60008).Weight,
                frequency: GameConfig.Rule.getElement(60009).Weight,
                waveform: CameraModifid.EOscillatorWaveform.SineWave,
            }
            shakeData.rotRollOscillation = tempShake;
            ModifiedCameraSystem.startCameraShake(shakeData);
            this.shakeTimer = setTimeout(() => {
                Camera.stopShake();
                this.shakeTimer = null;
            }, lastTime * 1000);
        }



    }

    /**判断该物体是否是触发器等逻辑对象 */
    public static isTrigger(obj: mw.GameObject): boolean {
        return obj instanceof mw.Trigger;
        // let isTrigger = mw.isBoxTrigger(obj) || mw.isSphereTrigger(obj) || mw.isAmbientSound(obj) || mw.isEffectSys(obj)
        // return isTrigger;
    }
    /**判断该模型是否是人机 */
    public static isAiPlayer(model: mw.Character): boolean {
        let index = AiModuleS.aiModelList.indexOf(model);
        if (index == -1) {
            return false;
        }
        else {
            return true;
        }
    }
    /**得到对应的人机obj */
    public static getAiObj(model: mw.Character): AiObject {
        let ret: AiObject
        AiModuleS.aiObjList.forEach((obj) => {
            if (obj.aiModel == model) {
                ret = obj;
            }
        })
        return ret;
    }
    /**
     * 设置显隐
     * @param obj MWUICanvas/MWUIImage/MWUITextblock/MWUIButton
     * @param visible UI节点显示规则
     */
    public static setVisible(obj: mw.Canvas | mw.Button | mw.Image | mw.TextBlock, visibility: Visibility) {
        switch (visibility) {
            case Visibility.Visible:
                obj.visibility = mw.SlateVisibility.Visible;
                break;
            case Visibility.Collapsed:
                obj.visibility = mw.SlateVisibility.Collapsed;
                break;
            case Visibility.Hidden:
                obj.visibility = mw.SlateVisibility.Hidden;
                break;
            case Visibility.HitTestInvisible:
                obj.visibility = mw.SlateVisibility.HitTestInvisible;
                break;
            case Visibility.SelfHitTestInvisible:
                obj.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                break;
        }
    }

    /**
     * 人物特写
     * @param isShow 
     * @param offsetAngle 偏移角度
     * @param offsetZ 偏移量z
     * @param fov 广角
     * @returns 
     */
    public static setPlayerCloseup(isShow: boolean = true, offsetAngle: number = 0, offsetZ: number = -60, fov: number = 30): void {

        if (mw.SystemUtil.isServer()) return;

        let chara = Player.localPlayer.character;
        Camera.currentCamera.positionLagEnabled = true;
        Camera.currentCamera.positionLagSpeed = 5;
        Camera.currentCamera.rotationLagEnabled = true;
        Camera.currentCamera.rotationLagSpeed = 5;
        Camera.currentCamera.springArm.collisionEnabled = false;
        if (isShow) {
            Camera.currentCamera.fov = fov;
            let ro = chara.worldTransform.clone().rotation;
            let z = ro.z - 180;
            ModifiedCameraSystem.setOverrideCameraRotation(new mw.Rotation(new mw.Vector(ro.x, ro.y, z)));
            let forward = chara.worldTransform.clone().getForwardVector();
            let tarp = new mw.Vector(forward.x * 200, forward.y * 200, forward.z * 200);
            let x = tarp.x * Math.cos(offsetAngle) + tarp.y * Math.sin(offsetAngle);
            let y = -tarp.x * Math.sin(offsetAngle) + tarp.y * Math.cos(offsetAngle);
            Tools.cameraTargetOffset(chara, new mw.Vector(x, y, offsetZ));
        }
        else {
            // Camera.currentCamera.fov = 0;
            // Camera.currentCamera.springArm.localTransform.position = mw.Vector.ZERO;
            // ModifiedCameraSystem.setOverrideCameraRotation(new mw.Rotation(mw.Vector.ZERO));
            // setTimeout(() => {
            Camera.currentCamera.fov = 0;
            Camera.currentCamera.positionLagEnabled = false;
            Camera.currentCamera.rotationLagEnabled = false;
            Tools.cameraTargetOffset(chara, mw.Vector.zero);
            ModifiedCameraSystem.setOverrideCameraRotation(new mw.Rotation(mw.Vector.zero));
            ModifiedCameraSystem.resetOverrideCameraRotation();
            Camera.currentCamera.springArm.collisionEnabled = true;
            // }, 500);
        }
    }
    public static cameraTargetOffset(chara: mw.Character, offsetV: mw.Vector): void {
        if (mw.SystemUtil.isServer()) return;
        Camera.currentCamera.springArm.localTransform.position = offsetV;
        // if (GameUtils.onUpdateOffset) {
        //     GameUtils.onUpdateOffset.call(offsetV);
        // }
    }
    /**播放配武器击中的音效 */
    public static playHitSound(weaponId: number, hitActor: mw.GameObject) {
        if (SystemUtil.isClient()) {
            return
        }
        if (!weaponId) {
            return;
        }
        let config: ISoundElement;
        if (weaponId >= 20000) {
            config = GameConfig.Sound.getElement(10023);
        }
        else if (weaponId >= 10000) {
            config = GameConfig.Sound.getElement(10024);
        }
        else {
            config = GameConfig.Sound.getElement(10007);
        }
        if (Tools.isAiPlayer(hitActor as mw.Character)) {
            let aiobj = Tools.getAiObj(hitActor as mw.Character);
            if (aiobj.aiGameState == PlayerGameState.Normal) {
                SoundService.play3DSound(config.Guid, hitActor, config.Count, config.Rate, { radius: config.InnerRadius, falloffDistance: config.FalloffDistance })

            }
        }
        else if (PlayerManagerExtesion.isCharacter(hitActor)) {
            let state = ModuleService.getModule(GameModuleS).getPlayerGameState(hitActor.player.playerId);
            if (state == PlayerGameState.Normal) {
                SoundService.play3DSound(config.Guid, hitActor, config.Count, config.Rate, { radius: config.InnerRadius, falloffDistance: config.FalloffDistance })
            }
        }
    }

    public static getPlayerCanShoot(player: mw.Player) {
        if (SystemUtil.isServer()) {
            return;
        }
        let camp = ModuleService.getModule(GameModuleC).getPlayerCamp();
        let res = false;
        if (player.character.movementEnabled == false) {
            res = false;
        }
        else if ((camp == Camp.Hero || camp == Camp.Police) && ModuleService.getModule(HotWeaponModuleC).getIsCanShoot()) {
            res = true;
        }
        else if (camp == Camp.Spy && ModuleService.getModule(ColdWeaponModuleC).getIsCanShoot()) {
            res = true;
        }
        return res;
    }

    public static async changeClothByRole(modelInfo: IRoleElement, model: mw.Character) {
        if (!modelInfo || !model) return;
        await model.asyncReady();
        console.error(`change :: model${model.gameObjectId} data: ${JSON.stringify(modelInfo)} `);
        let advance = model?.description?.advance;
        if (!advance) return;
        if (advance.base.characterSetting.somatotype != modelInfo.Gender) advance.base.characterSetting.somatotype = modelInfo.Gender;
        advance.hair.frontHair.style = modelInfo.FrontHair.toString();
        advance.hair.backHair.style = modelInfo.BehindHair.toString();
        advance.headFeatures.head.style = modelInfo.Head.toString();
        advance.clothing.upperCloth.style = modelInfo.UpperCloth.toString();
        advance.clothing.lowerCloth.style = modelInfo.LowerCloth.toString();
        advance.clothing.shoes.style = modelInfo.Shoes.toString();
        advance.clothing.gloves.style = modelInfo.Gloves.toString();
        await model.asyncReady();
        await model.syncDescription();
        // if (modelInfo.Gender == 1) {
        //     // v2.description.advance.base.characterSetting.somatotype = (mw.SomatotypeV2.AnimeMale, false);
        //     v2.setSuit(mw.SomatotypeV2.AnimeMale, modelInfo.Head.toString(),
        //         modelInfo.UpperCloth.toString(), modelInfo.LowerCloth.toString(),
        //         modelInfo.Gloves.toString(), modelInfo.Shoes.toString(),
        //         modelInfo.FrontHair.toString(), modelInfo.BehindHair.toString());
        //     model.basicStance = "39317";
        // }
        // else {
        //     // v2.description.advance.base.characterSetting.somatotype = (mw.SomatotypeV2.AnimeFemale, false);
        //     v2.setSuit(mw.SomatotypeV2.AnimeFemale, modelInfo.Head.toString(),
        //         modelInfo.UpperCloth.toString(), modelInfo.LowerCloth.toString(),
        //         modelInfo.Gloves.toString(), modelInfo.Shoes.toString(),
        //         modelInfo.FrontHair.toString(), modelInfo.BehindHair.toString());
        //     model.basicStance = "30274";
        // }

        // setTimeout(() => {
        //     //     if (PlayerManagerExtesion.isNpc(model)) {
        //     //         oTraceError(`changeCloth ==== 模型 2 modelId ${model.guid} :: 配置 ${JSON.stringify(modelInfo)}`);
        //     //     } else {
        //     //         oTraceError(`changeCloth ==== 玩家 2 playerId ${model.player.playerId} :: 配置 ${JSON.stringify(modelInfo)}`);
        //     //     }
        //     v2.syncDescription();
        // }, 1000);
    }

    public static isRewardActive(): boolean {
        //激励广告是否激活
        return true;
    }

    //编码 map=>数组
    /**
     * map 转数组
     * @param map 
     * @returns 
     */
    public static encoderMapToArr(map: any, keyType: ecodeType, valueType: ecodeType): { key: Array<string>, value: Array<string> } {
        let keyArr: Array<string> = [];
        let valueArr: Array<string> = [];
        if (keyType == ecodeType.EcodeNumber && valueType == ecodeType.EcodeNumber) {
            keyArr.push(ecodeType.EcodeNumber);
            valueArr.push(ecodeType.EcodeNumber);
            map.forEach((val, key) => {
                keyArr.push(key.toString());
                valueArr.push(val.toString());
            });
        } else if (keyType == ecodeType.EcodeNumber && valueType == ecodeType.EcodeBool) {
            keyArr.push(ecodeType.EcodeNumber);
            valueArr.push(ecodeType.EcodeBool);
            map.forEach((val, key) => {
                keyArr.push(key.toString());
                valueArr.push(val.toString());
            })
        } else if (keyType == ecodeType.EcodeString && valueType == ecodeType.EcodeBool) {
            keyArr.push(ecodeType.EcodeString);
            valueArr.push(ecodeType.EcodeBool);
            map.forEach((val, key) => {
                keyArr.push(key.toString());
                valueArr.push(val.toString());
            })
        };
        return { key: keyArr, value: valueArr }
    }

    //解码 数组=>map
    /**
     * 数组转map
     * @param key key数组 
     * @param val val数组
     * @returns 
     */
    public static decoderArrToMap(key: Array<string>, val: Array<string>): any {

        console.error(`decoderArrToMap : key   ${key}`);
        console.error(`decoderArrToMap : value ${val}`);

        if (key[0] == ecodeType.EcodeNumber && val[0] == ecodeType.EcodeNumber) {
            let map1: Map<number, number> = new Map();
            map1.clear();
            for (let i = 0; i < key.length; i++) {
                if (i != 0) {
                    map1.set(Number(key[i]), Number(val[i]));
                }
            }
            // key.forEach((val, index) => {
            //     console.error(`1 === ${key[index]} 1 === ${val[index]} === index ${index}`);
            //     // if (index != 0) {
            //     //     console.error(`1 === ${Number(key[index])} 1 === ${Number(val[index])}`);
            //     //     map1.set(Number(key[index]), Number(val[index]));
            //     // }
            // })
            return map1;
        } else if (key[0] == ecodeType.EcodeNumber && val[0] == ecodeType.EcodeBool) {
            let map2: Map<number, boolean> = new Map();
            map2.clear();
            for (let i = 0; i < key.length; i++) {
                if (i != 0) {
                    map2.set(Number(key[i]), Boolean(val[i]));
                }
            }
            // key.forEach((val, index) => {
            //     if (index != 0) {
            //         console.error(`2 === ${key[index]} 2 === ${val[index]} === index ${index}`);
            //         console.error(`2 === ${Number(key[index])} 2 === ${Boolean(val[index])}`);
            //         map2.set(Number(key[index]), Boolean(val[index]));
            //     }
            // })
            return map2;
        } else if (key[0] == ecodeType.EcodeString && val[0] == ecodeType.EcodeBool) {
            let map3: Map<string, boolean> = new Map();
            map3.clear();
            for (let i = 0; i < key.length; i++) {
                if (i != 0) {
                    console.error(` 2 === ${Number(key[i])}  === ${Boolean(val[i])}`);
                    map3.set(String(key[i]), Boolean(val[i]));
                }
            }
            // key.forEach((val, index) => {
            //     if (index != 0) {
            //         console.error(`3 === ${key[index]} 3 === ${val[index]} === index ${index}`);
            //         console.error(`3 === ${String(key[index])} 3 === ${Boolean(val[index])}`);
            //         map3.set(String(key[index]), Boolean(val[index]));
            //     }
            // })
            return map3;
        }
    }



    //编码 map=>数组
    /**
     * map 转数组
     * @param map 
     * @returns 
     */
    public static encoderMapToArr1(map: Map<number, number>): { key: Array<number>, value: Array<number> } {
        let keyArr: Array<number> = [];
        let valueArr: Array<number> = [];
        map.forEach((val, key) => {
            keyArr.push(key);
            valueArr.push(val);
        })
        return { key: keyArr, value: valueArr }
    }

    //解码 数组=>map
    /**
     * 数组转map
     * @param key key数组 
     * @param val val数组
     * @returns 
     */
    public static decoderArrToMap1(key: Array<number>, val: Array<number>): Map<number, number> {
        let map1: Map<number, number> = new Map();
        map1.clear();
        if (!key || !val) return map1;
        for (let i = 0; i < key.length; i++) {
            map1.set(key[i], val[i]);
        }
        return map1;
    }



    //编码 map=>数组
    /**
     * map 转数组
     * @param map 
     * @returns 
     */
    public static encoderMapToArr2(map: Map<number, boolean>): { key: Array<number>, value: Array<boolean> } {
        let keyArr: Array<number> = [];
        let valueArr: Array<boolean> = [];
        map.forEach((val, key) => {
            keyArr.push(key);
            valueArr.push(val);
        })
        return { key: keyArr, value: valueArr }
    }

    //解码 数组=>map
    /**
     * 数组转map
     * @param key key数组 
     * @param val val数组
     * @returns 
     */
    public static decoderArrToMap2(key: Array<number>, val: Array<boolean>): Map<number, boolean> {
        let map1: Map<number, boolean> = new Map();
        map1.clear();
        if (!key || !val) return map1;
        for (let i = 0; i < key.length; i++) {
            map1.set(key[i], val[i]);
        }
        return map1;
    }


    //编码 map=>数组
    /**
     * map 转数组
     * @param map 
     * @returns 
     */
    public static encoderMapToArr3(map: Map<string, boolean>): { key: Array<string>, value: Array<boolean> } {
        let keyArr: Array<string> = [];
        let valueArr: Array<boolean> = [];
        map.forEach((val, key) => {
            keyArr.push(key);
            valueArr.push(val);
        })
        return { key: keyArr, value: valueArr }
    }

    //解码 数组=>map
    /**
     * 数组转map
     * @param key key数组 
     * @param val val数组
     * @returns 
     */
    public static decoderArrToMap3(key: Array<string>, val: Array<boolean>): Map<string, boolean> {

        let map1: Map<string, boolean> = new Map();
        map1.clear();
        if (!key || !val) return map1;
        for (let i = 0; i < key.length; i++) {
            map1.set(key[i], val[i]);
        }
        return map1;
    }

    /**资源下载并加载 */
    public static async asyncDownloadAsset(InAssetId: string): Promise<void> {
        if (!mw.AssetUtil.assetLoaded(InAssetId)) {
            await AssetUtil.asyncDownloadAsset(InAssetId);
        }
    }
}

export enum Visibility {
    /** 可见 */
    Visible = 0,
    /** 隐藏 并且不占用大小 */
    Collapsed = 1,
    /** 隐藏 占用计算大小 */
    Hidden = 2,
    /** 可见 自身以及子节点不可响应事件 */
    HitTestInvisible = 3,
    /** 可见 自身不可响应事件 */
    SelfHitTestInvisible = 4
}

export enum ecodeType {
    //布尔类型
    EcodeBool = `EcodeBool`,
    //字符类型
    EcodeString = `EcodeString`,
    //数字类型
    EcodeNumber = `EcodeNumber`
}