"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeSetterFromComponentInput = invokeSetterFromComponentInput;
const PropertyPathParser_1 = require("../Utils/PropertyPathParser");
function invokeSetterFromComponentInput(inputValues) {
    return (v, lerp = 1.0) => {
        const targetValue = inputValues.lerp(inputValues.from, inputValues.to, v);
        const result = inputValues.lerp(inputValues.component[inputValues.property], targetValue, lerp);
        PropertyPathParser_1.PropertyPathParser.set(inputValues.component, inputValues.property, result);
        return result;
    };
}
//# sourceMappingURL=ComponentSetter.js.map