import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PuzzleListComponent implements OnInit {

  puzzleList!: Array<Puzzle>;
  chosenPuzzle?: Puzzle;
  puzzleTabActive: boolean = false;
  chosenPuzzleIndex?: string;

  accessiblePuzzles: Array<Puzzle> = [];
  inaccessiblePuzzles: Array<Puzzle> = [];

  constructor(private puzzleService: PuzzleService, private userService: UserService) { }

  ngOnInit(): void {
    this.updateList()
  }

  updateList() {
    this.accessiblePuzzles = []
    this.inaccessiblePuzzles = []
    this.userService.getUser().then(user => {
      if (user == null) return

      this.puzzleService.fetchPuzzles().then((puzzles) => {
        if (puzzles == null) return

        this.puzzleList = puzzles;
        let accessible = true;
        for (const puzzle of this.puzzleList) {
          if (accessible) {
            this.accessiblePuzzles.push(puzzle);

            if (puzzle.id == user?.currentPuzzleId) {
              accessible = false;
            }
            continue
          }

          this.inaccessiblePuzzles.push(puzzle);
        }
      })
    })
  }

  listTabActive() {
    this.puzzleTabActive = false
    this.updateList()
  }


  openPuzzle(puzzle: Puzzle, index: number): void {
    this.chosenPuzzle = puzzle;
    this.chosenPuzzleIndex = `${index}`;
    this.puzzleTabActive = true;


  }

  openList(): void {
    this.puzzleTabActive = false;
  }

}
