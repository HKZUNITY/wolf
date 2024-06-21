/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-17 19:01:04
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-17 19:01:25
 * @FilePath     : \murdermystery3\JavaScripts\Module\SkillModule\BaseBullet.ts
 * @Description  : 修改描述
 */

import { AiObject } from "../../AI/AiObject";
import { AiOrPlayer } from "../../Globals";

export abstract class BaseBullet{
    abstract weaponChange(weaponId: number, player: mw.Player, isReal: AiOrPlayer, ai?: AiObject);
    abstract fire(player: mw.Player, pos: mw.Vector, rot: mw.Vector, skillId: number);
}