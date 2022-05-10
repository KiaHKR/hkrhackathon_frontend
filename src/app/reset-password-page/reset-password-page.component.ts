import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tabFadeAnimation } from 'src/utils/animations';
import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
  animations: [
    tabFadeAnimation
  ]
})
export class ResetPasswordPageComponent implements OnInit, AfterViewInit {
  expiredToken: boolean = false;
  hasToken: boolean = false;

  passwordForm!: FormGroup;
  emailForm!: FormGroup;

  // Animation states
  mainVisibleState: string = 'hidden';

  constructor(private route: ActivatedRoute, private router: Router, private jwtHelper: JwtHelperService, private _snackbar: MatSnackBar, private fb: FormBuilder, private resetService: PasswordResetService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required]]
    })

    if (this.route.snapshot.queryParamMap.get('token') != null) {
      this.hasToken = true;
    }

    if (this.jwtHelper.isTokenExpired(this.route.snapshot.queryParamMap.get('token')!)) {
      this.expiredToken = true;
    }
  }

  ngAfterViewInit(): void {
    this.mainVisibleState = 'shown';
  }

  displayError(error: string): void {
    this._snackbar.open(error, 'dismiss', { panelClass: 'failure-snackbar' });
  }

  sendEmail(): void {
    const email = this.emailForm.value['email'];

    this.resetService.sendEmail(email, this.displayError.bind(this)).then((success) => {
      if (!success) return;

      this._snackbar.open('A mail has been sent to your inbox.', 'dismiss', { panelClass: 'success-snackbar' });
    })
  }

  resetPassword(): void {
    const newPassword = this.passwordForm.value['newPassword'];
    const repeatPassword = this.passwordForm.value['repeatPassword'];

    if (newPassword != repeatPassword) {
      this._snackbar.open('The passwords entered must be the same.', 'dismiss', { panelClass: 'failure-snackbar' });
      return;
    }

    this.resetService.resetPassword(this.route.snapshot.queryParamMap.get('token')!, newPassword, this.displayError.bind(this)).then((success) => {
      if (!success) return;

      this._snackbar.open('Successfully reset password.', 'Go to login', { panelClass: 'success-snackbar', duration: 10000 }).onAction().subscribe(() => {
        this.router.navigate(['login']);
      });
    })

  }

}
