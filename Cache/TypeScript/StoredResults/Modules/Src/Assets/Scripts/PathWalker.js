"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathWalker = void 0;
var __selfType = requireType("./PathWalker");
function component(target) {
    target.getTypeName = function () { return __selfType; };
    if (target.prototype.hasOwnProperty("getTypeName"))
        return;
    Object.defineProperty(target.prototype, "getTypeName", {
        value: function () { return __selfType; },
        configurable: true,
        writable: true
    });
}
const SoundController_1 = require("./SoundController");
const LensInitializer_1 = require("./LensInitializer");
const CatmullRomSpline_1 = require("./Helpers/CatmullRomSpline");
const PathBuilder_1 = require("./PathBuilder");
const Conversions_1 = require("./Conversions");
const LineController_1 = require("./LineController");
const LinearAlgebra_1 = require("./Helpers/LinearAlgebra");
var PathWalkerState;
(function (PathWalkerState) {
    PathWalkerState[PathWalkerState["None"] = 0] = "None";
    PathWalkerState[PathWalkerState["GoToStart"] = 1] = "GoToStart";
    PathWalkerState[PathWalkerState["Walking"] = 2] = "Walking";
})(PathWalkerState || (PathWalkerState = {}));
let PathWalker = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var PathWalker = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.cam = this.cam;
            this.walkPathScreenHUD = this.walkPathScreenHUD;
            this.averagePaceText = this.averagePaceText;
            this.lapCountText = this.lapCountText;
            this.timerScript = this.timerScript;
            this.uiScript = this.uiScript;
            this.progressBarController = this.progressBarController;
            this.arrowSpawner = this.arrowSpawner;
            this.playerPaceCalulator = this.playerPaceCalulator;
            this.warningController = this.warningController;
            this.pathRmv = this.pathRmv;
            // State data
            this.state = 0;
            this.isOutsideSprint = false;
            this.lapCount = -1;
            this.totalTimeWalking = 0;
            this.totalDistWalked = 0;
            this.onWalkingFinished = undefined;
            // Path data
            this.splinePoints = []; // batched update based on resolution
            this.pathPoints = null;
            this.isLoop = false;
            this.pathIsForwards = true; // Starting orientation
            this.startLineController = null;
            this.finishLineController = null;
            this.pathLength = 0;
            // Ui Related data
            this.isUiShown = false;
            this.currentState = PathWalkerState.None;
            this.isWarningShown = false;
        }
        __initialize() {
            super.__initialize();
            this.cam = this.cam;
            this.walkPathScreenHUD = this.walkPathScreenHUD;
            this.averagePaceText = this.averagePaceText;
            this.lapCountText = this.lapCountText;
            this.timerScript = this.timerScript;
            this.uiScript = this.uiScript;
            this.progressBarController = this.progressBarController;
            this.arrowSpawner = this.arrowSpawner;
            this.playerPaceCalulator = this.playerPaceCalulator;
            this.warningController = this.warningController;
            this.pathRmv = this.pathRmv;
            // State data
            this.state = 0;
            this.isOutsideSprint = false;
            this.lapCount = -1;
            this.totalTimeWalking = 0;
            this.totalDistWalked = 0;
            this.onWalkingFinished = undefined;
            // Path data
            this.splinePoints = []; // batched update based on resolution
            this.pathPoints = null;
            this.isLoop = false;
            this.pathIsForwards = true; // Starting orientation
            this.startLineController = null;
            this.finishLineController = null;
            this.pathLength = 0;
            // Ui Related data
            this.isUiShown = false;
            this.currentState = PathWalkerState.None;
            this.isWarningShown = false;
        }
        init() {
            this.uiScript.endSessionClicked.add(() => {
                this.stop();
                if (this.onWalkingFinished) {
                    this.onWalkingFinished();
                }
            });
            this.resetState();
        }
        onUpdate() {
            if (getDeltaTime() < 1 / 6000) {
                // we're in a capture loop
                return;
            }
            switch (this.state) {
                case 0: // inactive
                    break;
                case 1: // prep
                    break;
                case 2: // walking
                    let stats = this.playerPaceCalulator.getPace(LensInitializer_1.LensInitializer.getInstance().getPlayerGroundPos());
                    // Implement warning at 15mph.
                    let paceMph = Conversions_1.Conversions.cmPerSecToMPH(stats.pace);
                    let threshold = 15;
                    if (this.isWarningShown && paceMph < threshold) {
                        this.isWarningShown = false;
                        this.warningController.toggleWaring(this.isWarningShown);
                    }
                    else if (!this.isWarningShown && paceMph > threshold) {
                        this.isWarningShown = true;
                        this.warningController.toggleWaring(this.isWarningShown);
                    }
                    if (stats.pace > 13) {
                        this.ensureUiHidden();
                    }
                    else {
                        this.ensureUiShown();
                    }
                    if (!this.isOutsideSprint) {
                        let t = this.getSplinePos().t;
                        this.updateProgressBar(t);
                        this.setPlayerStats(stats);
                    }
                    break;
                case 3: // finished
                    break;
                default:
                    break;
            }
        }
        getSplinePos() {
            return CatmullRomSpline_1.CatmullRomSpline.worldToSplineSpace(LensInitializer_1.LensInitializer.getInstance().getPlayerGroundPos(), this.splinePoints);
        }
        updateProgressBar(t) {
            let addjustedT = this.pathIsForwards ? t : 1 - t;
            this.progressBarController.setProgress(addjustedT);
        }
        setPlayerStats(stats) {
            // calculate and update total average pace text
            this.totalDistWalked += stats.dist;
            this.totalTimeWalking += stats.dt;
            if (this.totalTimeWalking > 0) {
                let averagePaceMPH = Conversions_1.Conversions.cmPerSecToMPH(this.totalDistWalked / this.totalTimeWalking);
                this.averagePaceText.text = averagePaceMPH.toFixed(1);
            }
        }
        onStartCollisionExit(dot) {
            if (dot > 0) {
                // We are in the direction of the start line
                if (this.state === 1) { // prep
                    // We passed start for the first time
                    this.playerPaceCalulator.start(LensInitializer_1.LensInitializer.getInstance().getPlayerGroundPos());
                    this.walkPathScreenHUD.enabled = true;
                    this.updateProgressBar(0);
                    this.lapCount = 0;
                    this.currentState = PathWalkerState.Walking;
                    this.updateUi();
                    this.timerScript.start();
                    this.state = 2;
                    SoundController_1.SoundController.getInstance().playSound("startWalkPath");
                    // SoundController.getInstance().playSound("onStartLap");
                    this.arrowSpawner.start(this.pathPoints.concat([]).reverse(), this.splinePoints, this.pathLength);
                    // We show the lap we will complete once we walk through
                    if (this.isLoop) {
                        this.startLineController.onIncrementLoop(this.lapCount + 1);
                    }
                    else {
                        this.startLineController.onStartSprint();
                        this.finishLineController.onStartSprint();
                    }
                }
                else if (this.state === 2) { // walking
                    if (this.isLoop) {
                        // We are making a lap in the loop
                        this.incrementLap();
                    }
                    else {
                        // We are re-entering sprint
                        SoundController_1.SoundController.getInstance().playSound("onStartLap");
                        this.isOutsideSprint = false;
                    }
                    this.timerScript.start();
                }
            }
            else {
                // We are going in reverse direction of the start line
                if (this.state === 2) { // walking
                    if (this.isLoop) {
                        // There is no use case for this
                    }
                    else {
                        // We are finishing reverse sprint
                        this.timerScript.pause();
                        this.isOutsideSprint = true;
                        this.incrementLap();
                        this.reverseSprintTrackVisuals("start");
                    }
                }
            }
        }
        onFinishCollisionExit(dot) {
            if (dot > 0) {
                if (this.state === 2) {
                    // We are finishing sprint
                    this.timerScript.pause();
                    this.isOutsideSprint = true;
                    this.incrementLap();
                    this.reverseSprintTrackVisuals("finish");
                }
            }
            else {
                if (this.state === 2) {
                    // We are re-entering reverse sprint
                    SoundController_1.SoundController.getInstance().playSound("onStartLap");
                    this.isOutsideSprint = false;
                    this.timerScript.start();
                }
            }
        }
        incrementLap() {
            SoundController_1.SoundController.getInstance().playSound("onCompleteLap");
            this.timerScript.incrementLap();
            this.lapCount++;
            this.lapCountText.text = this.lapCount.toString();
            if (this.isLoop) {
                this.startLineController.onIncrementLoop(this.lapCount + 1);
            }
        }
        onSprintStartAreaCollision(reverseTrack) {
            if (!this.isLoop) {
                this.startLineController.onSprintStartAreaCollision();
                this.finishLineController.onSprintStartAreaCollision();
                if (reverseTrack) {
                    this.reverseSprintTrack();
                }
            }
        }
        reverseSprintTrack() {
            // Fully switch positions of start and end 
            let startPos = this.startLineController.getTransform().getWorldPosition();
            let startRot = this.startLineController.getTransform().getWorldRotation();
            let flippedStartRot = LinearAlgebra_1.LinearAlgebra.flippedRot(startRot, this.startLineController.getTransform().up);
            let finishPos = this.finishLineController.getTransform().getWorldPosition();
            let finishRot = this.finishLineController.getTransform().getWorldRotation();
            let flippedFinishRot = LinearAlgebra_1.LinearAlgebra.flippedRot(finishRot, this.finishLineController.getTransform().up);
            this.startLineController.getTransform().setWorldPosition(finishPos);
            this.startLineController.getTransform().setWorldRotation(flippedFinishRot);
            this.finishLineController.getTransform().setWorldPosition(startPos);
            this.finishLineController.getTransform().setWorldRotation(flippedStartRot);
            // Revese spline
            this.splinePoints = this.splinePoints.reverse();
            // Only reverse relevant visuals
            this.pathPoints = this.pathPoints.reverse();
            this.pathRmv.mesh = PathBuilder_1.PathBuilder.buildFromPoints(this.pathPoints, 60);
            this.arrowSpawner.start(this.pathPoints.concat([]).reverse(), this.splinePoints, this.pathLength);
        }
        reverseSprintTrackVisuals(str) {
            let reverseTrack = false;
            if (str.includes("start") && !this.pathIsForwards) {
                this.pathIsForwards = true;
                reverseTrack = true;
            }
            if (str.includes("finish") && this.pathIsForwards) {
                this.pathIsForwards = false;
                reverseTrack = true;
            }
            if (reverseTrack) {
                this.pathPoints = this.pathPoints.reverse();
                this.pathRmv.mesh = PathBuilder_1.PathBuilder.buildFromPoints(this.pathPoints, 60);
                this.arrowSpawner.start(this.pathPoints.concat([]).reverse(), this.splinePoints, this.pathLength);
                this.startLineController.onReverseSprintTrackVisuals();
                this.finishLineController.onReverseSprintTrackVisuals();
            }
        }
        resetState() {
            // State data
            this.state = 0;
            this.isOutsideSprint = false;
            this.lapCount = -1;
            this.totalTimeWalking = 0;
            this.totalDistWalked = 0;
            // Path data
            this.pathIsForwards = true;
            this.splinePoints = [];
            this.pathPoints = [];
            this.isLoop = false;
            // Path visual
            this.pathRmv.enabled = false;
            this.arrowSpawner.stop();
            if (this.startLineController) {
                this.startLineController.getSceneObject().destroy();
                this.startLineController = null;
            }
            if (this.finishLineController) {
                this.finishLineController.getSceneObject().destroy();
                this.finishLineController = null;
            }
            // HUD
            if (this.timerScript.getSceneObject().isEnabledInHierarchy) {
                this.timerScript.stop();
            }
            this.averagePaceText.text = "0";
            this.lapCountText.text = "0";
            this.walkPathScreenHUD.enabled = false;
            // UI data
            this.ensureUiHidden();
        }
        start(mySplinePoints, myIsLoop, myStartLineTr, myFinishLineTr = undefined, onWalkingFinished = undefined) {
            // state
            this.resetState();
            this.state = 1;
            // Set path data from PathMaker
            this.splinePoints = mySplinePoints;
            this.pathPoints = mySplinePoints.map(s => s.position);
            this.pathLength = 0;
            for (let i = 1; i < this.pathPoints.length; i++) {
                this.pathLength += this.pathPoints[i].distance(this.pathPoints[i - 1]);
            }
            this.isLoop = myIsLoop;
            this.pathRmv.mesh = PathBuilder_1.PathBuilder.buildFromPoints(this.pathPoints.reverse(), 60);
            this.pathRmv.enabled = true;
            this.startLineController = myStartLineTr.getSceneObject().getComponent(LineController_1.LineController.getTypeName());
            this.startLineController.setEnableWalkCountdown();
            if (!isNull(myFinishLineTr)) {
                this.finishLineController = myFinishLineTr.getSceneObject().getComponent(LineController_1.LineController.getTypeName());
                this.finishLineController.setEnableWalkCountdown();
            }
            this.createEvent("UpdateEvent").bind(() => this.onUpdate());
            this.currentState = PathWalkerState.GoToStart;
            this.ensureUiShown();
            this.onWalkingFinished = onWalkingFinished;
            this.arrowSpawner.start(this.pathPoints.concat([]).reverse(), this.splinePoints, this.pathLength);
        }
        stop() {
            SoundController_1.SoundController.getInstance().stopAllSounds();
            this.resetState();
        }
        ensureUiShown() {
            if (this.isUiShown) {
                return;
            }
            this.isUiShown = true;
            this.showUi();
        }
        ensureUiHidden() {
            if (!this.isUiShown) {
                return;
            }
            this.isUiShown = false;
            this.uiScript.hideUi();
        }
        updateUi() {
            if (!this.isUiShown) {
                return;
            }
            this.showUi();
        }
        showUi() {
            switch (this.currentState) {
                case PathWalkerState.None:
                    return;
                case PathWalkerState.GoToStart:
                    this.uiScript.showGoToStartUi(this.pathLength);
                    return;
                case PathWalkerState.Walking:
                    this.uiScript.showEndSessionUi();
                    return;
            }
        }
    };
    __setFunctionName(_classThis, "PathWalker");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PathWalker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PathWalker = _classThis;
})();
exports.PathWalker = PathWalker;
//# sourceMappingURL=PathWalker.js.map