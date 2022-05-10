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

  // Tab definitions
  tabList: { name: string, value: string, visible: () => boolean }[] = [
    { name: "All puzzles", value: 'list', visible: () => true },
    { name: "Chosen puzzle", value: 'puzzle', visible: () => this.chosenPuzzle != undefined },
    { name: "Leaderboard", value: 'leaderboard', visible: () => true },
    { name: "Account", value: 'account', visible: () => true },
  ]

  // Tab active bools
  puzzleTabActive: boolean = false;
  listTabActive: boolean = true;
  accountTabActive: boolean = false;
  leaderboardTabActive: boolean = false;

  // Animation states
  tabVisibilityState: string = 'hidden';
  puzzleTabExpandState: string = 'collapsed';
  accountTabExpandState: string = 'collapsed';
  puzzleListTabExpandState: string = 'collapsed';
  leaderboardTabExpandState: string = 'collapsed';
  mobileMenuPositionState: string = 'in';

  constructor(private puzzleService: PuzzleService, public userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateList()
  }

  displayError(error: string): void {
    this._snackBar.open(error, 'dismiss', { panelClass: 'failure-snackbar' })
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
    this.leaderboardTabActive = false;

    switch (activeTab) {
      case 'list':
        this.listTabActive = true;
        break;
      case 'puzzle':
        this.puzzleTabActive = true;
        break;
      case 'account':
        this.accountTabActive = true;
        break;
      case 'leaderboard':
        this.leaderboardTabActive = true;
        break;
      default:
        break;
    }
  }

  changeTab(activeTab: string) {
    this.accountTabExpandState = 'collapsed';
    this.puzzleListTabExpandState = 'collapsed';
    this.puzzleTabExpandState = 'collapsed';
    this.leaderboardTabExpandState = 'collapsed';

    switch (activeTab) {
      case 'list':
        this.updateList();
        break;
      case 'puzzle':
        this.puzzleTabExpandState = 'expanded';
        break;
      case 'account':
        this.accountTabExpandState = 'expanded';
        break;
      case 'leaderboard':
        this.leaderboardTabExpandState = 'expanded';
        break;
      default:
        break;
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

  toggleMenuState() {
    this.mobileMenuPositionState = this.mobileMenuPositionState == 'in' ? 'out' : 'in';
  }

  openAdmin() {
    this.router.navigate(['dashboard'])
  }
}
