import { Injectable } from '@angular/core';
import Puzzle from 'src/models/puzzle';
import { BASE_API_URL } from 'src/globals';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor() { }

  async fetchPuzzles(notifyDisplayError?: (error: string) => void): Promise<Array<{ _id: string, _title: string, _story: string, _examples: { inputExample: string, logicExample: string } }> | null> {
    const token = localStorage.getItem('x-auth-token');
    if (token == null) {
      if (notifyDisplayError != undefined) notifyDisplayError('Saved user token not found.');
      return null;
    }
    const puzzlesRes = await fetch(`${BASE_API_URL}/puzzles`, {
      headers: {
        'x-auth-header': token,
      }
    })

    if (puzzlesRes == null || !puzzlesRes.ok) {
      if (notifyDisplayError != undefined) notifyDisplayError('There was an error fetching puzzles. Please reload the page and try again.');
      return null;
    };

    const data = await puzzlesRes.json();

    return data


    // return [
    //   new Puzzle("1", "Puzzle 1", "story 1", ["Example 1", "Example 2", "Example 3"]),
    //   new Puzzle("2", "Puzzle 2", "story 2", ["Example 1", "Example 2", "Example 3"]),
    //   new Puzzle("3", "Puzzle 3", "story 3", ["Example 1", "Example 2", "Example 3"]),
    //   new Puzzle("4", "Puzzle 4", "story 4", ["Example 1", "Example 2", "Example 3"])
    // ]
  }

  async answerPuzzle(puzzleId: string, answer: string, notifyDisplayError?: (error: string) => void): Promise<{ answer: boolean, information: string } | null> {
    // if (answer == "a") {
    //   UserService.user.currentPuzzleId = "3"
    //   console.log(UserService.user.currentPuzzleId)
    //   return { answer: true, information: "yes" }
    // }
    // return { answer: false, information: "no" }
    const token = localStorage.getItem('x-auth-token');
    if (token == null) {
      if (notifyDisplayError != undefined) notifyDisplayError('Saved user token not found.');
      return null;
    };

    const correctAnswerRes = await fetch(`${BASE_API_URL}/puzzles/${puzzleId}`, {
      method: 'POST',
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guess: answer
      })
    })

    if (correctAnswerRes == null) {
      if (notifyDisplayError != undefined) notifyDisplayError('There was an error submitting your answer. Please reload the page and try again.');
      return null;
    }

    const data = await correctAnswerRes.json();

    if (data.error) {
      if (notifyDisplayError) notifyDisplayError(data.error)
    }

    return data;
  }
}
