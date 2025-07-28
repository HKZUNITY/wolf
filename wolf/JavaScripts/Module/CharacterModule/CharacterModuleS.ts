import { CharacterData } from "./CharacterData";
import { CharacterModuleC } from "./CharacterModuleC";

export class CharacterModuleS extends ModuleS<CharacterModuleC, CharacterData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    public net_setCharacterData(key: string, value: string): boolean {
        return this.currentData.setCharacterData(key, value);
    }

    public net_delCharacterData(key: string): boolean {
        return this.currentData.delCharacterData(key);
    }

    public net_clearCharacterData(): boolean {
        return this.currentData.clearCharacterData();
    }
}
