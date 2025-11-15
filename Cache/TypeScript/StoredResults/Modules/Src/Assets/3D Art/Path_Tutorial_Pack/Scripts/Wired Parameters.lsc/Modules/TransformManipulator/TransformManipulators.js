"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldRotationManipulatorSinus = exports.LocalRotationManipulatorSinus = exports.LocalRotationManipulator = exports.WorldRotationManipulator = exports.LocalScaleManipulator = exports.WorldScaleManipulator = exports.LocalPositionManipulator = exports.WorldPositionManipulator = exports.BaseTransformManipulator = void 0;
const AngleUtils_1 = require("../Utils/AngleUtils");
class BaseTransformManipulator {
    constructor(t) {
        this.t = t;
    }
}
exports.BaseTransformManipulator = BaseTransformManipulator;
class WorldPositionManipulator extends BaseTransformManipulator {
    get() {
        return this.t.getWorldPosition();
    }
    set(v) {
        this.t.setWorldPosition(v);
    }
}
exports.WorldPositionManipulator = WorldPositionManipulator;
class LocalPositionManipulator extends BaseTransformManipulator {
    get() {
        return this.t.getLocalPosition();
    }
    set(v) {
        this.t.setLocalPosition(v);
    }
}
exports.LocalPositionManipulator = LocalPositionManipulator;
class WorldScaleManipulator extends BaseTransformManipulator {
    get() {
        return this.t.getWorldScale();
    }
    set(v) {
        this.t.setWorldScale(v);
    }
}
exports.WorldScaleManipulator = WorldScaleManipulator;
class LocalScaleManipulator extends BaseTransformManipulator {
    get() {
        return this.t.getLocalScale();
    }
    set(v) {
        this.t.setLocalScale(v);
    }
}
exports.LocalScaleManipulator = LocalScaleManipulator;
class WorldRotationManipulator extends BaseTransformManipulator {
    get() {
        const eulerAngles = this.t.getWorldRotation().toEulerAngles();
        const eulerAnglesDegrees = AngleUtils_1.AngleUtils.eulerAnglesToDegrees(eulerAngles);
        eulerAnglesDegrees.x = AngleUtils_1.AngleUtils.clampAngleDegrees(eulerAnglesDegrees.x);
        eulerAnglesDegrees.y = AngleUtils_1.AngleUtils.clampAngleDegrees(eulerAnglesDegrees.y);
        eulerAnglesDegrees.z = AngleUtils_1.AngleUtils.clampAngleDegrees(eulerAnglesDegrees.z);
        return eulerAnglesDegrees;
    }
    set(rotation) {
        const eulerAnglesRadians = AngleUtils_1.AngleUtils.eulerAnglesToRadians(rotation);
        const quatRotation = quat.fromEulerVec(eulerAnglesRadians);
        this.t.setWorldRotation(quatRotation);
    }
}
exports.WorldRotationManipulator = WorldRotationManipulator;
class LocalRotationManipulator extends BaseTransformManipulator {
    get() {
        const eulerAngles = this.t.getLocalRotation().toEulerAngles();
        const eulerAnglesDegrees = AngleUtils_1.AngleUtils.eulerAnglesToDegrees(eulerAngles);
        eulerAnglesDegrees.x = AngleUtils_1.AngleUtils.clampAngleDegrees(eulerAnglesDegrees.x);
        eulerAnglesDegrees.y = AngleUtils_1.AngleUtils.clampAngleDegrees(eulerAnglesDegrees.y);
        eulerAnglesDegrees.z = AngleUtils_1.AngleUtils.clampAngleDegrees(eulerAnglesDegrees.z);
        return eulerAnglesDegrees;
    }
    set(rotation) {
        const eulerAnglesRadians = AngleUtils_1.AngleUtils.eulerAnglesToRadians(rotation);
        const quatRotation = quat.fromEulerVec(eulerAnglesRadians);
        this.t.setLocalRotation(quatRotation);
    }
}
exports.LocalRotationManipulator = LocalRotationManipulator;
class LocalRotationManipulatorSinus extends BaseTransformManipulator {
    constructor(t, shift) {
        super(t);
        this.t = t;
        this.shift = shift;
    }
    get() {
        const shiftedEulerAngles = this.t.getLocalRotation().toEulerAngles()
            .add(this.shift);
        return AngleUtils_1.AngleUtils.eulerAnglesToSin(shiftedEulerAngles);
    }
    set(v) {
        const arcsinEulerAngles = AngleUtils_1.AngleUtils.eulerAnglesToArcsin(v.sub(this.shift));
        const arcsinRotation = quat.fromEulerVec(arcsinEulerAngles);
        this.t.setLocalRotation(arcsinRotation);
    }
}
exports.LocalRotationManipulatorSinus = LocalRotationManipulatorSinus;
class WorldRotationManipulatorSinus extends BaseTransformManipulator {
    constructor(t, shift) {
        super(t);
        this.t = t;
        this.shift = shift;
        this.set = (v) => {
            const arcsinEulerAngles = AngleUtils_1.AngleUtils.eulerAnglesToArcsin(v.sub(this.shift));
            const arcsinRotation = quat.fromEulerVec(arcsinEulerAngles);
            this.t.setWorldRotation(arcsinRotation);
        };
    }
    get() {
        const shiftedEulerAngles = this.t.getWorldRotation().toEulerAngles()
            .add(this.shift);
        return AngleUtils_1.AngleUtils.eulerAnglesToSin(shiftedEulerAngles);
    }
    ;
}
exports.WorldRotationManipulatorSinus = WorldRotationManipulatorSinus;
//# sourceMappingURL=TransformManipulators.js.map