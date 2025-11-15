"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromFaceExpressionInput = invokeGetterFromFaceExpressionInput;
function invokeGetterFromFaceExpressionInput(inputValues) {
    return () => {
        if (inputValues.head.getFacesCount() > inputValues.head.faceIndex) {
            return inputValues.face.getExpressionWeightByName(inputValues.expression);
        }
    };
}
//# sourceMappingURL=FaceExpressionGetter.js.map