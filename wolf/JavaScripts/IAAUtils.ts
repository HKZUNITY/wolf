import { GeneralManager, } from './Modified027Editor/ModifiedStaticAPI';
import { Globals } from "./Globals";

// declare namespace puerts {
//     const argv: any;
// }
/** 
 * @Author       : lei.zhao
 * @Date         : 2022-12-30 15:09:19
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-07-28 17:45:14
 * @FilePath     : \murdermystery3\JavaScripts\IAAUtils.ts
 * @Description  : IAA通用脚本，注意IAA相关功能仅客户端可用
 */
// export const TEST_ACTION: mw.Action1<number> = new mw.Action1();
export namespace IAAUtils {
    /**
     * 是否是手机平台
     */
    // const IS_MOBILE_PLATFORM = (puerts.argv.getByName("Proxy") as any).ProjectDir.indexOf(":") < 0;
    /**
     * 播放超时时间，广告超时认为平台版本号过低
     */
    const PLAY_TIMEOUT = 5000;
    /**
     * 广告间隔,低于此间隔播放广告直接返回失败
     */
    const AD_INTERVAL = 2000;
    /**
     * 上次广告播放时间
     */
    let last_ad_play_time = 0;
    /**
     * 成功延迟调用时间，避免UI问题[2000-5000合适],0为不延迟
     */
    let CALL_LATE_TIMEOUT = 2000;
    /**
     * PIE是否激活激励广告，用作测试
     */
    const PIE_REWARD_ACTIVE = false;
    /**
     * PIE是否激活全屏广告，用作测试
     */
    const PIE_INTERSTITIAL_ACTIVE = true;
    /**
     * 当一种广告没准备好，播放另一种广告
     */
    const SHOW_OTHER_WHEN_CURRENT_NOT_READY = true;
    /**
     * 激励广告是否成功
     */
    let isAdSuccess: boolean = false;

    /**
     * 超时计时器
     */
    let timeOut = null;

    /**
     * 是否是V2版本
     */
    let v2_version = false;
    /**
     * 激励广告是否打开
     * 此开关由广告平台控制，游戏根据返回结果来显示/关闭广告相关的功能
     * @life 客户端
     */
    // export function isRewardOpen() {
    //     if (!IS_MOBILE_PLATFORM) return Globals.isShowAdv;
    //     return mw.AdsService.isActive(mw.AdsType.Reward);
    // }
    /**
     * 全屏广告是否打开
     * 此开关由广告平台控制，游戏根据返回结果来显示/关闭广告相关的功能
     * @life 客户端
     */
    // export function isInterstitialOpen() {
    //     if (!IS_MOBILE_PLATFORM) return PIE_INTERSTITIAL_ACTIVE;
    //     return mw.AdsService.isActive(mw.AdsType.Interstitial);
    // }
    /**
     * 延时调用，避免UI刷新问题
     * @param callback 
     */
    function lateCallback(callback: () => void) {
        last_ad_play_time = Date.now();
        if (CALL_LATE_TIMEOUT === 0) {
            callback();
        } else {
            setTimeout(callback, CALL_LATE_TIMEOUT);
        }
    }
    function callClearTimeout() {
        if (timeOut) {
            clearTimeout(timeOut);
            timeOut = null;
        }
    }
    /**
     * 播放激励广告
     * @life 客户端
     * @param onSuccess 成功
     * @param onFail 失败
     * @param onPlatformVersionError 播放超时,一版是233版本过低，广告无法播放
     */
    // export function showRewardAd(onSuccess: () => void, onFail: () => void, onPlatformVersionError?: () => void) {
    //     if (mw.SystemUtil.isServer()) {
    //         console.warn(new Error("服务端不能播放广告").stack);
    //         return;
    //     }
    //     if (!IS_MOBILE_PLATFORM) {
    //         //PIE直接成功
    //         onSuccess();
    //         return;
    //     }

    //     if (last_ad_play_time >= Date.now() - AD_INTERVAL) {
    //         onFail();
    //         return;
    //     }
    //     last_ad_play_time = Date.now() + 60000;//默认1分钟,根据广告关闭刷新
    //     _showRewardAd(onSuccess, onFail, onPlatformVersionError, false);
    // }

    /**
     * 
     * @param onSuccess 
     * @param onFail 
     * @param onPlatformVersionError 
     * @param isInnerCall 内部调用，用作SHOW_OTHER_WHEN_CURRENT_NOT_READY
     * @returns 
     */
    function _showRewardAd(onSuccess: () => void, onFail: () => void, onPlatformVersionError: () => void, isInnerCall: boolean) {

        mw.AdsService.isReady(mw.AdsType.Reward, isReady => {
            if (isReady) {
                isAdSuccess = false;
                callClearTimeout();
                timeOut = setTimeout(() => {
                    if (!isInnerCall && SHOW_OTHER_WHEN_CURRENT_NOT_READY) {
                        //超时展示另一种广告
                        _showInterstitialAd(onSuccess, onFail, onPlatformVersionError, true);
                    } else {
                        last_ad_play_time = 0;
                        onPlatformVersionError && onPlatformVersionError();
                    }
                }, PLAY_TIMEOUT);
                GeneralManager.modifyShowAd(mw.AdsType.Reward, state => {
                    callClearTimeout();
                    // TEST_ACTION.call(state);
                    switch (state) {
                        case mw.AdsState.Success:
                            break;
                        case mw.AdsState.Reward:
                            isAdSuccess = true;
                            if (!v2_version) {
                                //V1直接成功
                                lateCallback(onSuccess);
                            }
                            break;
                        case mw.AdsState.Fail:
                            if (SHOW_OTHER_WHEN_CURRENT_NOT_READY && !isInnerCall) {
                                //播放其他广告代替
                                _showInterstitialAd(onSuccess, onFail, onPlatformVersionError, true);
                            } else {
                                last_ad_play_time = 0;
                                onFail();
                            }
                            break;
                        case mw.AdsState.Close:
                            last_ad_play_time = Date.now();
                            if (isAdSuccess) {
                                lateCallback(onSuccess);
                            }
                            break;

                        default:
                            break;
                    }
                });
            } else {
                if (SHOW_OTHER_WHEN_CURRENT_NOT_READY && !isInnerCall) {
                    //播放其他广告代替
                    _showInterstitialAd(onSuccess, onFail, onPlatformVersionError, true);
                } else {
                    last_ad_play_time = 0;
                    onFail();
                }
            }
        });
    }
    /**
     * 播放全屏广告
     * @life 客户端
     * @param onSuccess 成功
     * @param onFail 失败
     * @param onPlatformVersionError 播放超时,一版是233版本过低，广告无法播放
     */
    // export function showInterstitialAd(onSuccess: () => void, onFail: () => void, onPlatformVersionError?: () => void) {
    //     if (mw.SystemUtil.isServer()) {
    //         console.warn(new Error("服务端不能播放广告").stack);
    //         return;
    //     }
    //     if (last_ad_play_time >= Date.now() - AD_INTERVAL) {
    //         onFail();
    //         return;
    //     }
    //     if (!IS_MOBILE_PLATFORM) {
    //         //PIE直接成功
    //         onSuccess();
    //         return;
    //     }
    //     last_ad_play_time = Date.now() + 60000;//默认1分钟,根据广告关闭刷新
    //     _showInterstitialAd(onSuccess, onFail, onPlatformVersionError, false);
    // }
    /**
     * 
     * @param onSuccess 
     * @param onFail 
     * @param onPlatformVersionError 
     * @param isInnerCall 内部调用，用作SHOW_OTHER_WHEN_CURRENT_NOT_READY
     * @returns 
     */
    function _showInterstitialAd(onSuccess: () => void, onFail: () => void, onPlatformVersionError: () => void, isInnerCall: boolean) {

        mw.AdsService.isReady(mw.AdsType.Interstitial, isReady => {
            if (isReady) {
                isAdSuccess = false;
                callClearTimeout();
                timeOut = setTimeout(() => {
                    if (!isInnerCall && SHOW_OTHER_WHEN_CURRENT_NOT_READY) {
                        //超时展示另一种广告
                        _showRewardAd(onSuccess, onFail, onPlatformVersionError, true);
                    } else {
                        last_ad_play_time = 0;
                        onPlatformVersionError && onPlatformVersionError();
                    }
                }, PLAY_TIMEOUT);
                GeneralManager.modifyShowAd(mw.AdsType.Interstitial, state => {
                    callClearTimeout();
                    // TEST_ACTION.call(state);
                    switch (state) {
                        case mw.AdsState.Success:
                            isAdSuccess = true;
                            if (!v2_version) {
                                //V1直接成功
                                lateCallback(onSuccess);
                            }
                            break;
                        case mw.AdsState.Fail:
                            if (SHOW_OTHER_WHEN_CURRENT_NOT_READY && !isInnerCall) {
                                //播放其他广告代替
                                _showRewardAd(onSuccess, onFail, onPlatformVersionError, true);
                            } else {
                                last_ad_play_time = 0;
                                onFail();
                            }
                            break;
                        case mw.AdsState.Close:
                            last_ad_play_time = Date.now();
                            if (isAdSuccess) {
                                lateCallback(onSuccess);
                            }
                            break;

                        default:
                            break;
                    }
                });
            } else {
                if (SHOW_OTHER_WHEN_CURRENT_NOT_READY && !isInnerCall) {
                    //播放其他广告代替
                    _showRewardAd(onSuccess, onFail, onPlatformVersionError, true);
                } else {
                    last_ad_play_time = 0;
                    onFail();
                }
            }
        });
    }
    function getMetaVersion() {
        const msgChannel = mw.MessageChannelService;
        msgChannel.registerAction("ts.ad.meta.app.info.callback.custom", IAAUtils, (data) => {
            const json = JSON.parse(data);
            if (json.data) {
                if (json.data.meta_version_code) {
                    if (json.data.app_pkg_name == "com.prodigy.game.playza") {
                        v2_version = json.data.meta_version_code >= 11400;
                    } else if (json.data.app_pkg_name == "com.meta.box") {
                        v2_version = json.data.meta_version_code >= 3630000;
                    } else {
                        v2_version = json.data.meta_version_code >= 3630000;
                    }
                }
            }
        });
        msgChannel.sendTo(
            mw.MessageChannelReceiver.Client,
            JSON.stringify({ action: "ts.ad.meta.app.info", data: { action: "ts.ad.meta.app.info.callback.custom" } })
        );
    }

    if (mw.SystemUtil.isClient()) {
        getMetaVersion();
    }
}
