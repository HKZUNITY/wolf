/*
 * @Author: your name
 * @Date: 2022-03-10 10:56:06
 * @LastEditTime: 2022-03-10 11:13:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\FSMManager.ts
 */
import { GamingState } from "../Globals";
import { IFSMState } from "./IFSMState";
export default class FSMManager {
    private static _mInstance: FSMManager;
    public static get Instance(): FSMManager {
        if (FSMManager._mInstance == null) {
            FSMManager._mInstance = new FSMManager();
        }
        return FSMManager._mInstance;
    }
    private _mCurrentState: IFSMState;
    public get CurrentState(): IFSMState {
        return this._mCurrentState;
    }
    public ChangeState(n: { new(...args: any[]): IFSMState }, ...params: any[]): void {
        if (this._mCurrentState) {
            this._mCurrentState.Exit();
            this._mCurrentState = null;
        }
        let newState = new n(params);
        this._mCurrentState = newState;
        newState.Enter();
    }
}