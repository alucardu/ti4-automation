import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService, UserType } from '../session.service';
import { UserService } from 'src/app/user/create-user/user.service';
import { filter, take, zip } from 'rxjs';
import { GetSession } from 'src/types/sessionTypes';
import { GET_SESSION } from 'src/operations/sessionOperations/queries';
import { Apollo } from 'apollo-angular';
import { User } from 'src/types/userTypes';
import { NotificationService, notificationType } from 'src/app/material/notification.service';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss'],
})
export class JoinSessionComponent {
  public form: FormGroup = new FormGroup({
    sessionCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6),
    ]),
  });

  constructor(
    private apollo: Apollo,
    private sessionService: SessionService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
    zip(this.userService.user$, this.sessionService.session$)
      .pipe(
        filter(([user, session]) => !!user && !!session),
        take(1)
      )
      .subscribe({
        next: ([user, session]) => {
          this.sessionService.connectUserToSession(
            user!,
            session!,
            UserType.HOST
          );
        },
      });
  }

  public getErrorMessage(): string | null {
    if (this.form.get('sessionCode')?.hasError('required')) {
      return 'A session code is required';
    }

    if (this.form.get('sessionCode')?.hasError('pattern')) {
      return 'Session code is a number';
    }

    if (this.form.get('sessionCode')?.hasError('minlength')) {
      return 'Session code must 6 charachters long';
    }

    return null;
  }

  public createUserJoinSession(): void {
    this.getSession(this.form.get('sessionCode')!.value);
  }

  private getSession(sessionCode: string, user?: User): void {
    this.apollo
      .query<GetSession>({
        query: GET_SESSION,
        variables: {
          code: sessionCode,
        },
      })
      .subscribe({
        next: ({ data }) => {
          if(data.getSession !== null) {
            this.userService.createUser(this.form);
            this.sessionService.sessionSubject.next(data.getSession);
          } else {
            this.notificationService.openSnackBar(
              `Session could not be found`,
              notificationType.WARNING
            );
          }
        }
      });
  }
}
