import { AiObject } from "../../AI/AiObject";
import { AiOrPlayer } from "../../Globals";

export abstract class BaseBullet {
    abstract weaponChange(weaponId: number, player: mw.Player, isReal: AiOrPlayer, ai?: AiObject);
    abstract fire(player: mw.Player, pos: mw.Vector, rot: mw.Vector, skillId: number);
}