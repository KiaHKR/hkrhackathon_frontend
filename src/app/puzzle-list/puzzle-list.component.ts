import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';

@Component({
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PuzzleListComponent implements OnInit {
  @ViewChild("puzzle-tab") puzzleTab?: ElementRef;

  puzzleList!: Array<Puzzle>;
  chosenPuzzle?: Puzzle;
  userCurrentPuzzle: string = "3";
  puzzleTabActive: boolean = false;

  accessiblePuzzles: Array<Puzzle> = [];
  inaccessiblePuzzles: Array<Puzzle> = [];

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {
    this.puzzleService.fetchPuzzles().then((puzzles) => {
      this.puzzleList = puzzles;
      let accessible = true;
      for (const puzzle of this.puzzleList) {
        if (accessible) {
          this.accessiblePuzzles.push(puzzle);

          if (puzzle.id == this.userCurrentPuzzle) {
            accessible = false;
          }
          continue
        }

        this.inaccessiblePuzzles.push(puzzle);
      }
    })
  }

  openPuzzle(puzzle: Puzzle): void {
    this.chosenPuzzle = puzzle;
    this.puzzleTabActive = true;

  }

}
