import { Component } from '@angular/core';

import { SessionService } from './session/session.service';
import { UserService } from './user/create-user/user.service';

enum ActionType {
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
  public actionTypeEnum = ActionType;
  public actionType!: ActionType

  protected session$ = this.sessionService.session$;
  protected user$ = this.userService.user$;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {
    this.session$.subscribe((data) => {
      data ? this.actionType = ActionType.JOIN : null
    });
  }

  public setActionType(actionType: ActionType): void {
    this.actionType = actionType;
  }
}
