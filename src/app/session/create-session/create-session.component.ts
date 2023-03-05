import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, take, zip } from 'rxjs';
import { UserService } from 'src/app/user/create-user/user.service';
import { SessionService, UserType } from '../session.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent {
  public form: FormGroup = new FormGroup({
    sessionName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(24),
    ]),
  });

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {
    this.sessionService.setSession(null);
    this.userService.setUser(null);

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
    if (this.form.get('sessionName')?.hasError('required')) {
      return 'A session name is required';
    }

    if (this.form.get('sessionName')?.hasError('minlength')) {
      return 'Session name must be between 4 and 16 charachters long';
    }

    if (this.form.get('sessionName')?.hasError('maxlength')) {
      return 'Session name cannot be longer than 16 characters';
    }

    return null;
  }

  public createUserAndSession(): void {
    this.userService.createUser(this.form);
    this.sessionService.createSession(this.form);
  }
}
