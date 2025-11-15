import { TransformAxis } from '../WiredParametersInput';
import { TransformManipulatorBuilder, TransformProperty } from '../TransformManipulator/TransformManipulatorBuilder';
import { BaseTransformManipulator } from '../TransformManipulator/TransformManipulators';
import { Getter } from './Getter.types';

interface TransformInput {
    so: SceneObject,
    property: TransformProperty,
    axis: keyof TransformAxis
}

export function invokeGetterFromTransformInput(inputValues: TransformInput): Getter {
    const t: Transform = inputValues.so.getTransform();
    const manipulator: BaseTransformManipulator = TransformManipulatorBuilder.get(t, inputValues.property);
    return () => manipulator.get()[inputValues.axis];
}
