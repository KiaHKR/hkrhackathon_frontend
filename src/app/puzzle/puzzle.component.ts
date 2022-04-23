import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleServiceService } from 'src/services/puzzle-service.service';

@Component({
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
  selector: 'puzzle-component',
})
export class PuzzleComponent implements OnInit {

  @Input() puzzle!: Puzzle;



  constructor(private puzzleService: PuzzleServiceService) {
  }

  ngOnInit(): void {

  }
}
