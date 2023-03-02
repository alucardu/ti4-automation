import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, take } from 'rxjs';
import { ConnectHostToSession, CreateSession, Session, SessionCreated, SessionDeleted } from 'src/types/sessionTypes';
import { CREATE_SESSION_SUBSCRIPTION, DELETE_SESSION_SUBSCRIPTION } from 'src/operations/sessionOperations/subscriptions';
import { User } from 'src/types/userTypes';
import { NotificationService, notificationType } from '../material/notification.service';
import { FormGroup } from '@angular/forms';
import { CONNECT_SESSION_HOST, CREATE_SESSION } from 'src/operations/sessionOperations/mutations';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionSubject = new BehaviorSubject<Session | null>(null);
  public session$ = this.sessionSubject.asObservable();

  private sessionsSubject = new BehaviorSubject<Array<Session> | null>(null);
  public sessions$ = this.sessionsSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService
  ) {
    this.subscribeToSessions();
  }

  public createSession(form: FormGroup): void {
    this.apollo.mutate<CreateSession>({
      mutation: CREATE_SESSION,
      variables: {
        name: form.controls['sessionName'].value
      }
    }).subscribe({
      next: ({data}) => {
        this.setSession(data!.createSession)
      },
      error: (e) => console.log(e),
    });
  }

  public connectHostToSession(user: User, session: Session): void {
    this.apollo.mutate<ConnectHostToSession>({
      mutation: CONNECT_SESSION_HOST,
      variables: {
        sessionId: session.id,
        userId: user?.id
      }
    }).subscribe({
      next: ({data}) => {
        const sessions = this.sessionsSubject.getValue()!.map((session) => {
          if (session.id === data!.connectHostToSession.id) {
            return {
              ...session,
              host: data!.connectHostToSession.host
            }
          }
          return session

        })
        this.setSessions(sessions)
      },
      error: (err) => console.log(err)
    })
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

  public setSession(session: Session | null): void {
    this.sessionSubject.next(session)
  }

  public setSessions(sessions: Array<Session>): void {
    this.sessionsSubject.next(sessions)
  }

  public addUserToSession(session: Session, user: User): void {
    this.sessionSubject.next({
      ...session,
      players: [...session.players, user]
    })
  }
}
