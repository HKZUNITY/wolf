import { AiModuleC, AiModuleS } from "./AI/AiModule";
import { update } from "./CommonUI/notice/Tween";
import NoticePanel from "./CommonUI/NoticePanel";
import { Globals } from "./Globals";
import { ArkData, ArkModuleC, ArkModuleS } from "./Module/ArkModule/ArkModule";
import { BagModuleData } from "./Module/BagModule/BagData";
import { BagModuleC } from "./Module/BagModule/BagModuleC";
import { BagModuleS } from "./Module/BagModule/BagModuleS";
import DanMuModuleC from "./Module/DanMuModule/DanMuModuleC";
import DanMuModuleS from "./Module/DanMuModule/DanMuModuleS";
import { DoorModuleC } from "./Module/door/DoorModuleC";
import { DoorModuleS } from "./Module/door/DoorModuleS";
import ExchangeModuleC from "./Module/ExchangeModule/ExchangeModuleC";
import ExchangeModuleS from "./Module/ExchangeModule/ExchangeModuleS";
import FSMModuleC from "./Module/FSMModule/FSMModuleC";
import FSMModuleS from "./Module/FSMModule/FSMModuleS";
import { GameModuleData } from "./Module/GameModule/GameData";
import { GameModuleC } from "./Module/GameModule/GameModuleC";
import { GameModuleS } from "./Module/GameModule/GameModuleS";
import { MapModuleC, MapModuleS } from "./Module/GameModule/MapModule";
import LoadMapModuleC from "./Module/loadMapModule/LoadMapModuleC";
import LoadMapModuleS from "./Module/loadMapModule/LoadMapModuleS";
import { LotteryModuleC } from "./Module/LotteryModule/LotteryModuleC";
import { LotteryModuleS } from "./Module/LotteryModule/LotteryModuleS";
import { PlayerModuleData } from "./Module/PlayerModule/PlayerData";
import { PlayerModuleC } from "./Module/PlayerModule/PlayerModuleC";
import { PlayerModuleS } from "./Module/PlayerModule/PlayerModuleS";
import { CalculateModuleC, CalculateModuleS } from "./Module/ProcModule/CalculateModule";
import { ChooseModuleC, ChooseModuleS } from "./Module/ProcModule/ChooseModule";
import { SceneModuleC, SceneModuleS } from "./Module/ProcModule/SceneModule";
import { WatchModuleC, WatchModuleS } from "./Module/ProcModule/WatchModule";
import ShelterModuleC from "./Module/shelterModule/ShelterModuleC";
import ShelterModuleS from "./Module/shelterModule/ShelterModuleS";
import ShopModuleC from "./Module/ShopModule/ShopModuleC";
import ShopModuleData from "./Module/ShopModule/ShopModuleData";
import ShopModuleS from "./Module/ShopModule/ShopModuleS";
import { SkillData } from "./Module/SkillModule/SkillData";
import { SkillModuleC } from "./Module/SkillModule/SkillModuleC";
import { SkillModuleS } from "./Module/SkillModule/SkillModuleS";
import { TrampolineModuleC, TrampolineModuleS } from "./Module/TrampolineModule/TrampolineModule";
import { WalkModuleC } from "./Module/walkModule/WalkModuleC";
import { WalkModuleS } from "./Module/walkModule/WalkModuleS";
import { AutoAimModuleC } from "./Module/Weapon/Aim/AutoAimModuleC";
import { AutoAimModuleS } from "./Module/Weapon/Aim/AutoAimModuleS";
import { ColdWeaponModuleC } from "./Module/Weapon/ColdWeapon/ColdWeaponModuleC";
import { ColdWeaponModuleS } from "./Module/Weapon/ColdWeapon/ColdWeaponModuleS";
import { HotWeaponModuleC } from "./Module/Weapon/HotWeapon/HotWeaponModuleC";
import { HotWeaponModuleS } from "./Module/Weapon/HotWeapon/HotWeaponModuleS";
import { GameConfig } from "./Tables/GameConfig";
import { Tools } from "./Tools";

@Component
export default class GameStart extends mw.Script {
    @mw.Property({ displayName: "是否显示射线", group: "脚本设置" })
    private isLineTrace = false;
    @mw.Property({ displayName: "是否显示公告", group: "脚本设置" })
    private isShowNotice = false;
    @mw.Property({ displayName: "多语言", group: "脚本设置", enumType: { "系统默认": -1, "英语": 0, "简体中文": 1, "繁体中文": 2, "日语": 3, "韩语": 4 } })
    private languageId: number = -1;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.onStartCS();
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        } else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        this.onUpdateCS(dt);
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        } else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }

    private onStartCS(): void {
        this.useUpdate = true;
        this.downloadAsset();
        this.onRegisterModule();
    }

    private downloadAsset(): void {
        AssetUtil.asyncDownloadAsset("145932");
        GameConfig.Assets.getAllElement().forEach((value) => {
            if (value.Guid) Tools.asyncDownloadAsset(value.Guid);
        });
    }

    private onRegisterModule(): void {
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerModuleData);
        ModuleService.registerModule(GameModuleS, GameModuleC, GameModuleData);
        ModuleService.registerModule(FSMModuleS, FSMModuleC, null);
        ModuleService.registerModule(SceneModuleS, SceneModuleC, null);
        ModuleService.registerModule(ChooseModuleS, ChooseModuleC, null);
        ModuleService.registerModule(CalculateModuleS, CalculateModuleC, null);
        ModuleService.registerModule(BagModuleS, BagModuleC, BagModuleData);
        ModuleService.registerModule(ColdWeaponModuleS, ColdWeaponModuleC, null);
        ModuleService.registerModule(HotWeaponModuleS, HotWeaponModuleC, null);
        ModuleService.registerModule(WatchModuleS, WatchModuleC, null);
        ModuleService.registerModule(AiModuleS, AiModuleC, null);
        ModuleService.registerModule(ShopModuleS, ShopModuleC, ShopModuleData);
        ModuleService.registerModule(MapModuleS, MapModuleC, null);
        ModuleService.registerModule(AutoAimModuleS, AutoAimModuleC, null);
        ModuleService.registerModule(WalkModuleS, WalkModuleC, null);
        ModuleService.registerModule(DoorModuleS, DoorModuleC, null);
        ModuleService.registerModule(LotteryModuleS, LotteryModuleC, null);
        ModuleService.registerModule(DanMuModuleS, DanMuModuleC, null);
        ModuleService.registerModule(ShelterModuleS, ShelterModuleC, null)
        ModuleService.registerModule(LoadMapModuleS, LoadMapModuleC, null)
        ModuleService.registerModule(SkillModuleS, SkillModuleC, SkillData);
        ModuleService.registerModule(ExchangeModuleS, ExchangeModuleC, null);
        ModuleService.registerModule(TrampolineModuleS, TrampolineModuleC, null);
        ModuleService.registerModule(ArkModuleS, ArkModuleC, ArkData);
    }

    private onUpdateCS(dt: number): void {
        mw.TweenUtil.TWEEN.update();
    }

    /**--------------------------------【客户端】-------------------------------- */
    private noticePanel: NoticePanel = null;
    private get getNoticePanel(): NoticePanel {
        if (!this.noticePanel) {
            this.noticePanel = mw.UIService.getUI(NoticePanel);
        }
        return this.noticePanel
    }

    /**客户端的onStart */
    private onStartC(): void {
        this.initLanguage();
        this.initData();
    }

    private initLanguage(): void {
        let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
        console.error(`wfz - language:${language}`);

        let languageId: number = -1;
        if (mw.SystemUtil.isPIE && this.languageId >= 0) {
            languageId = this.languageId;
        } else {
            if (!!language.match("en")) {
                languageId = 0;
            } else if (!!language.match("zh")) {//简体
                languageId = 1;
            } else if (!!language.match("ja")) {
                languageId = 3;
            } else if (!!language.match("ko")) {
                languageId = 4;
            } else {//繁体
                languageId = 2;
            }
        }
        Globals.languageId = languageId;
        console.error(`wfz - languageId:${languageId}`);

        GameConfig.initLanguage(languageId, (key) => {
            let ele = GameConfig.Language.getElement(key);
            if (ele == null) return "unknow_" + key;
            return ele.Value;
        });
        mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
            let key: string = ui.text;
            if (!key) return;
            let languageElement = GameConfig.Language.getElement(key);
            if (languageElement) ui.text = languageElement.Value;
        });
    }

    private initData(): void {
        Globals.isShowLineTrace = this.isLineTrace;
        if (this.isShowNotice) this.getNoticePanel.show();
    }

    /**客户端的onUpdate */
    private onUpdateC(dt: number): void {
        update();
    }
    /**--------------------------------【客户端】-------------------------------- */

    /**--------------------------------【服务端】-------------------------------- */
    /**服务端的onStart */
    private onStartS(): void {
        DataStorage.setTemporaryStorage(mw.SystemUtil.isPIE);
    }

    /**服务端的onUpdate */
    private onUpdateS(dt: number): void {

    }
    /**--------------------------------【服务端】-------------------------------- */
}