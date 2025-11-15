"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromSODistanceInput = invokeGetterFromSODistanceInput;
function invokeGetterFromSODistanceInput(inputValues) {
    const fromT = inputValues.from.getTransform(), toT = inputValues.to.getTransform();
    return () => fromT.getWorldPosition().distance(toT.getWorldPosition());
}
//# sourceMappingURL=SODistanceGetter.js.map