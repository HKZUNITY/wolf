@Component
export default class FreeCamera extends Script {

    static readonly EVENTS_JOYSTICK_INPUT = "FreeCamera.EVENTS_JOYSTICK_INPUT";

    /** 摄像机锚点移动速度 */
    public speed = 500;

    /** 移动叠加向量 */
    private _moveDirection: Vector = Vector.zero;
    /** 移动临时位置 */
    private _moveLoc: Vector = Vector.zero;
    /** 比值用常量 */
    private readonly VECTOR_ZERO = Vector.zero;

    /** 是否处于自由视角状态 */
    public isFreeCamera = false;
    /** 原游戏摄像机 */
    protected originCamera: Camera;
    /** 自由视角摄像机 */
    protected freeCamera: Camera;

    protected isFirstChange = true;

    protected onStart(): void {
        this.init();
    }

    private async init() {
        if (SystemUtil.isServer()) return;
        await (await Player.asyncGetLocalPlayer()).character.asyncReady();
        this.freeCamera = await GameObject.asyncSpawn("Camera") as Camera;
        this.freeCamera.springArm.localTransform = Transform.identity;
        // Config
        this.freeCamera.upAngleLimit = 89.9;
        this.freeCamera.downAngleLimit = 89.9;
        this.freeCamera.localTransform = Transform.identity;
        this.freeCamera.springArm.localTransform = Transform.identity;
        this.freeCamera.springArm.length = 0;
        this.freeCamera.springArm.collisionEnabled = false;

        InputUtil.onKeyDown(Keys.F8, () => {
            if (this.isFreeCamera) {
                this.exitFreeCamera();
            } else {
                this.enterFreeCamera();
            }
        });
        InputUtil.onKeyDown(Keys.NumPadNine, () => {
            this.freeCamera.springArm.worldTransform.position = Player.localPlayer.character.worldTransform.position.clone();
            this._moveLoc = this.freeCamera.springArm.worldTransform.position.clone();
        });

        Event.addLocalListener(FreeCamera.EVENTS_JOYSTICK_INPUT, (dir: Vector2) => {
            if (this.freeCamera) {
                const forward = this.freeCamera.worldTransform.clone().getForwardVector().clone();
                const right = this.freeCamera.worldTransform.clone().getRightVector().clone();
                this._moveDirection.set(forward.multiply(dir.y).add(right.multiply(dir.x)))
                Vector.add(this._moveLoc, this._moveDirection.normalized.multiply(this.speed * 0.02), this._moveLoc);
                this.freeCamera.springArm.worldTransform.position = this._moveLoc;
                // 避免重复使用
                if (this.useUpdate) this.useUpdate = false;
            }
        })

        KeyActionManager.instance.add([Keys.W, Keys.S, Keys.A, Keys.D, Keys.E, Keys.Q]);
    }

    /**
     * 切换至自由视角摄像机（暂未提供触屏控制方式）
     */
    public enterFreeCamera() {
        if (!this.originCamera) {
            this.originCamera = Camera.currentCamera;
        }
        if (this.isFirstChange) {
            this.freeCamera.springArm.worldTransform.position = Player.localPlayer.character.worldTransform.position.clone();
            this._moveLoc = this.freeCamera.springArm.worldTransform.position.clone();
            this.isFirstChange = false;
        }
        Camera.switch(this.freeCamera, 0);
        this.originCamera.springArm.useControllerRotation = false;
        this.freeCamera.springArm.useControllerRotation = true;
        Player.localPlayer.character.movementEnabled = false;
        this.isFreeCamera = true;
        this.useUpdate = true;
    }

    /**
     * 退出自由视角摄像机
     */
    public exitFreeCamera() {
        if (!this.isFreeCamera) return;
        Camera.switch(this.originCamera, 0);
        this.originCamera.springArm.useControllerRotation = true;
        this.freeCamera.springArm.useControllerRotation = false;
        Player.localPlayer.character.movementEnabled = true;
        this.isFreeCamera = false;
        this.useUpdate = false;
    }

    protected onUpdate(dt: number): void {
        // 监听按键并叠加控制锚点位移的向量
        if (KeyActionManager.instance.isPress(Keys.W)) {
            // 将三维向量压缩至二维使用
            const forward = this.freeCamera.worldTransform.clone().getForwardVector().clone();
            this._moveDirection.x += forward.x;
            this._moveDirection.y += forward.y;
        }
        if (KeyActionManager.instance.isPress(Keys.S)) {
            const back = this.freeCamera.worldTransform.clone().getForwardVector().clone().multiply(-1);
            this._moveDirection.x += back.x;
            this._moveDirection.y += back.y;
        }
        if (KeyActionManager.instance.isPress(Keys.A)) {
            const left = this.freeCamera.worldTransform.clone().getRightVector().clone().multiply(-1);
            this._moveDirection.x += left.x;
            this._moveDirection.y += left.y;
        }
        if (KeyActionManager.instance.isPress(Keys.D)) {
            const right = this.freeCamera.worldTransform.clone().getRightVector().clone();
            this._moveDirection.x += right.x;
            this._moveDirection.y += right.y;
        }
        if (KeyActionManager.instance.isPress(Keys.E)) {
            this._moveDirection.z += 1;
        }
        if (KeyActionManager.instance.isPress(Keys.Q)) {
            this._moveDirection.z -= 1;
        }

        // 为锚点设置叠加后向量，实现无限制位移
        if (!this._moveDirection.equals(this.VECTOR_ZERO)) {
            Vector.add(this._moveLoc, this._moveDirection.normalized.multiply(this.speed * dt), this._moveLoc);
            this.freeCamera.springArm.worldTransform.position = this._moveLoc;
            this._moveDirection.x = 0;
            this._moveDirection.y = 0;
            this._moveDirection.z = 0;
        }
    }

}

/**
 * 按键状态管理器
 */
class KeyActionManager {

    private static _instance: KeyActionManager;
    public static get instance(): KeyActionManager {
        if (!KeyActionManager._instance) {
            KeyActionManager._instance = new KeyActionManager();
        }
        return KeyActionManager._instance;
    }

    /** 初始化标记 */
    public isReady: boolean = false;

    /** 按下状态表 */
    private _actionStates: Map<Keys, boolean> = new Map<Keys, boolean>;
    private _btnStates: Map<string, boolean> = new Map<string, boolean>;

    /**
     * 检测按键是否被按下，无延迟（需要在update中调用，留意性能开销）
     * @param action 项目内按键操作枚举
     * @returns 是否被按下
     */
    public isPress(action: Keys | mw.Button): boolean {
        if (action instanceof mw.Button) {
            return this._btnStates.get(action.guid);
        } else {
            return this._actionStates.get(action);
        }
    }

    /**
     * 为指定按钮添加状态监听
     * @param btn 需要监听状态的按钮
     */
    public add(btn: Button | Keys[]) {
        // 初始化按下状态 并设定状态改变监听
        if (btn instanceof Button) {
            this._btnStates.set(btn.guid, false);
            btn.onPressed.add(() => {
                this._btnStates.set(btn.guid, true);
            })
            btn.onReleased.add(() => {
                this._btnStates.set(btn.guid, false);
            })
        } else {
            btn.forEach(element => {
                this._actionStates.set(element, false);
                InputUtil.onKeyDown(element, () => {
                    this._actionStates.set(element, true);
                })
                InputUtil.onKeyUp(element, () => {
                    this._actionStates.set(element, false);
                })
            });
        }

    }

}