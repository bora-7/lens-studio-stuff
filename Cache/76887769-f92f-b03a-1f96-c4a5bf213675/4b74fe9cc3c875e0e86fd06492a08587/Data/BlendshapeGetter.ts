import { Getter } from './Getter.types';

interface BlendshapeInput {
    mesh: RenderMeshVisual,
    name: string
}

export function invokeGetterFromBlendshapeInput(inputValues: BlendshapeInput):Getter {
    return () => inputValues.mesh.getBlendShapeWeight(inputValues.name);

}
