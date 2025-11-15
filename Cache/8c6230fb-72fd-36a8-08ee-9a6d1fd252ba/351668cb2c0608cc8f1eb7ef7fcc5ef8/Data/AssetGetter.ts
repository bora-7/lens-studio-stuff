import { Getter } from './Getter.types';
import { PropertyPathParser } from '../Utils/PropertyPathParser';

interface AssetInput {
    asset: Asset
    propertyName: string
}

export function invokeGetterFromAssetInput(inputValues: AssetInput): Getter {
    let object: Asset | Pass;
    if (inputValues.asset.getTypeName() === 'Asset.Material') {
        object = (inputValues.asset as Material).mainPass;
    }
    return () => PropertyPathParser.get(object, inputValues.propertyName) as number;
}
