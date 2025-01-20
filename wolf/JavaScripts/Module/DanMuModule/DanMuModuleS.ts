import { IActionConfigElement } from "../../Tables/ActionConfig";
import { IExpressionElement } from "../../Tables/Expression";
import { GameConfig } from "../../Tables/GameConfig";
import { Tools } from "../../Tools";
import { ActionData, ChatData } from "./DanMuData";
import DanMuModuleC from "./DanMuModuleC";

const WorldChatDatas: string = "WorldChatDatas";
const WorldExpressionDatas: string = "WorldExpressionDatas";
const WorldActionDatas: string = "WorldActionDatas";
export default class DanMuModuleS extends ModuleS<DanMuModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // this.setChat_Test();
        // this.setExpression_Test();
        // this.setAction_Test();
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.initChatDatas(player);
        // this.initExpressionDatas(player);
        // this.initActionDatas(player);
    }

    private initChatDatas(player: mw.Player): void {
        this.getCustomdata(WorldChatDatas).then((chatDatas: ChatData[]) => {
            if (!chatDatas || chatDatas.length == 0) return;
            this.getClient(player).net_initChatDatas(chatDatas);
        });
    }

    private initExpressionDatas(player: mw.Player): void {
        this.getCustomdata(WorldExpressionDatas).then((expressionAssets: string[]) => {
            if (!expressionAssets || expressionAssets.length == 0) return;
            this.getClient(player).net_initExpressionDatas(expressionAssets);
        });
    }

    private initActionDatas(player: mw.Player): void {
        this.getCustomdata(WorldActionDatas).then((actionDatas: ActionData[]) => {
            if (!actionDatas || actionDatas.length == 0) return;
            this.getClient(player).net_initActionDatas(actionDatas);
        });
    }

    private setChat_Test(): void {
        let chatDatas: ChatData[] = [];
        for (let i = 1; i <= 10; ++i) {
            let ch = GameConfig.Chat.getElement(i);
            let chats: string[] = ch.Chats;
            let chatChilds: string[][] = ch.ChatChilds;
            chatDatas.push({ chats: chats, chatChilds: chatChilds });
        }
        this.setCustomData(WorldChatDatas, chatDatas);
    }

    private setExpression_Test(): void {
        let expressionAssets: string[] = [];
        GameConfig.Expression.getAllElement().forEach((value: IExpressionElement) => {
            expressionAssets.push(value.AssetId);
        });
        this.setCustomData(WorldExpressionDatas, expressionAssets);
    }

    private setAction_Test(): void {
        let actionDatas: ActionData[] = [];
        GameConfig.ActionConfig.getAllElement().forEach((value: IActionConfigElement) => {
            actionDatas.push({
                tab: value.Tab,
                icon: value.Icon,
                assetId: value.ActionId,
                names: value.Names,
                loop: value.Loop,
                pos: value.Pos,
                rot: new mw.Rotation(value.Rot),
                type: value.Type
            });
        });
        this.setCustomData(WorldActionDatas, actionDatas);
    }

    @Decorator.noReply()
    public net_sendDanMu(msg: string, isActive: boolean): void {
        this.getAllClient().net_sendDanMu(this.currentPlayer.userId, msg, isActive);
    }

    @Decorator.noReply()
    public async getCustomdata(key: string): Promise<any> {
        return (await DataStorage.asyncGetData(key)).data;
    }

    @Decorator.noReply()
    public async setCustomData(saveKey: string, dataInfo: any): Promise<boolean> {
        let code: mw.DataStorageResultCode = null;
        code = await DataStorage.asyncSetData(saveKey, dataInfo);
        return code == mw.DataStorageResultCode.Success;
    }

    private maxShowDistance: number = 2000;
    public net_showBubbleText(gameObjectId: string, text: string): void {
        let currentPlayer = this.currentPlayer;
        if (this.maxShowDistance == -1) {
            Player.getAllPlayers().forEach((player: mw.Player) => {
                this.getClient(player).net_showBubbleText(gameObjectId, text);
            });
        } else {
            const players = Player.getAllPlayers();
            for (const player of players) {
                if (player === currentPlayer) {
                    this.getClient(player).net_showBubbleText(gameObjectId, text);
                } else {
                    const len = Vector.distance(player.character.worldTransform.position, currentPlayer.character.worldTransform.position);
                    if (len <= this.maxShowDistance) {
                        this.getClient(player).net_showBubbleText(gameObjectId, text);
                    }
                }
            }
        }
    }

    public net_playExpression(assetId: string): void {
        this.getAllClient().net_playExpression(this.currentPlayerId, assetId);
    }

    private playerInteractMap: Map<number, PlayerInteract> = new Map<number, PlayerInteract>();
    public async net_EnterInteract(actionData: ActionData): Promise<boolean> {
        let player = this.currentPlayer;
        return await this.enterInteract(player, actionData);
    }

    public async enterInteract(player: mw.Player, actionData: ActionData): Promise<boolean> {
        let playerId = player.playerId;
        if (!this.playerInteractMap.has(playerId)) {
            this.playerInteractMap.set(playerId, new PlayerInteract());
        }
        let playerInteract = this.playerInteractMap.get(playerId);
        await playerInteract.clearInteractor(player);
        if (actionData.type == 0) {
            return await playerInteract.playSingleAni(player, actionData);
        } else if (actionData.type == 1) {
            return await playerInteract.interact(player, actionData);
        } else if (actionData.type == 2) {
            return await playerInteract.playDoubleAni(player, actionData);
        }
    }

    public async net_LeaveInteract(): Promise<boolean> {
        let player = this.currentPlayer;
        return await this.leaveInteract(player);
    }

    public async leaveInteract(player: mw.Player): Promise<boolean> {
        let playerId = player.playerId;
        if (!this.playerInteractMap.has(playerId)) return true;
        let playerInteract = this.playerInteractMap.get(playerId);
        return await playerInteract.clearInteractor(player);
    }

    private playerBagMap: Map<number, PlayerBag> = new Map<number, PlayerBag>();
    public async net_useBag(bagId: number): Promise<boolean> {
        let player = this.currentPlayer;
        if (!this.playerBagMap.has(player.playerId)) {
            this.playerBagMap.set(player.playerId, new PlayerBag());
        }
        let playerBag = this.playerBagMap.get(player.playerId);
        return await playerBag.equip(player, bagId);
    }

    public async net_unloadBag(bagId: number): Promise<boolean> {
        let player = this.currentPlayer;
        if (!this.playerBagMap.has(player.playerId)) return true;
        let playerBag = this.playerBagMap.get(player.playerId);
        return await playerBag.unEquip(player, bagId);
    }
}

export class PlayerBag {
    public async equip(player: mw.Player, bagId: number): Promise<boolean> {
        let actionPropElement = GameConfig.ActionProp.getElement(bagId);
        if (actionPropElement.AssetId && actionPropElement.AssetId.length > 0) {
            this.recycleMode();
            await this.spawnMode(player, actionPropElement.AssetId, actionPropElement.SlotType, actionPropElement.ModeOffsetParameter);
        } else {
            this.updateMode(player, actionPropElement.SlotType, actionPropElement.ModeOffsetParameter);
        }

        if (actionPropElement.AnimationId && actionPropElement.AnimationId.length > 0) {
            await this.playAnimation(player, actionPropElement.AnimationId, actionPropElement.AnimationSlot, actionPropElement.AnimationParameter);
        } else {
            this.stopAnimation();
        }

        if (actionPropElement.EffectId && actionPropElement.EffectId.length > 0) {
            this.stopEffect();
            await this.playEffect(actionPropElement.EffectId, actionPropElement.EffectLoop, actionPropElement.EffectOffsetParameter);
        } else {
            this.stopEffect();
        }

        if (actionPropElement.SoundId && actionPropElement.SoundId.length > 0) {
            this.stop3DSound();
            await this.play3DSound(actionPropElement.SoundId, actionPropElement.SoundParameter);
        } else {
            this.stop3DSound();
        }
        await TimeUtil.delaySecond(0.1);
        return true;
    }

    public async unEquip(player: mw.Player, bagId: number): Promise<boolean> {
        this.stopEffect();
        this.stop3DSound();
        this.stopAnimation();
        this.recycleMode();
        await TimeUtil.delaySecond(0.1);
        return true;
    }

    public mode: mw.GameObject = null;
    public async spawnMode(player: mw.Player, assetId: string, slotType: mw.HumanoidSlotType, parameter: number[]): Promise<void> {
        this.mode = await GameObjPool.asyncSpawn(assetId);
        await this.mode.asyncReady();
        this.mode.setCollision(mw.PropertyStatus.Off, true);
        player.character.attachToSlot(this.mode, slotType);
        this.mode.localTransform.position = new Vector(parameter[0], parameter[1], parameter[2]);
        this.mode.localTransform.rotation = new Rotation(parameter[3], parameter[4], parameter[5]);
        this.mode.localTransform.scale = new Vector(parameter[6], parameter[7], parameter[8]);
    }

    public recycleMode(): void {
        if (!this.mode) return;
        GameObjPool.despawn(this.mode);
        this.mode = null;
    }

    public updateMode(player: mw.Player, slotType: mw.HumanoidSlotType, parameter: number[]): void {
        if (!this.mode) return;
        player.character.attachToSlot(this.mode, slotType);
        this.mode.localTransform.position = new Vector(parameter[0], parameter[1], parameter[2]);
        this.mode.localTransform.rotation = new Rotation(parameter[3], parameter[4], parameter[5]);
        this.mode.localTransform.scale = new Vector(parameter[6], parameter[7], parameter[8]);
    }

    public animation: mw.Animation = null;
    public async playAnimation(player: mw.Player, assetId: string, slotType: number, parameter: number[]): Promise<void> {
        await Tools.asyncDownloadAsset(assetId);
        this.animation = player.character.loadAnimation(assetId);
        this.animation.slot = slotType;
        this.animation.speed = parameter[0];
        this.animation.loop = parameter[1];
        this.animation.play();
    }

    public stopAnimation(): void {
        if (!this.animation) return;
        this.animation?.stop();
        this.animation = null;
    }

    public effectId: number = null;
    public async playEffect(assetId: string, loop: number, parameter: number[]): Promise<void> {
        await Tools.asyncDownloadAsset(assetId);
        this.effectId = EffectService.playOnGameObject(assetId,
            this.mode,
            {
                loopCount: loop,
                position: new mw.Vector(parameter[0], parameter[1], parameter[2]),
                rotation: new mw.Rotation(parameter[3], parameter[4], parameter[5]),
                scale: new mw.Vector(parameter[6], parameter[7], parameter[8])
            });
    }

    public stopEffect(): void {
        if (!this.effectId) return;
        EffectService.stop(this.effectId);
        this.effectId = null;
    }

    public soundId: number = null;
    public async play3DSound(assetId: string, parameter: number[]): Promise<void> {
        await Tools.asyncDownloadAsset(assetId);
        this.soundId = SoundService.play3DSound(assetId, this.mode, parameter[2], parameter[1], { radius: parameter[0], falloffDistance: parameter[0] * 1.2 });
    }

    public stop3DSound(): void {
        if (!this.soundId) return;
        SoundService.stop3DSound(this.soundId);
        this.soundId = null;
    }
}

export class PlayerInteract {
    public interactObj: mw.Interactor = null;
    public npc: mw.Character = null;
    public npcSubStance: mw.SubStance = null;
    private async initNpc(): Promise<void> {
        if (this.npc) return;
        this.npc = await mw.GameObject.asyncSpawn("Character") as mw.Character;
        this.npc.worldTransform.scale = mw.Vector.one.multiply(0.8);
        this.npc.collisionWithOtherCharacterEnabled = false;
        await this.npc.asyncReady();
    }

    public singleAni: mw.Animation = null;
    public async playSingleAni(player: mw.Player, actionData: ActionData): Promise<boolean> {
        await Tools.asyncDownloadAsset(actionData.assetId);
        this.singleAni = player.character.loadAnimation(actionData.assetId);
        this.singleAni.loop = actionData.loop == 0 ? 1 : 0;
        let isPlaySuccess = this.singleAni.play();
        console.error(`isPlaySuccess:${isPlaySuccess}`);
        return isPlaySuccess;
    }

    public playerSubStance: mw.SubStance = null;
    public async playDoubleAni(player: mw.Player, actionData: ActionData): Promise<boolean> {
        await this.initNpc();
        this.npc.setVisibility(true);
        player.character.collisionWithOtherCharacterEnabled = false;
        player.character.movementEnabled = false;
        this.npc.worldTransform.position = player.character.worldTransform.position.add(actionData.pos);
        let tmpRot = mw.Rotation.zero;
        mw.Rotation.add(player.character.worldTransform.rotation, actionData.rot, tmpRot);
        this.npc.worldTransform.rotation = tmpRot;
        let aniStr = actionData.assetId.split('-');
        await Tools.asyncDownloadAsset(aniStr[0]);
        await Tools.asyncDownloadAsset(aniStr[1]);
        this.playerSubStance = player.character.loadSubStance(aniStr[0]);
        this.playerSubStance.play();
        this.npcSubStance = this.npc.loadSubStance(aniStr[1]);
        this.npcSubStance.play();
        return true;
    }

    public async interact(player: mw.Player, actionData: ActionData): Promise<boolean> {
        return new Promise<boolean>(async (resolve: (value: boolean) => void) => {
            await this.initNpc();
            this.npc.setVisibility(true);
            player.character.collisionWithOtherCharacterEnabled = false;
            this.interactObj = await mw.GameObject.asyncSpawn("Interactor") as mw.Interactor;
            await this.interactObj.asyncReady();
            player.character.attachToSlot(this.interactObj, mw.HumanoidSlotType.FaceOrnamental);
            this.interactObj.onEnter.add(async () => {
                let aniStr = actionData.assetId.split('-');
                await Tools.asyncDownloadAsset(aniStr[0]);
                await Tools.asyncDownloadAsset(aniStr[1]);
                this.playerSubStance = player.character.loadSubStance(aniStr[0]);
                this.playerSubStance.play();
                this.npcSubStance = this.npc.loadSubStance(aniStr[1]);
                this.npcSubStance.play();

                this.interactObj.localTransform.position = actionData.pos;
                this.interactObj.localTransform.rotation = actionData.rot;
                return resolve(true);
            });
            this.interactObj.enter(this.npc, mw.HumanoidSlotType.Buttocks);
        });
    }

    public async clearInteractor(player: mw.Player): Promise<boolean> {
        if (this.singleAni) {
            this.singleAni?.stop();
            this.singleAni = null;
        }
        if (this.playerSubStance) {
            this.playerSubStance.stop();
            this.playerSubStance = null;
        }
        if (this.npcSubStance) {
            this.npcSubStance.stop();
            this.npcSubStance = null;
        }
        return await this.leaveInteract(player);
    }

    private async leaveInteract(player: mw.Player): Promise<boolean> {
        return new Promise<boolean>((resolve: (value: boolean) => void) => {
            if (!this.interactObj) return resolve(true);
            this.interactObj.onLeave.add(async () => {
                this.interactObj.parent = null;
                this.interactObj.destroy();
                this.interactObj = null;
                this.npc.parent = null;
                this.npc.setVisibility(false);
                if (!player.character.collisionWithOtherCharacterEnabled) player.character.collisionWithOtherCharacterEnabled = true;
                await TimeUtil.delaySecond(1);
                return resolve(true);
            });
            this.interactObj.leave();
        });
    }
}