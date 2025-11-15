"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformManipulatorBuilder = exports.TransformProperty = void 0;
const TransformManipulators_1 = require("./TransformManipulators");
var TransformProperty;
(function (TransformProperty) {
    TransformProperty[TransformProperty["WorldPosition"] = 0] = "WorldPosition";
    TransformProperty[TransformProperty["WorldRotation"] = 1] = "WorldRotation";
    TransformProperty[TransformProperty["WorldScale"] = 2] = "WorldScale";
    TransformProperty[TransformProperty["LocalPosition"] = 3] = "LocalPosition";
    TransformProperty[TransformProperty["LocalRotation"] = 4] = "LocalRotation";
    TransformProperty[TransformProperty["LocalScale"] = 5] = "LocalScale";
    TransformProperty[TransformProperty["WorldRotationSinus"] = 6] = "WorldRotationSinus";
    TransformProperty[TransformProperty["LocalRotationSinus"] = 7] = "LocalRotationSinus";
})(TransformProperty || (exports.TransformProperty = TransformProperty = {}));
class TransformManipulatorBuilder {
    static get(t, p, worldShift = vec3.zero(), localShift = vec3.zero()) {
        switch (p) {
            case TransformProperty.WorldPosition:
                return new TransformManipulators_1.WorldPositionManipulator(t);
            case TransformProperty.WorldScale:
                return new TransformManipulators_1.WorldScaleManipulator(t);
            case TransformProperty.WorldRotation:
                return new TransformManipulators_1.WorldRotationManipulator(t);
            case TransformProperty.LocalPosition:
                return new TransformManipulators_1.LocalPositionManipulator(t);
            case TransformProperty.LocalScale:
                return new TransformManipulators_1.LocalScaleManipulator(t);
            case TransformProperty.LocalRotation:
                return new TransformManipulators_1.LocalRotationManipulator(t);
            case TransformProperty.WorldRotationSinus:
                return new TransformManipulators_1.WorldRotationManipulatorSinus(t, worldShift.uniformScale(MathUtils.DegToRad));
            case TransformProperty.LocalRotationSinus:
                return new TransformManipulators_1.LocalRotationManipulatorSinus(t, localShift.uniformScale(MathUtils.DegToRad));
            default:
                const check = p;
        }
    }
}
exports.TransformManipulatorBuilder = TransformManipulatorBuilder;
//# sourceMappingURL=TransformManipulatorBuilder.js.map