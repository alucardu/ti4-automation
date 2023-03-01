import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
import { Session, SessionCreated, SessionDeleted } from 'src/types/sessionTypes';
import { CREATE_SESSION_SUBSCRIPTION, DELETE_SESSION_SUBSCRIPTION } from 'src/operations/sessionOperations/subscriptions';
import { User } from 'src/types/userTypes';
import { NotificationService, notificationType } from '../material/notification.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session = new ReplaySubject<Session>();
  public session$ = this.session.asObservable();

  private sessionsSubject = new BehaviorSubject<Array<Session> | null>(null);
  public sessions$ = this.sessionsSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService
  ) {
    this.subscribeToSessions();
  }

  public subscribeToSessions(): void {
    this.apollo.subscribe<SessionDeleted>({
      query: DELETE_SESSION_SUBSCRIPTION
    }).subscribe({
      next: ({data}) => {
        this.setSessions(data!.sessionDeleted.sessions)
        this.notificationService.openSnackBar(`Session: ${data?.sessionDeleted.session.name} was removed`, notificationType.SUCCESS)
      }
    })

    this.apollo.subscribe<SessionCreated>({
      query: CREATE_SESSION_SUBSCRIPTION
    }).subscribe(({data}) => {
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
