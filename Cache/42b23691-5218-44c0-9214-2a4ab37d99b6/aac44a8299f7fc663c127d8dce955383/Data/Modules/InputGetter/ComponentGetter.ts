import { Getter } from './Getter.types';
import { PropertyPathParser } from '../Utils/PropertyPathParser';

interface ComponentInput {
    component: Component,
    propertyName: string
}

export function invokeGetterFromComponentInput(inputValue: ComponentInput): Getter {
    return () => PropertyPathParser.get(inputValue.component, inputValue.propertyName) as number;
}
