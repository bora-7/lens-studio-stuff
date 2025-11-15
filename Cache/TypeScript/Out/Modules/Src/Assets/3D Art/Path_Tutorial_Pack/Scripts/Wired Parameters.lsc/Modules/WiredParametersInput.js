"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiredParametersInput = exports.TransformType = exports.OutputType = exports.OutputPropertyType = exports.TransformAxis2D = exports.TransformAxis = exports.BodyLandmarks = exports.InputPropertyType = void 0;
const ComponentWithPrintOptions_1 = require("./Debug/ComponentWithPrintOptions");
var InputPropertyType;
(function (InputPropertyType) {
    InputPropertyType[InputPropertyType["Transform"] = 0] = "Transform";
    InputPropertyType[InputPropertyType["Asset"] = 1] = "Asset";
    InputPropertyType[InputPropertyType["Component"] = 2] = "Component";
    InputPropertyType[InputPropertyType["BodyLandmark"] = 3] = "BodyLandmark";
    InputPropertyType[InputPropertyType["HeadLandmark"] = 4] = "HeadLandmark";
    InputPropertyType[InputPropertyType["DistanceBetweenPoints"] = 5] = "DistanceBetweenPoints";
    InputPropertyType[InputPropertyType["AbsoluteRotation"] = 6] = "AbsoluteRotation";
    InputPropertyType[InputPropertyType["Blendshape"] = 7] = "Blendshape";
    InputPropertyType[InputPropertyType["FaceExpression"] = 8] = "FaceExpression";
    InputPropertyType[InputPropertyType["DistanceBodyMesh"] = 9] = "DistanceBodyMesh";
})(InputPropertyType || (exports.InputPropertyType = InputPropertyType = {}));
var BodyLandmarks;
(function (BodyLandmarks) {
    BodyLandmarks[BodyLandmarks["Hips"] = 0] = "Hips";
    BodyLandmarks[BodyLandmarks["Spine"] = 1] = "Spine";
    BodyLandmarks[BodyLandmarks["Spine1"] = 2] = "Spine1";
    BodyLandmarks[BodyLandmarks["Spine2"] = 3] = "Spine2";
    BodyLandmarks[BodyLandmarks["Neck"] = 4] = "Neck";
    BodyLandmarks[BodyLandmarks["Head"] = 5] = "Head";
    BodyLandmarks[BodyLandmarks["LeftShoulder"] = 6] = "LeftShoulder";
    BodyLandmarks[BodyLandmarks["LeftArm"] = 7] = "LeftArm";
    BodyLandmarks[BodyLandmarks["LeftForeArm"] = 8] = "LeftForeArm";
    BodyLandmarks[BodyLandmarks["LeftHand"] = 9] = "LeftHand";
    BodyLandmarks[BodyLandmarks["RightShoulder"] = 10] = "RightShoulder";
    BodyLandmarks[BodyLandmarks["RightArm"] = 11] = "RightArm";
    BodyLandmarks[BodyLandmarks["RightForeArm"] = 12] = "RightForeArm";
    BodyLandmarks[BodyLandmarks["RightHand"] = 13] = "RightHand";
    BodyLandmarks[BodyLandmarks["LeftUpLeg"] = 14] = "LeftUpLeg";
    BodyLandmarks[BodyLandmarks["LeftLeg"] = 15] = "LeftLeg";
    BodyLandmarks[BodyLandmarks["LeftFoot"] = 16] = "LeftFoot";
    BodyLandmarks[BodyLandmarks["LeftToeBase"] = 17] = "LeftToeBase";
    BodyLandmarks[BodyLandmarks["RightUpLeg"] = 18] = "RightUpLeg";
    BodyLandmarks[BodyLandmarks["RightLeg"] = 19] = "RightLeg";
    BodyLandmarks[BodyLandmarks["RightFoot"] = 20] = "RightFoot";
    BodyLandmarks[BodyLandmarks["RightToeBase"] = 21] = "RightToeBase";
})(BodyLandmarks || (exports.BodyLandmarks = BodyLandmarks = {}));
var TransformAxis;
(function (TransformAxis) {
    TransformAxis[TransformAxis["x"] = 0] = "x";
    TransformAxis[TransformAxis["y"] = 1] = "y";
    TransformAxis[TransformAxis["z"] = 2] = "z";
})(TransformAxis || (exports.TransformAxis = TransformAxis = {}));
var TransformAxis2D;
(function (TransformAxis2D) {
    TransformAxis2D[TransformAxis2D["x"] = 0] = "x";
    TransformAxis2D[TransformAxis2D["y"] = 1] = "y";
})(TransformAxis2D || (exports.TransformAxis2D = TransformAxis2D = {}));
var OutputPropertyType;
(function (OutputPropertyType) {
    OutputPropertyType[OutputPropertyType["Transform"] = 0] = "Transform";
    OutputPropertyType[OutputPropertyType["Asset"] = 1] = "Asset";
    OutputPropertyType[OutputPropertyType["Component"] = 2] = "Component";
    OutputPropertyType[OutputPropertyType["Blendshape"] = 3] = "Blendshape";
    OutputPropertyType[OutputPropertyType["Atlas"] = 4] = "Atlas";
    OutputPropertyType[OutputPropertyType["AnimationWeight"] = 5] = "AnimationWeight";
})(OutputPropertyType || (exports.OutputPropertyType = OutputPropertyType = {}));
var OutputType;
(function (OutputType) {
    OutputType[OutputType["Float"] = 0] = "Float";
    OutputType[OutputType["Vec2"] = 1] = "Vec2";
    OutputType[OutputType["Vec3"] = 2] = "Vec3";
    OutputType[OutputType["RGBA"] = 3] = "RGBA";
    OutputType[OutputType["RGB"] = 4] = "RGB";
})(OutputType || (exports.OutputType = OutputType = {}));
var TransformType;
(function (TransformType) {
    TransformType[TransformType["Vec3"] = 0] = "Vec3";
    TransformType[TransformType["Axis"] = 1] = "Axis";
})(TransformType || (exports.TransformType = TransformType = {}));
class WiredParametersInput extends ComponentWithPrintOptions_1.ComponentWithPrintOptions {
    constructor() {
        super();
        this.inputMode = this.inputMode;
        /**
         * Transform Setup
         * @protected
         */
        this.inputSO = this.inputSO;
        this.inputTransformProperty = this.inputTransformProperty;
        this.inputTransformAxis = this.inputTransformAxis;
        this.inputAsset = this.inputAsset;
        this.inputAssetProperty = this.inputAssetProperty;
        this.inputComponent = this.inputComponent;
        this.inputComponentProperty = this.inputComponentProperty;
        this.inputBodyLandmark = this.inputBodyLandmark;
        this.inputBodyTransformProperty = this.inputBodyTransformProperty;
        this.inputBodyTransformAxis = this.inputBodyTransformAxis;
        this.inputHeadIndex = this.inputHeadIndex;
        this.inputHeadLandmark = this.inputHeadLandmark;
        this.inputHeadTransformAxis = this.inputHeadTransformAxis;
        this.inputDistanceSOFrom = this.inputDistanceSOFrom;
        this.inputDistanceSOTo = this.inputDistanceSOTo;
        this.inputAbsoluteRotationSO = this.inputAbsoluteRotationSO;
        this.inputAbsoluteRotationCoef = this.inputAbsoluteRotationCoef;
        this.inputBlendshapeMesh = this.inputBlendshapeMesh;
        this.inputBlendshapeName = this.inputBlendshapeName;
        this.inputFaceMesh = this.inputFaceMesh;
        this.inputFaceExpressionName = this.inputFaceExpressionName;
        this.inputBodyLandmarkFrom = this.inputBodyLandmarkFrom;
        this.inputBodyLandmarkTo = this.inputBodyLandmarkTo;
        this.fromValue = this.fromValue;
        this.toValue = this.toValue;
        this.interpolation = this.interpolation;
        this.lerp = this.lerp;
        this.lerpCoef = this.lerpCoef;
        this.outputMode = this.outputMode;
        /**
         * Output Transform Setup
         * @protected
         */
        this.outputSO = this.outputSO;
        this.outputTransformProperty = this.outputTransformProperty;
        this.outputTransformValue = this.outputTransformValue;
        this.outputTransformAxis = this.outputTransformAxis;
        this.outputTransformAxisFrom = this.outputTransformAxisFrom;
        this.outputTransformAxisTo = this.outputTransformAxisTo;
        this.outputTransformVecFrom = this.outputTransformVecFrom;
        this.outputTransformVecTo = this.outputTransformVecTo;
        this.outputAsset = this.outputAsset;
        this.outputAssetProperty = this.outputAssetProperty;
        this.outputAssetValue = this.outputAssetValue;
        this.outputAssetFloatFrom = this.outputAssetFloatFrom;
        this.outputAssetFloatTo = this.outputAssetFloatTo;
        this.outputAssetVec2From = this.outputAssetVec2From;
        this.outputAssetVec2To = this.outputAssetVec2To;
        this.outputAssetVec3From = this.outputAssetVec3From;
        this.outputAssetVec3To = this.outputAssetVec3To;
        this.outputAssetRGBAFrom = this.outputAssetRGBAFrom;
        this.outputAssetRGBATo = this.outputAssetRGBATo;
        this.outputAssetRGBFrom = this.outputAssetRGBFrom;
        this.outputAssetRGBTo = this.outputAssetRGBTo;
        this.outputComponent = this.outputComponent;
        this.outputComponentProperty = this.outputComponentProperty;
        this.outputComponentValue = this.outputComponentValue;
        this.outputComponentFloatFrom = this.outputComponentFloatFrom;
        this.outputComponentFloatTo = this.outputComponentFloatTo;
        this.outputComponentVec2From = this.outputComponentVec2From;
        this.outputComponentVec2To = this.outputComponentVec2To;
        this.outputComponentVec3From = this.outputComponentVec3From;
        this.outputComponentVec3To = this.outputComponentVec3To;
        this.outputComponentRGBAFrom = this.outputComponentRGBAFrom;
        this.outputComponentRGBATo = this.outputComponentRGBATo;
        this.outputComponentRGBFrom = this.outputComponentRGBFrom;
        this.outputComponentRGBTo = this.outputComponentRGBTo;
        this.outputBlendshapeMesh = this.outputBlendshapeMesh;
        this.outputBlendshapeName = this.outputBlendshapeName;
        this.outputBlendshapeFrom = this.outputBlendshapeFrom;
        this.outputBlendshapeTo = this.outputBlendshapeTo;
        this.outputAtlasTexture = this.outputAtlasTexture;
        this.outputAtlasYoyo = this.outputAtlasYoyo;
        this.outputAtlasFrom = this.outputAtlasFrom;
        this.outputAtlasTo = this.outputAtlasTo;
        this.outputAnimationMixer = this.outputAnimationMixer;
        this.outputAnimationMixerLayer = this.outputAnimationMixerLayer;
        this.outputAnimationMixerFrom = this.outputAnimationMixerFrom;
        this.outputAnimationMixerTo = this.outputAnimationMixerTo;
        this.bodyPrefab = this.bodyPrefab;
    }
    __initialize() {
        super.__initialize();
        this.inputMode = this.inputMode;
        /**
         * Transform Setup
         * @protected
         */
        this.inputSO = this.inputSO;
        this.inputTransformProperty = this.inputTransformProperty;
        this.inputTransformAxis = this.inputTransformAxis;
        this.inputAsset = this.inputAsset;
        this.inputAssetProperty = this.inputAssetProperty;
        this.inputComponent = this.inputComponent;
        this.inputComponentProperty = this.inputComponentProperty;
        this.inputBodyLandmark = this.inputBodyLandmark;
        this.inputBodyTransformProperty = this.inputBodyTransformProperty;
        this.inputBodyTransformAxis = this.inputBodyTransformAxis;
        this.inputHeadIndex = this.inputHeadIndex;
        this.inputHeadLandmark = this.inputHeadLandmark;
        this.inputHeadTransformAxis = this.inputHeadTransformAxis;
        this.inputDistanceSOFrom = this.inputDistanceSOFrom;
        this.inputDistanceSOTo = this.inputDistanceSOTo;
        this.inputAbsoluteRotationSO = this.inputAbsoluteRotationSO;
        this.inputAbsoluteRotationCoef = this.inputAbsoluteRotationCoef;
        this.inputBlendshapeMesh = this.inputBlendshapeMesh;
        this.inputBlendshapeName = this.inputBlendshapeName;
        this.inputFaceMesh = this.inputFaceMesh;
        this.inputFaceExpressionName = this.inputFaceExpressionName;
        this.inputBodyLandmarkFrom = this.inputBodyLandmarkFrom;
        this.inputBodyLandmarkTo = this.inputBodyLandmarkTo;
        this.fromValue = this.fromValue;
        this.toValue = this.toValue;
        this.interpolation = this.interpolation;
        this.lerp = this.lerp;
        this.lerpCoef = this.lerpCoef;
        this.outputMode = this.outputMode;
        /**
         * Output Transform Setup
         * @protected
         */
        this.outputSO = this.outputSO;
        this.outputTransformProperty = this.outputTransformProperty;
        this.outputTransformValue = this.outputTransformValue;
        this.outputTransformAxis = this.outputTransformAxis;
        this.outputTransformAxisFrom = this.outputTransformAxisFrom;
        this.outputTransformAxisTo = this.outputTransformAxisTo;
        this.outputTransformVecFrom = this.outputTransformVecFrom;
        this.outputTransformVecTo = this.outputTransformVecTo;
        this.outputAsset = this.outputAsset;
        this.outputAssetProperty = this.outputAssetProperty;
        this.outputAssetValue = this.outputAssetValue;
        this.outputAssetFloatFrom = this.outputAssetFloatFrom;
        this.outputAssetFloatTo = this.outputAssetFloatTo;
        this.outputAssetVec2From = this.outputAssetVec2From;
        this.outputAssetVec2To = this.outputAssetVec2To;
        this.outputAssetVec3From = this.outputAssetVec3From;
        this.outputAssetVec3To = this.outputAssetVec3To;
        this.outputAssetRGBAFrom = this.outputAssetRGBAFrom;
        this.outputAssetRGBATo = this.outputAssetRGBATo;
        this.outputAssetRGBFrom = this.outputAssetRGBFrom;
        this.outputAssetRGBTo = this.outputAssetRGBTo;
        this.outputComponent = this.outputComponent;
        this.outputComponentProperty = this.outputComponentProperty;
        this.outputComponentValue = this.outputComponentValue;
        this.outputComponentFloatFrom = this.outputComponentFloatFrom;
        this.outputComponentFloatTo = this.outputComponentFloatTo;
        this.outputComponentVec2From = this.outputComponentVec2From;
        this.outputComponentVec2To = this.outputComponentVec2To;
        this.outputComponentVec3From = this.outputComponentVec3From;
        this.outputComponentVec3To = this.outputComponentVec3To;
        this.outputComponentRGBAFrom = this.outputComponentRGBAFrom;
        this.outputComponentRGBATo = this.outputComponentRGBATo;
        this.outputComponentRGBFrom = this.outputComponentRGBFrom;
        this.outputComponentRGBTo = this.outputComponentRGBTo;
        this.outputBlendshapeMesh = this.outputBlendshapeMesh;
        this.outputBlendshapeName = this.outputBlendshapeName;
        this.outputBlendshapeFrom = this.outputBlendshapeFrom;
        this.outputBlendshapeTo = this.outputBlendshapeTo;
        this.outputAtlasTexture = this.outputAtlasTexture;
        this.outputAtlasYoyo = this.outputAtlasYoyo;
        this.outputAtlasFrom = this.outputAtlasFrom;
        this.outputAtlasTo = this.outputAtlasTo;
        this.outputAnimationMixer = this.outputAnimationMixer;
        this.outputAnimationMixerLayer = this.outputAnimationMixerLayer;
        this.outputAnimationMixerFrom = this.outputAnimationMixerFrom;
        this.outputAnimationMixerTo = this.outputAnimationMixerTo;
        this.bodyPrefab = this.bodyPrefab;
    }
}
exports.WiredParametersInput = WiredParametersInput;
//# sourceMappingURL=WiredParametersInput.js.map