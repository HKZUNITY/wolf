import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameGlobals } from "./Globals";
import { GameModuleData } from "./Module/GameModule/GameData";
import { GameModuleS } from "./Module/GameModule/GameModuleS";
import { PlayerModuleData } from "./Module/PlayerModule/PlayerData";
import { SVIPGiftType } from "./Module/SVipModule/SVIPModuleC";
export class ts_game_start extends AnalyticsUtil {
    desc: string = '对局正式开始';
    data: { player_num: number, game_mode: number };
}
export class ts_action_buy_plane extends AnalyticsUtil{
    desc: string = "玩家购买能力";
    data: {plane_id: number};
}
export class ts_game_result extends AnalyticsUtil {
    desc: string = '玩家个人结算';
    data: { recover: number, camp: number, round: number, box: number, attack: number, switch: number };
}
export class ts_game_launch_end extends AnalyticsUtil{
    desc: string = "大厅按钮点击率";
    data: {play_type: number, end_type: number, launch_time: number};
}
export class ts_action_open_box extends AnalyticsUtil{
    desc: string = "抽奖按钮点击率";
    data: {box_id: number, isfirstopen: string,
            box_num: number, rebirth_num: number,
            lifetime: number,      
    }
}

export class ts_action_hit extends AnalyticsUtil{
    desc: string = "点击结算双倍金币";
    data: {skill_id: number, stage_level: number}
}

export class ts_game_over extends AnalyticsUtil {
    desc: string = '游戏结束';
    data: { round_length: number, totalnum: number, value1: number, kill_player: number, suicide: number, game_mode: number, skill_use: number, stage_level: number };
}
export class ts_action_click extends AnalyticsUtil {
    desc: string = '按钮点击事件';
    data: {
        resource_1: number, resource_2: number
        , world_id: number, scene_id: number
        , resource_3: number, resource_4: number,
    };
}
export class ts_tutorial_start extends AnalyticsUtil {
    desc: string = '玩家开始新手引导';
    data: {};
}
export class ts_tutorial_step extends AnalyticsUtil {
    desc: string = '新手引导的第几步';
    data: { tutorial_step: number };
}
export class ts_tutorial_end extends AnalyticsUtil {
    desc: string = '新手引导事件完成';
    data: {};
}
export class ts_coregameplay_start extends AnalyticsUtil {
    desc: string = '玩家第一轮对局开始';
    data: {};
}
export class ts_coregameplay_step extends AnalyticsUtil {
    desc: string = '玩家关键行为';
    data: { coregameplay_step: number };
}
export class ts_coregameplay_end extends AnalyticsUtil {
    desc: string = '玩家第一轮结束';
    data: {};
}
export class ts_action_buy_item extends AnalyticsUtil {
    desc: string = "玩家每次点击购买按钮并成功购买物品";
    data: { item_id: number };
}
export class ts_action_use_item extends AnalyticsUtil {
    desc: string = "玩家每次点击装备按钮并成功装备物品";
    data: { item_id: number };
}

export class ts_interact_dj extends AnalyticsUtil{
    desc: string = "玩家使用快捷短语";
    data: {play_type: number, role_id: number,    
    };
}

export class ts_task extends AnalyticsUtil{
    desc: string = "玩家选择那张地图"
    data: {taskid: number};
}

export class ts_action_buy_storage extends AnalyticsUtil{
    desc: string = "玩家使用广告券购买物品"
    data: {storage_id: number};
}

export class ts_action_buy_rocket extends AnalyticsUtil{
    desc: string = "玩家购买大会员礼包"
    data: {rocket_id: number};
}
export class MGSHome {
    public static msgBuyItem(player: mw.Player, itemID: number) {
        let msg = AnalyticsUtil.get(ts_action_buy_item);
        msg.data.item_id = itemID;
        msg.send(player);
    }
    public static msgUseItem(player: mw.Player, itemID: number) {
        let msg = AnalyticsUtil.get(ts_action_use_item);
        msg.data.item_id = itemID;
        msg.send(player);
    }
    public static coreStart(player: mw.Player) {
        let msg = AnalyticsUtil.get(ts_coregameplay_start);
        msg.send(player);
    }
    public static coreEnd(player: mw.Player) {
        let msg = AnalyticsUtil.get(ts_coregameplay_end);
        msg.send(player);
    }
    public static coreStep(player: mw.Player, num: number) {
        let msg = AnalyticsUtil.get(ts_coregameplay_step);
        msg.data.coregameplay_step = num;
        msg.send(player);
    }
    /**gamestart埋点 */
    public static mgsStart(player: mw.Player) {
        let msg = AnalyticsUtil.get(ts_game_start);
        msg.data.player_num = GameGlobals.readyPlayers.length;
        msg.data.game_mode = GameGlobals.curMapID;
        console.error("开始数据", JSON.stringify(msg.data));
        
        msg.send(player);//发送埋点
    }

    /**gameresult埋点 */
    public static mgsResult(player: mw.Player) {
        let msg = AnalyticsUtil.get(ts_game_result);
        msg.data.recover = DataCenterS.getData(player, GameModuleData).getGold();
        msg.data.camp = DataCenterS.getData(player, GameModuleData).getPlayerCamp();
        msg.data.round = DataCenterS.getData(player, PlayerModuleData).addGameRound(0);
        msg.data.box = DataCenterS.getData(player, GameModuleData).getPropNum();
        msg.data.attack = DataCenterS.getData(player, GameModuleData).addAttackNum(0);
        msg.data.switch = DataCenterS.getData(player, GameModuleData).addSwitchNum(0);
        msg.send(player);
    }
    public static mgsOver(player: mw.Player) {
        let msg = AnalyticsUtil.get(ts_game_over);
        msg.data.round_length = MGSDataInfo.round_length;
        msg.data.totalnum = GameGlobals.readyPlayers.length;
        msg.data.value1 = MGSDataInfo.exit_num;
        msg.data.kill_player = MGSDataInfo.kill_player;
        msg.data.suicide = MGSDataInfo.suicide;
        msg.data.game_mode = MGSDataInfo.game_mode;
        msg.data.skill_use = MGSDataInfo.skillId;
        msg.data.stage_level = GameGlobals.curMapID;
        msg.send(player);
    }
    public static msgBtnClick(num: number) {
        let msg = AnalyticsUtil.get(ts_action_click);
        msg.data.resource_1 = 0;
        msg.data.resource_2 = 0;
        switch (num) {
            case 1:
                msg.data.resource_1 = 1;
                break;
            case 2:
                msg.data.resource_2 = 1;
                break;
        }
        msg.send();
    }
    // public static msgTutorStart() {
    //     let msg = AnalyticsUtil.get(ts_tutorial_start);
    //     msg.send();
    // }
    public static msgTutorStep(num: number) {
        let msg = AnalyticsUtil.get(ts_tutorial_step);
        msg.data.tutorial_step = num;
        msg.send();
    }
    // public static msgTutorEnd() {
    //     let msg = AnalyticsUtil.get(ts_tutorial_end);
    //     msg.send();
    // }

    //玩家点击各个激励广告播放按钮次数（播放成功和失败都计算）
    public static mgsWorldId(value: number) {
        let msg = AnalyticsUtil.get(ts_action_click);
        switch (value) {
            case 0:
                msg.data.world_id = 0;
                break;
            case 1:
                msg.data.world_id = 1;
                break;
            case 2:
                msg.data.world_id = 2;
                break;
        }
        msg.send();
    }
    /**
     * 发送聊天消息
     * @param firstId 一级id
     * @param secondId 二级id
     */
    public static mgsSendChatMsg(firstId: number, secondId: number){
        let msg = AnalyticsUtil.get(ts_interact_dj);
        msg.data.play_type = firstId;
        msg.data.role_id = secondId;
        msg.send(); 
    }
    /**
     * 
     * @param value 0为抽奖，1为商店，2为弹窗
     */
    public static mgsHallBtnClick(value: number){
        let msg = AnalyticsUtil.get(ts_game_launch_end);
        msg.data.end_type = 0;
        msg.data.play_type = 0;
        msg.data.launch_time = 0;
        switch (value) {
            case 0:
                msg.data.play_type = 1;
                break;
            case 1:
                msg.data.end_type = 1;
                break;
            case 2:
                msg.data.launch_time = 1;
                break;
        }
        msg.send();
    }
    /**抽奖相关埋点 */
    public static msgDraw(isFirst: boolean, boxId: number, isUseMoney: boolean, lifeTime: number){
        let msg = AnalyticsUtil.get(ts_action_open_box);
        msg.data.isfirstopen = "no";
        msg.data.lifetime = lifeTime;
        if (isFirst) {
            msg.data.isfirstopen = "yes";
        }
        if (isUseMoney) {
            msg.data.box_num = 1;
            msg.data.rebirth_num = 0;
        }
        else{
            msg.data.box_num = 0;
            msg.data.rebirth_num = 1;
        }
        msg.data.box_id = boxId;
        msg.send();
    }

    //玩家结算界面统计
    public static msgCalculate(peopleNum: number, isClickDouble: boolean){
        let msg = AnalyticsUtil.get(ts_action_hit);
        msg.data.stage_level = peopleNum;
        msg.data.skill_id = isClickDouble? 1: 0;
        msg.send();
    }
    //玩家点击各个激励广告播放按钮次数（仅计算播放成功的广告）
    public static mgsSceneId(value: number) {
        let msg = AnalyticsUtil.get(ts_action_click);
        switch (value) {
            case 0:
                msg.data.scene_id = 0;
                break;
            case 1:
                msg.data.scene_id = 1;
                break;
            case 2:
                msg.data.scene_id = 2;
                break;
        }
        msg.send();
    }
    //主界面按钮普及率
    public static mgsResource3(value: number, isUI: boolean) {
        let msg = AnalyticsUtil.get(ts_action_click);
        switch (value) {
            case 0:
                msg.data.resource_3 = 0;
                break;
            case 1:
                msg.data.resource_3 = 1;
                break;
            case 2:
                msg.data.resource_3 = 2;
                break;
            case 3:
                msg.data.resource_3 = 3;
                break;
            case 4:
                msg.data.resource_3 = 4;
                break;
            case 5:
                msg.data.resource_3 = 5;
                break;
        }
        msg.data.resource_4 = isUI? 0: 1;
        msg.send();
    }
    // 能力商店
    public static mgsSkillShop(player: mw.Player, skillId: number){
        
        let msg = AnalyticsUtil.get(ts_action_buy_plane);
        msg.data.plane_id = skillId;
        msg.send(player);
    }
    //选择地图
    public static chooseMap(mapId: number){
        let msg = AnalyticsUtil.get(ts_task);
        msg.data.taskid = mapId;
        msg.send();
    }
    //兑换物品
    public static exchangeItem(player: mw.Player, itemId: number){
        let msg = AnalyticsUtil.get(ts_action_buy_storage);
        msg.data.storage_id = itemId;
        msg.send(player);
    }
    //购买大会员礼包
    public static buyVipGift_S(player: mw.Player, itemId: number){
        let msg = AnalyticsUtil.get(ts_action_buy_rocket);
        if (itemId == SVIPGiftType.NormalGift) {
            msg.data.rocket_id = 0;
        }
        else if(itemId == SVIPGiftType.GoldenKeyGift){
            msg.data.rocket_id = 1;
        }
        msg.send(player);
    }

    public static buyVipGift_C(itemId: SVIPGiftType){
        let msg = AnalyticsUtil.get(ts_action_buy_rocket);
        if (itemId == SVIPGiftType.NormalGift) {
            msg.data.rocket_id = 0;
        }
        else if(itemId == SVIPGiftType.GoldenKeyGift){
            msg.data.rocket_id = 1;
        }
        msg.send();
    }
}
export class MGSDataInfo {
    /**对局时长 */
    public static round_length: number = 0;
    /**对局中途退出的人数 */
    public static exit_num: number = 0;
    /**黑手党击杀人数 */
    public static kill_player: number = 0;
    /**警探或英雄自杀次数 */
    public static suicide: number = 0;
    /**游戏结束情况 */
    public static game_mode: number = 0;
    /**杀手携带技能 */
    public static skillId: number = 0;

    public static initMGSDataInfo() {
        MGSDataInfo.round_length = 0;
        MGSDataInfo.exit_num = 0;
        MGSDataInfo.kill_player = 0;
        MGSDataInfo.suicide = 0;
        MGSDataInfo.game_mode = 0;
        MGSDataInfo.skillId = 0;
    }
}



