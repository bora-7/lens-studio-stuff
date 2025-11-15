"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
const DestructionHelper_1 = require("./Scene/DestructionHelper");
class Body {
    constructor(bodyPrefab) {
        this.destructionHelper = new DestructionHelper_1.DestructionHelper();
        const bodySO = this.destructionHelper.instantiatePrefab(bodyPrefab, null, 'Body Tracking');
        this.body = bodySO.getComponent('ObjectTracking3D');
        if (!this.body) {
            throw new Error('Invalid Body Prefab.');
        }
    }
    destroy() {
        this.destructionHelper.destroyObjects();
    }
    getTransform(landmark) {
        return this.body.getAttachedObjects(landmark)[0].getTransform();
    }
    getPosition(landmark) {
        return this.getTransform(landmark).getWorldPosition();
    }
}
exports.Body = Body;
//# sourceMappingURL=Body.js.map