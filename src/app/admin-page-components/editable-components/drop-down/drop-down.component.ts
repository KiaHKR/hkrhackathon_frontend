import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'edit-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {

  @Input() initValue!: string;
  @Input() options!: string[];
  @Input() align!: string;
  @Output() onChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  // @Input() onChange!: (user: User, event: any) => void

  editing: boolean = false;


  constructor() { }

  emitEvent(event: MatSelectChange): void {
    this.onChange.emit(event);
  }

  ngOnInit(): void {
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

}
