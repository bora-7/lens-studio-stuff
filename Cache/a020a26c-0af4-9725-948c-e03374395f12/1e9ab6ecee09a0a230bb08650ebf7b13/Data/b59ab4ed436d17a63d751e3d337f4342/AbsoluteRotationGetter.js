"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromAbsoluteRotationInput = invokeGetterFromAbsoluteRotationInput;
function invokeGetterFromAbsoluteRotationInput(inputValues) {
    const t = inputValues.so.getTransform();
    return () => Math.abs(t.getWorldRotation().toEulerAngles()
        .dot(inputValues.coef));
}
//# sourceMappingURL=AbsoluteRotationGetter.js.map