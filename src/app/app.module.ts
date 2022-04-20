import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageComponentsModule } from './login-page-components/login-page-components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MainPageComponent } from './main-page/main-page.component';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    LoginPageComponentsModule,
    TabsModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
