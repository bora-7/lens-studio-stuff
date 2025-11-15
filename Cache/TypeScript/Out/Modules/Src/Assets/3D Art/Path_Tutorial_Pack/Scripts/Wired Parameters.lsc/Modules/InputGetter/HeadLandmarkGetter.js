"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromHeadLandmarkInput = invokeGetterFromHeadLandmarkInput;
function invokeGetterFromHeadLandmarkInput(inputValues) {
    return () => {
        if (inputValues.head.getFacesCount() > inputValues.head.faceIndex) {
            return inputValues.head.getLandmark(inputValues.landmark)[inputValues.axis];
        }
    };
}
//# sourceMappingURL=HeadLandmarkGetter.js.map