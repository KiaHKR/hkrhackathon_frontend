import { Component, OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Engine, RotateDirection } from "tsparticles-modules/tsparticles-engine";
import { loadFull } from "tsparticles";
import { loadRoundedRectShape } from 'tsparticles-shape-rounded-rect';

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
      rotate: {
        direction: RotateDirection.random,
        animation: {
          enable: true,
          speed: 4,
          random: true
        }
      },
      number: {
        density: {
          enable: true, area: 200
        },
        value: 5
      },
      opacity: {
        value: 0.3
      },
      shape: {
        type: "rounded-rect"
      },
      size: {
        value: { min: 5, max: 20 }
      }
    },
    detectRetina: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  async particlesInit(engine: Engine): Promise<void> {
    loadRoundedRectShape(engine);
    await loadFull(engine);
  }

}
