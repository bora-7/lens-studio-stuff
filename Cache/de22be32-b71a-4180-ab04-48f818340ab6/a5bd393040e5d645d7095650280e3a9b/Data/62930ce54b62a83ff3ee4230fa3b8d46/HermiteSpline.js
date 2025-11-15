"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HermiteSpline = void 0;
var HermiteSpline;
(function (HermiteSpline) {
    function interpolateHermite(pointA, // Start point
    forwardA, // Forward direction at A
    pointB, // End point
    forwardB, // Forward direction at B
    resolution, // Number of points in the curve
    tangentScale // the scale of the curve
    ) {
        const curve = [];
        resolution = Math.max(2, resolution); // Ensure at least 2 points
        // Scale the forward vectors to control curve shape
        const tangentA = [
            forwardA.x * tangentScale,
            forwardA.y * tangentScale,
            forwardA.z * tangentScale,
        ];
        const tangentB = [
            forwardB.x * tangentScale,
            forwardB.y * tangentScale,
            forwardB.z * tangentScale,
        ];
        for (let i = 0; i < resolution; i++) {
            const t = i / (resolution - 1); // Normalize t in range [0, 1]
            // Hermite basis functions
            const h1 = 2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1; // Blends P0
            const h2 = -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2); // Blends P1
            const h3 = Math.pow(t, 3) - 2 * Math.pow(t, 2) + t; // Blends T0
            const h4 = Math.pow(t, 3) - Math.pow(t, 2); // Blends T1
            // Compute interpolated point
            const x = h1 * pointA.x + h2 * pointB.x + h3 * tangentA[0] + h4 * tangentB[0];
            const y = h1 * pointA.y + h2 * pointB.y + h3 * tangentA[1] + h4 * tangentB[1];
            const z = h1 * pointA.z + h2 * pointB.z + h3 * tangentA[2] + h4 * tangentB[2];
            curve.push(new vec3(x, y, z));
        }
        return curve;
    }
    HermiteSpline.interpolateHermite = interpolateHermite;
    function drawCurve(posA, fwdA, posB, fwdB, myResolution) {
        let dir = posA.sub(posB);
        let mag = dir.length;
        let resolution = myResolution ? myResolution : Math.floor(mag / 20);
        resolution = Math.max(resolution, 5);
        let curveScale = Math.max(50, resolution * 50);
        let curvePoints = HermiteSpline.interpolateHermite(posA, fwdA, posB, fwdB, resolution, curveScale);
        return curvePoints;
    }
    HermiteSpline.drawCurve = drawCurve;
})(HermiteSpline || (exports.HermiteSpline = HermiteSpline = {}));
//# sourceMappingURL=HermiteSpline.js.map