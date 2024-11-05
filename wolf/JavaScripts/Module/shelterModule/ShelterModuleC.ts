import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { AutoAimModuleC } from "../Weapon/Aim/AutoAimModuleC";
import ShelterModuleS from "./ShelterModuleS";
export default class ShelterModuleC extends ModuleC<ShelterModuleS, null> {
    private enterPlayerMap: Map<string, boolean> = new Map<string, boolean>();
    private isActive: boolean = false;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initShelterTrigger();
    }

    public setActive(active: boolean) {
        this.isActive = active;
        this.enterPlayerMap.clear();
    }

    public async initShelterTrigger() {
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
                            this.enterPlayerMap.set(other.gameObjectId, true);
                        }
                    })
                    shelter.onLeave.add((other: mw.GameObject) => {
                        if (PlayerManagerExtesion.isCharacter(other) && this.isActive) {
                            if (this.enterPlayerMap.has(other.gameObjectId)) {
                                this.enterPlayerMap.delete(other.gameObjectId);
                            }
                        }
                    })
                }
            })
        })
    }

    public getEnterPlayerMap() {
        return this.enterPlayerMap;
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