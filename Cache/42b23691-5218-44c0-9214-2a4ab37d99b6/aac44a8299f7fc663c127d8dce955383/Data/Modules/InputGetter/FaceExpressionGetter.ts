import { Getter } from './Getter.types';

interface FaceExpressionInput {
    head: Head,
    face: FaceRenderObjectProvider,
    expression: keyof Expressions
}

export function invokeGetterFromFaceExpressionInput(inputValues: FaceExpressionInput): Getter {
    return () => {
        if (inputValues.head.getFacesCount() > inputValues.head.faceIndex) {
            return inputValues.face.getExpressionWeightByName(inputValues.expression);
        }
    };
}
