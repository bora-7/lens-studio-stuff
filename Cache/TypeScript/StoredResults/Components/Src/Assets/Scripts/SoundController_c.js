if (script.onAwake) {
    script.onAwake();
    return;
}
/*
@typedef SoundEvent
@property {string} key
@property {Asset.AudioTrackAsset} clip
@property {float} vol
@property {bool} loop
*/
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
// @input SoundEvent[] soundEvents
// @input Component.AudioComponent[] auds
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Assets/Scripts/SoundController");
Object.setPrototypeOf(script, Module.SoundController.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("soundEvents", []);
    checkUndefined("auds", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
