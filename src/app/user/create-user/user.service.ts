import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GraphQLError } from 'graphql';
import { BehaviorSubject } from 'rxjs';
import { NotificationService, notificationType } from 'src/app/material/notification.service';
import { CREATE_USER } from 'src/operations/userOperations/mutations';
import { CreateUser, User } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService
  ) {}

  public createUser(form: FormGroup): void {
    this.apollo.mutate<CreateUser>({
      mutation: CREATE_USER,
      variables: {
        name: form.controls['user'].get('userName')?.value,
      }
    })
    .subscribe({
      next: ({data}) => this.setUser(data!.createUser),
      error: (e: GraphQLError) => this.notificationService.openSnackBar({...e}.message, notificationType.WARNING),
    })
  }

  public setUser(user: User | null): void {
    this.userSubject.next(user);
  }
}
