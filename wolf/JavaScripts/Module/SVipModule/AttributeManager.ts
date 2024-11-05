import { GameConfig } from "../../Tables/GameConfig";

export default class AttributeManager {
    private static _instance: AttributeManager;
    public static get instance(): AttributeManager {
        if (this._instance == null) {
            this._instance = new AttributeManager();
        }
        return this._instance;
    }

    private attributeMap: Map<number, Attribute> = new Map<number, Attribute>();

    public setAttributeValue(playerId: number, attributeName: AttributeType, param: number) {
        /**为了避免离开的玩家还能够设置数据，导致服务端存储无用数据这里加一个判断 */
        let playerIndex = Player.getAllPlayers().findIndex((value) => {
            return value.playerId == playerId;
        })
        if (playerIndex < 0) {
            console.warn("oTraceWarning: setAttributeValue player is not in game", playerId);
            return;
        }
        let attribute = this.getAttribute(playerId);
        switch (attributeName) {
            case AttributeType.SpyRate:
                attribute.spyRate = param;
                break;
            case AttributeType.GoldContainer:
                attribute.goldContainer = param;
                break;
            case AttributeType.CalculateGoldAdd:
                attribute.calculateGoldAdd = param;
                break;
            case AttributeType.FlyKnifeSpeed:
                attribute.flySpeed = param;
                break;
            case AttributeType.ShowSpecialName:
                attribute.showSpecialName = param;
        }
    }

    public getAttributeValue(playerId: number, attributeName: AttributeType) {
        let playerIndex = Player.getAllPlayers().findIndex((value) => {
            return value.playerId == playerId;
        })
        if (playerIndex < 0) {
            console.warn("oTraceWarning: setAttributeValue player is not in game", playerId);
            return -1;
        }
        let attribute = this.getAttribute(playerId);
        switch (attributeName) {
            case AttributeType.SpyRate:
                return attribute.spyRate;
            case AttributeType.GoldContainer:
                return attribute.goldContainer;
            case AttributeType.CalculateGoldAdd:
                return attribute.calculateGoldAdd;
            case AttributeType.FlyKnifeSpeed:
                return attribute.flySpeed;
            case AttributeType.ShowSpecialName:
                return attribute.showSpecialName;
        }
    }

    private getAttribute(playerId: number) {
        let attribute = this.attributeMap.get(playerId);
        if (!attribute) {
            attribute = new Attribute();
            this.attributeMap.set(playerId, attribute);
        }
        return attribute;
    }

    public deleteAttribute(playerId: number) {
        if (this.attributeMap.has(playerId)) {
            this.attributeMap.delete(playerId);
        }
    }
}

export class Attribute {
    public spyRate: number = 0;
    public goldContainer: number = 0;
    public calculateGoldAdd: number = 0;
    public flySpeed: number = 0;
    public showSpecialName: number = 0;
    constructor() {
        this.spyRate = 0;
        this.goldContainer = 0;
        this.calculateGoldAdd = 0;
        this.flySpeed = GameConfig.Rule.getElement(20002).Num;
        this.showSpecialName = 0;
    }
}

export enum AttributeType {
    ShowSpecialName = 1,
    CalculateGoldAdd = 2,
    GoldContainer = 3,
    SpyRate = 4,
    /**技能相关的从100开始 */
    FlyKnifeSpeed = 100,
}