import { Getter } from './Getter.types';
import { TransformAxis2D } from '../WiredParametersInput';

interface HeadLandmarkInput {
    head: Head,
    landmark: number,
    axis: keyof TransformAxis2D
}

export function invokeGetterFromHeadLandmarkInput(inputValues: HeadLandmarkInput): Getter {
    return () => {
        if (inputValues.head.getFacesCount() > inputValues.head.faceIndex) {
            return inputValues.head.getLandmark(inputValues.landmark)[inputValues.axis];
        }
    };
}
