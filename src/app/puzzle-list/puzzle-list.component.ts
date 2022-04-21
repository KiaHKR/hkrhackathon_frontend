import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';

@Component({
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss']
})
export class PuzzleListComponent implements OnInit {

  puzzleList: Array<Puzzle> = [
    new Puzzle("1", "cake", "me too"),
    new Puzzle("2", "cake2", "me too2"),
    new Puzzle("3", "cake3", "me too3"),
    new Puzzle("4", "cake4", "me too4"),
    new Puzzle("5", "cake5", "me too5")
  ]
  userNextPuzzle: string = "3";

  accessiblePuzzles: Array<Puzzle> = [];
  inaccessiblePuzzles: Array<Puzzle> = [];

  constructor(private route: Router) { }

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

  openPuzzle(puzzleId: string): void {
    this.route.navigate(['/puzzle', puzzleId])
  }

}
