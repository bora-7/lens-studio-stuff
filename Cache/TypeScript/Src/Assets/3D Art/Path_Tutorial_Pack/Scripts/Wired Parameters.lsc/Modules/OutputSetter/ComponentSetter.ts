import { Setter } from './Setter.types';
import { LerpF, LerpValue } from '../../Wired Parameters';
import { PropertyPathParser } from '../Utils/PropertyPathParser';

interface ComponentInput {
    component: Component,
    property: string,
    from: LerpValue,
    to: LerpValue,
    lerp: LerpF;
}

export function invokeSetterFromComponentInput(inputValues: ComponentInput): Setter {
    return (v: number, lerp: number = 1.0) => {
        const targetValue: LerpValue = inputValues.lerp(inputValues.from, inputValues.to, v);
        const result: LerpValue = inputValues.lerp(inputValues.component[inputValues.property], targetValue, lerp);
        PropertyPathParser.set(inputValues.component, inputValues.property, result);
        return result;
    };
}
