import { Setter } from './Setter.types';

interface BlendshapeInput {
    mesh: RenderMeshVisual,
    blendshape: string,
    from: number,
    to: number
}

export function invokeSetterFromBlendshapeInput(inputValues: BlendshapeInput): Setter {
    return (v: number, lerp: number = 1.0) => {
        const targetWeight: number = MathUtils.lerp(inputValues.from, inputValues.to, v);
        const currentWeight: number = inputValues.mesh.getBlendShapeWeight(inputValues.blendshape);
        const result: number = MathUtils.lerp(currentWeight, targetWeight, lerp);
        inputValues.mesh.setBlendShapeWeight(inputValues.blendshape, result);
        return result;
    };
}
