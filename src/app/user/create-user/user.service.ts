import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GraphQLError } from 'graphql';
import { BehaviorSubject } from 'rxjs';
import { NotificationService, notificationType } from 'src/app/material/notification.service';
import { SessionService } from 'src/app/session/session.service';
import { CREATE_USER } from 'src/operations/userOperations/mutations';
import { USER_CREATED_SUBSCRIPTION } from 'src/operations/userOperations/subscriptions';
import { Session } from 'src/types/sessionTypes';
import { CreateUser, User } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService,
    private sessionService: SessionService,
  ) {}

  public createUser(form: FormGroup, session?: Session): void {
    this.apollo.mutate<CreateUser>({
      mutation: CREATE_USER,
      variables: {
        name: form.controls['user'].get('userName')?.value,
        sessionId: session?.id
      },
    }).subscribe({
      next: ({ data }) => {
        this.setUser(data!.createUser);
        this.subscribeToUsers(data!.createUser);
      },
      error: (e: GraphQLError) => {
        this.sessionService.sessionSubject.next(null);
        this.notificationService.openSnackBar(
          { ...e }.message,
          notificationType.WARNING
        );
      }
    });
  }

  public setUser(user: User | null): void {
    this.userSubject.next(user);
  }

  private subscribeToUsers(user: User): void {
    this.apollo.subscribe({
      query: USER_CREATED_SUBSCRIPTION,
      variables: {
        ...user
      }
    });
  }
}
