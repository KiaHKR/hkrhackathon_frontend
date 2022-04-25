import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
  selector: 'puzzle-component',
})
export class PuzzleComponent implements OnInit {

  @Input() puzzle!: Puzzle;
  @Input() index!: string;
  @Input() indexTotal!: string;
  @ViewChild("answerField") answerField!: ElementRef;


  constructor(private puzzleService: PuzzleService, private route: Router) {
  }

  routePage() {
    this.route.navigate(["puzzles/" + this.puzzle.id])
  }

  verifyAnswer() {
    if (this.answerField.nativeElement.value == "") {
      alert("please enter an answer into the Output field")
    }
    else {
      const checkAnswer = this.puzzleService.answerPuzzle(this.puzzle.id, this.answerField.nativeElement.value).then(answer => {
        if (answer?.answer == true) {
          console.log(answer?.information)
        }
        else {
          console.log(answer?.information)
        }
      })
    }

  }

  ngOnInit(): void {

  }
}
