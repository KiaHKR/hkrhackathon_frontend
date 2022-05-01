import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';

@Component({
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
  selector: 'puzzle-component',
})
export class PuzzleComponent implements OnInit {

  @Input() puzzle!: Puzzle;
  @Input() index!: string;
  @Input() indexTotal!: string;
  @Input() alertsOpen!: boolean;
  @Input() setAlertsOpen!: (value: boolean) => void;
  @ViewChild("answerField") answerField!: ElementRef;

  puzzleCompleted?: boolean;
  puzzleInformation?: string;


  constructor(private puzzleService: PuzzleService, private route: Router) {
  }

  ngOnInit(): void {

  }

  alertClosed() {
    this.puzzleCompleted = undefined;
    this.puzzleInformation = undefined;
  }

  routePage() {
    let task_reroute = this.route.serializeUrl(this.route.createUrlTree(['/puzzles/' + this.puzzle.id]))
    window.open(task_reroute, '_blank')
  }

  verifyAnswer() {
    if (this.answerField.nativeElement.value == "") {
      alert("please enter an answer into the Output field")
    }
    else {
      const checkAnswer = this.puzzleService.answerPuzzle(this.puzzle.id, this.answerField.nativeElement.value).then(answer => {
        if (answer?.answer == true) {
          this.puzzleCompleted = answer?.answer;
          this.answerField.nativeElement.value = "";
          this.setAlertsOpen(true);
        }
        else {
          this.puzzleCompleted = answer?.answer;
          this.puzzleInformation = answer?.information;
          this.setAlertsOpen(true);
        }
      })
    }
  }


}
