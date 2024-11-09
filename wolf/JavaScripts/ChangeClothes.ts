import { Notice } from "./CommonUI/notice/Notice";
import { Globals } from "./Globals";
import AdsPanel from "./Module/AdsModule/ui/AdsPanel";
import { GameConfig } from "./Tables/GameConfig";

@Component
export default class ChangeClothes extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            let trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add((char: mw.Character) => {
                if (char.gameObjectId != Player.localPlayer.character.gameObjectId) return;
                let npc = trigger.parent as mw.Character;
                if (!Globals.isOpenIAA) {
                    char.setDescription(npc.getDescription());
                    char.asyncReady().then(() => {
                        char.syncDescription();
                    });
                    Notice.showDownNotice(GameConfig.Language.Text_Ads_3.Value);
                } else {
                    mw.UIService.getUI(AdsPanel).showRewardAd(() => {
                        char.setDescription(npc.getDescription());
                        char.asyncReady().then(() => {
                            char.syncDescription();
                        });
                        Notice.showDownNotice(GameConfig.Language.Text_Ads_3.Value);
                    }, GameConfig.Language.Text_Ads_4.Value, GameConfig.Language.Text_Content_20022.Value, GameConfig.Language.Text_Ads_5.Value);
                }

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