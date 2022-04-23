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

  //TODO Get the actual Puzzle object from Puzzle Service endpoint
  @Input() puzzle!: Puzzle;



  constructor(private puzzleService: PuzzleServiceService) {
  }

  ngOnInit(): void {

  }
}
