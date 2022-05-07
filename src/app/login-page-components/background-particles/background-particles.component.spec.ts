import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundParticlesComponent } from './background-particles.component';

describe('BackgroundParticlesComponent', () => {
  let component: BackgroundParticlesComponent;
  let fixture: ComponentFixture<BackgroundParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundParticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
