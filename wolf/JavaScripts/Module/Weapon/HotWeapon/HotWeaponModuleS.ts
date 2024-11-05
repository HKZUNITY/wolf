import { AiModuleS } from "../../../AI/AiModule";
import { AiObject } from "../../../AI/AiObject";
import { AiOrPlayer, Camp, GameGlobals, GamingState, KillType, PlayerGameState } from "../../../Globals";
import { GameConfig } from "../../../Tables/GameConfig";
import { IWeaponElement } from "../../../Tables/Weapon";
import { BagModuleData } from "../../BagModule/BagData";
import { BagModuleS } from "../../BagModule/BagModuleS";
import { GameModuleData } from "../../GameModule/GameData";
import { GameModuleS } from "../../GameModule/GameModuleS";
import { Projectile } from "./Bullet";
import { HotWeaponModuleC } from "./HotWeaponModuleC";
import SoundManager = mw.SoundService;
export class HotWeaponModuleS extends ModuleS<HotWeaponModuleC, null> {
    onStart(): void {
    }
    beAttackByBullet(config: IWeaponElement, attIsReal: AiOrPlayer, vicIsReal: AiOrPlayer, attacker?: mw.Player,
        victim?: mw.Player, attAi?: AiObject, vicAi?: AiObject) {
        if (attacker == victim) return;
        let victimCamp;
        let state;
        if (vicIsReal == AiOrPlayer.RealPlayer) {
            victimCamp = DataCenterS.getData(victim, GameModuleData).getPlayerCamp();
            state = DataCenterS.getData(victim, GameModuleData).getState();
        } else {
            victimCamp = vicAi.camp;
            state = vicAi.aiGameState;
        }

        if (GameGlobals.curGameState != GamingState.GamingState || state == PlayerGameState.Back || state == PlayerGameState.Die || state == PlayerGameState.Leave) {
            return;
        }
        if (victimCamp == Camp.Civilian) {
            if (state == PlayerGameState.Protect) {
                if (vicIsReal == AiOrPlayer.RealPlayer) {
                    ModuleService.getModule(GameModuleS).playerStateChange(victim, PlayerGameState.Normal, null);
                    return;
                }
                else {
                    ModuleService.getModule(AiModuleS).aiStateChange(vicAi, PlayerGameState.Normal, null);
                }

            }
            else {
                if (attIsReal == AiOrPlayer.RealPlayer) {
                    ModuleService.getModule(GameModuleS).serverChangeHp(config.ID, AiOrPlayer.RealPlayer, Camp.Police, KillType.Suicide, attacker);
                } else {
                    ModuleService.getModule(GameModuleS).serverChangeHp(config.ID, AiOrPlayer.AiPlayer, Camp.Police, KillType.Suicide, null, attAi);
                }
            }
        }
        else {
            if (vicIsReal == AiOrPlayer.RealPlayer) {
                ModuleService.getModule(GameModuleS).serverChangeHp(config.ID, AiOrPlayer.RealPlayer, Camp.Police, KillType.Shoot, victim);
            } else {
                ModuleService.getModule(GameModuleS).serverChangeHp(config.ID, AiOrPlayer.AiPlayer, Camp.Police, KillType.Shoot, null, vicAi);
            }

        }

    }


    async fire(player: mw.Player, startPos: Vector, dir: Vector) {

        let weaponId = ModuleService.getModule(BagModuleS).getHotWeaponId(player.playerId);
        let config = GameConfig.Weapon.getElement(weaponId);

        DataCenterS.getData(player, GameModuleData).addAttackNum(1);
        let weaponGuid = DataCenterS.getData(player, BagModuleData).getCurHotWeapon();
        let bulletObj = new Projectile();
        await bulletObj.weaponChange(weaponGuid, player, AiOrPlayer.RealPlayer);
        bulletObj.fire(player, startPos, dir);
        if (config) {
            // 换单音效
            let sound = GameConfig.Sound.getElement(10021);
            let playParam = { radius: sound.InnerRadius, falloffDistance: sound.FalloffDistance }
            mw.SoundService.play3DSound(sound.Guid, player.character.worldTransform.position.clone(), sound.Count, sound.Rate, playParam);
        }

    }

    /**击中目标时候播放弹道特效 */
    // public playBallisticEffect(startPos: Vector, endPos: Vector){
    //     this.getAllClient().net_createBulletEffect(startPos, endPos);
    // }

    /**自动瞄准射击 */
    net_autoShoot(startPos: Vector, endPos: Vector) {
        let dirtor = endPos.clone().subtract(startPos);
        let vec = dirtor.normalized;
        this.fire(this.currentPlayer, startPos, vec);
        ModuleService.getModule(BagModuleS).hotWeaponReload(this.currentPlayer);
    }
    /**设置英雄的客户端武器冷却事件 */
}