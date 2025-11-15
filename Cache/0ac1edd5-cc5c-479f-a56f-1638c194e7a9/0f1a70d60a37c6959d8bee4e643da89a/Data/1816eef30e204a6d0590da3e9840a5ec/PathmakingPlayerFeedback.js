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
exports.PathmakingPlayerFeedback = void 0;
var __selfType = requireType("./PathmakingPlayerFeedback");
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
const LensInitializer_1 = require("./LensInitializer");
let PathmakingPlayerFeedback = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var PathmakingPlayerFeedback = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.visualSo = this.visualSo;
            this.jointsSo = this.jointsSo;
            this.joints = [];
            this.vec3up = vec3.up();
        }
        __initialize() {
            super.__initialize();
            this.visualSo = this.visualSo;
            this.jointsSo = this.jointsSo;
            this.joints = [];
            this.vec3up = vec3.up();
        }
        onAwake() {
            this.tr = this.getSceneObject().getTransform();
            this.jointsSo.forEach(so => {
                let joint = so.getTransform();
                this.joints.push(joint);
                so.enabled = false;
            });
        }
        start(positions) {
            this.update(positions);
            this.visualSo.enabled = true;
        }
        stop() {
            this.visualSo.enabled = false;
        }
        update(positions) {
            let pos = LensInitializer_1.LensInitializer.getInstance().getPlayerGroundPos();
            this.tr.setWorldPosition(pos);
            // update arrow positions
            let rotations = LinearAlgebra_1.LinearAlgebra.computeCurveRotations(positions);
            let lastRot = quat.quatIdentity();
            // Set poses
            for (let i = 0; i < this.joints.length; i++) {
                if (i < positions.length) {
                    this.jointsSo[i].enabled = true;
                    let targetPos = positions[i];
                    this.joints[i].setWorldPosition(targetPos);
                    // We need to flip this rotation for the way the art was made 
                    lastRot = LinearAlgebra_1.LinearAlgebra.flippedRot(rotations[i], this.vec3up);
                    this.joints[i].setWorldRotation(lastRot);
                }
                else {
                    this.joints[i].setWorldPosition(pos);
                    this.joints[i].setWorldRotation(lastRot);
                    // this.jointsSo[i].enabled = false;
                }
            }
        }
    };
    __setFunctionName(_classThis, "PathmakingPlayerFeedback");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PathmakingPlayerFeedback = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PathmakingPlayerFeedback = _classThis;
})();
exports.PathmakingPlayerFeedback = PathmakingPlayerFeedback;
//# sourceMappingURL=PathmakingPlayerFeedback.js.map