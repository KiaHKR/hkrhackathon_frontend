import { Injectable } from '@angular/core';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static USER: User | undefined;

  constructor() { }

  get user() {
    return UserService.USER;
  }

  set user(user: User | undefined) {
    UserService.USER = user;
  }
}
