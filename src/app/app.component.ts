import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';

import * as sessionType from '../types/sessionTypes';
import sessionOperation from '../operations/sessionOperations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  public title = 'ti4-automation';

  public loadingSessions = false;
  public sessions: Array<sessionType.Session> = [];

  private sessionsQuery!: QueryRef<sessionType.SessionArray>;
  private getSessionsSubscription: Subscription = new Subscription;

  constructor(private apollo: Apollo) {}

  public ngOnInit(): void {
    this.getSessions();
  }

  private getSessions(): void {
    this.sessionsQuery = this.apollo.watchQuery<sessionType.SessionArray>({
      query: sessionOperation.GET_SESSIONS,
    })

    this.getSessionsSubscription = this.sessionsQuery.valueChanges.subscribe(({data}) => {
      this.sessions = data.sessions
    })
  }

  public newSession(): void {
    this.apollo.mutate({
        mutation: sessionOperation.NEW_SESSION
    }).subscribe({
      next: () => this.sessionsQuery.refetch(),
      error: (error) => console.log(error),
    });
  }

  public removeSession(index: number): void {
    this.apollo.mutate({
      mutation: sessionOperation.REMOVE_SESSION,
      variables: {
        id: index,
      },
    }).subscribe({
      next: () => this.sessionsQuery.refetch(),
      error: (error) => console.log(error),
    });
  }

  public ngOnDestroy(): void {
    this.getSessionsSubscription.unsubscribe();
  }
}
