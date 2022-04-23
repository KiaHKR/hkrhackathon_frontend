import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Puzzle from 'src/models/puzzle';
import { PuzzleService } from 'src/services/puzzle-service.service';

@Component({
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
  selector: 'puzzle-component',
})
export class PuzzleComponent implements OnInit {

  @Input() puzzle!: Puzzle;
  @Input() index!: string;
  @Input() indexTotal!: string;


  constructor(private puzzleService: PuzzleService) {
  }

  ngOnInit(): void {

  }
}
