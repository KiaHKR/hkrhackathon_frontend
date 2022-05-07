import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { EMPTY, from, mergeMap, Subject, takeUntil } from 'rxjs';
import { tsParticles } from 'tsparticles-engine';
import * as i0 from "@angular/core";
export class NgParticlesComponent {
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
export class ParticlesComponent extends NgParticlesComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcGFydGljbGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXBhcnRpY2xlcy9zcmMvbGliL25nLXBhcnRpY2xlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFTakQsTUFBTSxPQUFPLG9CQUFvQjtJQVUvQixZQUF5QyxVQUFrQjtRQUFsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBTGpELG9CQUFlLEdBQ3ZCLElBQUksWUFBWSxFQUFhLENBQUM7UUFFeEIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFFdUIsQ0FBQztJQUV4RCxlQUFlO1FBQ3BCLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JDLE9BQU87U0FDUjtRQUVELE1BQU0sRUFBRSxHQUFHLENBQUMsU0FBcUIsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUVGLElBQUksQ0FDRixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQ3pFO2FBQ0UsSUFBSSxDQUNILFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO29CQUNYLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEQ7cUJBQU07b0JBQ0wsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdkM7YUFDRjtpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtvQkFDWCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2hEO3FCQUFNO29CQUNMLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Y7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FDWCxxREFBcUQsQ0FDdEQsQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDekI7YUFDQSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOztpSEFwRFUsb0JBQW9CLGtCQVVYLFdBQVc7cUdBVnBCLG9CQUFvQiwyTEFGckIsdUJBQXVCOzJGQUV0QixvQkFBb0I7a0JBSmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDOzswQkFXYyxNQUFNOzJCQUFDLFdBQVc7NENBVHRCLE9BQU87c0JBQWYsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksZUFBZTtzQkFBeEIsTUFBTTs7QUFzRFQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLG9CQUFvQjtJQUo1RDs7UUFTcUIsb0JBQWUsR0FDaEMsSUFBSSxZQUFZLEVBQWEsQ0FBQztLQUNqQzs7K0dBUFksa0JBQWtCO21HQUFsQixrQkFBa0IsK01BRm5CLHVCQUF1QjsyRkFFdEIsa0JBQWtCO2tCQUo5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsdUJBQXVCO2lCQUNsQzs4QkFFbUIsT0FBTztzQkFBeEIsS0FBSztnQkFDWSxHQUFHO3NCQUFwQixLQUFLO2dCQUNZLEVBQUU7c0JBQW5CLEtBQUs7Z0JBQ1ksYUFBYTtzQkFBOUIsS0FBSztnQkFDYSxlQUFlO3NCQUFqQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVNUFRZLCBmcm9tLCBtZXJnZU1hcCwgU3ViamVjdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IHRzUGFydGljbGVzIH0gZnJvbSAndHNwYXJ0aWNsZXMtZW5naW5lJztcbmltcG9ydCB0eXBlIHsgQ29udGFpbmVyLCBFbmdpbmUgfSBmcm9tICd0c3BhcnRpY2xlcy1lbmdpbmUnO1xuXG5pbXBvcnQgeyBJUGFydGljbGVzUHJvcHMgfSBmcm9tICcuL25nLXBhcnRpY2xlcy5tb2R1bGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1wYXJ0aWNsZXMnLFxuICB0ZW1wbGF0ZTogJzxkaXYgW2lkXT1cImlkXCI+PC9kaXY+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmdQYXJ0aWNsZXNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBvcHRpb25zPzogSVBhcnRpY2xlc1Byb3BzO1xuICBASW5wdXQoKSB1cmw/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuICBASW5wdXQoKSBwYXJ0aWNsZXNJbml0PzogKGVuZ2luZTogRW5naW5lKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBAT3V0cHV0KCkgcGFydGljbGVzTG9hZGVkOiBFdmVudEVtaXR0ZXI8Q29udGFpbmVyPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxDb250YWluZXI+KCk7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBzdHJpbmcpIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2IgPSAoY29udGFpbmVyPzogQ29udGFpbmVyKSA9PiB7XG4gICAgICB0aGlzLnBhcnRpY2xlc0xvYWRlZC5lbWl0KGNvbnRhaW5lcik7XG4gICAgfTtcblxuICAgIGZyb20oXG4gICAgICB0aGlzLnBhcnRpY2xlc0luaXQgPyB0aGlzLnBhcnRpY2xlc0luaXQodHNQYXJ0aWNsZXMpIDogUHJvbWlzZS5yZXNvbHZlKClcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnVybCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRzUGFydGljbGVzLmxvYWRKU09OKHRoaXMuaWQsIHRoaXMudXJsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB0c1BhcnRpY2xlcy5sb2FkSlNPTih0aGlzLnVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0c1BhcnRpY2xlcy5sb2FkKHRoaXMuaWQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdHNQYXJ0aWNsZXMubG9hZCh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAnWW91IG11c3Qgc3BlY2lmeSBvcHRpb25zIG9yIHVybCB0byBsb2FkIHRzUGFydGljbGVzJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoY2IpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1BhcnRpY2xlcycsXG4gIHRlbXBsYXRlOiAnPGRpdiBbaWRdPVwiaWRcIj48L2Rpdj4nLFxufSlcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZXNDb21wb25lbnQgZXh0ZW5kcyBOZ1BhcnRpY2xlc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG92ZXJyaWRlIG9wdGlvbnM/OiBJUGFydGljbGVzUHJvcHM7XG4gIEBJbnB1dCgpIG92ZXJyaWRlIHVybD86IHN0cmluZztcbiAgQElucHV0KCkgb3ZlcnJpZGUgaWQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG92ZXJyaWRlIHBhcnRpY2xlc0luaXQ/OiAoZW5naW5lOiBFbmdpbmUpID0+IFByb21pc2U8dm9pZD47XG4gIEBPdXRwdXQoKSBvdmVycmlkZSBwYXJ0aWNsZXNMb2FkZWQ6IEV2ZW50RW1pdHRlcjxDb250YWluZXI+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPENvbnRhaW5lcj4oKTtcbn1cbiJdfQ==