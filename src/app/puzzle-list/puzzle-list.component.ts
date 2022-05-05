import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { UserService } from 'src/services/user.service';
import { tabFadeAnimation } from 'src/utils/animations';

@Component({
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    tabFadeAnimation,
    trigger('tabsBodyExpand', [
      state('expanded', style({
        height: '*'
      })),
      state('collapsed', style({
        height: '0px'
      })),
      transition('collapsed => expanded', [
        animate('0.2s')
      ])
    ])
  ]
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

  // Animation states
  tabVisibilityState: string = 'hidden';
  puzzleTabExpandState: string = 'collapsed';
  puzzleListTabExpandState: string = 'collapsed';

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
        this.tabVisibilityState = 'shown';
        this.puzzleListTabExpandState = 'expanded';
        this.puzzleTabExpandState = 'collapsed';
      })
    })
  }

  listTabOpened() {
    this.puzzleTabActive = false
    this.updateList()
  }

  puzzleTabOpened() {
    this.puzzleListTabExpandState = 'collapsed';
    this.puzzleTabExpandState = 'expanded';
  }

  openPuzzle(puzzle: Puzzle, index: number): void {
    this.chosenPuzzle = puzzle;
    this.chosenPuzzleIndex = `${index}`;
    this.puzzleTabActive = true;
    this.puzzleTabOpened();
  }

  openAdmin() {
    this.router.navigate(['dashboard'])
  }
}
