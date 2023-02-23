import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GraphQLError } from 'graphql';
import { SessionService } from 'src/app/session/session.service';
import userOperations from 'src/operations/userOperations';
import { Session } from 'src/types/sessionTypes';
import { CreateUser } from 'src/types/userTypes';
import { UserService } from './user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  @Input() session!: Session;

  public errorMessage!: string

  public userName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(8)
  ])

  constructor(
    private apollo: Apollo,
    private sessionService: SessionService,
    private userService: UserService,
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
        data ? this.sessionService.addUserToSession(this.session, data.createUser) : null;
        data ? this.userService.setUser(data.createUser) : null
      },
      error: (e: GraphQLError) => {
        this.errorMessage = {...e}.message;
      }
    })
  }
}
