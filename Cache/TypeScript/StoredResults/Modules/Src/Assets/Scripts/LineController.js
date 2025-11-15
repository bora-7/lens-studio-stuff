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
exports.LineController = void 0;
var __selfType = requireType("./LineController");
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
const LinearAlgebra_1 = require("./Helpers/LinearAlgebra");
const SoundController_1 = require("./SoundController");
let LineController = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var LineController = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.visualSo = this.visualSo;
            this.startVisual = this.startVisual;
            this.finishVisual = this.finishVisual;
            this.countdownSo = this.countdownSo;
            this.countdownSoArray = this.countdownSoArray;
            this.countdownCollider = this.countdownCollider;
            this.camCol = this.camCol;
            this.lapCounter3Dtext = this.lapCounter3Dtext;
            this.realVisualsParent = this.realVisualsParent;
            this.hintVisualsParent = this.hintVisualsParent;
            this.startLineTurnArrow = this.startLineTurnArrow;
            this.finishLineTurnArrow = this.finishLineTurnArrow;
            this.hintStartVisual = this.hintStartVisual;
            this.hintFinishVisual = this.hintFinishVisual;
            this.pathCollisionEvents = this.pathCollisionEvents;
            this.pathWalker = this.pathWalker;
            this.enableWalkCountdown = false;
            this.lapCounterSo = null;
            this.visualTr = null;
        }
        __initialize() {
            super.__initialize();
            this.visualSo = this.visualSo;
            this.startVisual = this.startVisual;
            this.finishVisual = this.finishVisual;
            this.countdownSo = this.countdownSo;
            this.countdownSoArray = this.countdownSoArray;
            this.countdownCollider = this.countdownCollider;
            this.camCol = this.camCol;
            this.lapCounter3Dtext = this.lapCounter3Dtext;
            this.realVisualsParent = this.realVisualsParent;
            this.hintVisualsParent = this.hintVisualsParent;
            this.startLineTurnArrow = this.startLineTurnArrow;
            this.finishLineTurnArrow = this.finishLineTurnArrow;
            this.hintStartVisual = this.hintStartVisual;
            this.hintFinishVisual = this.hintFinishVisual;
            this.pathCollisionEvents = this.pathCollisionEvents;
            this.pathWalker = this.pathWalker;
            this.enableWalkCountdown = false;
            this.lapCounterSo = null;
            this.visualTr = null;
        }
        init(beginsAsStartLine) {
            this.countdownSo.enabled = false;
            this.collisionStayRemover = this.countdownCollider.onCollisionStay.add((e) => this.onCollisionStay(e));
            this.lapCounterSo = this.lapCounter3Dtext.getSceneObject();
            this.lapCounterSo.enabled = false;
            this.isStart = beginsAsStartLine;
            if (!beginsAsStartLine) {
                let pos = this.countdownCollider.getTransform().getLocalPosition();
                pos.z = -pos.z;
                this.countdownCollider.getTransform().setLocalPosition(pos);
            }
            this.setVisual();
            this.visualTr = this.visualSo.getTransform();
            this.setHintVisual();
            this.pathCollisionEvents.init(this.isStart ? "start" : "finish", this.camCol.getSceneObject().getParent().getTransform(), this.camCol, this.pathWalker);
        }
        setHintVisual() {
            this.hintStartVisual.enabled = this.isStart;
            this.hintFinishVisual.enabled = !this.isStart;
            this.realVisualsParent.enabled = false;
            this.hintVisualsParent.enabled = true;
        }
        setRealVisual() {
            this.realVisualsParent.enabled = true;
            this.hintVisualsParent.enabled = false;
        }
        setEnableWalkCountdown() {
            this.enableWalkCountdown = true;
        }
        startCountDown() {
            let delay = 1;
            for (let i = 0; i < this.countdownSoArray.length + 1; i++) {
                let evt = this.createEvent("DelayedCallbackEvent");
                evt.bind(() => {
                    this.countdownSoArray.forEach(so => {
                        so.enabled = false;
                    });
                    if (i == 0) {
                        SoundController_1.SoundController.getInstance().playSound("onCountdown");
                    }
                    if (i < this.countdownSoArray.length) {
                        this.countdownSo.enabled = true;
                        this.countdownSoArray[i].enabled = true;
                    }
                    if (i == this.countdownSoArray.length) {
                        this.countdownSo.enabled = false;
                    }
                });
                evt.reset(delay * i);
            }
            // return delay
            return delay * (this.countdownSoArray.length + 1);
        }
        onStartSprint() {
            this.startLineTurnArrow.enabled = true;
            this.finishLineTurnArrow.enabled = true;
        }
        setVisual() {
            this.startVisual.enabled = this.isStart;
            this.finishVisual.enabled = !this.isStart;
        }
        onSprintStartAreaCollision() {
            this.enableWalkCountdown = false;
            if (this.collisionStayRemover) {
                this.countdownCollider.onCollisionStay.remove(this.collisionStayRemover);
            }
            this.countdownCollider.enabled = false;
            if (this.isStart) {
                this.startCountDown();
            }
        }
        onReverseSprintTrackVisuals() {
            this.isStart = !this.isStart;
            this.setVisual();
            let rot = LinearAlgebra_1.LinearAlgebra.flippedRot(this.visualTr.getWorldRotation(), this.visualTr.up);
            this.visualTr.setWorldRotation(rot);
        }
        // This is only called on the start visual
        onIncrementLoop(nextLapCount) {
            this.startVisual.enabled = false;
            this.lapCounterSo.enabled = true;
            this.lapCounter3Dtext.text = "LAP " + nextLapCount;
        }
        onCollisionStay(e) {
            if (this.enableWalkCountdown) {
                if (e.collision.collider.isSame(this.camCol)) {
                    this.pathWalker.onSprintStartAreaCollision(!this.isStart);
                    this.enableWalkCountdown = false;
                }
            }
        }
    };
    __setFunctionName(_classThis, "LineController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LineController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LineController = _classThis;
})();
exports.LineController = LineController;
//# sourceMappingURL=LineController.js.map