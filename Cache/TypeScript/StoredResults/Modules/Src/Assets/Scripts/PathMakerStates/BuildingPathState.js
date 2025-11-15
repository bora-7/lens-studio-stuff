"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingPathState = void 0;
const Conversions_1 = require("../Conversions");
const PathBuilder_1 = require("../PathBuilder");
const LensInitializer_1 = require("../LensInitializer");
const PaintOnFloorBehavior_1 = require("../PathPrevewBehaviors/PaintOnFloorBehavior");
const LookAtFloorBehavior_1 = require("../PathPrevewBehaviors/LookAtFloorBehavior");
const LinearAlgebra_1 = require("../Helpers/LinearAlgebra");
const HermiteSpline_1 = require("../Helpers/HermiteSpline");
const GetVectorsFromQuaternion_1 = require("../Helpers/GetVectorsFromQuaternion");
const EasingFunctions_1 = require("../Helpers/EasingFunctions");
const ResampleCurve_1 = require("../Helpers/ResampleCurve");
const FinishSmoothPath_1 = require("../Helpers/FinishSmoothPath");
const LineController_1 = require("../LineController");
class BuildingPathState {
    constructor(ownerScript, cameraTransform, cameraOffsetTransform, pathRmv, pathDistanceText, startPosition, startRotation, startObject, ui, paceCalculator, pathmakingPlayerFeedback, bigMoveDistanceThreshold, hermiteResolution, resampleResoluton, onFinishAsSprint, onFinishAsLoop) {
        this.ownerScript = ownerScript;
        this.cameraTransform = cameraTransform;
        this.cameraOffsetTransform = cameraOffsetTransform;
        this.pathRmv = pathRmv;
        this.pathDistanceText = pathDistanceText;
        this.startPosition = startPosition;
        this.startRotation = startRotation;
        this.startObject = startObject;
        this.ui = ui;
        this.paceCalculator = paceCalculator;
        this.pathmakingPlayerFeedback = pathmakingPlayerFeedback;
        this.bigMoveDistanceThreshold = bigMoveDistanceThreshold;
        this.hermiteResolution = hermiteResolution;
        this.resampleResoluton = resampleResoluton;
        this.onFinishAsSprint = onFinishAsSprint;
        this.onFinishAsLoop = onFinishAsLoop;
        this.previewZOffset = 300;
        this.previewLookPoints = [];
        this.paintPts = [];
        this.lookPts = [];
        this.previewPoints = [];
        this.pathPoints = [];
        this.pathLength = 0;
        this.visualTargetCrossedStartLine = false;
        this.cameraCrossedStartLine = false;
        this.cameraMovedFromStartLine = false;
        this.isUiShown = false;
        this.isLoop = false;
        this.smallMoveDistanceThreshold = 3;
        this.startTransform = this.startObject.getTransform();
    }
    start() {
        this.visualTargetCrossedStartLine = false;
        this.prevCameraPositionForVisual = this.startPosition.uniformScale(1);
        this.prevCameraPositionForPath = LensInitializer_1.LensInitializer.getInstance().getPlayerGroundPos();
        this.prevTrailHeadPos = undefined;
        this.prevTrailHeadRot = undefined;
        this.previewLookPoints = [];
        this.paintPts = [];
        this.lookPts = [];
        this.previewPoints = [];
        this.pathPoints = [];
        this.pathLength = 0;
        this.isLoop = false;
        this.isUiShown = false;
        const lineCtrl = this.startObject.getComponent(LineController_1.LineController.getTypeName());
        if (!lineCtrl) {
            throw new Error(`StartFinishLine cannot be found on object with name ${this.startObject.name}`);
        }
        lineCtrl.setRealVisual();
        this.ui.hideUi();
        this.ui.initLoopUi(this.startTransform);
        this.finishClickedRemover = this.ui.finishPathClicked.add(() => {
            this.onFinishAsSprint(this.startPosition, this.startRotation, this.startObject, this.pathPoints, this.previewPoints);
        });
        this.loopClickedRemover = this.ui.loopPathClicked.add(() => {
            let smoothPoints = FinishSmoothPath_1.FinishSmoothPath.finishSmoothPath(this.pathPoints, this.startTransform, this.cameraTransform, this.bigMoveDistanceThreshold, this.hermiteResolution, this.resampleResoluton);
            this.pathPoints = smoothPoints.pathPoints;
            const splinePoints = smoothPoints.splinePoints;
            this.pathRmv.enabled = false;
            this.onFinishAsLoop(this.startPosition, this.startRotation, this.startObject, splinePoints);
        });
        this.addStartPointToPath();
        this.addStartPointToVisual();
        this.paintPreview = new PaintOnFloorBehavior_1.PaintOnFloorBehavior(this.previewZOffset, this.cameraTransform);
        this.lookPreview = new LookAtFloorBehavior_1.LookAtFloorBehavior(this.previewZOffset, this.cameraTransform);
        this.paintPreview.start(this.displaceForward(this.prevCameraPositionForPath));
        this.lookPreview.start();
        this.paceCalculator.start(this.prevCameraPositionForPath);
        this.resetClickedRemover = this.ui.resetPathClicked.add(() => {
            this.reset();
        });
        this.pathmakingPlayerFeedback.start([this.startPosition.add(this.startTransform.forward.uniformScale(50)), this.startPosition]);
        this.updateEvent = this.ownerScript.createEvent("UpdateEvent");
        this.updateEvent.bind(() => {
            this.onUpdate();
        });
    }
    reset() {
        this.pathRmv.enabled = false;
        this.startObject.destroy();
        this.pathmakingPlayerFeedback.stop();
    }
    stop() {
        this.finishClickedRemover?.();
        this.finishClickedRemover = undefined;
        this.loopClickedRemover?.();
        this.loopClickedRemover = undefined;
        this.resetClickedRemover?.();
        this.resetClickedRemover = undefined;
        if (this.updateEvent) {
            this.ownerScript.removeEvent(this.updateEvent);
            this.updateEvent = undefined;
        }
        if (this.trailHeadTransform) {
            this.trailHeadTransform.getSceneObject().destroy();
            this.trailHeadTransform = undefined;
        }
        this.paintPreview.stop();
        this.lookPreview.stop();
        this.pathmakingPlayerFeedback.stop();
    }
    onUpdate() {
        if (getDeltaTime() < .00000000001) {
            // we're in a capture loop
            return;
        }
        // Check pace
        let nPos = LensInitializer_1.LensInitializer.getInstance().getPlayerGroundPos();
        let stats = this.paceCalculator.getPace(nPos);
        if (stats.pace < 13 && this.pathPoints.length > 4) {
            this.ensureUiShown();
        }
        else {
            this.ensureUiHidden();
        }
        // Make the high density visual ahead of us
        let smallMoved = nPos.sub(this.prevCameraPositionForVisual);
        let smallDistanceMoved = smallMoved.length;
        let nPosVisual = this.displaceForward(nPos);
        this.setPreviewPoints(nPos, nPosVisual);
        if (smallDistanceMoved > this.smallMoveDistanceThreshold
            && this.checkVisualTargetCrossedStartLine(nPosVisual)) {
            // Make flat and vertical distance checks for loop viability
            let toStart = this.startPosition.sub(nPosVisual);
            let toStartY = toStart.y;
            toStart.y = 0;
            let toStartXZ = toStart.length;
            if (toStartXZ < BuildingPathState.distanceToMakeLoopXZ
                && Math.abs(toStartY) < BuildingPathState.distanceToMakeLoopY) {
                if (this.pathPoints.length > 4) {
                    this.ensureLoopUiShown();
                }
                else {
                    this.ensureLoopUiHidden();
                }
            }
            else {
                this.ensureLoopUiHidden();
            }
            // Update old positions
            this.prevCameraPositionForVisual = nPos;
        }
        // Make the low density path behind us
        // Because the start transform is the first point, start drawing once we've moved from start
        let bigMoved = nPos.sub(this.prevCameraPositionForPath);
        let bigDistanceMoved = bigMoved.length;
        if (bigDistanceMoved > this.bigMoveDistanceThreshold
            && this.checkCameraCrossedStartLine(nPos, 0)
            && this.checkCameraMovedFromStartLine(nPos, this.bigMoveDistanceThreshold)) {
            // Update our path distance
            this.pathLength += bigDistanceMoved;
            let pathDistFt = Conversions_1.Conversions.cmToFeet(this.pathLength);
            this.pathDistanceText.text = pathDistFt.toFixed(1) + "'";
            // Push a subset of points to the path array
            this.pathPoints.push(nPos);
            // Early on, cleanup the start points to curve smoothly from the center of the start line
            if (this.pathPoints.length == 7) {
                this.cleanupStartPointsToPath();
            }
            if (this.pathPoints.length > 2) {
                this.pathRmv.enabled = true;
                this.pathRmv.mesh = PathBuilder_1.PathBuilder.buildFromPoints(this.pathPoints, 60);
            }
            this.prevCameraPositionForPath = nPos;
        }
    }
    setPreviewPoints(nPos, nPosVisual) {
        // To prevent visual from drawing from start back to player,
        // While cam has not yet passed start,
        // Ensure visual is really passed start, otherwise don't update
        let updatePreviewPoints = this.checkCameraCrossedStartLine(nPos, 0) ? true : this.checkCrossedStart(nPosVisual, 0);
        if (!updatePreviewPoints) {
            return;
        }
        // If camera has not crossed start, but visual has
        // Adjust object count to our distance from start to visual 
        let objCount = 6;
        if (!this.checkCameraCrossedStartLine(nPos, 0) && this.checkCrossedStart(nPosVisual, 0)) {
            let distancePerObj = this.previewZOffset / objCount;
            let availableDistance = nPosVisual.distance(this.startPosition);
            objCount = Math.floor(availableDistance / distancePerObj);
            objCount = Math.max(objCount, 2);
        }
        let startPos = this.checkCameraCrossedStartLine(nPos, 0) ? nPos : this.startPosition;
        let lookBehavior = this.lookPreview.getBehavior();
        if (lookBehavior && lookBehavior.pos && lookBehavior.rot && lookBehavior.vel) {
            this.lookPts = this.drawCurveFromBehavior(startPos, lookBehavior);
        }
        let paintBehavior = this.paintPreview.getBehavior(nPosVisual);
        if (paintBehavior) {
            if (paintBehavior.pos) {
                this.paintPts.unshift(paintBehavior.pos);
                // Pop the points that are behind the camera
                for (let i = this.paintPts.length - 1; i >= 0; i--) {
                    let camToPt = this.paintPts[i].sub(nPos).normalize();
                    let camFwd = LinearAlgebra_1.LinearAlgebra.flatNor(this.cameraTransform.back);
                    // Snap all points to our current ground
                    this.paintPts[i].y = nPos.y;
                    let dot = camToPt.dot(camFwd);
                    if (dot < 0) {
                        this.paintPts.pop();
                    }
                }
            }
        }
        this.previewPoints = [];
        let size = Math.min(this.lookPts.length, this.paintPts.length);
        if (size > 2) {
            // Array goes from head (index 0) to start position (index size-1)
            for (let i = 0; i < size; i++) {
                let t = 1 - i / (size - 1);
                let paintWeight = EasingFunctions_1.EasingFunctions.easeOutQuart(t);
                let lookWeight = 1 - paintWeight;
                let pos = this.lookPts[i].uniformScale(lookWeight).add(this.paintPts[i].uniformScale(paintWeight));
                this.previewPoints.push(pos);
            }
            // Re-emphasize start position prior to resampling
            this.previewPoints.push(startPos);
            // Resample
            this.previewPoints = ResampleCurve_1.ResampleCurve.resampleCurve(this.previewPoints, objCount);
            this.pathmakingPlayerFeedback.update(this.previewPoints);
        }
    }
    // This draws a curve from the look point to us
    drawCurveFromBehavior(startPos, behavior) {
        let posA = behavior.pos;
        let fwdA = LinearAlgebra_1.LinearAlgebra.flatNor(GetVectorsFromQuaternion_1.GetVectorsFromQuaternion.getInstance().getVectorsFromQuaternion(behavior.rot).forward);
        let posB = startPos;
        let fwdB = LinearAlgebra_1.LinearAlgebra.flatNor(this.cameraTransform.forward);
        let dir = posA.sub(posB);
        let mag = dir.length;
        let resolution = Math.floor(mag / 15);
        let curveScale = Math.max(50, Math.min(resolution * 50, behavior.vel / 2));
        let curvePoints = HermiteSpline_1.HermiteSpline.interpolateHermite(posA, fwdA, posB, fwdB, resolution, curveScale);
        return curvePoints;
    }
    cleanupStartPointsToPath() {
        this.pathPoints = HermiteSpline_1.HermiteSpline.drawCurve(this.startPosition, this.startTransform.forward, this.pathPoints[this.pathPoints.length - 1], LinearAlgebra_1.LinearAlgebra.flatNor(this.cameraTransform.back), this.hermiteResolution);
    }
    addStartPointToPath() {
        this.pathPoints.push(this.startPosition.uniformScale(1));
    }
    addStartPointToVisual() {
        this.previewPoints.unshift(this.startPosition);
    }
    displaceForward(cameraPosOnSurface) {
        return cameraPosOnSurface.add(LinearAlgebra_1.LinearAlgebra.flatNor(this.cameraTransform.back).uniformScale(this.previewZOffset));
    }
    checkCameraMovedFromStartLine(cameraPosOnSurface, distance) {
        if (this.cameraMovedFromStartLine) {
            return true;
        }
        this.cameraMovedFromStartLine = this.startPosition.distance(cameraPosOnSurface) > distance;
        return this.cameraMovedFromStartLine;
    }
    checkCameraCrossedStartLine(cameraPosOnSurface, offset) {
        if (this.cameraCrossedStartLine) {
            return true;
        }
        this.cameraCrossedStartLine = this.checkCrossedStart(cameraPosOnSurface, offset);
        return this.cameraCrossedStartLine;
    }
    checkCrossedStart(pos, offset) {
        let startLineForward = this.startTransform.forward;
        let offsetStartPos = this.startPosition.add(startLineForward.uniformScale(offset));
        let cameraPosToStart = pos.sub(offsetStartPos);
        return startLineForward.angleTo(cameraPosToStart) <= Math.PI / 2;
    }
    checkBehindStart(pos, offset) {
        let startLineForward = this.startTransform.forward;
        let offsetStartPos = this.startPosition.sub(startLineForward.uniformScale(offset));
        let cameraPosToStart = pos.sub(offsetStartPos);
        return startLineForward.angleTo(cameraPosToStart) > Math.PI / 2;
    }
    checkVisualTargetCrossedStartLine(targetPosOnSurface) {
        if (this.visualTargetCrossedStartLine) {
            return true;
        }
        this.visualTargetCrossedStartLine = this.checkCrossedStart(targetPosOnSurface, 0);
        return this.visualTargetCrossedStartLine;
    }
    ensureUiShown() {
        if (this.isUiShown) {
            return;
        }
        this.isUiShown = true;
        this.ui.showDuringPathCreationUi();
    }
    ensureUiHidden() {
        if (!this.isUiShown) {
            return;
        }
        this.isUiShown = false;
        this.ui.hideUi();
    }
    ensureLoopUiShown() {
        if (this.isLoop) {
            return;
        }
        this.isLoop = true;
        this.ui.showLoopUi();
    }
    ensureLoopUiHidden() {
        if (!this.isLoop) {
            return;
        }
        this.isLoop = false;
        this.ui.hideLoopUi();
    }
}
exports.BuildingPathState = BuildingPathState;
BuildingPathState.distanceToMakeLoopXZ = 200;
BuildingPathState.distanceToMakeLoopY = 50;
//# sourceMappingURL=BuildingPathState.js.map