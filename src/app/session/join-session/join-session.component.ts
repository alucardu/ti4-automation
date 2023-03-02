import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SessionService } from '../session.service';
import { UserService } from 'src/app/user/create-user/user.service';
import { combineLatest, filter, take } from 'rxjs';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent {

  public form: FormGroup = new FormGroup({
    sessionCode: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(6),
    ])
  })


  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {
    combineLatest([this.userService.user$, this.sessionService.session$]).pipe(
      filter(([user, session]) => !!user && !!session),
      take(1)
    ).subscribe({
      next: ([user, session]) => this.sessionService.addUserToSession(session!, user!)
    })
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

    return null
  }

  public createUserJoinSession(): void {
    this.sessionService.joinSession(this.form.get('sessionCode')?.value)
    this.userService.createUser(this.form)
  }
}
