
@Component
export default class ReturnImage extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            let description: mw.CharacterDescription = null;
            Player.localPlayer.character.asyncReady().then(() => {
                description = Player.localPlayer.character.getDescription();
                (this.gameObject.parent as mw.Character).setDescription(description);
            });
            let trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add((char: mw.Character) => {
                if (char.gameObjectId != Player.localPlayer.character.gameObjectId) return;
                let npc = trigger.parent as mw.Character;
                char.setDescription(npc.getDescription());
                char.asyncReady().then(() => {
                    char.syncDescription();
                });
            });
        }
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