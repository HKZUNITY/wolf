import AdsPanel from "./Module/AdsModule/ui/AdsPanel";
import ExecutorManager from "./WaitingQueue";

@Component
export default class Test extends Script {
    private isTest: boolean = false;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            TimeUtil.delaySecond(10).then(() => {
                (this.gameObject as mw.Trigger).onEnter.add((character: mw.Character) => {
                    if (character != Player.localPlayer.character) return;
                    if (mw.SystemUtil.isPIE) {
                        ExecutorManager.instance.pushAsyncExecutor(async () => {
                            await TimeUtil.delaySecond(1);
                            Player.localPlayer.character.setDescription((this.gameObject.parent as mw.Character).getDescription());
                            await Player.localPlayer.character.asyncReady();
                            Player.localPlayer.character.syncDescription();
                            await TimeUtil.delaySecond(1);
                        });
                        return;
                    }
                    if (this.isTest) {
                        ExecutorManager.instance.pushAsyncExecutor(async () => {
                            Player.localPlayer.character.setDescription((this.gameObject.parent as mw.Character).getDescription());
                            await Player.localPlayer.character.asyncReady();
                            Player.localPlayer.character.syncDescription();
                            await TimeUtil.delaySecond(1);
                        });
                    } else {
                        UIService.getUI(AdsPanel).showRewardAd(() => {
                            this.isTest = true;
                            ExecutorManager.instance.pushAsyncExecutor(async () => {
                                Player.localPlayer.character.setDescription((this.gameObject.parent as mw.Character).getDescription());
                                await Player.localPlayer.character.asyncReady();
                                Player.localPlayer.character.syncDescription();
                                await TimeUtil.delaySecond(1);
                            });
                        }, `看广告使用这个${this.gameObject.parent.name}山海经角色`, `不看`, `看广告`);
                    }
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