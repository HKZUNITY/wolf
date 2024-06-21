/** 
 * @Author       : songyang.xie
 * @Date         : 2023-02-01 14:01:59
 * @LastEditors  : songyang.xie
 * @LastEditTime : 2023-02-01 15:17:41
 * @FilePath     : \townmystery\Prefabs\CoinPoint\Script\GoldRotate.ts
 * @Description  : 修改描述
 */

import { CoinState } from "../../../../JavaScripts/Module/ProcModule/CoinObj";

@Component
export default class Gold extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    @mw.Property({replicated: true, onChanged:"OnGoldObjChange"})
    goldObjGuid: string
    clientGoldObj: mw.GameObject
    protected onStart(): void {
        this.getChild()
    }
    @RemoteFunction(mw.Server)
    getChild(){
        this.goldObjGuid = this.gameObject.getChildren()[0].gameObjectId
    }
    OnGoldObjChange(){
        GameObject.asyncFindGameObjectById(this.goldObjGuid).then((obj: mw.GameObject)=>{
            this.clientGoldObj = obj
            this.useUpdate = true
        })
    }
    @RemoteFunction(mw.Client)
    protected onUpdate(dt: number): void {
        if (this.clientGoldObj == null) {
            return
        }
        let temp = this.clientGoldObj.worldTransform.rotation.clone()
        this.clientGoldObj.worldTransform.rotation = temp.add(new mw.Rotation(new mw.Vector(0, 0, 90* dt)))
    }
}