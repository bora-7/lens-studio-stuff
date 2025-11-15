import { Setter } from './Setter.types';
import { BaseTransformManipulator } from '../TransformManipulator/TransformManipulators';
import { TransformManipulatorBuilder, TransformProperty } from '../TransformManipulator/TransformManipulatorBuilder';
import { TransformAxis } from '../WiredParametersInput';

interface TransformInput {
    so: SceneObject,
    property: TransformProperty
}

interface TransformVecInput extends TransformInput {
    from: vec3,
    to: vec3
}

interface TransformAxisInput extends TransformInput {
    axis: keyof TransformAxis
    from: number,
    to: number
}

export function invokeSetterFromTransformVecInput(inputValues: TransformVecInput): Setter {
    const t: Transform = inputValues.so.getTransform();
    const manipulator: BaseTransformManipulator = TransformManipulatorBuilder.get(t, inputValues.property);
    return (v: number, lerp: number = 1.0) => {
        const targetValue: vec3 = vec3.lerp(inputValues.from, inputValues.to, v);
        const result: vec3 = vec3.lerp(manipulator.get(), targetValue, lerp);
        manipulator.set(result);
        return result;
    };
}

export function invokeSetterFromTransformAxisInput(inputValues: TransformAxisInput): Setter {
    const t: Transform = inputValues.so.getTransform();
    const manipulator: BaseTransformManipulator = TransformManipulatorBuilder.get(t, inputValues.property);
    return (v: number, lerp: number = 1.0) => {
        const targetValue: vec3 = manipulator.get();
        targetValue[inputValues.axis] = MathUtils.lerp(inputValues.from, inputValues.to, v);
        const result: vec3 = vec3.lerp(manipulator.get(), targetValue, lerp);
        manipulator.set(result);
        return result.x;
    };
}
