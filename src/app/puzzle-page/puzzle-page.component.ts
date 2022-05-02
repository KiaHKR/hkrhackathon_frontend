import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  templateUrl: './puzzle-page.component.html',
  styleUrls: ['./puzzle-page.component.scss']
})
export class PuzzlePageComponent implements OnInit {
  input_file?: string;

  constructor(private userService: UserService, private puzzleService: PuzzleService, private route: ActivatedRoute) {
  }

  getFile() {

    this.userService.getUserFile(this.route.snapshot.params['id']).then(file => {
      if (file == null) {
        return
      }
      else {
        this.input_file = file
      }
    })


  }

  ngOnInit(): void {
    this.getFile()
  }

}
