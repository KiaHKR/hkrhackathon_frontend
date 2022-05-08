import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        width: '60%'
      })),
      transition('in <=> out', [
        animate('0.2s')
      ])
    ]),
    trigger('fadeInOut', [
      state('in', style({
        opacity: 0,
        display: 'none'
      })),
      state('out', style({
        opacity: 1,
      })),
      transition('in => out', [
        style({ display: 'block' }),
        animate('0.2s')
      ]),
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
  @Input() itemList!: { name: string, value: string, visible: () => boolean }[];

  @Input() toggleMenuState!: () => void;
  @Input() changeTab!: (tab: string) => void;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  selectTab(newTab: string): void {
    this.changeTab(newTab);
    this.toggleMenuState();
  }

}
