import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        width: '0px',
        left: '-2rem'
      })),
      state('out', style({
        width: '50%'
      })),
      transition('in <=> out', [
        animate('0.2s')
      ])
    ])
  ]
})
export class MobileMenuComponent implements OnInit {

  // Animation states
  @Input() slideInOutState!: string;
  @Input() showPuzzleTab!: boolean;
  @Input() changeTab!: (tab: string) => void;

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(newTab: string): void {
    this.changeTab(newTab);
  }

}
