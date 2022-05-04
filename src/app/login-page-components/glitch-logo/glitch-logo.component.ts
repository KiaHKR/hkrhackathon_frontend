import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'login-page-glitch-logo',
  templateUrl: './glitch-logo.component.html',
  styleUrls: ['./glitch-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlitchLogoComponent implements OnInit {

  @Input() light: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
