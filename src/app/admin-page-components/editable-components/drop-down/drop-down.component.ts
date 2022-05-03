import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'edit-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {

  @Input() initValue!: string;
  @Input() user!: User;
  @Input() options!: string[]
  @Input() attributeToUpdate!: string;
  @Input() onChange!: (user: User, event: any) => void

  editing: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

}
