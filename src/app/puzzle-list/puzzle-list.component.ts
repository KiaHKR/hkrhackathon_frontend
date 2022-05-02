import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  alertsOpen: boolean = true;

  userIsAdmin: boolean = false;

  constructor(private puzzleService: PuzzleService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.updateList()
  }

  updateList() {
    this.loading = true;
    this.puzzleList = []
    this.accessiblePuzzles = []
    this.inaccessiblePuzzles = []
    this.userService.getUser().then(user => {
      if (user == null) return

      this.userIsAdmin = user == undefined ? false : user.isAdmin;

      this.puzzleService.fetchPuzzles().then((puzzles) => {
        if (puzzles == null) return
        puzzles.forEach(element => {
          this.puzzleList.push(new Puzzle(element._id, element._title, element._story, element._examples))
        });
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
    this.alertsOpen = false;
    this.updateList()
  }

  openPuzzle(puzzle: Puzzle, index: number): void {
    this.chosenPuzzle = puzzle;
    this.chosenPuzzleIndex = `${index}`;
    this.puzzleTabActive = true;
  }

  setAlertsOpen(value: boolean) {
    this.alertsOpen = value;
  }

  openAdmin() {

  }

  logout() {
    localStorage.removeItem('x-auth-token');
    this.router.navigate(['login'])
  }

}
