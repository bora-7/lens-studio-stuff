"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeSetterFromAtlasInput = invokeSetterFromAtlasInput;
function invokeSetterFromAtlasInput(inputValues) {
    const animatedProvider = inputValues.texture.control;
    const totalFrames = animatedProvider.getFramesCount();
    return (v, lerp = 1.0) => {
        const targetValue = MathUtils.lerp(inputValues.from, inputValues.to, v);
        const currentValue = animatedProvider.getCurrentPlayingFrame();
        let lerpValue = Math.round(MathUtils.lerp(currentValue, targetValue, lerp));
        if (inputValues.yoyo) {
            lerpValue = Math.abs(lerpValue);
        }
        else if (lerpValue < 0) {
            lerpValue += (Math.floor(-lerpValue / totalFrames) + 1) * totalFrames;
        }
        animatedProvider.pauseAtFrame(lerpValue);
        return lerpValue;
    };
}
//# sourceMappingURL=AtlasSetter.js.map