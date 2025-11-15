import {LerpValue} from "../../Wired Parameters";

export namespace PropertyPathParser {
    export function get(object: object, path: string): LerpValue {
        const parts: string[] = path.split('.');
        let current: object = object;

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

    export function set(object: object, path: string, value: LerpValue): void {
        const keys: string[] = path.split('.');
        let current: object = object;
        let previous: object = null;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (current == null || typeof current[key] !== 'object') {
                throw new Error('Invalid path: ' + path);
            }
            previous = current;
            current = current[key];
        }

        const finalKey: string = keys[keys.length - 1];
        if (typeof current[finalKey] !== typeof value) {
            throw new Error('Property ' + path + ' is not a ' + typeof value);
        }
        current[finalKey] = value;
        if (previous !== null && previous !== undefined && keys.length > 1) {
            const previousKey: string = keys[keys.length - 2];
            previous[previousKey] = current;
        }
    }
}
