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
// @input AssignableType ui
// @input AssignableType_1 tutorialController
// @input AssignableType_2 pathMaker
// @input AssignableType_3 pathWalker
// @input SceneObject camSo
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Assets/Scripts/LensInitializer");
Object.setPrototypeOf(script, Module.LensInitializer.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("ui", []);
    checkUndefined("tutorialController", []);
    checkUndefined("pathMaker", []);
    checkUndefined("pathWalker", []);
    checkUndefined("camSo", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
