export interface IFSMState {
    /**
     * 进入状态
     */
    Enter(): void;
    /**
     * 退出状态
     */
    Exit(): void;
}