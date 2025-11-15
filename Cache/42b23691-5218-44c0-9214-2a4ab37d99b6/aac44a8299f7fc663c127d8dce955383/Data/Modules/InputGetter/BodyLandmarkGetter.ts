import { BodyLandmarks, TransformAxis } from '../WiredParametersInput';
import { Getter } from './Getter.types';
import { Body } from '../Body';
import { TransformManipulatorBuilder, TransformProperty } from '../TransformManipulator/TransformManipulatorBuilder';
import { BaseTransformManipulator } from '../TransformManipulator/TransformManipulators';

interface BodyLandmarkInput {
    body: Body
    landmark: keyof BodyLandmarks,
    property: TransformProperty,
    axis: keyof TransformAxis
}

export function invokeGetterFromBodyLandmarkInput(inputValues: BodyLandmarkInput): Getter {
    const manipulator: BaseTransformManipulator = TransformManipulatorBuilder.get(inputValues.body.getTransform(inputValues.landmark), inputValues.property);
    return () => manipulator.get()[inputValues.axis];
}
