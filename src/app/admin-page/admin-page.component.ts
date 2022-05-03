import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {

  }

  openPuzzles(): void {
    this.router.navigate(['puzzles'])
  }
}
