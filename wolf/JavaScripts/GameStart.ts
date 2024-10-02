import { AiModuleC, AiModuleS } from "./AI/AiModule";
import { BagModuleData } from "./Module/BagModule/BagData";
import { BagModuleC } from "./Module/BagModule/BagModuleC";
import { BagModuleS } from "./Module/BagModule/BagModuleS";
import { FSMModuleC, FSMModuleS } from "./Module/FSMModule";
import { GameModuleData } from "./Module/GameModule/GameData";
import { GameModuleC } from "./Module/GameModule/GameModuleC";
import { GameModuleS } from "./Module/GameModule/GameModuleS";
import { PlayerModuleData } from "./Module/PlayerModule/PlayerData";
import { PlayerModuleC } from "./Module/PlayerModule/PlayerModuleC";
import { PlayerModuleS } from "./Module/PlayerModule/PlayerModuleS";
import { CalculateModuleC, CalculateModuleS } from "./Module/ProcModule/CalculateModule";
import { ChooseModuleC, ChooseModuleS } from "./Module/ProcModule/ChooseModule";
import { SceneModuleC, SceneModuleS } from "./Module/ProcModule/SceneModule";
import { WatchModuleC, WatchModuleS } from "./Module/ProcModule/WatchModule";
import { ColdWeaponModuleC } from "./Module/Weapon/ColdWeapon/ColdWeaponModuleC";
import { ColdWeaponModuleS } from "./Module/Weapon/ColdWeapon/ColdWeaponModuleS";
import { HotWeaponModuleC } from "./Module/Weapon/HotWeapon/HotWeaponModuleC";
import { HotWeaponModuleS } from "./Module/Weapon/HotWeapon/HotWeaponModuleS";
import { GameConfig } from "./Tables/GameConfig";

import { Globals } from "./Globals";
import { BubbleModuleC, BubbleModuleS } from "./Module/bubbleModule/BubbleModule";
import { DoorModuleC } from "./Module/door/DoorModuleC";
import { DoorModuleS } from "./Module/door/DoorModuleS";
import ExchangeModuleC from "./Module/ExchangeModule/ExchangeModuleC";
import ExchangeModuleS from "./Module/ExchangeModule/ExchangeModuleS";
import { MapModuleC, MapModuleS } from "./Module/GameModule/MapModule";
import LoadMapModuleC from "./Module/loadMapModule/LoadMapModuleC";
import LoadMapModuleS from "./Module/loadMapModule/LoadMapModuleS";
import { LotteryModuleC } from "./Module/LotteryModule/LotteryModuleC";
import { LotteryModuleS } from "./Module/LotteryModule/LotteryModuleS";
import ShelterModuleC from "./Module/shelterModule/ShelterModuleC";
import ShelterModuleS from "./Module/shelterModule/ShelterModuleS";
import { ShopModuleC, ShopModuleS } from "./Module/ShopModule/ShopCityModule";
import { ShopModuleData } from "./Module/ShopModule/ShopData";
import { SkillData } from "./Module/SkillModule/SkillData";
import { SkillModuleC } from "./Module/SkillModule/SkillModuleC";
import { SkillModuleS } from "./Module/SkillModule/SkillModuleS";
import SVIPData from "./Module/SVipModule/SVIPData";
import SVIPModuleC from "./Module/SVipModule/SVIPModuleC";
import SVIPModuleS from "./Module/SVipModule/SVIPModuleS";
import { WalkModuleC } from "./Module/walkModule/WalkModuleC";
import { WalkModuleS } from "./Module/walkModule/WalkModuleS";
import { AutoAimModuleC } from "./Module/Weapon/Aim/AutoAimModuleC";
import { AutoAimModuleS } from "./Module/Weapon/Aim/AutoAimModuleS";
import { GMBasePanelUI } from "./UILogic/UIGM";
import P_Notice from "./uiTemplate/Common/P_Notice";
import { Tools } from "./Tools";
import { TrampolineModuleC, TrampolineModuleS } from "./Module/TrampolineModule/TrampolineModule";

@Component
export default class GameStart extends mw.Script {
    @mw.Property()
    private isGM: boolean = false;
    @mw.Property({ displayName: "是否显示射线" })
    private isLineTrace = false;
    @mw.Property({ displayName: "是否显示公告" })
    private isShowNotice = false;

    protected onStart(): void {
        GameConfig.Assets.getAllElement().forEach((value) => {
            if (value.Guid) Tools.asyncDownloadAsset(value.Guid);
        });
        this.onRegisterModule();
        console.warn("kang log gamestart onstart")
        //初始化表格语言
        if (SystemUtil.isClient()) {
            GameConfig.initLanguage(-1, (key) => {
                let ele = GameConfig.Language.getElement(key);
                if (ele == null)
                    return "unknow_" + key;
                return ele.Value;
            })
        }

        DataStorage.setTemporaryStorage(mw.SystemUtil.isPIE);

        mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
            let key: string = ui.text;
            if (key) {
                let lan = GameConfig.Language.getElement(key);
                if (lan) {
                    ui.text = (lan.Value);
                }
            }
        })
        this.useUpdate = true;
        AssetUtil.asyncDownloadAsset("145932");
    }
    //当注册模块
    onRegisterModule(): void {
        console.warn("kang log gamestart onRegisterModule")
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
        ModuleService.registerModule(BubbleModuleS, BubbleModuleC, null)
        ModuleService.registerModule(ShelterModuleS, ShelterModuleC, null)
        ModuleService.registerModule(LoadMapModuleS, LoadMapModuleC, null)
        ModuleService.registerModule(SkillModuleS, SkillModuleC, SkillData);
        ModuleService.registerModule(SVIPModuleS, SVIPModuleC, SVIPData)
        // GM.checkAuthority(showGM =>{
        //     if ((showGM || this.isGM) && SystemUtil.isClient()) {
        //         GM.start(GMBasePanelUI)
        //     }
        // })
        ModuleService.registerModule(ExchangeModuleS, ExchangeModuleC, null);
        ModuleService.registerModule(TrampolineModuleS, TrampolineModuleC, null);

        if (mw.SystemUtil.isClient() && this.isGM) {
            new GMBasePanelUI().show();
        }
        if (SystemUtil.isClient()) {
            Globals.isShowLineTrace = this.isLineTrace;
            if (this.isShowNotice) {
                mw.UIService.show(P_Notice);
            }
        }
        // if (SystemUtil.isPIE) {
        //     EventsTool.start();
        // }
    }
    onUpdate(dt: number): void {

        mw.TweenUtil.TWEEN.update();
    }
}