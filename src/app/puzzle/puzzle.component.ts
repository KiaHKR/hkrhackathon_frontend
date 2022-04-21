import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {

  puzzleId: string = this.activatedRoute.snapshot.paramMap.get('id')!;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }
}
