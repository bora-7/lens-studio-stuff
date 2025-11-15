"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromTransformInput = invokeGetterFromTransformInput;
const TransformManipulatorBuilder_1 = require("../TransformManipulator/TransformManipulatorBuilder");
function invokeGetterFromTransformInput(inputValues) {
    const t = inputValues.so.getTransform();
    const manipulator = TransformManipulatorBuilder_1.TransformManipulatorBuilder.get(t, inputValues.property);
    return () => manipulator.get()[inputValues.axis];
}
//# sourceMappingURL=TransformGetter.js.map