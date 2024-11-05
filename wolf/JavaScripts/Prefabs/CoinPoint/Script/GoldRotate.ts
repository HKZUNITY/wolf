@Component
export default class Gold extends mw.Script {
    @mw.Property({ replicated: true, onChanged: "OnGoldObjChange" })
    goldObjGuid: string

    clientGoldObj: mw.GameObject

    protected onStart(): void {
        this.getChild()
    }

    @RemoteFunction(mw.Server)
    getChild() {
        this.goldObjGuid = this.gameObject.getChildren()[0].gameObjectId
    }

    OnGoldObjChange() {
        GameObject.asyncFindGameObjectById(this.goldObjGuid).then((obj: mw.GameObject) => {
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
        this.clientGoldObj.worldTransform.rotation = temp.add(new mw.Rotation(new mw.Vector(0, 0, 90 * dt)))
    }
}