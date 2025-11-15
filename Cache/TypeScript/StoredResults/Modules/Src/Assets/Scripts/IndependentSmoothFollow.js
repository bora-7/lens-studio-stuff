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
exports.SmoothFollow = void 0;
var __selfType = requireType("./IndependentSmoothFollow");
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
const FunctionTimingUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/FunctionTimingUtils");
const mathUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/mathUtils");
const validate_1 = require("SpectaclesInteractionKit.lspkg/Utils/validate");
/**
 * SmoothFollow is a body dynamic behavior which when applied to a scene object,
 * makes it stay in the same relative horizontal position and distance to the
 * user's field of view as they turn their head left and right and move around.
 * It doesn't affect the positioning of the scene object when the user looks up
 * and down or changes elevation. Interpolation is handled by a spring-damper
 * in cylindrical coordinates.
 */
let SmoothFollow = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var SmoothFollow = _classThis = class extends _classSuper {
        __initialize() {
            super.__initialize();
            this.mainCamera = this.mainCamera;
            this.cameraTransform = null;
            this.tr = null;
            this.fieldOfView = 26;
            this.visibleWidth = 20;
            this.minDistance = 25;
            this.maxDistance = 110;
            this.minElevation = -40;
            this.maxElevation = 40;
            this.translationTime = 0.35;
            this.rotationTime = 0.55;
            this.tr = this.sceneObject.getTransform();
            (0, validate_1.validate)(this.tr);
            this.cameraTransform = this.mainCamera.getTransform();
            this.target = vec3.zero();
            this.velocity = vec3.zero();
            this.omega = 0;
            this.heading = 0;
            this.dragging = false;
            this.initialRot = this.tr.getLocalRotation();
            this.heading = this.cameraHeading;
            this.worldRot = quat
                .angleAxis(this.heading, vec3.up())
                .multiply(this.initialRot);
            this.resize(// hardcoding for no container
            16 + //this.frame.innerSize.x +
                4 + 2 + //this.frame.border * 2 +
                0 //this.frame.constantPadding.x
            );
            (0, FunctionTimingUtils_1.setTimeout)(() => {
                this.clampPosition();
            }, 32);
            this.createEvent("UpdateEvent").bind(() => this.onUpdate());
        }
        constructor() {
            super();
            this.mainCamera = this.mainCamera;
            this.cameraTransform = null;
            this.tr = null;
            this.fieldOfView = 26;
            this.visibleWidth = 20;
            this.minDistance = 25;
            this.maxDistance = 110;
            this.minElevation = -40;
            this.maxElevation = 40;
            this.translationTime = 0.35;
            this.rotationTime = 0.55;
            this.tr = this.sceneObject.getTransform();
            (0, validate_1.validate)(this.tr);
            this.cameraTransform = this.mainCamera.getTransform();
            this.target = vec3.zero();
            this.velocity = vec3.zero();
            this.omega = 0;
            this.heading = 0;
            this.dragging = false;
            this.initialRot = this.tr.getLocalRotation();
            this.heading = this.cameraHeading;
            this.worldRot = quat
                .angleAxis(this.heading, vec3.up())
                .multiply(this.initialRot);
            this.resize(// hardcoding for no container
            16 + //this.frame.innerSize.x +
                4 + 2 + //this.frame.border * 2 +
                0 //this.frame.constantPadding.x
            );
            (0, FunctionTimingUtils_1.setTimeout)(() => {
                this.clampPosition();
            }, 32);
            this.createEvent("UpdateEvent").bind(() => this.onUpdate());
        }
        startDragging() {
            this.dragging = true;
        }
        finishDragging() {
            this.dragging = false;
            this.clampPosition();
        }
        resize(visibleWidth) {
            this.visibleWidth = visibleWidth;
            this.clampPosition();
        }
        clampPosition() {
            // the initial goal of the follower is whereever it is relative to the
            // camera when the component gets enabled. the grab bar works by disabling
            // this component when grabbed, and reenables it when let go.
            if (this.dragging)
                return; // skip while actively scaling
            this.target = this.cartesianToCylindrical(this.worldToBody(this.worldPos));
            this.target.z = (0, mathUtils_1.clamp)(this.target.z, this.minDistance, this.maxDistance);
            this.target.z = Math.max(this.target.z, (1.1 * this.visibleWidth) /
                2 /
                Math.tan((this.fieldOfView / 2) * mathUtils_1.DegToRad)); // handle very wide panels
            this.target.y = (0, mathUtils_1.clamp)(this.target.y, this.minElevation, this.maxElevation);
            const dist = new vec2(this.target.y, this.target.z).length;
            const halfFov = Math.atan((Math.tan((this.fieldOfView / 2) * mathUtils_1.DegToRad) * dist -
                this.visibleWidth / 2) /
                this.target.z);
            this.target.x = (0, mathUtils_1.clamp)(this.target.x, -halfFov, halfFov);
            this.velocity = vec3.zero();
            this.omega = 0;
        }
        onUpdate() {
            if (!this.dragging) {
                const pos = this.cartesianToCylindrical(this.worldToBody(this.worldPos));
                // y is special because target elevation is leashed between a range of values,
                // rather <than how x and z work where they are leashed to a single value.
                this.target.y = (0, mathUtils_1.clamp)(pos.y, this.minElevation, this.maxElevation);
                [pos.x, this.velocity.x] = (0, mathUtils_1.smoothDamp)(pos.x, this.target.x, this.velocity.x, this.translationTime, getDeltaTime());
                [pos.y, this.velocity.y] = (0, mathUtils_1.smoothDamp)(pos.y, this.target.y, this.velocity.y, this.translationTime, getDeltaTime());
                [pos.z, this.velocity.z] = (0, mathUtils_1.smoothDamp)(pos.z, this.target.z, this.velocity.z, this.translationTime, getDeltaTime());
                this.worldPos = this.bodyToWorld(this.cylindricalToCartesian(pos));
                [this.heading, this.omega] = (0, mathUtils_1.smoothDampAngle)(this.heading, this.cameraHeading, this.omega, this.rotationTime, getDeltaTime());
                // force billboard
                this.worldRot = quat
                    .lookAt(this.cameraPos.sub(this.worldPos).normalize(), vec3.up())
                    .multiply(this.initialRot);
            }
        }
        cartesianToCylindrical(v) {
            return new vec3(Math.atan2(-v.x, -v.z), v.y, Math.sqrt(v.x * v.x + v.z * v.z));
        }
        cylindricalToCartesian(v) {
            return new vec3(v.z * -Math.sin(v.x), v.y, v.z * -Math.cos(v.x));
        }
        worldToBody(v) {
            return quat
                .angleAxis(-this.cameraHeading, vec3.up())
                .multiplyVec3(v.sub(this.cameraPos));
        }
        bodyToWorld(v) {
            return quat
                .angleAxis(this.cameraHeading, vec3.up())
                .multiplyVec3(v)
                .add(this.cameraPos);
        }
        get cameraHeading() {
            const forward = this.cameraTransform
                .getWorldTransform()
                .multiplyDirection(new vec3(0, 0, -1));
            return Math.atan2(-forward.x, -forward.z);
        }
        get cameraPos() {
            return this.cameraTransform.getWorldPosition();
        }
        get worldRot() {
            (0, validate_1.validate)(this.tr);
            return this.tr.getWorldRotation();
        }
        set worldRot(value) {
            (0, validate_1.validate)(this.tr);
            this.tr.setWorldRotation(value);
        }
        get worldPos() {
            (0, validate_1.validate)(this.tr);
            return this.tr.getWorldPosition();
        }
        set worldPos(value) {
            (0, validate_1.validate)(this.tr);
            // Forcing value to our camera y position.
            value.y = this.cameraTransform.getWorldPosition().y;
            this.tr.setWorldPosition(value);
        }
    };
    __setFunctionName(_classThis, "SmoothFollow");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SmoothFollow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmoothFollow = _classThis;
})();
exports.SmoothFollow = SmoothFollow;
//# sourceMappingURL=IndependentSmoothFollow.js.map