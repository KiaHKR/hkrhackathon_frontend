import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user';
import { AdminUserService } from 'src/services/admin/admin-user.service';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'admin-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  puzzleIds: string[] = [];
  columns: string[] = [
    'email',
    'name',
    'year',
    'currentPuzzleId',
    'isAdmin',
    'delete'
  ]

  constructor(private adminUserService: AdminUserService, private dialog: MatDialog, private puzzleService: PuzzleService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.users.sort = this.sort;
    this.fetchPuzzleIds();
    this.fetchUsers();
  }

  displayError(error: string): void {
    this._snackBar.open(error, 'dismiss', { panelClass: 'failure-snackbar' })
  }

  fetchUsers(): void {
    this.adminUserService.getAllUsers(this.displayError.bind(this)).then(users => {
      if (users != undefined && users != null) return this.reloadUserList(users);
    })
  }

  fetchPuzzleIds(): void {
    this.puzzleService.fetchPuzzles(this.displayError.bind(this)).then((puzzles) => {
      if (puzzles == null) return;

      for (const puzzle of puzzles) {
        this.puzzleIds.push(puzzle.id);
      }
    });
  }

  reloadUserList(newList: User[]): void {
    this.users.data = newList;
  }

  adminChanged(user: User, event: MatSlideToggleChange) {
    let tempUserList = this.users.data;

    const userObjIndex = tempUserList.indexOf(user);
    user.isAdmin = event.checked;

    this.adminUserService.updateUser(user.email, user, this.displayError.bind(this)).then((success) => {
      if (!success) {
        event.source.toggle();
        return;
      }

      tempUserList[userObjIndex] = user;

      this.reloadUserList(tempUserList);

    })
  }

  deleteUser(user: User) {
    this.dialog.open(DeleteDialogComponent, {
      autoFocus: 'dialog',
      data: {
        email: user.email
      }
    }).afterClosed().subscribe((success: boolean) => {
      if (!success) return;

      this.adminUserService.deleteUser(user.email, this.displayError.bind(this)).then((success) => {
        if (!success) return;

        let tempUserList = this.users.data;

        const userIndex = tempUserList.indexOf(user);
        tempUserList.splice(userIndex, 1);

        this.users.data = tempUserList;
      })
    })
  }

  async updatePuzzleId(user: User, event: MatSelectChange): Promise<void> {
    let tempUserList = this.users.data;

    const userObjIndex = tempUserList.indexOf(user);
    const oldUser = tempUserList[userObjIndex];
    user.currentPuzzleId = event.value;

    const puzzles = await this.puzzleService.fetchPuzzles(this.displayError.bind(this));
    if (puzzles == null) return;

    let newAllowedPuzzleIds = [];
    for (const puzzle of puzzles) {
      newAllowedPuzzleIds.push(puzzle.id)
      if (puzzle.id == user.currentPuzzleId) break;
    }

    const success = await this.adminUserService.updateUserPuzzles(user.email, newAllowedPuzzleIds, user.currentPuzzleId, this.displayError.bind(this));
    if (!success) {
      event.source.value = oldUser.currentPuzzleId;
      return;
    }

    tempUserList[userObjIndex] = user;
    this.reloadUserList(tempUserList);
  }

  updateYear(user: User, event: MatSelectChange): void {
    let tempUserList = this.users.data;

    const userObjIndex = tempUserList.indexOf(user);
    const oldUser = tempUserList[userObjIndex];
    user.year = Number.parseInt(event.value);

    this.adminUserService.updateUser(user.email, user, this.displayError.bind(this)).then((success) => {
      if (!success) {
        event.source.value = oldUser.year;
        return;
      }

      tempUserList[userObjIndex] = user;
      this.reloadUserList(tempUserList);
    })
  }

  updateName(user: User, event: { preventChange: () => void, confirmChange: () => void, value: string }): void {
    let tempUserList = this.users.data;

    const userObjIndex = tempUserList.indexOf(user);
    const oldUser = tempUserList[userObjIndex];
    user.name = event.value;

    this.adminUserService.updateUser(user.email, user, this.displayError.bind(this)).then((success) => {
      if (!success) {
        event.preventChange();
        return;
      }

      event.confirmChange();
      tempUserList[userObjIndex] = user;
      this.reloadUserList(tempUserList);
    })
  }
}
