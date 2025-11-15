import { Getter } from './Getter.types';

interface AbsoluteRotationInput {
    so: SceneObject,
    coef: vec3
}

export function invokeGetterFromAbsoluteRotationInput(inputValues: AbsoluteRotationInput): Getter {
    const t: Transform = inputValues.so.getTransform();
    return () => Math.abs(t.getWorldRotation().toEulerAngles()
        .dot(inputValues.coef));
}
