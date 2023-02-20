import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import userOperations from 'src/operations/userOperations';
import * as sessionType from 'src/types/sessionTypes';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  @Input() session!: sessionType.Session;

  public userName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(8)
  ])

  constructor(
    private apollo: Apollo
  ) {}

  public createUserName(userName: FormControl): void {
    this.apollo.mutate({
      mutation: userOperations.CREATE_USER,
      variables: {
        name: userName.value,
        sessionId: this.session.id
      }
    }).subscribe({
      next: (user) => console.log(user),
      error: (e) => console.log(e),
    })
  }

}
