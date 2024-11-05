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