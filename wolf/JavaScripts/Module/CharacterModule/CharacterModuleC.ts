import { AvatarApi } from "../../AvatarApi";
import { Notice } from "../../CommonUI/notice/Notice";
import { Globals } from "../../Globals";
import { MapEx } from "../../MapEx";
import { GameConfig } from "../../Tables/GameConfig";
import ExecutorManager from "../../WaitingQueue";
import { CharacterData } from "./CharacterData";
import { CharacterModuleS } from "./CharacterModuleS";

export class CharacterModuleC extends ModuleC<CharacterModuleS, CharacterData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
    }

    protected onEnterScene(sceneType: number): void {
        this.initCharacterData();
    }

    public getCharacterDataKey(): string {
        let retKey: string = null;
        if (!this.characterDataMap || MapEx.count(this.characterDataMap) == 0) return retKey;
        let characterDataStr: string = JSON.stringify(AvatarApi.getAllData(this.localPlayer.character));
        MapEx.forEach(this.characterDataMap, (key: string, element: string) => {
            if (characterDataStr == element) {
                retKey = key;
            }
        });
        return retKey;
    }

    private characterDataMap: MapEx.MapExClass<string> = {};
    public get getCharacterData(): MapEx.MapExClass<string> {
        return this.characterDataMap;
    }

    private get getCharacterDataIndex(): number {
        for (let i = 1; i <= Globals.savaMaxCount; ++i) {
            if (!MapEx.has(this.characterDataMap, i)) return i;
        }
    }

    public async useCharacterData(key: string, setCharacterDataSucceed: (isAdd: boolean) => void): Promise<void> {
        if (key == `0`) {
            let nextKey: string = `1`;
            if (this.characterDataMap && MapEx.count(this.characterDataMap) > 0) {
                let currentCharacterDataSize = Number(MapEx.count(this.characterDataMap));
                if (currentCharacterDataSize >= Globals.savaMaxCount) {
                    Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_MaxSaveCount.Value, Globals.savaMaxCount));
                    return;
                }
                nextKey = (this.getCharacterDataIndex).toString();
            }
            await this.localPlayer.character.asyncReady();
            let characterDataStr: string = JSON.stringify(AvatarApi.getAllData(this.localPlayer.character));
            await this.setCharacterData(nextKey, characterDataStr);
            Notice.showDownNotice(GameConfig.Language.Text_SaveSuccefully.Value);
            if (setCharacterDataSucceed) setCharacterDataSucceed(true);
        } else {
            if (!this.characterDataMap || MapEx.count(this.characterDataMap) == 0) return;
            if (!MapEx.has(this.characterDataMap, key)) return;
            let characterData = MapEx.get(this.characterDataMap, key);
            let descriptionApiData: AvatarApi.DescriptionApiData = JSON.parse(characterData);
            this.localPlayer.character.detachAllFromSlot({ isDestroy: true });
            await this.localPlayer.character.asyncReady();
            let isSuccess = await AvatarApi.setDescriptionByApiData2(this.localPlayer.character, descriptionApiData);
            await this.localPlayer.character.asyncReady();
            if (isSuccess) {
                if (setCharacterDataSucceed) setCharacterDataSucceed(false);
            }
        }
    }

    public async deleteCharacterData(key: string, delCharacterDataSucceed: () => void): Promise<void> {
        if (key == `0`) return;
        await this.delCharacterData(key);
        Notice.showDownNotice(GameConfig.Language.Text_DeleteSucceed.Value);
        if (delCharacterDataSucceed) delCharacterDataSucceed();
    }

    public get getCharacterDataKeys(): string[] {
        let keys: string[] = [];
        if (!this.characterDataMap || MapEx.count(this.characterDataMap) == 0) return keys;
        MapEx.forEach(this.characterDataMap, (key: string, element: string) => {
            keys.push(key);
        });
        return keys;
    }

    public getCharacterDataUpAssetIdByKey(key: string): string {
        if (!this.characterDataMap || MapEx.count(this.characterDataMap) == 0) return null;
        if (!MapEx.has(this.characterDataMap, key)) return null;
        let characterData = MapEx.get(this.characterDataMap, key);
        let descriptionApiData: AvatarApi.DescriptionApiData = JSON.parse(characterData);
        let indexOf = descriptionApiData.apiValue.indexOf(86);
        if (indexOf != -1) {
            return descriptionApiData.apiValue[indexOf + 1] as string;
        }
        return null;
    }

    private initCharacterData(): void {
        this.characterDataMap = this.data.characterDataMap;
    }

    public async setCharacterData(key: string, value: string): Promise<void> {
        MapEx.set(this.characterDataMap, key, value);
        await this.server.net_setCharacterData(key, value);
    }

    public async delCharacterData(key: string): Promise<void> {
        if (MapEx.has(this.characterDataMap, key)) {
            MapEx.del(this.characterDataMap, key);
            await this.server.net_delCharacterData(key);
        }
    }

    public clearCharacterData(): void {
        ExecutorManager.instance.pushAsyncExecutor(async () => {
            this.characterDataMap = {};
            await this.server.net_clearCharacterData();
        });
    }
}
