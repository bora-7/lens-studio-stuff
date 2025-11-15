import { AngleUtils } from '../Utils/AngleUtils';

export abstract class BaseTransformManipulator {
    constructor(protected readonly t: Transform) { }
    abstract get(): vec3
    abstract set(v: vec3): void
}

export class WorldPositionManipulator extends BaseTransformManipulator {
    get(): vec3 {
        return this.t.getWorldPosition();
    }

    set(v: vec3): void {
        this.t.setWorldPosition(v);
    }
}

export class LocalPositionManipulator extends BaseTransformManipulator {
    get(): vec3 {
        return this.t.getLocalPosition();
    }

    set(v: vec3): void {
        this.t.setLocalPosition(v);
    }
}

export class WorldScaleManipulator extends BaseTransformManipulator {
    get(): vec3 {
        return this.t.getWorldScale();
    }

    set(v: vec3): void {
        this.t.setWorldScale(v);
    }
}

export class LocalScaleManipulator extends BaseTransformManipulator {
    get(): vec3 {
        return this.t.getLocalScale();
    }

    set(v: vec3): void {
        this.t.setLocalScale(v);
    }
}

export class WorldRotationManipulator extends BaseTransformManipulator {
    get(): vec3 {
        const eulerAngles: vec3 = this.t.getWorldRotation().toEulerAngles();
        const eulerAnglesDegrees: vec3 = AngleUtils.eulerAnglesToDegrees(eulerAngles);
        eulerAnglesDegrees.x = AngleUtils.clampAngleDegrees(eulerAnglesDegrees.x);
        eulerAnglesDegrees.y = AngleUtils.clampAngleDegrees(eulerAnglesDegrees.y);
        eulerAnglesDegrees.z = AngleUtils.clampAngleDegrees(eulerAnglesDegrees.z);
        return eulerAnglesDegrees;
    }

    set(rotation: vec3): void {
        const eulerAnglesRadians: vec3 = AngleUtils.eulerAnglesToRadians(rotation);
        const quatRotation: quat = quat.fromEulerVec(eulerAnglesRadians);
        this.t.setWorldRotation(quatRotation);
    }
}

export class LocalRotationManipulator extends BaseTransformManipulator {
    get(): vec3 {
        const eulerAngles: vec3 = this.t.getLocalRotation().toEulerAngles();
        const eulerAnglesDegrees: vec3 = AngleUtils.eulerAnglesToDegrees(eulerAngles);
        eulerAnglesDegrees.x = AngleUtils.clampAngleDegrees(eulerAnglesDegrees.x);
        eulerAnglesDegrees.y = AngleUtils.clampAngleDegrees(eulerAnglesDegrees.y);
        eulerAnglesDegrees.z = AngleUtils.clampAngleDegrees(eulerAnglesDegrees.z);
        return eulerAnglesDegrees;
    }

    set(rotation: vec3): void {
        const eulerAnglesRadians: vec3 = AngleUtils.eulerAnglesToRadians(rotation);
        const quatRotation: quat = quat.fromEulerVec(eulerAnglesRadians);
        this.t.setLocalRotation(quatRotation);
    }
}

export class LocalRotationManipulatorSinus extends BaseTransformManipulator {
    constructor(protected readonly t: Transform, protected readonly shift: vec3) {
        super(t);
    }

    get(): vec3 {
        const shiftedEulerAngles: vec3 = this.t.getLocalRotation().toEulerAngles()
            .add(this.shift);
        return AngleUtils.eulerAnglesToSin(shiftedEulerAngles);
    }

    set(v: vec3) {
        const arcsinEulerAngles: vec3 = AngleUtils.eulerAnglesToArcsin(v.sub(this.shift));
        const arcsinRotation: quat = quat.fromEulerVec(arcsinEulerAngles);
        this.t.setLocalRotation(arcsinRotation);
    }
}

export class WorldRotationManipulatorSinus extends BaseTransformManipulator {
    constructor(protected readonly t: Transform, protected readonly shift: vec3) {
        super(t);
    }

    get(): vec3 {
        const shiftedEulerAngles: vec3 = this.t.getWorldRotation().toEulerAngles()
            .add(this.shift);
        return AngleUtils.eulerAnglesToSin(shiftedEulerAngles);
    };
    set = (v: vec3) => {
        const arcsinEulerAngles: vec3 = AngleUtils.eulerAnglesToArcsin(v.sub(this.shift));
        const arcsinRotation: quat = quat.fromEulerVec(arcsinEulerAngles);
        this.t.setWorldRotation(arcsinRotation);
    };
}
