import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  @Input() user!: User;

  infoForm!: FormGroup;

  passwordForm!: FormGroup;

  constructor(private _snackbar: MatSnackBar, private _userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      name: [this.user.name, Validators.required],
      year: [this.user.year, Validators.required],
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  displayError(error: string) {
    this._snackbar.open(error, 'dismiss', { panelClass: 'failure-snackbar' });
  }

  updateUserInfo(): void {
    const name = this.infoForm.value['name'];
    const year = this.infoForm.value['year'].toString();
    if (name == this.user.name && year == this.user.year) {
      this._snackbar.open('Account info unchanged.', 'dismiss', { panelClass: 'neutral-snackbar' });
      return;
    }

    if (!['1', '2', '3'].includes(year)) {
      this._snackbar.open('Year must be 1, 2, or 3.', 'dismiss', { panelClass: 'failure-snackbar' });
      return;
    }

    this._userService.updateUserInfo(name, year, this.displayError.bind(this)).then((success) => {
      if (!success) return;

      this._snackbar.open('Account info changed successfully.', 'dismiss', { panelClass: 'success-snackbar' })
    })
  }

  updateUserPassword(): void {
    const oldPassword = this.passwordForm.value['oldPassword'];
    const newPassword = this.passwordForm.value['newPassword'];
    const repeatPassword = this.passwordForm.value['repeatPassword'];

    if (newPassword != repeatPassword) {
      this._snackbar.open('The passwords entered must be the same.', 'dismiss', { panelClass: 'failure-snackbar' });
      return;
    }

    this._userService.updateUserPassword(oldPassword, newPassword, this.displayError.bind(this)).then((success) => {
      if (!success) return;

      this._snackbar.open('Password updated successfully.', 'dismiss', { panelClass: 'success-snackbar' })
    })

  }

}
