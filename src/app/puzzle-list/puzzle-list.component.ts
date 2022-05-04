import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PuzzleListComponent implements OnInit {

  puzzleList: Array<Puzzle> = [];
  chosenPuzzle?: Puzzle;
  puzzleTabActive: boolean = false;
  chosenPuzzleIndex?: string;

  accessiblePuzzles: Array<Puzzle> = [];
  inaccessiblePuzzles: Array<Puzzle> = [];
  puzzleCompleted?: boolean;
  loading: boolean = true;

  userIsAdmin: boolean = false;

  constructor(private puzzleService: PuzzleService, public userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateList()
  }

  displayError(error: string): void {
    this._snackBar.open(error, 'dismiss')
  }

  updateList() {
    this.loading = true;
    this.puzzleList = []
    this.accessiblePuzzles = []
    this.inaccessiblePuzzles = []
    this.userService.getUser(this.displayError.bind(this)).then(user => {
      if (user == null) return

      this.userIsAdmin = user == undefined ? false : user.isAdmin;

      this.puzzleService.fetchPuzzles(this.displayError.bind(this)).then((puzzles) => {
        if (puzzles == null) return
        this.puzzleList = puzzles;
        let accessible = true;
        for (const puzzle of this.puzzleList) {
          if (accessible) {
            this.accessiblePuzzles.push(puzzle);

            if (puzzle.id == user.currentPuzzleId) {
              accessible = false;
            }
            continue
          }

          this.inaccessiblePuzzles.push(puzzle);
        }
        this.loading = false;
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

  openAdmin() {
    this.router.navigate(['dashboard'])
  }
}
