import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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


  constructor(private puzzleService: PuzzleService, private route: Router, private _snackbar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  routePage() {
    let task_reroute = this.route.serializeUrl(this.route.createUrlTree(['/puzzles/' + this.puzzle.id]))
    window.open(task_reroute, '_blank')
  }

  verifyAnswer(event: Event) {
    event.preventDefault();

    if (this.answerField.nativeElement.value == "") {
      this._snackbar.open("Please enter a value to submit.", "dismiss", { panelClass: 'neutral-snackbar' })
    }
    else {
      this.puzzleService.answerPuzzle(this.puzzle.id, this.answerField.nativeElement.value).then(answer => {
        if (answer?.answer == true) {
          this._snackbar.open("Puzzle completed!", "dismiss", { duration: 5000, panelClass: 'success-snackbar' })
        }
        else {
          this._snackbar.open(answer?.information!, "dismiss", { duration: 5000, panelClass: 'failure-snackbar' })
        }
      })
    }
  }


}
