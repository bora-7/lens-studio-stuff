if (script.onAwake) {
    script.onAwake();
    return;
}
function checkUndefined(property, showIfData) {
    for (var i = 0; i < showIfData.length; i++) {
        if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]) {
            return;
        }
    }
    if (script[property] == undefined) {
        throw new Error("Input " + property + " was not provided for the object " + script.getSceneObject().name);
    }
}
// @input bool editDebugSettings
// @ui {"widget":"group_start", "label":"Debug Statements", "showIf":"editDebugSettings"}
// @input bool printDebugStatements = "false" {"label":"Print Info"}
// @input bool printWarningStatements = "true" {"label":"Print Warnings"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input int inputMode = "0" {"widget":"combobox", "values":[{"label":"Transform", "value":0}, {"label":"Asset", "value":1}, {"label":"Component", "value":2}, {"label":"Body Tracking Landmark", "value":3}, {"label":"Head Tracking Landmark", "value":4}, {"label":"Distance Between Scene Objects", "value":5}, {"label":"Absolute Rotation", "value":6}, {"label":"Blendshape", "value":7}, {"label":"Face Expression", "value":8}, {"label":"Distance Body Mesh", "value":9}]}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":0}
// @input SceneObject inputSO {"label":"Transform"}
// @input int inputTransformProperty = "0" {"label":"Property", "widget":"combobox", "values":[{"label":"World Position", "value":0}, {"label":"World Rotation", "value":1}, {"label":"World Scale", "value":2}, {"label":"Local Position", "value":3}, {"label":"Local Rotation", "value":4}, {"label":"Local Scale", "value":5}, {"label":"World Rotation Sinus", "value":6}, {"label":"Local Rotation Sinus", "value":7}]}
// @input int inputTransformAxis = "0" {"label":"Axis", "widget":"combobox", "values":[{"label":"X", "value":0}, {"label":"Y", "value":1}, {"label":"Z", "value":2}]}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":1}
// @input Asset.Asset inputAsset {"label":"Asset"}
// @input string inputAssetProperty {"label":"Property Name"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":2}
// @input Component.Component inputComponent {"label":"Component"}
// @input string inputComponentProperty {"label":"Property Name"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":3}
// @input int inputBodyLandmark = "0" {"label":"Landmark", "widget":"combobox", "values":[{"label":"Hips", "value":"0"}, {"label":"Spine", "value":"1"}, {"label":"Spine1", "value":"2"}, {"label":"Spine2", "value":"3"}, {"label":"Neck", "value":"4"}, {"label":"Head", "value":"5"}, {"label":"LeftShoulder", "value":"6"}, {"label":"LeftArm", "value":"7"}, {"label":"LeftForeArm", "value":"8"}, {"label":"LeftHand", "value":"9"}, {"label":"RightShoulder", "value":"10"}, {"label":"RightArm", "value":"11"}, {"label":"RightForeArm", "value":"12"}, {"label":"RightHand", "value":"13"}, {"label":"LeftUpLeg", "value":"14"}, {"label":"LeftLeg", "value":"15"}, {"label":"LeftFoot", "value":"16"}, {"label":"LeftToeBase", "value":"17"}, {"label":"RightUpLeg", "value":"18"}, {"label":"RightLeg", "value":"19"}, {"label":"RightFoot", "value":"20"}, {"label":"RightToeBase", "value":"21"}]}
// @input int inputBodyTransformProperty = "0" {"label":"Property", "widget":"combobox", "values":[{"label":"World Position", "value":0}, {"label":"World Rotation", "value":1}, {"label":"World Scale", "value":2}, {"label":"Local Position", "value":3}, {"label":"Local Rotation", "value":4}, {"label":"Local Scale", "value":5}, {"label":"World Rotation Sinus", "value":6}, {"label":"Local Rotation Sinus", "value":7}]}
// @input int inputBodyTransformAxis = "0" {"label":"Axis", "widget":"combobox", "values":[{"label":"X", "value":0}, {"label":"Y", "value":1}, {"label":"Z", "value":2}]}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":4}
// @input int inputHeadIndex {"label":"Face Index"}
// @input int inputHeadLandmark {"label":"Landmark Index", "widget":"spinbox", "min":0, "max":74, "step":1}
// @input int inputHeadTransformAxis = "0" {"label":"Axis", "widget":"combobox", "values":[{"label":"X", "value":0}, {"label":"Y", "value":1}]}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":5}
// @input SceneObject inputDistanceSOFrom {"label":"Object"}
// @input SceneObject inputDistanceSOTo {"label":"Object"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":6}
// @input SceneObject inputAbsoluteRotationSO {"label":"Object"}
// @input vec3 inputAbsoluteRotationCoef = "{1.0, 1.0, 1.0}" {"label":"Coefficients"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":7}
// @input Component.RenderMeshVisual inputBlendshapeMesh {"label":"Mesh"}
// @input string inputBlendshapeName {"label":"Blendshape Name"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":8}
// @input Component.RenderMeshVisual inputFaceMesh {"label":"Face Mesh"}
// @input string inputFaceExpressionName = "EyeBlinkLeft" {"label":"Expression", "widget":"combobox", "values":[{"label":"EyeBlinkLeft", "value":"EyeBlinkLeft"}, {"label":"EyeBlinkRight", "value":"EyeBlinkRight"}, {"label":"EyeSquintLeft", "value":"EyeSquintLeft"}, {"label":"EyeSquintRight", "value":"EyeSquintRight"}, {"label":"EyeDownLeft", "value":"EyeDownLeft"}, {"label":"EyeDownRight", "value":"EyeDownRight"}, {"label":"EyeInLeft", "value":"EyeInLeft"}, {"label":"EyeInRight", "value":"EyeInRight"}, {"label":"EyeOpenLeft", "value":"EyeOpenLeft"}, {"label":"EyeOpenRight", "value":"EyeOpenRight"}, {"label":"EyeOutLeft", "value":"EyeOutLeft"}, {"label":"EyeOutRight", "value":"EyeOutRight"}, {"label":"EyeUpLeft", "value":"EyeUpLeft"}, {"label":"EyeUpRight", "value":"EyeUpRight"}, {"label":"BrowsDownLeft", "value":"BrowsDownLeft"}, {"label":"BrowsDownRight", "value":"BrowsDownRight"}, {"label":"BrowsUpCenter", "value":"BrowsUpCenter"}, {"label":"BrowsUpLeft", "value":"BrowsUpLeft"}, {"label":"BrowsUpRight", "value":"BrowsUpRight"}, {"label":"JawForward", "value":"JawForward"}, {"label":"JawLeft", "value":"JawLeft"}, {"label":"JawOpen", "value":"JawOpen"}, {"label":"JawRight", "value":"JawRight"}, {"label":"MouthLeft", "value":"MouthLeft"}, {"label":"MouthRight", "value":"MouthRight"}, {"label":"MouthFrownLeft", "value":"MouthFrownLeft"}, {"label":"MouthFrownRight", "value":"MouthFrownRight"}, {"label":"MouthSmileLeft", "value":"MouthSmileLeft"}, {"label":"MouthSmileRight", "value":"MouthSmileRight"}, {"label":"MouthDimpleLeft", "value":"MouthDimpleLeft"}, {"label":"MouthDimpleRight", "value":"MouthDimpleRight"}, {"label":"MouthUpLeft", "value":"MouthUpLeft"}, {"label":"MouthUpRight", "value":"MouthUpRight"}, {"label":"UpperLipClose", "value":"UpperLipClose"}, {"label":"LowerLipClose", "value":"LowerLipClose"}, {"label":"UpperLipUpLeft", "value":"UpperLipUpLeft"}, {"label":"UpperLipUpRight", "value":"UpperLipUpRight"}, {"label":"LowerLipDownLeft", "value":"LowerLipDownLeft"}, {"label":"LowerLipDownRight", "value":"LowerLipDownRight"}, {"label":"LipsFunnel", "value":"LipsFunnel"}, {"label":"LipsPucker", "value":"LipsPucker"}, {"label":"LowerLipRaise", "value":"LowerLipRaise"}, {"label":"UpperLipRaise", "value":"UpperLipRaise"}, {"label":"Puff", "value":"Puff"}, {"label":"CheekSquintLeft", "value":"CheekSquintLeft"}, {"label":"CheekSquintRight", "value":"CheekSquintRight"}, {"label":"SneerLeft", "value":"SneerLeft"}, {"label":"SneerRight", "value":"SneerRight"}, {"label":"MouthStretchLeft", "value":"MouthStretchLeft"}, {"label":"MouthStretchRight", "value":"MouthStretchRight"}, {"label":"MouthClose", "value":"MouthClose"}]}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Input Setup", "showIf":"inputMode", "showIfValue":9}
// @input int inputBodyLandmarkFrom = "0" {"label":"Landmark From", "widget":"combobox", "values":[{"label":"Hips", "value":"0"}, {"label":"Spine", "value":"1"}, {"label":"Spine1", "value":"2"}, {"label":"Spine2", "value":"3"}, {"label":"Neck", "value":"4"}, {"label":"Head", "value":"5"}, {"label":"LeftShoulder", "value":"6"}, {"label":"LeftArm", "value":"7"}, {"label":"LeftForeArm", "value":"8"}, {"label":"LeftHand", "value":"9"}, {"label":"RightShoulder", "value":"10"}, {"label":"RightArm", "value":"11"}, {"label":"RightForeArm", "value":"12"}, {"label":"RightHand", "value":"13"}, {"label":"LeftUpLeg", "value":"14"}, {"label":"LeftLeg", "value":"15"}, {"label":"LeftFoot", "value":"16"}, {"label":"LeftToeBase", "value":"17"}, {"label":"RightUpLeg", "value":"18"}, {"label":"RightLeg", "value":"19"}, {"label":"RightFoot", "value":"20"}, {"label":"RightToeBase", "value":"21"}]}
// @input int inputBodyLandmarkTo = "0" {"label":"Landmark To", "widget":"combobox", "values":[{"label":"Hips", "value":"0"}, {"label":"Spine", "value":"1"}, {"label":"Spine1", "value":"2"}, {"label":"Spine2", "value":"3"}, {"label":"Neck", "value":"4"}, {"label":"Head", "value":"5"}, {"label":"LeftShoulder", "value":"6"}, {"label":"LeftArm", "value":"7"}, {"label":"LeftForeArm", "value":"8"}, {"label":"LeftHand", "value":"9"}, {"label":"RightShoulder", "value":"10"}, {"label":"RightArm", "value":"11"}, {"label":"RightForeArm", "value":"12"}, {"label":"RightHand", "value":"13"}, {"label":"LeftUpLeg", "value":"14"}, {"label":"LeftLeg", "value":"15"}, {"label":"LeftFoot", "value":"16"}, {"label":"LeftToeBase", "value":"17"}, {"label":"RightUpLeg", "value":"18"}, {"label":"RightLeg", "value":"19"}, {"label":"RightFoot", "value":"20"}, {"label":"RightToeBase", "value":"21"}]}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input float fromValue {"label":"Input Start Value"}
// @input float toValue = "1.0" {"label":"Input End Value"}
// @input string interpolation = "Linear" {"widget":"combobox", "values":[{"label":"Linear", "value":"Linear"}, {"label":"Sinusoidal In", "value":"SineIn"}, {"label":"Sinusoidal Out", "value":"SineOut"}, {"label":"Sinusoidal In Out", "value":"SineInOut"}, {"label":"Quadratic In", "value":"QuadIn"}, {"label":"Quadratic Out", "value":"QuadOut"}, {"label":"Quadratic In Out", "value":"QuadInOut"}, {"label":"Exponential In", "value":"ExpoIn"}, {"label":"Exponential Out", "value":"ExpoOut"}, {"label":"Exponential In Out", "value":"ExpoInOut"}, {"label":"Elastic In", "value":"ElasticIn"}, {"label":"Elastic Out", "value":"ElasticOut"}, {"label":"Elastic In Out", "value":"ElasticInOut"}, {"label":"Bounce In", "value":"BounceIn"}, {"label":"Bounce Out", "value":"BounceOut"}, {"label":"Bounce In Out", "value":"BounceInOut"}, {"label":"Back In", "value":"BackIn"}, {"label":"Back Out", "value":"BackOut"}, {"label":"Back In Out", "value":"BackInOut"}]}
// @input bool lerp
// @input float lerpCoef {"label":"Lerp Coefficient", "widget":"slider", "min":0.01, "max":1, "step":0.01, "showIf":"lerp"}
// @ui {"widget":"separator"}
// @input int outputMode = "0" {"widget":"combobox", "values":[{"label":"Transform", "value":0}, {"label":"Asset", "value":1}, {"label":"Component", "value":2}, {"label":"Blendshape", "value":3}, {"label":"Atlas", "value":4}, {"label":"Animation Weight", "value":5}]}
// @ui {"widget":"group_start", "label":"Output Setup", "showIf":"outputMode", "showIfValue":0}
// @input SceneObject outputSO {"label":"Transform"}
// @input int outputTransformProperty = "0" {"label":"Property", "widget":"combobox", "values":[{"label":"World Position", "value":0}, {"label":"World Rotation", "value":1}, {"label":"World Scale", "value":2}, {"label":"Local Position", "value":3}, {"label":"Local Rotation", "value":4}, {"label":"Local Scale", "value":5}, {"label":"World Rotation Sinus", "value":6}, {"label":"Local Rotation Sinus", "value":7}]}
// @input int outputTransformValue = "0" {"label":"Transform Value", "widget":"combobox", "values":[{"label":"Axis", "value":0}, {"label":"Vec3", "value":1}]}
// @input int outputTransformAxis = "0" {"label":"Axis", "widget":"combobox", "values":[{"label":"X", "value":0}, {"label":"Y", "value":1}, {"label":"Z", "value":2}], "showIf":"outputTransformValue", "showIfValue":0}
// @input float outputTransformAxisFrom {"label":"From", "showIf":"outputTransformValue", "showIfValue":0}
// @input float outputTransformAxisTo {"label":"To", "showIf":"outputTransformValue", "showIfValue":0}
// @input vec3 outputTransformVecFrom {"label":"From", "showIf":"outputTransformValue", "showIfValue":1}
// @input vec3 outputTransformVecTo {"label":"To", "showIf":"outputTransformValue", "showIfValue":1}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Output Setup", "showIf":"outputMode", "showIfValue":1}
// @input Asset.Asset outputAsset {"label":"Asset"}
// @input string outputAssetProperty {"label":"Property Name"}
// @input int outputAssetValue = "0" {"label":"Type", "widget":"combobox", "values":[{"label":"Number", "value":0}, {"label":"Point 2D", "value":1}, {"label":"Point 3D", "value":2}, {"label":"Color RGBA", "value":3}, {"label":"Color RGB", "value":4}]}
// @input float outputAssetFloatFrom {"label":"From", "showIf":"outputAssetValue", "showIfValue":0}
// @input float outputAssetFloatTo {"label":"To", "showIf":"outputAssetValue", "showIfValue":0}
// @input vec2 outputAssetVec2From {"label":"From", "showIf":"outputAssetValue", "showIfValue":1}
// @input vec2 outputAssetVec2To {"label":"To", "showIf":"outputAssetValue", "showIfValue":1}
// @input vec3 outputAssetVec3From {"label":"From", "showIf":"outputAssetValue", "showIfValue":2}
// @input vec3 outputAssetVec3To {"label":"To", "showIf":"outputAssetValue", "showIfValue":2}
// @input vec4 outputAssetRGBAFrom = "{1.0, 1.0, 1.0, 1.0" {"label":"From", "widget":"color", "showIf":"outputAssetValue", "showIfValue":3}
// @input vec4 outputAssetRGBATo = "{1.0, 1.0, 1.0, 1.0" {"label":"To", "widget":"color", "showIf":"outputAssetValue", "showIfValue":3}
// @input vec3 outputAssetRGBFrom = "{1.0, 1.0, 1.0" {"label":"From", "widget":"color", "showIf":"outputAssetValue", "showIfValue":4}
// @input vec3 outputAssetRGBTo = "{1.0, 1.0, 1.0" {"label":"To", "widget":"color", "showIf":"outputAssetValue", "showIfValue":4}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Output Setup", "showIf":"outputMode", "showIfValue":2}
// @input Component.Component outputComponent {"label":"Component"}
// @input string outputComponentProperty {"label":"Property Name"}
// @input int outputComponentValue = "0" {"label":"Type", "widget":"combobox", "values":[{"label":"Number", "value":0}, {"label":"Point 2D", "value":1}, {"label":"Point 3D", "value":2}, {"label":"Color RGBA", "value":3}, {"label":"Color RGB", "value":4}]}
// @input float outputComponentFloatFrom {"label":"From", "showIf":"outputComponentValue", "showIfValue":0}
// @input float outputComponentFloatTo {"label":"To", "showIf":"outputComponentValue", "showIfValue":0}
// @input vec2 outputComponentVec2From {"label":"From", "showIf":"outputComponentValue", "showIfValue":1}
// @input vec2 outputComponentVec2To {"label":"To", "showIf":"outputComponentValue", "showIfValue":1}
// @input vec3 outputComponentVec3From {"label":"From", "showIf":"outputComponentValue", "showIfValue":2}
// @input vec3 outputComponentVec3To {"label":"To", "showIf":"outputComponentValue", "showIfValue":2}
// @input vec4 outputComponentRGBAFrom = "{1.0, 1.0, 1.0, 1.0" {"label":"From", "widget":"color", "showIf":"outputComponentValue", "showIfValue":3}
// @input vec4 outputComponentRGBATo = "{1.0, 1.0, 1.0, 1.0" {"label":"To", "widget":"color", "showIf":"outputComponentValue", "showIfValue":3}
// @input vec3 outputComponentRGBFrom = "{1.0, 1.0, 1.0" {"label":"From", "widget":"color", "showIf":"outputComponentValue", "showIfValue":4}
// @input vec3 outputComponentRGBTo = "{1.0, 1.0, 1.0" {"label":"To", "widget":"color", "showIf":"outputComponentValue", "showIfValue":4}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Output Setup", "showIf":"outputMode", "showIfValue":3}
// @input Component.RenderMeshVisual outputBlendshapeMesh {"label":"Mesh"}
// @input string outputBlendshapeName {"label":"Blendshape Name"}
// @input float outputBlendshapeFrom {"label":"From"}
// @input float outputBlendshapeTo {"label":"To"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Output Setup", "showIf":"outputMode", "showIfValue":4}
// @input Asset.Texture outputAtlasTexture {"label":"Texture"}
// @input bool outputAtlasYoyo {"label":"Yoyo"}
// @input int outputAtlasFrom {"label":"Start Frame"}
// @input int outputAtlasTo {"label":"End Frame"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Output Setup", "showIf":"outputMode", "showIfValue":5}
// @input Component.AnimationMixer outputAnimationMixer {"label":"Animation Mixer"}
// @input string outputAnimationMixerLayer {"label":"Layer Name"}
// @input float outputAnimationMixerFrom {"label":"Weight From"}
// @input float outputAnimationMixerTo {"label":"Weight To"}
// @ui {"widget":"group_end"}
// @input Asset.ObjectPrefab bodyPrefab
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Assets/3D Art/Path_Tutorial_Pack/Scripts/Wired Parameters.lsc/Wired Parameters");
Object.setPrototypeOf(script, Module.WiredParameters.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("editDebugSettings", []);
    checkUndefined("printDebugStatements", [["editDebugSettings",true]]);
    checkUndefined("printWarningStatements", [["editDebugSettings",true]]);
    checkUndefined("inputMode", []);
    checkUndefined("inputTransformProperty", [["inputMode",0]]);
    checkUndefined("inputTransformAxis", [["inputMode",0]]);
    checkUndefined("inputAssetProperty", [["inputMode",1]]);
    checkUndefined("inputComponentProperty", [["inputMode",2]]);
    checkUndefined("inputBodyLandmark", [["inputMode",3]]);
    checkUndefined("inputBodyTransformProperty", [["inputMode",3]]);
    checkUndefined("inputBodyTransformAxis", [["inputMode",3]]);
    checkUndefined("inputHeadIndex", [["inputMode",4]]);
    checkUndefined("inputHeadLandmark", [["inputMode",4]]);
    checkUndefined("inputHeadTransformAxis", [["inputMode",4]]);
    checkUndefined("inputAbsoluteRotationCoef", [["inputMode",6]]);
    checkUndefined("inputBlendshapeName", [["inputMode",7]]);
    checkUndefined("inputFaceExpressionName", [["inputMode",8]]);
    checkUndefined("inputBodyLandmarkFrom", [["inputMode",9]]);
    checkUndefined("inputBodyLandmarkTo", [["inputMode",9]]);
    checkUndefined("fromValue", []);
    checkUndefined("toValue", []);
    checkUndefined("interpolation", []);
    checkUndefined("lerp", []);
    checkUndefined("lerpCoef", [["lerp",true]]);
    checkUndefined("outputMode", []);
    checkUndefined("outputTransformProperty", [["outputMode",0]]);
    checkUndefined("outputTransformValue", [["outputMode",0]]);
    checkUndefined("outputTransformAxis", [["outputMode",0],["outputTransformValue",0]]);
    checkUndefined("outputTransformAxisFrom", [["outputMode",0],["outputTransformValue",0]]);
    checkUndefined("outputTransformAxisTo", [["outputMode",0],["outputTransformValue",0]]);
    checkUndefined("outputTransformVecFrom", [["outputMode",0],["outputTransformValue",1]]);
    checkUndefined("outputTransformVecTo", [["outputMode",0],["outputTransformValue",1]]);
    checkUndefined("outputAssetProperty", [["outputMode",1]]);
    checkUndefined("outputAssetValue", [["outputMode",1]]);
    checkUndefined("outputAssetFloatFrom", [["outputMode",1],["outputAssetValue",0]]);
    checkUndefined("outputAssetFloatTo", [["outputMode",1],["outputAssetValue",0]]);
    checkUndefined("outputAssetVec2From", [["outputMode",1],["outputAssetValue",1]]);
    checkUndefined("outputAssetVec2To", [["outputMode",1],["outputAssetValue",1]]);
    checkUndefined("outputAssetVec3From", [["outputMode",1],["outputAssetValue",2]]);
    checkUndefined("outputAssetVec3To", [["outputMode",1],["outputAssetValue",2]]);
    checkUndefined("outputAssetRGBAFrom", [["outputMode",1],["outputAssetValue",3]]);
    checkUndefined("outputAssetRGBATo", [["outputMode",1],["outputAssetValue",3]]);
    checkUndefined("outputAssetRGBFrom", [["outputMode",1],["outputAssetValue",4]]);
    checkUndefined("outputAssetRGBTo", [["outputMode",1],["outputAssetValue",4]]);
    checkUndefined("outputComponentProperty", [["outputMode",2]]);
    checkUndefined("outputComponentValue", [["outputMode",2]]);
    checkUndefined("outputComponentFloatFrom", [["outputMode",2],["outputComponentValue",0]]);
    checkUndefined("outputComponentFloatTo", [["outputMode",2],["outputComponentValue",0]]);
    checkUndefined("outputComponentVec2From", [["outputMode",2],["outputComponentValue",1]]);
    checkUndefined("outputComponentVec2To", [["outputMode",2],["outputComponentValue",1]]);
    checkUndefined("outputComponentVec3From", [["outputMode",2],["outputComponentValue",2]]);
    checkUndefined("outputComponentVec3To", [["outputMode",2],["outputComponentValue",2]]);
    checkUndefined("outputComponentRGBAFrom", [["outputMode",2],["outputComponentValue",3]]);
    checkUndefined("outputComponentRGBATo", [["outputMode",2],["outputComponentValue",3]]);
    checkUndefined("outputComponentRGBFrom", [["outputMode",2],["outputComponentValue",4]]);
    checkUndefined("outputComponentRGBTo", [["outputMode",2],["outputComponentValue",4]]);
    checkUndefined("outputBlendshapeName", [["outputMode",3]]);
    checkUndefined("outputBlendshapeFrom", [["outputMode",3]]);
    checkUndefined("outputBlendshapeTo", [["outputMode",3]]);
    checkUndefined("outputAtlasYoyo", [["outputMode",4]]);
    checkUndefined("outputAtlasFrom", [["outputMode",4]]);
    checkUndefined("outputAtlasTo", [["outputMode",4]]);
    checkUndefined("outputAnimationMixerLayer", [["outputMode",5]]);
    checkUndefined("outputAnimationMixerFrom", [["outputMode",5]]);
    checkUndefined("outputAnimationMixerTo", [["outputMode",5]]);
    checkUndefined("bodyPrefab", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
