@Component
export default class SetDynamic extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            console.error("当前物体名字", this.gameObject.name);
            
            this.findChild(this.gameObject);
        }
    }

    /**
     * 递归查找子物体
     */
    private findChild(obj:mw.GameObject): void {
        obj.netStatus;
        if (obj.getChildren().length > 0) {
            obj.getChildren().forEach((value)=>{
                
                this.findChild(value);
            })
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}
