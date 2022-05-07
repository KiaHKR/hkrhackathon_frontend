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

  constructor(private contexts: ChildrenOutletContexts) {
  }

  getRoutePage() {
    this.showBackgroundParticles = this.contexts.getContext('primary')?.route?.snapshot?.data?.['showBackground'];
  }
}
