/**
* 类定义，使用这个可以省去类参数繁琐的类型声明    如:fun<T>(c:{new():T}) 可以写成 fun<T>(c:Class<T>)
*/
export interface Class<T> extends Function {
    new(...args: any[]): T;
}

@UIBind('')
export class BaseView extends mw.UIScript {
    protected onAwake() {
        this.canUpdate = true;
        this.layer = mw.UILayerMiddle;
    }
    public static show(...params: any[]) {
        let panel = mw.UIService.getUI(this, true);
        panel.show(...params);
    }
    public static hide() {
        let panel = mw.UIService.getUI(this, false);
        if (panel != null) panel.hide();
    }
    public static creat<T extends mw.UIScript>(): T {
        return mw.UIService.create(this) as any as T;
    }
    /**
     * 显示Panel
     * @param params 参数，这个参数会传递到onShow生命周期中
     */
    public show(...params: any[]) {
        mw.UIService.showUI(this, this.layer, ...params);
    }
    /**
     * 关闭Panel
     */
    public hide() {
        mw.UIService.hideUI(this);
    }
    /**
     * 判断界面是否处于显示状态
     */
    public get isShow(): boolean {
        return this.visible;
    }
    private _holdBackTouch: boolean = false;
    /**
     * 是否阻挡场景点击
     */
    protected set holdBackTouch(value: boolean) {
        this._holdBackTouch = value;
    }
    protected onTouchStarted(inGemory: mw.Geometry, inPointerEvent: mw.PointerEvent): mw.EventReply {
        return this._holdBackTouch ? mw.EventReply.handled : mw.EventReply.unHandled;
    }
    /**
     * 获取当前组件下对应类型的组件
     * @param parent 当前组件
     * @param getType 想要获取的类型
     * @returns 所有符合类型的组件
     */
    protected getCanvasChildren<T extends mw.Widget>(parent: mw.Canvas, getType: Class<T>): T[] {
        const arr = [];
        const cnt = parent.getChildrenCount();
        for (let i = 0; i < cnt; i++) {
            const child = parent.getChildAt(i);
            if (child instanceof getType) {
                arr.push(child);
            }
        }
        return arr;
    }
}
/**
 * 公共模块的UI基类
 * 注意：如子类重写onAwake，onAdded方法，请调用super
 */
export class BaseUI<T extends mw.UIScript> extends BaseView {
    protected view: T;
    private viewSize: mw.Vector2;
    private viewPosition: mw.Vector2;
    private viewConstraints: mw.UIConstraintAnchors;

    /**
     * @param viewClass UI皮肤 
     */
    constructor(viewClass: Class<T>) {
        super();
        this.view = mw.UIService.create(viewClass);
    }

    protected onAwake(): void {
        super.onAwake();

        this.rootCanvas.addChild(this.view.uiObject);
        this.viewSize = this.view.uiObject.size;
        this.viewPosition = this.view.uiObject.position;
        this.viewConstraints = this.view.uiObject.constraints;

        // this.view.uiObject.slot.size = this.rootCanvas.slot.size;
        this.view.uiObject.position = mw.Vector2.zero;
        this.view.uiObject.constraints = new mw.UIConstraintAnchors(mw.UIConstraintHorizontal.LeftRight, mw.UIConstraintVertical.TopBottom);
    }

    protected onAdded() {
        this.uiObject.size = this.viewSize;
        this.uiObject.position = this.viewPosition;
        this.uiObject.constraints = this.viewConstraints;
    }

    public get uiSize(): mw.Vector2 {
        return this.viewSize;
    }

    public set uiSize(value: mw.Vector2) {
        this.viewSize = value;
        if (this.uiObject != null) {
            this.uiObject.size = value;
        }
    }
}