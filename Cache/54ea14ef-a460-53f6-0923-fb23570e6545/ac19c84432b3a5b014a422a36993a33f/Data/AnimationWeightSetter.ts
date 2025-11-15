import { Setter } from './Setter.types';

interface AnimationWeightInput {
    mixer: AnimationMixer,
    layer: string,
    from: number,
    to: number
}

export function invokeSetterFromAnimationWeightInput(inputValues: AnimationWeightInput): Setter {
    const layer: AnimationMixerLayer = inputValues.mixer.getLayer(inputValues.layer);
    return (v: number, lerp: number = 1.0) => {
        const targetValue: number = MathUtils.lerp(inputValues.from, inputValues.to, v);
        const currentValue: number = layer.weight;
        const result: number = MathUtils.lerp(currentValue, targetValue, lerp);
        layer.weight = result;
        return result;
    };
}
