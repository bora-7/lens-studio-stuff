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
exports.GetVectorsFromQuaternion = void 0;
var __selfType = requireType("./GetVectorsFromQuaternion");
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
let GetVectorsFromQuaternion = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var GetVectorsFromQuaternion = _classThis = class extends _classSuper {
        __initialize() {
            super.__initialize();
        }
        constructor() {
            super();
        }
        static getInstance() {
            if (!GetVectorsFromQuaternion.instance) {
                // Note: this does not start in scene
                GetVectorsFromQuaternion.instance = new GetVectorsFromQuaternion();
            }
            return GetVectorsFromQuaternion.instance;
        }
        onAwake() {
            GetVectorsFromQuaternion.instance = this;
        }
        /**
         * Computes the forward, right, and up vectors from a quaternion.
         * @param q - The quaternion representing the rotation.
         * @returns An object containing forward, right, and up vectors.
         */
        getVectorsFromQuaternion(q) {
            // Convert quaternion to rotation matrix elements
            const xx = q.x * q.x;
            const yy = q.y * q.y;
            const zz = q.z * q.z;
            const xy = q.x * q.y;
            const xz = q.x * q.z;
            const yz = q.y * q.z;
            const wx = q.w * q.x;
            const wy = q.w * q.y;
            const wz = q.w * q.z;
            // Forward vector (Z-axis)
            const forwardVec = {
                x: 2 * (xz + wy),
                y: 2 * (yz - wx),
                z: 1 - 2 * (xx + yy),
            };
            // Right vector (X-axis)
            const rightVec = {
                x: 1 - 2 * (yy + zz),
                y: 2 * (xy + wz),
                z: 2 * (xz - wy),
            };
            // Up vector (Y-axis)
            const upVec = {
                x: 2 * (xy - wz),
                y: 1 - 2 * (xx + zz),
                z: 2 * (yz + wx),
            };
            const forward = new vec3(forwardVec.x, forwardVec.y, forwardVec.z);
            const right = new vec3(rightVec.x, rightVec.y, rightVec.z);
            const up = new vec3(upVec.x, upVec.y, upVec.z);
            return { forward: forward, right: right, up: up };
        }
        test() {
            // Example usage
            const quaternion = { x: 0, y: 0, z: 0, w: 1 };
            const { forward, right, up } = this.getVectorsFromQuaternion(quaternion);
        }
    };
    __setFunctionName(_classThis, "GetVectorsFromQuaternion");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GetVectorsFromQuaternion = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GetVectorsFromQuaternion = _classThis;
})();
exports.GetVectorsFromQuaternion = GetVectorsFromQuaternion;
//# sourceMappingURL=GetVectorsFromQuaternion.js.map