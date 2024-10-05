import SetPanel_Generate from "../../ui-generate/module/SetModule/SetPanel_generate";

export class SetPanel extends SetPanel_Generate {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mProgressBar.currentValue = 1;
        this.mTextBlock.text = `背景音乐大小：${(this.mProgressBar.currentValue * 100).toFixed(0)}`;
        this.bindButton();
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(() => {
            this.hide();
        });
        this.mProgressBar.onSliderValueChanged.add((v: number) => {
            this.mProgressBar.currentValue = v;
            this.mTextBlock.text = `背景音乐大小：${(v * 100).toFixed(0)}`;
            SoundService.BGMVolumeScale = v;
        });
    }
}


export class SetModuleC extends ModuleC<SetModuleS, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

}


export class SetModuleS extends ModuleS<SetModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

}