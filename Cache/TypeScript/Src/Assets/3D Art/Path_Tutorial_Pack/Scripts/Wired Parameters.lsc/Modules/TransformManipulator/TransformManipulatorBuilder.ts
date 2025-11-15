import {
    BaseTransformManipulator,
    LocalPositionManipulator,
    LocalRotationManipulator,
    LocalRotationManipulatorSinus,
    LocalScaleManipulator,
    WorldPositionManipulator,
    WorldRotationManipulator,
    WorldRotationManipulatorSinus,
    WorldScaleManipulator
} from './TransformManipulators';

export enum TransformProperty {
    WorldPosition,
    WorldRotation,
    WorldScale,
    LocalPosition,
    LocalRotation,
    LocalScale,
    WorldRotationSinus,
    LocalRotationSinus
}

export class TransformManipulatorBuilder {
    static get(t: Transform, p: TransformProperty, worldShift = vec3.zero(), localShift = vec3.zero()): BaseTransformManipulator {
        switch (p) {
            case TransformProperty.WorldPosition:
                return new WorldPositionManipulator(t);
            case TransformProperty.WorldScale:
                return new WorldScaleManipulator(t);
            case TransformProperty.WorldRotation:
                return new WorldRotationManipulator(t);
            case TransformProperty.LocalPosition:
                return new LocalPositionManipulator(t);
            case TransformProperty.LocalScale:
                return new LocalScaleManipulator(t);
            case TransformProperty.LocalRotation:
                return new LocalRotationManipulator(t);
            case TransformProperty.WorldRotationSinus:
                return new WorldRotationManipulatorSinus(t, worldShift.uniformScale(MathUtils.DegToRad));
            case TransformProperty.LocalRotationSinus:
                return new LocalRotationManipulatorSinus(t, localShift.uniformScale(MathUtils.DegToRad));
            default:
                const check: never = p;
        }
    }
}
