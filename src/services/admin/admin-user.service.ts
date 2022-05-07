import { Injectable } from '@angular/core';
import { BASE_API_URL } from 'src/globals';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor() { }

  async getAllUsers(errorCB: (error: string) => void): Promise<User[] | null> {
    const token = localStorage.getItem('x-auth-token');
    if (token == undefined) {
      errorCB("Couldn't fetch user token.")
      return null;
    }

    const res = await fetch(`${BASE_API_URL}/admin`, {
      headers: {
        'x-auth-header': token
      }
    });

    if (res == undefined) {
      errorCB("Couldn't fetch users, due to internal error.")
      return null;
    }

    const body = await res.json();

    if (!res.ok) {
      errorCB(body.error);
      return null;
    }

    let parsedUserList = []

    for (const userJSON of body) {
      parsedUserList.push(new User(userJSON.name, userJSON.email, userJSON.year, userJSON.isAdmin, userJSON.currentPuzzleId))
    }

    return parsedUserList;

  }

  async getUser(email: string, errorCB: (error: string) => void): Promise<User | null> {
    const token = localStorage.getItem('x-auth-token');
    if (token == undefined) {
      errorCB("Couldn't fetch user token.")
      return null;
    }

    const res = await fetch(`${BASE_API_URL}/admin/${email}`, {
      headers: {
        'x-auth-header': token
      }
    });

    if (res == undefined) {
      errorCB("Couldn't fetch user, due to internal error.")
      return null;
    }

    const body = await res.json();

    if (!res.ok) {
      errorCB(body.error);
      return null;
    }

    return body.publicUser;
  }

  async updateUser(email: string, user: User, errorCB: (error: string) => void): Promise<boolean> {
    const token = localStorage.getItem('x-auth-token');
    if (token == undefined) {
      errorCB("Couldn't fetch user token.")
      return false;
    }

    const res = await fetch(`${BASE_API_URL}/admin/${email}`, {
      method: "PUT",
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        year: user.year,
        isAdmin: user.isAdmin,
        currentPuzzleId: user.currentPuzzleId,
      })
    });

    if (res == undefined) {
      errorCB("Couldn't fetch user, due to internal error.")
      return false;
    }

    const body = await res.json();

    if (!res.ok) {
      errorCB(body.error);
      return false;
    }

    return true;
  }

  async updateUserPuzzles(email: string, allowedPuzzleIds: string[], newPuzzleId: string, errorCB: (error: string) => void): Promise<boolean> {
    const token = localStorage.getItem('x-auth-token');
    if (token == undefined) {
      errorCB("Couldn't fetch user token.")
      return false;
    }

    const res = await fetch(`${BASE_API_URL}/admin/update/${email}`, {
      method: "PUT",
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        puzzles: allowedPuzzleIds,
        newPuzzleId: newPuzzleId,
      })
    })

    if (res == undefined) {
      errorCB("Coudln't update puzzles, due to internal error.")
      return false;
    }

    const body = await res.json();
    if (!res.ok) {
      errorCB(body.error);
      return false;
    }

    return true;
  }

  async deleteUser(email: string, errorCB: (error: string) => void): Promise<boolean> {
    const token = localStorage.getItem('x-auth-token');
    if (token == undefined) {
      errorCB("Couldn't fetch user token.")
      return false;
    }

    const res = await fetch(`${BASE_API_URL}/admin/${email}`, {
      method: "DELETE",
      headers: {
        'x-auth-header': token
      }
    });

    if (res == undefined) {
      errorCB("Couldn't fetch user, due to internal error.")
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
