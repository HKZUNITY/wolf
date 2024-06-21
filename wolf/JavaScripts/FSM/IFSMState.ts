/*
 * @Author: your name
 * @Date: 2022-03-10 10:55:30
 * @LastEditTime: 2022-03-10 11:07:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\IFSMState.ts
 */
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