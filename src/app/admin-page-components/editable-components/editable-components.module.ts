import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from './drop-down/drop-down.component';
import { TextComponent } from './text/text.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DropDownComponent,
    TextComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    DropDownComponent,
    TextComponent
  ]
})
export class EditableComponentsModule { }
