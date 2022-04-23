import { Injectable } from '@angular/core';
import Puzzle from 'src/models/puzzle';
import { BASE_API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor() { }


  async fetchPuzzles(): Promise<Array<Puzzle>> {
    // const token = localStorage.getItem('x-auth-token');
    // if (token == null) return [];
    // const puzzlesRes = await fetch(`${BASE_API_URL}/puzzles`, {
    //   headers: {
    //     'x-auth-header': token,
    //   }
    // })

    // if (puzzlesRes == null) return [];

    // const data = await puzzlesRes.json();

    // return data;

    return [
      new Puzzle("1", "Puzzle 1", "story 1", ["Example 1", "Example 2", "Example 3"]),
      new Puzzle("2", "Puzzle 2", "story 2", ["Example 1", "Example 2", "Example 3"]),
      new Puzzle("3", "Puzzle 3", "story 3", ["Example 1", "Example 2", "Example 3"]),
      new Puzzle("4", "Puzzle 4", "story 4", ["Example 1", "Example 2", "Example 3"])
    ]
  }

  async answerPuzzle(puzzleId: string, answer: string): Promise<boolean> {

    const token = localStorage.getItem('x-auth-token');
    if (token == null) return false;

    const correctAnswerRes = await fetch(`${BASE_API_URL}/puzzles/${puzzleId}`, {
      method: 'POST',
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answer: answer
      })
    })

    if (correctAnswerRes == null) return false;

    const data = await correctAnswerRes.json();

    return data.answer;
  }
}
