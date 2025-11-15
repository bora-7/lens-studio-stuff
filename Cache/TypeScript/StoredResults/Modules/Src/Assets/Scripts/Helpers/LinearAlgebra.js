"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearAlgebra = void 0;
var LinearAlgebra;
(function (LinearAlgebra) {
    const vec3up = vec3.up();
    function intersectLinePlane(linePoint, // Point on the line (x0, y0, z0)
    lineDir, // Direction vector of the line (a, b, c)
    planePoint, // Point on plane
    planeNormal // Normal vector of the plane (A, B, C)
    ) {
        const [x0, y0, z0] = [linePoint.x, linePoint.y, linePoint.z];
        const [a, b, c] = [lineDir.x, lineDir.y, lineDir.z];
        const [x1, y1, z1] = [planePoint.x, planePoint.y, planePoint.z];
        const [A, B, C] = [planeNormal.x, planeNormal.y, planeNormal.z];
        // Compute plane D
        const planeD = A * x1 + B * y1 + C * z1;
        // Compute the denominator: A*a + B*b + C*c
        const denominator = A * a + B * b + C * c;
        // If the denominator is zero, the line is parallel to the plane
        if (denominator === 0) {
            return undefined; // No intersection (or line lies in the plane)
        }
        // Compute t using the formula
        const t = (planeD - (A * x0 + B * y0 + C * z0)) / denominator;
        // Compute the intersection point
        const x = x0 + a * t;
        const y = y0 + b * t;
        const z = z0 + c * t;
        return new vec3(x, y, z);
    }
    LinearAlgebra.intersectLinePlane = intersectLinePlane;
    function linearlerp(start, end, t) {
        return (1 - t) * start + t * end;
    }
    LinearAlgebra.linearlerp = linearlerp;
    ;
    function flatNor(nor) {
        nor.y = 0;
        nor = nor.normalize();
        return nor;
    }
    LinearAlgebra.flatNor = flatNor;
    function getFwdAToB(pointA, pointB) {
        let fwd = pointB.sub(pointA);
        fwd = fwd.normalize();
        return fwd;
    }
    LinearAlgebra.getFwdAToB = getFwdAToB;
    function getOffsetPoint(point, fwd, offset) {
        return point.add(fwd.uniformScale(offset));
    }
    LinearAlgebra.getOffsetPoint = getOffsetPoint;
    function getLastPathFwd(points, cameraTransform) {
        let fwd;
        if (points.length > 1) {
            // Try to get the direction from second to last point to the last point
            fwd = LinearAlgebra.getFwdAToB(points[points.length - 2], points[points.length - 1]);
        }
        else {
            // If we don't have enough points, use the camera forward
            fwd = LinearAlgebra.flatNor(cameraTransform.back);
        }
        return fwd;
    }
    LinearAlgebra.getLastPathFwd = getLastPathFwd;
    function flippedRot(rot, up) {
        return quat.angleAxis(Math.PI, up).multiply(rot);
    }
    LinearAlgebra.flippedRot = flippedRot;
    function getNextPathPointAndFwd(points, cameraTransform, offset) {
        // Use the last path point, and last path forward and camera forward to offset the next point 
        let lastPathFwd = LinearAlgebra.getLastPathFwd(points, cameraTransform);
        let camFwd = LinearAlgebra.flatNor(cameraTransform.back);
        let fwdForOffset = lastPathFwd.add(camFwd).normalize();
        let pos = LinearAlgebra.getOffsetPoint(points[points.length - 1], fwdForOffset, offset);
        // Return the camera forward as the next point's forward
        return { pos, fwd: camFwd };
    }
    LinearAlgebra.getNextPathPointAndFwd = getNextPathPointAndFwd;
    function setPointY(pt, y) {
        pt.y = y;
        return pt;
    }
    LinearAlgebra.setPointY = setPointY;
    function computeCurveRotations(points) {
        if (points.length < 2) {
            return points.map(p => quat.quatIdentity());
        }
        const result = [];
        for (let i = 0; i < points.length; i++) {
            let forward;
            if (i === points.length - 1) {
                // Last looks to prior point
                forward = points[i - 1].sub(points[i]);
            }
            else {
                // All else look from the last point
                forward = points[i].sub(points[i + 1]);
            }
            forward = forward.normalize();
            const rotation = quat.lookAt(forward, vec3up);
            result.push(rotation);
        }
        return result;
    }
    LinearAlgebra.computeCurveRotations = computeCurveRotations;
})(LinearAlgebra || (exports.LinearAlgebra = LinearAlgebra = {}));
//# sourceMappingURL=LinearAlgebra.js.map