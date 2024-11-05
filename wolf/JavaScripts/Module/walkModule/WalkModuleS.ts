import { WalkModuleC } from "./WalkModuleC";

export class WalkModuleS extends ModuleS<WalkModuleC, null> {
    private playerIdMap: Map<string, walkInfo> = new Map<string, walkInfo>();

    public net_playerEnter() {
        let keyArray = new Array<string>();
        let valueArray = new Array<walkInfo>();
        if (this.playerIdMap.size > 0) {
            this.playerIdMap.forEach((value, index) => {
                keyArray.push(index);
                valueArray.push(value);
            })
            this.getClient(this.currentPlayer).net_initWalk(keyArray, valueArray);
        }
        this.creatWalk(this.currentPlayer.character.gameObjectId, false);
    }

    //AI模型guid和身上的武器guid
    async creatWalk(charGuid: string, isAI: boolean, objGuid?: string) {
        let walkObj = new walkInfo(isAI, objGuid);
        this.playerIdMap.set(charGuid, walkObj);
        this.getAllClient().net_creatWalk(charGuid, isAI, objGuid);
    }

    gameEnd(guid: string) {
        this.destroy(guid);
    }

    onPlayerLeft(player: mw.Player): void {
        this.destroy(player.character.gameObjectId);
    }

    destroy(guid: string): void {
        if (this.playerIdMap.has(guid)) {
            this.playerIdMap.delete(guid);
            this.getAllClient().net_destroy(guid);
        }
    }

}

export class walkInfo {
    public isAi: boolean;
    public objGuid: string;
    constructor(isAi: boolean, objGuid: string) {
        this.isAi = isAi;
        this.objGuid = objGuid;
    }
}