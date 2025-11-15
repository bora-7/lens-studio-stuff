"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
var Colors;
(function (Colors) {
    let violetColor = new vec4(.56, 0, 1, 1);
    let indigoColor = new vec4(.29, 0, .51, 1);
    let blueColor = new vec4(0, 0, 1, 1);
    let cyanColor = new vec4(0, 1, 1, 1);
    let greenColor = new vec4(0, 1, 0, 1);
    let yellowColor = new vec4(1, 1, 0, 1);
    let orangeColor = new vec4(1, .5, 0, 1);
    let redColor = new vec4(1, 0, 0, 1);
    let magentaColor = new vec4(1, 0, 1, 1);
    function violet() {
        return violetColor;
    }
    Colors.violet = violet;
    function indigo() {
        return indigoColor;
    }
    Colors.indigo = indigo;
    function blue() {
        return blueColor;
    }
    Colors.blue = blue;
    function cyan() {
        return cyanColor;
    }
    Colors.cyan = cyan;
    function green() {
        return greenColor;
    }
    Colors.green = green;
    function yellow() {
        return yellowColor;
    }
    Colors.yellow = yellow;
    function orange() {
        return orangeColor;
    }
    Colors.orange = orange;
    function red() {
        return redColor;
    }
    Colors.red = red;
    function magenta() {
        return magentaColor;
    }
    Colors.magenta = magenta;
    function rainbowColor(value) {
        if (value < 0 || value > 1) {
            throw new Error("Input must be between 0 and 1");
        }
        // Map value (0 to 1) to hue (0 to 360 degrees in HSL)
        const hue = value * 360;
        // Convert HSL to RGB
        function hslToRgb(h, s, l) {
            s /= 100;
            l /= 100;
            const k = (n) => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            return [f(0), f(8), f(4)];
        }
        const [r, g, b] = hslToRgb(hue, 100, 50);
        return new vec4(r, g, b, 1); // RGBA with alpha 1
    }
    Colors.rainbowColor = rainbowColor;
})(Colors || (exports.Colors = Colors = {}));
//# sourceMappingURL=Colors.js.map