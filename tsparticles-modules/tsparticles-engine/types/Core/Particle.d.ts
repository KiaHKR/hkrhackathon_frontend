import { ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates";
import type { IHsl, IRgb } from "./Interfaces/Colors";
import { IParticleNumericValueAnimation, IParticleTiltValueAnimation, IParticleValueAnimation } from "./Interfaces/IParticleValueAnimation";
import type { Container } from "./Container";
import type { Engine } from "../engine";
import { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IDelta } from "./Interfaces/IDelta";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticleGravity } from "./Interfaces/IParticleGravity";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation";
import type { IParticleLife } from "./Interfaces/IParticleLife";
import type { IParticleRetinaProps } from "./Interfaces/IParticleRetinaProps";
import type { IParticleRoll } from "./Interfaces/IParticleRoll";
import type { IParticleWobble } from "./Interfaces/IParticleWobble";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import type { IShapeValues } from "./Interfaces/IShapeValues";
import { ParticleOutType } from "../Enums/Types/ParticleOutType";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { Stroke } from "../Options/Classes/Particles/Stroke";
import { Vector } from "./Utils/Vector";
import { Vector3d } from "./Utils/Vector3d";
export declare class Particle implements IParticle {
    #private;
    readonly id: number;
    readonly container: Container;
    readonly group?: string | undefined;
    destroyed: boolean;
    ignoresResizeRatio: boolean;
    lastPathTime: number;
    misplaced: boolean;
    spawning: boolean;
    splitCount: number;
    unbreakable: boolean;
    readonly pathDelay: number;
    readonly sides: number;
    readonly options: import("..").ParticlesOptions;
    readonly life: IParticleLife;
    roll?: IParticleRoll;
    wobble?: IParticleWobble;
    backColor?: IHsl;
    close: boolean;
    fill: boolean;
    randomIndexData?: number;
    rotate?: IParticleValueAnimation<number>;
    tilt?: IParticleTiltValueAnimation;
    color?: IParticleHslAnimation;
    opacity?: IParticleNumericValueAnimation;
    strokeWidth?: number;
    stroke?: Stroke;
    strokeColor?: IParticleHslAnimation;
    readonly moveCenter: ICoordinates & {
        radius: number;
    };
    readonly gravity: IParticleGravity;
    readonly moveDecay: number;
    readonly outType: ParticleOutType;
    direction: number;
    readonly position: Vector3d;
    readonly offset: Vector;
    readonly shadowColor: IRgb | undefined;
    readonly size: IParticleNumericValueAnimation;
    readonly velocity: Vector;
    readonly shape: string;
    readonly initialPosition: Vector;
    readonly initialVelocity: Vector;
    readonly shapeData?: IShapeValues;
    readonly bubble: IBubbleParticleData;
    readonly zIndexFactor: number;
    readonly retina: IParticleRetinaProps;
    constructor(engine: Engine, id: number, container: Container, position?: ICoordinates, overrideOptions?: RecursivePartial<IParticlesOptions>, group?: string | undefined);
    isVisible(): boolean;
    isInsideCanvas(): boolean;
    draw(delta: IDelta): void;
    getPosition(): ICoordinates3d;
    getRadius(): number;
    getMass(): number;
    getFillColor(): IHsl | undefined;
    getStrokeColor(): IHsl | undefined;
    destroy(override?: boolean): void;
    reset(): void;
    private split;
    private calcPosition;
    private checkOverlap;
    private calculateVelocity;
    private loadShapeData;
    private loadLife;
}
