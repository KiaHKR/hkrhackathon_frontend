import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackathonNg';

  showBackgroundParticles!: boolean;
  isLoginPage!: boolean;

  constructor(private contexts: ChildrenOutletContexts) {
  }

  updateRouteAttributes() {
    this.getShowBackground();
    this.getIsLoginPage();
  }

  getShowBackground() {
    this.showBackgroundParticles = this.contexts.getContext('primary')?.route?.snapshot?.data?.['showBackground'];
  }

  getIsLoginPage() {
    this.isLoginPage = this.contexts.getContext('primary')?.route?.snapshot?.routeConfig?.path == 'login';
  }
}
