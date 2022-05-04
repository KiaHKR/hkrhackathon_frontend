import { Component, OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Engine } from "tsparticles-modules/tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-background-particles',
  templateUrl: './background-particles.component.html',
  styleUrls: ['./background-particles.component.scss'],
})
export class BackgroundParticlesComponent implements OnInit {

  id: string = "tsparticles";
  particlesOptions = {
    background: {
      color: {
        value: "#141a21"
      }
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#fff"
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: MoveDirection.top,
        enable: true,
        outModes: OutMode.out,
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true, area: 1000
        },
        value: 100
      },
      opacity: {
        value: 0.3
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1, max: 7 }
      }
    },
    detectRetina: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

}
