import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToLogin() {
    if (localStorage.getItem("x-auth-token")) [
      localStorage.removeItem("x-auth-token")
    ]
    this.route.navigate(["login"])

  }

  goToPuzzle() {
    this.route.navigate(["puzzles"])
  }

  userLoggedIn() {
    return localStorage.getItem("x-auth-token") != null
  }

}
