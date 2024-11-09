import { Tools } from "../../Tools";
import { GameModuleC } from "../GameModule/GameModuleC";
import GameBattlePanel from "../GameModule/ui/GameBattlePanel";
import { BagModuleData } from "./BagData";
import { BagModuleS } from "./BagModuleS";

export class BagModuleC extends ModuleC<BagModuleS, BagModuleData> {
    private gameBattlePanel: GameBattlePanel = null;
    private get getGameBattlePanel(): GameBattlePanel {
        if (!this.gameBattlePanel) {
            this.gameBattlePanel = UIService.getUI(GameBattlePanel);
        }
        return this.gameBattlePanel;
    }
    private frame: number = 0;
    private refreshCd: number = null;
    private control: boolean = false;
    private hotWeapon: mw.GameObject;
    onStart(): void {

    }
    onEnterScene(sceneType: number): void {

    }
    onUpdate(dt: number): void {
        if (this.control) {
            this.frame += dt;
            if (this.frame > this.refreshCd) {
                this.frame = 0;
                this.getGameBattlePanel.autoCold(true);
            }
        }
    }

    net_contorlCold(bo: boolean, time: number = 0.2): void {
        this.refreshCd = time;
        this.frame = this.refreshCd;
        this.control = bo;
    };

    net_hideAutoModule() {
        ModuleService.getModule(GameModuleC).clearAutoAnim(false);
    }

    showPlayerColdWeapon() {
        this.server.net_showPlayerColdWeapon()
    }
    /**获取热武器id */
    getHotWeaponId() {
        return this.data.getCurHotWeapon()
    }
    /**获取冷兵器id */
    getColdWeaponId() {
        return this.data.getCurColdWeapon()
    }
    async net_setHotWeaponObj(guid: string) {
        this.hotWeapon = await GameObject.asyncFindGameObjectById(guid);
    }

    getFirePos() {
        if (this.hotWeapon) {
            return Tools.getFirePos(this.hotWeapon);
        }
        return this.localPlayer.character.worldTransform.position.clone();
    }
}