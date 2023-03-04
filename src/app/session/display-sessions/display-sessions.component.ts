import { Component } from '@angular/core';
import { UserService } from 'src/app/user/create-user/user.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-display-sessions',
  templateUrl: './display-sessions.component.html',
  styleUrls: ['./display-sessions.component.scss']
})
export class DisplaySessionsComponent {
  protected sessions$ = this.sessionService.sessions$
  protected user$ = this.userService.user$

  constructor(
    private sessionService: SessionService,
    private userService: UserService
  ) {}


}
