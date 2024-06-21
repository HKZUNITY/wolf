/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-20 10:24:47
 * @LastEditors  : songyang.xie
 * @LastEditTime : 2023-02-20 11:15:58
 * @FilePath     : \murdermystery3\JavaScripts\Module\PlayerModule\nameScript\NameScriptExt.ts
 * @Description  : 修改描述
 */
/*
 * @Author: tianran.shi
 * @Date: 2023-02-02 17:29:47
 * @LastEditors: tianran.shi
 * @LastEditTime: 2023-02-16 13:53:07
 * @FilePath: \murdermystery3\JavaScripts\Module\PlayerModule\nameScript\NameScriptExt.ts
 * @Description: 
 */

import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameConfig } from "../../../Tables/GameConfig";
import { PlayerModuleC } from "../PlayerModuleC";

@Component
export default class NameScriptExt extends mw.Script {

    @mw.Property({ replicated: true, onChanged: "onJoin" })
    public playerID: number = null;
    @mw.Property({ replicated: true, onChanged: "onJoinAI" })
    public aiIds: Array<string> = new Array<string>();

    onJoin() {
        if (this.playerID == Player.localPlayer.playerId) {
            Player.getAllPlayers().forEach((p) => {
                let ui = p.character.overheadUI;
                let name = p.character.displayName;
                this.changeUI(ui, name, p.playerId);
            })
        }
        else {
            let p = Player.getPlayer(this.playerID)
            let ui = p.character.overheadUI;
            let name = p.character.displayName;

            this.changeUI(ui, name, this.playerID);
        }

    }

    onJoinAI() {
        this.aiIds.forEach((guid) => {
            GameObject.asyncFindGameObjectById(guid).then(async obj => {
                if (!obj) return;
                let aiMode = obj as mw.Character;
                await aiMode.asyncReady();
                let ui = aiMode.overheadUI;
                let name = aiMode.displayName;
                if (!ui) {
                    await TimeUtil.delaySecond(1);
                    let ui2 = aiMode.overheadUI;
                    let name2 = aiMode.displayName;
                    this.changeUI(ui2, name2);
                } else {
                    this.changeUI(ui, name);
                }
            })
        })
    }

    changeUI(ui: mw.UIWidget, name: string, playerId: number = -1) {
        ui.setUIbyID('049AD6A946CA75E232D4DCA874511D5B');
        ui.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        ui.drawSize = new mw.Vector2(400, 100);
        ui.selfOcclusion = false;
        ui.occlusionEnable = true;
        let nameUI = ui.getTargetUIWidget()
        let nametext = nameUI.findChildByPath('mRootCanvas/mText_name') as mw.TextBlock;
        if (playerId != -1) {
            ModuleService.getModule(PlayerModuleC).addRankUI(playerId)
        }
        nametext.text = name;
    }
}