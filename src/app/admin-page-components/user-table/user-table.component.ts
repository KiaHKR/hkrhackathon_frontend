import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { User } from 'src/models/user';
import { AdminService } from 'src/services/admin.service';
import { PuzzleService } from 'src/services/puzzle-service.service';
import { UserService } from 'src/services/user.service';
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

  constructor(private adminService: AdminService, private dialog: MatDialog, private puzzleService: PuzzleService) { }

  ngOnInit(): void {
    this.users.sort = this.sort;
    this.fetchPuzzleIds();
    this.fetchUsers();
  }

  //TODO implement actual error display
  displayError(error: string): void {
    alert(error)
  }

  fetchUsers(): void {
    this.adminService.getAllUsers(this.displayError.bind(this)).then(users => {
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

    this.adminService.updateUser(user.email, user, this.displayError.bind(this)).then((success) => {
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

      this.adminService.deleteUser(user.email, this.displayError.bind(this)).then((success) => {
        if (!success) return;

        let tempUserList = this.users.data;

        const userIndex = tempUserList.indexOf(user);
        tempUserList.splice(userIndex, 1);

        this.users.data = tempUserList;
      })
    })
  }

  updatePuzzleId(user: User, event: MatSelectChange): void {
    let tempUserList = this.users.data;

    const userObjIndex = tempUserList.indexOf(user);
    const oldUser = tempUserList[userObjIndex];
    user.currentPuzzleId = event.value;

    this.adminService.updateUser(user.email, user, this.displayError.bind(this)).then((success) => {
      if (!success) {
        event.source.value = oldUser.currentPuzzleId;
        return;
      }

      tempUserList[userObjIndex] = user;
      this.reloadUserList(tempUserList);
    })

  }

}
