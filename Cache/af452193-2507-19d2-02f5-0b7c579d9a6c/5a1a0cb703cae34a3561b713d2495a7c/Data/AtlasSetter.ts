import { Setter } from './Setter.types';

interface AtlasInput {
    texture: Texture,
    yoyo: boolean,
    from: number,
    to: number
}

export function invokeSetterFromAtlasInput(inputValues: AtlasInput): Setter {
    const animatedProvider = inputValues.texture.control as AnimatedTextureFileProvider;
    const totalFrames = animatedProvider.getFramesCount();
    return (v: number, lerp: number = 1.0) => {
        const targetValue: number = MathUtils.lerp(inputValues.from, inputValues.to, v);
        const currentValue: number = animatedProvider.getCurrentPlayingFrame();
        let lerpValue: number = Math.round(MathUtils.lerp(currentValue, targetValue, lerp));
        if (inputValues.yoyo) {
            lerpValue = Math.abs(lerpValue);
        } else if (lerpValue < 0) {
            lerpValue += (Math.floor(-lerpValue / totalFrames) + 1) * totalFrames;
        }
        animatedProvider.pauseAtFrame(lerpValue);
        return lerpValue;
    };
}
