import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService, UserType } from '../session.service';
import { UserService } from 'src/app/user/create-user/user.service';
import { filter } from 'rxjs';
import { GetSession } from 'src/types/sessionTypes';
import { GET_SESSION } from 'src/operations/sessionOperations/queries';
import { Apollo } from 'apollo-angular';
import { User } from 'src/types/userTypes';

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
    private userService: UserService
  ) {
    this.userService.user$.subscribe({
      next: data => this.getSession(data!, this.form.get('sessionCode')!.value),
    });
  }

  public getErrorMessage(): string | null {
    if (this.form.get('sessionCode')?.hasError('required')) {
      return 'A session code is required';
    }

    if (this.form.get('sessionCode')?.hasError('minlength')) {
      return 'Session code must 6 charachters long';
    }

    if (this.form.get('sessionCode')?.hasError('pattern')) {
      return 'Session code is a number';
    }

    return null;
  }

  public createUserJoinSession(): void {
    this.userService.createUser(this.form);
  }

  private getSession(user: User, sessionCode: string): void {
    this.apollo
      .query<GetSession>({
        query: GET_SESSION,
        variables: {
          code: sessionCode,
        },
      })
      .pipe(filter(({ data }) => !!data.getSession))
      .subscribe({
        next: ({ data }) => {
          this.sessionService.connectUserToSession(
            user!,
            data.getSession!,
            UserType.USER
          );
        },
      });
  }
}
