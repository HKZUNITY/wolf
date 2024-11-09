import { Tools, Visibility } from '../Tools';
import TipsInGame_Generate from '../ui-generate/common/TipsInGame_generate';

/**UI类型枚举 */
export enum UITipsInGameType {
    /**阶段性提示 例如：门打开了*/
    StageTips = 1,
    /**指引性提示 例如：引导医生把病人放到处决室*/
    GuideTips = 2,
    /**运镜提示 例如：不同阵营每局开始提示*/
    MirrorTips = 3,
}
export default class P_TipsInGame extends TipsInGame_Generate {

    private static _instance: P_TipsInGame;
    private static get instance(): P_TipsInGame {
        if (this._instance == null) {
            this._instance = mw.UIService.create(P_TipsInGame);
        }
        return this._instance;
    }


    onStart() {
        this.layer = mw.UILayerTop;
    }

    onUpdate(dt: number) {

    }
    /**
     * 显示提示 客户端调用
     * @param msg 提示内容
     * @param tipsInGameType 提示框类型
     * @param imgGuid 图片guid 如果是运镜提示，则不需要传
     */
    public static show(msg: string, tipsInGameType: UITipsInGameType, imgGuid: string = "") {
        /**可能会出现同时显示的情况 */
        P_TipsInGame.instance.showMsg(msg, tipsInGameType, imgGuid);
    }

    private showMsg(content: string, tipsInGameType: UITipsInGameType, imgGuid: string) {
        mw.UIService.showUI(this);
        let time = 1;
        switch (tipsInGameType) {
            case UITipsInGameType.StageTips:
                this.showStageTips(content, imgGuid, time, 1);
                break;
            case UITipsInGameType.GuideTips:
                this.showGuideTips(content, imgGuid, time, 1);
                break;
            case UITipsInGameType.MirrorTips:
                this.showMirrorTips(content, time, 1);
                break;
        }
    }
    /**显示阶段性提示 */
    private showStageTips(content: string, imgGuid: string, time: number, showTime: number = 0) {
        Tools.setVisible(this.mCanvas_StageTips, Visibility.HitTestInvisible);
        Tools.setVisible(this.mCanvas_GuideTips, Visibility.Hidden);
        Tools.setVisible(this.mCanvas_MirrorTips, Visibility.Hidden);
        this.uiEffect(this.mText_StageContent, time, 2);
        this.uiEffect(this.mImg_StageBG, time, 2);
        this.uiEffect(this.mImg_StageIcon, time, 2);
        if (imgGuid != "")
            this.mImg_StageIcon.imageGuid = imgGuid;
        else {
            console.warn("没有传入图片guid");
            Tools.setVisible(this.mImg_StageIcon, Visibility.Hidden);
        }

        this.mText_StageContent.text = content;
    }
    /**显示指引性提示 */
    private showGuideTips(content: string, imgGuid: string, time: number, showTime: number = 0) {
        Tools.setVisible(this.mCanvas_StageTips, Visibility.Hidden);
        Tools.setVisible(this.mCanvas_GuideTips, Visibility.HitTestInvisible);
        Tools.setVisible(this.mCanvas_MirrorTips, Visibility.Hidden);
        this.uiEffect(this.mText_GuideContent, time, showTime);
        this.uiEffect(this.mImg_GuideBG, time, showTime);
        this.uiEffect(this.mImg_GuideIcon, time, showTime);
        this.mText_GuideContent.text = content;
        if (imgGuid != "")
            this.mImg_GuideIcon.imageGuid = imgGuid;
        else {
            console.warn("没有传入图片guid");
            Tools.setVisible(this.mImg_GuideIcon, Visibility.Hidden);
        }
    }
    /**显示运镜提示 */
    private showMirrorTips(content: string, time: number, showTime: number = 0) {
        Tools.setVisible(this.mCanvas_StageTips, Visibility.Hidden);
        Tools.setVisible(this.mCanvas_GuideTips, Visibility.Hidden);
        Tools.setVisible(this.mCanvas_MirrorTips, Visibility.HitTestInvisible);
        this.uiEffect(this.mImg_MirrorBG, time, showTime);
        this.uiEffect(this.mText_MirrorContent, time, showTime);
        this.mText_MirrorContent.text = content;
    }
    /**
     * 文本/图片 渐隐渐现
     * @param uiEle ui元素
     * @param time 动画时间
     * @param showTime 显示时间
     */
    public uiEffect(uiEle: mw.TextBlock | mw.Image, time: number, showTime: number = 0): void {
        let color: mw.LinearColor = (uiEle instanceof mw.TextBlock) ? uiEle.fontColor : uiEle.imageColor;
        let outLineColor: mw.LinearColor = (uiEle instanceof mw.TextBlock) ? uiEle.outlineColor : new mw.LinearColor(0, 0, 0, 0);
        time = time * 1000;
        if (uiEle instanceof mw.TextBlock) {
            uiEle.fontColor = new mw.LinearColor(color.r, color.g, color.b, 0);
            uiEle.outlineColor = new mw.LinearColor(outLineColor.r, outLineColor.g, outLineColor.b, 0);
        }
        else {
            uiEle.imageColor = new mw.LinearColor(color.r, color.g, color.b, 0);
        }
        Tools.setVisible(uiEle, (Visibility.HitTestInvisible));
        let tween = new mw.Tween({ alaf: 0 }).to({ alaf: 1 }, time)
            .onUpdate((obj) => {
                if (uiEle instanceof mw.TextBlock) {
                    uiEle.fontColor = new mw.LinearColor(color.r, color.g, color.b, obj.alaf);
                    uiEle.outlineColor = new mw.LinearColor(outLineColor.r, outLineColor.g, outLineColor.b, obj.alaf);
                } else {
                    uiEle.imageColor = new mw.LinearColor(color.r, color.g, color.b, obj.alaf);
                }
            })
            .start()
            .onComplete(() => {
                setTimeout(() => {
                    let tween = new mw.Tween({ alaf: 1 }).to({ alaf: 0 }, time)
                        .onUpdate((obj) => {
                            if (uiEle instanceof mw.TextBlock) {
                                uiEle.fontColor = new mw.LinearColor(color.r, color.g, color.b, obj.alaf);
                                uiEle.outlineColor = new mw.LinearColor(outLineColor.r, outLineColor.g, outLineColor.b, obj.alaf);
                            } else {
                                uiEle.imageColor = new mw.LinearColor(color.r, color.g, color.b, obj.alaf);
                            }
                        })
                        .start()
                        .onComplete(() => {
                            mw.UIService.hideUI(this);
                        });
                }, showTime * 1000);
            })
    }
}