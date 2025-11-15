import { Getter } from './Getter.types';

interface SODistanceInput {
    from: SceneObject,
    to: SceneObject
}

export function invokeGetterFromSODistanceInput(inputValues: SODistanceInput): Getter {
    const fromT: Transform = inputValues.from.getTransform(),
        toT: Transform = inputValues.to.getTransform();

    return () => fromT.getWorldPosition().distance(toT.getWorldPosition());
}
