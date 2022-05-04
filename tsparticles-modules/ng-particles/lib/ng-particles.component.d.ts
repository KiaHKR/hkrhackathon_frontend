import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import type { Container, Engine } from '../../tsparticles-engine';
import { IParticlesProps } from './ng-particles.module';
import * as i0 from "@angular/core";
export declare class NgParticlesComponent implements AfterViewInit, OnDestroy {
    private platformId;
    options?: IParticlesProps;
    url?: string;
    id?: string;
    particlesInit?: (engine: Engine) => Promise<void>;
    particlesLoaded: EventEmitter<Container>;
    private destroy$;
    constructor(platformId: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgParticlesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgParticlesComponent, "ng-particles", never, { "options": "options"; "url": "url"; "id": "id"; "particlesInit": "particlesInit"; }, { "particlesLoaded": "particlesLoaded"; }, never, never>;
}
export declare class ParticlesComponent extends NgParticlesComponent {
    options?: IParticlesProps;
    url?: string;
    id?: string;
    particlesInit?: (engine: Engine) => Promise<void>;
    particlesLoaded: EventEmitter<Container>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticlesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticlesComponent, "Particles", never, { "options": "options"; "url": "url"; "id": "id"; "particlesInit": "particlesInit"; }, { "particlesLoaded": "particlesLoaded"; }, never, never>;
}
