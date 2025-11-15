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
exports.LensInitializer = void 0;
var __selfType = requireType("./LensInitializer");
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
let LensInitializer = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var LensInitializer = _classThis = class extends _classSuper {
        __initialize() {
            super.__initialize();
            this.ui = this.ui;
            this.tutorialController = this.tutorialController;
            this.pathMaker = this.pathMaker;
            this.pathWalker = this.pathWalker;
            this.camSo = this.camSo;
            this.floorOffsetFromCamera = -100;
            this.floorIsSet = false;
            this.vec3up = vec3.up();
        }
        constructor() {
            super();
            this.ui = this.ui;
            this.tutorialController = this.tutorialController;
            this.pathMaker = this.pathMaker;
            this.pathWalker = this.pathWalker;
            this.camSo = this.camSo;
            this.floorOffsetFromCamera = -100;
            this.floorIsSet = false;
            this.vec3up = vec3.up();
        }
        static getInstance() {
            if (!LensInitializer.instance) {
                throw new Error("Trying to get LensInitializer instance, but it hasn't been set.  You need to call it later.");
            }
            return LensInitializer.instance;
        }
        onAwake() {
            if (!LensInitializer.instance) {
                LensInitializer.instance = this;
            }
            else {
                throw new Error("LensInitializer already has an instance but another one is initializing. Aborting.");
            }
            this.camTr = this.camSo.getTransform();
            this.pathMaker.init();
            this.pathWalker.init();
            this.ui.getSceneObject().enabled = true;
            this.tutorialController.startTutorial(() => {
                this.startHomeState();
            });
        }
        setFloorOffsetFromCamera(floorPos) {
            // Get the difference between current cam height and this Y value 
            // Meaning, we take the camera's height at floor set to be the player's "height" for this path 
            let camPos = this.camTr.getWorldPosition();
            let offset = floorPos.sub(camPos);
            // Because player is looking down when height is taken, 
            // offset is closer than it will be (when player is looking out)
            this.floorOffsetFromCamera = offset.y - 10;
            this.floorIsSet = true;
        }
        getPlayerGroundPos() {
            if (!this.floorIsSet) {
                throw Error("Floor not set. You need to call it later.");
            }
            return this.camTr.getWorldPosition().add(this.vec3up.uniformScale(this.floorOffsetFromCamera));
        }
        startHomeState() {
            this.ui.showHomeUi();
            const pathClickedRemover = this.ui.createPathClicked.add(() => {
                pathClickedRemover();
                this.pathMaker.start();
                const remover = this.pathMaker.pathMade.add((data) => {
                    remover();
                    if (!data.isLoop) {
                        const dataSprint = data;
                        this.pathWalker.start(dataSprint.splinePoints, dataSprint.isLoop, dataSprint.startObject.getTransform(), dataSprint.finishObject.getTransform(), () => {
                            this.startHomeState();
                        });
                    }
                    else {
                        this.pathWalker.start(data.splinePoints, data.isLoop, data.startObject.getTransform(), undefined, () => {
                            this.startHomeState();
                        });
                    }
                });
            });
        }
    };
    __setFunctionName(_classThis, "LensInitializer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LensInitializer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LensInitializer = _classThis;
})();
exports.LensInitializer = LensInitializer;
//# sourceMappingURL=LensInitializer.js.map