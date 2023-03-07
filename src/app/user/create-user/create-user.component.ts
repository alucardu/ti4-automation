import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class CreateUserComponent implements OnInit {
  public parentForm!: FormGroup;

  constructor(private parent: FormGroupDirective, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.parentForm = this.parent.form;
    this.parentForm.addControl(
      'user',
      this.fb.group({
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(8),
        ]),
      })
    );
  }

  public getErrorMessage(): string | null {
    if (this.parentForm.get('user')?.get('userName')?.hasError('required')) {
      return 'Name is required';
    }

    if (this.parentForm.get('user')?.get('userName')?.hasError('minlength')) {
      return 'Name must be at least 3 charachters long';
    }

    if (this.parentForm.get('user')?.get('userName')?.hasError('maxlength')) {
      return 'Name cannot be longer than 8 characters';
    }

    return null;
  }
}
