import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    if (!(await this.authService.isAuthenticated())) {
      // this.router.navigate(['login']);
      // return false;
    }
    return true;
  }
}
