@Component
export default class SetDynamic extends mw.Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            console.error("当前物体名字", this.gameObject.name);
            this.findChild(this.gameObject);
        }
    }

    /**递归查找子物体 */
    private findChild(obj: mw.GameObject): void {
        obj.netStatus;
        if (obj.getChildren().length > 0) {
            obj.getChildren().forEach((value) => {
                this.findChild(value);
            });
        }
    }
}
