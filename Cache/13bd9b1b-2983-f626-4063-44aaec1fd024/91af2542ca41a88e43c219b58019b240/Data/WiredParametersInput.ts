import { TransformProperty } from './TransformManipulator/TransformManipulatorBuilder';
import { easings } from './Animation/Easing';
import { ComponentWithPrintOptions } from './Debug/ComponentWithPrintOptions';

export enum InputPropertyType {
    Transform,
    Asset,
    Component,
    BodyLandmark,
    HeadLandmark,
    DistanceBetweenPoints,
    AbsoluteRotation,
    Blendshape,
    FaceExpression,
    DistanceBodyMesh,
}

export enum BodyLandmarks {
    Hips,
    Spine,
    Spine1,
    Spine2,
    Neck,
    Head,
    LeftShoulder,
    LeftArm,
    LeftForeArm,
    LeftHand,
    RightShoulder,
    RightArm,
    RightForeArm,
    RightHand,
    LeftUpLeg,
    LeftLeg,
    LeftFoot,
    LeftToeBase,
    RightUpLeg,
    RightLeg,
    RightFoot,
    RightToeBase
}

export enum TransformAxis {
    x,
    y,
    z
}

export enum TransformAxis2D {
    x,
    y
}

export enum OutputPropertyType {
    Transform,
    Asset,
    Component,
    Blendshape,
    Atlas,
    AnimationWeight
}

export enum OutputType {
    Float,
    Vec2,
    Vec3,
    RGBA,
    RGB
}

export enum TransformType {
    Vec3,
    Axis
}

export class WiredParametersInput extends ComponentWithPrintOptions {

    @input('int', '0')
    @widget(new ComboBoxWidget()
        .addItem('Transform', 0)
        .addItem('Asset', 1)
        .addItem('Component', 2)
        .addItem('Body Tracking Landmark', 3)
        .addItem('Head Tracking Landmark', 4)
        .addItem('Distance Between Scene Objects', 5)
        .addItem('Absolute Rotation', 6)
        .addItem('Blendshape', 7)
        .addItem('Face Expression', 8)
        .addItem('Distance Body Mesh', 9))
    protected inputMode: InputPropertyType;

    /**
     * Transform Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 0)

    @input
    @label('Transform')
    @allowUndefined
    protected inputSO: SceneObject;

    @input('int', '0')
    @label('Property')
    @widget(new ComboBoxWidget()
        .addItem('World Position', 0)
        .addItem('World Rotation', 1)
        .addItem('World Scale', 2)
        .addItem('Local Position', 3)
        .addItem('Local Rotation', 4)
        .addItem('Local Scale', 5)
        .addItem('World Rotation Sinus', 6)
        .addItem('Local Rotation Sinus', 7))
    protected inputTransformProperty: TransformProperty;

    @input('int', '0')
    @label('Axis')
    @widget(new ComboBoxWidget()
        .addItem('X', 0)
        .addItem('Y', 1)
        .addItem('Z', 2))
    protected inputTransformAxis: TransformAxis;

    @ui.group_end

    /**
     * Asset Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 1)

    @input
    @allowUndefined
    @label('Asset')
    protected inputAsset: Asset;

    @input
    @label('Property Name')
    protected inputAssetProperty: string;

    @ui.group_end

    /**
     * Component Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 2)

    @input
    @allowUndefined
    @label('Component')
    protected inputComponent: Component;

    @input
    @label('Property Name')
    protected inputComponentProperty: string;

    @ui.group_end

    /**
     * Body Landmark Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 3)

    @input('int', '0')
    @label('Landmark')
    @widget(new ComboBoxWidget()
        .addItem('Hips', '0')
        .addItem('Spine', '1')
        .addItem('Spine1', '2')
        .addItem('Spine2', '3')
        .addItem('Neck', '4')
        .addItem('Head', '5')
        .addItem('LeftShoulder', '6')
        .addItem('LeftArm', '7')
        .addItem('LeftForeArm', '8')
        .addItem('LeftHand', '9')
        .addItem('RightShoulder', '10')
        .addItem('RightArm', '11')
        .addItem('RightForeArm', '12')
        .addItem('RightHand', '13')
        .addItem('LeftUpLeg', '14')
        .addItem('LeftLeg', '15')
        .addItem('LeftFoot', '16')
        .addItem('LeftToeBase', '17')
        .addItem('RightUpLeg', '18')
        .addItem('RightLeg', '19')
        .addItem('RightFoot', '20')
        .addItem('RightToeBase', '21'))
    protected inputBodyLandmark: BodyLandmarks;

    @input('int', '0')
    @label('Property')
    @widget(new ComboBoxWidget()
        .addItem('World Position', 0)
        .addItem('World Rotation', 1)
        .addItem('World Scale', 2)
        .addItem('Local Position', 3)
        .addItem('Local Rotation', 4)
        .addItem('Local Scale', 5)
        .addItem('World Rotation Sinus', 6)
        .addItem('Local Rotation Sinus', 7))
    protected inputBodyTransformProperty: TransformProperty;

    @input('int', '0')
    @label('Axis')
    @widget(new ComboBoxWidget()
        .addItem('X', 0)
        .addItem('Y', 1)
        .addItem('Z', 2))
    protected inputBodyTransformAxis: TransformAxis;

    @ui.group_end

    /**
     * Head Landmark Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 4)

    @input('int')
    @label('Face Index')
    protected inputHeadIndex: number;

    @input('int')
    @widget(new SpinBoxWidget(0, 74, 1))
    @label('Landmark Index')
    protected inputHeadLandmark: number;

    @input('int', '0')
    @label('Axis')
    @widget(new ComboBoxWidget()
        .addItem('X', 0)
        .addItem('Y', 1))
    protected inputHeadTransformAxis: TransformAxis2D;

    @ui.group_end

    /**
     * Transform Distance Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 5)

    @input
    @label('Object')
    @allowUndefined
    protected inputDistanceSOFrom: SceneObject;

    @input
    @label('Object')
    @allowUndefined
    protected inputDistanceSOTo: SceneObject;

    @ui.group_end

    /**
     * Absolute Rotation Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 6)

    @input
    @label('Object')
    @allowUndefined
    protected inputAbsoluteRotationSO: SceneObject;

    @input('vec3', '{1.0, 1.0, 1.0}')
    @label('Coefficients')
    protected inputAbsoluteRotationCoef: vec3;

    @ui.group_end

    /**
     * Blendshape Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 7)

    @input
    @label('Mesh')
    @allowUndefined
    protected inputBlendshapeMesh: RenderMeshVisual;

    @input
    @label('Blendshape Name')
    protected inputBlendshapeName: string;

    @ui.group_end

    /**
     * Face Expression Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 8)

    @input
    @allowUndefined
    @label('Face Mesh')
    protected inputFaceMesh: RenderMeshVisual;

    @input('string', 'EyeBlinkLeft')
    @label('Expression')
    @widget(new ComboBoxWidget()
        .addItem('EyeBlinkLeft')
        .addItem('EyeBlinkRight')
        .addItem('EyeSquintLeft')
        .addItem('EyeSquintRight')
        .addItem('EyeDownLeft')
        .addItem('EyeDownRight')
        .addItem('EyeInLeft')
        .addItem('EyeInRight')
        .addItem('EyeOpenLeft')
        .addItem('EyeOpenRight')
        .addItem('EyeOutLeft')
        .addItem('EyeOutRight')
        .addItem('EyeUpLeft')
        .addItem('EyeUpRight')
        .addItem('BrowsDownLeft')
        .addItem('BrowsDownRight')
        .addItem('BrowsUpCenter')
        .addItem('BrowsUpLeft')
        .addItem('BrowsUpRight')
        .addItem('JawForward')
        .addItem('JawLeft')
        .addItem('JawOpen')
        .addItem('JawRight')
        .addItem('MouthLeft')
        .addItem('MouthRight')
        .addItem('MouthFrownLeft')
        .addItem('MouthFrownRight')
        .addItem('MouthSmileLeft')
        .addItem('MouthSmileRight')
        .addItem('MouthDimpleLeft')
        .addItem('MouthDimpleRight')
        .addItem('MouthUpLeft')
        .addItem('MouthUpRight')
        .addItem('UpperLipClose')
        .addItem('LowerLipClose')
        .addItem('UpperLipUpLeft')
        .addItem('UpperLipUpRight')
        .addItem('LowerLipDownLeft')
        .addItem('LowerLipDownRight')
        .addItem('LipsFunnel')
        .addItem('LipsPucker')
        .addItem('LowerLipRaise')
        .addItem('UpperLipRaise')
        .addItem('Puff')
        .addItem('CheekSquintLeft')
        .addItem('CheekSquintRight')
        .addItem('SneerLeft')
        .addItem('SneerRight')
        .addItem('MouthStretchLeft')
        .addItem('MouthStretchRight')
        .addItem('MouthClose'))
    protected inputFaceExpressionName: keyof Expressions;

    @ui.group_end

    /**
     * Body Mesh Distance Setup
     * @protected
     */

    @ui.group_start('Input Setup')
    @showIf('inputMode', 9)

    @input('int', '0')
    @label('Landmark From')
    @widget(new ComboBoxWidget()
        .addItem('Hips', '0')
        .addItem('Spine', '1')
        .addItem('Spine1', '2')
        .addItem('Spine2', '3')
        .addItem('Neck', '4')
        .addItem('Head', '5')
        .addItem('LeftShoulder', '6')
        .addItem('LeftArm', '7')
        .addItem('LeftForeArm', '8')
        .addItem('LeftHand', '9')
        .addItem('RightShoulder', '10')
        .addItem('RightArm', '11')
        .addItem('RightForeArm', '12')
        .addItem('RightHand', '13')
        .addItem('LeftUpLeg', '14')
        .addItem('LeftLeg', '15')
        .addItem('LeftFoot', '16')
        .addItem('LeftToeBase', '17')
        .addItem('RightUpLeg', '18')
        .addItem('RightLeg', '19')
        .addItem('RightFoot', '20')
        .addItem('RightToeBase', '21'))
    protected inputBodyLandmarkFrom: BodyLandmarks;

    @input('int', '0')
    @label('Landmark To')
    @widget(new ComboBoxWidget()
        .addItem('Hips', '0')
        .addItem('Spine', '1')
        .addItem('Spine1', '2')
        .addItem('Spine2', '3')
        .addItem('Neck', '4')
        .addItem('Head', '5')
        .addItem('LeftShoulder', '6')
        .addItem('LeftArm', '7')
        .addItem('LeftForeArm', '8')
        .addItem('LeftHand', '9')
        .addItem('RightShoulder', '10')
        .addItem('RightArm', '11')
        .addItem('RightForeArm', '12')
        .addItem('RightHand', '13')
        .addItem('LeftUpLeg', '14')
        .addItem('LeftLeg', '15')
        .addItem('LeftFoot', '16')
        .addItem('LeftToeBase', '17')
        .addItem('RightUpLeg', '18')
        .addItem('RightLeg', '19')
        .addItem('RightFoot', '20')
        .addItem('RightToeBase', '21'))
    protected inputBodyLandmarkTo: BodyLandmarks;

    @ui.group_end

    @ui.separator

    @input
    @label('Input Start Value')
    protected fromValue: number;

    @input('float', '1.0')
    @label('Input End Value')
    protected toValue: number;

    @input('string', 'Linear')
    @widget(new ComboBoxWidget()
        .addItem('Linear', 'Linear')
        .addItem('Sinusoidal In', 'SineIn')
        .addItem('Sinusoidal Out', 'SineOut')
        .addItem('Sinusoidal In Out', 'SineInOut')
        .addItem('Quadratic In', 'QuadIn')
        .addItem('Quadratic Out', 'QuadOut')
        .addItem('Quadratic In Out', 'QuadInOut')
        .addItem('Exponential In', 'ExpoIn')
        .addItem('Exponential Out', 'ExpoOut')
        .addItem('Exponential In Out', 'ExpoInOut')
        .addItem('Elastic In', 'ElasticIn')
        .addItem('Elastic Out', 'ElasticOut')
        .addItem('Elastic In Out', 'ElasticInOut')
        .addItem('Bounce In', 'BounceIn')
        .addItem('Bounce Out', 'BounceOut')
        .addItem('Bounce In Out', 'BounceInOut')
        .addItem('Back In', 'BackIn')
        .addItem('Back Out', 'BackOut')
        .addItem('Back In Out', 'BackInOut'))
    protected interpolation: keyof typeof easings;

    @input
    protected lerp: boolean;

    @input
    @widget(new SliderWidget(0.01, 1.0, 0.01))
    @showIf('lerp')
    @label('Lerp Coefficient')
    protected lerpCoef: number;

    @ui.separator

    @input('int', '0')
    @widget(new ComboBoxWidget()
        .addItem('Transform', 0)
        .addItem('Asset', 1)
        .addItem('Component', 2)
        .addItem('Blendshape', 3)
        .addItem('Atlas', 4)
        .addItem('Animation Weight', 5))
    protected outputMode: OutputPropertyType;

    /**
     * Output Transform Setup
     * @protected
     */

    @ui.group_start('Output Setup')
    @showIf('outputMode', 0)

    @input
    @label('Transform')
    @allowUndefined
    protected outputSO: SceneObject;

    @input('int', '0')
    @label('Property')
    @widget(new ComboBoxWidget()
        .addItem('World Position', 0)
        .addItem('World Rotation', 1)
        .addItem('World Scale', 2)
        .addItem('Local Position', 3)
        .addItem('Local Rotation', 4)
        .addItem('Local Scale', 5)
        .addItem('World Rotation Sinus', 6)
        .addItem('Local Rotation Sinus', 7))
    protected outputTransformProperty: TransformProperty;

    @input('int', '0')
    @label('Transform Value')
    @widget(new ComboBoxWidget()
        .addItem('Axis', 0)
        .addItem('Vec3', 1))
    protected outputTransformValue: TransformType;

    @input('int', '0')
    @label('Axis')
    @showIf('outputTransformValue', 0)
    @widget(new ComboBoxWidget()
        .addItem('X', 0)
        .addItem('Y', 1)
        .addItem('Z', 2))
    protected outputTransformAxis: TransformAxis;

    @input
    @label('From')
    @showIf('outputTransformValue', 0)
    protected outputTransformAxisFrom: number;

    @input
    @label('To')
    @showIf('outputTransformValue', 0)
    protected outputTransformAxisTo: number;

    @input
    @label('From')
    @showIf('outputTransformValue', 1)
    protected outputTransformVecFrom: vec3;

    @input
    @label('To')
    @showIf('outputTransformValue', 1)
    protected outputTransformVecTo: vec3;

    @ui.group_end

    /**
     * Output Asset Setup
     * @protected
     */

    @ui.group_start('Output Setup')
    @showIf('outputMode', 1)

    @input
    @label('Asset')
    @allowUndefined
    protected outputAsset: Asset;

    @input
    @label('Property Name')
    protected outputAssetProperty: string;

    @input('int', '0')
    @label('Type')
    @widget(new ComboBoxWidget()
        .addItem('Number', 0)
        .addItem('Point 2D', 1)
        .addItem('Point 3D', 2)
        .addItem('Color RGBA', 3)
        .addItem('Color RGB', 4))
    protected outputAssetValue: OutputType;

    @input
    @showIf('outputAssetValue', 0)
    @label('From')
    protected outputAssetFloatFrom: number;

    @input
    @showIf('outputAssetValue', 0)
    @label('To')
    protected outputAssetFloatTo: number;

    @input
    @showIf('outputAssetValue', 1)
    @label('From')
    protected outputAssetVec2From: vec2;

    @input
    @showIf('outputAssetValue', 1)
    @label('To')
    protected outputAssetVec2To: vec2;

    @input
    @showIf('outputAssetValue', 2)
    @label('From')
    protected outputAssetVec3From: vec3;

    @input
    @showIf('outputAssetValue', 2)
    @label('To')
    protected outputAssetVec3To: vec3;

    @input('vec4', '{1.0, 1.0, 1.0, 1.0')
    @showIf('outputAssetValue', 3)
    @label('From')
    @widget(new ColorWidget())
    protected outputAssetRGBAFrom: vec4;

    @input('vec4', '{1.0, 1.0, 1.0, 1.0')
    @showIf('outputAssetValue', 3)
    @label('To')
    @widget(new ColorWidget())
    protected outputAssetRGBATo: vec4;

    @input('vec3', '{1.0, 1.0, 1.0')
    @showIf('outputAssetValue', 4)
    @label('From')
    @widget(new ColorWidget())
    protected outputAssetRGBFrom: vec3;

    @input('vec3', '{1.0, 1.0, 1.0')
    @showIf('outputAssetValue', 4)
    @label('To')
    @widget(new ColorWidget())
    protected outputAssetRGBTo: vec3;

    @ui.group_end

    /**
     * Output Component Setup
     * @protected
     */

    @ui.group_start('Output Setup')
    @showIf('outputMode', 2)

    @input
    @label('Component')
    @allowUndefined
    protected outputComponent: Component;

    @input
    @label('Property Name')
    protected outputComponentProperty: string;

    @input('int', '0')
    @label('Type')
    @widget(new ComboBoxWidget()
        .addItem('Number', 0)
        .addItem('Point 2D', 1)
        .addItem('Point 3D', 2)
        .addItem('Color RGBA', 3)
        .addItem('Color RGB', 4))
    protected outputComponentValue: OutputType;

    @input
    @showIf('outputComponentValue', 0)
    @label('From')
    protected outputComponentFloatFrom: number;

    @input
    @showIf('outputComponentValue', 0)
    @label('To')
    protected outputComponentFloatTo: number;

    @input
    @showIf('outputComponentValue', 1)
    @label('From')
    protected outputComponentVec2From: vec2;

    @input
    @showIf('outputComponentValue', 1)
    @label('To')
    protected outputComponentVec2To: vec2;

    @input
    @showIf('outputComponentValue', 2)
    @label('From')
    protected outputComponentVec3From: vec3;

    @input
    @showIf('outputComponentValue', 2)
    @label('To')
    protected outputComponentVec3To: vec3;

    @input('vec4', '{1.0, 1.0, 1.0, 1.0')
    @showIf('outputComponentValue', 3)
    @label('From')
    @widget(new ColorWidget())
    protected outputComponentRGBAFrom: vec4;

    @input('vec4', '{1.0, 1.0, 1.0, 1.0')
    @showIf('outputComponentValue', 3)
    @label('To')
    @widget(new ColorWidget())
    protected outputComponentRGBATo: vec4;

    @input('vec3', '{1.0, 1.0, 1.0')
    @showIf('outputComponentValue', 4)
    @label('From')
    @widget(new ColorWidget())
    protected outputComponentRGBFrom: vec3;

    @input('vec3', '{1.0, 1.0, 1.0')
    @showIf('outputComponentValue', 4)
    @label('To')
    @widget(new ColorWidget())
    protected outputComponentRGBTo: vec3;

    @ui.group_end

    /**
     * Output Blendshape Setup
     * @protected
     */

    @ui.group_start('Output Setup')
    @showIf('outputMode', 3)

    @input
    @label('Mesh')
    @allowUndefined
    protected outputBlendshapeMesh: RenderMeshVisual;

    @input('string')
    @label('Blendshape Name')
    protected outputBlendshapeName: string;

    @input
    @label('From')
    protected outputBlendshapeFrom: number;

    @input
    @label('To')
    protected outputBlendshapeTo: number;

    @ui.group_end

    /**
     * Output Atlas Setup
     * @protected
     */

    @ui.group_start('Output Setup')
    @showIf('outputMode', 4)

    @input
    @allowUndefined
    @label('Texture')
    protected outputAtlasTexture: Texture;

    @input
    @label('Yoyo')
    protected outputAtlasYoyo: boolean;

    @input('int')
    @label('Start Frame')
    protected outputAtlasFrom: number;

    @input('int')
    @label('End Frame')
    protected outputAtlasTo: number;

    @ui.group_end

    /**
     * Output Animation Weight Setup
     * @protected
     */

    @ui.group_start('Output Setup')
    @showIf('outputMode', 5)

    @input
    @allowUndefined
    @label('Animation Mixer')
    protected outputAnimationMixer: AnimationMixer;

    @input
    @label('Layer Name')
    protected outputAnimationMixerLayer: string;

    @input
    @label('Weight From')
    protected outputAnimationMixerFrom: number;

    @input
    @label('Weight To')
    protected outputAnimationMixerTo: number;

    @ui.group_end

    @input
    protected bodyPrefab: ObjectPrefab;

}
