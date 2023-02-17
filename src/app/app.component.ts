import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';

import * as sessionType from '../types/sessionTypes';
import sessionOperation from '../operations/sessionOperations'
import { SessionService } from './session/session.service';

enum actionType {
  JOIN = 'join',
  CREATE = 'create',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  private sessionsQuery!: QueryRef<sessionType.GetSessions>;
  private getSessionsSubscription: Subscription = new Subscription;

  public title = 'ti4-automation';
  public loadingSessions = false;
  public sessions: Array<sessionType.Session> = []
  public session: sessionType.Session | undefined;
  public actionTypeEnum = actionType;
  public actionType!: actionType

  protected session$ = this.sessionService.session$;

  private subscription!: Subscription;

  constructor(
    private apollo: Apollo,
    private sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this.getSessions();
  }

  private getSessions(): void {
    this.sessionsQuery = this.apollo.watchQuery<sessionType.GetSessions>({
      query: sessionOperation.GET_SESSIONS,
    })

    this.getSessionsSubscription = this.sessionsQuery.valueChanges.subscribe(({data}) => {
      this.sessions = data.getSessions
    })
  }

  public setActionType(actionType: actionType): void {
    this.actionType = actionType;
  }

  public deleteSession(index: number): void {
    this.apollo.mutate({
      mutation: sessionOperation.DELETE_SESSION,
      variables: {
        id: index,
      },
    }).subscribe({
      next: () => this.sessionsQuery.refetch(),
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  public ngOnDestroy(): void {
    this.getSessionsSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
