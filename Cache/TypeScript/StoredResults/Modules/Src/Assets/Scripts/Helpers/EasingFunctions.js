"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasingFunctions = void 0;
var EasingFunctions;
(function (EasingFunctions) {
    // Linear (no easing, constant speed)
    function easeLinear(t) {
        return t;
    }
    EasingFunctions.easeLinear = easeLinear;
    // Ease In Quadratic (slow start, fast end)
    function easeInQuad(t) {
        return t * t;
    }
    EasingFunctions.easeInQuad = easeInQuad;
    // Ease Out Quadratic (fast start, slow end)
    function easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    }
    EasingFunctions.easeOutQuad = easeOutQuad;
    // Ease In-Out Quadratic (slow start, fast middle, slow end)
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    EasingFunctions.easeInOutQuad = easeInOutQuad;
    // Ease In Cubic (steeper acceleration)
    function easeInCubic(t) {
        return t * t * t;
    }
    EasingFunctions.easeInCubic = easeInCubic;
    // Ease Out Cubic (fast start, slow end)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    EasingFunctions.easeOutCubic = easeOutCubic;
    // Ease In-Out Cubic (smooth acceleration and deceleration)
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    EasingFunctions.easeInOutCubic = easeInOutCubic;
    // Ease In Quartic (even stronger acceleration)
    function easeInQuart(t) {
        return t * t * t * t;
    }
    EasingFunctions.easeInQuart = easeInQuart;
    // Ease Out Quartic (fast start, slow end)
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    EasingFunctions.easeOutQuart = easeOutQuart;
    // Ease In-Out Quartic (smooth and pronounced acceleration/deceleration)
    function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }
    EasingFunctions.easeInOutQuart = easeInOutQuart;
    // Ease In Quintic (very strong acceleration)
    function easeInQuint(t) {
        return t * t * t * t * t;
    }
    EasingFunctions.easeInQuint = easeInQuint;
    // Ease Out Quintic (fast start, slow end)
    function easeOutQuint(t) {
        return 1 - Math.pow(1 - t, 5);
    }
    EasingFunctions.easeOutQuint = easeOutQuint;
    // Ease In-Out Quintic (stronger easing)
    function easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }
    EasingFunctions.easeInOutQuint = easeInOutQuint;
    // Ease Out Elastic (springy bounce at the end)
    function easeOutElastic(t) {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
    EasingFunctions.easeOutElastic = easeOutElastic;
    // Ease Out Bounce (bounces at the end)
    function easeOutBounce(t) {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
            return n1 * t * t;
        }
        else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        }
        else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        }
        else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    }
    EasingFunctions.easeOutBounce = easeOutBounce;
    // Ease In-Out Sine (smoother than quadratic)
    function easeInOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    }
    EasingFunctions.easeInOutSine = easeInOutSine;
})(EasingFunctions || (exports.EasingFunctions = EasingFunctions = {}));
//# sourceMappingURL=EasingFunctions.js.map