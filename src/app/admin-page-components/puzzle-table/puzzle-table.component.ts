import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AdminPuzzleService } from 'src/services/admin/admin-puzzle.service';
import { AdminUserService } from 'src/services/admin/admin-user.service';
import { PuzzleService } from 'src/services/puzzle-service.service';

@Component({
  selector: 'admin-puzzle-table',
  templateUrl: './puzzle-table.component.html',
  styleUrls: ['./puzzle-table.component.scss']
})
export class PuzzleTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  reconstructedData: { puzzleid: string, visibility: boolean }[] = []
  columns: string[] = [
    'puzzleID',
    'isActive'
  ]

  constructor(private adminUserService: AdminUserService, private dialog: MatDialog, private puzzleService: PuzzleService, private _snackBar: MatSnackBar, private adminPuzzleService: AdminPuzzleService) { }

  ngOnInit(): void {
    this.fetchPuzzleIds();
  }

  displayError(error: string): void {
    this._snackBar.open(error, 'dismiss', { panelClass: 'failure-snackbar' })
  }

  fetchPuzzleIds(): void {
    this.adminPuzzleService.getPuzzleVisibilityList(this.displayError.bind(this)).then((vPuzzles) => {
      if (vPuzzles == null) return;

      for (const visiblityPuzzle of vPuzzles) {
        this.reconstructedData.push(visiblityPuzzle)
      }
      console.log(this.reconstructedData)
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.moveItemInArray(this.reconstructedData, event.previousIndex, event.currentIndex);
    this.adminPuzzleService.updatePuzzleVisibilityList(this.reconstructedData, this.displayError.bind(this)).then(success => {
      if (!success) return

      this._snackBar.open("Puzzle list updated", "dismiss", { panelClass: "success-snackbar" })
    })
  }

  moveItemInArray(array: { puzzleid: string, visibility: boolean }[], previousIndex: number, currentIndex: number) {
    const item = array.splice(previousIndex, 1)
    array.splice(currentIndex, 0, item[0])

  }

  updateVisiblity(item: { puzzleid: string, visibility: boolean }) {
    item.visibility = !item.visibility
    this.adminPuzzleService.updatePuzzleVisibilityList(this.reconstructedData, this.displayError.bind(this)).then(success => {
      if (!success) return

      this._snackBar.open(`${item.puzzleid} visibility updated to: ${item.visibility.valueOf().toString().toUpperCase()}`, "dismiss", { panelClass: "success-snackbar" })
    });


  }

}
