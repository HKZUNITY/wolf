import { Notice } from "./CommonUI/notice/Notice";
import { Globals } from "./Globals";
import AdsPanel from "./Module/AdsModule/ui/AdsPanel";
import { GameConfig } from "./Tables/GameConfig";
import { Tools } from "./Tools";

@Component
export default class ChangeClothes extends Script {
    @mw.Property({ displayName: "ShareId", group: "脚本设置" })
    private shareId: string = "";
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            let trigger = this.gameObject as mw.Trigger;
            let npc = trigger.parent as mw.Character;
            if (this.shareId && this.shareId != "") {
                if (this.shareId != "1027CKLX") return;
                Tools.applySharedId(npc, this.shareId).then(async () => {
                    await npc.asyncReady()
                    const v2 = npc.description.advance
                    console.error(npc.description.advance.base.characterSetting.somatotype);
                    console.error(v2.hair.frontHair.style);
                    console.error(v2.hair.backHair.style);
                    console.error(v2.clothing.upperCloth.style);
                    console.error(v2.clothing.lowerCloth.style);
                    console.error(v2.clothing.gloves.style);
                    console.error(v2.clothing.shoes.style);

                    for (let i = 0; i < v2.slotAndDecoration.slot.length; ++i) {
                        const slot = v2.slotAndDecoration.slot[i];
                        if (slot.decoration && slot.decoration.length > 0) {
                            console.error(slot.decoration[0].attachmentAssetId);
                            console.error(slot.decoration[0].attachmentOffset);
                        }
                    }
                });
            }
            trigger.onEnter.add((char: mw.Character) => {
                if (char.gameObjectId != Player.localPlayer.character.gameObjectId) return;
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

export class SuitData {
    somatotype: number
    behindHair: string
    frontHair: string
    upperCloth: string
    lowerCloth: string
    gloves: string
    shoe: string
    pendantAssets: string[]
    /**套装guid */
    pendantOffset: Transform[]
}