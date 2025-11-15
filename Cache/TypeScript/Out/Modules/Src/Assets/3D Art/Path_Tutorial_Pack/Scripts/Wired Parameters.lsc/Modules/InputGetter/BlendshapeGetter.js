"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromBlendshapeInput = invokeGetterFromBlendshapeInput;
function invokeGetterFromBlendshapeInput(inputValues) {
    return () => inputValues.mesh.getBlendShapeWeight(inputValues.name);
}
//# sourceMappingURL=BlendshapeGetter.js.map