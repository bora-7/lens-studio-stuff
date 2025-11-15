import { Setter } from './Setter.types';
import { LerpValue } from '../../Wired Parameters';
import { PropertyPathParser } from '../Utils/PropertyPathParser';

interface AssetInput {
    asset: Asset,
    property: string,
    from: LerpValue,
    to: LerpValue,
    lerp: (from: LerpValue, to: LerpValue, time: number) => LerpValue;
}

export function invokeSetterFromAssetInput(inputValues: AssetInput): Setter {
    let manipulatingObject: Asset | Pass = inputValues.asset;
    if (manipulatingObject.getTypeName() === 'Asset.Material') {
        manipulatingObject = (inputValues.asset as Material).mainPass;
    }
    return (v: number, lerp: number = 1.0) => {
        const targetValue = inputValues.lerp(inputValues.from, inputValues.to, v);
        const result: LerpValue = inputValues.lerp(PropertyPathParser.get(manipulatingObject, inputValues.property), targetValue, lerp);
        PropertyPathParser.set(manipulatingObject, inputValues.property, result);
        return result;
    };
}
