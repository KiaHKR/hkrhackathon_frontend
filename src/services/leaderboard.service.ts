import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private datepipe: DatePipe) { }

  async getLeaderboard(errorCB: (error: string) => void): Promise<{ title: string, completed: string, failed: string, firstCompletedAt?: string, firstCompletedBy?: string }[] | null> {
    const token = localStorage.getItem('x-auth-token');
    if (token == null) {
      errorCB('Saved user token not found.');
      return null;
    }

    const res = await fetch(`${BASE_API_URL}/leaderboard`, {
      headers: {
        'x-auth-header': token
      }
    });

    if (res == undefined) {
      errorCB('There was an error fetching the leaderboards.');
      return null;
    }

    if (!res.ok) {
      const data: { error: string } = await res.json();
      errorCB(data.error);
      return null;
    }

    const tempList: { title: string, completed: string, failed: string, firstCompletedAt?: Date, firstCompletedBy?: string }[] = await res.json();
    console.log(tempList);

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
