"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaintOnFloorBehavior = void 0;
class PaintOnFloorBehavior {
    constructor(zOffset, camTr) {
        this.zOffset = zOffset;
        this.camTr = camTr;
    }
    start(visualPos) {
        this.oPosVisual = visualPos;
        this.oRotVisual = this.camTr.getWorldRotation();
    }
    stop() {
    }
    getBehavior(nPosVisual) {
        nPosVisual = vec3.lerp(this.oPosVisual, nPosVisual, Math.min(1, 5 * getDeltaTime()));
        let nRotVisual = this.camTr.getWorldRotation();
        nRotVisual = quat.lerp(this.oRotVisual, nRotVisual, Math.min(1, 10 * getDeltaTime()));
        this.oPosVisual = nPosVisual;
        this.oRotVisual = nRotVisual;
        return { pos: nPosVisual, rot: nRotVisual, vel: undefined };
    }
}
exports.PaintOnFloorBehavior = PaintOnFloorBehavior;
//# sourceMappingURL=PaintOnFloorBehavior.js.map