import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MatRippleModule } from '@angular/material/core';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AllPuzzlesListComponent } from './all-puzzles-list/all-puzzles-list.component';


@NgModule({
  declarations: [
    PuzzleComponent,
    PuzzlePageComponent,
    MobileMenuComponent,
    AccountComponent,
    AllPuzzlesListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    PuzzleComponent,
    PuzzlePageComponent,
    MobileMenuComponent,
    AccountComponent,
    AllPuzzlesListComponent,
  ]
})
export class PuzzleListComponentsModule { }
