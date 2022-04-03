import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchLogoComponent } from './glitch-logo.component';

describe('GlitchLogoComponent', () => {
  let component: GlitchLogoComponent;
  let fixture: ComponentFixture<GlitchLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlitchLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlitchLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
