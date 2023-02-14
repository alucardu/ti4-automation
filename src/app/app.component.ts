import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_SESSIONS = gql`
  query GetSession {
    sessions {
      id
    }
  }
`

const NEW_SESSION = gql`
  mutation NewSession {
    newSession {
      id
    }
  }
`

const REMOVE_SESSION = gql`
  mutation RemoveSession($id: ID!) {
    removeSession(id: $id) {
      id
    }
  }
`;

type SessionArray = {
  sessions: Array<Session>
}

type Session = {
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  public title = 'ti4-automation';

  public loadingSessions = false;
  public sessions: Array<Session> = [];

  private sessionsQuery!: QueryRef<any>;
  private getSessionsSubscription: Subscription = new Subscription;

  constructor(private apollo: Apollo) {}

  public ngOnInit(): void {
    this.getSessions();
  }

  private getSessions(): void {
    this.sessionsQuery = this.apollo.watchQuery<SessionArray>({
      query: GET_SESSIONS,
    })

    this.getSessionsSubscription = this.sessionsQuery.valueChanges.subscribe(({data}) => {
      this.sessions = data.sessions
    })
  }

  public newSession(): void {
    this.apollo.mutate({
        mutation: NEW_SESSION
    }).subscribe({
      next: () => this.sessionsQuery.refetch(),
      error: (error) => console.log(error),
    });
  }

  public removeSession(index: number): void {
    this.apollo.mutate({
      mutation: REMOVE_SESSION,
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
