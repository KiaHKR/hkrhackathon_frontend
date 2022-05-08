import { Component, Input, OnInit } from '@angular/core';
import Puzzle from 'src/models/puzzle';

@Component({
  selector: 'app-all-puzzles-list',
  templateUrl: './all-puzzles-list.component.html',
  styleUrls: ['./all-puzzles-list.component.scss']
})
export class AllPuzzlesListComponent implements OnInit {

  @Input() puzzleList!: Puzzle[]
  @Input() accessiblePuzzles!: Puzzle[];
  @Input() inaccessiblePuzzles!: Puzzle[];
  @Input() openPuzzle!: (puzzle: Puzzle, index: number) => void;

  constructor() { }

  ngOnInit(): void {
  }

}
