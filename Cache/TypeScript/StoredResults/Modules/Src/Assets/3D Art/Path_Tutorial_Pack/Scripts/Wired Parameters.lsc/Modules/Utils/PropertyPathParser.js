"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPathParser = void 0;
var PropertyPathParser;
(function (PropertyPathParser) {
    function get(object, path) {
        const parts = path.split('.');
        let current = object;
        for (const part of parts) {
            if (current === null || typeof current !== 'object' || !(part in current)) {
                throw new Error('Invalid path: ' + path);
            }
            current = current[part];
        }
        if (typeof current !== 'number' && !(current instanceof vec2) && !(current instanceof vec3) && !(current instanceof quat) && !(current instanceof vec4)) {
            throw new Error('Property ' + path + ' is a valid type (number, vec2, vec3, vec4 or quat).');
        }
        return current;
    }
    PropertyPathParser.get = get;
    function set(object, path, value) {
        const keys = path.split('.');
        let current = object;
        let previous = null;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (current == null || typeof current[key] !== 'object') {
                throw new Error('Invalid path: ' + path);
            }
            previous = current;
            current = current[key];
        }
        const finalKey = keys[keys.length - 1];
        if (typeof current[finalKey] !== typeof value) {
            throw new Error('Property ' + path + ' is not a ' + typeof value);
        }
        current[finalKey] = value;
        if (previous !== null && previous !== undefined && keys.length > 1) {
            const previousKey = keys[keys.length - 2];
            previous[previousKey] = current;
        }
    }
    PropertyPathParser.set = set;
})(PropertyPathParser || (exports.PropertyPathParser = PropertyPathParser = {}));
//# sourceMappingURL=PropertyPathParser.js.map