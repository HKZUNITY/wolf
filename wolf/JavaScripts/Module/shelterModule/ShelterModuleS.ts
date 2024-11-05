import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import ShelterModuleC from "./ShelterModuleC";

export default class ShelterModuleS extends ModuleS<ShelterModuleC, null> {
    private shelterMap: Map<string, boolean> = new Map<string, boolean>();
    private isActive: boolean = false;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initShelterTrigger();
    }

    public setActive(active: boolean) {
        this.isActive = active;
        this.shelterMap.clear();
    }

    private async initShelterTrigger() {
        let parent = await GameObject.asyncFindGameObjectById("39CE2491");
        if (parent == null) {
            console.error("初始化遮蔽物失败");
            return;
        }
        parent.getChildren().forEach((map) => {
            map.getChildren().forEach((shelter) => {
                if (shelter instanceof mw.Trigger) {
                    shelter.onEnter.add((other: mw.GameObject) => {
                        if (PlayerManagerExtesion.isCharacter(other) && this.isActive) {
                            this.shelterMap.set(other.gameObjectId, true);
                        }
                    })
                    shelter.onLeave.add((other: mw.GameObject) => {
                        if (PlayerManagerExtesion.isCharacter(other) && this.isActive) {
                            if (this.shelterMap.has(other.gameObjectId)) {
                                this.shelterMap.delete(other.gameObjectId);
                            }
                        }
                    })
                }
            })
        })
    }
    /**判断受击方能否收到伤害，参数是guid，玩家的就填写character的 */
    public canHitPlayer(attack: string, hited: string) {
        let res = false;
        if (this.shelterMap.has(attack) && this.shelterMap.has(hited)) {
            res = true;
        }
        else if (!this.shelterMap.has(attack) && !this.shelterMap.has(hited)) {
            res = true;
        }
        return res;
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}