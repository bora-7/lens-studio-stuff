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
// @input Component.RenderMeshVisual pathRmv
// @input Asset.ObjectPrefab pfbSurfaceDetection
// @input Asset.ObjectPrefab pfbLine
// @input SceneObject camObj
// @input SceneObject camObjOffset
// @input Component.Text pathDistText
// @input Component.Text finalPathDistText
// @input AssignableType playerPaceCalculator
// @input AssignableType_1 pathmakingPlayerFeedback
// @input AssignableType_2 ui
// @input float placingStartFinishLinesForwardDisplace = 200
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Assets/Scripts/PathMaker");
Object.setPrototypeOf(script, Module.PathMaker.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("pathRmv", []);
    checkUndefined("pfbSurfaceDetection", []);
    checkUndefined("pfbLine", []);
    checkUndefined("camObjOffset", []);
    checkUndefined("pathDistText", []);
    checkUndefined("finalPathDistText", []);
    checkUndefined("playerPaceCalculator", []);
    checkUndefined("pathmakingPlayerFeedback", []);
    checkUndefined("ui", []);
    checkUndefined("placingStartFinishLinesForwardDisplace", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
