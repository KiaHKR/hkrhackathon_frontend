import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    PuzzleComponent,
    PuzzlePageComponent,
    MobileMenuComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule
  ],
  exports: [
    PuzzleComponent,
    PuzzlePageComponent,
    MobileMenuComponent
  ]
})
export class PuzzleListComponentsModule { }
