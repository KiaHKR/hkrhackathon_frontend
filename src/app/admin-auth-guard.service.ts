import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    if (!(await this.authService.isAuthenticated(true))) {
      this.router.navigate(['puzzles']);
      return false;
    }
    return true;
  }
}
