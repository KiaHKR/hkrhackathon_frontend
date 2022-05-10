import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private datepipe: DatePipe) { }

  async getLeaderboard(errorCB: (error: string) => void): Promise<{ title: string, completed: string, failed: string, firstCompletedAt?: string, firstCompletedBy?: string }[] | null> {
    const tempList = [
      { title: "Maze Puzzle About Mice in a Maze", completed: "14", failed: "30", firstCompletedAt: new Date(2020, 2, 4, 18, 20), firstCompletedBy: "Bob" },
      { title: "Puzzle #2", completed: "56", failed: "49", firstCompletedAt: undefined, firstCompletedBy: undefined },
      { title: "Puzzle #3", completed: "51658", failed: "56756", firstCompletedAt: new Date(2022, 9, 16, 2, 32), firstCompletedBy: "Lasse Poulsen" },
    ]

    let outputList: { title: string, completed: string, failed: string, firstCompletedAt?: string, firstCompletedBy?: string }[] = [

    ]

    for (const entry of tempList) {
      outputList.push(
        {
          title: entry.title,
          completed: entry.completed,
          failed: entry.failed,
          firstCompletedAt: entry.firstCompletedAt == undefined ? undefined : this.datepipe.transform(entry.firstCompletedAt, 'dd-MM-yy hh:mm')!.replace(' ', ' at '),
          firstCompletedBy: entry.firstCompletedBy,
        }
      )
    }

    return outputList;
  }

}
