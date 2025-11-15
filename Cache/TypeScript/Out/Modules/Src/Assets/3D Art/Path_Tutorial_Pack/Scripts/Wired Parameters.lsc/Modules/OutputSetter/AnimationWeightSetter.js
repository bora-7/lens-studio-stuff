"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeSetterFromAnimationWeightInput = invokeSetterFromAnimationWeightInput;
function invokeSetterFromAnimationWeightInput(inputValues) {
    const layer = inputValues.mixer.getLayer(inputValues.layer);
    return (v, lerp = 1.0) => {
        const targetValue = MathUtils.lerp(inputValues.from, inputValues.to, v);
        const currentValue = layer.weight;
        const result = MathUtils.lerp(currentValue, targetValue, lerp);
        layer.weight = result;
        return result;
    };
}
//# sourceMappingURL=AnimationWeightSetter.js.map