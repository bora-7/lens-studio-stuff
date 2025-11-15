"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGetterFromComponentInput = invokeGetterFromComponentInput;
const PropertyPathParser_1 = require("../Utils/PropertyPathParser");
function invokeGetterFromComponentInput(inputValue) {
    return () => PropertyPathParser_1.PropertyPathParser.get(inputValue.component, inputValue.propertyName);
}
//# sourceMappingURL=ComponentGetter.js.map