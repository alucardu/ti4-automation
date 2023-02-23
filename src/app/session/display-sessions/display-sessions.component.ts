import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import sessionOperations from 'src/operations/sessionOperations';
import { GetSession, GetSessions, Session } from 'src/types/sessionTypes';

@Component({
  selector: 'app-display-sessions',
  templateUrl: './display-sessions.component.html',
  styleUrls: ['./display-sessions.component.scss']
})
export class DisplaySessionsComponent implements OnInit {
  private sessionsQuery!: QueryRef<GetSessions>;
  private getSessionsSubscription: Subscription = new Subscription;
  private subscription!: Subscription;

  public sessions: Array<Session> = []

  public ngOnInit(): void {
    this.getSessions();
  }

  constructor(
    private apollo: Apollo,
  ) {}

  private getSessions(): void {
    this.sessionsQuery = this.apollo.watchQuery<GetSessions>({
      query: sessionOperations.GET_SESSIONS,
    })

    this.getSessionsSubscription = this.sessionsQuery.valueChanges.subscribe(({data}) => {
      this.sessions = data.getSessions
    })
  }

  public deleteSession(index: number): void {
    this.apollo.mutate({
      mutation: sessionOperations.DELETE_SESSION,
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
