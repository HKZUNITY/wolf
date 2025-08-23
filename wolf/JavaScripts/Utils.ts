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

export function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;
    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
    }
    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }
    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy) * t;
    }
    function solveCurveX(x) {
        let t2 = x;
        let derivative;
        let x2;
        for (let i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }
        let t1 = 1;
        let t0 = 0;
        t2 = x;
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }
        return t2;
    }
    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }
    return solve;
}