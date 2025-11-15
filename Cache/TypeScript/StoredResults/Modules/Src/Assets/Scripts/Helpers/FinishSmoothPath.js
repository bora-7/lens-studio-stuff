"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishSmoothPath = void 0;
const CatmullRomSpline_1 = require("./CatmullRomSpline");
const HermiteSpline_1 = require("./HermiteSpline");
const LinearAlgebra_1 = require("./LinearAlgebra");
const ResampleCurve_1 = require("./ResampleCurve");
var FinishSmoothPath;
(function (FinishSmoothPath) {
    function finishSmoothPath(pathPoints, finishTransform, cameraTransform, offset, hermiteResolution, resampleResoluton) {
        let a = LinearAlgebra_1.LinearAlgebra.getNextPathPointAndFwd(pathPoints, cameraTransform, offset);
        let finishPoints = HermiteSpline_1.HermiteSpline.drawCurve(a.pos, a.fwd, finishTransform.getWorldPosition(), finishTransform.forward, hermiteResolution);
        pathPoints = pathPoints.concat(finishPoints);
        pathPoints = ResampleCurve_1.ResampleCurve.resampleCurve(pathPoints, Math.floor(pathPoints.length / resampleResoluton));
        // Generate spline
        const splinePoints = CatmullRomSpline_1.CatmullRomSpline.generateSpline(pathPoints, resampleResoluton);
        return { pathPoints, splinePoints };
    }
    FinishSmoothPath.finishSmoothPath = finishSmoothPath;
})(FinishSmoothPath || (exports.FinishSmoothPath = FinishSmoothPath = {}));
//# sourceMappingURL=FinishSmoothPath.js.map