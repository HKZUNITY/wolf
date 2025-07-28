import { MapEx } from "../../MapEx";

export class CharacterData extends Subdata {
    @Decorator.persistence()
    public characterDataMap: MapEx.MapExClass<string> = {};

    public setCharacterData(key: string, value: string): boolean {
        MapEx.set(this.characterDataMap, key, value);
        this.save(false);
        return true;
    }

    public delCharacterData(key: string): boolean {
        if (MapEx.has(this.characterDataMap, key)) {
            MapEx.del(this.characterDataMap, key);
            this.save(false);
            return true;
        }
        return false;
    }

    public clearCharacterData(): boolean {
        this.characterDataMap = {};
        this.save(false);
        return true;
    }
}