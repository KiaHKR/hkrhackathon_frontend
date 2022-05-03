import { Injectable } from '@angular/core';
import { BASE_API_URL } from 'src/globals';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

    return body.publicUsers;

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
        'x-auth-header': token
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
