import { Injectable } from '@angular/core';
import Puzzle from 'src/models/puzzle';

@Injectable({
  providedIn: 'root'
})
export class PuzzleServiceService {

  constructor() { }


  fetchPuzzles(): Array<Puzzle> {
    //TODO RETURN LIST OF PUZZLES
    return [
      new Puzzle("1", "Puzzle 1", "story 1", ["Example 1", "Example 2", "Example 3"]),
      new Puzzle("2", "Puzzle 2", "story 2", ["Example 1", "Example 2", "Example 3"]),
      new Puzzle("3", "Puzzle 3", "story 3", ["Example 1", "Example 2", "Example 3"]),
      new Puzzle("4", "Puzzle 4", "story 4", ["Example 1", "Example 2", "Example 3"])
    ]

  }
}
