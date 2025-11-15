"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngleUtils = void 0;
class AngleUtils {
    /**
     * Converts an angle from degrees to radians.
     * @param degrees The angle in degrees.
=     */
    static eulerAnglesToRadians(degrees) {
        return degrees.uniformScale(MathUtils.DegToRad);
    }
    /**
     * Converts an angle from radians to degrees.
     * @param radians The angle in radians.
     */
    static eulerAnglesToDegrees(radians) {
        return radians.uniformScale(MathUtils.RadToDeg);
    }
    /**
     * Clamps an angle in degrees to the range [-180, 180].
     * @param angle The angle in degrees to be clamped.
     */
    static clampAngleDegrees(angle) {
        return ((angle + 180) % 360 + 360) % 360 - 180;
    }
    static eulerAnglesToSin(v) {
        v.x = Math.sin(v.x);
        v.y = Math.sin(v.y);
        v.z = Math.sin(v.z);
        return v;
    }
    static eulerAnglesToArcsin(v) {
        v.x = Math.asin(v.x);
        v.y = Math.asin(v.y);
        v.z = Math.asin(v.z);
        return v;
    }
}
exports.AngleUtils = AngleUtils;
//# sourceMappingURL=AngleUtils.js.map