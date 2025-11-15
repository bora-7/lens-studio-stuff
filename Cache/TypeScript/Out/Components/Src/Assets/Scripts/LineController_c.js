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
// @input SceneObject visualSo
// @input SceneObject startVisual
// @input SceneObject finishVisual
// @input SceneObject countdownSo
// @input SceneObject[] countdownSoArray
// @input Component.ColliderComponent countdownCollider
// @input Component.ColliderComponent camCol
// @input Component.Text3D lapCounter3Dtext
// @input SceneObject realVisualsParent
// @input SceneObject hintVisualsParent
// @input SceneObject startLineTurnArrow
// @input SceneObject finishLineTurnArrow
// @input SceneObject hintStartVisual
// @input SceneObject hintFinishVisual
// @input AssignableType pathCollisionEvents
// @input AssignableType_1 pathWalker
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Assets/Scripts/LineController");
Object.setPrototypeOf(script, Module.LineController.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("visualSo", []);
    checkUndefined("startVisual", []);
    checkUndefined("finishVisual", []);
    checkUndefined("countdownSo", []);
    checkUndefined("countdownSoArray", []);
    checkUndefined("countdownCollider", []);
    checkUndefined("camCol", []);
    checkUndefined("lapCounter3Dtext", []);
    checkUndefined("realVisualsParent", []);
    checkUndefined("hintVisualsParent", []);
    checkUndefined("startLineTurnArrow", []);
    checkUndefined("finishLineTurnArrow", []);
    checkUndefined("hintStartVisual", []);
    checkUndefined("hintFinishVisual", []);
    checkUndefined("pathCollisionEvents", []);
    checkUndefined("pathWalker", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
