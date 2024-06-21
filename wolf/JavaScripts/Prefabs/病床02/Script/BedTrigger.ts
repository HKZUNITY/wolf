import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-13 12:20:08
 * @LastEditors  : songyang.xie
 * @LastEditTime : 2023-02-20 11:56:34
 * @FilePath     : \murdermystery3\Prefabs\病床02\Script\BedTrigger.ts
 * @Description  : 修改描述
 */

import { UiManager } from "../../../../JavaScripts/UI/UiManager"
import P_Action from "../../../../JavaScripts/UILogic/Game/P_Action"

/**当前病房状态 */
export enum HospitalBed {
    /**空闲 */
    Idle,
    /**占用 */
    Occupy
}



@Component
export default class BedTrigger extends mw.Script {
    trigger: mw.Trigger
    /**当前病床状态 */
    state: HospitalBed = HospitalBed.Idle
    /**当前是否初始化完成 */
    isInit: boolean = false
    /**交互ui */
    actionUI: P_Action
    /**点击进入床的事件名称 */
    clickEnterBtnEventName: string = "ClickEnterBtnEvent"
    /**点击离开床的事件名称 */
    clickLeaveBtnEventName: string = "ClickLeaveBtnEvent"
    /**床被使用事件名称 */
    bedUesdEventName: string = "BedUsedEvent"
    /**床空闲事件名称 */
    bedIdleEventName: string = "BedIdleEvent"
    /**在病床上的玩家（服务端用） */
    private usedPlayer: mw.Player
    /**玩家躺在病床上的额外事件（服务端），需要做监听 */
    public static subBedEnterServerEvent: string = "SubBedServerEnterEvent"
    /**玩家躺在病床上的额外事件（客户端），需要做监听 */
    public static subBedEnterClientEvent: string = "SubBedClientEnterEvent"
    /**玩家离开病床的额外事件，需要做监听（服务端） */
    public static subBedLeaveServerEvent: string = "SubBedLeaveServerEvent"
    /**玩家离开病床的额外事件，需要做监听(客户顿) */
    public static subBedLeaveClientEvent: string = "SubBedLeaveClientEvent"
    /**手动设置病床状态事件 */
    private changeBedStateEventName: string = "ChangeBedStateEvent"
    /**玩家离开病床之前位置 */
    private oldPosition: mw.Vector
    private oldRotation: mw.Rotation
    /**玩家躺床上的姿势 */
    @mw.Property({ displayName: "玩家交互姿势" })
    private lieAnim = "14503"
    /**相对位移 */
    @mw.Property({displayName: "相对偏移"})
    private relativePosition: mw.Vector = new mw.Vector(30, 10, 200)
    /**相对旋转 */
    @mw.Property({displayName: "相对旋转"})
    private relativeRotation: mw.Rotation = new mw.Rotation(0, 0, 90)
    /**计时器*/
    private timer: number = null
    /**当前角色播放动画 */
    private playerAnim: mw.SubStance

    protected onStart(): void {
        this.actionUI = UiManager.instance.getActionUI()
        this.clickEnterBtnEventName = this.clickEnterBtnEventName + "_" + this.gameObject.gameObjectId
        this.clickLeaveBtnEventName = this.clickLeaveBtnEventName + "_" + this.gameObject.gameObjectId
        this.bedUesdEventName = this.bedUesdEventName + "_" + this.gameObject.gameObjectId
        this.bedIdleEventName = this.bedIdleEventName + "_" + this.gameObject.gameObjectId
        this.changeBedStateEventName = this.changeBedStateEventName + "_" + this.gameObject.gameObjectId
        if (SystemUtil.isServer()) {
            this.serverInit()
        }
        else if (SystemUtil.isClient()) {
            this.clientInit()
        }

        let assetIdArray: Array<string> = new Array<string>(this.lieAnim)
        for (let element of assetIdArray) {
            mw.AssetUtil.asyncDownloadAsset(element).then((value: boolean) => {
                if (value) {
                    mw.AssetUtil.assetLoaded(element);
                }
            });
        }

    }
    /**初始化方法 */
    @RemoteFunction(mw.Server)
    serverInit() {
        Event.addClientListener(this.clickEnterBtnEventName, this.onClientEnterBedEvent.bind(this))
        Event.addClientListener(this.clickLeaveBtnEventName, this.onClientLeaveBedEvent.bind(this))
    }
    @RemoteFunction(mw.Client)
    clientInit() {
        Event.addServerListener(this.bedUesdEventName, this.onBedUsedHandler.bind(this))
        Event.addServerListener(this.bedIdleEventName, this.onBedLeaveHandler.bind(this))
        Event.addServerListener(this.changeBedStateEventName, this.onBedStateChangeHandler.bind(this))
        this.initBedTrigger()
    }
    /**手动设置病床状态 */
    public setBedState(state: HospitalBed, playerId: number = -1) {
        if (this.state == state) {
            return
        }
        this.state = state
        if (this.usedPlayer) {
            this.usedPlayer.character.jumpEnabled = true
            PlayerManagerExtesion.changeStanceExtesion(this.usedPlayer.character,"")
            if (this.playerAnim) {
                this.playerAnim.stop()
            }
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        }
        Event.dispatchToAllClient(this.changeBedStateEventName, state, playerId)
    }
    /**接受进入床事件（服务器） */
    private onClientEnterBedEvent(player: mw.Player) {
        if (this.state == HospitalBed.Occupy) {
            player.character.movementEnabled = true
            player.character.jumpEnabled = true
            return
        }
        this.usedPlayer = player
        this.state = HospitalBed.Occupy
        Event.dispatchToLocal(BedTrigger.subBedEnterServerEvent, this.usedPlayer.playerId, this.guid)
        this.setPlayerInBed()
        Event.dispatchToAllClient(this.bedUesdEventName, this.usedPlayer.playerId)
    }
    /**接受离开床事件（服务器） */
    private onClientLeaveBedEvent(player: mw.Player) {
        if (this.state == HospitalBed.Idle) {
            return
        }
        this.state = HospitalBed.Idle
        Event.dispatchToLocal(BedTrigger.subBedLeaveServerEvent, this.usedPlayer.playerId, this.guid)
        this.setPlayerLeaveBed()
        Event.dispatchToAllClient(this.bedIdleEventName, player.playerId)
    }
    /**设置玩家在床上的表现 */
    private setPlayerInBed() {
        this.oldPosition = this.usedPlayer.character.worldTransform.position
        this.oldRotation = this.usedPlayer.character.worldTransform.rotation
        this.usedPlayer.character.movementEnabled = false
        this.usedPlayer.character.jumpEnabled = false
        // PlayerManagerExtesion.changeStanceExtesion(this.usedPlayer.character,"")
        let finalPosition = this.gameObject.worldTransform.position.add(this.relativePosition)
        let finalRotation = this.gameObject.worldTransform.rotation.add(this.relativeRotation)
        this.usedPlayer.character.worldTransform.position = finalPosition
        this.usedPlayer.character.worldTransform.rotation = finalRotation
        this.timer = setTimeout(() => {
            if (this.lieAnim != "") {
                this.playerAnim = PlayerManagerExtesion.loadStanceExtesion(this.usedPlayer.character, this.lieAnim)
                this.playerAnim.blendMode = mw.StanceBlendMode.WholeBody
                this.playerAnim.play()
            }
            this.timer = null
        }, 60);
    }
    /**设置玩家离开床上表现 */
    private setPlayerLeaveBed() {
        if (this.playerAnim) {
            this.playerAnim.stop()
            this.playerAnim = null
        }
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
        this.playerAnim = null
        this.usedPlayer.character.worldTransform.position = this.oldPosition
        this.usedPlayer.character.worldTransform.rotation = this.oldRotation
        this.usedPlayer.character.movementEnabled = true
        this.usedPlayer.character.jumpEnabled = true
        this.usedPlayer = null
    }
    /**初始化病床触发器 */
    private initBedTrigger() {
        let count = 10
        let temp = TimeUtil.setInterval(() => {
            this.trigger = this.gameObject.getChildByName("病床触发器") as mw.Trigger
            if (this.trigger) {
                this.trigger.onEnter.add(this.onTriggerEnter.bind(this))
                this.trigger.onLeave.add(this.onTriggerLeave.bind(this))
                this.isInit = true
                TimeUtil.clearInterval(temp)
                return
            }
            count--
            if (count <= 0) {
                TimeUtil.clearInterval(temp)
            }
        }, 2);
    }
    /**触发器进入事件 */
    private onTriggerEnter(other: mw.GameObject) {
        if (this.state == HospitalBed.Occupy) {
            return
        }
        if (PlayerManagerExtesion.isCharacter(other)) {
            let char = other as mw.Character
            let mine = Player.localPlayer.character
            /**客户顿触发器只负责自己 */
            if (char != mine || this.state != HospitalBed.Idle) {
                return
            }
            this.actionUI.setActionGuid(this.gameObject.gameObjectId)
            if (this.gameObject.gameObjectId == this.actionUI.actionGuidList[0]) {
                this.actionUI.hide()
                this.actionUI.setBtnEventAndShow(this.onClickEnterHandler.bind(this))
            }
        }
    }
    /**触发器离开事件 */
    private onTriggerLeave(other: mw.GameObject) {
        if (this.state == HospitalBed.Occupy) {
            return
        }
        if (PlayerManagerExtesion.isCharacter(other)) {
            let char = other as mw.Character
            let mine = Player.localPlayer.character
            if (char != mine || this.state != HospitalBed.Idle) {
                return
            }
            this.actionUI.deleteActionGuid(this.gameObject.gameObjectId)
            if (this.actionUI.isUse == true) {
                return
            }
            this.actionUI.hide()
            if (this.actionUI.actionGuidList.length > 0) {
                let guid = this.actionUI.actionGuidList[0]
                let eventName = "ClickEnterBtnEvent" + "_" + guid
                this.actionUI.setBtnEventAndShow(() => {
                    Event.dispatchToServer(eventName)
                })
            }


        }
    }

    /**病床被占用回调*/
    private onBedUsedHandler(playerId: number) {
        /**如果进入交互物和你现在的交互物没有关系就不需要往下走了 */
        if (this.isInit == false) {
            return
        }
        this.state = HospitalBed.Occupy
        this.trigger.enabled = (false)
        let index = this.actionUI.actionGuidList.indexOf(this.gameObject.gameObjectId)
        this.actionUI.deleteActionGuid(this.gameObject.gameObjectId)
        if (playerId == Player.localPlayer.playerId) {
            this.actionUI.hide()
            /**更新点击事件为离开病床 */
            this.actionUI.setPlayerInAction(true)
            this.actionUI.setBtnEventAndShow(this.onClickLeaveHandler.bind(this))
            Event.dispatchToLocal(BedTrigger.subBedEnterClientEvent)
        }
        else if (playerId != Player.localPlayer.playerId && index > -1) {
            /**如果是无关并且进入了该触发器 */

            this.actionUI.hide()
            if (this.actionUI.actionGuidList.length > 0) {
                let guid = this.actionUI.actionGuidList[0]
                let eventName = "ClickEnterBtnEvent" + "_" + guid
                this.actionUI.setBtnEventAndShow(() => {
                    Event.dispatchToServer(eventName)
                })

            }
        }

    }
    /**进入病床点击事件*/
    private onClickEnterHandler() {
        Player.localPlayer.character.movementEnabled = false
        Player.localPlayer.character.jumpEnabled = false
        Event.dispatchToServer(this.clickEnterBtnEventName)
    }
    /**离开病床点击事件*/
    private onClickLeaveHandler() {
        Event.dispatchToServer(this.clickLeaveBtnEventName)
    }
    /**病床离开回调 */
    private onBedLeaveHandler(playerId: number) {
        if (this.isInit == false) {
            return
        }
        this.state = HospitalBed.Idle
        this.trigger.enabled = (true)
        let player = Player.localPlayer
        if (playerId != player.playerId) {
            return
        }
        this.actionUI.setPlayerInAction(false)
        Event.dispatchToLocal(BedTrigger.subBedLeaveClientEvent)
    }
    /**同步病床状态事件 */
    private onBedStateChangeHandler(state: HospitalBed, playerId: number) {
        if (this.isInit == false) {
            return
        }
        this.state = state
        if (this.state == HospitalBed.Idle) {
            this.trigger.enabled = (true)
            if (playerId == Player.localPlayer.playerId) {
                this.actionUI.hide()
            }
        }
        else if (this.state == HospitalBed.Occupy) {
            this.actionUI.hide()
            this.trigger.enabled = (false)
        }
        this.actionUI.setPlayerInAction(false)
    }

}