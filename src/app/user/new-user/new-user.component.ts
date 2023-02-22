import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GraphQLError } from 'graphql';
import { SessionService } from 'src/app/session/session.service';
import userOperations from 'src/operations/userOperations';
import * as sessionType from 'src/types/sessionTypes';
import { CreateUser, User } from 'src/types/userTypes';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  @Input() session!: sessionType.Session;

  public errorMessage!: string

  public userName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(8)
  ])

  constructor(
    private apollo: Apollo,
    private sessionService: SessionService,
  ) {}

  public createUserName(userName: FormControl): void {
    this.apollo.mutate<CreateUser>({
      mutation: userOperations.CREATE_USER,
      variables: {
        name: userName.value,
        sessionId: this.session.id,
      }
    })
    .subscribe({
      next: ({data}) => {
        this.sessionService.addUserToSession(this.session, data!.createUser)
      },
      error: (e: GraphQLError) => {
        this.errorMessage = {...e}.message;
      }
    })
  }

}
