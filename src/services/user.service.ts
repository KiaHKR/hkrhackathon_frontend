import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_API_URL } from 'src/globals';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static user = new User("", "", 2, true, "2")

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('x-auth-token');
    this.router.navigate(['login'])
  }

  async getUser(notifyDisplayError?: (error: string) => void): Promise<User | null> {
    // return UserService.user

    const token = localStorage.getItem('x-auth-token');
    if (token == null) {
      if (notifyDisplayError != undefined) notifyDisplayError('Saved user token not found.');
      return null;
    }

    const userRes = await fetch(`${BASE_API_URL}/user`, {
      headers: {
        'x-auth-header': token
      }
    })

    if (userRes == null || !userRes.ok) {
      if (notifyDisplayError != undefined) notifyDisplayError('There was an error fetching user information. Please reload the page and try again.');
      return null;
    }

    const data = await userRes.json();
    return (data as User);
  }

  async getUserFile(puzzleId: string, notifyDisplayError?: (error: string) => void): Promise<string | null> {
    // return "HERPA MERPA" + puzzleId
    const token = localStorage.getItem('x-auth-token');
    if (token == null) {
      if (notifyDisplayError != undefined) notifyDisplayError('Saved user token not found.');
      return null;
    }

    const puzzleStringRes = await fetch(`${BASE_API_URL}/user/${puzzleId}`, {
      headers: {
        'x-auth-header': token
      }
    })

    if (puzzleStringRes == undefined || !puzzleStringRes.ok) {
      if (notifyDisplayError != undefined) notifyDisplayError('There was an error fetching your puzzle data. Please reload the page and try again.');
      return null;
    }

    const data = await puzzleStringRes.json();

    if (data.error) {
      if (notifyDisplayError != undefined) notifyDisplayError(data.error);
      return null;
    }

    return data.userInput;
  }

  async updateUserInfo(name: string, year: string, notifyDisplayError: (error: string) => void): Promise<boolean> {
    const token = localStorage.getItem('x-auth-token');
    if (token == null) {
      notifyDisplayError('Saved user token not found. Try logging in again.');
      return false;
    }

    const res = await fetch(`${BASE_API_URL}/user`, {
      method: 'PUT',
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        year: year,
      }),
    });

    if (res == undefined) {
      notifyDisplayError('There was an internal error while updating info.')
      return false;
    }

    const data = await res.text();

    if (!res.ok) {
      notifyDisplayError(data);
      return false;
    }

    return true;
  }

  async updateUserPassword(oldPassword: string, newPassword: string, notifyDisplayError: (error: string) => void): Promise<boolean> {
    const token = localStorage.getItem('x-auth-token');
    if (token == null) {
      notifyDisplayError('Saved user token not found. Try logging in again.');
      return false;
    }

    const res = await fetch(`${BASE_API_URL}/user/password`, {
      method: 'POST',
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });

    if (res == undefined) {
      notifyDisplayError('There was an internal error while updating password.')
      return false;
    }

    const data = await res.json();

    if (!res.ok) {
      notifyDisplayError(data.error.replaceAll('"', '').replace('newPassword', 'New password').replace('oldPassword', 'Current password'));
      return false;
    }

    return true;
  }
}
