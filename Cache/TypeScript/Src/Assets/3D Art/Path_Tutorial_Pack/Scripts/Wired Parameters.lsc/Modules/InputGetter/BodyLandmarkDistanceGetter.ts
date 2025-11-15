import { Body } from '../Body';
import { Getter } from './Getter.types';
import { BodyLandmarks } from '../WiredParametersInput';

interface BodyLandmarkDistanceInput {
    landmarkFrom: keyof BodyLandmarks,
    landmarkTo: keyof BodyLandmarks,
    body: Body
}

export function invokeGetterFromBodyLandmarkDistanceInput(inputValues: BodyLandmarkDistanceInput): Getter {
    return () => inputValues.body.getPosition(inputValues.landmarkFrom)
        .distance(inputValues.body.getPosition(inputValues.landmarkTo));
}
