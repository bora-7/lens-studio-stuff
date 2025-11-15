"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromBodyLandmarkDistanceInput = invokeGetterFromBodyLandmarkDistanceInput;
function invokeGetterFromBodyLandmarkDistanceInput(inputValues) {
    return () => inputValues.body.getPosition(inputValues.landmarkFrom)
        .distance(inputValues.body.getPosition(inputValues.landmarkTo));
}
//# sourceMappingURL=BodyLandmarkDistanceGetter.js.map