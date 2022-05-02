import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() { }

  validateUserRegister(email: string, name: string, year: string, password: string, errorCB: Function): void {
    const emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email == "") {
      errorCB("Email must not be empty.");
      return
    }

    if (!email.match(emailRegExp)) {
      errorCB("Invalid email format.")
      return
    }

    if (name == "") {
      errorCB("Name must not be empty.")
      return
    }

    const yearNum: number = Number.parseInt(year);
    if (isNaN(yearNum) || yearNum < 1 || yearNum > 3) {
      errorCB("Year must only contain 1, 2, or 3.")
      return
    }

    if (password.length < 8) {
      errorCB("Password must be at least 8 characters long.")
    }
  }
}
