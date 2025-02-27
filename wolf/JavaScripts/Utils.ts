export default class Utils {
    public static async asyncDownloadAsset(InAssetId: string): Promise<void> {
        if (!mw.AssetUtil.assetLoaded(InAssetId)) {
            await mw.AssetUtil.asyncDownloadAsset(InAssetId);
        }
    }

    public static async asyncDownloadAssets(InAssetIds: string[]): Promise<void> {
        for (let i = 0; i < InAssetIds.length; ++i) {
            if (mw.AssetUtil.assetLoaded(InAssetIds[i])) continue;
            await mw.AssetUtil.asyncDownloadAsset(InAssetIds[i]);
        }
    }

    public static setWidgetVisibility(ui: mw.Widget, visibility: mw.SlateVisibility): void {
        if (ui.visibility != visibility) ui.visibility = visibility;
    }

    public static copyArray(array: any[]): any[] {
        let newArray: any[] = [];
        for (let i = 0; i < array.length; ++i) {
            newArray.push(array[i]);
        }
        return newArray;
    }

    private static inColorHexStrMap: Map<string, mw.LinearColor> = new Map<string, mw.LinearColor>();
    public static colorHexToLinearColorToString(inColorHex: string): mw.LinearColor {
        if (this.inColorHexStrMap.has(inColorHex)) return this.inColorHexStrMap.get(inColorHex);
        let inColorHexLinearColor = mw.LinearColor.colorHexToLinearColor(inColorHex);
        this.inColorHexStrMap.set(inColorHex, inColorHexLinearColor);
        return inColorHexLinearColor;
    }

    public static isEqulaLinearColor(linearColor1: mw.LinearColor, linearColor2: mw.LinearColor): boolean {
        if (linearColor1.r.toFixed(5) != linearColor2.r.toFixed(5)) return false;
        if (linearColor1.g.toFixed(5) != linearColor2.g.toFixed(5)) return false;
        if (linearColor1.b.toFixed(5) != linearColor2.b.toFixed(5)) return false;
        if (linearColor1.a.toFixed(5) != linearColor2.a.toFixed(5)) return false;
        return true;
    }

    public static stringArrayToTransform(strArray: string[]): mw.Transform {
        let transform = new mw.Transform();
        if (!strArray || strArray.length != 9) return transform;
        transform.position = new mw.Vector(Number(strArray[0]), Number(strArray[1]), Number(strArray[2]));
        transform.rotation = new mw.Rotation(Number(strArray[3]), Number(strArray[4]), Number(strArray[5]));
        transform.scale = new mw.Vector(Number(strArray[6]), Number(strArray[7]), Number(strArray[8]));
        return transform;
    }

    public static accountServiceDownloadData(character: mw.Character): Promise<boolean> {
        return new Promise(async (resolve: (isSuccess: boolean) => void) => {
            mw.AccountService.downloadData(character, async (success: boolean) => {
                return resolve(success);
            });
        });
    }
}