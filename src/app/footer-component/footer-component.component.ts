import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() showPuzzleLink!: boolean;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  loginLogout() {
    if (localStorage.getItem("x-auth-token")) {
      localStorage.removeItem("x-auth-token")
    }
    this.route.navigate(["login"])
  }

  userLoggedIn() {
    return localStorage.getItem("x-auth-token") != null
  }

}
