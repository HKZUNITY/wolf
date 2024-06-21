import {  oTrace } from 'odin';
import { PlayerModuleC } from '../../Module/PlayerModule/PlayerModuleC';
import { GameConfig } from '../../Tables/GameConfig';
import RewardPopup from '../../uiTemplate/Hall/RewardPopup';
import { SVIPGiftType } from '../../Module/SVipModule/SVIPModuleC';
import P_RewardItem from './P_RewardItem';
import RewardPopup_Generate from '../../ui-generate/uiTemplate/Hall/RewardPopup_generate';

/*
 * @Author: xicun.kang
 * @Date: 2022-10-25 14:33:45
 * @LastEditors: ziwei.shen
 * @LastEditTime: 2022-11-10 11:22:38
 * @FilePath: \townmystery\JavaScripts\UILogic\Hall\P_RewardPopup.ts
 * @Description: 奖励弹窗
 */
export default class P_RewardPopup extends RewardPopup_Generate {
    private unUsedPool: Array<P_RewardItem> = new Array();
    private usedPool: Array<P_RewardItem> = new Array();
    private count: number = 0;
    private static _instance: P_RewardPopup;
    public static get instance(): P_RewardPopup {
        if (this._instance == null) {
            this._instance = mw.UIService.create(P_RewardPopup);
        }
        return this._instance;
    }
    onStart(): void {
        this.mBtn_RewardClose.onClicked.add(() => {
            this.hide();
        });
    }
    show() {
        mw.UIService.showUI(this);

    }
    hide() {
        mw.UIService.hideUI(this);
    }

    showRewardItem(rewardType: SVIPGiftType){
        this.resetUsedItem();
        GameConfig.Member.getAllElement().forEach((value, index)=>{
            if (value.MemberType == rewardType) {
                let item = this.getRewardItem();
                this.usedPool.push(item);
                item.uiObject.size = item.rootCanvas.size;
                this.mCanvas_Content.addChild(item.uiObject);
                item.mImage_Icon.imageGuid = value.IconGUID.toString();
                item.mText_RewardNum.text = value.Name;
                item.mText_Num.text = value.CurrencyNum.toString();
                item.mText_Num.visibility = value.CurrencyNum > 0 ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
                item.setVisible(true);
            }
        })
        this.show();
    }

    refreshText(gold: number){
        this.resetUsedItem();
        let item = this.getRewardItem();
        this.usedPool.push(item);
        item.uiObject.size = item.rootCanvas.size;
        this.mCanvas_Content.addChild(item.uiObject);
        item.mImage_Icon.imageGuid = GameConfig.Rule.getElement("10042").Num.toString();
        item.mText_RewardNum.text = "金币";
        item.mText_Num.text = gold.toString();
        item.mText_Num.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        item.setVisible(true);
    }

    private resetUsedItem(){
        this.usedPool.forEach((value, index)=>{
            this.unUsedPool.push(value);
            value.setVisible(false);
        })
        this.usedPool.length = 0;
    }

    private getRewardItem() {
        if (this.unUsedPool.length > 0) {
            let res = this.unUsedPool.shift();
            return res;
        }
        let res = mw.UIService.create(P_RewardItem);
        return res;
    }
}