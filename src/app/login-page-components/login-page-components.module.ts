import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlitchLogoComponent } from './glitch-logo/glitch-logo.component';
import { BackgroundParticlesComponent } from './background-particles/background-particles.component';
import { NgParticlesModule } from "tsparticles-modules/ng-particles";


@NgModule({
  declarations: [
    GlitchLogoComponent,
    BackgroundParticlesComponent
  ],
  imports: [
    CommonModule,
    NgParticlesModule,
  ],
  exports: [
    GlitchLogoComponent,
    BackgroundParticlesComponent
  ]
})
export class LoginPageComponentsModule { }
