import { AiModuleS } from "./AI/AiModule";
import { AiObject } from "./AI/AiObject";
import { Camp, GameGlobals, GamingState, PlayerGameState } from "./Globals";
import { CameraModifid, ModifiedCameraSystem, } from './Modified027Editor/ModifiedCamera';
import { PlayerManagerExtesion, } from './Modified027Editor/ModifiedPlayer';
import { GameModuleC } from "./Module/GameModule/GameModuleC";
import { GameModuleS } from "./Module/GameModule/GameModuleS";
import { ColdWeaponModuleC } from "./Module/Weapon/ColdWeapon/ColdWeaponModuleC";
import { HotWeaponModuleC } from "./Module/Weapon/HotWeapon/HotWeaponModuleC";
import { GameConfig } from "./Tables/GameConfig";
import { IRoleElement } from "./Tables/Role";
import { ISoundElement } from "./Tables/Sound";

export enum SoundType {
    /**BGM */
    BGM,
    /**客户端音效 */
    Sound,
    /**3D音效 */
    Sound3D
}

export class Tools {
    public static async getCustomdata(key: string): Promise<any> {
        return (await DataStorage.asyncGetData(key)).data;
    }

    public static async setCustomData(saveKey: string, dataInfo: any): Promise<boolean> {
        let code: mw.DataStorageResultCode = null;
        code = await DataStorage.asyncSetData(saveKey, dataInfo);
        return code == mw.DataStorageResultCode.Success;
    }

    private static assetIconDataMap: Map<string, mw.AssetIconData> = new Map<string, mw.AssetIconData>();
    public static setImageByAssetIconData(image: mw.Image, icon: string): void {
        if (this.assetIconDataMap.has(icon)) {
            image.setImageByAssetIconData(this.assetIconDataMap.get(icon));
        } else {
            mw.assetIDChangeIconUrlRequest([icon]).then(() => {
                try {
                    let assetIconData = mw.getAssetIconDataByAssetID(icon);
                    image.setImageByAssetIconData(assetIconData);
                    this.assetIconDataMap.set(icon, assetIconData);
                } catch (error) { }
            });
        }
    }

    public static setWidgetVisibility(ui: mw.Widget, visibility: mw.SlateVisibility): void {
        if (ui.visibility != visibility) ui.visibility = visibility;
    }

    /**
     * 播放音效
     * @param confId 配置表id
     * @param char 播放3D音效时的坐标（其他音效不传）
     */
    public static playSound(confId: number, char?: mw.Character | Vector): void {
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

    /**拿到当前武器开火世界坐标 */
    public static getFirePos(obj: mw.GameObject): mw.Vector {
        let fireAnchor: mw.GameObject = obj;
        for (let i = 0; i <= 2; ++i) {
            fireAnchor = fireAnchor.getChildren()[0];
        }
        return fireAnchor.worldTransform.position.clone();
    }

    private static characterDeathAnimationMap: Map<number, mw.Animation[]> = new Map<number, mw.Animation[]>();
    private static characterDeathAnimationId_1: string = GameConfig.Assets.getElement(15005).Guid;
    private static characterDeathAnimationId_2: string = GameConfig.Assets.getElement(14003).Guid;
    /**给角色播放死亡动画 */
    public static playCharacterDeathAnimation(onOff: boolean, playerId: number): void {
        if (onOff) {
            if (this.characterDeathAnimationMap.has(playerId)) this.playCharacterDeathAnimation(false, playerId);
            let deathAnimations: mw.Animation[] = [];
            let player = Player.getPlayer(playerId);
            if (!player) return;
            player.character.movementEnabled = false;
            PlayerManagerExtesion.changeStanceExtesion(player.character, ``);
            let animation_1 = PlayerManagerExtesion.rpcPlayAnimation(player.character, this.characterDeathAnimationId_1, 1);
            deathAnimations.push(animation_1);
            setTimeout(() => {
                deathAnimations.pop();
                let animation_2 = PlayerManagerExtesion.rpcPlayAnimation(player.character, this.characterDeathAnimationId_2, 0)
                deathAnimations.push(animation_2);
                this.characterDeathAnimationMap.set(playerId, deathAnimations);
                console.warn(`playCharacterDeathAnimation - playerId:${playerId} - Death`);
            }, animation_1.length / 2 * 1000);
        } else {
            let player = Player.getPlayer(playerId);
            if (GameGlobals.curGameState != GamingState.GamingFinish) player.character.movementEnabled = true;
            if (!this.characterDeathAnimationMap.has(playerId)) return;
            this.characterDeathAnimationMap.get(playerId).forEach((value: mw.Animation) => { value.stop(); });
            this.characterDeathAnimationMap.delete(playerId);
            console.warn(`playCharacterDeathAnimation - playerId:${playerId} - rebirth`);
        }
    }

    private static aiDeathAnimationMap: Map<mw.Character, mw.Animation[]> = new Map<mw.Character, mw.Animation[]>();
    private static deathAiAim1: string = GameConfig.Assets.getElement(15005).Guid;
    private static deathAiAim2: string = GameConfig.Assets.getElement(14003).Guid;
    /**给AI播放死亡动画 */
    public static playAIDeathAnimation(onOff: boolean, ai: mw.Character): void {
        if (onOff) {
            if (this.aiDeathAnimationMap.has(ai)) return;
            let animations: mw.Animation[] = [];
            ai.movementEnabled = false;
            PlayerManagerExtesion.changeStanceExtesion(ai, "");
            let animation_1 = PlayerManagerExtesion.rpcPlayAnimation(ai, this.deathAiAim1, 1);
            animations.push(animation_1);
            setTimeout(() => {
                animations.pop();
                let animation_2 = PlayerManagerExtesion.rpcPlayAnimation(ai, this.deathAiAim2, 0);
                animations.push(animation_2);
                this.aiDeathAnimationMap.set(ai, animations);
            }, animation_1.length / 2 * 1000);
        } else {
            ai.movementEnabled = true;
            if (!this.aiDeathAnimationMap.has(ai)) return;
            this.aiDeathAnimationMap.get(ai).forEach((anim) => { anim.stop(); });
            this.aiDeathAnimationMap.delete(ai);
        }
    }

    /**获取人形对象的身高 */
    public static getCharacterHeight(character: mw.Character): number {
        return character.collisionExtent.z - 10;
    }

    public static randomInt(min: number, max: number): number {
        let range = max - min + 1;
        let rand = Math.random();
        return Math.floor((min + rand * range));
    }

    /**秒 转换为 分：秒 */
    public static formatTime_1(curtime: number): string {
        let resStr: string = `0`;
        if (curtime < 0) return resStr;
        let time = Math.round(curtime);
        let minus = Math.floor(time / 60);
        let seconds = time % 60;
        let secondstr: string = `${seconds}`;
        if (seconds < 10) secondstr = `0${seconds}`;
        resStr = `${minus}:${secondstr}`;
        return resStr;
    }

    /**秒 转换为 时：分：秒*/
    public static formatTime_2(curtime: number): string {
        if (curtime < 0) return `0`;
        let time = Math.round(curtime);
        let hour = Math.floor(time / 3600);
        let minus = Math.floor((time - hour * 3600) / 60);
        let seconds = time % 60;
        let secondstr: string = `${seconds}`;
        let minusstr: string = `${minus}`;
        let hourstr: string = `${hour}`;
        if (seconds < 10) secondstr = `0${seconds}`;
        if (minus < 10) minusstr = `0${minus}`;
        if (hour < 10) hourstr = `0${hour}`;
        return `${hourstr}:${minusstr}:${secondstr}`;
    }

    private static shakeCameraTimeoutId: any = null;
    private static clearShakeCameraTimeoutId(): void {
        if (!this.shakeCameraTimeoutId) return;
        clearTimeout(this.shakeCameraTimeoutId);
        this.shakeCameraTimeoutId = null;
    }

    public static cameraShake(isAttack: boolean): void {
        if (SystemUtil.isServer()) return;

        Camera.stopShake();
        this.clearShakeCameraTimeoutId();

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
            this.shakeCameraTimeoutId = setTimeout(() => {
                Camera.stopShake();
                this.shakeCameraTimeoutId = null;
            }, lastTime * 1000);
        } else {
            let lastTime = GameConfig.Rule.getElement(60019).Time;
            let tempShake: CameraModifid.Oscillator = {
                amplitude: GameConfig.Rule.getElement(60008).Weight,
                frequency: GameConfig.Rule.getElement(60009).Weight,
                waveform: CameraModifid.EOscillatorWaveform.SineWave,
            }
            shakeData.rotRollOscillation = tempShake;
            ModifiedCameraSystem.startCameraShake(shakeData);
            this.shakeCameraTimeoutId = setTimeout(() => {
                Camera.stopShake();
                this.shakeCameraTimeoutId = null;
            }, lastTime * 1000);
        }
    }

    /**判断该物体是否是触发器等逻辑对象 */
    public static isTrigger(obj: mw.GameObject): boolean {
        return obj instanceof mw.Trigger;
    }

    /**判断该模型是否是人机 */
    public static isAiPlayer(model: mw.Character): boolean {
        let index = AiModuleS.aiModelList.indexOf(model);
        return index != -1;
    }

    /**得到对应的人机obj */
    public static getAiObject(model: mw.Character): AiObject {
        for (let i = 0; i < AiModuleS.aiObjList.length; ++i) {
            if (AiModuleS.aiObjList[i].aiModel == model) {
                return AiModuleS.aiObjList[i];
            }
        }
        return null;
    }

    /**设置显隐 */
    public static setVisible(obj: mw.Canvas | mw.Button | mw.Image | mw.TextBlock, visibility: Visibility): void {
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

    //TODO-WFZ
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
        } else {
            Camera.currentCamera.fov = 0;
            Camera.currentCamera.positionLagEnabled = false;
            Camera.currentCamera.rotationLagEnabled = false;
            Tools.cameraTargetOffset(chara, mw.Vector.zero);
            ModifiedCameraSystem.setOverrideCameraRotation(new mw.Rotation(mw.Vector.zero));
            ModifiedCameraSystem.resetOverrideCameraRotation();
            Camera.currentCamera.springArm.collisionEnabled = true;
        }
    }

    public static cameraTargetOffset(chara: mw.Character, offsetV: mw.Vector): void {
        if (mw.SystemUtil.isServer()) return;
        Camera.currentCamera.springArm.localTransform.position = offsetV;
    }

    /**播放武器击中的音效通过weaponId */
    public static playHitSound(weaponId: number, hitActor: mw.GameObject): void {
        if (SystemUtil.isClient()) return;
        if (!weaponId) return;

        let soundElement: ISoundElement = null;
        if (weaponId >= 20000) {
            soundElement = GameConfig.Sound.getElement(10023);
        } else if (weaponId >= 10000) {
            soundElement = GameConfig.Sound.getElement(10024);
        } else {
            soundElement = GameConfig.Sound.getElement(10007);
        }

        if (Tools.isAiPlayer(hitActor as mw.Character)) {
            let aiobj = Tools.getAiObject(hitActor as mw.Character);
            if (aiobj.aiGameState == PlayerGameState.Normal) {
                SoundService.play3DSound(soundElement.Guid, hitActor, soundElement.Count, soundElement.Rate, { radius: soundElement.InnerRadius, falloffDistance: soundElement.FalloffDistance });
            }
        } else if (PlayerManagerExtesion.isCharacter(hitActor)) {
            let state = ModuleService.getModule(GameModuleS).getPlayerGameState(hitActor.player.playerId);
            if (state == PlayerGameState.Normal) {
                SoundService.play3DSound(soundElement.Guid, hitActor, soundElement.Count, soundElement.Rate, { radius: soundElement.InnerRadius, falloffDistance: soundElement.FalloffDistance });
            }
        }
    }

    /**是否可以射击 */
    public static getPlayerCanShoot(player: mw.Player): boolean {
        if (SystemUtil.isServer()) return false;

        let camp = ModuleService.getModule(GameModuleC).getPlayerCamp();
        let isCanShoot: boolean = false;
        if (player.character.movementEnabled == false) {
            isCanShoot = false;
        } else if ((camp == Camp.Hero || camp == Camp.Police) && ModuleService.getModule(HotWeaponModuleC).getIsCanShoot()) {
            isCanShoot = true;
        } else if (camp == Camp.Spy && ModuleService.getModule(ColdWeaponModuleC).getIsCanShoot()) {
            isCanShoot = true;
        }
        return isCanShoot;
    }

    public static async changeClothByRole(modelInfo: IRoleElement, model: mw.Character): Promise<void> {
        if (!model) return;
        await model.asyncReady();
        if (!modelInfo) {
            AccountService.downloadData(model);
            model.syncDescription();
            return;
        }

        console.error(`changeClothByRole - model${model.gameObjectId} data: ${JSON.stringify(modelInfo)} `);
        let advance = model?.description?.advance;
        if (!advance) return;

        if (advance.base.characterSetting.somatotype != modelInfo.Gender) advance.base.characterSetting.somatotype = modelInfo.Gender;
        advance.hair.frontHair.style = `${modelInfo.FrontHair}`;
        advance.hair.backHair.style = `${modelInfo.BehindHair}`;
        advance.headFeatures.head.style = `${modelInfo.Head}`;
        advance.clothing.upperCloth.style = `${modelInfo.UpperCloth}`;
        advance.clothing.lowerCloth.style = `${modelInfo.LowerCloth}`;
        advance.clothing.shoes.style = `${modelInfo.Shoes}`;
        advance.clothing.gloves.style = `${modelInfo.Gloves}`;
        if (PlayerManagerExtesion.isCharacter(model)) {
            await model.asyncReady();
            await model.syncDescription();
        }
    }

    /**激励广告是否激活 */
    public static isRewardActive(): boolean {
        return true;//TODO-WFZ
    }


    /**map=>数组 */
    public static fromMapToArr(map: Map<string, boolean>): { key: string[], value: boolean[] } {
        let keys: string[] = [];
        let values: boolean[] = [];
        map.forEach((value: boolean, key: string) => {
            keys.push(key);
            values.push(value);
        });
        return { key: keys, value: values }
    }

    /**数组=>map */
    public static fromArrToMap(keys: string[], values: boolean[]): Map<string, boolean> {
        let retMap: Map<string, boolean> = new Map<string, boolean>();
        retMap.clear();
        if (!keys || !values) return retMap;
        for (let i = 0; i < keys.length; ++i) {
            retMap.set(keys[i], values[i]);
        }
        return retMap;
    }

    /**资源下载并加载 */
    public static async asyncDownloadAsset(InAssetId: string): Promise<void> {
        if (!mw.AssetUtil.assetLoaded(InAssetId)) {
            await AssetUtil.asyncDownloadAsset(InAssetId);
        }
    }

    /**得到今天日期 */
    public static getDay(): string {
        let day: string = "";
        day += new Date().getFullYear();
        day += (new Date().getMonth() + 1);
        day += new Date().getDate();
        return day;
    }

    public static async applySharedId(character: mw.Character, sharedId: string): Promise<boolean> {
        return new Promise(async (resolve: (isSuccess: boolean) => void) => {
            mw.AccountService.applySharedId(character, sharedId, async (success: boolean) => {
                console.error(`success:${success}`);
                if (success) character.syncDescription();
                await character.asyncReady();
                return resolve(success);
            });
        });
    }

    public static async createSharedId(character: mw.Character): Promise<string> {
        return new Promise(async (resolve: (isSuccess: string) => void) => {
            mw.AccountService.createSharedId(character, (dataString: string) => {
                console.error(`dataString:${dataString}`);
                return resolve(dataString);
            });
        });
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