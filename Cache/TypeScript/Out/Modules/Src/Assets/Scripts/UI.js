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
exports.UI = void 0;
var __selfType = requireType("./UI");
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
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const Conversions_1 = require("./Conversions");
let UI = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var UI = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.camObj = this.camObj;
            this.homeUI = this.homeUI;
            this.duringPathCreationUI = this.duringPathCreationUI;
            this.goToStartUI = this.goToStartUI;
            this.goToStartUiDistance = this.goToStartUiDistance;
            this.endSessionUI = this.endSessionUI;
            this.pfbLoopUi = this.pfbLoopUi;
            this.backplateSo = this.backplateSo;
            this.warningTutorialUI = this.warningTutorialUI;
            this.tutorialUI = this.tutorialUI;
            this.tutorialAnimationPlayer = this.tutorialAnimationPlayer;
            this.tutorialText = this.tutorialText;
            this.createPathClickedEvent = new Event_1.default();
            this.resetPathClickedEvent = new Event_1.default();
            this.finishPathClickedEvent = new Event_1.default();
            this.loopPathClickedEvent = new Event_1.default();
            this.tutorialCompleteEvent = new Event_1.default();
            this.endSessionClickedEvent = new Event_1.default();
            this.warningTr = null;
            this.tutorialTr = null;
            this.homeTr = null;
            this.duringPathCreationUiTr = null;
            this.goToStartUiTr = null;
            this.endSessionUiTr = null;
            this.currentActiveTr = null;
            this.tutorialStepCount = 0;
        }
        __initialize() {
            super.__initialize();
            this.camObj = this.camObj;
            this.homeUI = this.homeUI;
            this.duringPathCreationUI = this.duringPathCreationUI;
            this.goToStartUI = this.goToStartUI;
            this.goToStartUiDistance = this.goToStartUiDistance;
            this.endSessionUI = this.endSessionUI;
            this.pfbLoopUi = this.pfbLoopUi;
            this.backplateSo = this.backplateSo;
            this.warningTutorialUI = this.warningTutorialUI;
            this.tutorialUI = this.tutorialUI;
            this.tutorialAnimationPlayer = this.tutorialAnimationPlayer;
            this.tutorialText = this.tutorialText;
            this.createPathClickedEvent = new Event_1.default();
            this.resetPathClickedEvent = new Event_1.default();
            this.finishPathClickedEvent = new Event_1.default();
            this.loopPathClickedEvent = new Event_1.default();
            this.tutorialCompleteEvent = new Event_1.default();
            this.endSessionClickedEvent = new Event_1.default();
            this.warningTr = null;
            this.tutorialTr = null;
            this.homeTr = null;
            this.duringPathCreationUiTr = null;
            this.goToStartUiTr = null;
            this.endSessionUiTr = null;
            this.currentActiveTr = null;
            this.tutorialStepCount = 0;
        }
        get createPathClicked() {
            return this.createPathClickedEvent.publicApi();
        }
        get resetPathClicked() {
            return this.resetPathClickedEvent.publicApi();
        }
        get finishPathClicked() {
            return this.finishPathClickedEvent.publicApi();
        }
        get loopPathClicked() {
            return this.loopPathClickedEvent.publicApi();
        }
        get tutorialComplete() {
            return this.tutorialCompleteEvent.publicApi();
        }
        get endSessionClicked() {
            return this.endSessionClickedEvent.publicApi();
        }
        onAwake() {
            this.warningTr = this.warningTutorialUI.getTransform();
            this.tutorialTr = this.tutorialUI.getTransform();
            this.homeTr = this.homeUI.getTransform();
            this.duringPathCreationUiTr = this.duringPathCreationUI.getTransform();
            this.goToStartUiTr = this.goToStartUI.getTransform();
            this.endSessionUiTr = this.endSessionUI.getTransform();
            this.hide(this.tutorialTr);
            this.hide(this.homeTr);
            this.hide(this.duringPathCreationUiTr);
            this.hide(this.goToStartUiTr);
            this.hide(this.endSessionUiTr);
        }
        showHomeUi() {
            this.tryHideCurrentActive();
            this.currentActiveTr = this.homeTr;
            this.show(this.currentActiveTr);
        }
        showTutorialUi() {
            this.tryHideCurrentActive();
            this.tutorialStepCount = 0;
            this.currentActiveTr = this.warningTr;
            this.show(this.currentActiveTr);
        }
        showDuringPathCreationUi() {
            this.tryHideCurrentActive();
            this.currentActiveTr = this.duringPathCreationUiTr;
            this.show(this.currentActiveTr);
        }
        showEndSessionUi() {
            this.tryHideCurrentActive();
            this.currentActiveTr = this.endSessionUiTr;
            this.show(this.currentActiveTr);
        }
        showGoToStartUi(distance) {
            this.tryHideCurrentActive();
            const pathDistFt = Conversions_1.Conversions.cmToFeet(distance);
            this.goToStartUiDistance.text = pathDistFt.toFixed(1) + "'";
            this.currentActiveTr = this.goToStartUiTr;
            this.show(this.currentActiveTr);
        }
        initLoopUi(startTr) {
            if (!this.loopUiController) {
                this.loopUiController = this.pfbLoopUi.instantiate(null).getComponent("ScriptComponent");
            }
            this.loopUiController.start(startTr);
        }
        showLoopUi() {
            this.loopUiController.show();
        }
        hideLoopUi() {
            this.loopUiController.hide();
        }
        hideUi() {
            this.tryHideCurrentActive();
            this.currentActiveTr = null;
        }
        onProgressTutorial() {
            if (this.tutorialStepCount === 0) {
                this.tryHideCurrentActive();
                this.currentActiveTr = this.tutorialTr;
                this.show(this.currentActiveTr);
            }
            else if (this.tutorialStepCount === 1) {
                this.tutorialAnimationPlayer.setClipEnabled("Sprint_Layer", false);
                this.tutorialAnimationPlayer.setClipEnabled("Loop_Layer", true);
                this.tutorialText.text = "MAKE A LOOP";
            }
            else if (this.tutorialStepCount === 2) {
                this.hide(this.tutorialTr);
                this.tutorialCompleteEvent.invoke();
            }
            this.tutorialStepCount += 1;
        }
        onCreatePathButton() {
            this.hide(this.homeTr);
            this.createPathClickedEvent.invoke();
        }
        onFinishCreatePathButton() {
            this.hide(this.duringPathCreationUiTr);
            if (this.loopUiController.getIsInLoopZone()) {
                this.loopUiController.onLock();
                this.loopPathClickedEvent.invoke();
            }
            else {
                this.finishPathClickedEvent.invoke();
            }
        }
        onResetCreatePathButton() {
            this.hide(this.duringPathCreationUiTr);
            this.resetPathClickedEvent.invoke();
        }
        onStopWalkingButton() {
            this.hide(this.endSessionUiTr);
            this.endSessionClickedEvent.invoke();
        }
        hide(tr) {
            let localPos = tr.getLocalPosition();
            localPos.y = 10000;
            tr.setLocalPosition(localPos);
            this.backplateSo.enabled = false;
        }
        show(tr) {
            let localPos = tr.getLocalPosition();
            localPos.y = -5;
            tr.setLocalPosition(localPos);
            this.backplateSo.enabled = true;
        }
        tryHideCurrentActive() {
            if (this.currentActiveTr) {
                this.hide(this.currentActiveTr);
            }
        }
    };
    __setFunctionName(_classThis, "UI");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UI = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UI = _classThis;
})();
exports.UI = UI;
//# sourceMappingURL=UI.js.map