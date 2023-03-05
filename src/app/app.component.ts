import { Component } from '@angular/core';

import { SessionService } from './session/session.service';
import { UserService } from './user/create-user/user.service';
import { stringIsSetAndFilled } from './util/stringUtils';

enum ActionType {
  JOIN = 'join',
  CREATE = 'create',
  NONE = 'none',
  ACTIVE = 'active',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'ti4-automation';
  public actionTypeEnum = ActionType;
  public actionType: ActionType = ActionType.NONE;

  protected session$ = this.sessionService.session$;
  protected user$ = this.userService.user$;

  constructor(
    private sessionService: SessionService,
    private userService: UserService
  ) {
    this.session$.subscribe(data => {
      if (stringIsSetAndFilled(data?.code)) {
        this.actionType = ActionType.ACTIVE;
      }
    });
  }

  public setActionType(actionType: ActionType): void {
    this.actionType = actionType;
  }
}
