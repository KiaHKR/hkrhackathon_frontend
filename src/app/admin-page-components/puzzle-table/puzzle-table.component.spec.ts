import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleTableComponent } from './puzzle-table.component';

describe('PuzzleTableComponent', () => {
  let component: PuzzleTableComponent;
  let fixture: ComponentFixture<PuzzleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
