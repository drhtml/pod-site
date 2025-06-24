import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';
import { isNumber } from 'src/app/utils/string';

@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss'],
    standalone: false
})
export class InputFieldComponent implements OnInit {
  @Input() label = '';
  @Input() showMinusAddBtn = false;
  @Input() noLabel = false;
  @Input() placeholder = '';
  @Input() isPasswordField = false;
  type: 'text' | 'password' = 'text';
  @Input() subfixImage = '';
  @Input() prefixImage = '';
  @Input() isCCVField = false;
  @Input() disabled = false;
  @Input() formControl: FormControl<any> = new FormControl();
  @Output() blur = new EventEmitter<void>();
  @Output() enter = new EventEmitter<void>();
  @Input() errorStateMatcher?: ErrorStateMatcher;
  @Input() formErrorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    this.type = this.isPasswordField ? 'password' : 'text';
  }

  increase(): void {
    let newValue = this.formControl.value;
    if (_.isNumber(newValue)) {
      newValue += 1;
    } else if (_.isString(newValue) && isNumber(newValue)) {
      newValue = parseInt(newValue) + 1;
    } else {
      newValue = 0;
    }

    this.formControl.setValue(newValue);
  }

  decrease(): void {
    let newValue = this.formControl.value;
    if (_.isNumber(newValue)) {
      newValue -= 1;
    } else if (_.isString(newValue) && isNumber(newValue)) {
      newValue = parseInt(newValue) - 1;
    } else {
      newValue = 0;
    }
    if (newValue < 0) {
      newValue = 0;
    }

    this.formControl.setValue(newValue);
  }

  get errorMessage(): string {
    if (!this.formControl.dirty && !this.formControl.touched) {
      return '';
    }
    if (this.formControl.errors?.['email']) {
      return 'Invalid email.';
    }
    if (this.formControl.errors?.['required']) {
      return 'Field is required.';
    }
    if (this.formControl.errors?.['phoneNumber']) {
      return 'Invalid phone number.';
    }
    if (this.formControl.errors?.['custom']) {
      return this.formControl.errors?.['custom'].message;
    }
    if (this.formErrorMessage) {
      return this.formErrorMessage;
    }
    return '';
  }

  get isDisabled(): any {
    if (this.disabled) {
      return '';
    }
    return 'false';
  }
}
