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


@NgModule({
  declarations: [
    PuzzleComponent,
    PuzzlePageComponent,
    MobileMenuComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    ReactiveFormsModule
  ],
  exports: [
    PuzzleComponent,
    PuzzlePageComponent,
    MobileMenuComponent,
    AccountComponent
  ]
})
export class PuzzleListComponentsModule { }
