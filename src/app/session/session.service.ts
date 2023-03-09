import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, take } from 'rxjs';
import { CONNECT_SESSION_USER, CREATE_SESSION } from 'src/operations/sessionOperations/mutations';

import { CREATE_SESSION_SUBSCRIPTION, DELETE_SESSION_SUBSCRIPTION, USER_JOINED_SESSION } from 'src/operations/sessionOperations/subscriptions';
import { USER_DELETED_SUBSCRIPTION } from 'src/operations/userOperations/subscriptions';
import { ConnectUserToSession, CreateSession, Session, SessionCreated, SessionDeleted, UserJoinedSession, UserLeftSession } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';

import { NotificationService, notificationType } from '../material/notification.service';
import { MessageService } from '../messages/message.service';

export enum UserType {
  HOST = 'host',
  USER = 'user',
}
@Injectable({
  providedIn: 'root',
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
        name: form.controls['sessionName'].value,
      },
    }).subscribe({
      next: ({ data }) => {
        this.setSession(data!.createSession);
        this.notificationService.openSnackBar(
          `Created session: ${data?.createSession.name}`,
          notificationType.SUCCESS
        );
      },
      error: e => console.log(e),
    });
  }

  public connectUserToSession(
    user: User,
    session: Session,
    userType: UserType
  ): void {
    this.apollo.mutate<ConnectUserToSession>({
      mutation: CONNECT_SESSION_USER,
      variables: {
        sessionId: session.id,
        userId: user.id,
        userType: userType,
      },
    }).subscribe({
      next: ({ data }) => {
        this.setSession(data!.connectUserToSession);
        this.subscribeToSession();
        this.messageService.subscribeToMessages(session!);
      },
      error: () => {
        this.notificationService.openSnackBar(
          `Username ${user.name} is already in use`,
          notificationType.WARNING
        );
      },
    });
  }

  public setSession(session: Session | null): void {
    this.sessionSubject.next(session);
  }

  public setSessions(sessions: Array<Session>): void {
    this.sessionsSubject.next(sessions);
  }

  private updateSessionUsers(session: Session): void {
    this.sessionSubject.next(session);
  }

  private subscribeToSessions(): void {
    this.apollo.subscribe<SessionCreated>({
      query: CREATE_SESSION_SUBSCRIPTION,
    }).subscribe(({ data }) => {
      this.sessions$.pipe(take(1)).subscribe({
        next: sessions =>
          this.setSessions([...(sessions ?? []), data!.sessionCreated]),
      });
    });
  }

  private subscribeToSession(): void {
    this.apollo.subscribe<SessionDeleted>({
      query: DELETE_SESSION_SUBSCRIPTION,
      variables: {
        ...this.sessionSubject.getValue(),
      },
    }).subscribe({
      next: ({ data }) => {
        this.setSessions(data!.sessionDeleted.sessions);
        this.setSession(null);
        this.notificationService.openSnackBar(
          `Session: ${data?.sessionDeleted.session.name} was removed`,
          notificationType.SUCCESS
        );
      },
    });

    this.apollo.subscribe<UserJoinedSession>({
      query: USER_JOINED_SESSION,
      variables: {
        ...this.sessionSubject.getValue(),
      },
    }).subscribe({
      next: ({ data }) => {
        if (
          data?.userJoinedSession.session.host?.id !== data!.userJoinedSession.user.id
        ) {
          this.notificationService.openSnackBar(
            `${data?.userJoinedSession.user.name} has joined the session`,
            notificationType.SUCCESS
          );
          this.updateSessionUsers(data!.userJoinedSession.session);
        }
      },
    });

    this.apollo.subscribe<UserLeftSession>({
      query: USER_DELETED_SUBSCRIPTION,
      variables: {
        ...this.sessionSubject.getValue(),
      }
    }).subscribe({
      next: ({ data }) => {
        const session = this.sessionSubject.getValue()!;
        session.players = session?.players.filter((player) => player.id == data?.userDeleted.id);

        this.updateSessionUsers(session!);

        this.notificationService.openSnackBar(
          `${data?.userDeleted.name} has left the session`,
          notificationType.SUCCESS
        );
      }
    });
  }
}
