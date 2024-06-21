import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { Door } from "./Door";
import { GameConfig } from "../../Tables/GameConfig";
import { DoorModuleC } from "./DoorModuleC";
import { AutoDoor } from "./AutoDoor";
import { GameModuleData } from "../GameModule/GameData";
import { GameGlobals, GamingState, PlayerGameState } from "../../Globals";
import { Tools } from "../../Tools";

export class DoorModuleS extends ModuleS<DoorModuleC, null> {
    private doorManage: Array<Door> = new Array<Door>();
    private autoDoorManage: Array<AutoDoor> = new Array<AutoDoor>();


    onStart(): void {
        let index: number = 0;
        GameConfig.Door.getAllElement().forEach(data => {
            if (data.leftDoorGuid && data.rightDoorGuid) {
                let door = new Door(data.id, index);
                this.doorManage.push(door);
                index++
            } else {
                let autoDoor = new AutoDoor(data.id);
                this.autoDoorManage.push(autoDoor);
            }
        })
    }

    initGame() {
        this.doorManage.forEach(door => {
            door.reset();
        })
        this.autoDoorManage.forEach(autoDoor => {
            autoDoor.reset();
        })
    }

    onPlayerLeft(player: mw.Player): void {
        this.doorManage.forEach(door => {
            door.playerLeave(player.playerId);
        })
        this.autoDoorManage.forEach(autoDoor => {
            autoDoor.playerLeave(player.playerId);
        })
    }

    getCharState(char: mw.Character) {
        let state: PlayerGameState = PlayerGameState.Leave;
        if (PlayerManagerExtesion.isCharacter(char)) {
            let playId = char.player.playerId;
            state = DataCenterS.getData(playId, GameModuleData).getState();
        } else if (PlayerManagerExtesion.isNpc(char)) {
            let ai = Tools.getAiObj(char);
            if (ai) {
                state = ai.aiGameState;
            }
        }

        if (state == PlayerGameState.Ready || state == PlayerGameState.Normal || state == PlayerGameState.Protect) {
            return true;
        } else {
            return false;
        }
    }


    toShowUI(playerId: number, index: number) {
        this.getClient(playerId).net_showPassUI(index);
    }

    toHideUI(playerId: number) {
        let bool: boolean = true
        if (GameGlobals.curGameState == GamingState.CalculateState) {
            bool = false;
        }
        if (Player.getAllPlayers().includes(Player.getPlayer(playerId))) {
            let state = DataCenterS.getData(playerId, GameModuleData).getState();
            if (state == PlayerGameState.Die || state == PlayerGameState.Back) {
                bool = false;
            }
            this.getClient(playerId).net_hidePassUI(bool);
        }
    }

    toShowBtnUI(playerId: number, index: number) {
        this.getClient(playerId).net_showActionUI(index);
    }

    toHideBtnUI(playerId: number) {
        if (Player.getAllPlayers().includes(Player.getPlayer(playerId))) {
            this.getClient(playerId).net_hideActionUI();
        }
    }

    onUpdate(dt: number): void {
        if (this.doorManage.length > 0) {
            this.doorManage.forEach(door => {
                door.update();
            });
        }
        if (this.autoDoorManage.length > 0) {
            this.autoDoorManage.forEach(autoDoor => {
                autoDoor.update(dt);
            });
        }
    }


    net_Open(index: number) {
        this.doorManage[index].openAnimation();
    }

    net_delect(index: number) {
        this.doorManage[index].delect(this.currentPlayerId);
    }

    net_closeDoor(index: number) {
        this.doorManage[index].endAnimation();
    }


}
