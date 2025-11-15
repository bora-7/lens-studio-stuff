import { DestructionHelper } from './Scene/DestructionHelper';
import { BodyLandmarks } from './WiredParametersInput';

export class Body {
    private readonly destructionHelper: DestructionHelper = new DestructionHelper();

    private body: ObjectTracking3D;

    constructor(bodyPrefab: ObjectPrefab) {
        const bodySO: SceneObject = this.destructionHelper.instantiatePrefab(bodyPrefab, null, 'Body Tracking');
        this.body = bodySO.getComponent('ObjectTracking3D');
        if (!this.body) {
            throw new Error('Invalid Body Prefab.');
        }
    }

    destroy(): void {
        this.destructionHelper.destroyObjects();
    }

    getTransform(landmark: keyof BodyLandmarks): Transform {
        return this.body.getAttachedObjects(landmark)[0].getTransform();
    }

    getPosition(landmark: keyof BodyLandmarks): vec3 {
        return this.getTransform(landmark).getWorldPosition();
    }

}
