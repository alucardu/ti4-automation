import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, take } from 'rxjs';
import { ConnectHostToSession, ConnectUserToSession, CreateSession, GetSession, Session, SessionCreated, SessionDeleted, UserJoinedSession } from 'src/types/sessionTypes';
import { CREATE_SESSION_SUBSCRIPTION, DELETE_SESSION_SUBSCRIPTION, USER_JOINED_SESSION } from 'src/operations/sessionOperations/subscriptions';
import { User } from 'src/types/userTypes';
import { NotificationService, notificationType } from '../material/notification.service';
import { FormGroup } from '@angular/forms';
import { CONNECT_SESSION_HOST, CONNECT_SESSION_USER, CREATE_SESSION } from 'src/operations/sessionOperations/mutations';
import { GET_SESSION } from 'src/operations/sessionOperations/queries';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public sessionSubject = new BehaviorSubject<Session | null>(null);
  public session$ = this.sessionSubject.asObservable();

  private sessionsSubject = new BehaviorSubject<Array<Session> | null>(null);
  public sessions$ = this.sessionsSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService,
    private messageService: MessageService
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
        this.notificationService.openSnackBar(`Created session: ${data?.createSession.name}`, notificationType.SUCCESS)
      },
      error: (e) => console.log(e),
    });
  }

  public joinSession(sessionCode: string): void {
    this.apollo.query<GetSession>({
      query: GET_SESSION,
      variables: {
        code: sessionCode
      }
    }).subscribe({
      next: ({data}) => {
        this.setSession(data.getSession)
        this.notificationService.openSnackBar(`Joined session: ${data?.getSession.name}`, notificationType.SUCCESS)
      }
    })
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
          return {
            ...session,
            host: session.id === data!.connectHostToSession.id ? data!.connectHostToSession.host : session.host
          }
        })
        this.setSessions(sessions)
      },
      error: (err) => console.log(err)
    })
  }

  public connectUserToSession(user: User, session: Session): void {
    this.apollo.mutate<ConnectUserToSession>({
      mutation: CONNECT_SESSION_USER,
      variables: {
        sessionId: session.id,
        userId: user?.id
      }
    }).subscribe({
      next: ({data}) => {
        if (!this.sessionsSubject.getValue()) {
          return;
        }
        const sessions = this.sessionsSubject.getValue()!.map((session) => {
          return {
            ...session,
            host: session.id === data!.connectUserToSession.id ? data!.connectUserToSession.host : session.host
          }
        })
        this.setSessions(sessions)
        this.addUserToSession(session!, user!)
        this.subscribeToSession();
        this.messageService.subscribeToMessages(session!);
      },
      error: (err) => console.log(err)
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

  private updateSessionUsers(session: Session): void {
    this.sessionSubject.next({
      ...session,
      players: session.players
    })
  }

  private subscribeToSessions(): void {
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

  private subscribeToSession(): void {
    this.apollo.subscribe<UserJoinedSession>({
      query: USER_JOINED_SESSION,
      variables: {
        ...this.sessionSubject.getValue()
      },
    }).subscribe({
      next: ({data}) => {
        if (data?.userJoinedSession.session.host!.id !== data!.userJoinedSession.user.id) {
          this.notificationService.openSnackBar(`${data?.userJoinedSession.user.name} has joined your session`, notificationType.SUCCESS)
          this.updateSessionUsers(data!.userJoinedSession.session);
        }
      },
    })
  }
}
