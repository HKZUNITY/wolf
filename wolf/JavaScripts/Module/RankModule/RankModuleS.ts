import { Globals } from "../../Globals";
import { Tools } from "../../Tools";
import Utils from "../../Utils";
import { PlayerModuleData } from "../PlayerModule/PlayerData";
import { RankData, WorldData, RoomData, TryOnConfigData } from "./RankData";
import RankModuleC from "./RankModuleC";

export default class RankModuleS extends ModuleS<RankModuleC, RankData> {
    private worldDatas: WorldData[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initData();
    }

    private isInitWorldDatas: boolean = false;
    private async initData(): Promise<void> {
        this.worldDatas = (await Tools.getCustomdata("WorldData")) as WorldData[];
        this.isInitWorldDatas = true;
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.syncTryOnConfigData(player);
    }

    private isContinueInitTryOnData: boolean = true;
    private async syncTryOnConfigData(player: mw.Player): Promise<void> {
        if (this.isContinueInitTryOnData) {
            this.isContinueInitTryOnData = false;
            await this.initTryOnConfigData();
            TimeUtil.delaySecond(5).then(() => { this.isContinueInitTryOnData = true; });
        }
        this.getClient(player).net_syncTryOnConfigData(this.tryOnConfigData);
    }

    private tryOnConfigData: TryOnConfigData = null;
    private async initTryOnConfigData(): Promise<void> {
        let data = await Tools.getCustomdata("TryOnConfigData");
        this.tryOnConfigData = new TryOnConfigData(data);
    }

    // private time: number = 60;
    // private timer: number = 0;
    // protected onUpdate(dt: number): void {
    //     this.timer += dt;
    //     if (this.timer >= this.time) {
    //         this.timer = 0;
    //         this.refreshTime();
    //     }
    // }

    protected onPlayerLeft(player: mw.Player): void {
        let userId = player.userId;
        if (this.roomDataMap.has(userId)) this.roomDataMap.delete(userId);
        if (this.syncPlayerMap.has(player)) this.syncPlayerMap.delete(player);
        this.synchrodata_Room();
    }

    private syncPlayerMap: Map<mw.Player, boolean> = new Map<mw.Player, boolean>();
    @Decorator.noReply()
    public net_updateSyncPlayer(isSync: boolean): void {
        let player = this.currentPlayer;
        if (!this.syncPlayerMap.has(player)) return;
        this.syncPlayerMap.set(player, isSync);
        if (isSync) this.synchrodata_aRoomWorld(player);
    }

    private roomDataMap: Map<string, RoomData> = new Map<string, RoomData>();
    @Decorator.noReply()
    public net_onEnterScene(playerName: string, score: number, time: number, tryOn: number): void {
        let player = this.currentPlayer;
        this.syncPlayerMap.set(player, false);
        player.character.displayName = playerName;
        this.onEnterScene(player.userId, playerName, score, time, tryOn);
    }

    private async onEnterScene(userId: string, playerName: string, score: number, time: number, tryOn: number): Promise<void> {
        let roomData = new RoomData(userId, playerName, score, time, tryOn);
        this.roomDataMap.set(userId, roomData);
        let worldData: WorldData = new WorldData(userId, playerName, score);
        try {
            this.worldDatas = (await Tools.getCustomdata("WorldData")) as WorldData[];
            this.isRefreshWorldData([worldData]);
            this.synchrodata_World();
        } catch (error) {
        }
    }

    public async updateLv(): Promise<void> {
        if (!this.syncPlayerMap || this.syncPlayerMap?.size == 0) return;
        let tmpWorldDatas: WorldData[] = [];
        this.syncPlayerMap?.forEach((value: boolean, key: mw.Player) => {
            let score = DataCenterS.getData(key, PlayerModuleData).level;
            let userId = key.userId;
            if (!this.roomDataMap.has(userId)) return;
            let roomData = this.roomDataMap.get(userId);
            roomData.score = score;

            let worldData: WorldData = new WorldData(userId, roomData.playerName, roomData.score);
            tmpWorldDatas.push(worldData);
        });
        try {
            this.worldDatas = (await Tools.getCustomdata("WorldData")) as WorldData[];
            if (this.isRefreshWorldData(tmpWorldDatas)) this.synchrodata_World();
        } catch (error) {
        }
    }

    public net_refreshScore(score: number): void {
        this.refreshScore(this.currentPlayer.userId, score);
    }

    public refreshScore(userId: string, score: number): void {
        if (!this.roomDataMap.has(userId)) return;
        let roomData = this.roomDataMap.get(userId);
        roomData.score = score;

        let worldData: WorldData = new WorldData(userId, roomData.playerName, roomData.score);
        try {
            if (this.isRefreshWorldData([worldData])) this.synchrodata_World();
        } catch (error) {
        }
    }

    public async refreshTime(): Promise<void> {
        if (!this.syncPlayerMap || this.syncPlayerMap?.size == 0) return;
        let tmpWorldDatas: WorldData[] = [];
        this.syncPlayerMap?.forEach((value: boolean, key: mw.Player) => {
            DataCenterS.getData(key, RankData)?.setTime(1);
            let userId = key.userId;
            if (!this.roomDataMap.has(userId)) return;
            let roomData = this.roomDataMap.get(userId);
            roomData.time += 1;

            let worldData: WorldData = new WorldData(userId, roomData.playerName, roomData.time);
            tmpWorldDatas.push(worldData);
        });
        try {
            this.worldDatas = (await Tools.getCustomdata("WorldData")) as WorldData[];
            this.isRefreshWorldData(tmpWorldDatas);
        } catch (error) {
        }
        this.synchrodata_World();
    }

    public net_refreshTryOn(tryOn: number): void {
        this.refreshTryOn(this.currentPlayer.userId, tryOn);
    }

    public refreshTryOn(userId: string, tryOn: number): void {
        if (!this.roomDataMap.has(userId)) return;
        let roomData = this.roomDataMap.get(userId);
        roomData.tryOn = tryOn;
        this.synchrodata_Room_TryOn();
    }

    private isRefreshWorldData(tmpWorldDatas: WorldData[]): boolean {
        if (!this.isInitWorldDatas) return false;
        if (!tmpWorldDatas || tmpWorldDatas?.length == 0) return false;
        if (!this.worldDatas || this.worldDatas?.length == 0) this.worldDatas = [];
        let isNeedSave = false;
        for (let k = 0; k < tmpWorldDatas.length; ++k) {
            let isPush = false;
            let ishasDelete = false;
            let ishasData = false;
            let worldData = tmpWorldDatas[k];
            if (this.worldDatas.length < Globals.worldCount) {
                if (this.worldDatas.length == 0) {
                    this.worldDatas.push(worldData);
                    isPush = true;
                    isNeedSave = true;
                } else {
                    for (let i = 0; i < this.worldDatas.length; ++i) {
                        if (this.worldDatas[i].userId != worldData.userId) continue;
                        if (worldData.time > this.worldDatas[i].time) {
                            this.worldDatas.splice(i, 1);
                            break;
                        } else {
                            ishasData = true;
                            break;
                        }
                    }

                    if (ishasData) continue;

                    for (let i = 0; i < this.worldDatas.length; i++) {
                        if (worldData.time > this.worldDatas[i].time) {
                            this.worldDatas.splice(i, 0, worldData);
                            isPush = true;
                            isNeedSave = true;
                            break;
                        }
                    }

                    if (!isPush) {
                        this.worldDatas.push(worldData);
                        isPush = true;
                        isNeedSave = true;
                    }
                }
            } else {
                for (let i = 0; i < this.worldDatas.length; ++i) {
                    if (this.worldDatas[i].userId != worldData.userId) continue;
                    if (worldData.time > this.worldDatas[i].time) {
                        this.worldDatas.splice(i, 1);
                        ishasDelete = true;
                        break;
                    } else {
                        ishasData = true;
                        break;
                    }
                }

                if (ishasData) continue;

                for (let i = 0; i < this.worldDatas.length; i++) {
                    if (worldData.time > this.worldDatas[i].time) {
                        this.worldDatas.splice(i, 0, worldData);
                        if (!ishasDelete) {
                            this.worldDatas.pop();
                        }
                        isPush = true;
                        isNeedSave = true;
                        break;
                    }
                }
            }
        }
        if (isNeedSave) {
            Tools.setCustomData("WorldData", this.worldDatas);
        }
        return isNeedSave;
    }

    private roomUserIds: string[] = [];
    private roomNames: string[] = [];
    private roomScores: number[] = [];
    private roomTimes: number[] = [];
    private roomTryOn: number[] = [];
    private updateRoomData(): void {
        if (!this.roomDataMap || this.roomDataMap?.size == 0) return;
        this.roomUserIds.length = 0;
        this.roomNames.length = 0;
        this.roomScores.length = 0;
        this.roomTimes.length = 0;
        this.roomTryOn.length = 0;
        this.roomDataMap?.forEach((value: RoomData, key: string) => {
            this.roomUserIds.push(value.userId);
            this.roomNames.push(value.playerName);
            this.roomScores.push(value.score);
            this.roomTimes.push(value.time);
            this.roomTryOn.push(value.tryOn);
        });
    }

    private worldUserIds: string[] = [];
    private worldNames: string[] = [];
    private worldTimes: number[] = [];
    private updateWorldData(): void {
        if (!this.worldDatas || this.worldDatas?.length == 0) return;
        this.worldUserIds.length = 0;
        this.worldNames.length = 0;
        this.worldTimes.length = 0;
        for (let i = 0; i < this.worldDatas.length; i++) {
            this.worldUserIds.push(this.worldDatas[i].userId);
            this.worldNames.push(this.worldDatas[i].playerName);
            this.worldTimes.push(this.worldDatas[i].time);
        }
    }

    private synchrodata_onEnterScene(sendUserId: string): void {
        this.updateRoomData();
        this.updateWorldData();
        this.syncPlayerMap.forEach((value: boolean, key: mw.Player) => {
            // if (!value) return;
            if (sendUserId == key.userId) {
                this.getClient(key).net_syncRoomWorldRankData(this.roomUserIds, this.roomNames, this.roomScores, this.roomTimes, this.roomTryOn,
                    this.worldUserIds, this.worldNames, this.worldTimes);
            } else {
                this.getClient(key).net_syncRoomRankData(this.roomUserIds, this.roomNames, this.roomScores, this.roomTimes, this.roomTryOn);
            }
        });
    }

    private synchrodata_Room(): void {
        this.updateRoomData();
        this.syncPlayerMap.forEach((value: boolean, key: mw.Player) => {
            // if (!value) return;
            this.getClient(key).net_syncRoomRankData(this.roomUserIds, this.roomNames, this.roomScores, this.roomTimes, this.roomTryOn);
        });
    }

    private synchrodata_Room_TryOn(): void {
        this.updateRoomData();
        this.syncPlayerMap.forEach((value: boolean, key: mw.Player) => {
            // if (!value) return;
            this.getClient(key).net_syncRoomRankData_TryOn(this.roomUserIds, this.roomNames, this.roomScores, this.roomTimes, this.roomTryOn);
        });
    }

    private synchrodata_World(): void {
        this.updateWorldData();
        this.syncPlayerMap.forEach((value: boolean, key: mw.Player) => {
            // if (!value) return;
            this.getClient(key).net_syncWorldRankData(this.worldUserIds, this.worldNames, this.worldTimes);
        });
    }

    private synchrodata_RoomWorld(): void {
        this.updateRoomData();
        this.updateWorldData();
        this.syncPlayerMap.forEach((value: boolean, key: mw.Player) => {
            // if (!value) return;
            this.getClient(key).net_syncRoomWorldRankData(this.roomUserIds, this.roomNames, this.roomScores, this.roomTimes, this.roomTryOn,
                this.worldUserIds, this.worldNames, this.worldTimes);
        });
    }

    private synchrodata_aRoomWorld(player: mw.Player): void {
        this.getClient(player).net_syncRoomWorldRankData(this.roomUserIds, this.roomNames, this.roomScores, this.roomTimes, this.roomTryOn,
            this.worldUserIds, this.worldNames, this.worldTimes);
    }

    public getNamesByUserId(userId1: string, userId2: string): string[] {
        if (this.roomDataMap.has(userId1) && this.roomDataMap.has(userId2)) {
            return [this.roomDataMap.get(userId1).playerName, this.roomDataMap.get(userId2).playerName];
        }
        return null;
    }

    public getNameByUserId(userId: string): string {
        if (this.roomDataMap.has(userId)) {
            return this.roomDataMap.get(userId).playerName;
        }
        return null;
    }

    private redFirstModel: mw.Model = null;
    private blueFirstModel: mw.Model = null;

    @Decorator.noReply()
    public net_setFirstModel(isRed: boolean): void {
        let character = this.currentPlayer.character;
        this.setFirstModel(character, isRed);
    }

    private async setFirstModel(character: mw.Character, isRed: boolean): Promise<void> {
        if (isRed) {
            if (!this.redFirstModel) this.redFirstModel = await GameObjPool.asyncSpawn("C825D655443D938EB73591BEEB5CCC81", mwext.GameObjPoolSourceType.Prefab);
            character.attachToSlot(this.redFirstModel, mw.HumanoidSlotType.BackOrnamental);
            this.redFirstModel.localTransform.position = new mw.Vector(15, 0, 0);
            this.redFirstModel.localTransform.rotation = new mw.Rotation(0, 0, -90);
        } else {
            if (!this.blueFirstModel) this.blueFirstModel = await GameObjPool.asyncSpawn("0B59ECA6477D8CA6237016BF613FB019", mwext.GameObjPoolSourceType.Prefab);
            character.attachToSlot(this.blueFirstModel, mw.HumanoidSlotType.BackOrnamental);
            this.blueFirstModel.localTransform.position = new mw.Vector(15, 0, 0);
            this.blueFirstModel.localTransform.rotation = new mw.Rotation(0, 0, -90);
        }
    }
}