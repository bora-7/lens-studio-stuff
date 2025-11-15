"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeSetterFromAssetInput = invokeSetterFromAssetInput;
const PropertyPathParser_1 = require("../Utils/PropertyPathParser");
function invokeSetterFromAssetInput(inputValues) {
    let manipulatingObject = inputValues.asset;
    if (manipulatingObject.getTypeName() === 'Asset.Material') {
        manipulatingObject = inputValues.asset.mainPass;
    }
    return (v, lerp = 1.0) => {
        const targetValue = inputValues.lerp(inputValues.from, inputValues.to, v);
        const result = inputValues.lerp(PropertyPathParser_1.PropertyPathParser.get(manipulatingObject, inputValues.property), targetValue, lerp);
        PropertyPathParser_1.PropertyPathParser.set(manipulatingObject, inputValues.property, result);
        return result;
    };
}
//# sourceMappingURL=AssetSetter.js.map