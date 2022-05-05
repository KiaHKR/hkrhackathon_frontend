import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageComponentsModule } from './login-page-components/login-page-components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PuzzleListComponent } from './puzzle-list/puzzle-list.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPageComponentsModule } from './admin-page-components/admin-page-components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AccountComponent } from './account/account.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PuzzleListComponent,
    PuzzleComponent,
    PuzzlePageComponent,
    AdminPageComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    LoginPageComponentsModule,
    TabsModule,
    AlertModule,
    AdminPageComponentsModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
