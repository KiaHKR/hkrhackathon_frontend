import * as i0 from '@angular/core';
import { EventEmitter, PLATFORM_ID, Component, Inject, Input, Output, NgModule } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Subject, from, mergeMap, EMPTY, takeUntil } from 'rxjs';
import { tsParticles } from 'tsparticles-engine';

class NgParticlesComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.particlesLoaded = new EventEmitter();
        this.destroy$ = new Subject();
    }
    ngAfterViewInit() {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        const cb = (container) => {
            this.particlesLoaded.emit(container);
        };
        from(this.particlesInit ? this.particlesInit(tsParticles) : Promise.resolve())
            .pipe(mergeMap(() => {
            if (this.url) {
                if (this.id) {
                    return tsParticles.loadJSON(this.id, this.url);
                }
                else {
                    return tsParticles.loadJSON(this.url);
                }
            }
            else if (this.options) {
                if (this.id) {
                    return tsParticles.load(this.id, this.options);
                }
                else {
                    return tsParticles.load(this.options);
                }
            }
            else {
                console.error('You must specify options or url to load tsParticles');
                return EMPTY;
            }
        }), takeUntil(this.destroy$))
            .subscribe(cb);
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
}
NgParticlesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: NgParticlesComponent, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
NgParticlesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.2", type: NgParticlesComponent, selector: "ng-particles", inputs: { options: "options", url: "url", id: "id", particlesInit: "particlesInit" }, outputs: { particlesLoaded: "particlesLoaded" }, ngImport: i0, template: '<div [id]="id"></div>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: NgParticlesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ng-particles',
                    template: '<div [id]="id"></div>',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { options: [{
                type: Input
            }], url: [{
                type: Input
            }], id: [{
                type: Input
            }], particlesInit: [{
                type: Input
            }], particlesLoaded: [{
                type: Output
            }] } });
class ParticlesComponent extends NgParticlesComponent {
    constructor() {
        super(...arguments);
        this.particlesLoaded = new EventEmitter();
    }
}
ParticlesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: ParticlesComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ParticlesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.2", type: ParticlesComponent, selector: "Particles", inputs: { options: "options", url: "url", id: "id", particlesInit: "particlesInit" }, outputs: { particlesLoaded: "particlesLoaded" }, usesInheritance: true, ngImport: i0, template: '<div [id]="id"></div>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: ParticlesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'Particles',
                    template: '<div [id]="id"></div>',
                }]
        }], propDecorators: { options: [{
                type: Input
            }], url: [{
                type: Input
            }], id: [{
                type: Input
            }], particlesInit: [{
                type: Input
            }], particlesLoaded: [{
                type: Output
            }] } });

class NgParticlesModule {
}
NgParticlesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: NgParticlesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgParticlesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: NgParticlesModule, declarations: [NgParticlesComponent, ParticlesComponent], exports: [NgParticlesComponent, ParticlesComponent] });
NgParticlesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: NgParticlesModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.2", ngImport: i0, type: NgParticlesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgParticlesComponent, ParticlesComponent],
                    exports: [NgParticlesComponent, ParticlesComponent]
                }]
        }] });

/*
 * Public API Surface of ng-particles
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgParticlesComponent, NgParticlesModule, ParticlesComponent };
//# sourceMappingURL=ng-particles.mjs.map
