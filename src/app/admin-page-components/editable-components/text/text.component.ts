import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, pairwise, Subscription } from 'rxjs';

@Component({
  selector: 'edit-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() initValue!: string;
  @Output() onChange: EventEmitter<{ preventChange: () => void, confirmChange: () => void, value: string }> = new EventEmitter<{ preventChange: () => void, confirmChange: () => void, value: string }>();

  form: FormGroup = this.fb.group({
    input: [null, [Validators.required]]
  })

  editing: boolean = false;
  oldValue!: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.oldValue = this.initValue;
    this.form.patchValue({
      input: this.initValue
    })
  }

  emitChange() {
    if (this.oldValue == this.form.value['input']) return;

    this.onChange.emit({ preventChange: this.preventChange.bind(this), confirmChange: this.confirmChange.bind(this), value: this.form.value['input'] })
  }

  confirmChange(): void {
    this.oldValue = this.form.value['input'];

  }

  preventChange(): void {
    this.form.patchValue({
      input: this.oldValue
    })
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

}
