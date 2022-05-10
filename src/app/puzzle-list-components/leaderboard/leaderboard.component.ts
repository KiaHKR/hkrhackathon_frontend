import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaderboardService } from 'src/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  entries!: { title: string, completed: string, failed: string, firstCompletedAt?: string, firstCompletedBy?: string }[];

  constructor(private leaderboard: LeaderboardService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateLeaderboard();
  }

  displayError(error: string): void {
    this._snackbar.open(error, 'dismiss', { panelClass: 'failure-snackbar' });
  }

  updateLeaderboard() {
    this.leaderboard.getLeaderboard(this.displayError.bind(this)).then(entries => {
      if (entries == null) return;

      this.entries = entries;
    })
  }

}
