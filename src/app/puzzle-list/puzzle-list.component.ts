import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { User } from 'src/models/user';
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
  chosenPuzzleIndex?: string;

  accessiblePuzzles: Array<Puzzle> = [];
  inaccessiblePuzzles: Array<Puzzle> = [];
  puzzleCompleted?: boolean;
  loading: boolean = true;

  userIsAdmin: boolean = false;
  user!: User;

  // Tab active bools
  puzzleTabActive: boolean = false;
  listTabActive: boolean = true;
  accountTabActive: boolean = false;

  // Animation states
  tabVisibilityState: string = 'hidden';
  puzzleTabExpandState: string = 'collapsed';
  accountTabExpandState: string = 'collapsed';
  puzzleListTabExpandState: string = 'collapsed';
  mobileMenuPositionState: string = 'in';

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
      this.user = user;

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
      })
    })
  }

  updateTabFromMenu(activeTab: string) {
    this.listTabActive = false;
    this.puzzleTabActive = false;
    this.accountTabActive = false;

    if (activeTab == 'list') {
      this.listTabActive = true;
    } else
      if (activeTab == 'puzzle') {
        this.puzzleTabActive = true;
      } else
        if (activeTab == 'account') {
          this.accountTabActive = true;
        }
  }

  changeTab(activeTab: string) {
    this.accountTabExpandState = 'collapsed';
    this.puzzleListTabExpandState = 'collapsed';
    this.puzzleTabExpandState = 'collapsed';


    if (activeTab == 'list') {
      this.updateList()
    } else
      if (activeTab == 'puzzle') {
        this.puzzleTabExpandState = 'expanded';
      } else
        if (activeTab == 'account') {
          this.accountTabExpandState = 'expanded';
        }
  }

  openPuzzle(puzzle: Puzzle, index: number): void {
    new Promise(f => setTimeout(f, 100)).then(() => {
      this.chosenPuzzle = puzzle;
      this.chosenPuzzleIndex = `${index}`;
      this.updateTabFromMenu('puzzle');
      this.changeTab('puzzle');
    })
  }

  openCloseMenu() {
    this.mobileMenuPositionState = this.mobileMenuPositionState == 'in' ? 'out' : 'in';
  }

  openAdmin() {
    this.router.navigate(['dashboard'])
  }
}
