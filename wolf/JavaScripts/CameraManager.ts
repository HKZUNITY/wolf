import { CameraManagerType, EventType } from "./Globals";

@Component
export default class CameraManager extends Script {
    private wfzCameraName: string = `WFZCamera`;
    private static cameraManager: CameraManager = null;
    public static get instance(): CameraManager {
        return CameraManager.cameraManager;
    }

    private cameraType: CameraManagerType = CameraManagerType.Body;
    public get wfzCamera(): mw.Camera {
        return this.gameObject as Camera;
    }

    public get isWFZCamera(): boolean {
        try {
            return Camera.currentCamera?.getCustomProperty(this.wfzCameraName) == this.wfzCameraName;
        } catch (error) {
            return false;
        }
    }

    public static async asyncReady(): Promise<void> {
        while (!this.cameraManager) {
            await TimeUtil.delaySecond(0.1);
        }
    }

    protected onStart(): void {
        this.initData();
        this.gameObject.asyncReady().then(() => {
            this.gameObject.setCustomProperty(this.wfzCameraName, this.wfzCameraName);
            CameraManager.cameraManager = this;
            this.useUpdate = true;
        });

        Event.addLocalListener(EventType.SwitchCamera, this.changeCameraType2.bind(this));
    }

    protected onUpdate(dt: number): void {
        this.follow();
    }

    private isRotCharacter: boolean = false;
    private isRotWFZCamera: boolean = false;
    private mainCamera: Camera = null;
    private defaultRotation: mw.Rotation = mw.Rotation.zero;
    private targetCharacter: Character = null;
    public switchWFZCamera(isOpenCamera: boolean, targetCharacter: Character = null, isRotWFZCamera: boolean = false, isRotCharacter: boolean = false): void {
        this.targetCharacter = targetCharacter;
        if (targetCharacter?.worldTransform?.rotation) this.defaultRotation = targetCharacter?.worldTransform?.rotation;

        this.isRotWFZCamera = isRotWFZCamera;
        this.isRotCharacter = isRotCharacter;
        TouchInputUtil.getInstance().onTouchBegin.remove(this.onTouchBegin.bind(this));
        TouchInputUtil.getInstance().onTouchMove.remove(this.onTouchMove.bind(this));

        if (isOpenCamera) {
            if (isRotWFZCamera || isRotCharacter) {
                TouchInputUtil.getInstance().onTouchBegin.add(this.onTouchBegin.bind(this));
                TouchInputUtil.getInstance().onTouchMove.add(this.onTouchMove.bind(this));
            }

            if (this.isWFZCamera) return;
            this.mainCamera = Camera.currentCamera;
            Camera.switch(this.wfzCamera);
            const size = mw.getViewportSize();
            if (size.x >= size.y) {
                this.wfzCamera.aspectRatioAxisConstraint = mw.AspectRatioAxisConstraint.MaintainXFOV;
            } else {
                this.wfzCamera.aspectRatioAxisConstraint = mw.AspectRatioAxisConstraint.MaintainYFOV;
            }
        } else {
            if (this.mainCamera && this.isWFZCamera) {
                Camera.switch(this.mainCamera);
                this.mainCamera = null;
            }
        }
        this.useUpdate = isOpenCamera;
    }

    public worldRotation(rotation: number[]): void {
        this.wfzCamera.parent.worldTransform.rotation = new mw.Rotation(rotation[0], rotation[1], rotation[2]);
    }

    /**上一帧的挂点位置 */
    private oldSlotPos = mw.Vector.zero
    private follow(): void {
        if (!this.targetCharacter) return
        let slotPos = CameraData.getTargetPos(this.targetCharacter, this.cameraData)
        if (!slotPos) return

        this.oldSlotPos = slotPos
        this.wfzCamera.parent.worldTransform.position = slotPos
    }

    private cameraData: CameraData = new CameraData()
    public setData(cameraData: CameraData): void {
        this.wfzCamera.springArm.length = cameraData.l;
        let rot = this.wfzCamera.localTransform.rotation;
        this.wfzCamera.fov = cameraData.fov;

        let rotY = cameraData.fov * cameraData.v;
        this.wfzCamera.localTransform.rotation = new mw.Rotation(rot.x, rotY, cameraData.fov * cameraData.h);

        if (this.targetCharacter) this.wfzCamera.parent.worldTransform.rotation = new mw.Rotation(0, 0, this.targetCharacter.worldTransform.rotation.z + 180);
    }

    public setValue(name: string, value: number): void {
        this.cameraData[name] = value;
        this.setData(this.cameraData);
    }

    public E_Head_H: CameraData = new CameraData();
    public E_Body_H: CameraData = new CameraData();
    public E_Head_V: CameraData = new CameraData();
    public E_Body_V: CameraData = new CameraData();

    public initData(): void {
        this.E_Body_H.l = 500
        this.E_Body_H.fov = 45
        this.E_Body_H.targetType = TargetType.WorldPos
        this.E_Body_H.h = 0.25
        this.E_Body_H.v = 0


        this.E_Head_V = { "h": 0, "v": -0.1, "targetType": 1, "slot": 1, "l": 260, "fov": 45, "offset": Vector.zero }
        this.E_Body_V = { "h": 0, "v": -0.13, "targetType": 2, "slot": 1, "l": 2500, "fov": 18, "offset": Vector.zero }
    }

    /**切换相机模式，如果值为空就使用当前的相机数据 */
    private changeCameraType2(avatarCameraType: CameraManagerType): void {
        if (this.targetCharacter?.worldTransform) this.targetCharacter.worldTransform.rotation = this.defaultRotation;
        if (CameraManagerType[avatarCameraType]) {
            this.cameraType = avatarCameraType;
        } else if (CameraManagerType[this.cameraType]) {
        } else {
            this.cameraType = CameraManagerType.Body;
        }

        let cameraData: CameraData = this.getCameraDataByType(avatarCameraType);
        this.cameraData.l = cameraData.l;
        this.cameraData.fov = cameraData.fov;
        this.cameraData.slot = cameraData.slot;
        this.cameraData.targetType = cameraData.targetType;
        this.cameraData.h = cameraData.h;
        this.cameraData.v = cameraData.v;
        this.cameraData.offset = cameraData.offset;
        this.setData(cameraData);
    }

    private getCameraDataByType(avatarCameraType: CameraManagerType): CameraData {
        let size = mw.getViewportSize();
        if (size.x < size.y) {
            switch (avatarCameraType) {
                case CameraManagerType.Head:
                    return this.E_Head_V;
                default:
                    return this.E_Body_V;
            }
        } else {
            switch (avatarCameraType) {
                case CameraManagerType.Head:
                    return this.E_Head_H;
                default:
                    return this.E_Body_H;
            }
        }
    }

    /**触摸缓存 */
    private lastTouchPos: mw.Vector2 = mw.Vector2.zero;
    private onTouchBegin = (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
        this.lastTouchPos = location;
    }

    private onTouchMove = (index, loc, type) => {
        if (this.isWFZCamera && this.targetCharacter) {
            if (index == 0) {
                let rot = this.wfzCamera.parent.worldTransform.rotation;
                let z = loc.x - this.lastTouchPos.x;
                this.lastTouchPos = loc;
                if (Math.abs(z) > 80) return;
                //旋转角色
                if (this.isRotCharacter) {
                    const rot = this.targetCharacter.worldTransform.rotation;
                    rot.z -= z;
                    this.targetCharacter.worldTransform.rotation = rot;
                }
                //旋转相机
                if (this.isRotWFZCamera) this.worldRotation([rot.x, rot.y, rot.z + z]);
            }
        }
    }
}

enum TargetType {
    /**插槽 */
    slot = 1,
    /**世界坐标 */
    WorldPos = 2,
}

class CameraData {
    /**横向fov比例角度 */
    h: number = 0.25
    /**垂直fov比例角度 */
    v: number = 0
    /**1角色插槽，2世界坐标 */
    targetType: TargetType = TargetType.slot
    slot: mw.HumanoidSlotType = mw.HumanoidSlotType.Head
    /**弹簧臂长度 */
    l: number = 250
    fov: number = 45
    /**偏移值 */
    offset: Vector = Vector.zero
    static getTargetPos(char: Character, data: CameraData): mw.Vector {
        let pos = data.offset.clone();
        switch (data.targetType) {
            case TargetType.slot:
                let v3 = char?.getSlotWorldPosition(data.slot);
                if (v3) pos.add(v3);
                break;
            case TargetType.WorldPos:
                pos.add(char.worldTransform.position);
                break;
            default:
                break;
        }
        return pos;
    }
}