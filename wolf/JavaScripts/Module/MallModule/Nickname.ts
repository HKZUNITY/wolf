import Nickname_Generate from "../../ui-generate/module/MallModule/Nickname_generate";
import Utils from "../../Utils";
import OnClickWishPanel from "../WishModule/ui/OnClickWishPanel";
import { WishDataV0 } from "../WishModule/WishData";
import WishTools from "../WishModule/WishTools";

@Component
export default class Nickname extends Script {
    @mw.Property({ replicated: true, onChanged: "onWishDataV0Change" })
    public wishDataV0: WishDataV0 = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (!SystemUtil.isClient()) return;
        this.initNickname();
    }

    private character: mw.Character = null;
    private nickname: Nickname_Generate = null;
    private nicknameWidget: mw.UIWidget = null;
    private isInit: boolean = false;
    private async initNickname(): Promise<void> {
        this.nickname = mw.UIService.create(Nickname_Generate);
        this.nicknameWidget = await GameObject.asyncSpawn<mw.UIWidget>(`UIWidget`, { replicates: false });
        this.nicknameWidget.setTargetUIWidget(this.nickname.uiWidgetBase);
        this.nicknameWidget.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        this.character = this.gameObject as mw.Character;
        this.nicknameWidget.parent = this.character.overheadUI;
        this.nicknameWidget.localTransform.position = Vector.down.multiply(10);
        this.isInit = true;

        this.onWishDataV0Change();
    }

    private onClickWishPanel: OnClickWishPanel = null;
    private onWishDataV0Change(): void {
        if (this.wishDataV0 && this.wishDataV0.userId && this.wishDataV0.itemId) {
            Utils.setWidgetVisibility(this.nickname.mWishBgImage, mw.SlateVisibility.SelfHitTestInvisible);
            let icon = this.wishDataV0.iconGuid;
            if (WishTools.pendantItemTypes.includes(this.wishDataV0.itemType)) {
                this.nickname.mWishIconImage.imageInfo.setByAssetIcon(this.wishDataV0.prefabGuid, mw.AssetIconSize.Icon_128px);
            } else {
                this.nickname.mWishIconImage.imageGuid = icon;
            }

            if (!this.onClickWishPanel) {
                if (this.character.gameObjectId == Player.localPlayer.character.gameObjectId) return;
                this.onClickWishPanel = UIService.create(OnClickWishPanel);
                this.onClickWishPanel.updateWishDataV0(this.wishDataV0);
                this.onClickWishPanel.show();
            }
            if (this.onClickWishPanel) {
                this.onClickWishPanel.updateWishDataV0(this.wishDataV0);
                this.onClickWishPanel.show();
                this.useUpdate = true;
            }
        } else {
            Utils.setWidgetVisibility(this.nickname.mWishBgImage, mw.SlateVisibility.Collapsed);
            if (this.onClickWishPanel) this.onClickWishPanel.hide();
            this.useUpdate = false;
        }
    }

    protected onUpdate(dt: number): void {
        if (!mw.SystemUtil.isClient()) return;

        this.onUpdateC(dt);
    }

    private onUpdateC(dt: number): void {
        if (!this.onClickWishPanel || !this.character) return;
        let dis = Vector.distance(this.character.worldTransform.position, Player.localPlayer.character.worldTransform.position);
        if (dis > 1000) {
            this.onClickWishPanel.hide();
            return;
        }

        if (!this.onClickWishPanel.visible) this.onClickWishPanel.show();
        let pos: mw.Vector2 = mw.InputUtil.projectWorldPositionToWidgetPosition(this.character.worldTransform.position.add(new mw.Vector(0, 0, 0)), false).screenPosition;
        this.onClickWishPanel.rootCanvas.position = pos.subtract(this.onClickWishPanel.rootCanvas.size.multiply(0.5));
    }
}