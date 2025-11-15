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
exports.PathMaker = void 0;
var __selfType = requireType("./PathMaker");
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
const IdleState_1 = require("./PathMakerStates/IdleState");
const PlacingStartState_1 = require("./PathMakerStates/PlacingStartState");
const BuildingPathState_1 = require("./PathMakerStates/BuildingPathState");
const PlacingFinishState_1 = require("./PathMakerStates/PlacingFinishState");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const LineController_1 = require("./LineController");
let PathMaker = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var PathMaker = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.pathRmv = this.pathRmv;
            this.pfbSurfaceDetection = this.pfbSurfaceDetection;
            this.pfbLine = this.pfbLine;
            this.camObj = this.camObj;
            this.camObjOffset = this.camObjOffset;
            this.pathDistText = this.pathDistText;
            this.finalPathDistText = this.finalPathDistText;
            this.playerPaceCalculator = this.playerPaceCalculator;
            this.pathmakingPlayerFeedback = this.pathmakingPlayerFeedback;
            this.ui = this.ui;
            this.placingStartFinishLinesForwardDisplace = this.placingStartFinishLinesForwardDisplace;
            this.camTr = null;
            this.camOffsetTr = null;
            this.currentState = new IdleState_1.IdleState();
            this.bigMoveDistanceThreshold = 40;
            this.hermiteResolution = 12;
            this.resampleResoluton = 4;
            this.pathMadeEvent = new Event_1.default();
        }
        __initialize() {
            super.__initialize();
            this.pathRmv = this.pathRmv;
            this.pfbSurfaceDetection = this.pfbSurfaceDetection;
            this.pfbLine = this.pfbLine;
            this.camObj = this.camObj;
            this.camObjOffset = this.camObjOffset;
            this.pathDistText = this.pathDistText;
            this.finalPathDistText = this.finalPathDistText;
            this.playerPaceCalculator = this.playerPaceCalculator;
            this.pathmakingPlayerFeedback = this.pathmakingPlayerFeedback;
            this.ui = this.ui;
            this.placingStartFinishLinesForwardDisplace = this.placingStartFinishLinesForwardDisplace;
            this.camTr = null;
            this.camOffsetTr = null;
            this.currentState = new IdleState_1.IdleState();
            this.bigMoveDistanceThreshold = 40;
            this.hermiteResolution = 12;
            this.resampleResoluton = 4;
            this.pathMadeEvent = new Event_1.default();
        }
        get pathMade() {
            return this.pathMadeEvent.publicApi();
        }
        init() {
            this.camTr = this.camObj.getTransform();
            this.camOffsetTr = this.camObjOffset.getTransform();
        }
        start() {
            this.startStartPlacementState();
            this.ui.resetPathClicked.add(() => {
                // reset path
                if (this.surfaceDetection) {
                    this.surfaceDetection.reset();
                }
                this.startStartPlacementState();
            });
        }
        startStartPlacementState() {
            this.currentState.stop();
            if (!this.surfaceDetection) {
                this.surfaceDetection = this.pfbSurfaceDetection.instantiate(null).getChild(0).getComponent("ScriptComponent");
            }
            this.currentState = new PlacingStartState_1.PlacingStartState(this, this.surfaceDetection, this.pfbLine, this.camTr, this.placingStartFinishLinesForwardDisplace, (startPosition, startRotation, startObject) => {
                this.startBuildingPathState(startPosition, startRotation, startObject);
            });
            this.currentState.start();
        }
        startBuildingPathState(startPosition, startRotation, startObject) {
            this.currentState.stop();
            this.currentState = new BuildingPathState_1.BuildingPathState(this, this.camTr, this.camOffsetTr, this.pathRmv, this.pathDistText, startPosition, startRotation, startObject, this.ui, this.playerPaceCalculator, this.pathmakingPlayerFeedback, this.bigMoveDistanceThreshold, this.hermiteResolution, this.resampleResoluton, (startPosition, startRotation, startObject, pathPoints, lastVisualPoints) => {
                this.startFinishPlacementState(startObject, startPosition, startRotation, pathPoints, lastVisualPoints);
            }, (startPosition, startRotation, startObject, splinePoints) => {
                // NOTE: Use this line anywhere you want a stack trace
                // print(`${new Error().stack}`);
                this.finishLoop(startObject, startPosition, startRotation, splinePoints);
            });
            this.currentState.start();
        }
        startFinishPlacementState(startObject, startPosition, startRotation, pathPoints, lastVisualPoints) {
            this.currentState.stop();
            this.currentState = new PlacingFinishState_1.PlacingFinishState(startObject, this, this.surfaceDetection, this.pfbLine, this.camTr, this.placingStartFinishLinesForwardDisplace, pathPoints, lastVisualPoints, this.pathRmv, this.bigMoveDistanceThreshold, this.hermiteResolution, this.resampleResoluton, (finishPosition, finishRotation, finishObject, splinePoints) => {
                const finishCtrl = finishObject.getComponent(LineController_1.LineController.getTypeName());
                finishCtrl.setRealVisual();
                this.finishSprint(startObject, startPosition, startRotation, finishObject, finishPosition, finishRotation, splinePoints);
            });
            this.currentState.start();
        }
        finishLoop(startObject, startPosition, startRotation, splinePoints) {
            this.currentState.stop();
            this.currentState = new IdleState_1.IdleState();
            this.currentState.start();
            this.pathMadeEvent.invoke({
                isLoop: true,
                startObject,
                startPosition,
                startRotation,
                splinePoints
            });
        }
        finishSprint(startObject, startPosition, startRotation, finishObject, finishPosition, finishRotation, splinePoints) {
            this.currentState.stop();
            this.currentState = new IdleState_1.IdleState();
            this.currentState.start();
            this.pathMadeEvent.invoke({
                isLoop: false,
                startObject,
                finishObject,
                startPosition,
                startRotation,
                finishPosition,
                finishRotation,
                splinePoints
            });
        }
    };
    __setFunctionName(_classThis, "PathMaker");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PathMaker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PathMaker = _classThis;
})();
exports.PathMaker = PathMaker;
//# sourceMappingURL=PathMaker.js.map