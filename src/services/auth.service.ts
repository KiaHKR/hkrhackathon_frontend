import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BASE_API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  async userLogin(email: string, password: string, notifiyLoginError: (value: string) => void): Promise<boolean> {
    const res = await fetch(`${BASE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (res == null) {
      notifiyLoginError('An error occurred, please try again.');
      return false;
    }

    const json = await res.json();

    if (!res.ok) {
      notifiyLoginError(json.error);
      return false;
    }

    localStorage.setItem('x-auth-token', json.token);
    return true;
  }

  async userRegister(email: string, name: string, year: number, password: string, notifiyRegisterError: (value: string) => void): Promise<boolean> {
    console.log(`email: ${email}`)
    console.log(`name: ${name}`)
    console.log(`year: ${year}`)
    console.log(`password: ${password}`)

    const res = await fetch(`${BASE_API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': email,
        'name': name,
        'year': year,
        'password': password,
      })
    });

    if (res == null) {
      notifiyRegisterError('An error occurred, please try again.')
      return false;
    }

    const json = await res.json();

    if (!res.ok) {
      notifiyRegisterError(json.error)
      return false;
    }

    localStorage.setItem('x-auth-token', res.headers.get('x-auth-header')!);
    return true;
  }

  async isAuthenticated(adminAuth: boolean = false): Promise<boolean> {
    const token = localStorage.getItem('x-auth-token');
    if (token === null) return false;
    if (this.jwtHelper.isTokenExpired(token)) return false;

    const authorizedRes = await fetch(`${BASE_API_URL}/user`, {
      headers: {
        "x-auth-header": token,
        'Content-Type': 'application/json',
      }
    });

    if (authorizedRes == null || !authorizedRes.ok) return false;

    if (adminAuth) {
      const body = await authorizedRes.json();
      if (!body.publicUser.isAdmin) return false;
    }

    return true;
  }
}
