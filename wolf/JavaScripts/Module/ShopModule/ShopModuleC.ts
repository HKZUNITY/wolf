import { Notice } from "../../CommonUI/notice/Notice";
import { GameConfig } from "../../Tables/GameConfig";
import ChatPanel from "../DanMuModule/ui/ChatPanel";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import HUDPanel from "../PlayerModule/ui/HUDPanel";
import ShopModuleData, { ItemState } from "./ShopModuleData";
import ShopModuleS from "./ShopModuleS";
import ShopPanel from "./ui/ShopPanel";

export default class ShopModuleC extends ModuleC<ShopModuleS, ShopModuleData> {
    private shopPanel: ShopPanel = null;
    private get getShopPanel(): ShopPanel {
        if (!this.shopPanel) {
            this.shopPanel = UIService.getUI(ShopPanel);
            this.data.initShopData();
            this.shopPanel.init();
        }
        return this.shopPanel;
    }

    private playerModuleC: PlayerModuleC = null;
    private get getPlayerModuleC(): PlayerModuleC {
        if (!this.playerModuleC) {
            this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        }
        return this.playerModuleC;
    }

    private hudPanel: HUDPanel = null;
    private get getHUDPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }

    private chatPanel: ChatPanel = null;
    private get getChatPanel(): ChatPanel {
        if (!this.chatPanel) {
            this.chatPanel = UIService.getUI(ChatPanel);
        }
        return this.chatPanel;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
    }

    protected onEnterScene(sceneType: number): void {
        this.initShopCamera();
    }

    public onSwitchCameraAction: Action1<number> = new Action1<number>();
    private async initShopCamera(): Promise<void> {
        let myCamera = Camera.currentCamera;
        let shopCamera: mw.Camera = await GameObject.asyncSpawn<mw.Camera>(`Camera`);
        shopCamera.parent = Player.localPlayer.character;
        shopCamera.localTransform.position = new mw.Vector(200, -10, 30);
        shopCamera.localTransform.rotation = new mw.Rotation(0, -5, 200);
        this.onSwitchCameraAction.add((cameraType: number) => {
            if (cameraType == 0) {
                Camera.switch(myCamera);
            } else {
                Camera.switch(shopCamera, 0.5, mw.CameraSwitchBlendFunction.Linear);
            }
        });
    }

    private openShop(isOpen: boolean): void {
        if (isOpen) {
            this.onSwitchCameraAction.call(1);
        } else {
            this.onSwitchCameraAction.call(0);
        }
    }

    /**获取拥有的物品列表 */
    public getHaveArray(): number[] {
        if (this.shopPanel == null) this.getShopPanel;
        let res: number[] = [];
        this.data.items.forEach(shopList => {
            if (!shopList) return;
            shopList.state.forEach((value, index) => {
                if (value == ItemState.Own) {
                    res.push(shopList.listId[index]);
                }
            });
        });
        return res;
    }

    public ShopOpen(isOpen: boolean, showItem: boolean = false): void {
        this.changeCoin(this.getPlayerModuleC.getPlayerGold());
        this.changeDiamond(this.getPlayerModuleC.getPlayerDiamond());
        this.changeAdvToken(this.getPlayerModuleC.getPlayerAdvToken());

        if (isOpen) {
            this.getShopPanel.show();
            if (showItem == false) {
                this.getShopPanel.tabGroup.select(0);
                this.getShopPanel.showGoods(0);
                this.getShopPanel.showDefaltDetail();
            }
            this.getHUDPanel.showShop();//其他UI隐藏
            this.getChatPanel.hide();
            this.openShop(true);//摄像机
        } else {
            this.getShopPanel.hide();
            this.previewCloth(null, false);
            this.getHUDPanel.hideShop();
            this.getChatPanel.show();
            this.openShop(false);//摄像机
        }
    }

    public selectTargetItem(itemId: number) {
        this.ShopOpen(true, true);
        this.getShopPanel.showItemShop(itemId);
    }

    public getShopRemainTime(itemId: number) {
        return this.data.getShopRemainTime(itemId);
    }

    public changeCoin(num: number) {
        if (this.getShopPanel == null) {
            return;
        }
        this.getShopPanel.changeCoin(num);
    }
    public changeDiamond(num: number) {
        if (this.getShopPanel == null) {
            return;
        }
        this.getShopPanel.changeDiamond(num);
    }
    public changeAdvToken(num: number) {
        if (this.getShopPanel == null) {
            return;
        }
        this.getShopPanel.changeAdvToken(num);
    }
    public useItem(id: number, isUse: boolean) {
        this.server.net_UseItem(id, isUse);
    }
    public async buyItem(id: number) {
        let res = await this.server.net_BuyItem(id);
        if (res == false) {
            Notice.showDownNotice(GameConfig.Tips.getElement("10012").Content);
        }
    }

    public getItem(id: number) {
        this.server.net_GetItem(id)
    }
    public previewCloth(id: number, isPreview: boolean) {
        this.server.net_previewCloth(id, isPreview);
    }
    public net_RefreshUI(id: number) {
        if (this.getShopPanel)
            this.getShopPanel.updateCurPage();

    }
}