import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleServiceService } from 'src/services/puzzle-service.service';

@Component({
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PuzzleListComponent implements OnInit {
  @ViewChild("puzzle-tab") puzzleTab?: ElementRef;

  puzzleList: Array<Puzzle> = this.puzzleService.fetchPuzzles();
  chosenPuzzle?: Puzzle;
  userNextPuzzle: string = "3";
  puzzleTabActive: boolean = false;

  accessiblePuzzles: Array<Puzzle> = [];
  inaccessiblePuzzles: Array<Puzzle> = [];

  constructor(private puzzleService: PuzzleServiceService) { }

  ngOnInit(): void {
    let accessible = true;
    for (const puzzle of this.puzzleList) {
      if (accessible) {
        this.accessiblePuzzles.push(puzzle);

        if (puzzle.id == this.userNextPuzzle) {
          accessible = false;
        }
        continue
      }

      this.inaccessiblePuzzles.push(puzzle);
    }
  }

  openPuzzle(puzzle: Puzzle): void {
    this.chosenPuzzle = puzzle;
    this.puzzleTabActive = true;

  }

}
