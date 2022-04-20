import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  userLogin(email: string, password: string) {
    // SUBMIT USERNAME AND PASSWORD TO BACKEND HERE
  }

  userRegister(email: string, name: string, year: string, password: string) {

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token');
    if (token === null) return false;

    //! Implement backend check to get token expiration!
    return !this.jwtHelper.isTokenExpired(token);
  }
}
