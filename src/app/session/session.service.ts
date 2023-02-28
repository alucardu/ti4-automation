import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
import { Session, SessionCreated } from 'src/types/sessionTypes';
import sessionOperations from 'src/operations/sessionOperations';
import { User } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session = new ReplaySubject<Session>();
  public session$ = this.session.asObservable();

  private sessionsSubject = new BehaviorSubject<Array<Session> | null>(null);
  public sessions$ = this.sessionsSubject.asObservable();

  constructor(
    private apollo: Apollo
  ) {
    this.subscribeToSessions();
  }

  public subscribeToSessions(): void {
    this.apollo.subscribe<SessionCreated>({
      query: sessionOperations.CREATE_SESSION_SUBSCRIPTION
    }).subscribe(async ({data}) => {
      this.sessions$
      .pipe(
        take(1),
      ).subscribe({
        next: (sessions) => this.setSessions([...sessions??[], data!.sessionCreated]),
      })
    })
  }

  public setSession(session: Session): void {
    this.session.next(session)
  }

  public setSessions(sessions: Array<Session>): void {
    this.sessionsSubject.next(sessions)
  }

  public addUserToSession(session: Session, user: User): void {
    this.session.next({
      ...session,
      players: [...session.players, user]
    })
  }
}
