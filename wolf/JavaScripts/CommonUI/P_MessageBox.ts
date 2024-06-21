import { oTraceError, oTrace, oTraceWarning, LogManager ,AnalyticsUtil, IFightRole, AIMachine, AIState} from "odin";
// import { UI_MessageBox } from "../UI/UITemplate";


// /**二次确认框*/
// export default class MessageBox extends UI_MessageBox {
//     private static _instance: MessageBox;
//     private resListener: Function;//保存的结果回调方法

//     private static get instance(): MessageBox {
//         if (MessageBox._instance == null) {
//             MessageBox._instance = MessageBox.creat();
//         }
//         return MessageBox._instance;
//     }

//     public getLayer(): UILayer {
//         return UILayer.Top;
//     }

//     onStart() {
//         this.mOK_btn.OnClicked().Add(() => {
//             this.hide();
//             if (this.resListener != null) {
//                 this.resListener();
//             }
//         });
//         this.mYes_btn.OnClicked().Add(() => {
//             this.hide();
//             this.resListener(true);
//         });
//         this.mNo_btn.OnClicked().Add(() => {
//             this.hide();
//             this.resListener(false);
//         });
//     }
//     /**
//      * 显示消息框（单个按钮）
//      * @param title 标题
//      * @param content 内容
//      * @param confirmListener 确认回调
//      */
//     public static showOneBtnMessage(title: string, content: string, resListener?: () => void, okStr: string = "确定") {
//         MessageBox.instance.show();
//         MessageBox.instance.showMsg1(title, content, resListener, okStr);
//     }

//     /**
//      * 显示消息框（两个按钮）
//      * @param title 标题
//      * @param content 内容
//      * @param yListener “是”回调事件
//      * @param nListener “否”回调事件
//      */
//     public static showTwoBtnMessage(title: string, content: string, resListener: (res: boolean) => void, yesStr: string = "是", noStr = "否") {
//         MessageBox.instance.show();
//         MessageBox.instance.showMsg2(title, content, resListener, yesStr, noStr);
//     }

//     private showMsg1(title: string, content: string, resListener: () => void, okStr: string) {
//         this.mYes_btn.SetVisibility(MWGameUI.ESlateVisibility.Collapsed);
//         this.mNo_btn.SetVisibility(MWGameUI.ESlateVisibility.Collapsed);
//         this.mOK_btn.SetVisibility(MWGameUI.ESlateVisibility.Visible);

//         this.mTitle_txt.SetText(title);
//         this.mContent_txt.SetText(content);
//         this.resListener = resListener;
//         this.mOK_btn.SetButtonString(okStr);
//     }

//     private showMsg2(title: string, content: string, resListener: (res: boolean) => void, yesStr: string, noStr: string) {
//         this.mYes_btn.SetVisibility(MWGameUI.ESlateVisibility.Visible);
//         this.mNo_btn.SetVisibility(MWGameUI.ESlateVisibility.Visible);
//         this.mOK_btn.SetVisibility(MWGameUI.ESlateVisibility.Collapsed);

//         this.mTitle_txt.SetText(title);
//         this.mContent_txt.SetText(content);
//         this.resListener = resListener;
//         this.mYes_btn.SetButtonString(yesStr);
//         this.mNo_btn.SetButtonString(noStr);
//     }
// }