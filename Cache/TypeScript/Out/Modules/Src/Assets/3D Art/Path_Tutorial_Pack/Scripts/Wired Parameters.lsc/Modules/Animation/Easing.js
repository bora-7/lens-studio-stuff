"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easings = exports.Easing = void 0;
var Easing;
(function (Easing) {
    Easing.Linear = (k) => k;
    let Quadratic;
    (function (Quadratic) {
        Quadratic.In = (k) => k * k;
        Quadratic.Out = (k) => k * (2 - k);
        Quadratic.InOut = (k) => (k *= 2) < 1 ? 0.5 * k * k : -0.5 * (--k * (k - 2) - 1);
    })(Quadratic = Easing.Quadratic || (Easing.Quadratic = {}));
    let Cubic;
    (function (Cubic) {
        Cubic.In = (k) => k * k * k;
        Cubic.Out = (k) => --k * k * k + 1;
        Cubic.InOut = (k) => (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2);
    })(Cubic = Easing.Cubic || (Easing.Cubic = {}));
    let Quartic;
    (function (Quartic) {
        Quartic.In = (k) => k * k * k * k;
        Quartic.Out = (k) => 1 - (--k * k * k * k);
        Quartic.InOut = (k) => (k *= 2) < 1 ? 0.5 * k * k * k * k : -0.5 * ((k -= 2) * k * k * k - 2);
    })(Quartic = Easing.Quartic || (Easing.Quartic = {}));
    let Quintic;
    (function (Quintic) {
        Quintic.In = (k) => k * k * k * k * k;
        Quintic.Out = (k) => --k * k * k * k * k + 1;
        Quintic.InOut = (k) => (k *= 2) < 1 ? 0.5 * k * k * k * k * k : 0.5 * ((k -= 2) * k * k * k * k + 2);
    })(Quintic = Easing.Quintic || (Easing.Quintic = {}));
    let Sinusoidal;
    (function (Sinusoidal) {
        Sinusoidal.In = (k) => 1 - Math.cos(k * Math.PI / 2);
        Sinusoidal.Out = (k) => Math.sin(k * Math.PI / 2);
        Sinusoidal.InOut = (k) => 0.5 * (1 - Math.cos(Math.PI * k));
    })(Sinusoidal = Easing.Sinusoidal || (Easing.Sinusoidal = {}));
    let Exponential;
    (function (Exponential) {
        Exponential.In = (k) => k === 0 ? 0 : Math.pow(1024, k - 1);
        Exponential.Out = (k) => k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        Exponential.InOut = (k) => {
            if (k === 0 || k === 1)
                return k;
            if ((k *= 2) < 1)
                return 0.5 * Math.pow(1024, k - 1);
            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
        };
    })(Exponential = Easing.Exponential || (Easing.Exponential = {}));
    let Circular;
    (function (Circular) {
        Circular.In = (k) => 1 - Math.sqrt(1 - k * k);
        Circular.Out = (k) => Math.sqrt(1 - (--k * k));
        Circular.InOut = (k) => (k *= 2) < 1 ? -0.5 * (Math.sqrt(1 - k * k) - 1) : 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    })(Circular = Easing.Circular || (Easing.Circular = {}));
    let Elastic;
    (function (Elastic) {
        Elastic.In = (k) => {
            if (k === 0 || k === 1)
                return k;
            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        };
        Elastic.Out = (k) => {
            if (k === 0 || k === 1)
                return k;
            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        };
        Elastic.InOut = (k) => {
            if (k === 0 || k === 1)
                return k;
            k *= 2;
            if (k < 1)
                return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
            return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
        };
    })(Elastic = Easing.Elastic || (Easing.Elastic = {}));
    let Back;
    (function (Back) {
        const s = 1.70158;
        Back.In = (k) => k * k * ((s + 1) * k - s);
        Back.Out = (k) => --k * k * ((s + 1) * k + s) + 1;
        Back.InOut = (k) => {
            const s = 1.70158 * 1.525;
            if ((k *= 2) < 1)
                return 0.5 * (k * k * ((s + 1) * k - s));
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        };
    })(Back = Easing.Back || (Easing.Back = {}));
    let Bounce;
    (function (Bounce) {
        Bounce.In = (k) => 1 - Bounce.Out(1 - k);
        Bounce.Out = (k) => {
            if (k < (1 / 2.75)) {
                return 7.5625 * k * k;
            }
            else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            }
            else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            }
            else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        };
        Bounce.InOut = (k) => {
            if (k < 0.5)
                return Bounce.In(k * 2) * 0.5;
            return Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
        };
    })(Bounce = Easing.Bounce || (Easing.Bounce = {}));
})(Easing || (exports.Easing = Easing = {}));
exports.easings = {
    Linear: Easing.Linear,
    SineIn: Easing.Sinusoidal.In,
    SineOut: Easing.Sinusoidal.Out,
    SineInOut: Easing.Sinusoidal.InOut,
    QuadIn: Easing.Quadratic.In,
    QuadOut: Easing.Quadratic.Out,
    QuadInOut: Easing.Quadratic.InOut,
    ExpoIn: Easing.Exponential.In,
    ExpoOut: Easing.Exponential.Out,
    ExpoInOut: Easing.Exponential.InOut,
    ElasticIn: Easing.Elastic.In,
    ElasticOut: Easing.Elastic.Out,
    ElasticInOut: Easing.Elastic.InOut,
    BounceIn: Easing.Bounce.In,
    BounceOut: Easing.Bounce.Out,
    BounceInOut: Easing.Bounce.InOut,
    BackIn: Easing.Back.In,
    BackOut: Easing.Back.Out,
    BackInOut: Easing.Back.InOut,
};
//# sourceMappingURL=Easing.js.map