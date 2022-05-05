import { Injectable } from '@angular/core';
import { BASE_API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class AdminPuzzleService {

  constructor() { }

  async getPuzzleVisibilityList(errorCB: (error: string) => void): Promise<{ puzzleId: string, visible: boolean }[] | null> {
    const token = localStorage.getItem('x-auth-token');
    if (token == undefined) {
      errorCB("Couldn't fetch user token.")
      return null;
    }

    const res = await fetch(`${BASE_API_URL}/admin/get/puzzles`, {
      headers: {
        'x-auth-header': token,
      }
    });

    if (res == undefined) {
      errorCB("Couldn't fetch users, due to internal error.");
      return null;
    }

    const body = await res.json()

    if (!res.ok) {
      errorCB(body.error);
      return null;
    }

    return body;
  }

  async udpatePuzzleVisibilityList(puzzleVisibilities: { puzzleId: string, visible: boolean }[], errorCB: (error: string) => void): Promise<boolean> {
    const token = localStorage.getItem('x-auth-token');
    if (token == undefined) {
      errorCB("Couldn't fetch user token.")
      return false;
    }

    const res = await fetch(`${BASE_API_URL}/admin/save/puzzles`, {
      method: "PUT",
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(puzzleVisibilities),
    });

    if (res == undefined) {
      errorCB("Couldn't update puzzles, due to internal error.")
      return false;
    }

    const body = await res.json();

    if (!res.ok) {
      errorCB(body.error);
      return false;
    }

    return true;
  }
}
