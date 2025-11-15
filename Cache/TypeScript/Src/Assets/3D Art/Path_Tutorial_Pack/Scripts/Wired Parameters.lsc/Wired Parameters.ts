import {
    BodyLandmarks,
    InputPropertyType,
    OutputPropertyType,
    OutputType,
    TransformAxis,
    TransformAxis2D,
    TransformType,
    WiredParametersInput
} from './Modules/WiredParametersInput';
import {invokeGetterFromTransformInput} from './Modules/InputGetter/TransformGetter';
import {invokeGetterFromAssetInput} from './Modules/InputGetter/AssetGetter';
import {invokeGetterFromComponentInput} from './Modules/InputGetter/ComponentGetter';
import {invokeGetterFromSODistanceInput} from './Modules/InputGetter/SODistanceGetter';
import {Body} from './Modules/Body';
import {invokeGetterFromBodyLandmarkDistanceInput} from './Modules/InputGetter/BodyLandmarkDistanceGetter';
import {invokeGetterFromAbsoluteRotationInput} from './Modules/InputGetter/AbsoluteRotationGetter';
import {invokeGetterFromBlendshapeInput} from './Modules/InputGetter/BlendshapeGetter';
import {invokeGetterFromFaceExpressionInput} from './Modules/InputGetter/FaceExpressionGetter';
import {DestructionHelper} from './Modules/Scene/DestructionHelper';
import {invokeGetterFromHeadLandmarkInput} from './Modules/InputGetter/HeadLandmarkGetter';
import {invokeGetterFromBodyLandmarkInput} from './Modules/InputGetter/BodyLandmarkGetter';
import {Getter} from './Modules/InputGetter/Getter.types';
import {Setter} from './Modules/OutputSetter/Setter.types';
import {
    invokeSetterFromTransformAxisInput,
    invokeSetterFromTransformVecInput
} from './Modules/OutputSetter/TransformSetter';
import {invokeSetterFromComponentInput} from './Modules/OutputSetter/ComponentSetter';
import {invokeSetterFromAssetInput} from './Modules/OutputSetter/AssetSetter';
import {invokeSetterFromBlendshapeInput} from './Modules/OutputSetter/BlendshapeSetter';
import {invokeSetterFromAnimationWeightInput} from './Modules/OutputSetter/AnimationWeightSetter';
import {invokeSetterFromAtlasInput} from './Modules/OutputSetter/AtlasSetter';
import {EasingFunction, easings} from './Modules/Animation/Easing';

export type LerpValue = number | vec2 | vec3 | vec4 | quat;
export type LerpF = (from: LerpValue, to: LerpValue, time: number) => LerpValue;

@component
export class WiredParameters extends WiredParametersInput {
    private readonly destructionHelper: DestructionHelper = new DestructionHelper();

    private getter: Getter;
    private setter: Setter;
    private easing: EasingFunction;

    onAwake() {
        if (!this.validInputs()) {
            return;
        }
        this.invokeInputGetter();
        this.invokeOutputSetter();
        this.initializeEasingFunction();
        this.initializeUpdateEvent();
    }

    private validInputs(): boolean {
        if (this.inputMode === InputPropertyType.Transform && isNull(this.inputSO)) {
            print("Warning! Transform input is missing.");
            return false;
        }

        if (this.inputMode === InputPropertyType.Asset && isNull(this.inputAsset)) {
            print("Warning! Asset input is missing.");
            return false;
        }

        if (this.inputMode === InputPropertyType.DistanceBetweenPoints && (isNull(this.inputDistanceSOFrom) || isNull(this.inputDistanceSOTo))) {
            print("Warning! Object input is missing.");
            return false;
        }

        if (this.inputMode === InputPropertyType.AbsoluteRotation && isNull(this.inputAbsoluteRotationSO)) {
            print("Warning! Object input is missing.");
            return false;
        }

        if (this.inputMode === InputPropertyType.Blendshape && isNull(this.inputBlendshapeMesh)) {
            print("Warning! Mesh input is missing.");
            return false;
        }

        if (this.inputMode === InputPropertyType.FaceExpression && isNull(this.inputFaceMesh)) {
            print("Warning! Face Mesh input is missing.");
            return false;
        }

        if (this.outputMode === OutputPropertyType.Transform && isNull(this.outputSO)) {
            print("Warning! Transform input is missing.");
            return false;
        }

        if (this.outputMode === OutputPropertyType.Asset && isNull(this.outputAsset)) {
            print("Warning! Asset input is missing.");
            return false;
        }

        if (this.outputMode === OutputPropertyType.Component && isNull(this.outputComponent)) {
            print("Warning! Component input is missing.");
            return false;
        }

        if (this.outputMode === OutputPropertyType.Blendshape && isNull(this.outputBlendshapeMesh)) {
            print("Warning! Mesh input is missing.");
            return false;
        }

        if (this.outputMode === OutputPropertyType.Atlas && isNull(this.outputAtlasTexture)) {
            print("Warning! Texture input is missing.");
            return false;
        }

        if (this.outputMode === OutputPropertyType.AnimationWeight && isNull(this.outputAnimationMixer)) {
            print("Warning! Animation Mixer input is missing.");
            return false;
        }

        return true;
    }

    /**
     * Invokes getter function depending on selected input options.
     * @private
     */
    private invokeInputGetter(): void {
        switch (this.inputMode) {
            case InputPropertyType.Transform:
                this.getter = invokeGetterFromTransformInput({
                    so: this.inputSO,
                    property: this.inputTransformProperty,
                    axis: TransformAxis[this.inputTransformAxis] as keyof TransformAxis
                });
                break;
            case InputPropertyType.Asset:
                this.getter = invokeGetterFromAssetInput({
                    asset: this.inputAsset,
                    propertyName: this.inputAssetProperty
                });
                break;
            case InputPropertyType.Component:
                this.getter = invokeGetterFromComponentInput({
                    component: this.inputComponent,
                    propertyName: this.inputComponentProperty
                });
                break;
            case InputPropertyType.DistanceBetweenPoints:
                this.getter = invokeGetterFromSODistanceInput({
                    from: this.inputDistanceSOFrom,
                    to: this.inputDistanceSOTo
                });
                break;
            case InputPropertyType.DistanceBodyMesh:
                this.getter = invokeGetterFromBodyLandmarkDistanceInput({
                    landmarkFrom: BodyLandmarks[this.inputBodyLandmarkFrom] as keyof BodyLandmarks,
                    landmarkTo: BodyLandmarks[this.inputBodyLandmarkTo] as keyof BodyLandmarks,
                    body: this.getBody()
                });
                break;
            case InputPropertyType.AbsoluteRotation:
                this.getter = invokeGetterFromAbsoluteRotationInput({
                    so: this.inputAbsoluteRotationSO,
                    coef: this.inputAbsoluteRotationCoef
                });
                break;
            case InputPropertyType.Blendshape:
                this.getter = invokeGetterFromBlendshapeInput({
                    mesh: this.inputBlendshapeMesh,
                    name: this.inputBlendshapeName
                });
                break;
            case InputPropertyType.FaceExpression:
                this.getter = invokeGetterFromFaceExpressionInput({
                    head: this.getHead((this.inputFaceMesh.mesh.control as FaceRenderObjectProvider).faceIndex),
                    face: this.inputFaceMesh.mesh.control as FaceRenderObjectProvider,
                    expression: this.inputFaceExpressionName
                });
                break;
            case InputPropertyType.HeadLandmark:
                this.getter = invokeGetterFromHeadLandmarkInput({
                    head: this.getHead(this.inputHeadIndex),
                    landmark: this.inputHeadLandmark,
                    axis: TransformAxis2D[this.inputHeadTransformAxis] as keyof TransformAxis2D
                });
                break;
            case InputPropertyType.BodyLandmark:
                this.getter = invokeGetterFromBodyLandmarkInput({
                    body: this.getBody(),
                    landmark: BodyLandmarks[this.inputBodyLandmark] as keyof BodyLandmarks,
                    property: this.inputBodyTransformProperty,
                    axis: TransformAxis[this.inputBodyTransformAxis] as keyof TransformAxis
                });
                break;
            default:
                this.printWarning('Invalid Input Mode: ' + this.inputMode);
                break;
        }
    }

    /**
     * Invokes setter function depending on selected input options.
     * @private
     */
    private invokeOutputSetter(): void {
        switch (this.outputMode) {
            case OutputPropertyType.Transform: {
                switch (this.outputTransformValue) {
                    case TransformType.Axis:
                        this.setter = invokeSetterFromTransformVecInput({
                            so: this.outputSO,
                            property: this.outputTransformProperty,
                            from: this.outputTransformVecFrom,
                            to: this.outputTransformVecTo,
                        });
                        break;
                    case TransformType.Vec3:
                        this.setter = invokeSetterFromTransformAxisInput({
                            so: this.outputSO,
                            property: this.outputTransformProperty,
                            axis: TransformAxis[this.outputTransformAxis] as keyof TransformAxis,
                            from: this.outputTransformAxisFrom,
                            to: this.outputTransformAxisTo
                        });
                        break;
                    default:
                        this.printWarning('Invalid Transform Output Type: ' + this.outputTransformValue);
                        break;
                }
                break;
            }
            case OutputPropertyType.Component: {
                let from: LerpValue,
                    to: LerpValue,
                    lerpF: LerpF;

                switch (this.outputComponentValue) {
                    case OutputType.Float:
                        from = this.outputComponentFloatFrom;
                        to = this.outputComponentFloatTo;
                        lerpF = MathUtils.lerp;
                        break;
                    case OutputType.Vec2:
                        from = this.outputComponentVec2From;
                        to = this.outputComponentVec2To;
                        lerpF = vec2.lerp;
                        break;
                    case OutputType.Vec3:
                        from = this.outputComponentVec3From;
                        to = this.outputComponentVec3To;
                        lerpF = vec3.lerp;
                        break;
                    case OutputType.RGB:
                        from = this.outputComponentRGBFrom;
                        to = this.outputComponentRGBTo;
                        lerpF = vec3.lerp;
                        break;
                    case OutputType.RGBA:
                        from = this.outputComponentRGBAFrom;
                        to = this.outputComponentRGBATo;
                        lerpF = vec4.lerp;
                        break;
                    default:
                        this.printWarning('Invalid Component Output Type: ' + this.outputComponentValue);
                        break;
                }
                this.setter = invokeSetterFromComponentInput({
                    component: this.outputComponent,
                    property: this.outputComponentProperty,
                    from: from,
                    to: to,
                    lerp: lerpF
                });
                break;
            }
            case OutputPropertyType.Asset: {
                let from: LerpValue,
                    to: LerpValue,
                    lerpF: LerpF;

                switch (this.outputAssetValue) {
                    case OutputType.Float:
                        from = this.outputAssetFloatFrom;
                        to = this.outputAssetFloatTo;
                        lerpF = MathUtils.lerp;
                        break;
                    case OutputType.Vec2:
                        from = this.outputAssetVec2From;
                        to = this.outputAssetVec2To;
                        lerpF = vec2.lerp;
                        break;
                    case OutputType.Vec3:
                        from = this.outputAssetVec3From;
                        to = this.outputAssetVec3To;
                        lerpF = vec3.lerp;
                        break;
                    case OutputType.RGB:
                        from = this.outputAssetRGBFrom;
                        to = this.outputAssetRGBTo;
                        lerpF = vec3.lerp;
                        break;
                    case OutputType.RGBA:
                        from = this.outputAssetRGBAFrom;
                        to = this.outputAssetRGBATo;
                        lerpF = vec4.lerp;
                        break;
                    default:
                        this.printWarning('Invalid Asset Output Type: ' + this.outputAssetValue);
                        break;
                }
                this.setter = invokeSetterFromAssetInput({
                    asset: this.outputAsset,
                    property: this.outputAssetProperty,
                    from: from,
                    to: to,
                    lerp: lerpF
                });
                break;
            }
            case OutputPropertyType.Blendshape:
                this.setter = invokeSetterFromBlendshapeInput({
                    mesh: this.outputBlendshapeMesh,
                    blendshape: this.outputBlendshapeName,
                    from: this.outputBlendshapeFrom,
                    to: this.outputBlendshapeTo
                });
                break;
            case OutputPropertyType.AnimationWeight:
                this.setter = invokeSetterFromAnimationWeightInput({
                    mixer: this.outputAnimationMixer,
                    layer: this.outputAnimationMixerLayer,
                    from: this.outputAnimationMixerFrom,
                    to: this.outputAnimationMixerTo
                });
                break;
            case OutputPropertyType.Atlas:
                this.setter = invokeSetterFromAtlasInput({
                    texture: this.outputAtlasTexture,
                    yoyo: this.outputAtlasYoyo,
                    from: this.outputAtlasFrom,
                    to: this.outputAtlasTo
                });
                break;
            default:
                this.printWarning('Invalid Output Mode: ' + this.outputMode);
                break;
        }
    }

    private initializeEasingFunction(): void {
        this.easing = easings[this.interpolation];
    }

    private initializeUpdateEvent(): void {
        this.createEvent('UpdateEvent').bind(() => {
            let value = this.getter();
            if (value !== undefined) {
                this.printDebug('Input Value: ' + value.toFixed(2));
                value = MathUtils.clamp(value, this.fromValue, this.toValue);
                value = MathUtils.remap(value, this.fromValue, this.toValue, 0.0, 1.0);
                const result: LerpValue = this.setter(this.easing(value), this.lerp ? this.lerpCoef : 1.0);
                if (typeof result === 'number') {
                    this.printDebug('Result Value: ' + result.toFixed(2));
                } else {
                    this.printDebug('Result Value: ' + result);
                }
            }
        });
    }

    private getHead(faceIndex: number): Head {
        const headSO: SceneObject = this.destructionHelper.createSceneObject();
        const headC = this.destructionHelper.getOrAddComponent(headSO, 'Head');
        headC.faceIndex = faceIndex;
        return headC;
    }

    private getBody(): Body {
        return new Body(this.bodyPrefab);
        
    }

}
