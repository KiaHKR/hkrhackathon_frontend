import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageComponentsModule } from './login-page-components/login-page-components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    LoginPageComponentsModule,
    TabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
