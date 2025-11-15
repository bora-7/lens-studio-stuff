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
exports.ArrowsSpawner = void 0;
var __selfType = requireType("./ArrowsSpawner");
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
const CatmullRomSpline_1 = require("./Helpers/CatmullRomSpline");
const GetVectorsFromQuaternion_1 = require("./Helpers/GetVectorsFromQuaternion");
const LensInitializer_1 = require("./LensInitializer");
let ArrowsSpawner = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ArrowsSpawner = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.mainCamera = this.mainCamera;
            this.maxArrows = this.maxArrows;
            this.revealDistance = this.revealDistance;
            this.minimalDistanceBetweenArrows = this.minimalDistanceBetweenArrows;
            this.pfbSideArrow = this.pfbSideArrow;
            this.arrowMaterial = this.arrowMaterial;
            this.positions = [];
            this.spawnedArrows = [];
            this.vec3up = vec3.up();
            this.splinePoints = [];
        }
        __initialize() {
            super.__initialize();
            this.mainCamera = this.mainCamera;
            this.maxArrows = this.maxArrows;
            this.revealDistance = this.revealDistance;
            this.minimalDistanceBetweenArrows = this.minimalDistanceBetweenArrows;
            this.pfbSideArrow = this.pfbSideArrow;
            this.arrowMaterial = this.arrowMaterial;
            this.positions = [];
            this.spawnedArrows = [];
            this.vec3up = vec3.up();
            this.splinePoints = [];
        }
        start(arrowsPositions, mySplinePoints, myPathLength) {
            this.clearState();
            this.nextId = 0;
            this.splinePoints = mySplinePoints;
            this.pathLength = myPathLength;
            // clear some points from beginning and end
            const offset = 7;
            if (arrowsPositions.length > offset + 1) {
                arrowsPositions = arrowsPositions.slice(offset - 1, arrowsPositions.length - 1);
            }
            if (arrowsPositions.length > offset + 1) {
                arrowsPositions = arrowsPositions.slice(0, -offset);
            }
            this.positions = arrowsPositions;
            this.updateEvent.enabled = true;
        }
        stop() {
            this.updateEvent.enabled = false;
            this.clearState();
        }
        clearState() {
            this.spawnedArrows.forEach((i) => {
                i.objects.forEach((o) => {
                    o.destroy();
                });
            });
            this.spawnedArrows = [];
        }
        onAwake() {
            this.updateEvent = this.createEvent("UpdateEvent");
            this.updateEvent.enabled = false;
            this.updateEvent.bind(() => {
                this.onUpdate();
            });
            this.mainCameraT = this.mainCamera.getTransform();
        }
        onUpdate() {
            this.trySpawnNextArrows();
        }
        getSpawnedArrowsCount() {
            return this.spawnedArrows.length;
        }
        getArrowsLimit() {
            return this.maxArrows;
        }
        tryGetNextArrowPositionAndRotation() {
            const currentOldest = this.tryGetOldestArrowPositionAndRotation();
            const currentOldestId = currentOldest ? currentOldest.id : -1;
            if (this.nextId < this.positions.length && this.nextId != currentOldestId) {
                return this.positions[this.nextId];
            }
            return null;
        }
        tryGetOldestArrowPositionAndRotation() {
            if (this.spawnedArrows.length) {
                return this.spawnedArrows[0];
            }
            return null;
        }
        removeOldestArrow() {
            if (this.spawnedArrows.length == 0) {
                throw new Error("No arrows spawned");
            }
            this.spawnedArrows[0].objects.forEach((o) => o.destroy());
            this.spawnedArrows.shift();
        }
        getDistanceOnSpline(posA, posB) {
            let tA = CatmullRomSpline_1.CatmullRomSpline.worldToSplineSpace(posA, this.splinePoints).t;
            let tB = CatmullRomSpline_1.CatmullRomSpline.worldToSplineSpace(posB, this.splinePoints).t;
            let dist = Math.abs(tA - tB) * this.pathLength;
            return dist;
        }
        incrementNextId(currentPosition) {
            const currentOldest = this.tryGetOldestArrowPositionAndRotation();
            if (!currentOldest) {
                throw new Error("Cannot increment next id. Current oldest is null. This potentially means that we tried to increment id before spawning the arrow");
            }
            const currentOldestId = currentOldest.id;
            while (this.nextId < this.positions.length && this.getDistanceOnSpline(this.positions[this.nextId], currentPosition) < this.minimalDistanceBetweenArrows) {
                this.nextId++;
                if (this.nextId >= this.positions.length) {
                    this.nextId = 0;
                }
                if (this.nextId == currentOldestId) {
                    break;
                }
            }
        }
        spawnNextArrow() {
            if (this.nextId >= this.positions.length) {
                throw new Error("No position to spawn next arrow");
            }
            let currentId = this.nextId;
            const currentPosition = this.positions[currentId];
            let posA = null;
            let posB = null;
            if (this.positions.length > currentId + 1) {
                posA = this.positions[currentId];
                posB = this.positions[currentId + 1];
            }
            else {
                posA = this.positions[currentId - 1];
                posB = this.positions[currentId];
            }
            let fwd = posB.sub(posA);
            fwd = fwd.normalize();
            let up = this.vec3up.projectOnPlane(fwd);
            up = up.normalize();
            let rot = quat.lookAt(fwd, up);
            const { leftArrow, rightArrow } = this.instantiateSideArrowObj(currentPosition, rot); // pass pos and rot
            this.spawnedArrows.push({
                pointPosition: currentPosition,
                objects: [leftArrow, rightArrow],
                id: currentId
            });
            this.incrementNextId(currentPosition);
        }
        instantiateSideArrowObj(position, rotation) {
            let radius = 120;
            let height = 45;
            const { forward, right, up } = GetVectorsFromQuaternion_1.GetVectorsFromQuaternion.getInstance().getVectorsFromQuaternion(rotation);
            let rightPos = position.add(right.uniformScale(radius)).add(up.uniformScale(height));
            let leftPos = position.add(right.uniformScale(-radius)).add(up.uniformScale(height));
            let rightRot = quat.angleAxis(Math.PI / 3, forward).multiply(rotation);
            let leftRot = quat.angleAxis(-Math.PI / 3, forward).multiply(rotation);
            let leftArrow = this.pfbSideArrow.instantiate(null);
            leftArrow.getTransform().setWorldPosition(rightPos);
            leftArrow.getTransform().setWorldRotation(rightRot);
            // Hack to aid artist need to see realtime material changes to spawned arrow
            leftArrow.getChild(0).getChild(0).getComponent("RenderMeshVisual").mainMaterial = this.arrowMaterial;
            let rightArrow = this.pfbSideArrow.instantiate(null);
            rightArrow.getTransform().setWorldPosition(leftPos);
            rightArrow.getTransform().setWorldRotation(leftRot);
            // Hack to aid artist need to see realtime material changes to spawned arrow
            rightArrow.getChild(0).getChild(0).getComponent("RenderMeshVisual").mainMaterial = this.arrowMaterial;
            return { leftArrow, rightArrow };
        }
        trySpawnNextArrows() {
            const currentPosition = LensInitializer_1.LensInitializer.getInstance().getPlayerGroundPos();
            const spawnedArrowsCount = this.getSpawnedArrowsCount();
            const limit = this.getArrowsLimit();
            if (spawnedArrowsCount >= limit) {
                const nextArrow = this.tryGetNextArrowPositionAndRotation();
                if (isNull(nextArrow)) {
                    return;
                }
                const oldestArrow = this.tryGetOldestArrowPositionAndRotation();
                const toNext = this.getDistanceOnSpline(nextArrow, currentPosition);
                const toOldest = oldestArrow ? this.getDistanceOnSpline(oldestArrow.pointPosition, currentPosition) : Infinity;
                if (toNext < toOldest && toNext < this.revealDistance) {
                    this.removeOldestArrow();
                    this.spawnNextArrow();
                }
            }
            else {
                const canSpawn = limit - spawnedArrowsCount;
                for (let i = 0; i < canSpawn; i++) {
                    const nextArrow = this.tryGetNextArrowPositionAndRotation();
                    if (isNull(nextArrow)) {
                        break;
                    }
                    this.spawnNextArrow();
                }
            }
        }
    };
    __setFunctionName(_classThis, "ArrowsSpawner");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ArrowsSpawner = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ArrowsSpawner = _classThis;
})();
exports.ArrowsSpawner = ArrowsSpawner;
//# sourceMappingURL=ArrowsSpawner.js.map