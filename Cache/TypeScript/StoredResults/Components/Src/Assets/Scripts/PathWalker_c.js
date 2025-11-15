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
// @input SceneObject cam
// @input SceneObject walkPathScreenHUD
// @input Component.Text averagePaceText
// @input Component.Text lapCountText
// @input AssignableType timerScript
// @input AssignableType_1 uiScript
// @input AssignableType_2 progressBarController
// @input AssignableType_3 arrowSpawner
// @input AssignableType_4 playerPaceCalulator
// @input AssignableType_5 warningController
// @input Component.RenderMeshVisual pathRmv
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Assets/Scripts/PathWalker");
Object.setPrototypeOf(script, Module.PathWalker.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("cam", []);
    checkUndefined("walkPathScreenHUD", []);
    checkUndefined("averagePaceText", []);
    checkUndefined("lapCountText", []);
    checkUndefined("timerScript", []);
    checkUndefined("uiScript", []);
    checkUndefined("progressBarController", []);
    checkUndefined("arrowSpawner", []);
    checkUndefined("playerPaceCalulator", []);
    checkUndefined("warningController", []);
    checkUndefined("pathRmv", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
