/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-07-17 19:01:04
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-17 19:01:25
 * @FilePath     : \murdermystery3\JavaScripts\Module\SkillModule\BaseBullet.ts
 * @Description  : 修改描述
 */

export abstract class ActiveSkillBase{
    abstract active(playerId: number, skillId: number);
    abstract unActive(playerId: number, skillId: number);
    abstract killOtherUpdate(playerId: number, skillId: number);
}