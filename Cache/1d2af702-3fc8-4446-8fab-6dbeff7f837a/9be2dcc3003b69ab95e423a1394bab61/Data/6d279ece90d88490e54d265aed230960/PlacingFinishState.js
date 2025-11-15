"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacingFinishState = void 0;
const PathBuilder_1 = require("../PathBuilder");
const SoundController_1 = require("../SoundController");
const GetVectorsFromQuaternion_1 = require("../Helpers/GetVectorsFromQuaternion");
const LinearAlgebra_1 = require("../Helpers/LinearAlgebra");
const FinishSmoothPath_1 = require("../Helpers/FinishSmoothPath");
const LineController_1 = require("../LineController");
class PlacingFinishState {
    constructor(startObject, ownerScript, surfaceDetection, finishPrefab, cameraTransform, forwardDisplace, pathPoints, visualPoints, visualRmv, bigMoveDistanceThreshold, hermiteResolution, resampleResoluton, onFinishPlaced) {
        this.startObject = startObject;
        this.ownerScript = ownerScript;
        this.surfaceDetection = surfaceDetection;
        this.finishPrefab = finishPrefab;
        this.cameraTransform = cameraTransform;
        this.forwardDisplace = forwardDisplace;
        this.pathPoints = pathPoints;
        this.visualPoints = visualPoints;
        this.visualRmv = visualRmv;
        this.bigMoveDistanceThreshold = bigMoveDistanceThreshold;
        this.hermiteResolution = hermiteResolution;
        this.resampleResoluton = resampleResoluton;
        this.onFinishPlaced = onFinishPlaced;
    }
    start() {
        this.surfaceDetection.startGroundCalibration((pos, rot) => { this.onPlacing(pos, rot); }, (pos, rot) => { this.onPlaced(pos, rot); });
        this.finishTransform = this.finishPrefab.instantiate(this.ownerScript.getSceneObject()).getTransform();
        const finishLineController = this.finishTransform.getSceneObject().getComponent(LineController_1.LineController.getTypeName());
        if (!finishLineController) {
            throw new Error(`FinishLineController not found on ${this.finishTransform.getSceneObject().name}`);
        }
        else {
            finishLineController.init(false);
            finishLineController.setHintVisual();
        }
        this.hideFinishLine();
    }
    onPlacing(pos, rot) {
        // Rot is upside down and turned around 
        const { forward, right, up } = GetVectorsFromQuaternion_1.GetVectorsFromQuaternion.getInstance().getVectorsFromQuaternion(rot);
        rot = quat.angleAxis(-Math.PI / 2, right).multiply(rot);
        rot = quat.angleAxis(Math.PI, up).multiply(rot);
        // Displaces obj away from surface placement ui
        pos = this.displaceAwayFromCamera(pos);
        this.setFinishLineTransform(pos, rot);
        this.updateArrowsVisual(pos);
    }
    onPlaced(pos, rot) {
        // Bug: this rot does not match onPlacing one frame earlier
        const { forward, right, up } = GetVectorsFromQuaternion_1.GetVectorsFromQuaternion.getInstance().getVectorsFromQuaternion(rot);
        rot = quat.angleAxis(Math.PI, up).multiply(rot);
        // Displaces obj away from surface placement ui
        pos = this.displaceAwayFromCamera(pos);
        this.setFinishLineTransform(pos, rot);
        let smoothPoints = FinishSmoothPath_1.FinishSmoothPath.finishSmoothPath(this.pathPoints, this.finishTransform, this.cameraTransform, this.bigMoveDistanceThreshold, this.hermiteResolution, this.resampleResoluton);
        this.pathPoints = smoothPoints.pathPoints;
        const splinePoints = smoothPoints.splinePoints;
        this.onFinishPlaced(pos, rot, this.finishTransform.getSceneObject(), splinePoints);
        SoundController_1.SoundController.getInstance().playSound("stopCreatePath");
    }
    setFinishLineTransform(pos, rot) {
        this.finishTransform.setWorldPosition(pos);
        this.finishTransform.setWorldRotation(rot);
    }
    stop() {
        this.visualRmv.enabled = false;
    }
    displaceAwayFromCamera(pos) {
        return pos.add(LinearAlgebra_1.LinearAlgebra.flatNor(this.cameraTransform.back).uniformScale(30));
    }
    updateArrowsVisual(position) {
        const newArray = [this.pathPoints[this.pathPoints.length - 1],
            position];
        this.visualRmv.mesh = PathBuilder_1.PathBuilder.buildFromPoints(newArray, 60);
    }
    hideFinishLine() {
        this.finishTransform.setWorldPosition(this.cameraTransform.getWorldPosition().add(vec3.up().uniformScale(1000)));
    }
}
exports.PlacingFinishState = PlacingFinishState;
//# sourceMappingURL=PlacingFinishState.js.map