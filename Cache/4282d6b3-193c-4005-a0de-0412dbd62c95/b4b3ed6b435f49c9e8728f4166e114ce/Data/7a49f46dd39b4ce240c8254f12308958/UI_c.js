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
// @input SceneObject camObj
// @input SceneObject homeUI
// @input SceneObject duringPathCreationUI
// @input SceneObject goToStartUI
// @input Component.Text goToStartUiDistance
// @input SceneObject endSessionUI
// @input Asset.ObjectPrefab pfbLoopUi
// @input SceneObject backplateSo
// @input SceneObject warningTutorialUI
// @input SceneObject tutorialUI
// @input Component.AnimationPlayer tutorialAnimationPlayer
// @input Component.Text tutorialText
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Assets/Scripts/UI");
Object.setPrototypeOf(script, Module.UI.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("camObj", []);
    checkUndefined("homeUI", []);
    checkUndefined("duringPathCreationUI", []);
    checkUndefined("goToStartUI", []);
    checkUndefined("goToStartUiDistance", []);
    checkUndefined("endSessionUI", []);
    checkUndefined("pfbLoopUi", []);
    checkUndefined("backplateSo", []);
    checkUndefined("warningTutorialUI", []);
    checkUndefined("tutorialUI", []);
    checkUndefined("tutorialAnimationPlayer", []);
    checkUndefined("tutorialText", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
