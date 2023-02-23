import { Component } from '@angular/core';

import { SessionService } from './session/session.service';
import { UserService } from './user/new-user/user.service';

enum actionType {
  JOIN = 'join',
  CREATE = 'create',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'ti4-automation';
  public actionTypeEnum = actionType;
  public actionType!: actionType

  protected session$ = this.sessionService.session$;
  protected user$ = this.userService.user$;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  public setActionType(actionType: actionType): void {
    this.actionType = actionType;
  }
}
