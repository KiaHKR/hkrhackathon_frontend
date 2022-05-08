import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPuzzlesListComponent } from './all-puzzles-list.component';

describe('AllPuzzlesListComponent', () => {
  let component: AllPuzzlesListComponent;
  let fixture: ComponentFixture<AllPuzzlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPuzzlesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPuzzlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
