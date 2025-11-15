"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacingStartState = void 0;
const LensInitializer_1 = require("../LensInitializer");
const GetVectorsFromQuaternion_1 = require("../Helpers/GetVectorsFromQuaternion");
const SoundController_1 = require("../SoundController");
const LinearAlgebra_1 = require("../Helpers/LinearAlgebra");
const LineController_1 = require("../LineController");
class PlacingStartState {
    constructor(ownerScript, surfaceDetection, startLinePrefab, cameraTransform, startLineForwardDisplace, onStartPlaced) {
        this.ownerScript = ownerScript;
        this.surfaceDetection = surfaceDetection;
        this.startLinePrefab = startLinePrefab;
        this.cameraTransform = cameraTransform;
        this.startLineForwardDisplace = startLineForwardDisplace;
        this.onStartPlaced = onStartPlaced;
    }
    start() {
        this.surfaceDetection.startGroundCalibration((pos, rot) => { this.onPlacing(pos, rot); }, (pos, rot) => { this.onPlaced(pos, rot); });
        this.startLineTransform = this.startLinePrefab.instantiate(this.ownerScript.getSceneObject()).getTransform();
        const startLineController = this.startLineTransform.getSceneObject().getComponent(LineController_1.LineController.getTypeName());
        if (!startLineController) {
            throw new Error(`StartFinishLine cannot be found on object: ${this.startLineTransform.getSceneObject().name}`);
        }
        startLineController.init(true);
        this.hideStartLine();
    }
    onPlacing(pos, rot) {
        // Rot is upside down and turned around 
        const { forward, right, up } = GetVectorsFromQuaternion_1.GetVectorsFromQuaternion.getInstance().getVectorsFromQuaternion(rot);
        rot = quat.angleAxis(-Math.PI / 2, right).multiply(rot);
        rot = quat.angleAxis(Math.PI, up).multiply(rot);
        // Displaces obj away from surface placement ui
        pos = this.displaceAwayFromCamera(pos);
        this.setStartLineTransform(pos, rot);
    }
    onPlaced(pos, rot) {
        // Bug: this rot does not match onPlacing one frame earlier
        const { forward, right, up } = GetVectorsFromQuaternion_1.GetVectorsFromQuaternion.getInstance().getVectorsFromQuaternion(rot);
        rot = quat.angleAxis(Math.PI, up).multiply(rot);
        // Displaces obj away from surface placement ui
        pos = this.displaceAwayFromCamera(pos);
        LensInitializer_1.LensInitializer.getInstance().setFloorOffsetFromCamera(pos);
        this.onStartPlaced(pos, rot, this.startLineTransform.getSceneObject());
        SoundController_1.SoundController.getInstance().playSound("stopCreatePath");
    }
    displaceAwayFromCamera(pos) {
        return pos.add(LinearAlgebra_1.LinearAlgebra.flatNor(this.cameraTransform.back).uniformScale(30));
    }
    setStartLineTransform(pos, rot) {
        this.startLineTransform.setWorldPosition(pos);
        this.startLineTransform.setWorldRotation(rot);
    }
    hideStartLine() {
        this.startLineTransform.setWorldPosition(this.cameraTransform.getWorldPosition().add(vec3.up().uniformScale(1000)));
    }
    stop() {
    }
}
exports.PlacingStartState = PlacingStartState;
//# sourceMappingURL=PlacingStartState.js.map