export class DanMuItem {
    public textBlock: mw.TextBlock;
    public run: boolean;
    public pos: mw.Vector2;
    public size: mw.Vector2;
}

export class ChatData {
    public chats: string[];
    public chatChilds: string[][];
}

export class ActionData {
    public tab: number;
    public icon: string;
    public assetId: string;
    public names: string[];
    public loop: number;
}